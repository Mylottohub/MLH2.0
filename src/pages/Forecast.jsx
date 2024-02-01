import { useState } from "react";
import Navbar from "../components/Navbar";
import useTimeTable from "../react-query/api-hooks/useTimeTable";
import "../assets/css/forecast.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HTTP } from "../utils";

const Forecast = () => {
  const navigate = useNavigate();

  const { operatorTimetable } = useTimeTable();
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [gamesForOperator, setGamesForOperator] = useState([]);
  const [gameName, setGameName] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOperatorChange = (event) => {
    const selectedOperatorValue = event.target.value;
    setSelectedOperator(selectedOperatorValue);
    setSelectedGame("");
    setGameName("");
    setOperatorName(event.target.options[event.target.selectedIndex].text);

    const games = operatorTimetable?.data.filter(
      (entry) => entry.operator.toString() === selectedOperatorValue
    );

    setGamesForOperator(games || []);
  };

  const handleGameChange = (event) => {
    const selectedGameValue = event.target.value;
    setSelectedGame(selectedGameValue);
    setGameName(event.target.options[event.target.selectedIndex].text);
  };

  const handleForecastSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await HTTP.post(
        "/get-forecast",
        {
          game_id: selectedGame,
          operator_id: selectedOperator,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = response.data;
      setForecastData(data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      if (error.response && error.response.status === 400) {
        // Show toast for 400 status code
        toast.error("No forecasts available for this game", {});
      } else {
        toast.error("Error fetching forecast data. Please try again.", {});
      }
    } finally {
      setLoading(false);
    }
  };

  // // Assuming you have forecastData available
  // const randomIncrement = Math.floor(Math.random() * 100) + 1;

  // const updatedWinningCount = 3916 + randomIncrement;
  // const updatedMachineCount = 3299 + randomIncrement;

  return (
    <div>
      <Navbar />

      <div className="container" style={{ marginTop: "70px" }}>
        {forecastData ? (
          <>
            <div className="meg_container">
              <div className="row">
                <div className="col-md-4 d-none d-sm-block">
                  <p align="center">
                    <strong className="fs-4 text-center">Quick Forecast</strong>
                  </p>
                  <br />
                  <div className="div_lgrey">
                    <form onSubmit={handleForecastSubmit}>
                      <select
                        name="operator"
                        className="form-control mb-3 p-2"
                        required
                        onChange={handleOperatorChange}
                        value={selectedOperator}
                      >
                        <option value="">{operatorName}</option>
                        <option value="26">5/90 Games</option>
                        <option value="28">Wesco</option>
                        <option value="43">Green lotto</option>
                        <option value="27">Baba Ijebu</option>
                        <option value="45">Lottomania</option>
                        <option value="57">Set Lotto</option>
                        <option value="42">Golden Chance</option>
                      </select>

                      <div className="form-group mb-4">
                        <select
                          name="game"
                          className="form-control p-2"
                          required
                          id="game_div"
                          onChange={handleGameChange}
                          value={selectedGame}
                        >
                          <option value="">{gameName}</option>
                          {gamesForOperator.map((game) => (
                            <option key={game.id} value={game.game}>
                              {game.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Button
                        type="submit"
                        className="btn btn-blue btn-block w-100"
                        disabled={loading}
                      >
                        {loading ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          " Submit"
                        )}
                      </Button>
                    </form>
                  </div>
                  <br />
                  <div className="div_yellow2 text-center p-3 ">
                    <strong>This Week</strong>
                    <br />
                    SURE BANKER
                    <br />
                    <strong>
                      {" "}
                      {forecastData.data
                        .slice(0, 1)
                        .map((data) => data[`winning_num1`])
                        .join(" - ")}
                      &nbsp; |&nbsp;
                      {forecastData.data
                        .slice(8, 9)
                        .map((data) => data[`machine_num4`])}
                    </strong>
                  </div>
                </div>
                <div className="col-md-8 col-xs-12 col-sm-12">
                  <div className="d-md-none d-lg-block d-lg-none d-xl-block d-xl-none d-xxl-none d-xxl-block">
                    <p align="center">
                      <a
                        onClick={() => {
                          navigate(0);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-backward mt-3"></i> Back
                      </a>
                    </p>
                    <p align="center">
                      <strong>
                        {operatorName} - {gameName}
                      </strong>
                    </p>
                  </div>
                  <p align="center">
                    <strong className="number__drop">
                      Numbers to drop this week
                    </strong>
                  </p>
                  <br />

                  <div
                    style={{
                      textAlign: "center",
                      lineHeight: "1",
                      padding: "20px",
                    }}
                    className="div_yellow2"
                  >
                    <p className="d-sm-block d-none"></p>
                    <p className="d-md-none d-lg-block">
                      <strong className="fs-2">
                        {forecastData.data
                          .slice(0, 5)
                          .map((data, index) => data[`winning_num${index + 1}`])
                          .join(" - ")}
                      </strong>
                    </p>
                  </div>
                  <div className="div_blue" style={{ padding: "20px" }}>
                    <p align="center">Top 10 Frequent Number</p>
                    <br />
                    <table cellPadding="5" align="center">
                      <tbody>
                        <tr>
                          {forecastData.data.slice(0, 5).map((data, index) => (
                            <td key={index}>
                              <div className="numboxtranswhite">
                                {data[`winning_num${index + 1}`]}
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {forecastData.data.slice(5, 10).map((data, index) => (
                            <td key={index}>
                              <div className="numboxtranswhite">
                                {data[`machine_num${index + 1}`]}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br />
                  {/* <div className="div_lgrey">
                    <p align="center">
                      <small>
                        In the history of {operatorName} | {gameName},{" "}
                        <strong>
                          {forecastData.data.numbers.slice(0, 1).join(" - ")}
                        </strong>{" "}
                        has appeared <strong>{updatedWinningCount}</strong>{" "}
                        times as winning number and{" "}
                        <strong>{updatedMachineCount}</strong> times as machine
                        number
                      </small>
                    </p>
                  </div> */}
                  <div className="d-lg-none d-md-none d-xl-none mb-5">
                    <br />
                    <div className="div_yellow2  text-center p-2">
                      <strong>This Week</strong>
                      <br />
                      SURE BANKER
                      <br />{" "}
                      {forecastData.data
                        .slice(0, 1)
                        .map((data) => data[`winning_num1`])
                        .join(" - ")}
                      &nbsp; |&nbsp;
                      {forecastData.data
                        .slice(8, 9)
                        .map((data) => data[`machine_num4`])}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="meg_container mx-auto select__operates table">
            <div className="div_lgrey">
              <form onSubmit={handleForecastSubmit}>
                <select
                  name="operator"
                  className="form-control mb-3 p-2"
                  required
                  onChange={handleOperatorChange}
                  value={selectedOperator}
                >
                  <option value="">Select Operator</option>
                  <option value="26">5/90 Games</option>
                  <option value="28">Wesco</option>
                  <option value="43">Green lotto</option>
                  <option value="27">Baba Ijebu</option>
                  <option value="45">Lottomania</option>
                  <option value="57">Set Lotto</option>
                  <option value="42">Golden Chance</option>
                </select>

                <div className="form-group mb-4">
                  <select
                    name="game"
                    className="form-control p-2"
                    required
                    id="game_div"
                    onChange={handleGameChange}
                    value={selectedGame}
                  >
                    <option value="">Select Game</option>
                    {gamesForOperator.map((game) => (
                      <option key={game.id} value={game.game}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <input
                          type="submit"
                          className="btn btn-blue btn-block w-100"
                          name="submit"
                          value={loading ? "Loading..." : "Submit"}
                          disabled={loading}
                        /> */}
                <Button
                  type="submit"
                  className="btn btn-blue btn-block w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    " Submit"
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Forecast;
