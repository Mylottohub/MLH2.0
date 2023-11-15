import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../assets/css/operator.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const OperatorMobile = () => {
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
                  wesco: { name: "drawname", time: "drawtime" },
                  lotto_nigeria: { name: "drawAlias", time: "drawDate" },
                };

                // Extract values if operatorDataArray is an object
                const dataArray = Array.isArray(operatorDataArray)
                  ? operatorDataArray
                  : Object.values(operatorDataArray);

                // ...

                // ...

                const upcomingGames = dataArray.filter((game) => {
                  let drawTime;
                  const currentTime = new Date();

                  if (operatorType === "lotto_nigeria") {
                    // For "lotto_nigeria," use the "drawDate" field
                    drawTime = new Date(
                      game.drawDate.replace(
                        /(\d{2})\/(\d{2})\/(\d{4})/,
                        "$3-$2-$1"
                      )
                    );
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

                return nextGame ? (
                  <div key={index} className="col-md-3 col-sm-6">
                    <div className="service-wrap mb-5">
                      <div className="service-content text-center">
                        <img
                          src={imageSrc}
                          alt=""
                          className="img-fluid mb-3 text-center"
                        />
                        <p
                         
                        >
                          <strong>NEXT GAME:</strong>
                          <br />
                          {nextGame[propertyMapping[operatorType].name]}
                          <br />{" "}
                          <span data-countdown="2023/08/29 09:30:00">
                            <small>
                              {/* <span className="countdown_box">00 days</span>{" "}
                            <span className="countdown_box">01 hrs</span>{" "}
                            <span className="countdown_box">06 mins</span>{" "}
                            <span className="countdown_box">53 secs</span> */}{" "}
                              {operatorType === "wesco"
                                ? nextGame[propertyMapping[operatorType].time]
                                : nextGame[
                                    propertyMapping[operatorType].time
                                  ].split(" ")[1]}
                            </small>
                          </span>
                        </p>

                        <p>
                          <a
                            // href="https://www.mylottohub.com/welcome/play_action/27"
                            className="btn btn-blue btn-sm btn-block w-100"
                            onClick={() => {
                              navigate("/play-game");
                            }}
                          >
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
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default OperatorMobile;
