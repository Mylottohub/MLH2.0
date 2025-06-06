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
import { useGetProfileUser } from "../../react-query";
import { toast } from "react-toastify";

const OperatorMobile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [isIframeLoading, setIsIframeLoading] = useState(false);

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
  const { userProfileTempToken, userProfileResponse, token } =
    useGetProfileUser([]);

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

  const now = new Date();

  const latestGame590 = Array.isArray(operatorData?.gd_lotto)
    ? operatorData.gd_lotto
        .filter(
          (game) => game?.gameType === "5/90" && new Date(game?.drawTime) > now
        )
        .sort((a, b) => new Date(a?.drawTime) - new Date(b?.drawTime))[0]
    : null;

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
  const handleCloseModal = async () => {
    setShowModal(false);
    setIframeUrl("");
    setIsIframeLoading(false);

    try {
      const payload = {
        user_id: userProfileResponse?.id,
      };

      await HTTP.post("/update_temp_token", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // console.error(
      //   "Error updating temp token:",
      //   error.response?.data || error.message
      // );
    }
  };

  const handleOpenModal = (url) => {
    setIframeUrl(url);
    setIsIframeLoading(true);
    setShowModal(true);
  };

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  return (
    <div>
      {/* Modal for Golden Chance Iframe */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Golden Chance Lotto</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body position-relative">
              {isIframeLoading && (
                <div className="spinner-overlay">
                  <Spinner
                    animation="border"
                    role="status"
                    className="text-dark"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              <iframe
                src={iframeUrl}
                className="w-100 h-100"
                title="Golden Chance Lotto"
                onLoad={handleIframeLoad}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <section>
        <Navbar />
        <Slider />
      </section>
      <div className="container mb-5">
        <div className="row">
          <div className="col-sm-12 mb-5 mt-5 fw-bolder">
            <h4 className="fw-bolder text-dark">
              Select Operator and Play Game
            </h4>
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
            operatorTypes?.map((operatorType, index) => {
              const operatorDataArray = operatorData[operatorType];

              if (operatorDataArray && operatorDataArray.length > 0) {
                const imageSrc =
                  operatorLogos[operatorNameMapping[operatorType]] ||
                  `/images/${operatorType}.png`;

                const propertyMapping = {
                  golden_chance: { name: "drawname", time: "drawtime" },
                  ghana_game: { name: "gn", time: "sdt" },
                  wesco: { name: "drawname", time: "drawtime" },
                  green_lotto: { name: "drawname", time: "drawtime" },
                  green_ghana_game: { name: "drawname", time: "drawtime" },
                  lottomania: { name: "gn", time: "sdt" },
                  lotto_nigeria: { name: "drawAlias", time: "drawDate" },
                  "GH 5/90": { name: "gameName", time: "drawTime" },
                  gd_lotto: {
                    name: latestGame590?.gameName,
                    time: latestGame590?.drawTime,
                  },
                  gd_jackpot: {
                    name: latestGame590?.gameName,
                    time: latestGame590?.drawTime,
                  },
                  NNP: { name: "gameName", time: "drawTime" },
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
                    const drawDate = game?.drawdate;
                    const drawTimeString = game?.drawtime;
                    if (drawDate && drawTimeString) {
                      drawTime = moment(
                        `${drawDate} ${drawTimeString}`,
                        "YYYYMMDD HH:mm:ss"
                      );
                    } else {
                      drawTime = null;
                    }
                  }

                  return drawTime && drawTime?.isAfter(currentTime);
                });

                upcomingGames.sort(
                  (a, b) =>
                    new Date(a[propertyMapping[operatorType]?.time]) -
                    new Date(b[propertyMapping[operatorType]?.time])
                );

                // Take only the first game (next scheduled game)
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
                                    <tbody
                                      style={{
                                        color: "#000",
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      <tr valign="top">
                                        <td
                                          style={{
                                            lineHeight: "27px!important",
                                          }}
                                        >
                                          <small>
                                            <strong>NEXT DRAW</strong>
                                          </small>
                                          <br />
                                          <small
                                            className="fw-bolder"
                                            style={{ fontSize: "18px" }}
                                          >
                                            {" "}
                                            {operatorType === "gd_lotto" ||
                                            operatorType === "gd_jackpot"
                                              ? latestGame590?.gameName
                                              : nextGame[
                                                  propertyMapping[operatorType]
                                                    ?.name
                                                ]}
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
                                                    <span className="countdown fw-bolder">
                                                      {days}days
                                                    </span>{" "}
                                                    <span className="countdown_box  fw-bolder">
                                                      {hours}hrs
                                                    </span>{" "}
                                                    <span className="countdown_box  fw-bolder">
                                                      {minutes}mins
                                                    </span>{" "}
                                                    <br />
                                                    <span
                                                      style={{ width: "38%" }}
                                                    >
                                                      <p
                                                        className="countdown_box mt-3  fw-bolder"
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

                                          <p
                                            onClick={() => {
                                              if (operatorType === "gd_lotto") {
                                                navigate(`/gd-lotto`);
                                              } else if (
                                                operatorType === "gd_jackpot"
                                              ) {
                                                navigate(
                                                  `/play-game/gd_jackpot`
                                                );
                                              } else if (
                                                operatorType === "golden_chance"
                                              ) {
                                                const uid =
                                                  userProfileResponse?.id;

                                                if (
                                                  uid &&
                                                  userProfileTempToken
                                                ) {
                                                  const url = `https://goldenchancelotto.com/lotto-iframe/play-now?IntegrationCode=mlh&AffiliateCustomerUID=${uid}&TempToken=${userProfileTempToken}`;
                                                  handleOpenModal(url);
                                                } else {
                                                  toast.error(
                                                    "Pls Login to proceed"
                                                  );
                                                }
                                              } else {
                                                const sanitizedOperatorType =
                                                  operatorType === "GH 5/90"
                                                    ? operatorType.replace(
                                                        /\s|\/+/g,
                                                        "_"
                                                      )
                                                    : operatorType;

                                                navigate(
                                                  `/play-game/${sanitizedOperatorType}`
                                                );
                                              }
                                            }}
                                          >
                                            <a className="btn btn-blue btn-sm btn-block w-100">
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
                                      <div
                                        className="service-img"
                                        style={{ textAlign: "center" }}
                                      ></div>
                                      <p
                                        style={{
                                          fontWeight: "bold",
                                          textAlign: "center",
                                        }}
                                      >
                                        Next Game Display at 12:00am
                                      </p>
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
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default OperatorMobile;
