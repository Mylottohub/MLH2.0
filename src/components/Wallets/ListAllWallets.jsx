import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import BModal from "../BModal/BModal";
import WithdrawModal from "../Payment/Withdraw";
import Deposit from "../Payment/Deposit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HTTP from "../../utils/httpClient";
import { Spinner } from "react-bootstrap";

const ListAllWallets = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const { userInfo } = useSelector((state) => state.auth);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await HTTP.get(`/get-user/${userInfo.data.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {" "}
      <Navbar />
      <div className="container">
        {loading ? (
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
          <div className="meg_container">
            <div className="row mt-5 mb-5">
              <div className="col-md-9 col-xs-12 mb-5">
                <div className="row">
                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <p>
                        <strong>Deposit Wallet</strong>
                      </p>
                      <p className="lead text-danger">
                        ₦ {userData && userData?.wallet}{" "}
                      </p>
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
                      <p className="lead text-danger">
                        {" "}
                        ₦ {userData && userData?.wwallet}{" "}
                      </p>
                      <p>
                        <a
                          className="btn btn-blue btn-block w-100 mt-4"
                          onClick={() => handleWithdraw()}
                        >
                          Cash Out
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 meg_col">
                    <div className="well wallet_col">
                      <p>
                        <strong>Referral Bonus Wallet</strong>
                      </p>
                      <p className="lead text-danger">
                        {" "}
                        ₦ {userData && userData?.ref_give}{" "}
                      </p>
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
                              <p className="lead text-danger">
                                {" "}
                                ₦ {userData && userData?.sl_bwallet}{" "}
                              </p>
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
                              <p className="lead text-danger">
                                {" "}
                                ₦ {userData && userData?.sl_bwallet}{" "}
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
                              <p className="lead text-danger">
                                {" "}
                                ₦ {userData && userData?.lm_bwallet}
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
                              <p className="lead text-danger">
                                {" "}
                                ₦ {userData && userData?.gh_bwallet}{" "}
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
                            <form>
                              <div>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount"
                                  required
                                  name="amount"
                                  min="1"
                                />
                              </div>

                              <input
                                type="submit"
                                className="btn btn-blue mt-3"
                                name="transfer"
                                value="Transfer"
                              />
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
