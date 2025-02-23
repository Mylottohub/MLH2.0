import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../assets/css/operator.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import moment from "moment";
import { HTTP } from "../../utils";
import Slider from "../Slider";

const OperatorMobile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [operatorData, setOperatorData] = useState({
    wesco: [],
    green_lotto: [],
    lotto_nigeria: [],
    lottomania: [],
    ghana_game: [],
    green_ghana_game: [],
  });
  const [operatorLogos, setOperatorLogos] = useState({});

  useEffect(() => {
    // Fetch operator logos from the endpoint
    const fetchOperatorLogos = async () => {
      try {
        const response = await HTTP.get("/display-operators");
        const data = response.data.data;
        const logos = {};
        data.forEach((operator) => {
          logos[operator.name.replace(" ", "_").toLowerCase()] = operator.logo;
        });
        setOperatorLogos(logos);
      } catch (error) {
        console.error("Error fetching operator logos:", error);
      }
    };

    fetchOperatorLogos();
  }, []);

  const operatorTypes = [
    "ghana_game",
    "green_ghana_game",
    "wesco",
    "green_lotto",
    "lottomania",
    "lotto_nigeria",
    "gd_lotto",
  ];
  useEffect(() => {
    operatorTypes.forEach(async (operatorType) => {
      const requestData = { operator_type: operatorType };
      setIsLoading(true);

      try {
        const response = await HTTP.post("/get-games", requestData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const data = response.data;

        setOperatorData((prevData) => ({
          ...prevData,
          [operatorType]: Array.isArray(data.result)
            ? data.result
            : [data.result],
        }));
      } catch (error) {
        console.error(`Error fetching ${operatorType} games:`, error);
      } finally {
        setIsLoading(false);
      }
    });
  }, [userInfo]);

  const [timetable, setTimetable] = useState([]);

  const fetchData = () => {
    HTTP.get(`/mylotto_get_timetable`)
      .then((response) => {
        setTimetable(response.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const filteredTimetable = timetable
    .filter(
      (game) =>
        moment().isBefore(
          moment(`${moment().format("YYYY-MM-DD")} ${game?.start_time}`)
        ) && game?.day === currentDay
    )
    .sort((a, b) =>
      moment(a.start_time, "HH:mm:ss").diff(moment(b.start_time, "HH:mm:ss"))
    );

  const goldenChanceGames = filteredTimetable
    .filter((game) => game.operator === 42)
    .sort((a, b) =>
      moment(a.start_time, "HH:mm:ss").diff(moment(b.start_time, "HH:mm:ss"))
    );

  const latestGame = goldenChanceGames.length > 0 ? goldenChanceGames[0] : null;

  const currentTime = moment();
  const gameStartTime = latestGame
    ? moment(`${moment().format("YYYY-MM-DD")} ${latestGame.start_time}`)
    : null;
  const timeRemaining = gameStartTime ? gameStartTime.diff(currentTime) : null;
  const operatorNameMapping = {
    ghana_game: "5/90_games",
    green_ghana_game: "green_lotto ghana",
    wesco: "wesco",
    green_lotto: "green_lotto",
    lottomania: "lottomania",
    lotto_nigeria: "set_lotto",
  };

  return (
    <div>
      <section>
        <Navbar />
        <Slider />
      </section>
      <div className="container mb-5">
        <div className="row">
          <div className="col-sm-12 mb-5 mt-5 fw-bolder">
            <h4 className="fw-bolder">Select Operator and Play Game</h4>
          </div>

          {isLoading ? (
            <div className="spinner text-dark text-center">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </div>
          ) : (
            operatorTypes.map((operatorType, index) => {
              const operatorDataArray = operatorData[operatorType];

              if (operatorDataArray && operatorDataArray.length > 0) {
                const imageSrc =
                  operatorLogos[operatorNameMapping[operatorType]] ||
                  `/images/${operatorType}.png`;

                const propertyMapping = {
                  ghana_game: { name: "gn", time: "sdt" },
                  wesco: { name: "drawname", time: "drawtime" },
                  green_lotto: { name: "drawname", time: "drawtime" },
                  green_ghana_game: { name: "drawname", time: "drawtime" },
                  lottomania: { name: "gn", time: "sdt" },
                  lotto_nigeria: { name: "drawAlias", time: "drawDate" },
                };

                const dataArray = Array.isArray(operatorDataArray)
                  ? operatorDataArray
                  : Object.values(operatorDataArray);

                const upcomingGames = dataArray.filter((game) => {
                  const currentTime = moment();

                  let drawTime;

                  if (operatorType === "lotto_nigeria") {
                    drawTime = game?.drawDate
                      ? moment(game?.drawDate, "DD/MM/YYYY HH:mm")
                      : null;
                  } else if (operatorType === "wesco") {
                    const drawDateTimeString = `${game?.drawdate} ${game?.drawtime}`;
                    drawTime = moment(drawDateTimeString, "YYYYMMDD HH:mm:ss");
                  } else if (operatorType === "lottomania") {
                    drawTime = moment(game?.sdt);
                  } else if (operatorType === "ghana_game") {
                    drawTime = moment(game?.sdt);
                  } else if (operatorType === "green_lotto") {
                    const drawDateTimeString = `${game?.drawdate}${game?.drawtime}`;
                    drawTime = moment(drawDateTimeString, "YYYYMMDD HH:mm:ss");
                  } else if (operatorType === "green_ghana_game") {
                    const drawDateTimeString = `${game?.drawdate}${game?.drawtime}`;
                    drawTime = moment(drawDateTimeString, "YYYYMMDD HH:mm:ss");
                  }

                  return drawTime && drawTime?.isAfter(currentTime);
                });

                upcomingGames.sort(
                  (a, b) =>
                    new Date(a[propertyMapping[operatorType].time]) -
                    new Date(b[propertyMapping[operatorType].time])
                );

                // Take only the first game (next scheduled game)
                const nextGame =
                  upcomingGames.length > 0 ? upcomingGames[0] : null;

                const renderGameTime = (operatorType, game) => {
                  const time = game[propertyMapping[operatorType].time];

                  if (operatorType === "lottomania") {
                    return new Date(time);
                  } else if (operatorType === "ghana_game") {
                    return new Date(time);
                  } else if (operatorType === "lotto_nigeria") {
                    const parsedTime = moment(time, "DD/MM/YYYY HH:mm")
                      .utcOffset("+00:00")
                      .utc();
                    return parsedTime.toDate();
                  } else if (operatorType === "wesco") {
                    // For "wesco," combine "drawdate" and "drawtime" in the correct format
                    const drawDateTimeString = `${game?.drawdate} ${game?.drawtime}`;
                    const parsedTime = moment(
                      drawDateTimeString,
                      "YYYYMMDD HH:mm:ss"
                    )
                      .utcOffset("+00:00")
                      .utc();

                    // Check if parsedTime is valid
                    if (parsedTime.isValid()) {
                      return parsedTime.toDate();
                    } else {
                      console.error("Invalid date format:", drawDateTimeString);
                      return null;
                    }
                  } else if (operatorType === "green_lotto") {
                    const drawDateTimeString = `${game?.drawdate} ${game?.drawtime}`;
                    const parsedTime = moment(
                      drawDateTimeString,
                      "YYYYMMDD HH:mm:ss"
                    )
                      .utcOffset("+00:00")
                      .utc();

                    // Check if parsedTime is valid
                    if (parsedTime.isValid()) {
                      return parsedTime.toDate();
                    } else {
                      console.error("Invalid date format:", drawDateTimeString);
                      return null;
                    }
                  } else if (operatorType === "green_ghana_game") {
                    const drawDateTimeString = `${game?.drawdate} ${game?.drawtime}`;
                    const parsedTime = moment(
                      drawDateTimeString,
                      "YYYYMMDD HH:mm:ss"
                    )
                      .utcOffset("+00:00")
                      .utc();

                    // Check if parsedTime is valid
                    if (parsedTime.isValid()) {
                      return parsedTime.toDate();
                    } else {
                      console.error("Invalid date format:", drawDateTimeString);
                      return null;
                    }
                  } else {
                    // Handle other operator types by parsing the time string
                    const parsedTime = moment(time, "DD/MM/YYYY HH:mm")
                      .utcOffset("+00:00")
                      .utc();
                    return parsedTime.toDate();
                  }
                };

                return (
                  <div key={index}>
                    <div className="hidden-md hidden-lg div_vlgrey">
                      <table width="100%" cellPadding="3">
                        <tbody>
                          <tr valign="top">
                            <td width="41%">
                              <img src={imageSrc} className="img-fluid" />
                            </td>
                            <td style={{ lineHeight: "19px!important" }}>
                              {nextGame ? (
                                <>
                                  <table width="100%" cellPadding="3">
                                    <tbody>
                                      <tr valign="top">
                                        <td
                                          style={{
                                            lineHeight: "19px!important",
                                          }}
                                        >
                                          <small>
                                            <strong>NEXT DRAW</strong>
                                          </small>
                                          <br />
                                          <small>
                                            {" "}
                                            {
                                              nextGame[
                                                propertyMapping[operatorType]
                                                  .name
                                              ]
                                            }
                                          </small>
                                          <br />
                                          <br />

                                          <small>
                                            <span>
                                              <Countdown
                                                date={
                                                  new Date(
                                                    renderGameTime(
                                                      operatorType,
                                                      nextGame
                                                    )
                                                  )
                                                }
                                                renderer={({
                                                  days,
                                                  hours,
                                                  minutes,
                                                  seconds,
                                                }) => (
                                                  <div className="mb-2">
                                                    <span className="countdown_box">
                                                      {days}days
                                                    </span>{" "}
                                                    <span className="countdown_box">
                                                      {hours}hrs
                                                    </span>{" "}
                                                    <span className="countdown_box">
                                                      {minutes}mins
                                                    </span>{" "}
                                                    <br />
                                                    <span
                                                      style={{ width: "38%" }}
                                                    >
                                                      <p
                                                        className="countdown_box mt-3"
                                                        style={{ width: "38%" }}
                                                      >
                                                        {" "}
                                                        {seconds}secs
                                                      </p>
                                                    </span>{" "}
                                                  </div>
                                                )}
                                              />
                                            </span>
                                          </small>

                                          <p>
                                            <a
                                              onClick={() => {
                                                navigate(
                                                  `/play-game/${operatorType}`
                                                );
                                              }}
                                              className="btn btn-blue btn-sm btn-block"
                                            >
                                              Play Now
                                            </a>
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </>
                              ) : (
                                <>
                                  {operatorType === "gd_lotto" ? (
                                    <a
                                      onClick={() => {
                                        navigate(`/gd-lotto`);
                                      }}
                                      className="btn btn-blue btn-sm btn-block w-100 mt-5"
                                    >
                                      Play Now
                                    </a>
                                  ) : (
                                    <>
                                      <div className="service-img"></div>
                                      <p>Next Game Display at 12:00am</p>
                                    </>
                                  )}
                                </>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          )}

          <div className="hidden-md hidden-lg div_vlgrey">
            <table width="100%" cellPadding="3">
              <tbody>
                <tr valign="top">
                  <td width="41%">
                    <img
                      src="/images/golden_chance.png"
                      className="img-fluid"
                    />
                  </td>
                  <td style={{ lineHeight: "19px!important" }}>
                    <small>
                      <strong>NEXT DRAW</strong>
                    </small>
                    <br />
                    <small>
                      {" "}
                      {latestGame
                        ? latestGame.name
                        : "Next Game Display at 12:00am"}
                    </small>
                    <br />
                    <br />

                    <small>
                      <span>
                        <Countdown
                          date={moment().add(timeRemaining).toDate()}
                          renderer={({ days, hours, minutes, seconds }) => (
                            <div className="mb-2">
                              <span className="countdown_box">{days}days</span>{" "}
                              <span className="countdown_box">{hours}hrs</span>{" "}
                              <span className="countdown_box">
                                {minutes}mins
                              </span>{" "}
                              <br />
                              <span style={{ width: "38%" }}>
                                <p
                                  className="countdown_box mt-3"
                                  style={{ width: "38%" }}
                                >
                                  {" "}
                                  {seconds}secs
                                </p>
                              </span>{" "}
                            </div>
                          )}
                        />
                      </span>
                    </small>

                    <p>
                      <a
                        href="https://goldenchancelotto.com/?RefferalCode=0q6ua5wm"
                        className="btn btn-blue btn-sm btn-block mt-3"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Play Now
                      </a>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default OperatorMobile;
