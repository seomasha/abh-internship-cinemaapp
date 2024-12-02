import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { CiCircleInfo, CiStar } from "react-icons/ci";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/SeatAndTickets.css";

const SeatAndTickets = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const seatPrices = {
    regular: 7,
    vip: 10,
    love: 24,
  };

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

  const handleSeatClick = (seat, seatType) => {
    setSelectedSeats((prevSeats) => {
      const seatAlreadySelected = prevSeats.some((item) => item.seat === seat);
      let newSeats = [];

      if (seatAlreadySelected) {
        newSeats = prevSeats.filter((item) => item.seat !== seat);
        setTotalPrice(
          prevSeats.reduce(
            (total, item) => (item.seat !== seat ? total + item.price : total),
            0
          )
        );
      } else {
        newSeats = [...prevSeats, { seat, price: seatPrices[seatType] }];
        setTotalPrice(
          prevSeats.reduce((total, item) => total + item.price, 0) +
            seatPrices[seatType]
        );
      }

      return newSeats;
    });
  };

  const getSeatClass = (seat) => {
    return selectedSeats.some((s) => s.seat === seat)
      ? "selected"
      : "available";
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div>
      <NavBar />
      <div>
        <div className="d-flex justify-content-between align-items-center p-3">
          <h3>Seat Options</h3>
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
        <div className="line" />
        <div className="d-flex gap-5 p-3">
          <img
            src="http://127.0.0.1:9001/api/v1/buckets/images/objects/download?preview=true&prefix=eternal-winter.jpg&version_id=null"
            alt="image"
            className="rounded image"
          />
          <div>
            <h4>Avatar: The way of water</h4>
            <p>
              PG 13 <span className="primary-red">|</span> English{" "}
              <span className="primary-red">|</span> 117 min
            </p>
          </div>
          <div>
            <h6>Booking Details</h6>
            <p>Monday, Dec 22 at 18:00</p>
            <p>Cineplexx: Cinebh, Zmaja od Bosne 4, Sarajevo 71000</p>
            <br />
            <p>Hall 1</p>
          </div>
        </div>
        <div className="gray-line" />
        <div className="d-flex justify-content-around gap-5 mt-3">
          <div className="text-center section">
            <p>Cinema screen</p>
            <div className="curved-screen" />
            <div>
              <div className="seat-grid">
                {["A", "B", "C", "D", "E", "F"].map((row, rowIndex) => (
                  <div className="seat-row" key={row}>
                    {["1", "2", "3", "4", "", "5", "6", "7", "8"].map(
                      (col, index) => {
                        const seat = `${row}${col !== "" ? col : ""}`;
                        return (
                          <div
                            key={seat}
                            className={`seat ${
                              col === "" ? "gap" : getSeatClass(seat)
                            }`}
                            onClick={
                              col !== ""
                                ? () => handleSeatClick(seat, "regular")
                                : undefined
                            }
                          >
                            {col !== "" ? seat : ""}
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}

                {["G", "H"].map((row, rowIndex) => (
                  <div className="seat-row" key={row}>
                    {["1", "2", "3", "4", "", "5", "6", "7", "8"].map(
                      (col, index) => {
                        const seat = `${row}${col !== "" ? col : ""}`;
                        return (
                          <div
                            key={seat}
                            className={`seat vip ${
                              col === "" ? "gap" : getSeatClass(seat)
                            }`}
                            onClick={
                              col !== ""
                                ? () => handleSeatClick(seat, "vip")
                                : undefined
                            }
                          >
                            {col !== "" ? (
                              <>
                                <CiStar size={16} />
                                {seat}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}

                <div className="seat-row love-seat">
                  {["1", "2", "", "3", "4"].map((col, index) => {
                    const seat = `I${col}`;
                    return (
                      <div
                        key={seat}
                        className={`seat love-seat ${
                          col === "" ? "gap" : getSeatClass(seat)
                        }`}
                        onClick={
                          col !== ""
                            ? () => handleSeatClick(seat, "love")
                            : undefined
                        }
                      >
                        {col !== "" ? seat : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between">
            <div>
              <p className="text-center">Seat Guide</p>
              <div className="d-flex flex-column gap-5 mt-3 section">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column gap-3">
                    <p>
                      <span className="border py-2 px-3 rounded">XY</span>{" "}
                      Available
                    </p>
                    <p>
                      <span className="gray-bg rounded py-2 px-3">XY</span>{" "}
                      Reserved
                    </p>
                    <p>
                      <span className="red-bg text-white py-2 px-3 rounded">
                        XY
                      </span>{" "}
                      Selected
                    </p>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <p>
                      <span className="border py-2 px-3 rounded">XY</span>{" "}
                      Regular Seats (7 BAM)
                    </p>
                    <p>
                      <span className="border p-2 rounded">
                        <CiStar size={20} className="mb-1" />
                        XY
                      </span>{" "}
                      VIP Seats (10 BAM)
                    </p>
                    <p>
                      <span className="border py-2 px-5 rounded">XY</span> Love
                      Seats (24 BAM)
                    </p>
                  </div>
                </div>
                <div>
                  <div className="gray-line-thin" />
                  <p className="text-center mt-4">Chosen Seats</p>
                  <div className="mt-2">
                    <div className="d-flex justify-content-between">
                      <p className="mt-2">Seat(s)</p>
                      <p>Total price</p>
                    </div>
                    <div className="gray-line" />
                    <div className="d-flex justify-content-between">
                      <h4>{selectedSeats.map((s) => s.seat).join(", ")}</h4>
                      <h4>{totalPrice} BAM</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="danger" className="red-bg mt-5">
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>

      <Modal show={showPopup} onHide={handlePopupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Time's Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your session time has expired. Redirecting...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopupClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SeatAndTickets;
