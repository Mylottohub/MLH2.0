import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const PwaInstallContext = createContext(undefined);
const INSTALLED_APP_KEY = "mlh-pwa-installed";

const getIsStandalone = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const isStandaloneDisplayMode = window.matchMedia
    ? window.matchMedia("(display-mode: standalone)").matches
    : false;

  return (
    isStandaloneDisplayMode ||
    window.navigator.standalone === true ||
    (typeof document !== "undefined" &&
      document.referrer.startsWith("android-app://"))
  );
};

const getStoredInstalledState = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(INSTALLED_APP_KEY) === "true";
};

const getIsIOS = () => {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /iphone|ipad|ipod/i.test(navigator.userAgent);
};

export const PwaInstallProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(
    () => getIsStandalone() || getStoredInstalledState()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isIOS = getIsIOS();
  const canPromptInstall = Boolean(deferredPrompt);
  const shouldExposeInstallUI = !isInstalled;
  const isAutoPromptDismissed = false;

  const openInstallModal = () => {
    setIsModalOpen(true);
  };

  const closeInstallModal = () => {
    setIsModalOpen(false);
  };

  const persistInstalledState = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(INSTALLED_APP_KEY, "true");
    }
  };

  const installApp = async () => {
    if (!deferredPrompt) {
      openInstallModal();
      return isInstalled ? "installed" : "instructions";
    }

    const promptEvent = deferredPrompt;
    setDeferredPrompt(null);
    setIsModalOpen(false);

    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
      persistInstalledState();
    }

    return outcome;
  };

  const resetInstallState = () => {
    localStorage.removeItem(INSTALLED_APP_KEY);
    setIsInstalled(false);
    setDeferredPrompt(null);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      setIsModalOpen(false);
      persistInstalledState();

      // Track installation in Google Analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "pwa_install", {
          event_category: "PWA",
          event_label: "App Installed",
        });
      }

      // Track installation in Facebook Pixel
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("trackCustom", "PWAInstall");
      }
    };

    const mediaQuery = window.matchMedia
      ? window.matchMedia("(display-mode: standalone)")
      : null;

    const handleDisplayModeChange = (event) => {
      if (event.matches) {
        handleAppInstalled();
      }
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );
    window.addEventListener("appinstalled", handleAppInstalled);

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener("change", handleDisplayModeChange);
    } else if (mediaQuery?.addListener) {
      mediaQuery.addListener(handleDisplayModeChange);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);

      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener("change", handleDisplayModeChange);
      } else if (mediaQuery?.removeListener) {
        mediaQuery.removeListener(handleDisplayModeChange);
      }
    };
  }, []);

  return (
    <PwaInstallContext.Provider
      value={{
        canPromptInstall,
        closeInstallModal,
        installApp,
        isAutoPromptDismissed,
        isIOS,
        isInstalled,
        isModalOpen,
        openInstallModal,
        resetInstallState,
        shouldExposeInstallUI,
      }}
    >
      {children}
    </PwaInstallContext.Provider>
  );
};

PwaInstallProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePwaInstall = () => {
  const context = useContext(PwaInstallContext);

  if (!context) {
    throw new Error("usePwaInstall must be used within PwaInstallProvider");
  }

  return context;
};
