import React, { useEffect } from "react";
import "../assets/css/navbar.css";
import Slider from "../components/Slider";
import Operator from "../components/Operator";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../pages/slices/authSlice";
import { toast } from "react-toastify";
import { HTTP } from "../utils";

const Homepage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCodeFromURL = () => {
      const searchParams = new URLSearchParams(location.search);
      return searchParams.get("code");
    };

    const exchangeCodeForToken = async (code) => {
      try {
        const payload = {
          code,
          type: "user",
        };
        const response = await HTTP.post("/miracl-hook", payload);

        const data = response?.data;
        if (data?.token) {
          dispatch(setCredentials(data));
          toast.success("Login Successfully");
        } else {
          throw new Error("Token not found in response data");
        }
      } catch (error) {
        // toast.error("An error occurred during authentication.");
      }
    };

    const code = getCodeFromURL();
    if (code) {
      exchangeCodeForToken(code);
    }
  }, [location, dispatch]);
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
