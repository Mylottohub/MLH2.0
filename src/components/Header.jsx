import { useNavigate } from "react-router-dom";
import BModal from "./BModal/BModal";
import "../assets/css/header.css";
import { images } from "../constant";
import { useState } from "react";
import  Withdraw  from "./Payment/Withdraw";
import Deposit  from "./Payment/Deposit";
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
  // const firstname = localStorage.getItem("firstname");
  // const lastname = localStorage.getItem("lastname");
  // const email = localStorage.getItem("email");

  return (
    <div>
      <header className="header-area">
        <div className="header-top-area hidden-sm hidden-xs">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div
                  className="logo hidden-xs"
                  style={{ paddingBottom: "10px" }}
                >
                  <a
                    className="navbar-brand"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    <img src={images.logo} alt={images.logo} />
                  </a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="header-top-right">
                  <div
                    className="row pull-right app__header-app"
                    style={{ padding: "20px", width: "70%" }}
                  >
                    <div className="col-md-3 col-xs-6">
                      <small>
                        ₦0.00
                        <br />
                        Wallet Balance
                      </small>
                    </div>
                    <div className="col-md-3 col-xs-6">
                      <small>
                        ₦0.00
                        <br />
                        Winnings
                      </small>
                    </div>
                    <div className="col-md-6 mt-2">
                      <a
                        // href="https://www.mylottohub.com/user/topup"
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
      <BModal show={isOpen} onHide={handleClose} size="md">
        <Withdraw />
      </BModal>

      <BModal show={isOpenDeposit} onHide={handleCloseDeposit} size="md">
        {/* <Deposit /> */}
        <Deposit />
      </BModal>
    </div>
  );
};

export default Header;
