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
  const { userProfileResponse, isLoadingUserProfile, token } =
    useGetProfileUser([]);
  return (
    <>
      {token && token ? (
        <>
          <div className="mobile__header">
            <Header />

            <nav className="navbar navbar-expand-lg app__navbar-bg">
              <div className="container">
                <button
                  className="btn app__transaction-mobile app__navbar-mobile bg-light"
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
                  className="text-white app__transaction-mobile"
                  style={{ marginTop: "-20px" }}
                >
                  {" "}
                  <span>
                    {" "}
                    <ul className="d-flex justify-content-between app__sign-in">
                      <li className="text-center">
                        <li
                          className="nav-item dropdown"
                          // style={{ marginLeft: "-170px" }}
                        >
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
                            className="dropdown-menu"
                            style={{ marginLeft: "-90px" }}
                          >
                            <li onClick={() => handleUserProfile()}>
                              <a className="dropdown-item p-2">
                                &nbsp;&nbsp;User Profile
                              </a>
                            </li>
                            <li onClick={() => navigate("/wallet")}>
                              <a className="dropdown-item p-2">
                                &nbsp;&nbsp;Wallet
                              </a>
                            </li>

                            <li>
                              <a
                                className="dropdown-item p-2"
                                onClick={() => handleDeposit()}
                              >
                                &nbsp;&nbsp;Deposit
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item p-2"
                                onClick={() => handleWithdraw()}
                              >
                                &nbsp;&nbsp;Withdraw
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item p-2">
                                &nbsp;&nbsp;Subscription
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item p-2"
                                onClick={() => navigate("/transactions")}
                              >
                                &nbsp;&nbsp;Transactions
                              </a>
                            </li>
                            <li onClick={() => navigate("/referral")}>
                              <a className="dropdown-item p-2">
                                &nbsp;&nbsp;Referral
                              </a>
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
                        </li>
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
                            onClick={() => navigate("/betting")}
                          >
                            {/* <img src={images.bet} alt={images.bet} /> */}
                            Sport Betting
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item p-2 ">
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
                      <a className="nav-link text-white me-3  app__proforecast">
                        Pro-Forecaster
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

                    <li className="nav-item">
                      <a className="nav-link text-white me-3 ">Forecast</a>
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
                            <a className="dropdown-item p-2">
                              {/* <FaUser /> */}
                              &nbsp;&nbsp;User Profile
                            </a>
                          </li>
                          <li onClick={() => navigate("/wallet")}>
                            <a className="dropdown-item p-2">
                              {/* <BsWallet /> */}
                              &nbsp;&nbsp;Wallet
                            </a>
                          </li>

                          {/* <div className="btn-group dropend">
                            <button
                              type="button"
                              className="btn dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <BsWallet />
                              &nbsp;&nbsp;Wallets
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href="#">
                                  Menu item
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  Menu item
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  Menu item
                                </a>
                              </li>
                            </ul>
                          </div> */}

                          <li>
                            <a
                              className="dropdown-item p-2"
                              onClick={() => handleDeposit()}
                            >
                              {/* <BsArrow90DegRight /> */}
                              &nbsp;&nbsp;Deposit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item p-2"
                              onClick={() => handleWithdraw()}
                            >
                              {/* <BiSolidDashboard /> */}
                              &nbsp;&nbsp;Withdraw
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item p-2">
                              {/* <BsSubscript /> */}
                              &nbsp;&nbsp;Subscription
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item p-2"
                              onClick={() => navigate("/transactions")}
                            >
                              {/* <FaMoneyBill /> */}
                              &nbsp;&nbsp;Transactions
                            </a>
                          </li>
                          <li onClick={() => navigate("/referral")}>
                            <a className="dropdown-item p-2">
                              {/* <BsShareFill /> */}
                              &nbsp;&nbsp;Referral
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
                    <small>
                      ₦{userProfileResponse?.wallet}
                      <br />
                      Wallet Balance
                    </small>
                    <br />
                    <br />
                    <a onClick={() => handleDeposit()} className="btn btn-blue">
                      <small>Deposit</small>
                    </a>
                  </div>
                  <div className="col-2">
                    <small>
                      ₦{userProfileResponse?.wwallet}
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
              <img width="118" src={images.logo} alt={images.logo} />
            </a>
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
                className="navbar-nav app_navbar-nav me-auto mb-2 mb-lg-0"
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
                        {/* <img src={images.lotto_icon} alt={images.lotto_icon} />{" "} */}
                        Lotto
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        onClick={() => navigate("/betting")}
                        // href="https://www.mylottohub.com/welcome/home_sport"
                      >
                        {/* <img src={images.bet} alt={images.bet} />  */}
                        Sport Betting
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2"
                        // href="https://www.mylottohub.com/welcome/home_instant"
                      >
                        {/* <img src={images.instant} alt={images.instant} />{" "} */}
                        Instant Games
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item  ">
                  <a
                    className="nav-link text-white me-3"
                    onClick={() => navigate("/result")}
                  >
                    Results
                  </a>
                </li>

                <li className="nav-item   ">
                  <a className="nav-link text-white app__proforecast">
                    Pro-Forecaster
                  </a>
                </li>

                <li className="nav-item  ">
                  <a
                    className="nav-link text-white me-3"
                    onClick={() => navigate("/timetable")}
                  >
                    Time Table
                  </a>
                </li>

                <li className="nav-item  ">
                  <a className="nav-link text-white me-3">Forecast</a>
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

                  <a>
                    <span
                      className="btn btn-yellow  "
                      onClick={() => navigate("/login")}
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
    </>
  );
};

export default Navbar;
