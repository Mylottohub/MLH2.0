import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../pages/slices/userApiSlice";
import "../assets/css/register.css";
import { useDispatch } from "react-redux";
import { setEmailAddress } from "./slices/authSlice";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setEmailAddress(data.email));
      window.location.href = res.data;
    } catch (err) {
      if (err?.data?.error) {
        toast.error(err.data.error);
      } else {
        toast.error("An error occurred during Login.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-6 mx-auto app__register">
            <div style={{ float: "left", marginBottom: "1%" }}></div>
            <h1 className="mb-4">Login</h1>
            <h6 className="mb-4">
              Play all your favorite Nigerian lotto games from one account on
              mylottohub and get your winnings paid instantly to your bank
              account
            </h6>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control mb-4 p-3"
                  placeholder=" Email Address"
                  name="email"
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

              {errors.password && (
                <p className="text-danger text-capitalize">
                  {errors.password.message}
                </p>
              )}
              <p style={{ cursor: "pointer", color: "#406777" }}>
                Don`t have an account?{" "}
                <span
                  className="text-primary"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </span>
              </p>

              <Button
                type="submit"
                className="w-100 p-3 mb-5"
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
                  " Login"
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

export default Login;
