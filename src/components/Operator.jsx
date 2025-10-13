import { useNavigate } from "react-router-dom";
import "../assets/css/operator.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import moment from "moment";
import { HTTP } from "../utils";
import { useGetProfileUser } from "../react-query";
import { toast } from "react-toastify";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Cache display-operators logos for this session to avoid re-fetching on navigation
let OPERATOR_LOGOS_CACHE = null;

const Operator = () => {
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
    const fetchOperatorLogos = async () => {
      try {
        if (OPERATOR_LOGOS_CACHE) {
          setOperatorLogos(OPERATOR_LOGOS_CACHE);
          return;
        }
        const response = await HTTP.get("/display-operators");
        const data = response.data.data;
        const logos = {};
        data.forEach((operator) => {
          logos[operator.name.replace(" ", "_").toLowerCase()] = operator.logo;
        });
        OPERATOR_LOGOS_CACHE = logos;
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
    "GD570",
    "GD580",
    "GD590",
  ];

  const requestTypeMapping = {
    GD570: "gd_lotto",
    GD580: "gd_lotto",
    GD590: "gd_lotto",
  };

  useEffect(() => {
    operatorTypes.forEach(async (operatorType) => {
      const requestData = {
        operator_type: requestTypeMapping[operatorType] || operatorType,
      };

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

  const now = new Date();

  const latestGame590 = Array.isArray(operatorData?.gd_lotto)
    ? operatorData?.gd_lotto
        .filter(
          (game) => game?.gameType === "5/90" && new Date(game?.drawTime) > now
        )
        .sort((a, b) => new Date(a.drawTime) - new Date(b.drawTime))[0]
    : null;

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
    GD570: "GD570",
    GD580: "GD580",
    GD590: "GD590",
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

  // Function to handle modal open
  const handleOpenModal = (url) => {
    setIframeUrl(url);
    setIsIframeLoading(true);
    setShowModal(true);
  };

  // Function to handle iframe load
  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  // Animated Countdown wrapper
  const MotionCountdown = ({ date }) => (
    <Countdown
      date={date}
      renderer={({ days, hours, minutes, seconds }) => (
        <motion.div
          initial={false}
          animate={{
            backgroundColor: seconds === 0 ? ["#ffffff", "#fff9e6", "#ffffff"] : "#ffffff",
          }}
          transition={{ duration: 0.45 }}
        >
          <motion.span
            key={`d-${days}`}
            className="countdown_box me-2  fw-bolder"
            initial={{ scale: 0.96, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {days} days
          </motion.span>
          <motion.span
            key={`h-${hours}`}
            className="countdown_box me-2  fw-bolder"
            initial={{ scale: 0.96, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {hours} hrs
          </motion.span>
          <motion.span
            key={`m-${minutes}`}
            className="countdown_box me-2  fw-bolder"
            initial={{ scale: 0.96, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {minutes} mins
          </motion.span>
          <motion.span
            key={`s-${seconds}`}
            className="countdown_box me-2  fw-bolder"
            initial={{ scale: 0.9, opacity: 0.9 }}
            animate={{ scale: [1, 1.08, 1], opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {seconds} secs
          </motion.span>
        </motion.div>
      )}
    />
  );

  return (
    <>
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
      {showModal && <div className="modal-backdrop fade show"></div>}
      <div className="container">
        <div className="row app__select_operator">
          <div className="col-sm-12 mb-5">
            <h1 className="fw-bolder text-dark">Select Operator</h1>
          </div>

          {isLoading ? (
            <div className="row">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="col-md-3 col-sm-6 col-xs-12 col-2">
                  <div className="service-wrap mb-5 card-soft shimmer">
                    <div className="service-img">
                      <div className="skeleton-logo"></div>
                    </div>
                    <div className="service-conten text-center p-3">
                      <div className="skeleton-line"></div>
                      <div className="skeleton-line" style={{ width: "60%", margin: "10px auto 0" }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : operatorTypes.length === 0 ? (
            <tr>
              <td colSpan="8" className="flex justify-center text-center p-5">
                Next Game Display at 12:00am
              </td>
            </tr>
          ) : (
            <LayoutGroup>
              <AnimatePresence initial={false}>
                {operatorTypes.map((operatorType, index) => {
                  const operatorDataArray = operatorData[operatorType];
                  if (operatorType === "gd_lotto") {
                    return null;
                  }

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
                      GD570: {
                        name: latestGame590?.gameName,
                        time: latestGame590?.drawTime,
                      },
                      GD580: {
                        name: latestGame590?.gameName,
                        time: latestGame590?.drawTime,
                      },
                      GD590: {
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
                      } else if (operatorType === "GD570") {
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
                      } else if (operatorType === "GD580") {
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
                      } else if (operatorType === "GD590") {
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
                      return drawTime && drawTime.isAfter(currentTime);
                    });
                    upcomingGames?.sort(
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
                      } else if (operatorType === "GD570") {
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
                      } else if (operatorType === "GD580") {
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
                      } else if (operatorType === "GD590") {
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
                      <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="col-md-3 col-sm-6 col-xs-12 col-2"
                      >
                        <motion.div
                          className="service-wrap mb-5"
                          whileHover={{ y: -6, boxShadow: "0 14px 34px rgba(0,0,0,0.12)" }}
                          transition={{ type: "spring", stiffness: 260, damping: 24 }}
                        >
                          <a>
                            <motion.div
                              className="service-img"
                              initial={{ opacity: 0, scale: 0.96, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ type: "spring", stiffness: 260, damping: 24, delay: (index % 8) * 0.06 }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <motion.img
                                src={imageSrc}
                                alt=""
                                className="img-fluid mb-3"
                                initial={false}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              />
                            </motion.div>
                          </a>
                          <div className="service-conten text-center">
                            {nextGame ? (
                              <>
                                <p
                                  style={{
                                    color: "#000",
                                    fontWeight: "bolder",
                                    fontSize: "18px",
                                  }}
                                >
                                  <strong>NEXT GAME:</strong>
                                  <br />
                                  {operatorType === "GD570" ||
                                  operatorType === "GD580" ||
                                  operatorType === "GD590" ||
                                  operatorType === "gd_jackpot"
                                    ? latestGame590?.gameName
                                    : nextGame[propertyMapping[operatorType]?.name]}
                                  <br />
                                  <br />
                                  <span>
                                    <small>
                                      <span>
                                        <MotionCountdown
                                          date={
                                            new Date(
                                              renderGameTime(operatorType, nextGame)
                                            )
                                          }
                                        />
                                      </span>
                                    </small>
                                  </span>
                                </p>
                                <p
                                  onClick={() => {
                                    if (operatorType === "GD570") {
                                      navigate(`/play-game/gd_70`);
                                    } else if (operatorType === "GD580") {
                                      navigate(`/play-game/gd_80`);
                                    } else if (operatorType === "GD590") {
                                      navigate(`/play-game/gd_90`);
                                    } else if (operatorType === "golden_chance") {
                                      const uid = userProfileResponse?.id;

                                      if (uid && userProfileTempToken) {
                                        const url = `https://goldenchancelotto.com/lotto-iframe/play-now?IntegrationCode=mlh&AffiliateCustomerUID=${uid}&TempToken=${userProfileTempToken}`;
                                        handleOpenModal(url);
                                      } else {
                                        toast.error("Pls Login to proceed");
                                      }
                                    } else {
                                      const sanitizedOperatorType =
                                        operatorType === "GH 5/90"
                                          ? operatorType.replace(/\s|\/+|\//g, "_")
                                          : operatorType;

                                      navigate(
                                        `/play-game/${sanitizedOperatorType}`
                                      );
                                    }
                                  }}
                                >
                                  <motion.a
                                    className="btn btn-blue btn-sm btn-block w-100 p-2"
                                    whileHover={{ scale: [1, 1.05, 1], y: [-1, 0], transition: { duration: 0.6, repeat: Infinity, repeatType: "mirror" } }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    Play Now
                                  </motion.a>
                                </p>
                              </>
                            ) : (
                              <>
                                <div className="service-img shimmer"></div>
                                <p className="loading-pulse">Next Game Display at 12:00am</p>
                              </>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  } else {
                    return null;
                  }
                })}
              </AnimatePresence>
            </LayoutGroup>
          )}

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
