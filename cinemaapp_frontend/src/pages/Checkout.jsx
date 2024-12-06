import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CiCircleInfo } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import CreditCard from "../components/CreditCard";
import Separator from "../components/Separator";
import "../styles/Checkout.css";
import colors from "../utils/colors";
import { paymentService } from "../services/paymentService";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { getUserInfoFromToken } from "../utils/JwtDecode";
import { ticketService } from "../services/ticketService";
import { useNavBar } from "../context/NavBarContext";
import exchangeRateService from "../services/exchangeRateService";

const Checkout = () => {
  const [customerId, setCustomerId] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [paymentError, setPaymentError] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);

  const token = localStorage.getItem("token");
  const userEmail = getUserInfoFromToken(token).sub;

  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const location = useLocation();

  const { projection, selectedDay, seatNos, price } = location.state || {};

  const { userId } = useNavBar();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          setShowPopup(true);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/");
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    navigate("/");
  };

  useEffect(() => {
    const handlePaymentButton = async () => {
      const customerData = {
        email: userEmail,
        name: userEmail.split("@")[0],
      };

      const customerCreateResponse = await paymentService.createCustomer(
        customerData
      );

      setCustomerId(customerCreateResponse.customerId);
    };

    handlePaymentButton();
  }, []);

  const handlePaymentIntent = async () => {
    const exchangeRate = await exchangeRateService.getExchangeRate("bam");

    const response = await paymentService.createPaymentIntent({
      customerId: customerId,
      amount: price * 100 * exchangeRate.conversion_rates.EUR, // Since Stripe doesn't support BAM, I use euros and convert them into BAM
      currency: "eur",
      receiptEmail: userEmail,
    });

    setClientSecret(response.clientSecret);
  };

  useEffect(() => {
    const getPaymentMethods = async () => {
      if (customerId) {
        const paymentMethods = await paymentService.getPaymentMethods(
          customerId
        );
        setPaymentMethods(paymentMethods);
      }
    };

    getPaymentMethods();
  }, [customerId]);

  const handleConfirmPayment = async (secret) => {
    if (!stripe || !elements) {
      console.error("Something went wrong.");
      setPaymentError("Something went wrong.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: userEmail.split("@")[0],
        email: userEmail,
      },
    });

    if (error) {
      console.error("Payment method creation failed", error.message);
      setPaymentError(error.message);
      return;
    }

    await paymentService.attachPaymentMethod(paymentMethod.id, customerId);

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(secret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error("Payment confirmation failed", confirmError.message);
      setPaymentError("Payment confirmation failed.");
    } else if (paymentIntent.status === "succeeded") {
      const formattedDate = formatDateToISO(selectedDay.date);
      if (!formattedDate) {
        console.error("Failed to format date");
        return;
      }

      const buyResponse = await ticketService.buyTickets({
        userId: userId,
        projectionId: projection.id,
      });

      if (buyResponse) {
        setPaymentError("");
        setShowSuccessPopup(true);
        await paymentService.confirmPayment(paymentIntent.receipt_email);
      }
    }
  };

  useEffect(() => {
    if (clientSecret) {
      handleConfirmPayment(clientSecret);
    }
  }, [clientSecret, customerId]);

  const formatDateToISO = (dateString, year = new Date().getFullYear()) => {
    const fullDateString = `${dateString} ${year}`;

    const parsedDate = new Date(fullDateString);
    if (isNaN(parsedDate)) {
      console.error("Invalid date format");
      return null;
    }

    const formattedYear = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${formattedYear}-${month}-${day}`;
  };

  const handleElementChange = (event, field) => {
    if (event.empty) {
      setErrors((prev) => ({ ...prev, [field]: "This field is required" }));
    } else if (event.error) {
      setErrors((prev) => ({ ...prev, [field]: event.error.message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <div className="d-flex justify-content-between align-items-center p-3">
          <h3 className="px-5">Payment Details</h3>
          <div className="d-flex align-items-center gap-2 position-relative">
            <div className="d-flex">
              <CiCircleInfo size={20} />
              <p>Session Duration</p>
            </div>
            <h6 className="border rounded p-2">
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}
              :{(timeLeft % 60).toString().padStart(2, "0")}
            </h6>
          </div>
        </div>
        <div className="line-checkout" />

        <div className="w-100 d-flex p-5 gap-3">
          <div className="col-8">
            <h4>Saved Cards</h4>

            {console.log(paymentMethods)}

            {paymentMethods.map((method) => {
              return (
                <CreditCard
                  key={method.id}
                  last4={method.card.last4}
                  brand={method.card.brand}
                />
              );
            })}

            <Separator dark={true} />

            <h4 className="my-4">Add New Card</h4>
            <label className="fw-bold">Card Number</label>
            <CardNumberElement
              className="border rounded p-2 bg-white"
              options={{
                style: {
                  invalid: { color: "#9e2146" },
                  empty: { color: "#9e2146" },
                },
              }}
              onChange={(event) => handleElementChange(event, "cardNumber")}
            />
            {errors.cardNumber && (
              <p className="text-danger">{errors.cardNumber}</p>
            )}

            <div className="d-flex gap-5 mt-4">
              <div className="w-100">
                <label className="fw-bold">Expiry Date</label>
                <CardExpiryElement
                  className="border rounded p-2 bg-white"
                  options={{
                    style: {
                      invalid: { color: "#9e2146" },
                      empty: { color: "#9e2146" },
                    },
                  }}
                  onChange={(event) => handleElementChange(event, "expiryDate")}
                />
                {errors.expiryDate && (
                  <p className="text-danger">{errors.expiryDate}</p>
                )}
              </div>
              <div className="w-100">
                <label className="fw-bold">CVV</label>
                <CardCvcElement
                  className="border rounded p-2 bg-white"
                  options={{
                    style: {
                      invalid: { color: "#9e2146" },
                      empty: { color: "#9e2146" },
                    },
                  }}
                  onChange={(event) => handleElementChange(event, "cvc")}
                />
                {errors.cvc && <p className="text-danger">{errors.cvc}</p>}
              </div>
            </div>

            <Button
              variant="danger"
              className="w-100 primary-red-background py-2 mt-5"
              onClick={handlePaymentIntent}
            >
              Make Payment - {price}KM
            </Button>
            {paymentError && (
              <p className="text-danger text-center mt-4">{paymentError}</p>
            )}
          </div>
          <div className="col-4">
            <h4 className="mb-3">Booking Summary</h4>
            <div
              style={{ backgroundColor: colors.dark_gray }}
              className="rounded-4 p-4 h-100"
            >
              <div className="d-flex gap-2 pb-3 border-bottom">
                <img
                  src={
                    projection.movieId.photos.find(
                      (photo) =>
                        photo.entityType === "movie" && photo.role === "poster"
                    )?.url
                  }
                  alt="image"
                  className="rounded-3 image"
                />
                <div className="px-3">
                  <h5 className="text-white fs-4">{projection.movieId.name}</h5>
                  <p className="text-white mt-3">
                    {projection.movieId.pgRating}{" "}
                    <span className="primary-red">|</span>{" "}
                    {projection.movieId.language}{" "}
                    <span className="primary-red">|</span>{" "}
                    {projection.movieId.movieDuration} min
                  </p>
                </div>
              </div>
              <div className="mt-3 d-flex flex-column gap-2">
                <h5 style={{ color: colors.text_gray }}>Date and Time</h5>
                <h5 className="text-white">
                  {selectedDay.day}, {selectedDay.date} at{" "}
                  {projection.projectionTime.slice(0, 5)}
                </h5>
                <h5 className="mt-2" style={{ color: colors.text_gray }}>
                  Cinema Details
                </h5>
                <h5 className="text-white">
                  {projection.venueId.name}: Cinebh, {projection.venueId.street}{" "}
                  {projection.venueId.streetNo}, {projection.venueId.city}
                </h5>
                <h5 className="text-white">Hall 1</h5>
                <h5 className="mt-2" style={{ color: colors.text_gray }}>
                  Seat(s) details
                </h5>
                <h5 className="text-white">Seat(s): {seatNos.join(", ")}</h5>
                <h5 className="mt-2" style={{ color: colors.text_gray }}>
                  Price Details
                </h5>
                <h5 className="text-white">Total Price: {price} KM</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header>
          <Modal.Title className="fw-bold py-1 px-3">
            Session Expired
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="fw-light px-3">
            Your session expired and seats have been refreshed and updated.
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="primary-red text-white"
            onClick={handlePopupClose}
          >
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessPopup} onHide={handleSuccessPopupClose}>
        <Modal.Header>
          <Modal.Title className="fw-bold py-1 px-3">
            Payment Successful
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="fw-light px-3">
            The receipt and ticket have been sent to your email. You may
            download them immediately, or retrieve them later from your User
            profile.
          </h6>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button
            variant="danger"
            className="back-to-home"
            onClick={handleSuccessPopupClose}
          >
            Back to Home
          </Button>
          <Button
            variant="danger"
            className="primary-red-background text-white"
            onClick={handleSuccessPopupClose}
          >
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkout;
