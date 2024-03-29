import { useEffect, useState } from "react";
import HTTP from "../utils/httpClient";
import "../assets/css/latest.css";
import moment from "moment";

const LatestWinner = () => {
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
        // console.log(err);
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
    <>
      <div>
        <div style={scrollStyle} className="meg_latest_winners_scroll mt-5">
          <marquee scrollAmount="3">
            Latest Winners =&gt;
            {winners.map((results, index) => (
              <>
                <span key={index}>
                  {results?.username} &nbsp; - ₦{results?.amount} &nbsp; -{" "}
                  {formatDate(results?.date)} |{" "}
                </span>
              </>
            ))}
          </marquee>
        </div>
      </div>
    </>
  );
};

export default LatestWinner;
