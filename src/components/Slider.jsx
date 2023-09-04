import { images } from "../constant";
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function Slider() {
  return (
    <Carousel fade>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Banner 1" /> */}
        <img src={images.banner_1} alt="" className="img-fluid" />   
      </Carousel.Item>
      <Carousel.Item>
      <img src={images.green_lotto_bg} alt="" className="img-fluid" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;