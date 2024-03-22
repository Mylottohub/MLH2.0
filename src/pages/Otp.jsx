import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Button, Spinner } from "react-bootstrap";
import "../assets/css/register.css";
import { useUserotpMutation } from "../pages/slices/userApiSlice";
import { setCredentials } from "../pages/slices/authSlice";
import { toast } from "react-toastify";
import { HTTP } from "../utils";
import { useLocation } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string(),
});

const Otp = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [userotp, { isLoading }] = useUserotpMutation();

  const email = sessionStorage.getItem("email");

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
      dispatch(setCredentials({ ...res }));

      const getAccessIdFromURL = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get("accessId");
      };

      const accessId = getAccessIdFromURL();
      const payload = {
        accessId: accessId,
        redirect_url: "https://mlh2.netlify.app/",
        user_details: email,
      };
      const response = await HTTP.post("/user-verification", payload);

      const verificationURL = response?.data?.verificationURL;

      if (verificationURL) {
        window.location.href = verificationURL;
      } else {
        throw new Error("Verification URL not found in response data");
      }

      toast.success("Verification Successful");
      sessionStorage.removeItem("email");
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
            <h1 className="mb-4">VERIFY YOUR DEVICE/EMAIL</h1>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control p-3 mb-2"
                  required
                  name="email"
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
  );
};

export default Otp;
