import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HTTP from "../utils/httpClient";
import { Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const HEADER_HEIGHT = 52;

const ModernLottoGames = () => {
  const [filteredGames, setFilteredGames] = useState([]);
  const [rawResponse, setRawResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loadingIframe, setLoadingIframe] = useState(true);
  const [modalHeight, setModalHeight] = useState(0);
  const [iframeScale, setIframeScale] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const modalRef = useRef(null);
  const iframeRef = useRef(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const updateModalHeight = useCallback(() => {
    const height = window.innerHeight;
    setModalHeight(height);
    const availableHeight = height - HEADER_HEIGHT;
    const gameDesignHeight = 800;
    const scale = availableHeight / gameDesignHeight;
    setIframeScale(Math.max(scale, 0.8));
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    updateModalHeight();
    window.addEventListener("resize", updateModalHeight);
    window.addEventListener("orientationchange", () => {
      setTimeout(updateModalHeight, 300);
    });
    return () => {
      window.removeEventListener("resize", updateModalHeight);
      window.removeEventListener("orientationchange", updateModalHeight);
    };
  }, [isModalOpen, updateModalHeight]);

  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await HTTP.post("/get-games", {
        operator_type: "modernlottogames",
      }, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 30000,
      });

      if (response.status === 200) {
        const data = response.data;
        setRawResponse(data);
        let list = [];
        if (data?.data && Array.isArray(data.data)) list = data.data;
        else if (data?.result && Array.isArray(data.result)) list = data.result;
        else if (Array.isArray(data)) list = data;
        else {
          for (const key in data) {
            if (Array.isArray(data[key]) && data[key].length > 0) {
              list = data[key];
              break;
            }
          }
        }
        setFilteredGames(list);
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else if (err.response?.status === 404) {
        setError("Games endpoint not found.");
      } else if (err.request) {
        setError("No response from server. Check your internet connection.");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [userInfo?.token]);

  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handlePlayGame = async (game) => {
    const token = userInfo?.token || localStorage.getItem('token');
    if (!token || !userInfo) {
      toast.error("Please log in to play games", { position: "top-right", autoClose: 3000 });
      return;
    }

    const url = game?.apiUrl;
    if (!url) {
      toast.error("Game URL not found");
      return;
    }

    setSelectedGame({ ...game, launchUrl: url });
    setLoadingIframe(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
    setLoadingIframe(true);
  };

  const gameTitle = selectedGame?.name || selectedGame?.gameName || "Modern Lotto Game";
  const gameUrl = selectedGame?.launchUrl || "";
  const iframeHeight = modalHeight ? modalHeight - HEADER_HEIGHT : `calc(100vh - ${HEADER_HEIGHT}px)`;

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
        {/* <h5 className="bcg-page-title">Modern Lotto Games</h5> */}

        {isLoading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="light" />
            <p className="mt-3 text-white">Loading games...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
            <div className="mt-2">
              {error.includes("Authentication") ? (
                <button className="btn btn-sm btn-primary me-2" onClick={() => navigate("/login")}>
                  Go to Login
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-secondary" onClick={fetchGames}>
                  Retry
                </button>
              )}
            </div>
          </div>
        )}

        {!isLoading && !error && filteredGames.length === 0 && rawResponse !== null && (
          <div className="alert alert-warning">
            <strong>No games found.</strong>
            <button className="btn btn-sm btn-outline-warning mt-2 ms-2" onClick={fetchGames}>
              Refresh
            </button>
          </div>
        )}

        {!isLoading && !error && filteredGames.length > 0 && (
          <div className="bcg-grid" style={{marginTop:"-20px"}}>
            {filteredGames.map((game, index) => {
              const gameName = game?.typeName || game?.name || game?.gameName || game?.title || `Game ${index + 1}`;
              const gameImage = game?.banner
                ? (game.banner.startsWith("http") ? game.banner : `https://modernlottogames.com/images/${game.banner}`)
                : game?.image || game?.imageUrl || game?.icon || null;

              return (
                <div
                  className="bcg-tile"
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="bcg-tile-img">
                    {gameImage ? (
                      // <img
                      //   src={gameImage}
                      //   alt={gameName}
                      //   className="text-white"
                      //   onError={(e) => {
                      //     e.target.onerror = null;
                      //     e.target.style.display = "none";
                      //     e.target.parentElement.innerHTML = `<div class="bcg-no-img"><i class="fa fa-gamepad"></i><span  className="text-white">${gameName}</span></div>`;
                      //   }}
                      // />
                        <div className="bcg-no-img text-white">
                        <i className="fa fa-gamepad" />
                        <span className="text-white">{gameName}</span>
                      </div>
                    ) : (
                      <div className="bcg-no-img text-white">
                        <i className="fa fa-gamepad" />
                        <span className="text-white">{gameName}</span>
                      </div>
                    )}
                  </div>
                  <div className={`bcg-hover-overlay ${hoveredIndex === index ? "visible" : ""}`}>
                    <div className="bcg-hover-buttons">
                      <button
                        className="bcg-btn-play"
                        onClick={(e) => { e.stopPropagation(); handlePlayGame(game); }}
                      >
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Game Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: modalHeight ? `${modalHeight}px` : "100vh",
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
              minHeight: `${HEADER_HEIGHT}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              background: "#406777",
              zIndex: 2,
            }}
          >
            <span style={{ color: "#fff", fontWeight: 600, fontSize: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {gameTitle}
            </span>
            <button
              onClick={handleCloseModal}
              aria-label="Close game"
              style={{ flexShrink: 0, width: "36px", height: "36px", borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.18)", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              ✕
            </button>
          </div>
          <div style={{ position: "relative", width: "100%", height: typeof iframeHeight === "number" ? `${iframeHeight}px` : iframeHeight, flexShrink: 0, overflow: "hidden", background: "#000" }}>
            {loadingIframe && (
              <div style={{ position: "absolute", inset: 0, background: "#1a1a1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 3, gap: "12px" }}>
                <div className="spinner-border text-light" style={{ width: "48px", height: "48px", borderWidth: "3px" }} />
                <p style={{ color: "#fff", margin: 0, fontWeight: 600 }}>Loading Game…</p>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={gameUrl}
              title={gameTitle}
              allowFullScreen
              allow="autoplay; fullscreen"
              onLoad={() => setLoadingIframe(false)}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
              loading="lazy"
              style={{ width: "100%", height: "100%", border: "none", display: "block", background: "#000", transform: `scale(${iframeScale})`, transformOrigin: "center center" }}
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
        .bcg-no-img {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #888;
          font-size: 12px;
          text-align: center;
          padding: 8px;
        }
        .bcg-no-img i { font-size: 24px; }
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
        .bcg-hover-overlay.visible { opacity: 1; }
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
        .bcg-btn-play:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 480px) {
          .bcg-page-container { padding-left: 8px; padding-right: 8px; }
          .bcg-grid { grid-template-columns: repeat(3, 1fr); gap: 5px; }
          .bcg-hover-buttons { max-width: 90px; }
          .bcg-btn-play { font-size: 10px; padding: 5px 8px; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .bcg-page-container { padding-left: 16px; padding-right: 16px; }
          .bcg-grid { grid-template-columns: repeat(4, 1fr); gap: 6px; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .bcg-grid { grid-template-columns: repeat(5, 1fr); gap: 8px; }
        }
        @media (min-width: 1025px) {
          .bcg-grid { grid-template-columns: repeat(7, 1fr); gap: 10px; }
        }
        @media (hover: none) {
          .bcg-hover-overlay.visible { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ModernLottoGames;
