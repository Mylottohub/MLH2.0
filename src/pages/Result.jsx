import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import '../assets/css/result.css'

const Result = () => {
  return (
    <div>
      <Navbar />
      <Slider />

      <div className="about-area ptb-120">
        <div className="container">
          <div className="meg_container mt-5">
            <span className="hidden-xs hidden-sm mb-5">
              <h4>
                <strong>Latest Results</strong>
              </h4>
            </span>

            <div className="hidden-xs hidden-sm mt-5">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src="https://www.mylottohub.com/images/operator/set_logo_1-01.png"
                    className="img-fluid img-rounded"
                  />
                </div>
                <div className="col-md-10 div_lgrey">
                  <strong>LUCKY G MC</strong>
                  <br />
                  <small>
                    <strong>Draw Time:</strong> Sep 26, 2023 10:00:02 pm
                  </small>
                  <br />
                  <br />
                  <br />
                  <table cellPadding="5">
                    <tbody>
                      <tr>
                        <td>
                          <div className="numboxwhite">37</div>
                        </td>
                        <td>
                          <div className="numboxwhite">62</div>
                        </td>
                        <td>
                          <div className="numboxwhite">6</div>
                        </td>
                        <td>
                          <div className="numboxwhite">90</div>
                        </td>
                        <td>
                          <div className="numboxwhite">9</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="clearfix"></div>
                  <div className="pull-right">
                    <a className="text-decoration-none" href="#">
                      <small>
                        <strong>View More&gt;&gt;</strong>
                      </small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
