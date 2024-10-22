import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Tickets from "./pages/Tickets";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./utils/ScrollToTop";
import CurrentlyShowing from "./pages/CurrentlyShowing";

function App() {
  return (
    <div className="main-font">
      <Router>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/currently-showing" element={<CurrentlyShowing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
