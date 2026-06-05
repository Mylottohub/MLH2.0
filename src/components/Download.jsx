import { useNavigate } from "react-router-dom";
import { usePwaInstall } from "../context/PwaInstallContext";

const Download = () => {
  const navigate = useNavigate();
  const { installApp, isIOS, openInstallModal, shouldExposeInstallUI } =
    usePwaInstall();

  const handleInstallClick = async () => {
    if (isIOS) {
      openInstallModal();
      return;
    }

    await installApp();
  };

  return (
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      role="banner"
      className="navigation w-nav navigationData"
      style={{
        position: "fixed",
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
          {shouldExposeInstallUI ? (
            <button
              type="button"
              onClick={handleInstallClick}
              className="navigation-item_play-c1 install-app-trigger fw-bolder"
              style={{
                backgroundColor: "#db801e",
                transition: "all 0.3s ease",
              }}
            >
              Install App
            </button>
          ) : null}
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
          /* Add padding to body to account for fixed header */
          body {
            padding-top: 60px;
          }

          /* Default button styles */
          .navigation .navigation-item_play-c1 {
            color: #fff;
            text-decoration: none;
            padding: 10px 15px;          
            border-radius: 5px;
            border: 0;
            transition: all 0.3s ease;
            font-size: 16px;
          }

          .navigation .install-app-trigger:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 25px rgba(219, 128, 30, 0.3);
          }

          /* Mobile-specific styles */
          @media (max-width: 768px) {
            body {
              padding-top: 60px;
            }
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
