import { useNavigate } from "react-router-dom";
import BModal from "./BModal/BModal";
import "../assets/css/header.css";
import { images } from "../constant";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleWithdraw = () => {
    handleOpen();
  };

  return (
    <div>
      <header className="header-area">
        <div className="header-top-area hidden-sm hidden-xs">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
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
                    className="row pull-right"
                    style={{ padding: "20px 0", width: "70%" }}
                  >
                    <div className="col-md-3">
                      <small>
                        ₦0.00
                        <br />
                        Wallet Balance
                      </small>
                    </div>
                    <div className="col-md-3">
                      <small>
                        ₦0.00
                        <br />
                        Winnings
                      </small>
                    </div>
                    <div className="col-md-6">
                      <a
                        // href="https://www.mylottohub.com/user/topup"
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
        <div style={{ marginTop: "-30px" }}>
          <div className="container">
            <span>
              <strong>Withdraw Funds</strong>
            </span>
            <br />
            <small className="mt-3">
              Winning Wallet Balance - <strong>₦457,000.00</strong>
            </small>
            <hr />
            <p>
              Please click the buttons below to either withdraw funds to your
              bank account or transfer back to your lotto wallet.
            </p>
            <br />
            <p>
              <a
                className="btn btn-blue2 btn-block btn-lg"
              >
                Cash Out to Bank
              </a>
            </p>

            <p>
              <a
               className="btn btn-trans2_border btn-block btn-lg"
              >
                Transfer to wallet
              </a>
            </p>
           
          </div>

          {/* <button
            className="btn text-white mt-4"
            style={{ background: "#0AB39C", float: "right" }}
          >
            Clock in
          </button> */}
        </div>
      </BModal>
    </div>
  );
};

export default Header;
