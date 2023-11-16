import { useNavigate } from "react-router-dom";
import "../assets/css/operator.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";

const Operator = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [operatorData, setOperatorData] = useState({
    wesco: [],
    green_lotto: [],
    lotto_nigeria: [],
    Lottomania: [],
  });

  const operatorTypes = ["wesco", "green_lotto", "lotto_nigeria", "Lottomania"];
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

        // Update the specific operator's data using the operatorType
        setOperatorData((prevData) => ({
          ...prevData,
          [operatorType]: Array.isArray(data.result)
            ? data.result
            : [data.result], // Convert the object to an array if it's not an array
        }));
      } catch (error) {
        console.error(`Error fetching ${operatorType} games:`, error);
      } finally {
        setIsLoading(false);
      }
    });
  }, [userInfo]);

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
          ) : (
            operatorTypes.map((operatorType, index) => {
              const operatorDataArray = operatorData[operatorType];

              if (operatorDataArray && operatorDataArray.length > 0) {
                const imageSrc = `/images/${operatorType}.png`;

                const propertyMapping = {
                  wesco: { name: "drawname", time: "drawtime" },
                  lotto_nigeria: { name: "drawAlias", time: "drawDate" },
                };

                // Extract values if operatorDataArray is an object
                const dataArray = Array.isArray(operatorDataArray)
                  ? operatorDataArray
                  : Object.values(operatorDataArray);

      
                const upcomingGames = dataArray.filter((game) => {
                  let drawTime;
                  const currentTime = new Date();

                  if (operatorType === "lotto_nigeria") {
                    // For "lotto_nigeria," use the "drawDate" field
                    drawTime = game.drawDate
                    ? new Date(
                        game.drawDate.replace(
                          /(\d{2})\/(\d{2})\/(\d{4})/,
                          "$3-$2-$1"
                        )
                      )
                    : null;
                  
                  } else if (operatorType === "wesco") {
                    // For "wesco," combine "drawdate" and "drawtime"
                    const drawDateTimeString = `${game.drawdate} ${game.drawtime}`;

                    drawTime = new Date(
                      drawDateTimeString.replace(
                        /(\d{4})(\d{2})(\d{2}) (\d{2}:\d{2}:\d{2})/,
                        "$1-$2-$3T$4Z"
                      )
                    );
                  } else {
                    // Add additional conditions for other operator types if needed
                  }
                  return drawTime > currentTime;
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

                  // Handle "wesco" and other operator types by parsing the time string
                  const parsedTime = new Date(
                    time.replace(
                      /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}:\d{2})/,
                      "$3-$2-$1T$4Z"
                    )
                  );

                  // Check if parsedTime is a valid date
                  if (!isNaN(parsedTime.getTime())) {
                    return parsedTime;
                  } else {
                    console.error("Invalid date format:", time);
                    return null;
                  }
                };

                return nextGame ? (
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
                        <p>
                          <strong>NEXT GAME:</strong>
                          <br />
                          {nextGame[propertyMapping[operatorType].name]}
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
                                        {days}d 
                                      </span>
                                      <span className="countdown_box me-2">
                                        {hours}h 
                                      </span>
                                      <span className="countdown_box me-2">
                                       {minutes}m 
                                      </span>
                                      <span className="countdown_box me-2">
                                        {seconds}s
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
                            navigate("/play-game");
                          }}
                        >
                          <a className="btn btn-blue btn-sm btn-block w-100">
                            Play Now
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null;
              } else {
                return null;
              }
            })
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
            <div className="row text-center mt-5">
              <div className="col-md-4">
                <p>
                  <img
                    src="https://www.mylottohub.com/images/w1.png"
                    className="img-responsive"
                    width="135"
                  />
                </p>
                <br />
                <p>
                  <small>
                    <strong>Sign Up/ play with any Operator</strong>
                    <br />
                    <br />
                    Pay once and it’s yours forever. Use it to build as many
                    sites as you need; long form, presentations, splash sites,
                    and more.
                  </small>
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <img
                    src="https://www.mylottohub.com/images/w2.png"
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
                    Pay once and it’s yours forever. Use it to build as many
                    sites as you need; long form, presentations, splash sites,
                    and more.
                  </small>
                </p>
              </div>
              <div className="col-md-4">
                <p>
                  <img
                    src="https://www.mylottohub.com/images/w3.png"
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
                    Pay once and it’s yours forever. Use it to build as many
                    sites as you need; long form, presentations, splash sites,
                    and more.
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
                    src="https://www.mylottohub.com/images/meg_parallax.png"
                    className="img-responsive img-fluid"
                    width="581"
                  />
                </div>
                <div
                  className="col-md-7"
                  style={{ paddingTop: "50px", paddingBottom: "50px" }}
                >
                  <h2 style={{ color: "#0B3E53" }}>
                    <strong>Complete and Accurate Data</strong>
                  </h2>
                  <p>
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
                    <a className="btn btn-yellow fw-bolder">Register</a>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="app__mobile-sm mb-5">
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
                    onClick={() => navigate("/login")}
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
                        // href="https://www.mylottohub.com/play/plotto"
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
                        src="https://www.mylottohub.com/images/lotto_games_icon.png"
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
                        // href="https://www.mylottohub.com/welcome/home_sport"
                        className="btn btn-yellow btn-block"
                      >
                        Play Now
                      </a>
                    </p>
                  </td>
                  <td valign="middle" width="40%">
                    <p>
                      <img
                        src="https://www.mylottohub.com/images/sports_betting_icon.png"
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
                    <p style={{ color: "#FFF !important" }}>INSTANT GAMES</p>
                    <p>
                      <a
                        // href="https://www.mylottohub.com/welcome/home_instant"
                        className="btn btn-yellow btn-block"
                      >
                        Play Now
                      </a>
                    </p>
                  </td>
                  <td valign="middle" width="40%">
                    <p>
                      <img
                        src="https://www.mylottohub.com/images/instant_games_icon.png"
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
