import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Instance = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <span className="hidden-xs hidden-sm">
          <h4>
            <strong>Instant Games</strong>
          </h4>
        </span>
        <br />
        <div className="row">
          <div className="col-6 col-lg-3">
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#FFF!important",
                borderRadius: "5px",
              }}
              onClick={() =>
                window.open(
                  "https://betbonanza.com/casino/?trc=14241_14283_0",
                  "_blank"
                )
              }
            >
              <img
                src="/images/reactions.png"
                className="img-fluid"
                style={{
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                }}
              />
              <div style={{ padding: "10px", lineHeight: "28px" }}>
                <p align="center">
                  <strong>Reactionz</strong>
                </p>
                <p align="center">
                  <small>Bet Bonanza</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#FFF!important",
                borderRadius: "5px",
              }}
              onClick={() =>
                window.open(
                  "https://22bet.ng/casino?tag=d_532169m_7669c_",
                  "_blank"
                )
              }
            >
              <img
                src="/images/tiki-tower.png"
                className="img-fluid"
                style={{
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                }}
              />
              <div style={{ padding: "10px", lineHeight: "28px" }}>
                <p align="center">
                  <strong>Tiki tower</strong>
                </p>
                <p align="center">
                  <small>22bet</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#FFF!important",
                borderRadius: "5px",
              }}
              onClick={() =>
                window.open(
                  "https://22bet.ng/casino?tag=d_532169m_7669c_",
                  "_blank"
                )
              }
            >
              <img
                src="/images/magical.png"
                className="img-fluid"
                style={{
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                }}
              />
              <div style={{ padding: "10px", lineHeight: "28px" }}>
                <p align="center">
                  <strong>Magical amazon</strong>
                </p>
                <p align="center">
                  <small>22bet</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#FFF!important",
                borderRadius: "5px",
              }}
              onClick={() =>
                window.open(
                  "https://22bet.ng/casino?tag=d_532169m_7669c_",
                  "_blank"
                )
              }
            >
              <img
                src="/images/dynamite-riches.png"
                className="img-fluid"
                style={{
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                }}
              />
              <div style={{ padding: "10px", lineHeight: "28px" }}>
                <p align="center">
                  <strong>Dynamite riches</strong>
                </p>
                <p align="center">
                  <small>22bet</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 mt-3">
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#FFF!important",
                borderRadius: "5px",
              }}
              onClick={() =>
                window.open(
                  "https://22bet.ng/casino?tag=d_532169m_7669c_",
                  "_blank"
                )
              }
            >
              <img
                src="/images/candy-burst.png"
                className="img-fluid"
                style={{
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                }}
              />
              <div style={{ padding: "10px", lineHeight: "28px" }}>
                <p align="center">
                  <strong>Candy burst</strong>
                </p>
                <p align="center">
                  <small>22bet</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Instance;
