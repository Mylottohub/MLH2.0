import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import HowToPlay from "../components/HowToPlay";

const Tutorial = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <div className="container">
        <HowToPlay />

        <table className="table table-express mt-5">
          <tbody>
            <tr>
              <th>HOW TO FUND WALLET</th>
            </tr>
          </tbody>
        </table>

        <iframe
          width="100%"
          height="355"
          src="https://www.youtube.com/embed/KT_jWwBr8-c?rel=0"
          title="MLH HOW TO FUND YOUR ACCOUNT"
          frameBorder="0"
          allowfullscreen
        ></iframe>

        {/* <iframe
          width="100%"
          height="355"
          title="MLH HOW TO FUND YOUR ACCOUNT"
          src="https://player.vimeo.com/video/902867474?h=243fb31947"
          frameBorder="0"
        ></iframe> */}

        <table className="table table-express mt-5">
          <tbody>
            <tr>
              <th>HOW TO TRANSFER WINNINGS</th>
            </tr>
          </tbody>
        </table>

        <iframe
          width="100%"
          height="355"
          src="https://www.youtube.com/embed/sYkTaIqFZbU?rel=0"
          title="HOW TO TRANSFER WINNINGS BACK TO DEPOSIT WALLET"
          frameBorder="0"
          allowfullscreen
        ></iframe>
      </div>

      <Footer />
    </div>
  );
};

export default Tutorial;
