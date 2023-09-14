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
import ReCaptchaV2 from 'react-google-recaptcha'
// import 'react-phone-number-input/style.css'
// import PhoneInputWithCountryFlag from "../components/PhoneInput/PhoneInputWithCountryFlag";


const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup.string().email().required(),
  username: yup.string().required("User Name is a required field"),
  phone: yup.string().min(8).max(15).required(),
  // check: yup.string().required("This is a required field"),
  password: yup.string().min(8).max(15).required(),
});

const siteKey = import.meta.env.VITE_SITE_KEY;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registers, { isLoading }] = useRegistersMutation();
  // const { userInfo } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/otp");
  //   }
  // }, [navigate, userInfo]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      // console.log(data);
      // let userEmail = localStorage.setItem('email');
      localStorage.setItem("email", data.email);
      // console.log(userEmail);
      const res = await registers(data).unwrap();
      dispatch(setCredentials({...res}));
      toast.success("Registration successful, an OTP has been sent to your email for verfication");
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
          <div className="col-lg-6 mx-auto app__register">
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
                  className="form-control p-3 mb-2"
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
                  className="form-control p-3 mb-2"
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
                  className="form-control p-3 mb-2"
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
                  className="form-control p-3 mb-2"
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
              {/* <PhoneInputWithCountryFlag /> */}

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control p-3 mb-2"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: "Required",
                  })}
                />
                {errors.password && (
                  <p className="text-danger text-capitalize">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  // name="check"
                  // {...register("check", {
                  //   required: "Required",
                  // })}
                />
                <label className="form-check-label">
                  I have read the Terms and Conditions
                </label>
                {/* {errors.check && (
                  <p className="text-danger text-capitalize">
                    {errors.check.message}
                  </p>
                )} */}
              </div>
              <p style={{ cursor: "pointer", color: "#128481" }}>
                Already have an account?
                <span onClick={() => navigate("/login")}>Sign in</span>
              </p>
              <ReCaptchaV2 sitekey={siteKey} />
              <Button type="submit" className="w-100 p-3 mt-3" disabled={isLoading}>
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
