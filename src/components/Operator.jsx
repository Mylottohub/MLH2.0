import { useNavigate } from 'react-router-dom'
import operatorData from "../constant/data/data";
import "../assets/css/operator.css";
const Operator = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="row app__select_operator">
          <div className="col-sm-12 mb-5">
            <h1>Select Operator</h1>
          </div>

          {operatorData.map((operator) => {
            return (
              <div
                key={operator.id}
                className="col-md-3 col-sm-6 col-xs-12 col-2"
              >
                <div className="service-wrap mb-5">
                  <a>
                    <div className="service-img">
                      <img
                        src={operator.image}
                        alt=""
                        className="img-fluid mb-3"
                      />
                    </div>
                  </a>
                  <div className="service-content text-center" onClick={() => {
                    navigate('/play-game')
                  }}>
                    <p>
                      <strong>NEXT GAME:</strong>
                      <br />
                      {operator.game_name}
                      <br />{" "}
                      <span data-countdown="2023/08/29 09:30:00">
                        <small>
                          <span className="countdown_box">00 days</span>{" "}
                          <span className="countdown_box">01 hrs</span>{" "}
                          <span className="countdown_box">06 mins</span>{" "}
                          <span className="countdown_box">53 secs</span>
                        </small>
                      </span>
                    </p>

                    <p>
                      <a
                        // href="https://www.mylottohub.com/welcome/play_action/27"
                        className="btn btn-blue btn-sm btn-block w-100"
                      >
                        Play Now
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

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
                  <a className="btn btn-yellow fw-bolder">Register</a>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div className="app__mobile-sm mb-5">
          <div className="container">
            <div className="d-flex mt-5">
              <div className="col-xs-6 w-50">
                <a
                   onClick={() => navigate("/register")}
                  className="btn btn-trans2 btn-block btn-lg"
                >
                  Register
                </a>
              </div>
              &nbsp;&nbsp;&nbsp;<div className="col-xs-6  w-50">
                <a
                   onClick={() => navigate("/login")}
                  className="btn btn-blue btn-block btn-lg"
                >
                  Login
                </a>
              </div>
            </div>
            <br /> 
           <table width="100%" className="mobile_home_div" cellPadding="15">
              <tbody>
                <tr>
                  <td valign="top" width="60%">
                    <p style={{color: '#FFF !important'}}>LOTTO GAMES</p>
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
                    <p style={{color: '#FFF !important'}}>SPORTS BETTING</p>
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
                    <p style={{color: '#FFF !important'}}>INSTANT GAMES</p>
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
