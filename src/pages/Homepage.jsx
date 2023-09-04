import React from "react";
import "../assets/css/navbar.css";
import Slider from "../components/Slider";
import Operator from "../components/Operator";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <React.Fragment>
      <div>
        <section>
          <Navbar />
        </section>

        <section>
          <Slider />
        </section>

        <section>
          <Operator />
        </section>

        <footer>
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
