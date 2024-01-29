// import React from 'react'
import Navbar from "../components/Navbar";
import "../assets/css/contact.css";
import Footer from "../components/Footer";

const Contact = () => {
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
          <div className="contact-form">
            <form action="" method="post" id="cf">
              <div className="row">
                <div className="col-xs-12 mb-5 col-sm-6">
                  <input
                    type="text"
                    placeholder="Name"
                    id="fname"
                    name="name"
                    className="form-control"
                    required=""
                  />
                </div>
                <div className="col-xs-12 mb-5 col-sm-6">
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="form-control"
                    name="email"
                    required=""
                  />
                </div>
                <div className="col-xs-12 mb-5">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="form-control"
                    id="subject"
                    name="tell"
                    required=""
                  />
                </div>
                <div className="col-xs-12 mb-5">
                  <input
                    type="text"
                    placeholder="Subject"
                    id="subject"
                    className="form-control"
                    name="subject"
                    required=""
                  />
                </div>
                <div className="col-xs-12 mb-5">
                  <textarea
                    // className="contact-textarea"
                    placeholder="Message"
                    className="form-control"
                    id="msg"
                    name="message"
                    required=""
                  ></textarea>
                </div>
                <div className="col-xs-12">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="scopy" value="yes" /> Send me
                      a copy
                    </label>
                  </div>
                  <br />
                  <br />
                </div>
                <div className="col-xs-12">
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LeBQC8lAAAAAM0KoPLtajsebEoJlrFMSjBrsilZ"
                  >
                    <div style={{ width: "304px", height: "78px" }}>
                      <div>
                        <iframe
                          title="reCAPTCHA"
                          src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LeBQC8lAAAAAM0KoPLtajsebEoJlrFMSjBrsilZ&amp;co=aHR0cHM6Ly93d3cubXlsb3R0b2h1Yi5jb206NDQz&amp;hl=en&amp;v=0hCdE87LyjzAkFO5Ff-v7Hj1&amp;size=normal&amp;cb=b9fk0qv6md46"
                          width="304"
                          height="78"
                          role="presentation"
                          name="a-iwz05lgc6bc2"
                          frameBorder="0"
                          scrolling="no"
                          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                        ></iframe>
                      </div>
                      <textarea
                        id="g-recaptcha-response"
                        name="g-recaptcha-response"
                        className="g-recaptcha-response"
                        style={{
                          width: "250px",
                          height: "40px",
                          border: "1px solid rgb(193, 193, 193)",
                          margin: "10px 25px",
                          padding: "0px",
                          resize: "none",
                          display: "none",
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <br />
                </div>
                <div className="col-xs-12">
                  <input
                    type="submit"
                    className="cont-submit btn-blue app__contact-submit"
                    name="submit"
                    value="SEND MESSAGE"
                  />
                </div>
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
