import { useEffect, useState } from "react";
import HTTP from "../utils/httpClient";
import moment from "moment";
import "../assets/css/latest.css";
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
        // console.log(err);
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
    <>
      <div>
        <div style={scrollStyle} className="meg_next_game_scroll mt-5">
          <div>
            <marquee scrollAmount="3">
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
    </>
  );
};

export default LatestGame;
