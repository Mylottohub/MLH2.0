import { useNavigate } from "react-router-dom";
import { images } from "../constant";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import BModal from "./BModal/BModal";
import Deposit from "./Payment/Deposit";
import WithdrawModal from "./Payment/Withdraw";
import { logout } from "../pages/slices/authSlice";
import UserProfile from "./Payment/UserProfile";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useGetProfileUser } from "../react-query";
import Download from "./Download";
import { motion, AnimatePresence } from "framer-motion";

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
      toast.success("Logged Out Successfully");
       window.location.href = "https://mylottohub.com/";
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

  // Sticky/shrink on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animation presets
  const fadeSlideIn = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 200, damping: 20 },
  };

  return (
    <motion.div initial={fadeSlideIn.initial} animate={fadeSlideIn.animate} transition={fadeSlideIn.transition} className="fade-in">
      <Download />

      {token && expires && new Date(expires) > new Date() ? (
        <>
          <div className="mobile__header">
            <Header />

            <nav className={`navbar navbar-expand-lg app__navbar-bg ${isScrolled ? "navbar-scrolled" : ""}`}>
              <div className="container">
                {/* left spacer */}
                <p></p>
                <div className="text-white app__transaction-mobile">
                  <span>
                    <ul className="d-flex justify-content-between app__sign-in fw-bolder">
                      <li className="nav-item dropdown text-center">
                        <a
                          id="app__mobile-nav"
                          className="nav-link dropdown-toggle text-white"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="avatar-with-live">
                            <FaUser className="fa-2x" />
                            <motion.span
                              className="live-dot"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            />
                          </span>
                        </a>
                        <motion.ul
                          className="dropdown-menu fw-bolder"
                          style={{ marginLeft: "-90px" }}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18 }}
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
                          <li>
                            <a
                              className="dropdown-item p-2  fw-bolder"
                              onClick={() => navigate("/create-chart")}
                            >
                              &nbsp;&nbsp;Create Chart
                            </a>
                          </li>{" "}
                           <li>
                            <a
                              className="dropdown-item p-2  fw-bolder"
                              onClick={() => navigate("/timetable")}
                            >
                              &nbsp;&nbsp;Timetable
                            </a>
                          </li>{" "}
                          <li onClick={() => navigate("/referral")}>
                            <a className="dropdown-item p-2  fw-bolder">
                              &nbsp;&nbsp;Referral
                            </a>
                          </li>
                          <li>
                            <motion.a
                              onClick={() => handleLogout()}
                              className="dropdown-item p-2  fw-bolder"
                              whileTap={{ scale: 0.96, opacity: 0.9 }}
                            >
                              {" "}
                              &nbsp;&nbsp; Logout
                            </motion.a>
                          </li>
                        </motion.ul>
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
                      <motion.ul className="dropdown-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/")}
                          >
                            Lotto
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item p-2 "
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
                            Instant Games
                          </a>
                        </li>
                      </motion.ul>
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
                      <motion.ul className="dropdown-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/about-us")}
                          >
                            &nbsp;About us
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/faq")}
                          >
                            &nbsp;FAQs
                          </a>
                        </li>

                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/terms")}
                          >
                            &nbsp;Terms and Conditions
                          </a>
                        </li>

                        <li>
                          <a
                            className="dropdown-item p-2 "
                            onClick={() => navigate("/contact-us")}
                          >
                            &nbsp;Contact Us
                          </a>
                        </li>
                      </motion.ul>
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
                        <motion.ul className="dropdown-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                          <li onClick={() => handleUserProfile()}>
                            <a className="dropdown-item p-2 fw-bolder">
                              &nbsp;&nbsp;User Profile
                            </a>
                          </li>
                          <li onClick={() => navigate("/wallet")}> 
                            <a className="dropdown-item p-2 fw-bolder">
                              &nbsp;&nbsp;Wallet
                            </a>
                          </li>

                          <li>
                            <a
                              className="dropdown-item p-2 fw-bolder"
                              onClick={() => handleDeposit()}
                            >
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
                          <li>
                            <a
                              className="dropdown-item p-2 fw-bolder"
                              onClick={() => navigate("/transactions")}
                            >
                              &nbsp;&nbsp;Transactions
                            </a>
                          </li>
                          <li onClick={() => navigate("/referral")}>
                            <a className="dropdown-item p-2 fw-bolder">
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
                        </motion.ul>
                      </li>
                    </li>

                    <li className="text-right hidden-xs hidden-sm">
                      <li className="nav-item dropdown">
                        <a>
                          <motion.span
                            className="btn btn-white text-white"
                            onClick={() => handleLogout()}
                            whileTap={{ scale: 0.96, opacity: 0.9 }}
                          >
                            Logout
                          </motion.span>
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
                    <motion.small className="fw-bolder" style={{ fontSize: "17px" }} key={userProfileResponse?.wallet} initial={{ scale: 0.98, opacity: 0.9 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}>
                      ₦{userProfileResponse?.wallet}
                      <br />
                      Wallet Balance
                    </motion.small>
                    <br />
                    <br />
                    <motion.a onClick={() => handleDeposit()} className="btn btn-blue" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <small style={{ fontSize: "17px" }} className="fw-bolder">
                        Deposit
                      </small>
                    </motion.a>
                  </div>
                  <div className="col-2">
                    <motion.small className="fw-bolder" style={{ fontSize: "17px" }} key={userProfileResponse?.wwallet} initial={{ scale: 0.98, opacity: 0.9 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}>
                      ₦{formatAmount(userProfileResponse?.wwallet)}
                      <br />
                      Winnings
                    </motion.small>
                    <br />
                    <br />
                    <motion.a
                      onClick={() => handleWithdraw()}
                      className="btn btn-trans2"
                      data-toggle="modal"
                      data-target="#withdraw_modal"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <small style={{ fontSize: "17px" }} className="fw-bolder">
                        Withdraw
                      </small>
                    </motion.a>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <nav className={`navbar navbar-expand-lg app__navbar-bg ${isScrolled ? "navbar-scrolled" : ""}`}>
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
                  <motion.ul className="dropdown-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
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
                        Instant Games
                      </a>
                    </li>
                  </motion.ul>
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
                  <motion.ul className="dropdown-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                    <li>
                      <a
                        className="dropdown-item p-2 "
                        onClick={() => navigate("/about-us")}
                      >
                        &nbsp;About us
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item p-2 "
                        onClick={() => navigate("/faq")}
                      >
                        &nbsp;FAQs
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item p-2 "
                        onClick={() => navigate("/terms")}
                      >
                        &nbsp;Terms and Conditions
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item p-2 "
                        onClick={() => navigate("/contact-us")}
                      >
                        &nbsp;Contact Us
                      </a>
                    </li>
                  </motion.ul>
                </li>
              </ul>

              <ul className="app__sign-in">
                <li className="text-right hidden-xs hidden-sm mt-2">
                  <a>
                    <motion.span
                      className="btn text-white me-3  "
                      onClick={() => navigate("/register")}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Up
                    </motion.span>
                  </a>
                  <a href="https://api.mpin.io/authorize?client_id=v8kfysqoljbgd&response_type=code&scope=openid+email+profile&redirect_uri=https://app.mylottohub.com">
                    <motion.span
                      className="btn btn-yellow  "
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.span>
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
                <li className="nav-item">
                  <a
                    className="nav-link text-dark fw-bolder me-3"
                    onClick={() => handleNav("/timetable")}
                  >
                    Time Table
                  </a>
                </li>
                <hr />
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
                    Sign In
                  </a>
                </li>
                <hr />
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* Modals with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BModal
              backdrop="static"
              keyboard={false}
              show={isOpen}
              onHide={handleClose}
              size="md"
            >
              <WithdrawModal />
            </BModal>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenDeposit && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BModal
              backdrop="static"
              keyboard={false}
              show={isOpenDeposit}
              onHide={handleCloseDeposit}
              size="md"
            >
              <Deposit />
            </BModal>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BModal show={isOpenUser} onHide={handleUserClose} size="md">
              <UserProfile />
            </BModal>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
