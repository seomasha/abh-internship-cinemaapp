import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CiCircleInfo, CiCreditCard1 } from "react-icons/ci";
import { Modal, Button } from "react-bootstrap";
import CreditCard from "../components/CreditCard";
import Separator from "../components/Separator";
import "../styles/Checkout.css";
import Input from "../components/Input";
import colors from "../utils/colors";
import { paymentService } from "../services/paymentService";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const Checkout = () => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPopup, setShowPopup] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

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
    //navigate("/");
  };

  const handlePaymentButton = async () => {
    const response = await paymentService.createPaymentIntent({
      amount: 1000,
      currency: "usd",
      receiptEmail: "maseticsead@gmail.com",
    });

    setClientSecret(response.clientSecret);
    handleConfirmPayment();
  };

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement); // Use specific element if split

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: "Customer Name",
        email: "customer-email@example.com",
      },
    });

    if (error) {
      console.error("Payment method creation failed", error.message);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error("Payment confirmation failed", confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment successful!", paymentIntent);
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

            <CreditCard />
            <CreditCard />

            <Separator dark={true} />

            <h4 className="my-4">Add New Card</h4>
            <label className="fw-bold">Card Number</label>
            <CardNumberElement
              className="border rounded p-2 bg-white"
              options={{
                style: {
                  invalid: { color: "#9e2146" },
                },
              }}
            />

            <div className="d-flex gap-5 mt-4">
              <div className="w-100">
                <label className="fw-bold">Expiry Date</label>
                <CardExpiryElement
                  className="border rounded p-2 bg-white"
                  options={{
                    style: {
                      invalid: { color: "#9e2146" },
                    },
                  }}
                />
              </div>
              <div className="w-100">
                <label className="fw-bold">CVV</label>
                <CardCvcElement
                  className="border rounded p-2 bg-white"
                  options={{
                    style: {
                      invalid: { color: "#9e2146" },
                    },
                  }}
                />
              </div>
            </div>

            <Button
              variant="danger"
              className="w-100 primary-red-background py-2 mt-5"
              onClick={handlePaymentButton}
            >
              Make Payment - 24KM
            </Button>
          </div>
          <div className="col-4">
            <h4 className="mb-3">Booking Summary</h4>
            <div
              style={{ backgroundColor: colors.dark_gray }}
              className="rounded-4 p-4 h-100"
            >
              <div className="d-flex gap-2 pb-3 border-bottom">
                <img
                  src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
                  alt="image"
                  className="rounded-3 image"
                />
                <div className="px-3">
                  <h5 className="text-white fs-4">
                    Avatar The Way Of The Water
                  </h5>
                  <p className="text-white mt-3">
                    PG - 13
                    <span className="primary-red"> |</span> English
                    <span className="primary-red"> |</span> 120 min
                  </p>
                </div>
              </div>
              <div className="mt-3 d-flex flex-column gap-2">
                <h5 style={{ color: colors.text_gray }}>Date and Time</h5>
                <h5 className="text-white">Monday, Dec 22 at 18:00</h5>
                <h5 className="mt-2" style={{ color: colors.text_gray }}>
                  Cinema Details
                </h5>
                <h5 className="text-white">
                  Cineplex: Cinebh, Zmaja od Bosne 4, Sarajevo 71000
                </h5>
                <h5 className="text-white">Hall 1</h5>
                <h5 className="mt-2" style={{ color: colors.text_gray }}>
                  Seat(s) details
                </h5>
                <h5 className="text-white">Seat(s): H3, H4</h5>
                <h5 className="mt-2" style={{ color: colors.text_gray }}>
                  Price Details
                </h5>
                <h5 className="text-white">Total Price: 24 KM</h5>
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
    </div>
  );
};

export default Checkout;
