import React from "react";
import Navbar from "../Navbar";
import "../../assets/css/table.css";
// import HTTP from "../../utils/httpClient";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { images } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";
import { HTTP } from "../../utils";
const PlayBet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [betting, setBetting] = useState([]);
  const [inputAmount, setInputAmount] = useState("");
  const [isLoadingPlayBet, setIsLoadingPlayBet] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const requestData = { code: id };
      try {
        const response = await HTTP.post("/get-sports-details", requestData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.status === 200) {
          setBetting(response.data.data.bookingInfo);
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
    const totalOdds = calculateTotalOdds(
      betting?.content?.flatMap((item) => item.selectionList)
    );
    return (inputAmount * totalOdds).toFixed(2);
  };

  const handleNumberButtonClick = (amount) => {
    setInputAmount(amount);
  };
  const calculateTotalOdds = (selections) => {
    if (!selections || selections.length === 0) {
      return 1;
    }

    const totalOdds = selections.reduce((totalOdds, selection) => {
      return totalOdds * parseFloat(selection.odds);
    }, 1);

    // Round to two decimal places
    return parseFloat(totalOdds.toFixed(2));
  };

  const handlePlaceBet = async () => {
    setIsLoadingPlayBet(true);
    if (!inputAmount || isNaN(inputAmount) || inputAmount < 100) {
      toast.error("Minimum stake amount is ₦100");
      setIsLoadingPlayBet(false);
      return;
    }

    const payload = {
      userID: userInfo.data.id,
      amount: parseFloat(inputAmount),
      code: id,
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

      if (response.status === 200) {
        toast.success("Your selected game has been submitted successfully");
        navigate("/betting");
      } else {
        const responseError = await response.data;
        toast.error(responseError.msg);
      }
    } catch (error) {
      toast.error("Error placing bet. Please try again.", error);
    } finally {
      setIsLoadingPlayBet(false);
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
                          BET CODE: {id} &nbsp;&nbsp; &nbsp;&nbsp;TOTAL ODDS:{" "}
                          {calculateTotalOdds(
                            betting?.content?.flatMap(
                              (item) => item.selectionList
                            )
                          )}
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
                        <td scope="col">EVENT</td>
                        <td scope="col">MARKET</td>
                        <td scope="col">SELECTION</td>
                        <td scope="col">STATUS</td>
                      </tr>
                    </tbody>

                    <tbody>
                      <>
                        {betting?.content?.flatMap((record, index) => {
                          return (
                            <>
                              <tr key={index} className="table-light">
                                <td>{index + 1}</td>
                                <td>{`${record.homeName} vs ${record.awayName}`}</td>
                                <td>{record?.selectionList[0]?.marketName}</td>
                                <td>
                                  {record?.selectionList[0]?.selectionKind}
                                </td>
                                {/* <td>{formattedDate}</td> */}
                                <td></td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    </tbody>
                  </table>
                </div>
                <div className="w-50 mx-auto">
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
                        &nbsp;&nbsp; &nbsp;&nbsp;
                      </React.Fragment>
                    ))}
                  </div>

                  <Button
                    onClick={handlePlaceBet}
                    className="btn form-control mt-5 mb-3 text-white"
                    style={{
                      background: "#406777",
                    }}
                  >
                    {isLoadingPlayBet ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      "Place Bet"
                    )}
                  </Button>
                </div>
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
              BET CODE: {id} &nbsp;&nbsp; &nbsp;&nbsp;
              <br />
              <br />
              <p className="fw-bolder">
                {" "}
                TOTAL ODDS:{" "}
                {calculateTotalOdds(
                  betting?.content?.flatMap((item) => item.selectionList)
                )}
              </p>
              {betting?.content?.map((record, index) => {
                // const formattedDate = moment
                //   .utc(record?.matchTime, "YYYY-MM-DD HH:mm:ss")
                //   .local()
                //   .format("Do MMM YYYY | h:mm:ssA");

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
                          {" "}
                          {record?.selectionList[0]?.selectionKind}
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span> {record?.selectionList[0]?.marketName}</span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          {`${record.homeName} vs ${record.awayName}`}}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="w-50 mx-auto app__transaction-mobile">
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
                      &nbsp;&nbsp; &nbsp;&nbsp;
                    </React.Fragment>
                  ))}
                </div>

                <Button
                  onClick={handlePlaceBet}
                  className="btn form-control mt-5 mb-5 text-white"
                  style={{
                    background: "#406777",
                  }}
                >
                  {isLoadingPlayBet ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    "Place Bet"
                  )}
                </Button>
                <br />
              </div>
            </div>
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default PlayBet;
