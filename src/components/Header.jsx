import { useNavigate } from "react-router-dom";
import BModal from "./BModal/BModal";
import "../assets/css/header.css";
import { images } from "../constant";
import { useState } from "react";
import Withdraw from "./Payment/Withdraw";
import Deposit from "./Payment/Deposit";
import { useGetProfileUser } from "../react-query";

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

  return (
    <div>
      <header className="header-area">
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
                    <img
                      className="img-fluid"
                      width="113"
                      height="67"
                      src={images.logo}
                      alt={images.logo}
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
                      <p>Balance Loading...</p>
                    ) : userProfileResponse ? (
                      <>
                        <div className="col-md-3 col-xs-6">
                          <small>₦{userProfileResponse?.wallet}</small>
                          <br />
                          Wallet Balance
                        </div>
                        <div className="col-md-3 col-xs-6">
                          <small>
                            ₦{formatAmount(userProfileResponse?.wwallet)}
                          </small>
                          <br />
                          Winnings
                        </div>
                      </>
                    ) : null}

                    <div className="col-md-6 mt-2">
                      <a
                        onClick={() => handleDeposit()}
                        className="btn btn-blue"
                      >
                        <small>Deposit</small>
                      </a>{" "}
                      &nbsp;&nbsp;
                      <button
                        onClick={() => handleWithdraw()}
                        className="btn btn-trans2_withraw"
                        data-toggle="modal"
                        data-target="#withdraw_modal"
                      >
                        <small>Withdraw</small>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="mobile__header-hide p-3">
        <table cellPadding="5">
          <tbody>
            <tr>
              <td>
                <a onClick={() => navigate("/")}>
                  <img
                    src={images.logo}
                    alt=""
                    width="107"
                    height="67"
                    className="meg_logo"
                  />
                </a>
              </td>
              <td valign="middle">
                <p>
                  {userProfileResponse?.username}
                  <br />
                  <strong>User ID:</strong> {userProfileResponse?.id}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BModal
        backdrop="static"
        keyboard={false}
        show={isOpen}
        onHide={handleClose}
        size="md"
      >
        <Withdraw />
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
    </div>
  );
};

export default Header;
