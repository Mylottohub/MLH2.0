import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { toast } from "react-toastify";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import { useState } from "react";

const schema = yup.object().shape({
  fullname: yup.string().required("Name is a required field"),
  username: yup.string().required("User Name is a required field"),
  email: yup.string().email().required(),
  phone_number: yup.string().min(8).max(15).required(),
  password: yup.string().min(8).max(15).required(),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = (data) => {
    setIsSubmitting(true);
    console.log(data);
    setIsSubmitting(false);
    navigate("/otp");

    // Make the API call
    // HTTP
    //   .post("/register", data)
    //   .then((response) => {
    //     // Display the success message using toast
    //     setIsSubmitting(false); // Hide the spinner
    //     toast.success(response.data.message);
    //     handleClose();

    //     localStorage.setItem("token", response.data.token);

    //     history.push("/otp");
    //   })
    //   .catch((error) => {
    //     setIsSubmitting(false); // Hide the spinner

    //     if (error.response && error.response.data) {
    //       // If the error has a response and data property (indicating an error response from the server)
    //       const { message, errors } = error.response.data;
    //       // Display the custom error message using toast
    //       if (errors) {
    //         const errorMessages = Object.values(errors)
    //           .flat()
    //           .join(". ");
    //         toast.error(errorMessages);
    //       } else {
    //         toast.error(message || "An error occurred during registration.");
    //       }
    //     }
    //   });
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
                  name="fullname"
                  {...register("fullname", {
                    required: "Required",
                  })}
                />
                {errors.fullname && (
                  <p className="text-danger text-capitalize">
                    {errors.fullname.message}
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
                  name="phone_number"
                  {...register("phone_number", {
                    required: "Required",
                  })}
                />
                {errors.phone_number && (
                  <p className="text-danger text-capitalize">
                    {/* {errors.phone_number.message} */}
                    Phone number is field is required
                  </p>
                )}
              </div>

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
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">
                  I have read the Terms and Conditions
                </label>
              </div>
              <p style={{ cursor: "pointer", color: "#128481" }}>
                Already have an account?
                <span onClick={() => navigate("/login")}>Sign in</span>
              </p>
              {/* 
              <button type="submit" className="btn btn-primary w-100 p-3">
                Register
              </button> */}
              <Button
                type="submit"
                className="w-100 p-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
