import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import "../assets/css/register.css";
import { toast } from "react-toastify";
import { HTTP } from "../utils";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .when("method", {
      is: "email",
      then: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
  phone: yup.string().when("method", {
    is: "phone",
    then: yup.string().required("Phone number is required"),
  }),
  otp: yup.string().required("OTP is required"),
});

const Otp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState(null); // new state variable
  const [emailOtp, setEmailOtp] = useState("");
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const generateOTP = async () => {
    const isValid = await trigger(
      verificationMethod === "email" ? "email" : "phone"
    );

    if (!isValid) {
      return;
    }

    if (verificationMethod === "email" && getValues("email") === "") {
      toast.error("Please enter an email address");
      return;
    }

    if (verificationMethod === "phone" && getValues("phone") === "") {
      toast.error("Please enter a phone number");
      return;
    }

    setIsLoading(true);
    try {
      await HTTP.post("/generate-user-otp", { user_details: emailOtp });
      const successMessage =
        verificationMethod === "email"
          ? "OTP sent to your email address successfully"
          : "OTP sent to your phone number successfully";
      toast.success(successMessage);
      setShowOTPInput(true);
    } catch (error) {
      const errorMessage =
        verificationMethod === "email"
          ? "Invalid Email Address"
          : "Invalid Phone Number";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = async (data) => {
    setIsLoading(true);

    try {
      const getAccessIdFromURL = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get("accessId");
      };

      const accessId = getAccessIdFromURL();
      const payload = {
        accessId: accessId,
        user_details: verificationMethod === "email" ? data.email : data.phone,
        type: verificationMethod,
      };
      const payloadOtp = {
        token: data.otp,
      };
      const otpResponse = await HTTP.post("/otp", payloadOtp);
      if (otpResponse) {
        toast.success("OTP has been confirmed Successfully");
        const verificationResponse = await HTTP.post(
          "/user-verification",
          payload
        );
        const verificationURL =
          verificationResponse?.data?.data?.verificationURL;
        if (verificationURL) {
          window.location.href = verificationURL;
        }
      } else {
        toast.error("OTP is wrongly inputted");
      }
    } catch (err) {
      if (err?.message) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error("Wrong OTP.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const accessIdPresent = location.search.includes("accessId");

  return accessIdPresent ? (
    <>
      <Navbar />
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-6 mt-5 mx-auto app__register">
            <h1 className="mb-4 text-capitalize">
              {verificationMethod === "email"
                ? "Verify your Email address"
                : verificationMethod === "phone"
                ? "Verify your Phone Number"
                : "Verify your Email address/Phone Number"}
            </h1>

            <form onSubmit={handleSubmit(submitForm)}>
              {!verificationMethod && (
                <div>
                  <div className="d-flex mt-5 justify-content-between mb-3">
                    <Button
                      type="button"
                      className="w-100 p-2"
                      onClick={() => setVerificationMethod("email")}
                    >
                      Verify With Email Address
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      type="button"
                      className="w-100 p-2"
                      onClick={() => setVerificationMethod("phone")}
                    >
                      Verify With Phone Number
                    </Button>
                  </div>
                </div>
              )}

              {verificationMethod === "email" && (
                <div className="mb-3">
                  <div className="mb-3">
                    <input
                      type="email"
                      required
                      className="form-control mb-4 p-3"
                      placeholder="Email Address"
                      name="email"
                      {...register("email")}
                      onChange={(e) => setEmailOtp(e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-danger text-capitalize">
                        {errors.email.message ||
                          "Please enter an email address"}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {verificationMethod === "phone" && (
                <div className="mb-3 w-100">
                  <PhoneInput
                    country={"ng"}
                    inputClass="form-control mb-4 w-100"
                    placeholder="Phone Number"
                    name="phone"
                    {...register("phone")}
                    format={"(ddd) ddd-dddd"} // Add this line
                    onChange={(value) => {
                      const formattedValue = value.replace(/^234/, "234");
                      setEmailOtp(formattedValue);
                      setValue("phone", formattedValue);
                    }}
                  />
                  {errors.phone && (
                    <p className="text-danger text-capitalize">
                      {errors.phone.message || "Please enter a phone number"}
                    </p>
                  )}
                </div>
              )}

              {showOTPInput && (
                <div className="mb-3">
                  <input
                    type="number"
                    required
                    min="1"
                    className="form-control p-3 mb-2"
                    name="otp"
                    placeholder="Enter OTP"
                    {...register("otp")}
                  />
                  {errors.otp && (
                    <p className="text-danger text-capitalize">
                      {errors.otp.message}
                    </p>
                  )}
                </div>
              )}

              {!showOTPInput && verificationMethod && (
                <Button
                  type="button"
                  className="w-100 p-3"
                  onClick={generateOTP}
                >
                  {isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              )}

              {showOTPInput && (
                <Button
                  type="submit"
                  className="w-100 p-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Verify"
                  )}
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-6 mx-auto mt-5 app__register">
          <h1 className="mb-4">PROCEED TO LOGIN FOR VERIFICATION</h1>

          <a
            onClick={() =>
              (window.location.href =
                // "https://api.mpin.io/authorize?client_id=v8kfysqoljbgd&response_type=code&scope=openid+email+profile&redirect_uri=https://app.mylottohub.com")
                "https://api.mpin.io/authorize?client_id=vv4g3gaqxgvhi&response_type=code&scope=openid+email+profile&redirect_uri=https://mlh2.netlify.app")
            }
            className="w-100 p-3 btn btn-light"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Otp;
