import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
// import { useEffect } from "react";
import { useRegistersMutation } from "../pages/slices/userApiSlice";
import { setCredentials } from "../pages/slices/authSlice";
import ReCaptchaV2 from "react-google-recaptcha";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import 'react-phone-number-input/style.css'
// import PhoneInputWithCountryFlag from "../components/PhoneInput/PhoneInputWithCountryFlag";

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup.string().email().required(),
  username: yup.string().required("User Name is a required field"),
  phone: yup.string().min(8).max(15).required(),
  // check: yup.string().required("This is a required field"),
  password: yup.string().min(8).max(15).required(),
  password_confirmation: yup.string().oneOf([yup.ref("password"), null]),
});

const siteKey = import.meta.env.VITE_SITE_KEY;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registers, { isLoading }] = useRegistersMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      localStorage.setItem("email", data.email);
      const res = await registers(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(
        "Registration successful, an OTP has been sent to your email for verfication"
      );
      navigate("/otp");
    } catch (err) {
      if (err?.data?.details) {
        const errorDetails = err.data.details;
        Object.values(errorDetails).forEach((errorMessages) => {
          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        });
      } else {
        // Handle other error cases or display a generic error message
        toast.error("An error occurred during registration.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto mb-5 app__register">
            <h1 className="mb-4">Register</h1>
            <h6 className="mb-4">
              Play all your favorite Nigerian lotto games from one account on
              mylottohub and get your winnings paid instantly to your bank
              account
            </h6>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2 p-3"
                  placeholder="Full Name"
                  name="name"
                  {...register("name", {
                    required: "Required",
                  })}
                />
                {errors.name && (
                  <p className="text-danger text-capitalize">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2 p-3"
                  placeholder=" Username"
                  name="username"
                  {...register("username", {
                    required: "Required",
                  })}
                />
                {errors.username && (
                  <p className="text-danger text-capitalize">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control mb-2 p-3"
                  placeholder=" Email Address"
                  name="email"
                  {...register("email", {
                    required: "Required",
                  })}
                />
                {errors.email && (
                  <p className="text-danger text-capitalize">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control mb-2 p-3"
                  placeholder="Phone number"
                  name="phone"
                  {...register("phone", {
                    required: "Required",
                  })}
                />
                {errors.phone && (
                  <p className="text-danger text-capitalize">
                    Phone number is field is required
                  </p>
                )}
              </div>
              {/* <PhoneInputWithCountryFlag  /> */}

              {/* <div className="mb-3 d-flex h-25">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-2"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: "Required",
                  })}
                />
                &nbsp; &nbsp;
                <div>
                  <button
                    className="btn"
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{ color: "#6E9A8D" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div> */}
                <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-2 p-3"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: "Required",
                  })}
                />
                <div
                  className="position-absolute end-0 top-50 translate-middle-y"
                  style={{ right: "10px", cursor: "pointer" }}
                >
                  <p
                   
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{ color: "#6E9A8D", marginLeft:'-30px', marginTop:'10px' }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </p>
                </div>
              </div>
              {errors.password && (
                <p className="text-danger text-capitalize">
                  {errors.password.message}
                </p>
              )}

      
                <div className="mb-3 position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control p-3"
                  placeholder="Confirm Password"
                  aria-describedby="emailHelp"
                  name="password_confirmation"
                  {...register("password_confirmation", {
                    required: "Required",
                  })}
                />
             
                <div   className="position-absolute end-0 top-50 translate-middle-y"
                  style={{ right: "10px", cursor: "pointer" }}>
                  <p
                   
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ color: "#6E9A8D", marginLeft:'-30px', marginTop:'10px' }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </p>
                </div>
              </div>
              {errors.password_confirmation && (
                <p className="text-danger text-capitalize mt-3">
                  Password does not match
                </p>
              )}

              <div className="mb-3 form-check mt-4">
                <input type="checkbox" className="form-check-input" required />
                <label className="form-check-label">
                  I have read the{" "}
                  <a
                    className="text-primary"
                    onClick={() => {
                      navigate(`/terms`);
                    }}
                    style={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {/* <p className="text-primary" style={{ cursor: "pointer" }}>
                Already have an account?
                <span onClick={() => navigate("/login")}>Sign in</span>
              </p> */}
               <p style={{ cursor: "pointer", color: "#406777" }}>
               Already have an account?
                <span
                  className="text-primary"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </p>
              <ReCaptchaV2 sitekey={siteKey} />
              <Button
                type="submit"
                className="w-100 p-3 mt-3"
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
                  " Register"
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

export default Register;
