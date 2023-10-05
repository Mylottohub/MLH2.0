import React from "react";
import Navbar from "../components/Navbar";
import '../assets/css/timetable.css'
import Footer from "../components/Footer";
import Slider from "../components/Slider";

const TimeTable = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Slider />
      <div className="service-area service-area2 service-area3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <p>
                <strong>Filter Options</strong>
              </p>
              <br />
              <div className="div_lgrey">
                <form method="post" action="">
                  <table cellPadding="5" width="90%">
                    <tbody>
                      <tr>
                        <td>
                          <select name="operator" className="form-select">
                            <option value="">Select Operator</option>
                            <option value="26">5/90 Games</option>
                            <option value="28">Wesco</option>
                            <option value="43">Green lotto</option>
                            <option value="27">Baba Ijebu</option>
                            <option value="45">Lottomania</option>
                            <option value="57">Set Lotto</option>
                            <option value="42">Golden Chance</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select name="day" className="form-select">
                            <option value="">Select Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            type="submit"
                            name="filter"
                            className="btn btn-blue btn-lg btn-block w-100"
                            value="Filter"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
            <div className="col-md-8">
              <p>
                <strong>Timetable</strong>
              </p>
              <br />
              <table className="table table-express">
                <tbody>
                  <tr>
                    <th>GAME</th>
                    <th>DAY</th>
                    <th>CLOSING TIME</th>
                    <th>DRAW TIME</th>
                  </tr>
                  <tr>
                    <td>MVAG WED</td>
                    <td>Wednesday</td>
                    <td>08:00 am</td>
                    <td>08:00 am</td>
                  </tr>
                  <tr>
                    <td>GOLDENVOGUEWED</td>
                    <td>Wednesday</td>
                    <td>08:15 am</td>
                    <td>08:15 am</td>
                  </tr>
                  <tr>
                    <td>Wesco VAG MACH</td>
                    <td>Wednesday</td>
                    <td>08:30 am</td>
                    <td>08:30 am</td>
                  </tr>
                  <tr>
                    <td>Wesco VAG</td>
                    <td>Wednesday</td>
                    <td>08:30 am</td>
                    <td>08:30 am</td>
                  </tr>
                  <tr>
                    <td> NAIJA VAG</td>
                    <td>Wednesday</td>
                    <td>09:00 am</td>
                    <td>09:00 am</td>
                  </tr>
                  <tr>
                    <td>Premier Tota</td>
                    <td>Wednesday</td>
                    <td>09:30 am</td>
                    <td>09:45 am</td>
                  </tr>
                  <tr>
                    <td>WESCO AMERICA</td>
                    <td>Wednesday</td>
                    <td>10:00 am</td>
                    <td>10:00 am</td>
                  </tr>
                  <tr>
                    <td>NOW NOW</td>
                    <td>Wednesday</td>
                    <td>10:00 am</td>
                    <td>10:00 am</td>
                  </tr>
                  <tr>
                    <td>WESCO AMERICA MACH</td>
                    <td>Wednesday</td>
                    <td>10:00 am</td>
                    <td>10:00 am</td>
                  </tr>
                  <tr>
                    <td>ROYAL VAG</td>
                    <td>Wednesday</td>
                    <td>10:30 am</td>
                    <td>10:30 am</td>
                  </tr>
                  <tr>
                    <td>ROY VAG MC</td>
                    <td>Wednesday</td>
                    <td>10:30 am</td>
                    <td>10:30 am</td>
                  </tr>
                  <tr>
                    <td>VAG</td>
                    <td>Wednesday</td>
                    <td>11:00 am</td>
                    <td>11:00 am</td>
                  </tr>
                  <tr>
                    <td>GOLDEN STAR</td>
                    <td>Wednesday</td>
                    <td>11:15 am</td>
                    <td>11:15 am</td>
                  </tr>
                  <tr>
                    <td>CHAMPION</td>
                    <td>Wednesday</td>
                    <td>12:00 pm</td>
                    <td>12:00 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO BILLION</td>
                    <td>Wednesday</td>
                    <td>12:00 pm</td>
                    <td>12:00 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO BILLION MACH</td>
                    <td>Wednesday</td>
                    <td>12:00 pm</td>
                    <td>12:00 pm</td>
                  </tr>
                  <tr>
                    <td>Premier MK II</td>
                    <td>Wednesday</td>
                    <td>12:30 pm</td>
                    <td>12:45 pm</td>
                  </tr>
                  <tr>
                    <td>LUCKYSHINE</td>
                    <td>Wednesday</td>
                    <td>12:30 pm</td>
                    <td>12:30 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO GREEN</td>
                    <td>Wednesday</td>
                    <td>02:00 pm</td>
                    <td>02:00 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO GREEN MACH</td>
                    <td>Wednesday</td>
                    <td>02:00 pm</td>
                    <td>02:00 pm</td>
                  </tr>
                  <tr>
                    <td>UNLIMITED</td>
                    <td>Wednesday</td>
                    <td>02:00 pm</td>
                    <td>02:00 pm</td>
                  </tr>
                  <tr>
                    <td>NOON RUSH</td>
                    <td>Wednesday</td>
                    <td>02:00 pm</td>
                    <td>02:00 pm</td>
                  </tr>
                  <tr>
                    <td>GOLDEN SUPREME</td>
                    <td>Wednesday</td>
                    <td>02:15 pm</td>
                    <td>02:15 pm</td>
                  </tr>
                  <tr>
                    <td>ARENA</td>
                    <td>Wednesday</td>
                    <td>02:30 pm</td>
                    <td>02:30 pm</td>
                  </tr>
                  <tr>
                    <td>ARENA MC</td>
                    <td>Wednesday</td>
                    <td>02:30 pm</td>
                    <td>02:30 pm</td>
                  </tr>
                  <tr>
                    <td>Premier VAG</td>
                    <td>Wednesday</td>
                    <td>03:30 pm</td>
                    <td>03:45 pm</td>
                  </tr>
                  <tr>
                    <td>YAKATA</td>
                    <td>Wednesday</td>
                    <td>03:55 pm</td>
                    <td>03:55 pm</td>
                  </tr>
                  <tr>
                    <td>WAZOBIA</td>
                    <td>Wednesday</td>
                    <td>04:00 pm</td>
                    <td>04:00 pm</td>
                  </tr>
                  <tr>
                    <td>WAZOBIA MC</td>
                    <td>Wednesday</td>
                    <td>04:00 pm</td>
                    <td>04:00 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO BONUS</td>
                    <td>Wednesday</td>
                    <td>04:00 pm</td>
                    <td>04:00 pm</td>
                  </tr>
                  <tr>
                    <td>LUCKY GAME</td>
                    <td>Wednesday</td>
                    <td>04:00 pm</td>
                    <td>04:00 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO BONUS MACH</td>
                    <td>Wednesday</td>
                    <td>04:00 pm</td>
                    <td>04:00 pm</td>
                  </tr>
                  <tr>
                    <td>OLODODO</td>
                    <td>Wednesday</td>
                    <td>05:55 pm</td>
                    <td>05:55 pm</td>
                  </tr>
                  <tr>
                    <td>DESTINY</td>
                    <td>Wednesday</td>
                    <td>06:30 pm</td>
                    <td>06:30 pm</td>
                  </tr>
                  <tr>
                    <td>GOLDEN HOPE</td>
                    <td>Wednesday</td>
                    <td>07:15 pm</td>
                    <td>07:15 pm</td>
                  </tr>
                  <tr>
                    <td>Premier Enugu</td>
                    <td>Wednesday</td>
                    <td>07:30 pm</td>
                    <td>07:45 pm</td>
                  </tr>
                  <tr>
                    <td>HOL MID MC</td>
                    <td>Wednesday</td>
                    <td>07:30 pm</td>
                    <td>07:30 pm</td>
                  </tr>
                  <tr>
                    <td>MIDWEEK MC</td>
                    <td>Wednesday</td>
                    <td>07:30 pm</td>
                    <td>07:30 pm</td>
                  </tr>
                  <tr>
                    <td>GOLDEN VISION</td>
                    <td>Wednesday</td>
                    <td>07:55 pm</td>
                    <td>07:55 pm</td>
                  </tr>
                  <tr>
                    <td>Wesco Treasure</td>
                    <td>Wednesday</td>
                    <td>08:00 pm</td>
                    <td>08:00 pm</td>
                  </tr>
                  <tr>
                    <td>Wesco Treasure Mach</td>
                    <td>Wednesday</td>
                    <td>08:00 pm</td>
                    <td>08:00 pm</td>
                  </tr>
                  <tr>
                    <td>HOLIDAY MIDWEEK</td>
                    <td>Wednesday</td>
                    <td>08:00 pm</td>
                    <td>08:00 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO MIDWEEK</td>
                    <td>Wednesday</td>
                    <td>08:15 pm</td>
                    <td>08:15 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO MIDWEEK MACH</td>
                    <td>Wednesday</td>
                    <td>08:15 pm</td>
                    <td>08:15 pm</td>
                  </tr>
                  <tr>
                    <td>M-MIDWEEK</td>
                    <td>Wednesday</td>
                    <td>08:20 pm</td>
                    <td>08:20 pm</td>
                  </tr>
                  <tr>
                    <td>BANKER</td>
                    <td>Wednesday</td>
                    <td>08:30 pm</td>
                    <td>08:30 pm</td>
                  </tr>
                  <tr>
                    <td>BANKER MC</td>
                    <td>Wednesday</td>
                    <td>08:30 pm</td>
                    <td>08:30 pm</td>
                  </tr>
                  <tr>
                    <td>M-MIDWEEK</td>
                    <td>Wednesday</td>
                    <td>08:40 pm</td>
                    <td>08:40 pm</td>
                  </tr>
                  <tr>
                    <td>GREEN SPECIAL</td>
                    <td>Wednesday</td>
                    <td>09:00 pm</td>
                    <td>09:00 pm</td>
                  </tr>
                  <tr>
                    <td>GOLDEN BRAVO</td>
                    <td>Wednesday</td>
                    <td>09:15 pm</td>
                    <td>09:15 pm</td>
                  </tr>
                  <tr>
                    <td>ALHERI</td>
                    <td>Wednesday</td>
                    <td>09:25 pm</td>
                    <td>09:25 pm</td>
                  </tr>
                  <tr>
                    <td>CONFAM</td>
                    <td>Wednesday</td>
                    <td>10:00 pm</td>
                    <td>10:00 pm</td>
                  </tr>
                  <tr>
                    <td>Premier Lucky</td>
                    <td>Wednesday</td>
                    <td>10:30 pm</td>
                    <td>10:45 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO KEY</td>
                    <td>Wednesday</td>
                    <td>10:45 pm</td>
                    <td>10:45 pm</td>
                  </tr>
                  <tr>
                    <td>WESCO KEY MACH</td>
                    <td>Wednesday</td>
                    <td>10:45 pm</td>
                    <td>10:45 pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TimeTable;
