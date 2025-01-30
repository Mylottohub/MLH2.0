import { useNavigate } from "react-router-dom";

const Download = () => {
  const navigate = useNavigate();
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isIOS) {
    return null;
  }

  return (
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      role="banner"
      className="navigation w-nav navigationData"
      style={{
        // position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "#333",
        color: "#fff",
        borderBottom: "2px solid #db801e",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="div-block-175"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          height: "60px",
        }}
      >
        <div
          className="d-flex navigation-items text-center"
          style={{ gap: "15px", alignItems: "center" }}
        >
          <a
            href="https://apkpure.net/mylottohub/com.mylottohub_app/downloading"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#F82020",
              transition: "all 0.3s ease",
            }}
            className="navigation-item_play-c1 w-nav-link signInBtn_new fw-bolder"
          >
            Download App
          </a>
          <a
            href="https://agency.mylottohub.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="navigation-item_play-c1 w-nav-link signInBtn_new fw-bolder"
            style={{
              backgroundColor: "#406777",
              transition: "all 0.3s ease",
            }}
          >
            Become An Agent
          </a>
          <a
            onClick={() => navigate("/tutorials")}
            target="_blank"
            rel="noopener noreferrer"
            className="navigation-item_play-c1 w-nav-link signInBtn_new fw-bolder"
            style={{
              backgroundColor: "#406777",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          >
            How to Play
          </a>
        </div>
      </div>
      <style>
        {`
          /* Default button styles */
          .navigation .navigation-item_play-c1 {
            color: #fff;
            text-decoration: none;
            padding: 10px 15px;          
            border-radius: 5px;
            transition: all 0.3s ease;
            font-size: 16px;
          }

          /* Mobile-specific styles */
          @media (max-width: 768px) {
            .navigation .navigation-item_play-c1 {
              padding: 6px 10px; 
              font-size: 13px; 
            }
          }
        `}
      </style>
    </div>
  );
};

export default Download;
