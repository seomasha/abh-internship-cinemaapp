import React from "react";

import MyNavbar from "./components/MyNavbar";
import Hero from "./components/Hero";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div style={{fontFamily: "Urbanist"}}>
      <MyNavbar />
      <Hero />
    </div>
  );
}

export default App;
