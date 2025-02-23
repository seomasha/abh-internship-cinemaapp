import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <NavBar />

      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <h2 className="fw-bold">
              About Our Dream. <br />
              Our History. <br />
              Cinema.
            </h2>
          </div>

          <div className="col-lg-6 col-md-12">
            <h1 className="fw-bold title">About us</h1>
            <p className="fs-6 mt-5">
              Welcome to Cinebh where movie magic comes to life.
              <br />
              At Cinebh, we're not just about screening films; we're passionate
              about creating unforgettable cinematic experiences. Since our
              establishment, we've been dedicated to providing our audience with
              top-quality entertainment in a comfortable and welcoming
              environment.
              <br />
              Our state-of-the-art facilities boast the latest in audiovisual
              technology, ensuring that every movie is presented with stunning
              clarity and immersive sound. From the latest blockbusters to
              timeless classics, our diverse selection of films caters to every
              taste and preference.
              <br />
              <br />
              As a hub for community entertainment, we take pride in being more
              than just a cinema.
              <br />
              Join us at Cinebh and discover why we're not just your average
              movie theater - we're your destination for cinematic excellence
              and entertainment bliss.
            </p>
          </div>
        </div>
      </div>

      <div className="about-us-image"></div>

      <Footer />
    </div>
  );
};

export default AboutUs;
