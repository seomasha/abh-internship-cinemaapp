import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "rsuite/dist/rsuite.min.css";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Tickets from "./pages/Tickets";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./utils/ScrollToTop";
import CurrentlyShowing from "./pages/CurrentlyShowing";
import UpcomingMovies from "./pages/UpcomingMovies";
import MovieDetails from "./pages/MovieDetails";
import AdminPanel from "./pages/AdminPanel";
import SeatAndTickets from "./pages/SeatAndTickets";

import { NavBarProvider } from "./context/NavBarContext";
import Checkout from "./pages/Checkout";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function App() {
  return (
    <div className="main-font primary-background">
      <Router>
        <NavBarProvider>
          <ScrollToTop />
          <ToastContainer />
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/currently-showing" element={<CurrentlyShowing />} />
              <Route path="/upcoming" element={<UpcomingMovies />} />
              <Route path="/movie-details/:id" element={<MovieDetails />} />
              <Route path="/seat-and-tickets" element={<SeatAndTickets />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Elements>
        </NavBarProvider>
      </Router>
    </div>
  );
}

export default App;
