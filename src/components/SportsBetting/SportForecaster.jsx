import React from "react";
import Navbar from "../Navbar";
import "../../assets/css/table.css";
import { useGetSportsForecast } from "../../react-query";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "../Slider";

const SportForecaster = () => {
  const navigate = useNavigate();
  const { userSportForecast, isLoadingSportForecast } = useGetSportsForecast(
    []
  );

  return (
    <React.Fragment>
      <>
        <Navbar />
        <Slider />
        <div className="container mt-5 mb-5">
          <h3
            className="mt-5 fw-bold me-3 sport__mobile_select"
            style={{ color: "#40678C" }}
          >
            Select Forecaster
          </h3>
          <div className="row">
            {isLoadingSportForecast ? (
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
              <>
                {Array.isArray(userSportForecast) &&
                  userSportForecast.map((forecaster) => (
                    <>
                      <div className="col-md-3 sport__mobile">
                        <div className="">
                          <div className="card-body">
                            <img
                              src={forecaster?.logo}
                              style={{ width: "100%", height: "100%" }}
                              alt="punter"
                              className="mb-4 img-fluid"
                            />
                            <h3
                              className="card-title fw-bold mb-3"
                              style={{ color: "#40678C" }}
                            >
                              {forecaster?.name}
                            </h3>
                            <p
                              className="card-text fw-bold"
                              style={{ color: "#40678C" }}
                            >
                              Number of games predicted:{" "}
                              {forecaster?.games_predicted}
                            </p>
                            <p
                              className="card-text mb-3 fw-bold"
                              style={{ color: "#40678C" }}
                            >
                              Number of won games: {forecaster?.win}
                            </p>

                            <a
                              href="#"
                              className="btn text-center w-100 text-white mt-3 p-2"
                              style={{ background: "#406777" }}
                              onClick={() =>
                                navigate(`/betting/${forecaster.id}`)
                              }
                            >
                              View Predictions
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </>
            )}
            {/*  */}
          </div>
        </div>
      </>
    </React.Fragment>
  );
};

export default SportForecaster;
