// import React from 'react'
import Navbar from "../components/Navbar";
import ReCaptchaV2 from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import "../assets/css/contact.css";
import Footer from "../components/Footer";
import { Button, Spinner } from "react-bootstrap";
import { setCredentials } from "./slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useContactMutation } from "./slices/userApiSlice";

const schema = yup.object().shape({
  name: yup.string().required("This is a required field"),
  email: yup.string().email().required(),
  subject: yup.string().required("This is a required field"),
  // last_name: yup.string().required("This is a required field"),
  phone: yup.string().min(11).max(11).required(),
  message: yup.string().required(),
});

const Contact = () => {
  const siteKey = import.meta.env.VITE_SITE_KEY;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [contact, { isLoading }] = useContactMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      const res = await contact(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Message sent Successfully");
      navigate("/");
    } catch (err) {
      if (err?.data?.details) {
        const errorDetails = err.data.details;
        Object.values(errorDetails).forEach((errorMessages) => {
          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        });
      } else {
        toast.error("An error occurred Submitting your request.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contact-area">
        <div className="container">
          <span>
            <h4 className="mt-5 text-center mb-3">
              <strong>Contact Us</strong>
            </h4>
          </span>
          <div className="contact-form app__register">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="row">
                <div className="col-xs-12 mb-5 col-sm-6">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control p-3"
                    name="name"
                    {...register("name", {
                      required: "Required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-danger text-capitalize mt-3">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="col-xs-12 mb-5 col-sm-6">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control p-3"
                    name="email"
                    {...register("email", {
                      required: "Required",
                    })}
                  />
                  {errors.email && (
                    <p className="text-danger text-capitalize mt-3">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="col-xs-12 mb-5">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    className="form-control p-3"
                    min="1"
                    name="phone"
                    {...register("phone", {
                      required: "Required",
                    })}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 11))
                    }
                  />
                  {errors.phone && (
                    <p className="text-danger text-capitalize mt-3">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="col-xs-12 mb-5">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="form-control p-3"
                    name="subject"
                    {...register("subject", {
                      required: "Required",
                    })}
                  />
                  {errors.subject && (
                    <p className="text-danger text-capitalize mt-3">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div className="col-xs-12 mb-5">
                  <textarea
                    // className="contact-textarea"
                    placeholder="Message"
                    className="form-control p-3"
                    id="msg"
                    name="message"
                    {...register("message", {
                      required: "Required",
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-danger text-capitalize mt-3">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                {/* <div className="col-xs-12">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="scopy" value="yes" /> Send me
                      a copy
                    </label>
                  </div>
                  <br />
                  <br />
                </div> */}

                <ReCaptchaV2 sitekey={siteKey} />
                <Button
                  type="submit"
                  className="w-100 p-3 mt-5 mb-4"
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
              </div>
            </form>
          </div>

          <h4 className="line_header hidden-sm hidden-xs">EMAIL ADDRESS</h4>
          <p className="lead app__info">Info@Mylottohub.Com</p>
          {/* <br><br><br><br> */}
          <h4 className="line_header hidden-sm hidden-xs">WE ARE ON SOCIALS</h4>
          <br />
          <br />
          <br />
          <br />
          <div className="contact-wrap mb-5">
            <table align="center" width="50%">
              <tbody>
                <tr>
                  <td>
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://web.facebook.com/mylottohub"
                          >
                            <i className="fa fa-facebook"></i> Facebook
                          </a>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://twitter.com/mylottohub"
                          >
                            <i className="fa fa-twitter"></i> Twitter
                          </a>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <a href="#">
                            <i className="fa fa-instagram"></i> Instagram
                          </a>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
