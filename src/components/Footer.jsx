import "../assets/css/footer.css";
import { useNavigate } from "react-router-dom";
import { images } from "../constant";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="footer-area mt-5">
          <img src={images.payment_gate} className="img-fluid" alt="" />
          {/* <table align="center" width="90%">
            <tbody>
              <tr>
                <td>
                  <img
                    src="https://www.mylottohub.com/images/payment_icons.png"
                    className="img-fluid"
                  />
                </td>
                <td>
                  <a href="https://www.begambleaware.org">
                    <img
                      src="https://www.mylottohub.com/images/begambleaware.png"
                      className="img-fluid"
                    />
                  </a>
                </td>
              </tr>
            </tbody>
          </table> */}
          <br />
          <div className="footer-area_overview footer-top-area black-opacity bg-img-4 hidden-xs">
            <div className="container">
              <div className="row">
                <div
                  className="col-md-4 col-sm-6 col-xs-12 col-2"
                  style={{ paddingTop: "60px" }}
                >
                  <div className="footer-widget footer-logo">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={images.logo}
                          alt=""
                          className="img-fluid img-fluid"
                          width="280"
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

                <div className="col-md-2 col-sm-6 col-xs-12 col-2">
                  <div className="footer-widget footer-menu">
                    <h2>Quick Links</h2>
                    <ul>
                      <li>
                        <a href="#">
                          Forecast
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          Result
                        </a>
                      </li>
                  
                      <li>
                        <a href="#">
                          How to Play
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 col-2">
                  <div className="footer-widget footer-menu">
                    <h2>Company</h2>
                    <ul>
                      <li>
                        <a href="#"  onClick={() => navigate("/about-us")}>
                        About Us
                        </a>
                      </li>
                      <li>
                        <a href="#" onClick={() => navigate("/contact-us")}>
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a href="#" className="w-100" onClick={() => navigate("/terms")}>
                          Terms and Conditions
                        </a>
                      </li>
                      <li>
                        <a href="#" onClick={() => navigate("/faq")}>
                          FAQs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 col-2">
                  <div className="footer-widget footer-contact">
                    <h2>Download App</h2>
                    
                    <p className="text-center">
                      <a
                        href="#"
                        className="btn btn-trans btn-lg text-center"
                        style={{border: '1px solid #fff'}}
                      >
                        <i className="fa fa-download text-white"> Download APK</i> 
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom-area hidden-xs">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 text-center">
                  <p>
                    Copyright © 2023 <span>My Lotto Hub</span>. All Rights
                    Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
