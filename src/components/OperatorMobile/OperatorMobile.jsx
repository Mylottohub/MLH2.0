import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../assets/css/operator.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import moment from "moment";

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
  });

  const operatorTypes = [
    "ghana_game",
    "wesco",
    "green_lotto",
    "lottomania",
    "lotto_nigeria",
  ];
  useEffect(() => {
    operatorTypes.forEach(async (operatorType) => {
      const requestData = { operator_type: operatorType };
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://sandbox.mylottohub.com/v1/get-games",
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

  return (
    <div>
      <section>
        <Navbar />
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
                const imageSrc = `/images/${operatorType}.png`;

                const propertyMapping = {
                  ghana_game: { name: "gn", time: "sdt" },
                  wesco: { name: "drawname", time: "drawtime" },
                  green_lotto: { name: "drawname", time: "drawtime" },
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
                    drawTime = game.drawDate
                      ? moment(game.drawDate, "DD/MM/YYYY HH:mm")
                      : null;
                  } else if (operatorType === "wesco") {
                    const drawDateTimeString = `${game.drawdate} ${game.drawtime}`;
                    drawTime = moment(drawDateTimeString, "YYYYMMDD HH:mm:ss");
                  } else if (operatorType === "lottomania") {
                    drawTime = moment(game.sdt);
                  } else if (operatorType === "ghana_game") {
                    drawTime = moment(game?.sdt);
                  } else if (operatorType === "green_lotto") {
                    const drawDateTimeString = `${game?.drawdate}${game?.drawtime}`;
                    drawTime = moment(drawDateTimeString, "YYYYMMDD HH:mm:ss");
                  }

                  return drawTime && drawTime.isAfter(currentTime);
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
                    const drawDateTimeString = `${game.drawdate} ${game.drawtime}`;
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
                    const drawDateTimeString = `${game.drawdate} ${game.drawtime}`;
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
                return nextGame ? (
                  <div key={index}>
                    <div className="hidden-md hidden-lg div_vlgrey">
                      <table width="100%" cellPadding="3">
                        <tbody>
                          <tr valign="top">
                            <td width="41%">
                              <img src={imageSrc} className="img-fluid" />
                            </td>
                            <td style={{ lineHeight: "19px!important;" }}>
                              <small>
                                <strong>NEXT DRAW</strong>
                              </small>
                              <br />
                              <small>
                                {" "}
                                {nextGame[propertyMapping[operatorType].name]}
                              </small>
                              <br />
                              <br />

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
                                  onClick={() => {
                                    navigate(`/play-game/${operatorType}`);
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
                    </div>
                  </div>
                ) : null;
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
