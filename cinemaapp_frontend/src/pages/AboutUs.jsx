import React from "react";

import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";

import backgroundImage from "../assets/images/cinema-background.jpg";

const AboutUs = () => {
  return (
    <div>
      <MyNavbar />

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "150px 150px 2rem 150px" }}
      >
        <h2 style={{ fontFamily: "Urbanist Bold" }}>
          About Our Dream. <br />
          Our History.
          <br />
          Cinema.
        </h2>

        <div className="w-75">
          <h1 style={{ fontSize: "64px", fontFamily: "Urbanist Bold" }}>
            About us
          </h1>
          <p style={{ fontSize: "1rem", marginTop: "2rem" }}>
            Welcome to Cinebh where movie magic comes to life.
            <br />
            At Cinebh, we're not just about screening films; we're passionate
            about creating unforgettable cinematic experiences. Since our
            establishment, we've ben dedicated to providing our audience with
            top-quality entertainment in a comfortable and welcoming
            environment.
            <br />
            Our state-of-the-art facilities boast the latest in audiovisual
            technology, ensuring that every movie is presented with stunning
            clarity and immersive sound. From the latest blockbusters to
            timeless classics, our diversce selection of films caters to every
            taste and preference.
            <br />
            <br />
            As a hub for community entertainment, we take pride in being more
            than just a cinema.
            <br />
            Join us at Cinebh and discover why we're not just your average movie
            theater - we're your destination for cinematic excellencec and
            entertainment bliss.
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          minHeight: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <Footer />
    </div>
  );
};

export default AboutUs;
