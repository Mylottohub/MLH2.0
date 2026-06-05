import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import { images } from "../constant";
import { useGetInstantGame, useGetProfileUser } from "../react-query";
import { toast } from "react-toastify";

const Instance = () => {
  const navigate = useNavigate();

  // =====================
  // USER DATA
  // =====================
  const { isLoadingInstantGame } = useGetInstantGame();
  const { userProfileTempToken, userProfileResponse } =
    useGetProfileUser([]);

  const userId = userProfileResponse?.id;
  const authToken = userProfileTempToken;

  // =====================
  // UI STATE
  // =====================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameUrl, setGameUrl] = useState("");
  const [loadingIframe, setLoadingIframe] = useState(false);
  const [gameTitle, setGameTitle] = useState("");

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
  // OPEN GAME MODAL
  // =====================
  const openGameModal = (url, title = "Game") => {
    setGameTitle(title);
    setGameUrl(url);
    setLoadingIframe(true);
    setIsModalOpen(true);
  };

  // =====================
  // LUCKYWORLD GAME LAUNCHER
  // =====================
  const launchLuckyWorldGame = (gameKey, playMode) => {
    const gameCode = GAME_CODES[gameKey];

    // ---------------------
    // FUN MODE
    // ---------------------
    if (playMode === "fun") {
      const url = `https://play.luckyworldgames.com/launch/${gameCode}`;

      openGameModal(url, "LuckyWorld Demo");
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

    openGameModal(url, "LuckyWorld Game");
  };



  // =====================
  // CLOSE MODAL
  // =====================
  const closeModal = () => {
    setIsModalOpen(false);
    setGameUrl("");
    setLoadingIframe(false);
    setGameTitle("");
  };

  // =====================
  // GAME CARD COMPONENT
  // =====================
  const GameCard = ({
    image,
    title,
    onPlay,
    onDemo,
    hideDemo = false,
    onCardClick,
  }) => (
    <div className="col-6 col-lg-3 mb-4">
      <div
        role={onCardClick ? "button" : undefined}
        tabIndex={onCardClick ? 0 : undefined}
        onClick={onCardClick}
        onKeyDown={(event) => {
          if (onCardClick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onCardClick();
          }
        }}
        style={{
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          paddingBottom: "10px",
          cursor: onCardClick ? "pointer" : "default",
        }}
      >
        <img
          src={image}
          alt={title}
          className="img-fluid"
          style={{
            height: "180px",
            width: "100%",
            objectFit: "cover",
          }}
        />

        <div className="px-2 mt-3">
          <h6 className="fw-bold text-center">{title}</h6>

          <div className="d-flex justify-content-between gap-2 mt-3">
            <button
              className="btn btn-primary btn-sm w-100"
              onClick={(event) => {
                event.stopPropagation();
                onPlay();
              }}
            >
              Play Now
            </button>

            {!hideDemo && (
              <button
                className="btn btn-secondary btn-sm w-100"
                onClick={(event) => {
                  event.stopPropagation();
                  onDemo();
                }}
              >
                Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <Slider />

      <div className="container mt-5">
        <h4 className="fw-bold text-uppercase">Other Games</h4>

        <br />

        <div className="row">
          {isLoadingInstantGame ? (
            <div className="text-center py-5">
              <div className="spinner-border text-dark" />
            </div>
          ) : (
            <>
              {/* XCAPE */}
              <GameCard
                title="XCape"
                image={images.xcape}
                onPlay={() =>
                  launchLuckyWorldGame("xcape", "real")
                }
                onDemo={() =>
                  launchLuckyWorldGame("xcape", "fun")
                }
              />

              {/* EAGLE */}
              <GameCard
                title="Eagle"
                image={images.eagle}
                onPlay={() =>
                  launchLuckyWorldGame("eagle", "real")
                }
                onDemo={() =>
                  launchLuckyWorldGame("eagle", "fun")
                }
              />

              {/* LUCKY RISE */}
              <GameCard
                title="Lucky Rise"
                image={images.luckyrise}
                onPlay={() =>
                  launchLuckyWorldGame("luckyRise", "real")
                }
                onDemo={() =>
                  launchLuckyWorldGame("luckyRise", "fun")
                }
              />

              {/* EASYWIN */}
              <GameCard
                title="EasyWin"
                image={images.easywin}
                hideDemo
                onCardClick={() => navigate("/sport-forecast")}
                onPlay={() => navigate("/sport-forecast")}
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
        <>
          {/* BACKDROP */}
          <div
            className="modal-backdrop fade show"
            onClick={closeModal}
          />

          {/* MODAL */}
          <div
            className="modal fade show"
            style={{
              display: "block",
              background: "rgba(0,0,0,0.6)",
            }}
          >
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content border-0">
                {/* HEADER */}
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {gameTitle}
                  </h5>

                  <button
                    className="btn-close"
                    onClick={closeModal}
                  />
                </div>

                {/* BODY */}
                <div
                  className="modal-body position-relative p-0"
                  style={{ height: "100vh" }}
                >
                  {/* LOADER */}
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
                      <div className="text-center">
                        <div className="spinner-border text-dark mb-3" />

                        <p className="mb-0">
                          Loading game...
                        </p>
                      </div>
                    </div>
                  )}

                  {/* IFRAME */}
                  <iframe
                    src={gameUrl}
                    title={gameTitle}
                    className="w-100 h-100 border-0"
                    allowFullScreen
                    onLoad={() => setLoadingIframe(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Instance;
