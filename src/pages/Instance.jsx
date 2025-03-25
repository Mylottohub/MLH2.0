import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import { useGetInstantGame } from "../react-query";

const Instance = () => {
  const { userInstantGame, isLoadingInstantGame } = useGetInstantGame();

  return (
    <div>
      <Navbar />
      <Slider />
      <div className="container mt-5">
        <span className="hidden-xs hidden-sm">
          <h4>
            <strong>Instant Games</strong>
          </h4>
        </span>
        <br />
        <div className="row">
          {isLoadingInstantGame ? (
            <div className="text-center">Loading games...</div>
          ) : userInstantGame?.length > 0 ? (
            userInstantGame.map((game) => (
              <div className="col-6 col-lg-3 mb-4" key={game.id}>
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#FFF",
                    borderRadius: "5px",
                  }}
                  onClick={() => window.open(game.link, "_blank")}
                >
                  <img
                    src={`/images/${game.pix}`}
                    alt={game.name}
                    className="img-fluid"
                    style={{
                      borderTopRightRadius: "5px",
                      borderTopLeftRadius: "5px",
                    }}
                  />
                  <div style={{ padding: "10px", lineHeight: "28px" }}>
                    <p align="center">
                      <strong>{game.name}</strong>
                    </p>
                    <p align="center">
                      <small>
                        {game.operator === 13 ? "Bet Bonanza" : "22bet"}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No instant games found.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Instance;
