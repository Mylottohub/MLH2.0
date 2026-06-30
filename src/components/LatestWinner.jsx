import { useEffect, useRef, useState } from "react";
import HTTP from "../utils/httpClient";
import "../assets/css/latest.css";
import moment from "moment";

const LatestWinner = () => {
  const barRef = useRef(null);

  // Fixes a known iOS standalone-PWA WebKit bug where position:fixed bottom
  // bars drift away from the true bottom edge (especially after the app has
  // been backgrounded). Scoped strictly to iOS + standalone display mode —
  // Android and desktop bail out immediately and are untouched.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isStandalone =
      window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;

    if (!isIOS || !isStandalone) return;

    let frame = null;

    const correctPosition = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        bar.style.transform = "translateY(0px)";
        const viewportHeight = window.visualViewport
          ? window.visualViewport.height
          : window.innerHeight;
        const rect = bar.getBoundingClientRect();
        const gap = viewportHeight - rect.bottom;
        if (Math.abs(gap) > 1) {
          bar.style.transform = `translateY(${gap}px)`;
        }
      });
    };

    correctPosition();

    window.addEventListener("resize", correctPosition);
    window.addEventListener("orientationchange", correctPosition);
    window.addEventListener("scroll", correctPosition, { passive: true });
    window.addEventListener("focus", correctPosition);
    window.addEventListener("pageshow", correctPosition);
    document.addEventListener("visibilitychange", correctPosition);
    window.visualViewport?.addEventListener("resize", correctPosition);
    window.visualViewport?.addEventListener("scroll", correctPosition);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", correctPosition);
      window.removeEventListener("orientationchange", correctPosition);
      window.removeEventListener("scroll", correctPosition);
      window.removeEventListener("focus", correctPosition);
      window.removeEventListener("pageshow", correctPosition);
      document.removeEventListener("visibilitychange", correctPosition);
      window.visualViewport?.removeEventListener("resize", correctPosition);
      window.visualViewport?.removeEventListener("scroll", correctPosition);
    };
  }, []);

  const scrollStyle = {
    position: "fixed",
    height: "30px",
    width: "100%",
    zIndex: 2000,
    color: "#fff",
    paddingTop: "5px",
    bottom: "30px",
    fontSize: "15px",
    backgroundColor: "#FF2400",
  };
  const [winners, setWinners] = useState([]);

  const fetchData = () => {
    HTTP.get(`/mylotto_get_winners`)
      .then((response) => {
        setWinners(response.data.data);
      })
      .catch((err) => {
        // Handle error
      });
  };

  const formatDate = (dateString) => {
    // Convert the date string to a valid format
    const formattedDate = moment(dateString, "YYYYMMDDHHmmss").format(
      "Do MMM YYYY (hh:mm:ss a)"
    );
    return formattedDate;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div ref={barRef} style={scrollStyle} className="meg_latest_winners_scroll mt-5">
        <div className="scroll-content">
          Latest Winners =&gt;
          {winners.map((results, index) => (
            <span className="text-white" key={index}>
              {results?.username.substring(0, 4)}***** &nbsp; - ₦
              {results?.amount} &nbsp; - {formatDate(results?.date)} |{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestWinner;