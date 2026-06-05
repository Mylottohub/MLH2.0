import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slider from "../components/Slider";

const CrashGames = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameUrl, setGameUrl] = useState("");
  const [loadingIframe, setLoadingIframe] = useState(false);
  const [gameTitle, setGameTitle] = useState("");

  const crashGames = [
    {
      title: "Choice Games",
      image: "/images/ROCKET.png",
      url: "https://games.bcrgslaunchgame.com",
    },
  ];

  const openGameModal = (url, title) => {
    setGameTitle(title);
    setGameUrl(url);
    setLoadingIframe(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGameUrl("");
    setLoadingIframe(false);
    setGameTitle("");
  };

  const GameCard = ({ image, title, onPlay }) => (
    <div className="col-6 col-lg-3 mb-4">
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          paddingBottom: "10px",
        }}
      >
        <img
          src={image}
          alt={title}
          className="img-fluid"
          style={{
            height: "180px",
            width: "100%",
            objectFit: "contain",
            padding: "24px",
            background: "linear-gradient(135deg, #0b3e53, #0f7c74)",
          }}
        />

        <div className="px-2 mt-3">
          <h6 className="fw-bold text-center">{title}</h6>

          <div className="d-flex justify-content-between gap-2 mt-3">
            <button className="btn btn-primary btn-sm w-100" onClick={onPlay}>
              Play Now
            </button>
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
        <h4 className="fw-bold text-uppercase">Crash Games</h4>

        <br />

        <div className="row">
          {crashGames.map((game) => (
            <GameCard
              key={game.title}
              title={game.title}
              image={game.image}
              onPlay={() => openGameModal(game.url, game.title)}
            />
          ))}
        </div>
      </div>

      <Footer />

      {isModalOpen && (
        <>
          <div className="modal-backdrop fade show" onClick={closeModal} />

          <div
            className="modal fade show"
            style={{
              display: "block",
              background: "rgba(0,0,0,0.6)",
            }}
          >
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content border-0">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">{gameTitle}</h5>

                  <button className="btn-close" onClick={closeModal} />
                </div>

                <div
                  className="modal-body position-relative p-0"
                  style={{ height: "100vh" }}
                >
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

                        <p className="mb-0">Loading game...</p>
                      </div>
                    </div>
                  )}

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

export default CrashGames;
