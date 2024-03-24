import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import "../assets/css/register.css";
import { toast } from "react-toastify";
import { HTTP } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearEmailAddress } from "./slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  email: yup.string(),
});

const Otp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const email = sessionStorage.getItem("email");
  const { email } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const clearPhoneNumberHandler = () => {
    dispatch(clearEmailAddress());
  };

  const submitForm = async () => {
    setIsLoading(true);

    try {
      const getAccessIdFromURL = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get("accessId");
      };

      const accessId = getAccessIdFromURL();
      const payload = {
        accessId: accessId,
        user_details: email,
      };
      const response = await HTTP.post("/user-verification", payload);

      const verificationURL = response?.data?.data?.verificationURL;
      if (verificationURL) {
        toast.success("Verification Successful");
        clearPhoneNumberHandler();
        window.location.href = verificationURL;
      }
    } catch (err) {
      if (err?.data?.error) {
        toast.error(err.data.error);
      } else {
        toast.error("An error occurred during Verification.");
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
          <div className="col-lg-6 mx-auto app__register">
            <h1 className="mb-4">VERIFY YOUR EMAIL ADDRESS</h1>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control p-3 mb-2"
                  required
                  name="email"
                  readOnly
                  defaultValue={email}
                  {...register("email", {
                    required: "Required",
                  })}
                />
                {errors.email && (
                  <p className="text-danger text-capitalize">
                    Email must be a valid email address
                  </p>
                )}
              </div>

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
  ) : (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-6 mx-auto mt-5 app__register">
          <h1 className="mb-4">PROCEED TO LOGIN FOR VERIFICATION</h1>
          <a
            onClick={() => {
              navigate(`/login`);
            }}
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
