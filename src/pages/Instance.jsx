import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import { images } from "../constant";
import { useGetInstantGame, useGetProfileUser } from "../react-query";
import { toast } from "react-toastify";

const Instance = () => {
  // =====================
  // USER DATA
  // =====================
  const { isLoadingInstantGame } = useGetInstantGame();
  const { userProfileTempToken, userProfileResponse } = useGetProfileUser([]);

  const userId = userProfileResponse?.id;
  const authToken = userProfileTempToken;

  // =====================
  // UI STATE
  // =====================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameUrl, setGameUrl] = useState("");
  const [loadingIframe, setLoadingIframe] = useState(false);

  // =====================
  // LUCKYWORLD CONFIG
  // =====================
  const OPERATOR_CODE = "MYLOTTOHUB";
  const CURRENCY = "NGN";

  const GAME_CODES = {
    eagle: "EAGLEMLH",
    luckyRise: "LUCKYRISEMLH",
    xcape: "XCAPEMLH",
  };

  // =====================
  // GAME LAUNCHER
  // =====================
  const launchGame = (gameKey, playMode) => {
    const gameCode = GAME_CODES[gameKey];

    // ---------------------
    // FOR FUN (NO MONEY)
    // ---------------------
    if (playMode === "fun") {
      const url = `https://play.luckyworldgames.com/launch/${gameCode}`;
      setGameUrl(url);
      setLoadingIframe(true);
      setIsModalOpen(true);
      return;
    }

    // ---------------------
    // REAL MONEY
    // ---------------------
    if (!userId || !authToken) {
      toast.error("Please login to play with real money");
      return;
    }

    const url =
      `https://play.luckyworldgames.com/launch/${gameCode}` +
      `?user=${userId}` +
      `&token=${authToken}` +
      `&currency=${CURRENCY}` +
      `&operator=${OPERATOR_CODE}`;

    setGameUrl(url);
    setLoadingIframe(true);
    setIsModalOpen(true);
  };

  // =====================
  // CLOSE MODAL
  // =====================
  const closeModal = () => {
    setIsModalOpen(false);
    setGameUrl("");
    setLoadingIframe(false);
  };

  // =====================
  // GAME CARD COMPONENT
  // =====================
  const GameCard = ({ image, title, gameKey }) => (
    <div className="col-6 col-lg-3 mb-4">
      <div
        style={{
          background: "#fff",
          borderRadius: "6px",
          paddingBottom: "10px",
        }}
      >
        <img
          src={image}
          alt={title}
          className="img-fluid"
          style={{ height: "180px", width: "100%", objectFit: "cover" }}
        />

        <div className="d-flex justify-content-between mt-3 px-2 gap-2">
          <button
            className="btn btn-blue btn-sm w-50"
            onClick={() => launchGame(gameKey, "real")}
          >
            Play Now
          </button>

          <button
            className="btn btn-secondary btn-sm w-50"
            onClick={() => launchGame(gameKey, "fun")}
          >
            Demo
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <Slider />

      <div className="container mt-5">
        <h4 className="fw-bold">Instant Games</h4>
        <br />

        <div className="row">
          {isLoadingInstantGame ? (
            <div className="text-center">Loading games...</div>
          ) : (
            <>
              <GameCard
                title="XCape"
                image={images.xcape}
                gameKey="xcape"
              />
              <GameCard
                title="Eagle"
                image={images.eagle}
                gameKey="eagle"
              />
              <GameCard
                title="Lucky Rise"
                image={images.luckyrise}
                gameKey="luckyRise"
              />
            </>
          )}
        </div>
      </div>

      <Footer />

      {/* =====================
          FULLSCREEN MODAL
      ===================== */}
      {isModalOpen && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Game</h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body position-relative">
                {loadingIframe && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                  >
                    <div className="spinner-border text-dark" />
                  </div>
                )}

                <iframe
                  src={gameUrl}
                  className="w-100 h-100"
                  title="LuckyWorld Game"
                  onLoad={() => setLoadingIframe(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Instance;
