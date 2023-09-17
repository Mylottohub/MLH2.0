import { useNavigate } from "react-router-dom";
import { images } from "../constant";
import Header from "./Header";
// import { useSelector, useDispatch } from "react-redux";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import {
  BsArrow90DegRight,
  BsShareFill,
  BsSubscript,
  BsWallet,
} from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      {token ? (
        <>
          <Header />
          <nav className="navbar navbar-expand-lg app__navbar-bg">
            <div className="container">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav app_navbar-nav me-auto mb-2  mb-lg-0">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-white me-3"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Play now
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item p-2"
                          // href="https://www.mylottohub.com/play/plotto"
                          onClick={() => navigate("/")}
                        >
                          <img
                            src={images.lotto_icon}
                            alt={images.lotto_icon}
                          />{" "}
                          Lotto
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item p-2"
                          // href="https://www.mylottohub.com/welcome/home_sport"
                        >
                          <img src={images.bet} alt={images.bet} /> Sport
                          Betting
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item p-2"
                          // href="https://www.mylottohub.com/welcome/home_instant"
                        >
                          <img src={images.instant} alt={images.instant} />{" "}
                          Instant Games
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link text-white me-3" href="#">
                      Results
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-white me-3"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Lotto Tools
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item p-2">
                          <img src={images.profore} alt={images.profore} />{" "}
                          Pro-Forecaster
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item p-2"
                          // href="https://www.mylottohub.com/welcome/home_sport"
                        >
                          <img src={images.quick} alt={images.quick} /> Quick
                          Forecast
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item p-2"
                          // href="https://www.mylottohub.com/welcome/home_instant"
                        >
                          <img src={images.chart} alt={images.chart} /> Create
                          Lotto Chart
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link text-white me-3" href="#">
                      Time Table
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link text-white me-3" href="#">
                      Community
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link text-white me-3" href="#">
                      Tutorials
                    </a>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle text-white me-3"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      More
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item p-2"
                          onClick={() => navigate("/about-us")}
                        >
                          <i className="fa fa-info"></i>
                          &nbsp;About us
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item p-2"
                          onClick={() => navigate("/faq")}
                        >
                          <i className="fa fa-question"></i>
                          &nbsp;FAQs
                        </a>
                      </li>

                      <li>
                        <a
                          className="dropdown-item p-2"
                          onClick={() => navigate("/terms")}
                        >
                          <i className="fa fa-anchor"></i>
                          &nbsp;Terms and Conditions
                        </a>
                      </li>

                      <li>
                        <a
                          className="dropdown-item p-2"
                          onClick={() => navigate("/contact-us")}
                        >
                          <i className="fa fa-phone"></i>
                          &nbsp;Contact Us
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>

                <ul className="app__sign-in d-flex">
                  <li className="text-right hidden-xs hidden-sm">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-white"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <small>
                          shotin
                          <br />
                          ID: 33794
                        </small>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item p-2">
                            <FaUser />
                            &nbsp;&nbsp;User Profile
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item p-2">
                            <BsWallet />
                            &nbsp;&nbsp;Wallets
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item p-2">
                            <BsArrow90DegRight />
                            &nbsp;&nbsp;Deposit
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item p-2">
                            <BiSolidDashboard />
                            &nbsp;&nbsp;Withdraw
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item p-2">
                            <BsSubscript />
                            &nbsp;&nbsp;Subscription
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item p-2"
                            onClick={() => navigate("/transactions")}
                          >
                            <FaMoneyBill />
                            &nbsp;&nbsp;Transactions
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item p-2">
                            <BsShareFill />
                            &nbsp;&nbsp;Referral
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* <a>
                      <span
                        className="btn btn-yellow"
                        onClick={() => navigate("/login")}
                      >
                        Logout
                      </span>
                    </a> */}
                  </li>

                  <li className="text-right hidden-xs hidden-sm">
                    <li className="nav-item dropdown">
                      <a>
                        <span
                          className="btn btn-white"
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </span>
                      </a>
                    </li>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <nav className="navbar navbar-expand-lg app__navbar-bg">
          <div className="container">
            <a
              className="navbar-brand"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img src={images.logo} alt={images.logo} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav app_navbar-nav me-auto mb-2  mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white me-3"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Play now
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item p-2"
                        // href="https://www.mylottohub.com/play/plotto"
                      >
                        <img src={images.lotto_icon} alt={images.lotto_icon} />{" "}
                        Lotto
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        // href="https://www.mylottohub.com/welcome/home_sport"
                      >
                        <img src={images.bet} alt={images.bet} /> Sport Betting
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        // href="https://www.mylottohub.com/welcome/home_instant"
                      >
                        <img src={images.instant} alt={images.instant} />{" "}
                        Instant Games
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white me-3" href="#">
                    Results
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white me-3"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Lotto Tools
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item p-2">
                        <img src={images.profore} alt={images.profore} />{" "}
                        Pro-Forecaster
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        // href="https://www.mylottohub.com/welcome/home_sport"
                      >
                        <img src={images.quick} alt={images.quick} /> Quick
                        Forecast
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        // href="https://www.mylottohub.com/welcome/home_instant"
                      >
                        <img src={images.chart} alt={images.chart} /> Create
                        Lotto Chart
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white me-3" href="#">
                    Time Table
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white me-3" href="#">
                    Community
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white me-3" href="#">
                    Tutorials
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white me-3"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item p-2"
                        onClick={() => navigate("/about-us")}
                      >
                        <i className="fa fa-info"></i>
                        &nbsp;About us
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        onClick={() => navigate("/faq")}
                      >
                        <i className="fa fa-question"></i>
                        &nbsp;FAQs
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item p-2"
                        onClick={() => navigate("/terms")}
                      >
                        <i className="fa fa-anchor"></i>
                        &nbsp;Terms and Conditions
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item p-2"
                        onClick={() => navigate("/contact-us")}
                      >
                        <i className="fa fa-phone"></i>
                        &nbsp;Contact Us
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="app__sign-in">
                <li className="text-right hidden-xs hidden-sm mt-2">
                  <a
                  // href="https://www.mylottohub.com/user/login"
                  // style="padding-top: 22px !important;"
                  >
                    <span
                      className="btn text-white me-3"
                      onClick={() => navigate("/register")}
                      // style="vertical-align: top !important;"
                    >
                      Sign Up
                    </span>
                  </a>

                  <a
                  // href="https://www.mylottohub.com/user/login"
                  // style="padding-top: 22px !important;"
                  >
                    <span
                      className="btn btn-yellow"
                      navigate
                      // style="vertical-align: top !important;"
                    >
                      Sign In
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
