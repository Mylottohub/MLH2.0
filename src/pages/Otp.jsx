import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { toast } from "react-toastify";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import HTTP from "../utils/httpClient";
import "../assets/css/register.css";
import { useState } from "react";

const schema = yup.object().shape({
    otp: yup.string().required("Otp is a required"),
});

const Otp = () => {
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
    navigate("/");

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
            <h1 className="mb-4">OTP VERIFICATION</h1>
            <h6 className="mb-4">
              Play all your favorite Nigerian lotto games from one account on
              mylottohub and get your winnings paid instantly to your bank
              account
            </h6>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control p-3 mb-2"
                  placeholder="Enter Otp"
                  name="otp"
                  {...register("otp", {
                    required: "Required",
                  })}
                />
                {errors.otp && (
                  <p className="text-danger text-capitalize">
                    {errors.otp.message}
                  </p>
                )}
              </div>

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
                  " Verify"
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

export default Otp;
