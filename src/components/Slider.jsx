import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { HTTP } from "../utils";

function Slider() {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await HTTP.get("/get-adverts");
        setAdverts(response.data.data);
      } catch (error) {
        // console.error("Error fetching adverts:", error);
      }
    };

    fetchAdverts();
  }, []);

  return (
    <Carousel fade>
      {adverts.map((advert) => (
        <Carousel.Item key={advert.id}>
          <a href={advert.link} target="_blank" rel="noopener noreferrer">
            <img src={advert.banner} alt={advert.name} className="img-fluid" />
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
