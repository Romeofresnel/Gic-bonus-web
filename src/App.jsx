import { useState } from "react";
import Home from "./pages/Home";
import Apropos from "./pages/Apropos";
import Services from "./pages/Services";
import Temoignage from "./pages/Temoignage";
import Map from "./pages/Map";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <div className="container-web-site">
        <Home />
        <Apropos />
        <Services />
        <Temoignage />
        <Map />
        <Contact />
      </div>
    </>
  );
}

export default App;
