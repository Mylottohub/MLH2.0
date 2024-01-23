import React from "react";
import Navbar from "../Navbar";
import "../../assets/css/table.css";
import HTTP from "../../utils/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { images } from "../../constant";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Betting = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [betting, setBetting] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);

  const { userInfo } = useSelector((state) => state.auth);

  const fetchData = async () => {
    setIsLoading(true);
    const requestData = { operator_type: "easywin" };

    try {
      const response = await HTTP.post("/get-sports", requestData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setBetting(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Today
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Tomorrow
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Yesterday
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
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
            ) : betting?.today?.length === 0 ? (
              <tr>
                <td colSpan="8" className="flex justify-center text-center p-5">
                  No Record Found
                </td>
              </tr>
            ) : (
              <table className="table table-express table-hover  mt-4">
                <tbody>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">BET CODE</th>
                    <th scope="col">STAKE</th>
                    <th scope="col">NO OF GAMES</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </tbody>

                <tbody>
                  <>
                    {betting?.today?.map((record, index) => {
                      //   const formattedDate = moment
                      //     .utc(record?.created_at, "YYYY-MM-DD HH:mm:ss")
                      //     .local()
                      //     .format("Do MMM YYYY | h:mm:ssA");

                      return (
                        <tr key={index} className="table-light">
                          <td>{index + 1}</td>
                          <td>{record?.code}</td>
                          <td>{record?.stake}</td>
                          <td>{record?.noGames}</td>
                          <td>
                            {" "}
                            <button
                              onClick={() => {
                                navigate(`/play-bet/${record.code}`);
                              }}
                              style={{ background: "#406777" }}
                              type="submit"
                              className="btn w-100 text-white"
                              disabled={isLoading}
                            >
                              Play Now
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
            <>
              {betting?.today?.map((record, index) => {
                const formattedDate = moment
                  .utc(record?.created_at, "YYYY-MM-DD HH:mm:ss")
                  .local()
                  .format("Do MMM YYYY | h:mm:ssA");

                return (
                  <div
                    key={index}
                    className="p-3 mb-5 mt-3 app__transaction-mobile"
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
                        <span>{record?.code}</span>
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
                          navigate(`/play-bet/${record.code}`);
                        }}
                        style={{ background: "#406777" }}
                        type="submit"
                        className="btn w-100 text-white"
                        disabled={isLoading}
                      >
                        Play Now
                      </button>{" "}
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default Betting;
