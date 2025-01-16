import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";

const Venue = () => {
  return (
    <div>
      <NavBar />

      <h3 className="p-5">Venue Details</h3>

      <div className="px-5">
        <div className="d-flex py-3 gap-2 border rounded-4">
          <img
            src="https://via.placeholder.com/300"
            width={700}
            height={400}
            className="rounded-3 mx-3"
          />
          <div className="p-5">
            <h5>Cinebh: Cineplexx</h5>
            <div className="d-flex gap-3 my-3">
              <CiLocationOn size={18} className="primary-red" />
              <p>Zmaja od Bosne 4, Sarajevo 71000</p>
            </div>
            <div className="d-flex gap-3 my-3">
              <FiPhone size={18} className="primary-red" />
              <p>+123 456 789</p>
            </div>
          </div>
        </div>

        <h2 className="pt-5">Movies playing in Cinebh: Cineplexx (14)</h2>

        <div className="d-flex gap-3 justify-content-between mt-3">
          <Card
            title="Test"
            subtitle="117"
            imageUrl="https://via.placeholder.com/300"
            genre="SciFi"
          />
          <Card
            title="Test"
            subtitle="117"
            imageUrl="https://via.placeholder.com/300"
            genre="SciFi"
          />
          <Card
            title="Test"
            subtitle="117"
            imageUrl="https://via.placeholder.com/300"
            genre="SciFi"
          />
          <Card
            title="Test"
            subtitle="117"
            imageUrl="https://via.placeholder.com/300"
            genre="SciFi"
          />
        </div>
      </div>

      <p className="text-center primary-red my-5 fw-bold text-decoration-underline fs-6 pointer">
        Load more
      </p>

      <Footer />
    </div>
  );
};

export default Venue;
