import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const LottoLadies = () => {
  return (
    <div>
      <Navbar />
      <Slider />

      <div className="container">
        <div className="row mt-4 mb-3">
          <div className="col-12">
            <h1 className="h3 fw-bold text-uppercase">Lotto Ladies</h1>
            <p className="text-muted">
              Watch step-by-step videos from our Lotto Ladies to learn how to
              play some of your favourite games on MyLottoHub. Follow along on
              your phone or computer and start playing with confidence.
            </p>
          </div>
        </div>

        <table className="table table-express mt-4">
          <tbody>
            <tr>
              <th className="text-uppercase">GD Lotto – Video Tutorial</th>
            </tr>
          </tbody>
        </table>

        <iframe
          width="100%"
          height="355"
          src="https://www.youtube.com/embed/wahUIabPbOY?si=xKQTQX7eH1GYwQYB" 
          title="GD Lotto – Lotto Ladies Tutorial"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <table className="table table-express mt-5">
          <tbody>
            <tr>
              <th className="text-uppercase">Green Lotto – Video Tutorial</th>
            </tr>
          </tbody>
        </table>

        <iframe
          width="100%"
          height="355"
          src="https://www.youtube.com/embed/TXJ-GrCXpgA?si=Vcxav6G_AOlqFWsk" 
          title="Green Lotto – Lotto Ladies Tutorial"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        {/* <table className="table table-express mt-5">
          <tbody>
            <tr>
              <th className="text-uppercase">Lottomania – Video Tutorial</th>
            </tr>
          </tbody>
        </table>

        <iframe
          width="100%"
          height="355"
          src="https://www.youtube.com/embed/wahUIabPbOY?rel=0"
          title="Lottomania – Lotto Ladies Tutorial"
          frameBorder="0"
          allowFullScreen
        ></iframe> */}
      </div>

      <Footer />
    </div>
  );
};

export default LottoLadies;


