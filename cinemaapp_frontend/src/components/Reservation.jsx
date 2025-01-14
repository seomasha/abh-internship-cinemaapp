import React, { useState } from "react";

import { CiCircleInfo } from "react-icons/ci";
import { OverlayTrigger, Popover, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Reservation.css";
import { FaBell } from "react-icons/fa";

const Reservation = ({ image, upcoming = false, past = false }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [showModal, setShowModal] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body
        className="rounded"
        style={{ backgroundColor: "#1D2939", color: "white" }}
      >
        {past
          ? "Projection passed and more details are no longer available"
          : "Reservation expires one hour before projection"}
      </Popover.Body>
    </Popover>
  );

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="d-flex">
      <div className="border w-100 m-5 p-4 rounded-4">
        <div className="d-flex justify-content-between mb-4">
          <h6>Avatar: The way of water</h6>
          <div className="d-flex align-items-center gap-2">
            {!upcoming && (
              <>
                <OverlayTrigger
                  placement="top"
                  overlay={popover}
                  delay={{ show: 100, hide: 200 }}
                >
                  <span>
                    <CiCircleInfo size={24} style={{ cursor: "pointer" }} />
                  </span>
                </OverlayTrigger>
                {past ? (
                  <p className="primary-red fw-bold">Projection passed</p>
                ) : (
                  <h6 className="border rounded p-2">
                    {Math.floor(timeLeft / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(timeLeft % 60).toString().padStart(2, "0")}
                  </h6>
                )}
              </>
            )}
            {upcoming && (
              <Button
                className="bell"
                variant="danger"
                onClick={() => setShowModal(true)}
              >
                <FaBell size={16} className="primary-red" />
              </Button>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between gap-5">
          <div className="d-flex gap-3">
            <img src={image} height={150} width={150} className="rounded" />
            <div>
              <h6>Booking Details</h6>
              <p className="mt-3">Monday, Dec 22 at 18:00</p>
              <p className="mt-3">
                Cineplex: Cinebh, Zmaja od Bosne 4, Sarajevo 71000
              </p>
              <p className="mt-3 d-flex gap-2">
                PG-13 <span className="primary-red">|</span> English{" "}
                <span className="primary-red">|</span> 117 min{" "}
              </p>
            </div>
          </div>
          <div
            className="d-flex gap-5"
            style={{ marginRight: !upcoming && !past ? "0px" : "200px" }}
          >
            <div>
              <h6>Seat(s) details</h6>
              <p className="mt-3">
                Seat(s): <span className="fw-bold">A1, A2</span>
              </p>
              <p className="mt-3">
                Hall: <span className="fw-bold">Hall 1</span>
              </p>
              <p className="mt-3">
                Total Price: <span className="fw-bold">24 KM</span>
              </p>
            </div>
            {!upcoming && !past && (
              <div>
                <div className="d-flex flex-column gap-4">
                  <button className="btn button-primary py-2">
                    Buy Ticket
                  </button>
                  <button
                    className="btn button-secondary py-2"
                    onClick={handleShow}
                  >
                    Cancel Reservation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="fw-bold">
            {upcoming ? "Reminder On" : "Cancel Reservation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {upcoming
            ? "We will remind you about movie projection one day before the show."
            : "Do you want to cancel your reservation?"}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn button-secondary py-2">
            {upcoming ? "Cancel" : "Back"}
          </button>
          <button className="btn button-primary py-2">
            {upcoming ? "Remind Me" : "Yes, Cancel it"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Reservation;
