import Navbar from "../Navbar";
import "../../assets/css/table.css";
import { useAllGetSportsForecast } from "../../react-query";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "../Slider";

const AllSportForecaster = () => {
  const navigate = useNavigate();
  const { userAllSportForecast, isLoadingAllSportForecast } =
    useAllGetSportsForecast([]);

  const handlePlayNowClick = (forecaster) => {
    if (forecaster?.name === "Easy win") {
      navigate(`/sport-forecast`);
    } else if (forecaster?.name === "Betano") {
      const url =
        "https://gml-grp.com/C.ashx?btag=a_55590b_3366c_&affid=18865&siteid=55590&adid=3366&c=";
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <Navbar />
      <Slider />
      <div className="container mt-5 mb-5">
        <h3
          className="mt-5 fw-bolder me-3 sport__mobile_select"
          style={{ color: "#000" }}
        >
          Select Operator
        </h3>

        <div className="row d-none d-md-flex">
          {/* Desktop view */}
          {isLoadingAllSportForecast ? (
            <div className="spinner text-dark text-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            userAllSportForecast?.map((forecaster) => (
              <div className="col-md-3 sport__mobile" key={forecaster.id}>
                <div className="card-body">
                  <img
                    src={forecaster?.logo}
                    alt={forecaster?.name}
                    className="mb-4 img-fluid"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <h3
                    className="card-title fw-bold mb-3"
                    style={{ color: "#40678C" }}
                  >
                    {forecaster?.name}
                  </h3>
                  <a
                    href="#"
                    className="btn text-center w-100 text-white mt-3 p-2"
                    style={{ background: "#406777" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlayNowClick(forecaster);
                    }}
                  >
                    Play now
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mobile View */}
        <div className="d-block d-md-none mt-3">
          {isLoadingAllSportForecast ? (
            <div className="spinner text-dark text-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            userAllSportForecast?.map((forecaster) => (
              <div
                key={forecaster.id}
                className="div_vlgrey border rounded p-2 mb-3"
              >
                <table width="100%" cellPadding="3">
                  <tbody>
                    <tr valign="top">
                      <td width="40%">
                        <img
                          src={forecaster?.logo}
                          className="img-fluid"
                          alt={forecaster?.name}
                        />
                      </td>
                      <td style={{ lineHeight: "19px" }}>
                        {/* <small>
                          <strong>NEXT DRAW</strong>
                        </small>
                        <br />
                        <small>
                          {latestGame
                            ? latestGame.name
                            : "Next Game Display at 12:00am"}
                        </small>
                        <br />
                        <br /> */}

                        {/* <small>
                          <Countdown
                            date={moment().add(timeRemaining).toDate()}
                            renderer={({ days, hours, minutes, seconds }) => (
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
                                <p className="countdown_box mt-3">
                                  {seconds}secs
                                </p>
                              </div>
                            )}
                          />
                        </small> */}

                        <p>
                          <a
                            href={forecaster?.link || "#"}
                            className="btn btn-blue btn-sm btn-block mt-5"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePlayNowClick(forecaster);
                            }}
                          >
                            Play Now
                          </a>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AllSportForecaster;
