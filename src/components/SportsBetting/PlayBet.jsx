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
        const response = await fetch(
          "https://sandbox.mylottohub.com/v1/get-sports-details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setBetting(data.data.bookingInfo);
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

    return selections.reduce((totalOdds, selection) => {
      return totalOdds * parseFloat(selection.odds);
    }, 1);
  };

  const handlePlaceBet = async () => {
    setIsLoadingPlayBet(true);
    // Validate input amount
    if (!inputAmount || isNaN(inputAmount) || inputAmount < 10) {
      toast.error("Invalid input amount. Minimum amount is ₦10");
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
      const response = await fetch(
        "https://sandbox.mylottohub.com/v1/play-games",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Game Played Successfully");
      navigate("/betting");
    } catch (error) {
      toast("Error placing bet. Please try again.", error);
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
          <div className="table-responsive mb-5">
            <table className="table table-express table-hover mt-4">
              <tbody>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    BET CODE: {id} TOTAL ODDS:{" "}
                    {calculateTotalOdds(
                      betting?.content?.flatMap((item) => item.selectionList)
                    )}
                  </th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  {/* <th scope="col">DATE</th> */}
                  <th scope="col">
                    DATE: {betting?.content?.flatMap((item) => item.matchTime)}
                  </th>
                </tr>
              </tbody>
              <tbody>
                <tr className="table-light">
                  <td scope="col"></td>
                  <td scope="col">SELECTION</td>
                  <td scope="col">MARKET</td>
                  <td scope="col">EVENT</td>
                  <td scope="col">STATUS</td>
                </tr>
              </tbody>

              <tbody>
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
                    <td
                      colSpan="8"
                      className="flex justify-center text-center p-5"
                    >
                      No Record Found
                    </td>
                  </tr>
                ) : (
                  <>
                    {betting?.content?.flatMap((record, index) => {
                      return (
                        <>
                          <tr key={index} className="table-light">
                            <td>{index + 1}</td>
                            <td>{record?.selectionList[0]?.selectionKind}</td>
                            <td>{record?.selectionList[0]?.marketName}</td>
                            <td>{`${record.homeName} vs ${record.awayName}`}</td>
                            {/* <td>{formattedDate}</td> */}
                            <td></td>
                          </tr>
                        </>
                      );
                    })}
                  </>
                )}
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
              {[50, 100, 200, 500, 1000].map((amount, index) => (
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
        </div>
      </>
    </React.Fragment>
  );
};

export default PlayBet;
