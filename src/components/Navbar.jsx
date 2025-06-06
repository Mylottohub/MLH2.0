import { useNavigate } from "react-router-dom";
import { images } from "../constant";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useState } from "react";
import BModal from "./BModal/BModal";
import Deposit from "./Payment/Deposit";
import WithdrawModal from "./Payment/Withdraw";
import { logout } from "../pages/slices/authSlice";
import UserProfile from "./Payment/UserProfile";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useGetProfileUser } from "../react-query";
import Download from "./Download";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const [isOpenDeposit, setIsOpenDeposit] = useState(false);
  const handleCloseDeposit = () => setIsOpenDeposit(false);
  const handleOpenDeposit = () => setIsOpenDeposit(true);

  const [isOpenUser, setIsOpenUser] = useState(false);

  const handleUserClose = () => setIsOpenUser(false);
  const handleUserOpen = () => setIsOpenUser(true);

  const handleWithdraw = () => {
    handleOpen();
  };

  const handleDeposit = () => {
    handleOpenDeposit();
  };

  const handleUserProfile = () => {
    handleUserOpen();
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/");
      toast.success("Logged Out Successfully");
    } catch (error) {
      // console.log(error);
    }
  };
  const { userProfileResponse, isLoadingUserProfile, token, expires } =
    useGetProfileUser([]);

  const formatAmount = (amount) => {
    if (amount !== 0 && Math.abs(amount) > 0.001) {
      return amount.toFixed(2);
    }
    return amount;
  };
  const handleNav = (path) => {
    const offcanvasEl = document.getElementById("mobileNavbar");
    const bsOffcanvas = window.bootstrap?.Offcanvas.getInstance(offcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();

    navigate(path);
  };

  return (
    <div>
      <Download />

      {token && expires && new Date(expires) > new Date() ? (
        <>
          <div className="mobile__header">
            <Header />

            <nav className="navbar navbar-expand-lg app__navbar-bg">
              <div className="container">
                {/* <button
                  className="btn app__transaction-mobile app__navbar-mobile bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button> */}
                <p></p>
                <div className="text-white app__transaction-mobile">
                  {" "}
                  <span>
                    {" "}
                    <ul className="d-flex justify-content-between app__sign-in fw-bolder">
                      <li className="nav-item dropdown text-center">
                        <a
                          id="app__mobile-nav"
                          className="nav-link dropdown-toggle text-white"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FaUser className="fa-2x" />
                        </a>
                        <ul
                          className="dropdown-menu fw-bolder"
                          style={{ marginLeft: "-90px" }}
                        >
                          <li onClick={() => handleUserProfile()}>
                            <a className="dropdown-item p-2 fw-bolder">
                              &nbsp;&nbsp;User Profile
                            </a>
                          </li>
                          <li onClick={() => navigate("/wallet")}>
                            <a className="dropdown-item p-2  fw-bolder">
                              &nbsp;&nbsp;Wallet
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item p-2  fw-bolder"
                              onClick={() => handleDeposit()}
                            >
                              &nbsp;&nbsp;Deposit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item p-2  fw-bolder"
                              onClick={() => handleWithdraw()}
                            >
                              &nbsp;&nbsp;Withdraw
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item p-2  fw-bolder"
                              onClick={() => navigate("/transactions")}
                            >
                              &nbsp;&nbsp;Transactions
                            </a>
                          </li>{" "}
                          <li>
                            <a
                              className="dropdown-item p-2  fw-bolder"
                              onClick={() => navigate("/result")}
                            >
                              &nbsp;&nbsp;Results
                            </a>
                          </li>{" "}
                          <li>
                            <a
                              className="dropdown-item p-2  fw-bolder"
                              onClick={() => navigate("/forecast")}
                            >
                              &nbsp;&nbsp;Quick Forecast
                            </a>
                          </li>{" "}
                          <li onClick={() => navigate("/referral")}>
                            <a className="dropdown-item p-2  fw-bolder">
                              &nbsp;&nbsp;Referral
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => handleLogout()}
                              className="dropdown-item p-2  fw-bolder"
                            >
                              {" "}
                              &nbsp;&nbsp; Logout
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </span>
                </div>
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
                        className="nav-link dropdown-toggle text-white me-3 "
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Play now
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/")}
                          >
                            {/* <img
                              src={images.lotto_icon}
                              alt={images.lotto_icon}
                            />{" "} */}
                            Lotto
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/all-forecast")}
                          >
                            {/* <img src={images.bet} alt={images.bet} /> */}
                            Sport Betting
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item p-2"
                            onClick={() => navigate("/instant")}
                          >
                            {/* <img src={images.instant} alt={images.instant} />{" "} */}
                            Instant Games
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link text-white me-3 "
                        onClick={() => navigate("/result")}
                      >
                        Results
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link text-white me-3  app__proforecast"
                        onClick={() => navigate("/create-chart")}
                      >
                        Create Charts
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link text-white me-3 "
                        onClick={() => navigate("/timetable")}
                      >
                        Time Table
                      </a>
                    </li>

                    <li
                      onClick={() => navigate("/forecast")}
                      className="nav-item"
                    >
                      <a className="nav-link text-white me-3 app__quick-forecast">
                        {" "}
                        Quick Forecast
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => navigate("/tutorials")}
                    >
                      <a className="nav-link text-white me-3 ">Tutorials</a>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-white me-3 "
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        More
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/about-us")}
                          >
                            {/* <i className="fa fa-info"></i> */}
                            &nbsp;About us
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/faq")}
                          >
                            {/* <i className="fa fa-question"></i> */}
                            &nbsp;FAQs
                          </a>
                        </li>

                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/terms")}
                          >
                            {/* <i className="fa fa-anchor"></i> */}
                            &nbsp;Terms and Conditions
                          </a>
                        </li>

                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/contact-us")}
                          >
                            {/* <i className="fa fa-phone"></i> */}
                            &nbsp;Contact Us
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <ul className="app__sign-in d-flex app__transaction-web">
                    <li className="text-left hidden-xs hidden-sm">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle text-white"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <small>
                            {userProfileResponse?.username}
                            <br />
                            ID: {userProfileResponse?.id}
                          </small>
                        </a>
                        <ul className="dropdown-menu">
                          {/* <li onClick={() => navigate("/profile")}> */}
                          <li onClick={() => handleUserProfile()}>
                            <a className="dropdown-item p-2 fw-bolder">
                              {/* <FaUser /> */}
                              &nbsp;&nbsp;User Profile
                            </a>
                          </li>
                          <li onClick={() => navigate("/wallet")}>
                            <a className="dropdown-item p-2 fw-bolder">
                              {/* <BsWallet /> */}
                              &nbsp;&nbsp;Wallet
                            </a>
                          </li>

                          <li>
                            <a
                              className="dropdown-item p-2 fw-bolder"
                              onClick={() => handleDeposit()}
                            >
                              {/* <BsArrow90DegRight /> */}
                              &nbsp;&nbsp;Deposit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item p-2 fw-bolder"
                              onClick={() => handleWithdraw()}
                            >
                              &nbsp;&nbsp;Withdraw
                            </a>
                          </li>
                          {/* <li>
                            <a className="dropdown-item p-2">
                             
                              &nbsp;&nbsp;Subscription
                            </a>
                          </li> */}
                          <li>
                            <a
                              className="dropdown-item p-2 fw-bolder"
                              onClick={() => navigate("/transactions")}
                            >
                              {/* <FaMoneyBill /> */}
                              &nbsp;&nbsp;Transactions
                            </a>
                          </li>
                          <li onClick={() => navigate("/referral")}>
                            <a className="dropdown-item p-2 fw-bolder">
                              {/* <BsShareFill /> */}
                              &nbsp;&nbsp;Referral
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://agency.mylottohub.com/"
                              target="_blank"
                              className="dropdown-item p-2 fw-bolder"
                              rel="noreferrer"
                            >
                              &nbsp; Become an Agent
                            </a>
                          </li>
                        </ul>
                      </li>
                    </li>

                    <li className="text-right hidden-xs hidden-sm">
                      <li className="nav-item dropdown">
                        <a>
                          <span
                            className="btn btn-white text-white"
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
            {isLoadingUserProfile ? (
              <p>Balance Loading...</p>
            ) : userProfileResponse ? (
              <>
                <div className="row">
                  <div className="col-10">
                    <small className="fw-bolder" style={{ fontSize: "17px" }}>
                      ₦{userProfileResponse?.wallet}
                      <br />
                      Wallet Balance
                    </small>
                    <br />
                    <br />
                    <a onClick={() => handleDeposit()} className="btn btn-blue">
                      <small style={{ fontSize: "17px" }} className="fw-bolder">
                        Deposit
                      </small>
                    </a>
                  </div>
                  <div className="col-2">
                    <small className="fw-bolder" style={{ fontSize: "17px" }}>
                      ₦{formatAmount(userProfileResponse?.wwallet)}
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
                      <small style={{ fontSize: "17px" }} className="fw-bolder">
                        Withdraw
                      </small>
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
              <img width="118" src={images.logo} alt={images.logo} />
            </a>
            <button
              className="navbar-toggler app__navbar-mobile"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileNavbar"
              aria-controls="mobileNavbar"
            >
              <span className="navbar-toggler-icon text-white"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav app_navbar-nav me-auto mb-2 mb-lg-0 fw-bolder"
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
                        onClick={() => navigate("/")}
                      >
                        Lotto
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        onClick={() => navigate("/all-forecast")}
                      >
                        Sport Betting
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        onClick={() => navigate("/instant")}
                      >
                        {/* <img src={images.instant} alt={images.instant} />{" "} */}
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
                  <a
                    className="nav-link text-white app__proforecast"
                    onClick={() => navigate("/create-chart")}
                  >
                    Create Charts
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link text-white me-3"
                    onClick={() => navigate("/timetable")}
                  >
                    Time Table
                  </a>
                </li>

                <li
                  onClick={() => navigate("/forecast")}
                  className="nav-item  "
                >
                  <a className="nav-link text-white me-3"> Quick Forecast</a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link text-white me-3"
                    onClick={() => navigate("/tutorials")}
                  >
                    Tutorials
                  </a>
                </li>

                <li className="nav-item dropdown  ">
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
                        className="dropdown-item p-2 "
                        onClick={() => navigate("/about-us")}
                      >
                        {/* <i className="fa fa-info"></i> */}
                        &nbsp;About us
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2 "
                        onClick={() => navigate("/faq")}
                      >
                        {/* <i className="fa fa-question"></i> */}
                        &nbsp;FAQs
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item p-2 "
                        onClick={() => navigate("/terms")}
                      >
                        {/* <i className="fa fa-anchor"></i> */}
                        &nbsp;Terms and Conditions
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item p-2 "
                        onClick={() => navigate("/contact-us")}
                      >
                        {/* <i className="fa fa-phone"></i> */}
                        &nbsp;Contact Us
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="app__sign-in">
                <li className="text-right hidden-xs hidden-sm mt-2">
                  <a>
                    <span
                      className="btn text-white me-3  "
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </span>
                  </a>

                  <a href="https://api.mpin.io/authorize?client_id=v8kfysqoljbgd&response_type=code&scope=openid+email+profile&redirect_uri=https://app.mylottohub.com">
                    {/* <a href="https://api.mpin.io/authorize?client_id=vv4g3gaqxgvhi&response_type=code&scope=openid+email+profile&redirect_uri=https://mlh2.netlify.app"> */}
                    <span
                      className="btn btn-yellow  "
                      // onClick={() => navigate("/login")}
                    >
                      Sign In
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="mobileNavbar"
            aria-labelledby="mobileNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="mobileNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav" style={{ cursor: "pointer" }}>
                <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3"
                    onClick={() => handleNav("/")}
                  >
                    Lotto
                  </a>
                </li>
                <hr />
                <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3 w-50"
                    onClick={() => handleNav("/all-forecast")}
                  >
                    Sport Betting
                  </a>
                </li>
                <hr />
                {/* <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3 w-50"
                    onClick={() => handleNav("/instant")}
                  >
                    Instant Games
                  </a>
                </li>
                <hr /> */}
                {/* <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3"
                    onClick={() => handleNav("/result")}
                  >
                    Results
                  </a>
                </li> */}
                {/* <hr /> */}
                {/* <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder app__proforecast"
                    onClick={() => handleNav("/create-chart")}
                  >
                    Create Charts
                  </a>
                </li>
                <hr /> */}
                <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3"
                    onClick={() => handleNav("/timetable")}
                  >
                    Time Table
                  </a>
                </li>
                <hr />
                {/* <li
                  onClick={() => handleNav("/forecast")}
                  className="nav-item  "
                >
                  <a className="nav-link text-dark fw-bolder me-3 w-50">
                    {" "}
                    Quick Forecast
                  </a>
                </li>
                <hr /> */}
                <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3"
                    onClick={() => handleNav("/tutorials")}
                  >
                    Tutorials
                  </a>
                </li>
                <hr />
                <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3"
                    onClick={() => handleNav("/register")}
                  >
                    Sign Up
                  </a>
                </li>
                <hr />
                <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3"
                    href="https://api.mpin.io/authorize?client_id=v8kfysqoljbgd&response_type=code&scope=openid+email+profile&redirect_uri=https://app.mylottohub.com"
                  >
                    {/* <a href="https://api.mpin.io/authorize?client_id=vv4g3gaqxgvhi&response_type=code&scope=openid+email+profile&redirect_uri=https://mlh2.netlify.app"> */}
                    Sign In
                  </a>
                </li>
                <hr />
              </ul>
            </div>
          </div>
        </nav>
      )}
      <BModal
        backdrop="static"
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
        size="md"
      >
        <WithdrawModal />
      </BModal>

      <BModal
        backdrop="static"
        keyboard={false}
        show={isOpenDeposit}
        onHide={handleCloseDeposit}
        size="md"
      >
        <Deposit />
      </BModal>

      <BModal show={isOpenUser} onHide={handleUserClose} size="md">
        <UserProfile />
      </BModal>
    </div>
  );
};

export default Navbar;
