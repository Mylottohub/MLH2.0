import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { images } from "../constant";
import { useGetInstantGame, useGetProfileUser } from "../react-query";
import { toast } from "react-toastify";
import { useState } from "react";

const Instance = () => {
  const { userInstantGame, isLoadingInstantGame } = useGetInstantGame();
  const { userProfileTempToken, userProfileResponse } = useGetProfileUser([]);

  const uid = userProfileResponse?.id;
  const token = userProfileTempToken;

  const [showInfo, setShowInfo] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [iframeLoading, setIframeLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setIframeUrl("");
    setIframeLoading(false);
  };

  // ==================================================
  // 🔥 DYNAMIC LUCKY WORLD CONFIG (CORRECT FORMAT)
  // ==================================================
  const merchantCode = "mylottohub"; // MUST BE LOWERCASE BASED ON YOUR WORKING URL


  const gameCodes = {
    eagle: "eaglemlh",        // lowercase
    lucky_rise: "luckyrisemlh",
    xcape: "xcapemlh",
  };

  // ==================================================
  // 🚀 UNIVERSAL GAME LAUNCHER (DEMO + PROD)
  // ==================================================
  const launchGame = (gameKey, mode) => {
    if (!uid || !token) {
      toast.error("Pls Login to proceed");
      return;
    }

    const currency = "NGN";
    const lang = "en";

    const gameCode = gameCodes[gameKey].toLowerCase(); // format: xcapemlh

    const baseUrl =
      mode === "demo"
        ? "https://demo-play.luckyworldgames.com/launch"
        : "https://play.luckyworldgames.com/launch";

    // MATCH YOUR EXACT WORKING FORMAT
    const finalUrl = `${baseUrl}/${gameCode}?user=${uid}&token=${token}&currency=${currency}&operator=${merchantCode}&lang=${lang}`;

    setIframeUrl(finalUrl);
    setIframeLoading(true);
    setShowModal(true);
  };
  return (
    <div>
      <Navbar />
      <Slider />

      <div className="container mt-5">
        <h4><strong>Instant Games</strong></h4>
        <br />

        <div className="row">
          {isLoadingInstantGame ? (
            <div className="text-center">Loading games...</div>
          ) : (
            <>

              {/* ==================== XCAPE CARD ==================== */}
              <div className="col-6 col-lg-3 mb-4">
                <div
                  style={{
                    backgroundColor: "#FFF",
                    borderRadius: "5px",
                    paddingBottom: "10px",
                    position: "relative",
                  }}
                >
                  {/* info icon */}
                  <span
                    onClick={() => setShowInfo(true)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "10px",
                      fontSize: "20px",
                      cursor: "pointer",
                      color: "#fff",
                      fontWeight: "bold",
                      zIndex: 10,
                    }}
                  >
                    i
                  </span>

                  <img
                    src={images.xcape}
                    alt="XCape"
                    className="img-fluid"
                    style={{
                      borderTopRightRadius: "5px",
                      borderTopLeftRadius: "5px",
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* two buttons */}
                  <div
                    className="d-flex justify-content-between mt-3 px-2"
                    style={{ gap: "10px" }}
                  >
                    <button
                      className="btn btn-blue btn-sm w-50"
                      onClick={() => launchGame("xcape", "prod")}
                    >
                      Play Now
                    </button>

                    <button
                      className="btn btn-secondary btn-sm w-50"
                      onClick={() => launchGame("xcape", "demo")}
                    >
                      Demo
                    </button>
                  </div>
                </div>
              </div>

            </>
          )}
        </div>
      </div>

      <Footer />

      {/* INFO MODAL */}
      {showInfo && (
        <div
          className="xcape-info-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowInfo(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FFF",
              width: "90%",
              maxWidth: "500px",
              borderRadius: "10px",
              padding: "25px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h3>XCape</h3>
            <p>A space-themed crash adventure.</p>

            <h4>How to Play</h4>
            <ul style={{ lineHeight: "1.7" }}>
              <li>Place your bet.</li>
              <li>Watch the spaceship rise.</li>
              <li>Cash out before it vanishes.</li>
            </ul>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => setShowInfo(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FULLSCREEN GAME MODAL */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-fullscreen" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Game</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body position-relative">

                {iframeLoading && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                  >
                    <div className="spinner-border text-dark"></div>
                  </div>
                )}

                <iframe
                  src={iframeUrl}
                  className="w-100 h-100"
                  onLoad={() => setIframeLoading(false)}
                  title="XCape Game"
                ></iframe>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Instance;
