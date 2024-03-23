import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import { useRegistersMutation } from "../pages/slices/userApiSlice";
import ReCaptchaV2 from "react-google-recaptcha";

const schema = yup.object().shape({
  name: yup.string().required("This is a required field"),
  email: yup.string().email().required(),
  username: yup.string().required("This is a required field"),
  phone: yup.string().min(11).max(11).required(),
});

const siteKey = import.meta.env.VITE_SITE_KEY;

const Register = () => {
  const navigate = useNavigate();

  const [registers, { isLoading }] = useRegistersMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      sessionStorage.setItem("email", data.email);
      const res = await registers(data).unwrap();
      if (res) {
        toast.success(
          "Registration successful, check your email address for verification link."
        );
      }
      // window.location.href = res.data.verificationURL;
    } catch (err) {
      if (err?.data?.error) {
        toast.error(err.data.error);
      } else {
        toast.error("An error occurred during Registration.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-6 mx-auto mb-5 app__register">
            <h1 className="mb-4">Register</h1>
            <p className="mb-4 text-center">
              Play all your favorite Nigerian lotto games from one account on
              mylottohub and get your winnings paid instantly to your bank
              account
            </p>

            <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
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
                  type="number"
                  min={1}
                  className="form-control mb-2 p-3"
                  placeholder="Phone Number"
                  name="phone"
                  {...register("phone", {
                    required: "Required",
                  })}
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 11))
                  }
                />
                {errors.phone && (
                  <p className="text-danger text-capitalize">
                    Phone number is field is required
                  </p>
                )}
              </div>

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
