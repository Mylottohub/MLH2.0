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
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "180px",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8f9fa",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="px-2 mt-3" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h6 className="fw-bold text-center">{title}</h6>

          <div className="d-flex justify-content-between gap-2 mt-3" style={{ marginTop: "auto" }}>
            <button
              className="btn btn-primary btn-sm game-btn play-now-btn"
              onClick={(event) => {
                event.stopPropagation();
                onPlay();
              }}
            >
              Play Now
            </button>

            {!hideDemo && (
              <button
                className="btn btn-secondary btn-sm game-btn demo-btn"
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
          <button
          type="button"
          className="btn btn-outline-secondary btn-sm mt-3 mb-3"
          onClick={() => navigate(-1)}
          style={{ fontSize: '14px' }}
        >
          ← Back
        </button>
        <h4 className="fw-bold text-uppercase">Classic Games</h4>

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

      {/* Button styles */}
      <style>
        {`
          /* Mobile first - small buttons on mobile */
          .game-btn {
            font-size: 16px !important;
            padding: 4px 6px !important;
            min-height: 28px;
            border-radius: 4px !important;
          }

          .play-now-btn {
            background: #406777 !important;
            border-color: #406777 !important;
            color: white !important;
          }

          .demo-btn {
            background: #28a745 !important;
            border-color: #28a745 !important;
            color: white !important;
          }

          /* Tablet screens (768px - 991px) */
          @media (min-width: 768px) {
            .game-btn {
              font-size: 13px !important;
              padding: 6px 10px !important;
              min-height: 36px;
            }
          }

          /* Desktop screens (992px - 1199px) */
          @media (min-width: 992px) {
            .game-btn {
              font-size: 15px !important;
              padding: 8px 12px !important;
              min-height: 44px;
            }
          }

          /* Large desktop screens (1200px+) */
          @media (min-width: 1200px) {
            .game-btn {
              font-size: 16px !important;
              padding: 10px 14px !important;
              min-height: 48px;
            }
          }

          /* Extra large desktop screens (1400px+) */
          @media (min-width: 1400px) {
            .game-btn {
              font-size: 18px !important;
              padding: 12px 16px !important;
              min-height: 52px;
            }
          }

          /* Button hover effects */
          .play-now-btn:hover {
            background: #406777 !important;
            border-color: #406777 !important;
          }

          .demo-btn:hover {
            background: #28a745 !important;
            border-color: #28a745 !important;
          }

          /* Improved card image container */
          .game-card-image {
            height: 180px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
            padding: 10px;
          }

          .game-card-image img {
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
          }

          /* Ensure cards are equal height */
          .game-card-wrapper {
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          /* Mobile - make buttons stack vertically on very small screens */
          @media (max-width: 350px) {
            .d-flex.gap-2 {
              flex-direction: column;
            }
            .game-btn {
              width: 100% !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Instance; 