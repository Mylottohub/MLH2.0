import React from "react";
import Navbar from "../Navbar";
import "../../assets/css/table.css";
import HTTP from "../../utils/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { images } from "../../constant";
import { useNavigate } from "react-router-dom";
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
          <div className="d-flex justify-content-between fw-bold">
            <p>
              Powered By{" "}
              <img src={images.easywin} className="img-fluid" alt="" />
            </p>
            <span>Tomorrow</span>
            <span>Today</span>
            <span>Yesterday</span>
          </div>
          <div className="table-responsive">
            <table className="table table-express table-hover mt-4">
              <tbody>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">BET CODE</th>
                  <th scope="col">STAKE</th>
                  <th scope="col">EXPECTED WINS</th>
                  <th scope="col">NO OF GAMES</th>
                  {/* <th scope="col">DATE</th> */}
                  <th scope="col">ACTION</th>
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
                ) : betting?.today?.length === 0 ? (
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
                          <td></td>
                          <td></td>
                          {/* <td>{formattedDate}</td> */}
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
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </React.Fragment>
  );
};

export default Betting;
