import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/timetable.css";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import HTTP from "../utils/httpClient";
import { Spinner } from "react-bootstrap";
import moment from "moment";

const TimeTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [filteredTimetable, setFilteredTimetable] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo && userInfo.token;

  const configHeaders = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setSelectedOperator(e.target.value);
  };

  const fetchData = () => {
    setIsLoading(true);
    HTTP.get(`/mylotto_get_timetable`, { ...configHeaders })
      .then((response) => {
        setIsLoading(false);
        setTimetable(response.data.data);
        filterTimetable(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const filterTimetable = (data) => {
    const currentDay = moment().format("dddd");
    const currentDayTimetable = data.filter((record) => record.day === currentDay);
    setFilteredTimetable(currentDayTimetable);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <React.Fragment>
      <Navbar />
      <Slider />
      <div className="service-area service-area2 service-area3">
        <div className="container">
          <div className="row">
            {isLoading ? (
              <div
                style={{ marginTop: "320px", textAlign: "center" }}
                className="me-auto"
              >
                <tr>
                  <td colSpan="7" className="text-center p-2 w-100">
                    <Spinner color="#fff" loading={isLoading} size={20} />
                  </td>
                </tr>
              </div>
            ) : (
              <>
                <div className="col-md-4">
                  <p>
                    <strong>Filter Options</strong>
                  </p>
                  <br />
                  <div style={{ marginTop: "12px" }} className="div_lgrey">
                    <form
                      method="post"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const filtered = timetable.filter(
                          (record) =>
                            (selectedDay === "" || record.day === selectedDay) &&
                            (selectedOperator === "" ||
                              record.operator.toString() === selectedOperator)
                        );
                        setFilteredTimetable(filtered);
                      }}
                    >
                      <table cellPadding="5" width="90%">
                        <tbody>
                          <tr>
                            <td>
                              <select
                                name="operator"
                                className="form-select"
                                onChange={handleOperatorChange}
                                value={selectedOperator}
                              >
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
                              <select
                                name="day"
                                className="form-select"
                                onChange={handleDayChange}
                                value={selectedDay}
                              >
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
                  <strong className="mb-5">Timetable</strong>
                  <table className="table table-express mt-5">
                    <tbody>
                      <tr>
                        <th>GAME</th>
                        <th>DAY</th>
                        <th>CLOSING TIME</th>
                        <th>DRAW TIME</th>
                      </tr>
                    </tbody>
                    {filteredTimetable.length > 0
                      ? filteredTimetable
                          .sort((a, b) => {
                            const timeA = new Date(`1970-01-01T${a.start_time}`);
                            const timeB = new Date(`1970-01-01T${b.start_time}`);
                            return timeA - timeB;
                          })
                          .map((record, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>{record?.name}</td>
                                <td>{record?.day}</td>
                                <td>{record?.start_time}</td>
                                <td>{record?.end_time}</td>
                              </tr>
                            </tbody>
                          ))
                      : timetable
                          .filter(
                            (record) =>
                              moment().format("dddd") === record.day
                          )
                          .sort((a, b) => {
                            const timeA = new Date(`1970-01-01T${a.start_time}`);
                            const timeB = new Date(`1970-01-01T${b.start_time}`);
                            return timeA - timeB;
                          })
                          .map((record, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>{record?.name}</td>
                                <td>{record?.day}</td>
                                <td>{record?.start_time}</td>
                                <td>{record?.end_time}</td>
                              </tr>
                            </tbody>
                          ))}
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TimeTable;
