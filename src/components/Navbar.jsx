import { useNavigate } from "react-router-dom";
import { images } from "../constant";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { FaMoneyBill, FaUser } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import {
  BsArrow90DegRight,
  BsShareFill,
  BsSubscript,
  BsWallet,
} from "react-icons/bs";
import { useState } from "react";
import BModal from "./BModal/BModal";
import Deposit from "./Payment/Deposit";
import WithdrawModal from "./Payment/Withdraw";
import { logout } from "../pages/slices/authSlice";
import { useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const [isOpenDeposit, setIsOpenDeposit] = useState(false);
  const handleCloseDeposit = () => setIsOpenDeposit(false);
  const handleOpenDeposit = () => setIsOpenDeposit(true);

  const handleWithdraw = () => {
    handleOpen();
  };

  const handleDeposit = () => {
    handleOpenDeposit();
  };
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.data) {
      // Define your API endpoint URL
      const apiUrl = `https://sandbox.mylottohub.com/v1/get-user/${userInfo.data.id}`;
  
      // Replace "YOUR_BEARER_TOKEN" with the actual bearer token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application json", // Set the content type to JSON
          Accept: "application/json",
        },
      };
  
      axios
        .get(apiUrl, config)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [userInfo]);
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <>
      {userInfo && userInfo.token ? (
        <>
          <div className="mobile__header">
            <Header />
            <nav className="navbar navbar-expand-lg app__navbar-bg">
              <div className="container">
                <button
                  className="navbar-toggler app__navbar-mobile"
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
                  <ul
                    className="navbar-nav app_navbar-nav me-auto mb-2  mb-lg-0"
                    style={{ cursor: "pointer" }}
                  >
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-white me-3"
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
                      <a
                        className="nav-link text-white me-3"
                        onClick={() => navigate("/result")}
                      >
                        Results
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link text-white me-3">Pro-Forecaster</a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link text-white me-3"
                        onClick={() => navigate("/timetable")}
                      >
                        Time Table
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link text-white me-3">Forecast</a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link text-white me-3">Tutorials</a>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-white me-3"
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
                          className="nav-link dropdown-toggle text-white app__user-mobile"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <small>
                            {userInfo.data.username}
                            <br />
                            ID: {userInfo.data.id}
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
          </div>
          <div className="container mobile_bottom_head">
            {loading ? (
              <p>Balance Loading...</p>
            ) : error ? (
              <p></p>
            ) : userData ? (
              <>
                <div className="row">
                  <div className="col-10">
                    <small>
                      ₦{userData.wallet}
                      <br />
                      Wallet Balance
                    </small>
                    <br />
                    <br />
                    <a
                      // href="https://www.mylottohub.com/user/topup"
                      onClick={() => handleDeposit()}
                      className="btn btn-blue"
                    >
                      <small>Deposit</small>
                    </a>
                  </div>
                  <div className="col-2">
                    <small>
                      ₦{userData.wwallet}
                      <br />
                      Winnings
                    </small>
                    <br />
                    <br />
                    <a
                      onClick={() => handleWithdraw()}
                      className="btn btn-trans2"
                      data-toggle="modal"
                      data-target="#withdraw_modal"
                    >
                      <small>Withdraw</small>
                    </a>
                  </div>
                </div>
              </>
            ) : null}
          </div>
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
              <ul
                className="navbar-nav app_navbar-nav me-auto mb-2  mb-lg-0"
                style={{ cursor: "pointer" }}
              >
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white me-3"
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
                        onClick={() => navigate("/play-game")}
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
                  <a
                    className="nav-link text-white me-3"
                    onClick={() => navigate("/result")}
                  >
                    Results
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white me-3">Pro-Forecaster</a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link text-white me-3"
                    onClick={() => navigate("/timetable")}
                  >
                    Time Table
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white me-3">Forecast</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white me-3">Tutorials</a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-white me-3"
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
                      onClick={() => navigate("/login")}
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
      <BModal show={isOpen} onHide={handleClose} size="md">
        <WithdrawModal />
      </BModal>

      <BModal show={isOpenDeposit} onHide={handleCloseDeposit} size="md">
        <Deposit />
      </BModal>
    </>
  );
};

export default Navbar;
