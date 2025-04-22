import "../assets/css/footer.css";
import { useNavigate } from "react-router-dom";
import { images } from "../constant";
import moment from "moment";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
// import { useGetProfileUser } from "../react-query";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = moment().format("YYYY");
  // const { token, expires } = useGetProfileUser([]);

  return (
    <>
      {/* {token && expires && new Date(expires) > new Date() ? (
        <div className="footer-area mt-5 footer_login">
          <img src={images.payment_gate} className="img-fluid" alt="" />

          <br />
          <div className="footer-area_overview footer-top-area black-opacity bg-img-4 hidden-xs">
            <div className="container">
              <div className="d-flex justify-content-center text-center gap-3 my-2 mb-2">
                <a
                  href="https://web.facebook.com/mylottohub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-light fa-3x" />
                </a>
                <a
                  href="https://x.com/mylottohubng"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-light fa-3x" />
                </a>
                <a
                  href="https://www.instagram.com/lottohubng/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-light fa-3x" />
                </a>
              </div>

              <div className="row">
                <div
                  className="col-md-3 col-sm-6 col-xs-12"
                  style={{ paddingTop: "60px" }}
                >
                  <div className="footer-widget footer-logo">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={images.logo}
                          alt=""
                          className="img-fluid logo_footer"
                          // width="280"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>
                          <small>
                            Our role is simply to serve you better so that you
                            can make better informed betting decisions for
                            licenced operators.
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-widget footer-menu">
                    <h2>Quick Links</h2>
                    <ul>
                      <li>
                        <a onClick={() => navigate("/")} href="#">
                          Play Now
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/forecast")} href="#">
                          Quick Forecast
                        </a>
                      </li>

                      <li>
                        <a onClick={() => navigate("/result")} href="#">
                          Result
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/tutorials")} href="#">
                          How to Play
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/timetable")} href="#">
                          Timetable
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-widget footer-menu">
                    <h2>Company</h2>
                    <ul>
                      <li>
                        <a
                          className="text-white"
                          onClick={() => navigate("/about-us")}
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-white"
                          onClick={() => navigate("/contact-us")}
                        >
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-white w-100"
                          onClick={() => navigate("/terms")}
                        >
                          Terms and Conditions
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-white"
                          onClick={() => navigate("/faq")}
                        >
                          FAQs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-widget footer-contact">
                    <h2>
                      <a
                        href="https://apkpure.net/mylottohub/com.mylottohub_app/downloading"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn text-white"
                        style={{ fontSize: "20px", marginTop: "-10px" }}
                      >
                        Download App
                      </a>
                    </h2>
                    <p
                      className="text-center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom-area hidden-xs">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 text-center mb-2">
                  <p>
                    Copyright © {currentYear} <span>My Lotto Hub</span>. All
                    Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : ( */}
      <div>
        <div className="footer-area mt-5">
          <img src={images.payment_gate} className="img-fluid" alt="" />

          <br />
          <div className="footer-area_overview footer-top-area black-opacity bg-img-4 hidden-xs">
            <div className="container">
              <div className="d-flex justify-content-center text-center gap-3 mb-5">
                <a
                  href="https://web.facebook.com/mylottohub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-light fa-3x" />
                </a>
                <a
                  href="https://x.com/mylottohubng"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-light fa-3x" />
                </a>
                <a
                  href="https://www.instagram.com/lottohubng/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-light fa-3x" />
                </a>
              </div>

              <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-widget footer-logo">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={images.logo}
                          alt=""
                          className="img-fluid logo_footer"
                        />
                      </div>
                      <div className="col-md-8">
                        <p style={{ fontSize: "20px", lineHeight: "30px" }}>
                          Our role is simply to serve you better so that you can
                          make better informed betting decisions for licenced
                          operators.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-widget footer-menu">
                    <h2>Quick Links</h2>
                    <ul>
                      <li>
                        <a onClick={() => navigate("/")} href="#">
                          Play Now
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/create-charts")} href="#">
                          Create Charts
                        </a>
                      </li>

                      <li>
                        <a onClick={() => navigate("/result")} href="#">
                          Result
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/tutorials")} href="#">
                          How to Play
                        </a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/timetable")} href="#">
                          Timetable
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-widget footer-menu">
                    <h2>Company</h2>
                    <ul>
                      <li>
                        <a
                          className="text-white"
                          onClick={() => navigate("/about-us")}
                        >
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-white"
                          onClick={() => navigate("/contact-us")}
                        >
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-white w-100"
                          onClick={() => navigate("/terms")}
                        >
                          Terms and Conditions
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-white"
                          onClick={() => navigate("/faq")}
                        >
                          FAQs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6 col-xs-12">
                  <div className="footer-widget footer-contact">
                    <h2>
                      <a
                        href="https://apkpure.net/mylottohub/com.mylottohub_app/downloading"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn fw-bolder"
                        style={{
                          fontSize: "20px",
                          marginTop: "-10px",
                          color: "#DDEC04",
                        }}
                      >
                        Download App
                      </a>
                    </h2>
                    <p
                      className="text-center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom-area hidden-xs">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 text-center mb-2">
                  <p>
                    Copyright © {currentYear} <span>My Lotto Hub</span>. All
                    Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Footer;
