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
import { useGetProfileUser } from "../react-query";

const Homepage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userProfileResponse, expires } = useGetProfileUser([]);

  useEffect(() => {
    const getCodeFromURL = () => {
      const searchParams = new URLSearchParams(location.search);
      return searchParams.get("code");
    };

    const exchangeCodeForToken = async (code) => {
      try {
        const payload = { code, type: "user" };
        const response = await HTTP.post("/miracl-hook", payload);
        const data = response?.data;

        if (data?.token) {
          dispatch(setCredentials(data));
          toast.success("Login Successfully");
          const userID = data?.data?.id;

          if (!userID) {
            throw new Error("User not found");
            // toast.error("User ID missing in Miracl response:", data);
          } else {
            try {
              await HTTP.post("/get_temp_token", { userID });
            } catch (tempTokenErr) {
              // toast.error("Failed to create temp token");
            }
          }
        } else {
          throw new Error("Token not found in response data");
        }
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
    };

    const code = getCodeFromURL();
    if (code) {
      exchangeCodeForToken(code);
    }
  }, [location, dispatch]);

  useEffect(() => {}, [userProfileResponse, expires]);

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
