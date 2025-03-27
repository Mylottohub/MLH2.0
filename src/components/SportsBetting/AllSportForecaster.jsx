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
    } else {
      window.open(
        "https://betbonanza.com/register/?btag=AI1913352501_9k_sVBfeu6lJDtEI85Vm32Nd7ZgqdRLk&affcode=AI1913352501&utm_medium=MA_Affiliates&utm_source=AI1913352501",
        "_blank"
      );
    }
  };

  return (
    <>
      <Navbar />
      <Slider />
      <div className="container mt-5 mb-5">
        <h3
          className="mt-5 fw-bold me-3 sport__mobile_select"
          style={{ color: "#40678C" }}
        >
          Select Operator
        </h3>
        <div className="row">
          {isLoadingAllSportForecast ? (
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
            userAllSportForecast?.map((forecaster) => (
              <div className="col-md-3 sport__mobile" key={forecaster.id}>
                <div className="card-body">
                  <img
                    src={forecaster?.logo}
                    style={{ width: "100%", height: "100%" }}
                    alt={forecaster?.name}
                    className="mb-4 img-fluid"
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
      </div>
    </>
  );
};

export default AllSportForecaster;
