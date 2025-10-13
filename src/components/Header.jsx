import { useNavigate } from "react-router-dom";
import BModal from "./BModal/BModal";
import "../assets/css/header.css";
import { images } from "../constant";
import { useState } from "react";
import Withdraw from "./Payment/Withdraw";
import Deposit from "./Payment/Deposit";
import { useGetProfileUser } from "../react-query";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
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
  const { userProfileResponse, isLoadingUserProfile } = useGetProfileUser([]);
  const formatAmount = (amount) => {
    if (amount !== 0 && Math.abs(amount) > 0.001) {
      return amount.toFixed(2);
    }
    return amount;
  };

  const fadeSlideIn = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 200, damping: 20 },
  };

  return (
    <motion.div initial={fadeSlideIn.initial} animate={fadeSlideIn.animate} transition={fadeSlideIn.transition}>
      <header className="header-area fade-in">
        <div className="header-top-area hidden-sm hidden-xs">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="logo hidden-xs mt-1 p-2">
                  <a
                    className="navbar-brand"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    <motion.img
                      className="img-fluid"
                      width="113"
                      height="67"
                      src={images.logo}
                      alt={images.logo}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="header-top-right">
                  <div
                    className="row pull-right app__header-app"
                    style={{ padding: "20px", width: "70%" }}
                  >
                    {isLoadingUserProfile ? (
                      <p className="loading-pulse">Balance Loading...</p>
                    ) : userProfileResponse ? (
                      <>
                        <motion.div className="col-md-3 col-xs-6 fw-bolder balance-display" key={userProfileResponse?.wallet} initial={{ scale: 0.98, opacity: 0.9 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}>
                          <small>₦{userProfileResponse?.wallet}</small>
                          <br />
                          Wallet Balance
                        </motion.div>
                        <motion.div className="col-md-3 col-xs-6 fw-bolder balance-display" key={userProfileResponse?.wwallet} initial={{ scale: 0.98, opacity: 0.9 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }}>
                          <small>
                            ₦{formatAmount(userProfileResponse?.wwallet)}
                          </small>
                          <br />
                          Winnings
                        </motion.div>
                      </>
                    ) : null}

                    <div className="col-md-6 mt-2">
                      <motion.a
                        onClick={() => handleDeposit()}
                        className="btn btn-blue chip"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <small className="fw-bolder">Deposit</small>
                      </motion.a>{" "}
                      &nbsp;&nbsp;
                      <motion.button
                        onClick={() => handleWithdraw()}
                        className="btn btn-trans2_withraw chip"
                        data-toggle="modal"
                        data-target="#withdraw_modal"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <small className="fw-bolder">Withdraw</small>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="mobile__header-hide p-3 slide-up">
        <table cellPadding="5">
          <tbody>
            <tr>
              <td>
                <a onClick={() => navigate("/")}>
                  <motion.img
                    src={images.logo}
                    alt=""
                    width="107"
                    height="67"
                    className="meg_logo"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                </a>
              </td>
              <td valign="middle">
                <motion.p className="balance-display" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {userProfileResponse?.username}
                  <br />
                  <strong>User ID:</strong> {userProfileResponse?.id}
                </motion.p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
              <Withdraw />
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
    </motion.div>
  );
};

export default Header;
