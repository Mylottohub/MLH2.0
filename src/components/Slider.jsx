import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { HTTP } from "../utils";
import { useLocation } from "react-router-dom";

function Slider() {
  const [adverts, setAdverts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await HTTP.get("/get-adverts");
        setAdverts(response.data.data);
      } catch (error) {
        console.error("Error fetching adverts:", error);
      }
    };

    fetchAdverts();
  }, []);

  const filteredAdverts = adverts.filter((advert) => {
    const pageWebLower = (advert.page_web || "").toLowerCase();
    const currentPath = location.pathname;

    if (currentPath === "/") {
      return pageWebLower.includes("home");
    } else if (currentPath === "/play-lotto") {
      return pageWebLower.includes("home");
    } else if (currentPath === "/instant") {
      return pageWebLower.includes("home");
    } else if (currentPath === "/sport-forecast") {
      return pageWebLower.includes("home");
    } else if (currentPath === "/result") {
      return pageWebLower.includes("result");
    } else if (currentPath.startsWith("/view-more")) {
      return pageWebLower.includes("result");
    } else if (currentPath === "/timetable") {
      return pageWebLower.includes("timetable");
    } else if (currentPath === "/tutorials") {
      return pageWebLower.includes("tutorials");
    }

    return false;
  });

  if (filteredAdverts.length === 0) {
    return null;
  }

  return (
    <Carousel fade>
      {filteredAdverts.map((advert) => (
        <Carousel.Item key={advert.id}>
          <a href={advert.link} target="_blank" rel="noopener noreferrer">
            <img
              src={advert.banner}
              alt={advert.name}
              className="w-100 h-100"
            />
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
