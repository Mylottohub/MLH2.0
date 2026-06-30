import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { images } from "../constant";
import { useGetInstantGame, useGetProfileUser } from "../react-query";
import { toast } from "react-toastify";

const HEADER_HEIGHT = 52;

const Instance = () => {
  const navigate = useNavigate();

  const { isLoadingInstantGame } = useGetInstantGame();
  const { userProfileTempToken, userProfileResponse } = useGetProfileUser([]);

  const userId = userProfileResponse?.id;
  const authToken = userProfileTempToken;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameUrl, setGameUrl] = useState("");
  const [loadingIframe, setLoadingIframe] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const OPERATOR_CODE = "MYLOTTOHUB";
  const CURRENCY = "NGN";

  const GAME_CODES = {
    eagle: "EAGLEMLH",
    luckyRise: "LUCKYRISEMLH",
    xcape: "XCAPEMLH",
  };

  const openGameModal = (url, title = "Game") => {
    setGameTitle(title);
    setGameUrl(url);
    setLoadingIframe(true);
    setIsModalOpen(true);
  };

  const launchLuckyWorldGame = (gameKey, playMode) => {
    const gameCode = GAME_CODES[gameKey];

    if (playMode === "fun") {
      const url = `https://play.luckyworldgames.com/launch/${gameCode}`;
      openGameModal(url, "LuckyWorld Demo");
      return;
    }

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

  const closeModal = () => {
    setIsModalOpen(false);
    setGameUrl("");
    setLoadingIframe(false);
    setGameTitle("");
  };

  const gamesList = [
    {
      key: "xcape",
      title: "XCape",
      image: images.xcape,
      onPlay: () => launchLuckyWorldGame("xcape", "real"),
      onDemo: () => launchLuckyWorldGame("xcape", "fun"),
    },
    {
      key: "eagle",
      title: "Eagle",
      image: images.eagle,
      onPlay: () => launchLuckyWorldGame("eagle", "real"),
      onDemo: () => launchLuckyWorldGame("eagle", "fun"),
    },
    {
      key: "luckyRise",
      title: "Lucky Rise",
      image: images.luckyrise,
      onPlay: () => launchLuckyWorldGame("luckyRise", "real"),
      onDemo: () => launchLuckyWorldGame("luckyRise", "fun"),
    },
    {
      key: "easywin",
      title: "EasyWin",
      image: images.easywin,
      onPlay: () => navigate("/sport-forecast"),
      onDemo: null,
    },
  ];

  return (
    <div className="bcg-page-wrapper">
      <Navbar />
      <div className="bcg-page-container">
        <button
          type="button"
          className="btn btn-dark text-white btn-sm mt-3 mb-5"
          onClick={() => navigate(-1)}
           style={{marginTop:"-50px!important"}}
        >
          ← Back
        </button>

        {isLoadingInstantGame ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" />
            <p className="mt-3 text-white">Loading games...</p>
          </div>
        ) : (
          <div className="bcg-grid" style={{marginTop:"-20px"}}>
            {gamesList.map((game, index) => (
              <div
                className="bcg-tile"
                key={game.key}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bcg-tile-img">
                  <img src={game.image} alt={game.title} />
                </div>
                <div className={`bcg-hover-overlay ${hoveredIndex === index ? "visible" : ""}`}>
                  <div className="bcg-hover-buttons">
                    <button
                      className="bcg-btn-play"
                      onClick={(e) => { e.stopPropagation(); game.onPlay(); }}
                    >
                      Play Now
                    </button>
                    {game.onDemo && (
                      <button
                        className="bcg-btn-demo"
                        onClick={(e) => { e.stopPropagation(); game.onDemo(); }}
                      >
                        Demo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            background: "#000",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              height: `${HEADER_HEIGHT}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              background: "#406777",
              zIndex: 2,
            }}
          >
            <span style={{ color: "#fff", fontWeight: 600, fontSize: "16px" }}>
              {gameTitle}
            </span>
            <button
              onClick={closeModal}
              aria-label="Close game"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.18)",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>
          <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
            {loadingIframe && (
              <div style={{ position: "absolute", inset: 0, background: "#1a1a1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 3, gap: "12px" }}>
                <div className="spinner-border text-light" style={{ width: "48px", height: "48px", borderWidth: "3px" }} />
                <p style={{ color: "#fff", margin: 0, fontWeight: 600 }}>Loading Game…</p>
              </div>
            )}
            <iframe
              src={gameUrl}
              title={gameTitle}
              allowFullScreen
              allow="autoplay; fullscreen"
              onLoad={() => setLoadingIframe(false)}
              style={{ width: "100%", height: "100%", border: "none", display: "block", background: "#000" }}
            />
          </div>
        </div>
      )}

      <style>{`
        .bcg-page-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #406777 0%, #406777 50%, #406777 100%);
        }
        .bcg-page-wrapper nav {
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
        }
        .bcg-page-container {
          padding: 8px 120px 40px;
          max-width: 100%;
          margin: 0 auto;
          padding-top: 10px;
        }
        .bcg-back-btn {
          font-size: 13px;
          margin-bottom: 8px;
          color: #ccc;
          border-color: #555;
        }
        .bcg-back-btn:hover {
          color: #fff;
          border-color: #999;
        }
        .bcg-page-title {
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
          font-size: 18px;
        }
        .bcg-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
        }
        .bcg-tile {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          background: #1b1b2f;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .bcg-tile:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 24px rgba(0,0,0,0.35);
          z-index: 2;
        }
        .bcg-tile-img {
          width: 100%;
          aspect-ratio: 3 / 3;
          overflow: hidden;
          background: #2a2a40;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bcg-tile-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .bcg-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          opacity: 0;
          transition: opacity 0.2s;
          padding: 10px;
        }
        .bcg-hover-overlay.visible {
          opacity: 1;
        }
        .bcg-hover-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          max-width: 120px;
        }
        .bcg-btn-play {
          background: #406777;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s;
        }
        .bcg-btn-play:hover { background: #2e4f5c; }
        .bcg-btn-demo {
          background: #28a745;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: background 0.2s;
        }
        .bcg-btn-demo:hover { background: #1e7e34; }

        @media (max-width: 480px) {
          .bcg-page-container {
            padding-left: 8px;
            padding-right: 8px;
          }
          .bcg-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
          }
          .bcg-hover-buttons { max-width: 90px; }
          .bcg-btn-play, .bcg-btn-demo { font-size: 10px; padding: 5px 8px; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .bcg-page-container {
            padding-left: 16px;
            padding-right: 16px;
          }
          .bcg-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .bcg-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
          }
        }
        @media (min-width: 1025px) {
          .bcg-grid {
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
          }
        }
        @media (hover: none) {
          .bcg-hover-overlay.visible { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Instance;
