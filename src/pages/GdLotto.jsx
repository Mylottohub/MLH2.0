import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";
import Navbar from "../components/Navbar";
import { HTTP } from "../utils";
import moment from "moment";

import Gd570Image from "/images/GD570.png";
import Gd580Image from "/images/GD580.png";
import Gd590Image from "/images/GD590.png";

export const GdLotto = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [gdLottoGames, setGdLottoGames] = useState({
    "5/70": null,
    "5/80": null,
    "5/90": null,
  });

  const gameTypes = [
    { type: "5/70", image: Gd570Image, game_logo: "gd_70" },
    { type: "5/80", image: Gd580Image, game_logo: "gd_80" },
    { type: "5/90", image: Gd590Image, game_logo: "gd_90" },
  ];

  useEffect(() => {
    const fetchGdLottoGames = async () => {
      setIsLoading(true);
      try {
        const gameData = { "5/70": null, "5/80": null, "5/90": null };
        const now = moment();

        for (const game of gameTypes) {
          const response = await HTTP.post("/get-games", {
            operator_type: "gd_lotto",
            gd_operator_type: game.type,
          });

          if (response.data && Array.isArray(response.data.result)) {
            const nextGame = response.data.result
              .filter((game) => moment(game.drawTime).isAfter(now))
              .sort((a, b) => moment(a.drawTime) - moment(b.drawTime))[0];

            gameData[game.type] = nextGame || null;
          }
        }

        setGdLottoGames(gameData);
      } catch (error) {
        console.error("Error fetching GD Lotto games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGdLottoGames();
  }, [userInfo]);

  return (
    <div>
      <Navbar />
      <div className="container mt-4" style={{ marginBottom: "100px" }}>
        <h2 className="text-center mb-4">Select GD Lotto Games</h2>

        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="row">
            {gameTypes.map(({ type, image, game_logo }) => {
              const nextGame = gdLottoGames[type];

              return (
                <div key={type} className="col-md-4 text-center mb-4">
                  <div className="d-none d-md-block">
                    <img
                      src={image}
                      alt={`GD Lotto ${type}`}
                      className="img-fluid"
                      style={{ maxWidth: "200px" }}
                    />

                    {nextGame ? (
                      <div className="service-content text-center">
                        <strong>NEXT GAME:</strong>
                        <p className="card-text">
                          <p>{nextGame.gameName}</p>
                        </p>
                        <Countdown
                          date={new Date(nextGame.drawTime)}
                          renderer={({ days, hours, minutes, seconds }) => (
                            <p className="countdown-timer fw-bold">
                              <span className="countdown_box me-2">
                                {days} days
                              </span>
                              <span className="countdown_box me-2">
                                {hours} hrs
                              </span>
                              <span className="countdown_box me-2">
                                {minutes} mins
                              </span>
                              <span className="countdown_box">
                                {seconds} secs
                              </span>
                            </p>
                          )}
                        />
                        <p onClick={() => navigate(`/play-game/${game_logo}`)}>
                          <a className="btn btn-blue btn-sm btn-block w-100 p-2">
                            Play Now
                          </a>
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <p className="mt-2 text-muted">
                          No games available for GD Lotto {type}.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mobile View */}
                  <div className="d-block d-md-none div_vlgrey">
                    <table width="100%" cellPadding="3">
                      <tbody>
                        <tr valign="top">
                          <td width="41%">
                            <img src={image} className="img-fluid" />
                          </td>
                          <td style={{ lineHeight: "19px!important" }}>
                            {nextGame ? (
                              <>
                                <table width="100%" cellPadding="3">
                                  <tbody>
                                    <tr valign="top">
                                      <td
                                        style={{ lineHeight: "19px!important" }}
                                      >
                                        <small>
                                          <strong>NEXT DRAW</strong>
                                        </small>
                                        <br />
                                        <small>{nextGame.gameName}</small>
                                        <br />
                                        <br />

                                        <small>
                                          <span>
                                            <Countdown
                                              date={new Date(nextGame.drawTime)}
                                              renderer={({
                                                days,
                                                hours,
                                                minutes,
                                                seconds,
                                              }) => (
                                                <div className="mb-2 text-center">
                                                  <span className="countdown_box">
                                                    {days} days
                                                  </span>{" "}
                                                  <span className="countdown_box">
                                                    {hours} hrs
                                                  </span>{" "}
                                                  <span className="countdown_box">
                                                    {minutes} mins
                                                  </span>{" "}
                                                  <span className="countdown_box">
                                                    {seconds} secs
                                                  </span>
                                                </div>
                                              )}
                                            />
                                          </span>
                                        </small>

                                        <p>
                                          <a
                                            onClick={() =>
                                              navigate(
                                                `/play-game/${game_logo}`
                                              )
                                            }
                                            className="btn btn-blue btn-sm btn-block mt-3"
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
                                {type === "gd_lotto" ? (
                                  <a
                                    onClick={() => navigate(`/gd-lotto`)}
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
            })}
          </div>
        )}
      </div>
    </div>
  );
};
