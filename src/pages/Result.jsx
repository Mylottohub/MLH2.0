import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import "../assets/css/result.css";
import { useState } from "react";
import HTTP from "../utils/httpClient";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResults] = useState([]);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const configHeaders = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchData = () => {
    setIsLoading(true);
    HTTP.get(`/mylotto_get_results`, { ...configHeaders })
      .then((response) => {
        setResults(response.data.data);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [userInfo.token]);

  return (
    <div>
      <Navbar />
      <Slider />

      <div className="about-area ptb-120">
        <div className="container">
          <div className="meg_container mt-5">
            <span className="hidden-xs hidden-sm mb-5">
              <h4>
                <strong>Latest Results</strong>
              </h4>
            </span>
            {isLoading ? (
              <div className="spinner-container d-flex align-items-center justify-content-center">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            ) : result.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="spinner-container d-flex align-items-center justify-content-center"
                >
                  No Record Found
                </td>
              </tr>
            ) : (
              <>
                {result
                  .sort(
                    (a, b) =>
                      new Date(b.results[0]?.date) -
                      new Date(a.results[0]?.date)
                  )
                  .map((record, index) => {
                    const latestResult = record.results[0];

                    return (
                      <>
                        <div key={index} className="d-none d-sm-block mt-5">
                          <div className="row app__all-result">
                            <div className="col-3 col-lg-2">
                              <img
                                src={record?.logo}
                                className="img-fluid img-rounded"
                                alt={`${record.name}`}
                              />
                            </div>
                            <div className="col-9 col-lg-10 div_lgrey">
                              <strong>{latestResult?.game}</strong>
                              <br />
                              <small>
                                <strong>Draw Time:</strong>
                                {latestResult?.date && (
                                  <span>
                                    {moment
                                      .utc(
                                        latestResult.date,
                                        "YYYY-MM-DD HH:mm:ss"
                                      )
                                      .local()
                                      .format("MMM DD, YYYY h:mm:ss a")}
                                  </span>
                                )}
                              </small>
                              <br />
                              <br />
                              <br />

                              {latestResult?.winning_number
                                ?.split("-")
                                .map((digit, j) => (
                                  <td key={j}>
                                    <div className="numboxwhite">{digit}</div>
                                  </td>
                                ))}

                              <div className="pull-right mt-4 mb-3">
                                <a
                                  onClick={() =>
                                    navigate(
                                      `/view-more/${latestResult?.operator}`
                                    )
                                  }
                                  className="text-decoration-none"
                                >
                                  <small style={{ cursor: "pointer" }}>
                                    <strong>View More&gt;&gt;</strong>
                                  </small>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-block d-sm-none mb-5 mt-5">
                          <div className="row">
                            <div className="col-xs-12">
                              <div className="div_lgrey">
                                <table cellPadding="3">
                                  <tbody>
                                    <tr>
                                      <td width="30%">
                                        <img
                                          src={record?.logo}
                                          className="img-fluid img-rounded"
                                          alt={`${record.name}`}
                                        />
                                      </td>
                                      <td>
                                        <strong>{latestResult?.game}</strong>
                                        <br />
                                        <small>
                                          {latestResult?.date && (
                                            <span>
                                              {moment
                                                .utc(
                                                  latestResult.date,
                                                  "YYYY-MM-DD HH:mm:ss"
                                                )
                                                .local()
                                                .format(
                                                  "MMM DD, YYYY h:mm:ss a"
                                                )}
                                            </span>
                                          )}
                                        </small>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <br />

                                {latestResult?.winning_number
                                  ?.split("-")
                                  .map((digit, j) => (
                                    <td key={j}>
                                      <div className="numboxwhite app__mobile-white">
                                        {digit}
                                      </div>
                                    </td>
                                  ))}

                                <br />
                                <div className="pull-right">
                                  <a
                                    onClick={() =>
                                      navigate(
                                        `/view-more/${latestResult?.operator}`
                                      )
                                    }
                                    className="text-decoration-none"
                                  >
                                    <small style={{ cursor: "pointer" }}>
                                      View More&gt;&gt;
                                    </small>
                                  </a>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </>
            )}

            <div className="clearfix"></div>
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;
