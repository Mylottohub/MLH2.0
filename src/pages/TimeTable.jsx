import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/timetable.css";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import HTTP from "../utils/httpClient";
import { Spinner } from "react-bootstrap";

const TimeTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const token = userInfo && userInfo.token;

  const configHeaders = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = () => {
    setIsLoading(true);
    const params = {
      operator: selectedOperator,
      day: selectedDay,
    };
    HTTP.get(`/mylotto_get_timetable`, { ...configHeaders, params })
      .then((response) => {
        setTimetable(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [selectedOperator, selectedDay, setTimetable, token]);

  const handleOperatorChange = (event) => {
    setSelectedOperator(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <React.Fragment>
      <Navbar />
      <Slider />
      <div className="service-area service-area2 service-area3">
        <div className="container">
          <div className="row">
            {isLoading ? (
              <div className="spinner text-dark text-center">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <>
                <div className="col-md-4">
                  <p>
                    <strong>Filter Options</strong>
                  </p>
                  <br />
                  <div style={{ marginTop: "12px" }} className="div_lgrey">
                    <form method="post" action="" onSubmit={handleFilterSubmit}>
                      <table
                        className="table-responsive"
                        cellPadding="5"
                        width="90%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <select
                                name="operator"
                                className="form-select"
                                value={selectedOperator}
                                onChange={handleOperatorChange}
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
                                value={selectedDay}
                                onChange={handleDayChange}
                                className="form-select"
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
                  <div>
                    <table className="table table-express mt-5">
                      <tbody>
                        <tr>
                          <th>GAME</th>
                          <th>DAY</th>
                          <th>CLOSING TIME</th>
                          <th>DRAW TIME</th>
                        </tr>
                      </tbody>

                      {timetable.map((record, index) => (
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
