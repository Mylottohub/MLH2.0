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
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("This is a required field"),
  g_recaptcha_response: yup.string(),
  // username: yup.string().required("This is a required field"),
  useEmail: yup.boolean().required(),
  email: yup
    .string()
    .email()
    .when("useEmail", {
      is: true,
      then: (schema) => schema.required("This is a required field"),
    }),
  phone: yup
    .string()
    .min(11)
    .max(11)
    .when("useEmail", {
      is: false,
      then: (schema) => schema.required("This is a required field"),
    }),
  referral_code: yup.string(),
});

const siteKey = import.meta.env.VITE_SITE_KEY;

const Register = () => {
  const navigate = useNavigate();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [useEmail, setUseEmail] = useState(null); // Initially, no form is shown
  const [captchaResponse, setCaptchaResponse] = useState(""); // State to store captcha response

  const [registers, { isLoading }] = useRegistersMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      useEmail: false, // Default to phone number
    },
  });

  useEffect(() => {
    if (useEmail !== null) {
      setValue("useEmail", useEmail);
    }
  }, [useEmail, setValue]);

  const handleCaptchaVerification = (response) => {
    setIsCaptchaVerified(true);
    setCaptchaResponse(response); // Capture captcha response
  };

  const [referralNumber, setReferralNumber] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referredUserId = urlParams.get("user");
    if (referredUserId) {
      // Set referral number in state and localStorage
      setReferralNumber(referredUserId);
      localStorage.setItem("referralNumber", referredUserId);
    } else {
      const storedReferralNumber = localStorage.getItem("referralNumber");
      if (storedReferralNumber) {
        setReferralNumber(storedReferralNumber);
      }
    }
  }, []);

  const switchRegistrationMethod = (method) => {
    if (method === "email") {
      resetField("phone");
      setUseEmail(true);
    } else {
      resetField("email");
      setUseEmail(false);
    }
  };

  const submitForm = async (data) => {
    try {
      if (useEmail) {
        sessionStorage.setItem("email", data.email);
      }
      if (referralNumber) {
        data.user = referralNumber;
      }
      data.g_recaptcha_response = captchaResponse;
      const res = await registers(data).unwrap();
      if (res) {
        toast.success(
          `Registration successful, check your ${
            useEmail ? "email address" : "phone number"
          } for the verification link.`
        );
        localStorage.removeItem("referralNumber");
      }
      navigate(`/`);
    } catch (err) {
      if (err?.data?.details?.email && err?.data?.details?.email.length > 0) {
        const errorDetails = err?.data?.details?.email[0];
        toast.error(errorDetails);
      } else {
        // Handle generic error
        toast.error(err?.data?.messgae);
      }
    }
  };

  // Add useEffect to load Google Ads (gtag.js)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-761759567";
    script.async = true;
    document.body.appendChild(script);

    const gtagScript = document.createElement("script");
    gtagScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-761759567');
    `;
    document.body.appendChild(gtagScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(gtagScript);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-6 mx-auto mb-5 app__register">
            <h1 className="mb-4 text-center">
              Register{" "}
              {useEmail === null
                ? ""
                : useEmail
                ? "with Email Address"
                : "with Phone Number"}
            </h1>

            <p className="mb-4 text-center">
              Play all your favorite Nigerian lotto games from one account on
              mylottohub and get your winnings paid instantly to your bank
              account
            </p>
            {useEmail === null ? (
              <>
                <div className="d-flex mt-5 justify-content-between mb-4">
                  <Button
                    variant="primary"
                    onClick={() => switchRegistrationMethod("phone")}
                    className="me-2"
                  >
                    Register With Phone Number
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => switchRegistrationMethod("email")}
                  >
                    Register With Email Address
                  </Button>
                </div>
              </>
            ) : (
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

                {/* <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mb-2 p-3"
                    placeholder="Username"
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
                </div> */}

                {useEmail ? (
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control mb-2 p-3"
                      placeholder="Email Address"
                      name="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-danger text-capitalize">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mb-3">
                    <input
                      type="number"
                      min={1}
                      className="form-control mb-2 p-3"
                      placeholder="Phone Number"
                      name="phone"
                      {...register("phone")}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 11))
                      }
                    />
                    {errors.phone && (
                      <p className="text-danger text-capitalize">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control mb-2 p-3"
                    placeholder="Referral Code (Optional)"
                    name="referral_code"
                    {...register("referral_code")}
                  />
                  {errors.referral_code && (
                    <p className="text-danger text-capitalize">
                      {errors.referral_code.message}
                    </p>
                  )}
                </div>

                <div className="mb-3 form-check mt-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    required
                  />
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

                <p
                  onClick={() =>
                    (window.location.href =
                      "https://api.mpin.io/authorize?client_id=v8kfysqoljbgd&response_type=code&scope=openid+email+profile&redirect_uri=https://app.mylottohub.com")
                  }
                  style={{ cursor: "pointer", color: "#406777" }}
                >
                  Already have an account?
                  <span className="text-primary"> Sign in</span>
                </p>
                <ReCaptchaV2
                  sitekey={siteKey}
                  onChange={handleCaptchaVerification}
                />
                <Button
                  type="submit"
                  className="w-100 p-3 mt-3"
                  disabled={!isCaptchaVerified || isLoading}
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
                    "Register"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
