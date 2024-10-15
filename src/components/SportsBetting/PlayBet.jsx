import React from "react";
import Navbar from "../Navbar";
import "../../assets/css/table.css";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { images } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { HTTP } from "../../utils";
import moment from "moment";
import { useGetProfileUser } from "../../react-query";
import {
  FaQuestionCircle,
  FaClock,
  FaUndo,
  FaTimesCircle,
  FaCheckCircle,
  FaReply,
} from "react-icons/fa";

const PlayBet = () => {
  const navigate = useNavigate();
  const { code, userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [betting, setBetting] = useState([]);
  const [inputAmount, setInputAmount] = useState("");
  const [isLoadingPlayBet, setIsLoadingPlayBet] = useState(false);
  const { userProfileResponse } = useGetProfileUser([]);

  const userAmount = userProfileResponse?.wallet;

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const requestData = { code: code };
      try {
        const response = await HTTP.post("/get-sports-details", requestData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.status === 200) {
          setBetting(response.data.data);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, []);
  useEffect(() => {}, [betting]);

  //   console.log(betting);

  const handleInputChange = (e) => {
    setInputAmount(e.target.value);
  };

  const calculatePotentialWinnings = () => {
    const totalOdds = calculateTotalOdds(betting);
    return (inputAmount * totalOdds).toFixed(2);
  };

  const handleNumberButtonClick = (amount) => {
    setInputAmount(amount);
  };

  const calculateTotalOdds = (bettingData) => {
    if (!bettingData || bettingData.length === 0) {
      return 1;
    }

    const totalOdds = bettingData.reduce((totalOdds, bet) => {
      return totalOdds * parseFloat(bet.odds);
    }, 1);

    // Round to two decimal places
    return parseFloat(totalOdds.toFixed(2));
  };
  const formatMatchTime = (matchTime) => {
    return moment(matchTime).format("DD/MM HH:mm");
  };

  const handlePlaceBet = async () => {
    setIsLoadingPlayBet(true);
    if (!inputAmount || isNaN(inputAmount) || inputAmount < 100) {
      toast.error("Minimum stake amount is ₦100");
      setIsLoadingPlayBet(false);
      return;
    }
    if (userAmount < inputAmount) {
      toast.error("Insufficient balance. Please top up your wallet.");
      setIsLoadingPlayBet(false);
      return;
    }
    const payload = {
      userID: userInfo.data.id,
      amount: parseFloat(inputAmount),
      code: code,
      operator_type: "easywin",
      wallet: "wallet",
    };

    try {
      setIsLoading(true);
      const response = await HTTP.post("/play-games", payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (response) {
        toast.success("Your selected game has been submitted successfully");
        navigate(`/betting/${userId}`);
      } else {
        toast.error(
          "Your selected game cannot been successfully. Pls try again"
        );
        navigate(`/play-bet/${code}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      navigate(`/play-bet/${code}`);
    } finally {
      setIsLoadingPlayBet(false);
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case 0:
        return <FaQuestionCircle title="No Result" style={{ color: "gray" }} />;
      case 1:
        return <FaClock title="Pending" style={{ color: "#f1c40f" }} />;
      case 2:
        return <FaUndo title="Returned" style={{ color: "blue" }} />;
      case 3:
        return <FaTimesCircle title="Lose" style={{ color: "red" }} />;
      case 4:
        return <FaCheckCircle title="Won" style={{ color: "green" }} />;
      case 5:
        return <FaReply title="Win Return" style={{ color: "purple" }} />;
      default:
        return <FaQuestionCircle title="Unknown" style={{ color: "gray" }} />;
    }
  };

  return (
    <React.Fragment>
      <>
        <Navbar />
        <div className="container mt-5  mb-5">
          <h2 className="fw-bolder text-center">BOOK - A - BET</h2>
          <div className="fw-bold">
            <p>
              Powered By{" "}
              <img src={images.easywin} className="img-fluid" alt="" />
            </p>
          </div>
          <div className="app__transaction-web">
            {isLoading ? (
              <div className="spinner text-dark text-center mt-5">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            ) : betting?.content?.length === 0 ? (
              <tr>
                <td colSpan="8" className="flex justify-center text-center p-5">
                  No Record Found
                </td>
              </tr>
            ) : (
              <>
                <div className="table-responsive mb-5">
                  <table className="table table-express table-hover mt-4">
                    <tbody>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                          BET CODE: {code} &nbsp;&nbsp; &nbsp;&nbsp;TOTAL ODDS:{" "}
                          {calculateTotalOdds(betting)}
                        </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        {/* <th scope="col">DATE</th> */}
                        <th scope="col">
                          DATE: {betting?.content?.[0]?.matchTime}
                        </th>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="table-light">
                        <td scope="col"></td>
                        <td scope="col" style={{ color: "#406777" }}>
                          EVENT
                        </td>
                        <td scope="col" style={{ color: "#406777" }}>
                          MARKET
                        </td>
                        <td scope="col" style={{ color: "#406777" }}>
                          SELECTION
                        </td>
                        {/* {moment().isAfter(
                          moment(betting?.content?.[0]?.matchTime),
                          "day"
                        ) ? (
                          <td scope="col"></td>
                        ) : ( */}
                        <td style={{ color: "#406777" }} scope="col">
                          STATUS
                        </td>
                        {/* )} */}
                      </tr>
                    </tbody>

                    <tbody>
                      <>
                        {betting?.map((record, index) => {
                          return (
                            <>
                              <tr key={index} className="table-light">
                                <td style={{ color: "#406777" }}>
                                  {index + 1}
                                </td>
                                <td
                                  style={{ color: "#406777" }}
                                >{`${record.homeName} vs ${record.awayName}`}</td>
                                <td style={{ color: "#406777" }}>
                                  {record?.marketName}
                                </td>
                                <td style={{ color: "#406777" }}>
                                  {record?.selectionKind}
                                </td>

                                <td> {getStatusIcon(record?.status)}</td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    </tbody>
                  </table>
                </div>

                {(betting.some((bet) =>
                  moment(bet.matchTime).isSame(moment().add(1, "days"), "day")
                ) ||
                  (betting.some((bet) =>
                    moment().isSame(moment(bet.matchTime), "day")
                  ) &&
                    !betting.some((bet) =>
                      moment().isAfter(moment(bet.matchTime))
                    ))) && (
                  <div className="w-50 mx-auto mb-5">
                    <input
                      type="number"
                      min={1}
                      value={inputAmount}
                      onChange={handleInputChange}
                      className="form-control mt-5 mb-3"
                      style={{
                        background: "#fff",
                        border: "1px solid #406777",
                        borderRadius: "5px",
                        margin: "auto",
                      }}
                    />
                    <div>
                      <div className="m-label fw-bold">
                        Potential Win: ₦{calculatePotentialWinnings()}
                      </div>
                    </div>

                    <div
                      className="d-flex justify-content-center p-3"
                      id="sport__bet-num"
                    >
                      {[100, 200, 500, 1000].map((amount, index) => (
                        <React.Fragment key={index}>
                          <Button
                            className="btn mt-2 p-2 text-white"
                            style={{ background: "#406777", width: "9%" }}
                            onClick={() => handleNumberButtonClick(amount)}
                          >
                            {amount}
                          </Button>
                          {index < 3 && <>&nbsp;&nbsp;</>}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        disabled={isLoadingPlayBet}
                        className="btn mt-2 mb-5 text-white fw-bold w-50"
                        style={{ background: "#406777" }}
                        onClick={handlePlaceBet}
                      >
                        {isLoadingPlayBet ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Loading...
                          </>
                        ) : (
                          "Place Bet"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {isLoading ? (
            <div className="spinner text-dark text-center mt-5 app__transaction-mobile">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </div>
          ) : betting?.today?.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                className="d-flex justify-content-center text-center p-5 app__transaction-mobile"
              >
                <div className="hidden-xs hidden-sm">
                  <div className="alert alert-danger" role="alert">
                    No Record Found
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            <div className="app__transaction-mobile">
              BET CODE: {code} &nbsp;&nbsp; &nbsp;&nbsp;
              <br />
              <br />
              <p className="fw-bolder">
                {" "}
                TOTAL ODDS: {calculateTotalOdds(betting)}
              </p>
              {betting?.map((record, index) => {
                // let statusText;
                // switch (record?.status) {
                //   case 0:
                //     statusText = "No Result";
                //     break;
                //   case 1:
                //     statusText = "Pending";
                //     break;
                //   case 2:
                //     statusText = "Returned";
                //     break;
                //   case 3:
                //     statusText = "Lose";
                //     break;
                //   case 4:
                //     statusText = "Won";
                //     break;
                //   case 5:
                //     statusText = "Win Return";
                //     break;
                //   default:
                //     statusText = "";
                // }

                return (
                  <div key={index} className="app__transaction-mobile">
                    <br /> <br />
                    <div className="p-3" style={{ background: "#f5f7f8" }}>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="fw-bolder">
                          {`${record.homeName} vs ${record.awayName}`}
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span> {record?.marketName}</span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="fw-bolder">
                          {" "}
                          {record?.selectionKind}
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span className="fw-bolder">
                          {" "}
                          {getStatusIcon(record?.status)}
                        </span>
                      </p>

                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <span className="fw-bolder"> {record?.matchTime}</span> */}
                        <span className="fw-bolder text-success">
                          {" "}
                          {formatMatchTime(record?.matchTime)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
              {(betting.some((bet) =>
                moment(bet.matchTime).isSame(moment().add(1, "days"), "day")
              ) ||
                (betting.some((bet) =>
                  moment().isSame(moment(bet.matchTime), "day")
                ) &&
                  !betting.some((bet) =>
                    moment().isAfter(moment(bet.matchTime))
                  ))) && (
                <div className="w-50 mx-auto mb-5">
                  <input
                    type="number"
                    min={1}
                    value={inputAmount}
                    onChange={handleInputChange}
                    className="form-control mt-5 mb-3"
                    style={{
                      background: "#fff",
                      border: "1px solid #406777",
                      borderRadius: "5px",
                      margin: "auto",
                    }}
                  />
                  <div>
                    <div className="m-label fw-bold">
                      Potential Win: ₦{calculatePotentialWinnings()}
                    </div>
                  </div>

                  <div
                    className="d-flex justify-content-center p-3"
                    id="sport__bet-num"
                  >
                    {[100, 200, 500, 1000].map((amount, index) => (
                      <React.Fragment key={index}>
                        <Button
                          className="btn mt-2 p-2 text-white"
                          style={{ background: "#406777", width: "9%" }}
                          onClick={() => handleNumberButtonClick(amount)}
                        >
                          {amount}
                        </Button>
                        {index < 3 && <>&nbsp;&nbsp;</>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      disabled={isLoadingPlayBet}
                      className="btn mt-2 text-white fw-bold w-50"
                      style={{ background: "#406777" }}
                      onClick={handlePlaceBet}
                    >
                      {isLoadingPlayBet ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Loading...
                        </>
                      ) : (
                        "Place Bet"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default PlayBet;
