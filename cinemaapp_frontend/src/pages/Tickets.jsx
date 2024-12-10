import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TicketCard from "../components/TicketCard";

const Tickets = () => {
  return (
    <div>
      <NavBar />

      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="p-5 fw-bold">Pricing</h2>

        <p style={{ maxWidth: "600px" }} className="text-center">
          Welcome to our cinema ticket pricing options! We offer three tiers to
          suit everyone's preferences. Explore our pricing options below and
          treat yourself to a cinematic adventure like never before!
        </p>
      </div>

      <div className="d-flex flex-column flex-md-column flex-lg-row justify-content-center align-items-center gap-5 py-5">
        <TicketCard
          promo={false}
          title="Regular seats"
          price={7}
          features={[
            "Comfortable seating",
            "Affordable pricing",
            "Wide selection",
            "Accessible locations",
            "Suitable for everyone",
          ]}
        />
        <TicketCard
          promo={true}
          title="Love seats"
          price={24}
          features={[
            "Side-by-side desing",
            "Comfortable padding",
            "Adjustable armrests",
            "Cup holders",
            "Reserved for couples",
          ]}
        />
        <TicketCard
          promo={false}
          title="VIP seats"
          price={10}
          features={[
            "Enhanced comfort",
            "Priority seating",
            "Prime viewing",
            "Personal space",
            "Luxury extras",
          ]}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Tickets;
