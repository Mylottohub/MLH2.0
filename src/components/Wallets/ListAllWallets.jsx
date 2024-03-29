import React, { useState } from "react";
import Navbar from "../Navbar";
import BModal from "../BModal/BModal";
import WithdrawModal from "../Payment/Withdraw";
import Deposit from "../Payment/Deposit";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useGetProfileUser } from "../../react-query";
import Footer from "../Footer";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { HTTP } from "../../utils";

const ListAllWallets = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const onSubmitTransfer = async (e) => {
    setLoading(true);
    e.preventDefault();

    const amountTransfer = e.target.amountTransfer.value;

    try {
      const response = await HTTP.post(
        "/transfer-wallet",
        {
          amount: amountTransfer,
          id: userProfileResponse?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {" "}
      <Navbar />
      <div className="container mt-5">
        {isLoadingUserProfile ? (
          <div className="spinner text-dark text-center mt-5">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div>
            <div className="row mt-5 mb-5">
              <div className="col-md-9 col-xs-12 mb-5">
                <div className="row">
                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <p>
                        <strong>Deposit Wallet</strong>
                      </p>
                      <strong className="lead text-success">
                        ₦{userProfileResponse && userProfileResponse?.wallet}{" "}
                      </strong>
                      <p>
                        <a
                          className="btn btn-blue btn-block w-100 mt-4"
                          onClick={() => handleDeposit()}
                        >
                          Deposit
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <p>
                        <strong>Winning Wallet</strong>
                      </p>
                      <strong className="lead text-success">
                        {" "}
                        ₦{userProfileResponse &&
                          userProfileResponse?.wwallet}{" "}
                      </strong>
                      {/* <p>
                        <a
                          className="btn btn-blue btn-block w-100 mt-4"
                          onClick={() => handleWithdraw()}
                        >
                          Cash Out
                        </a>
                      </p> */}
                    </div>
                  </div>
                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <p>
                        <strong>Referral Bonus Wallet</strong>
                      </p>
                      <strong className="lead text-success">
                        {" "}
                        ₦{userProfileResponse &&
                          userProfileResponse?.ref_give}{" "}
                      </strong>
                    </div>
                  </div>

                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <table width="100%" height="100%">
                        <tbody>
                          <tr>
                            <td>
                              <p>
                                <strong>Green Lotto Bonus Wallet</strong>
                              </p>
                              <strong className="lead text-success">
                                {" "}
                                ₦
                                {userProfileResponse &&
                                  userProfileResponse?.sl_bwallet}{" "}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td valign="bottom">
                              <p>
                                <a
                                  onClick={() =>
                                    navigate("/play-game/green_lotto")
                                  }
                                  className="btn btn-blue btn-block  w-100 mt-4"
                                >
                                  Play now
                                </a>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <table width="100%" height="100%">
                        <tbody>
                          <tr>
                            <td>
                              <p>
                                <strong>Set Lotto Bonus Wallet</strong>
                              </p>
                              <p className="lead text-success">
                                {" "}
                                ₦
                                {userProfileResponse &&
                                  userProfileResponse?.sl_bwallet}{" "}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td valign="bottom">
                              <p>
                                <a
                                  onClick={() =>
                                    navigate("/play-game/lotto_nigeria")
                                  }
                                  className="btn btn-blue btn-block  w-100 mt-4"
                                >
                                  Play now
                                </a>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <table width="100%" height="100%">
                        <tbody>
                          <tr>
                            <td>
                              <p>
                                <strong>Lottomania Bonus Wallet</strong>
                              </p>
                              <p className="lead text-success">
                                {" "}
                                ₦
                                {userProfileResponse &&
                                  userProfileResponse?.lm_bwallet}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td valign="bottom">
                              <p>
                                {" "}
                                <a
                                  onClick={() =>
                                    navigate("/play-game/lottomania")
                                  }
                                  className="btn btn-blue btn-block  w-100 mt-4"
                                >
                                  Play now
                                </a>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <table width="100%" height="100%">
                        <tbody>
                          <tr>
                            <td>
                              <p>
                                <strong>590 Bonus Wallet</strong>
                              </p>
                              <p className="lead text-success">
                                {" "}
                                ₦
                                {userProfileResponse &&
                                  userProfileResponse?.gh_bwallet}{" "}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td valign="bottom">
                              <p>
                                <a
                                  onClick={() =>
                                    navigate("/play-game/ghana_game")
                                  }
                                  className="btn btn-blue btn-block  w-100 mt-4"
                                >
                                  Play now
                                </a>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-xs-12 mb-5">
                <div className="panel panel-primary">
                  <div className="panel-heading">Wallet Actions</div>
                  <div className="panel-body p-3">
                    <table cellPadding="20" width="100%">
                      <tbody>
                        <tr>
                          <td bgColor="#FFF200">
                            <p>
                              <strong>
                                Transfer winnings to deposit wallet:
                              </strong>
                            </p>
                            <form onSubmit={onSubmitTransfer}>
                              <div>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount"
                                  required
                                  id="amountTransfer"
                                  name="amountTransfer"
                                  min="1"
                                />
                              </div>

                              {/* <input
                                type="submit"
                                className="btn btn-blue mt-3"
                                name="transfer"
                                value="Transfer"
                              /> */}
                              <Button
                                type="submit"
                                className="btn btn-blue mt-3"
                                style={{ background: "#27AAE1" }}
                                disabled={loading}
                              >
                                {loading ? (
                                  <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  "Transfer"
                                )}
                              </Button>
                            </form>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
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
    </React.Fragment>
  );
};

export default ListAllWallets;
