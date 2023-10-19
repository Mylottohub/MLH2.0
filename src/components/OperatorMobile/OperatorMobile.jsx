import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import operatorData from "../../constant/data/data";
import Footer from "../Footer";
import "../../assets/css/operator.css"

const OperatorMobile = () => {
  const navigate = useNavigate();
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

          {operatorData.map((operator) => {
            return (
              <div key={operator.id} className="col-md-3 col-sm-6">
                <div className="service-wrap mb-5">
                  <a>
                    <div className="service-img mobile__play-games">
                      <img
                        src={operator.image}
                        alt=""
                        className="img-fluid mb-3"
                      />
                    </div>
                  </a>
                  <div
                    className="service-content text-center"
                    onClick={() => {
                      navigate("/play-game");
                    }}
                  >
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
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default OperatorMobile;
