import React from "react";
import Navbar from "../Navbar";
import "../../assets/css/table.css";
import HTTP from "../../utils/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { images } from "../../constant";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const BettingYesterday = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  // const [betting, setBetting] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);

  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [forecasterData, setForecasterData] = useState({});

  const fetchForecast = async () => {
    setIsLoading(true);
    try {
      const response = await HTTP.get(`/user/proforcasters/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setForecasterData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   const requestData = { operator_type: "easywin" };

  //   try {
  //     const response = await HTTP.post("/get-sports", requestData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     });

  //     setBetting(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchForecast();
  }, [userInfo.token]);

  return (
    <React.Fragment>
      <>
        <Navbar />
        <div className="container mt-5  mb-5" style={{ marginBottom: "100px" }}>
          <h2 className="fw-bolder text-center">BOOK - A - BET</h2>

          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Powered By{" "}
                <img src={images.easywin} className="img-fluid" alt="" />
              </a>

              <div className="bet__code">
                <ul className="navbar-nav mx-auto">
                  <li
                    onClick={() => {
                      navigate(`/BettingTomorrow/${id}`);
                    }}
                    className="nav-item"
                  >
                    <a className="nav-link">Tomorrow</a>
                  </li>

                  <li
                    className="nav-item"
                    onClick={() => {
                      navigate(`/betting/${id}`);
                    }}
                  >
                    <a className="nav-link">Today</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link active_sport" aria-current="page">
                      Yesterday
                    </a>
                  </li>
                  <li
                    onClick={() => {
                      navigate(`/all-bettings/${id}`);
                    }}
                    className="nav-item"
                  >
                    <a className="nav-link">All</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <button
            onClick={() => {
              navigate(`/sport-transaction`);
            }}
            className="mt-3 btn fw-bold"
            style={{ color: "#40678C" }}
          >
            Sport Bet History
          </button>
          <div className="table-responsive app__transaction-web">
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
            ) : !forecasterData ||
              Object.keys(forecasterData).length === 0 ||
              !("easywinYesterday" in forecasterData) ||
              forecasterData.easywinYesterday.length === 0 ? (
              <div className="d-flex justify-content-center text-center p-5">
                <div className="hidden-xs hidden-sm mx-auto">
                  <div className="alert alert-danger text-center" role="alert">
                    No Record Found
                  </div>
                </div>
              </div>
            ) : (
              // forecasterData?.easywinYesterday?.length == 0 ? (
              //   <div className="d-flex justify-content-center text-center p-5">
              //     <div className="hidden-xs hidden-sm mx-auto">
              //       <div className="alert alert-danger text-center" role="alert">
              //         No Record Found
              //       </div>
              //     </div>
              //   </div>
              <table className="table table-express table-hover  mt-4">
                <tbody>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">BET CODE</th>
                    <th scope="col">STAKE</th>
                    <th scope="col">NO OF GAMES</th>
                    {/* <th scope="col">STATUS</th> */}
                    <th scope="col">ACTION</th>
                  </tr>
                </tbody>

                <tbody>
                  <>
                    {forecasterData?.easywinYesterday?.map((record, index) => {
                      // let statusText;
                      // switch (record?.status) {
                      //   case 0:
                      //     statusText = "Lost";
                      //     break;
                      //   case 1:
                      //     statusText = "Won";
                      //     break;
                      //   default:
                      //     statusText = "";
                      // }
                      return (
                        <tr key={index} className="table-light">
                          <td style={{ color: "#406777" }}>{index + 1}</td>
                          <td style={{ color: "#406777" }}>
                            {" "}
                            <button
                              style={{ background: "#406777" }}
                              type="submit"
                              className="btn w-100 text-white"
                              disabled={isLoading}
                            >
                              {record?.code}
                            </button>
                          </td>
                          <td style={{ color: "#406777" }}>{record?.stake}</td>
                          <td style={{ color: "#406777" }}>
                            {record?.noGames}
                          </td>
                          {/* <td style={{ color: "#406777" }}>
                            {getStatusIcon(record?.status)}
                          </td> */}
                          <td>
                            {" "}
                            <button
                              onClick={() => {
                                navigate(`/play-bet/${record.code}/${id}`);
                              }}
                              style={{ background: "#406777" }}
                              type="submit"
                              className="btn w-100 text-white"
                              disabled={isLoading}
                            >
                              {/* Play Now */}
                              View Result
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                </tbody>
              </table>
            )}
          </div>

          <div className="app__transaction-mobile">
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
            ) : forecasterData?.easywinYesterday?.length === 0 ? (
              <div className="d-flex justify-content-center text-center p-5">
                <div className="hidden-xs hidden-sm mx-auto">
                  <div className="alert alert-danger text-center" role="alert">
                    No Record Found
                  </div>
                </div>
              </div>
            ) : (
              <>
                {forecasterData?.easywinYesterday?.map((record, index) => {
                  const formattedDate = moment
                    .utc(record?.created_at, "YYYY-MM-DD HH:mm:ss")
                    .local()
                    .format("Do MMM YYYY | h:mm:ssA");

                  return (
                    <div
                      key={index}
                      className="p-3 mb-5 mt-3"
                      style={{ background: "#f5f7f8" }}
                    >
                      <div>
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="fw-bolder">STAKE</span>
                          <span>{record?.stake}</span>
                        </p>
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="fw-bolder">BET CODE:</span>
                          <span>
                            {" "}
                            <button
                              style={{ background: "#406777" }}
                              type="submit"
                              className="btn w-100 text-white"
                              disabled={isLoading}
                            >
                              {record?.code}
                            </button>
                          </span>
                        </p>
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="fw-bolder">NO OF GAMES: </span>
                          <span>{record?.noGames}</span>
                        </p>

                        <p
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="fw-bolder">DATE: </span>
                          <span>{formattedDate}</span>
                        </p>
                      </div>
                      <span style={{ cursor: "pointer" }}>
                        <button
                          onClick={() => {
                            navigate(`/play-bet/${record.code}/${id}`);
                          }}
                          style={{ background: "#406777" }}
                          type="submit"
                          className="btn w-100 text-white"
                          disabled={isLoading}
                        >
                          View Result
                        </button>{" "}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </>
    </React.Fragment>
  );
};

export default BettingYesterday;
