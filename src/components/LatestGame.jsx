import { useEffect, useState } from "react";
import HTTP from "../utils/httpClient";
import moment from "moment";

const LatestGame = () => {
  const scrollStyle = {
    position: "fixed",
    height: "30px",
    width: "100%",
    zIndex: 2000,
    color: "#34282C",
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
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get the current day number (0 for Sunday, 1 for Monday, and so on)
  const currentDay = new Date().getDay();

  // Operator name mapping function
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

  // Filter and sort the timetable for games with start times in the future and the current day
  const filteredTimetable = timetable
    .filter(
      (game) =>
        moment().isBefore(
          moment(`${moment().format("YYYY-MM-DD")} ${game.start_time}`)
        ) && game.day_no === currentDay
    )
    .sort((a, b) =>
      moment(a.start_time, "HH:mm:ss").diff(moment(b.start_time, "HH:mm:ss"))
    );
  return (
    <div>
      <div style={scrollStyle} className="meg_next_game_scroll">
        <div>
          <marquee>
            Next Games =&gt;
            {filteredTimetable.map((game) => (
              <span key={game.id}>
                {" "}
                {getOperatorName(game.operator)} - {game.name} -{" "}
                {moment().format("Do MMM YYYY")} ({game.start_time}) |
              </span>
            ))}
          </marquee>
        </div>
      </div>
    </div>
  );
};

export default LatestGame;
