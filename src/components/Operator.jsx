import { useNavigate } from "react-router-dom";
import "../assets/css/operator.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import moment from "moment";
import { HTTP } from "../utils";
import { useGetProfileUser } from "../react-query";

const Operator = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [operatorData, setOperatorData] = useState({
    golden_chance: [],
    wesco: [],
    green_lotto: [],
    lotto_nigeria: [],
    lottomania: [],
    ghana_game: [],
    green_ghana_game: [],
  });

  const [operatorLogos, setOperatorLogos] = useState({});
  const { userProfileTempToken, userProfileResponse } = useGetProfileUser([]);

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
    "golden_chance",
    "GH 5/90",
    "ghana_game",
    "gd_jackpot",
    "wesco",
    "green_lotto",
    "lotto_nigeria",
    "green_ghana_game",
    "gd_lotto",
    "NNP",
    "lottomania",
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
        // console.error(`Error fetching ${operatorType} games:`, error);
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

  const now = new Date();

  const latestGame590 = Array.isArray(operatorData?.gd_lotto)
    ? operatorData?.gd_lotto
        .filter(
          (game) => game?.gameType === "5/90" && new Date(game?.drawTime) > now
        )
        .sort((a, b) => new Date(a.drawTime) - new Date(b.drawTime))[0]
    : null;

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
    golden_chance: "golden_chance",
    ghana_game: "5/90_games",
    green_ghana_game: "green_lotto ghana",
    wesco: "wesco",
    green_lotto: "green_lotto",
    lottomania: "lottomania",
    lotto_nigeria: "set_lotto",
    gd_lotto: "gd_lotto",
    gd_jackpot: "gd_jackpot",
    "GH 5/90": "gh_590",
    NNP: "nnp",
  };

  return (
    <>
      <div className="container">
        <div className="row app__select_operator">
          <div className="col-sm-12 mb-5">
            <h1>Select Operator</h1>
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
          ) : operatorTypes.length === 0 ? (
            <tr>
              <td colSpan="8" className="flex justify-center text-center p-5">
                Next Game Display at 12:00am
              </td>
            </tr>
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
                  gd_lotto: {
                    name: latestGame590?.gameName,
                    time: latestGame590?.drawTime,
                  },
                  gd_jackpot: {
                    name: latestGame590?.gameName,
                    time: latestGame590?.drawTime,
                  },
                  "GH 5/90": { name: "gameName", time: "drawTime" },
                  NNP: { name: "gameName", time: "drawTime" },
                  golden_chance: { name: "drawname", time: "drawtime" },
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
                    const drawDateTimeString = `${game?.drawdate}${game?.drawtime}`;
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
                  } else if (operatorType === "GH 5/90") {
                    const drawDateTimeString = `${game?.drawTime}`;
                    drawTime = moment(drawDateTimeString, "YYYYMMDD HH:mm:ss");
                  } else if (operatorType === "gd_lotto") {
                    if (Array.isArray(operatorData?.gd_lotto)) {
                      const now = new Date();

                      const latestGame590 = operatorData.gd_lotto
                        .filter(
                          (game) =>
                            game?.gameType === "5/90" &&
                            new Date(game?.drawTime) > now
                        )
                        .sort(
                          (a, b) =>
                            new Date(a?.drawTime) - new Date(b?.drawTime)
                        )[0];

                      if (latestGame590) {
                        game = {
                          name: latestGame590?.gameName,
                          time: latestGame590?.drawTime,
                        };
                        drawTime = moment(
                          latestGame590?.drawTime,
                          "YYYY-MM-DDTHH:mm:ss"
                        );
                      }
                    }
                  } else if (operatorType === "gd_jackpot") {
                    if (Array.isArray(operatorData?.gd_lotto)) {
                      const now = new Date();

                      const latestGame590 = operatorData.gd_lotto
                        .filter(
                          (game) =>
                            game?.gameType === "5/90" &&
                            new Date(game?.drawTime) > now
                        )
                        .sort(
                          (a, b) =>
                            new Date(a?.drawTime) - new Date(b?.drawTime)
                        )[0];

                      if (latestGame590) {
                        game = {
                          name: latestGame590?.gameName,
                          time: latestGame590?.drawTime,
                        };
                        drawTime = moment(
                          latestGame590?.drawTime,
                          "YYYY-MM-DDTHH:mm:ss"
                        );
                      }
                    }
                  } else if (operatorType === "NNP") {
                    const drawDateTimeString = `${game?.drawTime}`;
                    drawTime = moment(drawDateTimeString, "YYYYMMDD HH:mm:ss");
                  } else if (operatorType === "golden_chance") {
                    const drawDate = game?.drawdate; // format: "YYYYMMDD"
                    const drawTimeString = game?.drawtime; // format: "HH:mm:ss"

                    if (drawDate && drawTimeString) {
                      drawTime = moment(
                        `${drawDate} ${drawTimeString}`,
                        "YYYYMMDD HH:mm:ss"
                      );
                    } else {
                      drawTime = null; // fallback
                    }
                  }
                  return drawTime && drawTime.isAfter(currentTime);
                });
                upcomingGames.sort(
                  (a, b) =>
                    new Date(a[propertyMapping[operatorType]?.time]) -
                    new Date(b[propertyMapping[operatorType]?.time])
                );

                const nextGame =
                  upcomingGames.length > 0 ? upcomingGames[0] : null;

                const renderGameTime = (operatorType, game) => {
                  const time = game[propertyMapping[operatorType]?.time];

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
                    const drawDateTimeString = `${game?.drawdate} ${game?.drawtime}`;
                    const parsedTime = moment(
                      drawDateTimeString,
                      "YYYYMMDD HH:mm:ss"
                    )
                      .utcOffset("+00:00")
                      .utc();

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

                    if (parsedTime.isValid()) {
                      return parsedTime.toDate();
                    } else {
                      return null;
                    }
                  } else if (operatorType === "GH 5/90") {
                    const drawDateTimeString = `${game?.drawTime}`;
                    const parsedTime = moment(
                      drawDateTimeString,
                      "YYYYMMDD HH:mm:ss"
                    )
                      .utcOffset("+00:00")
                      .utc();

                    if (parsedTime.isValid()) {
                      return parsedTime.toDate();
                    } else {
                      return null;
                    }
                  } else if (operatorType === "NNP") {
                    const drawDateTimeString = `${game?.drawTime}`;
                    const parsedTime = moment(
                      drawDateTimeString,
                      "YYYYMMDD HH:mm:ss"
                    )
                      .utcOffset("+00:00")
                      .utc();

                    if (parsedTime.isValid()) {
                      return parsedTime.toDate();
                    } else {
                      return null;
                    }
                  } else if (operatorType === "gd_lotto") {
                    if (Array.isArray(operatorData?.gd_lotto)) {
                      const now = new Date();

                      const latestGame590 = operatorData.gd_lotto
                        .filter(
                          (game) =>
                            game?.gameType === "5/90" &&
                            new Date(game?.drawTime) > now
                        )
                        .sort(
                          (a, b) =>
                            new Date(a?.drawTime) - new Date(b?.drawTime)
                        )[0];

                      if (latestGame590) {
                        const drawDateTimeString = latestGame590?.drawTime;
                        const parsedTime = moment(
                          drawDateTimeString,
                          "YYYY-MM-DDTHH:mm:ss"
                        )
                          .utcOffset("+00:00")
                          .utc();

                        if (parsedTime.isValid()) {
                          return parsedTime.toDate();
                        } else {
                          return null;
                        }
                      }
                    }
                  } else if (operatorType === "gd_jackpot") {
                    if (Array.isArray(operatorData?.gd_lotto)) {
                      const now = new Date();

                      const latestGame590 = operatorData?.gd_lotto
                        .filter(
                          (game) =>
                            game?.gameType === "5/90" &&
                            new Date(game?.drawTime) > now
                        )
                        .sort(
                          (a, b) =>
                            new Date(a?.drawTime) - new Date(b?.drawTime)
                        )[0];

                      if (latestGame590) {
                        const drawDateTimeString = latestGame590?.drawTime;
                        const parsedTime = moment(
                          drawDateTimeString,
                          "YYYY-MM-DDTHH:mm:ss"
                        )
                          .utcOffset("+00:00")
                          .utc();

                        if (parsedTime.isValid()) {
                          return parsedTime.toDate();
                        } else {
                          return null;
                        }
                      }
                    }
                  } else if (operatorType === "golden_chance") {
                    const drawDateTimeString = `${game?.drawdate} ${game?.drawtime}`;
                    const parsedTime = moment(
                      drawDateTimeString,
                      "YYYYMMDD HH:mm:ss"
                    )
                      .utcOffset("+00:00")
                      .utc();

                    if (parsedTime.isValid()) {
                      return parsedTime.toDate();
                    } else {
                      return null;
                    }
                  } else {
                    const parsedTime = moment(time, "DD/MM/YYYY HH:mm")
                      .utcOffset("+00:00")
                      .utc();
                    return parsedTime.toDate();
                  }
                };
                return (
                  <div
                    key={index}
                    className="col-md-3 col-sm-6 col-xs-12 col-2"
                  >
                    <div className="service-wrap mb-5">
                      <a>
                        <div className="service-img">
                          <img
                            src={imageSrc}
                            alt=""
                            className="img-fluid mb-3"
                          />
                        </div>
                      </a>
                      <div className="service-content text-center">
                        {nextGame ? (
                          <>
                            <p>
                              <strong>NEXT GAME:</strong>
                              <br />
                              {operatorType === "gd_lotto" ||
                              operatorType === "gd_jackpot"
                                ? latestGame590?.gameName
                                : nextGame[propertyMapping[operatorType]?.name]}
                              <br />
                              <br />
                              <span>
                                <small>
                                  <span>
                                    <Countdown
                                      date={
                                        new Date(
                                          renderGameTime(operatorType, nextGame)
                                        )
                                      }
                                      renderer={({
                                        days,
                                        hours,
                                        minutes,
                                        seconds,
                                      }) => (
                                        <>
                                          <span className="countdown_box me-2">
                                            {days} days
                                          </span>
                                          <span className="countdown_box me-2">
                                            {hours} hrs
                                          </span>
                                          <span className="countdown_box me-2">
                                            {minutes} mins
                                          </span>
                                          <span className="countdown_box me-2">
                                            {seconds} secs
                                          </span>
                                        </>
                                      )}
                                    />
                                  </span>
                                </small>
                              </span>
                            </p>
                            <p
                              onClick={() => {
                                if (operatorType === "gd_lotto") {
                                  navigate(`/gd-lotto`);
                                } else if (operatorType === "gd_jackpot") {
                                  navigate(`/play-game/gd_jackpot`);
                                } else if (operatorType === "golden_chance") {
                                  const uid = userProfileResponse?.id;
                                  const tempToken = userProfileTempToken;

                                  if (uid && tempToken) {
                                    const url = `http://5.9.25.78:8010/?IntegrationCode=mlh&AffiliateCustomerUID=${uid}&TempToken=${tempToken}`;
                                    window.open(url, "_blank");
                                  }
                                } else {
                                  const sanitizedOperatorType =
                                    operatorType === "GH 5/90"
                                      ? operatorType.replace(/\s|\/+/g, "_")
                                      : operatorType;

                                  navigate(
                                    `/play-game/${sanitizedOperatorType}`
                                  );
                                }
                              }}
                            >
                              <a className="btn btn-blue btn-sm btn-block w-100 p-2">
                                Play Now
                              </a>
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="service-img"></div>
                            <p>Next Game Display at 12:00am</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          )}

          {/* <div className="col-md-3 col-sm-6 col-xs-12 col-2">
            <div className="service-wrap mb-5">
              <a>
                <div className="service-img">
                  <img
                    src="/images/golden_chance.png"
                    alt=""
                    className="img-fluid mb-3"
                  />
                </div>
              </a>
              <div className="service-content text-center">
                <p>
                  <strong>NEXT GAME:</strong>
                  <br />
                  {latestGame
                    ? latestGame.name
                    : " Next Game Display at 12:00am"}
                  <br />
                  <br />

                  <span>
                    <small>
                      <span>
                        {timeRemaining !== null ? (
                          <Countdown
                            date={moment().add(timeRemaining).toDate()}
                            renderer={({ days, hours, minutes, seconds }) => (
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
                        ) : (
                          ""
                        )}
                      </span>
                    </small>
                  </span>
                </p>
                <p>
                  <a
                    href="https://goldenchancelotto.com/?RefferalCode=0q6ua5wm"
                    className="btn btn-blue btn-sm btn-block w-100 p-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Play Now
                  </a>
                </p>
              </div>
            </div>
          </div> */}

          <section className="container mt-5 mb-5">
            <span className="hidden-sm hidden-xs">
              <div className="title_div">
                Africa`s Number #1 Lotto Community
              </div>
            </span>
          </section>

          <section className="app__works">
            <h1 className="text-center">How MyLottoHub Works</h1>
            <p className="text-center mb-5">
              Here is a summary of how playing lottery works on mylottohub.
            </p>
          </section>

          <section className="container app__how-play">
            <div className="row text-center mt-5 mb-5">
              <div className="col-md-4">
                <p>
                  <img
                    src="images/w1.png"
                    className="img-responsive"
                    width="135"
                  />
                </p>
                <br />
                <p>
                  <p>
                    <strong>Sign Up/ play with any Operator</strong>
                    <br />
                    <br />
                    <p
                      style={{ textAlign: "center", lineHeight: "25px" }}
                      className="mt-2"
                    >
                      {" "}
                      Register and join mylottohub to enjoy, play over 300 games
                      across multiple operators from one single account. It is
                      fast and seamless.
                    </p>
                  </p>
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <img
                    src="images/w2.png"
                    className="img-responsive"
                    width="135"
                  />
                </p>
                <br />
                <p>
                  <small>
                    <strong>Your Winnings in one wallet</strong>
                    <br />
                    <br />
                    <p style={{ textAlign: "center", lineHeight: "25px" }}>
                      {" "}
                      Play any lotto operator games on mylottohub and get all
                      your winnings paid into one account. Transfer winnings to
                      your bank account and get paid instantly.
                    </p>
                  </small>
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <img
                    src="images/w3.png"
                    className="img-responsive"
                    width="135"
                  />
                </p>
                <br />
                <p>
                  <small>
                    <strong>Withdraw to your account</strong>
                    <br />
                    <br />
                    <p style={{ textAlign: "center", lineHeight: "25px" }}>
                      Cashout your winnings directly to your bank account on
                      request It is fast and instant.
                    </p>
                  </small>
                </p>
              </div>
            </div>
          </section>

          <section className="container app__accurate">
            <div className="meg_parallax mb-5">
              <div className="row">
                <div
                  className="col-md-5"
                  style={{ paddingBottom: "0px!important" }}
                >
                  <img
                    src="images/meg_parallax.png"
                    className="img-responsive img-fluid"
                    width="581"
                  />
                </div>
                <div
                  className="col-md-7"
                  style={{ paddingTop: "50px", paddingBottom: "50px" }}
                >
                  <h2
                    className="fw-bolder text-uppercase mb-4"
                    style={{ color: "#0B3E53" }}
                  >
                    Complete and Accurate Data
                  </h2>
                  <p style={{ fontSize: "22px", lineHeight: "35px" }}>
                    MYLOTTOHUB is a web based platform, designed to gradually
                    help transit lottery into the digital age through its mobile
                    and desktop based site. It was developed to help drive the
                    Nigerian lottery industry by archiving all past and present
                    lottery information from all registered and licensed
                    operators, while also helping users predict and forecast
                    next possible occurrences with our built in AI predictive
                    algorithm, all from the comfort of their mobile devices.
                  </p>
                  <br />
                  {userInfo && userInfo.token ? (
                    ""
                  ) : (
                    <a
                      onClick={() => navigate("/register")}
                      className="btn btn-yellow fw-bolder"
                    >
                      Register
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="app__mobile-sm" style={{ marginBottom: "70px" }}>
          <div className="container">
            {!userInfo || !userInfo.data ? (
              <div className="d-flex mt-5">
                <div className="col-xs-6 w-50">
                  <a
                    onClick={() => navigate("/register")}
                    className="btn btn-trans2 btn-block btn-lg"
                  >
                    Register
                  </a>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="col-xs-6  w-50">
                  <a
                    href="https://api.mpin.io/authorize?client_id=v8kfysqoljbgd&response_type=code&scope=openid+email+profile&redirect_uri=https://app.mylottohub.com"
                    // onClick={() => navigate("/login")}
                    className="btn btn-blue btn-block btn-lg"
                  >
                    Login
                  </a>
                </div>
              </div>
            ) : null}

            <br />
            <table width="100%" className="mobile_home_div" cellPadding="15">
              <tbody>
                <tr>
                  <td valign="top" width="60%">
                    <p style={{ color: "#FFF !important" }}>LOTTO GAMES</p>
                    <p>
                      <a
                        className="btn btn-yellow btn-block"
                        onClick={() => navigate("/play-lotto")}
                      >
                        Play Now
                      </a>
                    </p>
                  </td>
                  <td valign="middle" width="40%">
                    <p>
                      <img
                        src="/images/lotto_games_icon.png"
                        className="img-responsive"
                        height="70"
                        width="70"
                      />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <table width="100%" className="mobile_home_div" cellPadding="15">
              <tbody>
                <tr>
                  <td valign="top" width="60%">
                    <p style={{ color: "#FFF !important" }}>SPORTS BETTING</p>
                    <p>
                      <a
                        onClick={() => navigate("/all-forecast")}
                        className="btn btn-yellow btn-block"
                      >
                        Play Now
                      </a>
                    </p>
                  </td>
                  <td valign="middle" width="40%">
                    <p>
                      <img
                        src="images/sports_betting_icon.png"
                        className="img-responsive"
                        height="70"
                        width="70"
                      />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <table width="100%" className="mobile_home_div" cellPadding="15">
              <tbody>
                <tr onClick={() => navigate("/instant")}>
                  <td valign="top" width="60%">
                    <p style={{ color: "#FFF !important" }}>INSTANT GAMES</p>
                    <p>
                      <a className="btn btn-yellow btn-block">Play Now</a>
                    </p>
                  </td>
                  <td valign="middle" width="40%">
                    <p>
                      <img
                        src="/images/instant_games_icon.png"
                        className="img-responsive"
                        height="70"
                        width="90"
                      />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Operator;
