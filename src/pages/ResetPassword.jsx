import { useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useResetpaswordMutation } from "../pages/slices/userApiSlice";
import { setCredentials } from "../pages/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/css/register.css";

const schema = yup.object().shape({
  email: yup.string().email().required("This is a required field"),
  token: yup.string().required("This is a required field"),
  password: yup.string().min(8).max(15).required(),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [resetpasword, { isLoading }] = useResetpaswordMutation();
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      const res = await resetpasword(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Password updated Successfully");
      sessionStorage.removeItem("token");
      navigate("/");
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
            <h1 className="mb-4">Reset Password</h1>

            <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "password" : "text"}
                  className="form-control mb-2 p-3"
                  placeholder="Enter New Password"
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
                    style={{
                      color: "#6E9A8D",
                      marginLeft: "-30px",
                      marginTop: "10px",
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </p>
                </div>
                {errors.password && (
                  <p className="text-danger text-capitalize">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-3" style={{ display: "none" }}>
                <input
                  type="email"
                  className="form-control p-3 mb-2"
                  name="email"
                  defaultValue={email}
                  {...register("email", {
                    required: "Required",
                  })}
                />
              </div>

              <div className="mb-3" style={{ display: "none" }}>
                <input
                  type="text"
                  className="form-control p-3 mb-2"
                  name="token"
                  defaultValue={token}
                  {...register("token", {
                    required: "Required",
                  })}
                />
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
                  " Save"
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

export default ResetPassword;
