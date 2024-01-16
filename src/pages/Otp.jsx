import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import { useUserotpMutation } from "../pages/slices/userApiSlice";
import { setCredentials } from "../pages/slices/authSlice";
// import { useEffect } from "react";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  token: yup.string().required("Otp is required"),
  email: yup.string(),
});

const Otp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userotp, { isLoading }] = useUserotpMutation();

  const email = sessionStorage.getItem("email");
  const userPasswordMessage = sessionStorage.getItem("password-reset");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      const res = await userotp(data).unwrap();
      const { token, data: userInfo } = res;
      toast.success("OTP has been confirmed Successfully");
      if (userPasswordMessage) {
        navigate("/reset-password");
        sessionStorage.removeItem("password-reset");
      } else {
        dispatch(setCredentials({ token, data: userInfo }));
        navigate("/");
      }
    } catch (err) {
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("An error occurred during verification.");
      }
    }
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
                  name="token"
                  {...register("token", {
                    required: "Required",
                  })}
                />
                {errors.token && (
                  <p className="text-danger text-capitalize">
                    {errors.token.message}
                  </p>
                )}
              </div>

              <div className="mb-3" style={{ display: "none" }}>
                <input
                  type="tel"
                  className="form-control p-3 mb-2"
                  name="email"
                  defaultValue={email}
                  {...register("email", {
                    required: "Required",
                  })}
                />
              </div>

              {/* 
              <button type="submit" className="btn btn-primary w-100 p-3">
                Register
              </button> */}
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
