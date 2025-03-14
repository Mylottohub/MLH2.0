import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import "../assets/css/result.css";
import React, { useState } from "react";
import HTTP from "../utils/httpClient";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Countdown from "react-countdown";

const ViewMoreResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResults] = useState([]);
  const [perOperator, setPerOperator] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  let operatorID = null;

  if (id == 26) {
    operatorID = "ghana_game";
  } else if (id == 28) {
    operatorID = "wesco";
  } else if (id == 42) {
    operatorID = "wgclogo";
  } else if (id == 45) {
    operatorID = "lottomania";
  } else if (id == 57) {
    operatorID = "lotto_nigeria";
  } else if (id == 43) {
    operatorID = "green_lotto";
  } else if (id == 27) {
    operatorID = "baba_ijebu";
  } else if (id == 61) {
    operatorID = "gd_lotto";
  } else if (id == 65) {
    operatorID = "GH_5_90";
  } else if (id == 62) {
    operatorID = "NNP";
  }

  const imageSrc = `/images/${operatorID}.png`;

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
  // console.log(result);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const requestData = {
        operator_type: operatorID === "GH_5_90" ? "GH 5/90" : operatorID,
      };

      try {
        const response = await HTTP.post("/get-games", requestData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const data = response.data;

        setPerOperator(data.result);
      } catch (error) {
        // console.error(`Error fetching ${id} games:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(); // Call the async function
  }, []);
  useEffect(() => {
    if (userInfo.token) {
      fetchData();
    }
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
                <strong>Latest Results &gt;&gt; Operator Results</strong>
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
                <table cellPadding="3">
                  <tbody>
                    <tr>
                      <td>
                        <table cellPadding="3">
                          <tbody>
                            <tr>
                              <td>
                                <div className="numboxgreen">&nbsp;</div>
                              </td>
                              <td>Winning</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <table cellPadding="3">
                          <tbody>
                            <tr>
                              <td>
                                <div className="numboxred">&nbsp;</div>
                              </td>
                              <td>Machine</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <div className="div_lgrey" style={{ padding: "0px" }}>
                  <div className="row">
                    <div
                      className="col-4 col-lg-2 col-xs-4"
                      style={{ padding: "0px" }}
                    >
                      <img src={imageSrc} className="img-fluid" />
                    </div>
                    <div
                      className="col-8 col-lg-6 col-xs-8"
                      style={{ padding: "20px" }}
                    >
                      {perOperator?.map((item, index) => {
                        if (operatorID === "lotto_nigeria") {
                          if (index === 0) {
                            return (
                              <div key={index}>
                                <strong> {item?.drawAlias}</strong> <br />
                                <br />
                                {moment(item?.drawDate, "DD/MM/YYYY HH:mm")
                                  .local()
                                  .format("DD MMM, YYYY")}{" "}
                                |{" "}
                                {moment(
                                  item?.drawDate,
                                  "DD/MM/YYYY HH:mm"
                                ).format("HH:mm")}
                                <br />
                                <br />
                                <a
                                  onClick={() =>
                                    navigate(`/play-game/${operatorID}`)
                                  }
                                  className="btn btn-blue"
                                >
                                  Play Now
                                </a>
                              </div>
                            );
                          }
                        } else if (operatorID === "lottomania") {
                          if (index === 0) {
                            return (
                              <div key={index}>
                                <strong> {item?.gn}</strong> <br />
                                <br />
                                {moment(item?.sdt) // Assuming item.sdt is the timestamp
                                  .local()
                                  .format("DD MMM, YYYY")}{" "}
                                | {moment(item.sdt).format("HH:mm")}
                                <br />
                                <br />
                                <a
                                  onClick={() =>
                                    navigate(`/play-game/${operatorID}`)
                                  }
                                  className="btn btn-blue"
                                >
                                  Play Now
                                </a>
                              </div>
                            );
                          }
                        } else if (operatorID === "ghana_game") {
                          if (index === 0) {
                            return (
                              <div key={index}>
                                <strong> {item?.gn}</strong> <br />
                                <br />
                                {moment(item?.sdt)
                                  .local()
                                  .format("DD MMM, YYYY")}{" "}
                                | {moment(item?.sdt).format("HH:mm")}
                                <br />
                                <br />
                                <a
                                  onClick={() =>
                                    navigate(`/play-game/${operatorID}`)
                                  }
                                  className="btn btn-blue"
                                >
                                  Play Now
                                </a>
                              </div>
                            );
                          }
                        } else if (operatorID === "wesco") {
                          if (index == 0) {
                            return (
                              <div key={index}>
                                <strong>{item?.drawname}</strong> <br />
                                <br />
                                {moment
                                  .utc(item?.drawdate, "YYYY-MM-DD")
                                  .local()
                                  .format("MMM DD, YYYY")}{" "}
                                | {item?.drawtime}
                                <br />
                                <br />
                                <a
                                  onClick={() =>
                                    navigate(`/play-game/${operatorID}`)
                                  }
                                  className="btn btn-blue"
                                >
                                  Play Now
                                </a>
                              </div>
                            );
                          }
                        } else if (operatorID === "green_lotto") {
                          if (index == 0) {
                            return (
                              <div key={index}>
                                <strong>{item?.drawname}</strong> <br />
                                <br />
                                {moment
                                  .utc(item?.drawdate, "YYYY-MM-DD")
                                  .local()
                                  .format("MMM DD, YYYY")}{" "}
                                | {item?.drawtime}
                                <br />
                                <br />
                                <a
                                  onClick={() =>
                                    navigate(`/play-game/${operatorID}`)
                                  }
                                  className="btn btn-blue"
                                >
                                  Play Now
                                </a>
                              </div>
                            );
                          }
                        } else if (operatorID === "gd_lotto") {
                          if (index == 0) {
                            return (
                              <div key={index}>
                                <strong>{item?.gameName}</strong> <br />
                                <br />
                                {moment
                                  .utc(item?.drawTime, "YYYY-MM-DD")
                                  .local()
                                  .format("MMM DD, YYYY")}{" "}
                                | {item?.drawTime}
                                <br />
                                <br />
                                <a
                                  onClick={() => navigate(`/gd-lotto`)}
                                  className="btn btn-blue"
                                >
                                  Play Now
                                </a>
                              </div>
                            );
                          }
                        } else if (operatorID === "GH_5_90") {
                          if (index == 0) {
                            return (
                              <div key={index}>
                                <strong>{item?.gameName}</strong> <br />
                                <br />
                                {moment
                                  .utc(item?.drawTime, "YYYY-MM-DD")
                                  .local()
                                  .format("MMM DD, YYYY")}{" "}
                                | {item?.drawTime}
                                <br />
                                <br />
                                <a
                                  onClick={() =>
                                    navigate(`/play-game/${operatorID}`)
                                  }
                                  className="btn btn-blue"
                                >
                                  Play Now
                                </a>
                              </div>
                            );
                          }
                        } else if (operatorID === "NNP") {
                          if (index == 0) {
                            return (
                              <div key={index}>
                                <strong>{item?.gameName}</strong> <br />
                                <br />
                                {moment
                                  .utc(item?.drawTime, "YYYY-MM-DD")
                                  .local()
                                  .format("MMM DD, YYYY")}{" "}
                                | {item?.drawTime}
                                <br />
                                <br />
                                <a
                                  onClick={() =>
                                    navigate(`/play-game/${operatorID}`)
                                  }
                                  className="btn btn-blue"
                                >
                                  Play Now
                                </a>
                              </div>
                            );
                          }
                        } else {
                          return null;
                        }
                      })}
                    </div>
                    <div className="col-lg-4 col-xs-12 mb-3">
                      <table cellPadding="10" width="100%">
                        <tbody>
                          <tr>
                            <th>
                              <p>Countdown to Next Game Draw</p>
                            </th>
                          </tr>
                          <tr>
                            <td align="center">
                              <br />
                              <br />
                              {perOperator?.map((item, index) => {
                                if (operatorID === "lotto_nigeria") {
                                  const drawDateTime = moment(
                                    item.drawDate,
                                    "DD/MM/YYYY HH:mm"
                                  );
                                  const currentTime = moment();
                                  const timeDifference =
                                    drawDateTime.diff(currentTime);

                                  if (timeDifference > 0) {
                                    if (index == 0) {
                                      return (
                                        <>
                                          <span>
                                            <small className="countdown_box">
                                              <Countdown
                                                date={
                                                  currentTime.valueOf() +
                                                  timeDifference
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <>
                                                    <span className="countdown_box me-2">
                                                      {days}days
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {hours}hrs
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {minutes}mins
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {seconds}secs
                                                    </span>
                                                  </>
                                                )}
                                              />
                                            </small>
                                          </span>
                                        </>
                                      );
                                    }
                                  } else {
                                    return null;
                                  }
                                } else if (operatorID === "wesco") {
                                  const drawDateTimeString = `${item?.drawdate} ${item?.drawtime}`;
                                  const drawDateTime = moment(
                                    drawDateTimeString,
                                    "YYYYMMDD HH:mm:ss"
                                  );
                                  const currentTime = moment();
                                  const timeDifference =
                                    drawDateTime.diff(currentTime);

                                  if (timeDifference > 0) {
                                    if (index == 0) {
                                      return (
                                        <>
                                          <span>
                                            <small className="countdown_box">
                                              <Countdown
                                                date={
                                                  currentTime.valueOf() +
                                                  timeDifference
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <>
                                                    <span className="countdown_box me-2">
                                                      {days}days
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {hours}hrs
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {minutes}mins
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {seconds}secs
                                                    </span>
                                                  </>
                                                )}
                                              />
                                            </small>
                                          </span>
                                        </>
                                      );
                                    }
                                  } else {
                                    return null;
                                  }
                                } else if (operatorID === "lottomania") {
                                  const drawDateTime = moment(item.sdt);

                                  const currentTime = moment();
                                  const timeDifference =
                                    drawDateTime.diff(currentTime);

                                  if (timeDifference > 0) {
                                    if (index == 0) {
                                      return (
                                        <>
                                          <span>
                                            <small className="countdown_box">
                                              <Countdown
                                                date={
                                                  currentTime.valueOf() +
                                                  timeDifference
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <>
                                                    <span className="countdown_box me-2">
                                                      {days}days
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {hours}hrs
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {minutes}mins
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {seconds}secs
                                                    </span>
                                                  </>
                                                )}
                                              />
                                            </small>
                                          </span>
                                        </>
                                      );
                                    }
                                  } else {
                                    return (
                                      <>
                                        <button className="text-center bg-danger">
                                          No Record Found
                                        </button>
                                      </>
                                    );
                                  }
                                } else if (operatorID === "ghana_game") {
                                  const drawDateTime = moment(item.sdt);

                                  const currentTime = moment();
                                  const timeDifference =
                                    drawDateTime.diff(currentTime);

                                  if (timeDifference > 0) {
                                    if (index == 0) {
                                      return (
                                        <>
                                          <span>
                                            <small className="countdown_box">
                                              <Countdown
                                                date={
                                                  currentTime.valueOf() +
                                                  timeDifference
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <>
                                                    <span className="countdown_box me-2">
                                                      {days}days
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {hours}hrs
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {minutes}mins
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {seconds}secs
                                                    </span>
                                                  </>
                                                )}
                                              />
                                            </small>
                                          </span>
                                        </>
                                      );
                                    }
                                  } else {
                                    return (
                                      <>
                                        <button className="text-center bg-danger">
                                          No Record Found
                                        </button>
                                      </>
                                    );
                                  }
                                } else if (operatorID === "green_lotto") {
                                  const drawDateTimeString = `${item?.drawdate} ${item?.drawtime}`;
                                  const drawDateTime = moment(
                                    drawDateTimeString,
                                    "YYYYMMDD HH:mm:ss"
                                  );
                                  const currentTime = moment();
                                  const timeDifference =
                                    drawDateTime.diff(currentTime);

                                  if (timeDifference > 0) {
                                    if (index == 0) {
                                      return (
                                        <>
                                          <span>
                                            <small className="countdown_box">
                                              <Countdown
                                                date={
                                                  currentTime.valueOf() +
                                                  timeDifference
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <>
                                                    <span className="countdown_box me-2">
                                                      {days}days
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {hours}hrs
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {minutes}mins
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {seconds}secs
                                                    </span>
                                                  </>
                                                )}
                                              />
                                            </small>
                                          </span>
                                        </>
                                      );
                                    }
                                  } else {
                                    return null;
                                  }
                                } else if (operatorID === "gd_lotto") {
                                  const drawDateTimeString = `${item?.drawTime} ${item?.drawTime}`;
                                  const drawDateTime = moment(
                                    drawDateTimeString,
                                    "YYYYMMDD HH:mm:ss"
                                  );
                                  const currentTime = moment();
                                  const timeDifference =
                                    drawDateTime.diff(currentTime);

                                  if (timeDifference > 0) {
                                    if (index == 0) {
                                      return (
                                        <>
                                          <span>
                                            <small className="countdown_box">
                                              <Countdown
                                                date={
                                                  currentTime.valueOf() +
                                                  timeDifference
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <>
                                                    <span className="countdown_box me-2">
                                                      {days}days
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {hours}hrs
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {minutes}mins
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {seconds}secs
                                                    </span>
                                                  </>
                                                )}
                                              />
                                            </small>
                                          </span>
                                        </>
                                      );
                                    }
                                  } else {
                                    return null;
                                  }
                                } else if (operatorID === "GH_5_90") {
                                  const drawDateTimeString = `${item?.drawTime} ${item?.drawTime}`;
                                  const drawDateTime = moment(
                                    drawDateTimeString,
                                    "YYYYMMDD HH:mm:ss"
                                  );
                                  const currentTime = moment();
                                  const timeDifference =
                                    drawDateTime.diff(currentTime);

                                  if (timeDifference > 0) {
                                    if (index == 0) {
                                      return (
                                        <>
                                          <span>
                                            <small className="countdown_box">
                                              <Countdown
                                                date={
                                                  currentTime.valueOf() +
                                                  timeDifference
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <>
                                                    <span className="countdown_box me-2">
                                                      {days}days
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {hours}hrs
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {minutes}mins
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {seconds}secs
                                                    </span>
                                                  </>
                                                )}
                                              />
                                            </small>
                                          </span>
                                        </>
                                      );
                                    }
                                  } else {
                                    return null;
                                  }
                                } else if (operatorID === "NNP") {
                                  const drawDateTimeString = `${item?.drawTime} ${item?.drawTime}`;
                                  const drawDateTime = moment(
                                    drawDateTimeString,
                                    "YYYYMMDD HH:mm:ss"
                                  );
                                  const currentTime = moment();
                                  const timeDifference =
                                    drawDateTime.diff(currentTime);

                                  if (timeDifference > 0) {
                                    if (index == 0) {
                                      return (
                                        <>
                                          <span>
                                            <small className="countdown_box">
                                              <Countdown
                                                date={
                                                  currentTime.valueOf() +
                                                  timeDifference
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <>
                                                    <span className="countdown_box me-2">
                                                      {days}days
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {hours}hrs
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {minutes}mins
                                                    </span>
                                                    <span className="countdown_box me-2">
                                                      {seconds}secs
                                                    </span>
                                                  </>
                                                )}
                                              />
                                            </small>
                                          </span>
                                        </>
                                      );
                                    }
                                  } else {
                                    return null;
                                  }
                                }

                                return null;
                              })}
                              {/* */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row mt-5 mb-5">
                  {result
                    .filter((record) => record.id === parseInt(id, 10))
                    .map((record) => {
                      if (record.name === "Wesco") {
                        return (
                          <React.Fragment key={record.id}>
                            {record.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  {digit !== "0" ? (
                                                    <div className="numboxred">
                                                      {digit}
                                                    </div>
                                                  ) : null}
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record.name == "Set Lotto") {
                        return (
                          <React.Fragment key={record.id}>
                            {record.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  <div className="numboxred">
                                                    {digit !== "0"}
                                                  </div>
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record.name === "Lottomania") {
                        return (
                          <React.Fragment key={record.id}>
                            {record.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  {digit !== "0" ? (
                                                    <div className="numboxred">
                                                      {digit}
                                                    </div>
                                                  ) : null}
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record?.name === "Golden Chance") {
                        return (
                          <React.Fragment key={record.id}>
                            {record.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  {digit !== "0" ? (
                                                    <div className="numboxred">
                                                      {digit}
                                                    </div>
                                                  ) : null}
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record?.name === "5/90 Games") {
                        return (
                          <React.Fragment key={record.id}>
                            {record.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data?.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data?.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  {digit !== "0" ? (
                                                    <div className="numboxred">
                                                      {digit}
                                                    </div>
                                                  ) : (
                                                    <>
                                                      <div className="numboxred">
                                                        {digit !== "0"}
                                                      </div>
                                                    </>
                                                  )}
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record.name === "Green lotto") {
                        return (
                          <React.Fragment key={record?.id}>
                            {record?.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data?.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table cellPadding="" align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  {digit !== "0" ? (
                                                    <div className="numboxred">
                                                      {digit}
                                                    </div>
                                                  ) : null}
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record.name === "Baba Ijebu") {
                        return (
                          <React.Fragment key={record?.id}>
                            {record?.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data?.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  {digit !== "0" ? (
                                                    <div className="numboxred">
                                                      {digit}
                                                    </div>
                                                  ) : null}
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record.name === "GD Lotto") {
                        return (
                          <React.Fragment key={record.id}>
                            {record.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data?.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data?.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  {digit !== "0" ? (
                                                    <div className="numboxred">
                                                      {digit}
                                                    </div>
                                                  ) : null}
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record.name === "GD GHANA") {
                        return (
                          <React.Fragment key={record.id}>
                            {record.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>{data?.game}</strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data?.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table align="center">
                                        <tbody>
                                          <tr>
                                            {data?.winning_number
                                              ?.split("-")
                                              .map(
                                                (digit, j) =>
                                                  digit && (
                                                    <td key={j}>
                                                      <div className="numboxgreen mb-2">
                                                        {digit}
                                                      </div>
                                                    </td>
                                                  )
                                              )}
                                          </tr>
                                          <tr>
                                            {data?.machine_number
                                              ?.split("-")
                                              .map((digit, j) => (
                                                <td key={j}>
                                                  {digit !== "0" ? (
                                                    <div className="numboxred">
                                                      {digit}
                                                    </div>
                                                  ) : null}
                                                </td>
                                              ))}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else if (record.name === "Nigerian Number Plate") {
                        return (
                          <React.Fragment key={record.id}>
                            {record.results
                              .sort(
                                (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map((data, dataIndex) => {
                                return (
                                  <div
                                    key={`${record?.id}-${dataIndex}`}
                                    className="col-lg-4 col-md-6 mb-5"
                                  >
                                    <div className="div_lgrey">
                                      <p className="text-center">
                                        <strong>
                                          {data?.game_name || data?.game}
                                        </strong>
                                      </p>
                                      <br />
                                      <p className="text-center">
                                        <small>
                                          Draw Time:{" "}
                                          {moment
                                            .utc(
                                              data?.date,
                                              "YYYY-MM-DD HH:mm:ss"
                                            )
                                            .local()
                                            .format("MMM DD, YYYY h:mm:ss a")}
                                        </small>
                                      </p>
                                      <br />
                                      <table
                                        align="center"
                                        className="winning-table table"
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <strong>First Prize</strong>
                                            </td>
                                            <td>
                                              <div>{data?.first_prize}</div>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>
                                              <strong>Second Prize</strong>
                                            </td>
                                            <td>
                                              <div>{data?.second_prize}</div>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>
                                              <strong>Third Prize</strong>
                                            </td>
                                            <td>
                                              <div>{data?.third_prize}</div>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>
                                              <strong>Fourth Prize</strong>
                                            </td>
                                            <td>
                                              <div>{data?.fourth_prize_1}</div>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>
                                              <strong>Fifth Prize</strong>
                                            </td>
                                            <td>
                                              <div>{data?.fifth_prize_1}</div>
                                            </td>
                                          </tr>

                                          <tr>
                                            <td>
                                              <strong>Sixth Prize</strong>
                                            </td>
                                            <td>
                                              <div>{data?.sixth_prize_1}</div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                );
                              })}
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <p
                            key={record.id}
                            className="text-danger text-center"
                          >
                            {/* No record found */}
                          </p>
                        );
                      }
                    })}
                </div>
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

export default ViewMoreResults;
