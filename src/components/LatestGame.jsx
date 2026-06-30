import { useEffect, useRef, useState } from "react";
import HTTP from "../utils/httpClient";
import moment from "moment";
import "../assets/css/latest.css";

const LatestGame = () => {
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
    fontWeight: "bolder",
    zIndex: 2000,
    color: "#000!important",
    paddingTop: "5px",
    bottom: 0,
    fontSize: "15px",
    backgroundColor: "#FFD801",
  };

  const [timetable, setTimetable] = useState([]);

  const fetchData = () => {
    HTTP.get(`/mylotto_get_timetable`)
      .then((response) => {
        setTimetable(response.data.data);
      })
      .catch(() => {
        // Handle error
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const getOperatorName = (operator) => {
    switch (operator) {
      case 27:
        return "Baba Ijebu";
      case 26:
        return "5/90 Games";
      case 28:
        return "Wesco";
      case 42:
        return "Golden Chance";
      case 45:
        return "Lottomania";
      case 57:
        return "Set Lotto";
      default:
        return "";
    }
  };

  const filteredTimetable = timetable
    .filter(
      (game) =>
        moment().isBefore(
          moment(`${moment().format("YYYY-MM-DD")} ${game?.start_time}`)
        ) && game?.day === currentDay
    )
    .sort((a, b) =>
      moment(a.start_time, "HH:mm:ss").diff(moment(b.start_time, "HH:mm:ss"))
    );

  return (
    <div>
      <div ref={barRef} style={scrollStyle} className="meg_next_game_scrol mt-5">
        <div className="scroll-content">
          Next Games =&gt;
          {filteredTimetable.map((game) => (
            <span key={game.id}>
              {getOperatorName(game.operator)} - {game.name} -{" "}
              {moment().format("Do MMM YYYY")} ({game.start_time}) |{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestGame;