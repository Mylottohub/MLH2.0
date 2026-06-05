import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FaDownload, FaShareAlt, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { usePwaInstall } from "../context/PwaInstallContext";
import "../assets/css/pwa-install.css";

const INSTALL_TITLE = "Install MyLottoHub App";
const INSTALL_COPY =
  "Install our app for faster access, offline browsing and a better experience.";
let hasAutoOpenedThisPageLoad = false;

const PwaInstallModal = () => {
  const location = useLocation();
  const {
    canPromptInstall,
    closeInstallModal,
    installApp,
    isIOS,
    isModalOpen,
    openInstallModal,
    shouldExposeInstallUI,
  } = usePwaInstall();

  useEffect(() => {
    if (
      location.pathname !== "/" ||
      isModalOpen ||
      hasAutoOpenedThisPageLoad ||
      !shouldExposeInstallUI
    ) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      hasAutoOpenedThisPageLoad = true;
      openInstallModal();
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    isModalOpen,
    location.pathname,
    openInstallModal,
    shouldExposeInstallUI,
  ]);

  useEffect(() => {
    if ((!shouldExposeInstallUI || location.pathname !== "/") && isModalOpen) {
      closeInstallModal();
    }
  }, [
    closeInstallModal,
    isModalOpen,
    location.pathname,
    shouldExposeInstallUI,
  ]);

  const handlePrimaryAction = async () => {
    if (isIOS) {
      closeInstallModal();
      return;
    }

    await installApp();
  };

  if (!shouldExposeInstallUI) {
    return null;
  }

  return (
    <Modal
      centered
      show={isModalOpen}
      onHide={() => closeInstallModal()}
      dialogClassName="install-app-modal-dialog"
      contentClassName="install-app-modal-content"
    >
      <div className="install-app-modal-shell">
        <button
          type="button"
          className="install-app-modal-close"
          onClick={() => closeInstallModal()}
          aria-label="Close install prompt"
        >
          <FaTimes />
        </button>

        <div className="install-app-modal-badge" style={{
          background: 'none',
          boxShadow: 'none'
        }}>
          <img 
            src="/main-pwa-logo.png" 
            alt="MyLottoHub Logo" 
            className="mt-5"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "24px",
              objectFit: "cover"
            }}
          />
        </div>

        <h2 className="install-app-modal-title mt-4">{INSTALL_TITLE}</h2>
        <p className="install-app-modal-copy">{INSTALL_COPY}</p>

        {/* <div className="install-app-modal-tags">
          <span>Faster access</span>
          <span>Offline browsing</span>
          <span>Home screen install</span>
        </div> */}

        {isIOS ? (
          <div className="install-app-modal-instructions">
            <p>On iPhone or iPad, Safari does not show a direct install popup.</p>
            <p>
              Tap <strong>Share</strong> <FaShareAlt className="install-app-inline-icon" /> and
              then choose <strong>Add to Home Screen</strong>.
            </p>
          </div>
        ) : null}

        {!isIOS && !canPromptInstall ? (
          <p></p>
        ) : null}

        <div className="install-app-modal-actions">
          <button
            type="button"
            className="install-app-modal-primary w-100 text-white fw-bold"
            onClick={handlePrimaryAction}
          >
            {isIOS ? <FaShareAlt /> : <FaDownload />}
            <span  className="text-white fw-bold">{isIOS ? "Got It" : "Install App"}</span>
          </button>
          {/* <button
            type="button"
            className="install-app-modal-secondary"
            onClick={() => closeInstallModal()}
          >
            Maybe Later
          </button> */}
        </div>
      </div>
    </Modal>
  );
};

export default PwaInstallModal;
