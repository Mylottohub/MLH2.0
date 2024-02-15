import Navbar from "../components/Navbar";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import "../assets/css/about.css";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container app__about-us">
        <h4 className="mt-5">About Us</h4>
        <span className="hidden-sm hidden-xs">
          <div className="title_div mt-5 mb-5">
            Africa`s Number #1 Lotto Community
          </div>
        </span>
        <div className="app__about-main">
          <p className="w-100 text-center mx-auto mt-4 mb-2">
            <b>MYLOTTOHUB.COM</b> is a web based platform, designed to gradually
            help transit lottery into the digital age through its mobile and
            desktop based site.
          </p>

          <p className="text-center mx-auto lh-base mt-4 mb-2">
            It was developed to help drive the Nigerian lottery industry by
            archiving all past and present lottery information from all
            registered and licensed operators, while also helping users predict
            and forecast next possible occurrences with our built in AI
            predictive algorithm, all from the comfort of their mobile devices.
            Thereby helping stakers increase their winning accuracy, while
            operators get increased trust and patronage from the lotto players.
          </p>

          <p className="text-center mx-auto lh-base mt-4 mb-2">
            In today`s digital economy, we are driven by 3 core principles: Ease
            of use, Convenience and Affordability for the customer. We are
            passionate about customer engagement and we believe that
            MyLottoHub.com will prove a valuable addition to the customers
            decision making process.
          </p>

          <p className="text-center mx-auto lh-base mt-4 mb-2">
            All previous results on MyLottoHub.com have been compiled from
            publicly available data and we have spent a considerable amount of
            time collating and verifying this information with operators and
            continue to do to ensure its continued completeness, accuracy and
            timeliness. We would also like to point out that MyLottoHub.com is
            NOT a licensed operator, we do not own or draw any lottery games and
            are not licensed to do so in the Federal Republic of Nigeria. Our
            role is simply to serve you better so that you can make better
            informed betting decisions for licensed operators.
          </p>
          <table
            align="center"
            cellPadding="20"
            className="hidden-xs hidden-sm mb-5"
          >
            <tbody>
              <tr>
                <td>
                  <table cellPadding="10">
                    <tbody>
                      <tr>
                        <td>
                          <span className="meg_round_icon bg-warning meg_white">
                            <BsFillCalendarCheckFill className="fa-2x" />
                          </span>
                        </td>

                        <td>
                          Founded in
                          <br />
                          <span className="lead">2018</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table cellPadding="10">
                    <tbody>
                      <tr>
                        <td>
                          <span className="meg_round_icon bg-success meg_white">
                            <FaUsers className="fa-2x" />
                          </span>
                        </td>

                        <td>
                          Users
                          <br />
                          <span className="lead">150,000</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
