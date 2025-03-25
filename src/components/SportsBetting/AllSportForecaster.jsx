import { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

  const handlePlayNowClick = (forecaster) => {
    if (forecaster?.name === "Easy win") {
      navigate(`/sport-forecast`);
    } else if (forecaster?.name === "Betano") {
      const isMobile = window.innerWidth <= 768;
      const url = isMobile
        ? "https://www.betano.ng/?pid=incomeaccess_int-55590&af_sub1=a_55590b_2855c_&af_ad_id=18865&btag=a_55590b_2855c_&utm_medium=18865&utm_source=55590&utm_campaign=2855&siteid=55590"
        : "https://www.betano.ng/?pid=incomeaccess_int-55590&af_sub1=a_55590b_2863c_&af_ad_id=18865&btag=a_55590b_2863c_&utm_medium=18865&utm_source=55590&utm_campaign=2863&siteid=55590";
      setModalUrl(url);
      setShowModal(true);
    } else {
      window.open(
        "https://record.betbonanza.com/_z1u5utPivdMLak7-PYDSdWNd7ZgqdRLk/1",
        "_blank"
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalUrl("");
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

      {/* ✅ Fullscreen Modal */}
      {showModal && (
        <div
          className="modal show fade"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
          }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center text-white">
            <h2>You`re about to visit Betano</h2>
            <p className="mb-4">Click the button below to continue.</p>
            <a
              href={modalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light px-4 py-2 mb-3"
              style={{ fontWeight: "bold" }}
            >
              Continue to Betano
            </a>
            <button onClick={closeModal} className="btn btn-outline-light">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllSportForecaster;
