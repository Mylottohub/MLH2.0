import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForgotpaswordMutation } from "../pages/slices/userApiSlice";
import { setCredentials } from "../pages/slices/authSlice";
// import HTTP from "../utils/httpClient";
import "../assets/css/register.css";

const schema = yup.object().shape({
  user_details: yup.string().email().required("This is a required field"),
});

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [forgotpasword, { isLoading }] = useForgotpaswordMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/otp");
    }
  }, [navigate, userInfo]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      const res = await forgotpasword(data).unwrap();
      sessionStorage.setItem("email", data.user_details);
      sessionStorage.setItem("password-reset", "password-reset");
      dispatch(setCredentials({ ...res }));
      toast.success("OTP code generated successfully");
      navigate("/otp");
    } catch (err) {
      if (err?.data?.error) {
        toast.error(err.data.error);
      } else {
        toast.error("An error occurred Pls try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto app__register">
            <h1 className="mb-4">Forgot Password</h1>
            <h6 className="mb-4">
              Enter your email address to receive an OTP for Password Reset
            </h6>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control p-3 mb-2"
                  placeholder=" Email Address"
                  name="user_detail"
                  {...register("user_details", {
                    required: "Required",
                  })}
                />
                {errors.user_details && (
                  <p className="text-danger text-capitalize">
                    {errors.user_details.message}
                  </p>
                )}
              </div>

              <p style={{ cursor: "pointer", color: "#406777" }}>
                Already have an account?{" "}
                <span onClick={() => navigate("/login")}>Sign in</span>
              </p>

              <Button type="submit" className="w-100 p-3" disabled={isLoading}>
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  " Reset"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ForgetPassword;
