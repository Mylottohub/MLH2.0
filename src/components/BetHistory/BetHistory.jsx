import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HTTP from "../../utils/httpClient";

const BetHistory = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [betHistory, setBetHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBet, setSelectedBet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (bet) => {
    setSelectedBet(bet);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const fetchData = async () => {
    setIsLoading(true);
    const requestData = {
      operator_type: id,
    };
    const queryString = Object.keys(requestData)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(requestData[key])
      )
      .join("&");

    try {
      const response = await HTTP.get(
        `/user/bet-history/${userInfo.data.id}?page=${currentPage}&${queryString}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setBetHistory(response.data.data);
    } catch (error) {
      // console.error(`Error fetching ${id} games:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, currentPage]);

  const fetchDataTransact = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationLabel = (label) => {
    switch (label) {
      case "&laquo; Previous":
        return "Previous";
      case "Next &raquo;":
        return "Next";
      default:
        return label;
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filteredBetHistory = betHistory?.data?.filter((record) => {
      const isDateMatch =
        !selectedDate || moment(record.created_at).isSame(selectedDate, "day");
      const isStatusMatch =
        !document.getElementsByName("status")[0].value ||
        record.status === document.getElementsByName("status")[0].value;

      return isDateMatch && isStatusMatch;
    });

    setBetHistory({ ...betHistory, data: filteredBetHistory });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="container mt-5">
        <span className="hidden-xs hidden-sm">
          <h4 className="mb-4 text-capitalize">
            <strong>
              {id === "ghana_game"
                ? "5/90 Games"
                : id === "lotto_nigeria"
                ? "Set Lotto"
                : id === "green_lotto"
                ? "Green Lotto"
                : id === "green_ghana_game"
                ? "Green Ghana Game"
                : `${id}`}{" "}
              Bet History
            </strong>
          </h4>
        </span>
        <div className="div_lgrey hidden-sm hidden-xs">
          <form method="post" action="" onSubmit={handleFilterSubmit}>
            <table cellPadding="5" width="90%">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <span className="lead">Filter Option</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="demo">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="form-control"
                        placeholderText="Date Range"
                      />
                    </div>
                  </td>
                  <td>
                    <select name="status" className="form-control">
                      <option value="">Select Status</option>
                      <option value="Win">Win</option>
                      <option value="Lost">Lost</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td align="right">
                    <input
                      type="submit"
                      name="filter"
                      className="btn btn-blue btn-md"
                      value="Filter"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="table-responsive">
          <div className="app__transaction-web">
            {isLoading ? (
              <div className="spinner text-dark text-center mt-5">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            ) : betHistory?.data?.length === 0 ? (
              <div className="d-flex justify-content-center text-center p-5">
                <div className="hidden-xs hidden-sm mx-auto">
                  <div className="alert alert-danger text-center" role="alert">
                    No Record Found
                  </div>
                </div>
              </div>
            ) : (
              <table className="table table-express table-hover mt-5">
                <tbody>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">TICKET ID</th>
                    <th scope="col">GAME TYPE</th>
                    <th scope="col">GAME NAME</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">PLAY DATE</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </tbody>

                <tbody>
                  <>
                    {betHistory?.data
                      ?.sort(
                        (a, b) =>
                          new Date(b.created_at) - new Date(a.created_at)
                      )
                      .map((record, index) => {
                        const formattedDate = moment
                          .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                          .local()
                          .format("Do MMM YYYY | h:mm:ssA");
                        // console.log(record);

                        return (
                          <tr key={index} className="table-light transact">
                            <td>{index + 1}</td>
                            <td>
                              {id === "green_lotto" ? (
                                <td>{record?.TikcetId}</td>
                              ) : id === "green_ghana_game" ? (
                                <td>{record?.TikcetId}</td>
                              ) : id === "lotto_nigeria" ? (
                                <td>{record?.wagerID}</td>
                              ) : id === "wesco" ? (
                                <td>{record?.TikcetId}</td>
                              ) : (
                                <td>{record?.TSN}</td>
                              )}
                            </td>
                            <td>{record?.mgametype}</td>
                            <td>
                              {" "}
                              {id === "green_lotto" ? (
                                <td>{record?.drawname}</td>
                              ) : id === "green_ghana_game" ? (
                                <td>{record?.drawname}</td>
                              ) : id === "wesco" ? (
                                <td>{record?.drawname}</td>
                              ) : id === "lotto_nigeria" ? (
                                <td>{record?.drawAlias}</td>
                              ) : (
                                <td>{record?.GameName}</td>
                              )}
                            </td>
                            <td>{record?.status}</td>
                            <td>{formattedDate}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => openModal(record)}
                            >
                              View More &gt;&gt;{" "}
                            </td>
                          </tr>
                        );
                      })}
                  </>
                </tbody>
              </table>
            )}
          </div>
          <div className="app__transaction-mobile ">
            {isLoading ? (
              <div className="spinner text-dark text-center mt-5">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            ) : betHistory?.data?.length === 0 ? (
              <div className="d-flex justify-content-center text-center p-5">
                <div className="hidden-xs hidden-sm mx-auto">
                  <div className="alert alert-danger text-center" role="alert">
                    No Record Found
                  </div>
                </div>
              </div>
            ) : (
              <>
                {betHistory?.data
                  ?.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((record, index) => {
                    const formattedDate = moment
                      .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                      .local()
                      .format("Do MMM YYYY | h:mm:ssA");

                    return (
                      <div
                        key={index}
                        className="p-3 mb-5 mt-3"
                        style={{ background: "#f5f7f8" }}
                      >
                        <div>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="fw-bolder">Ticket ID:</span>
                            <span>
                              {id === "green_lotto" ? (
                                <td>{record?.TikcetId}</td>
                              ) : id === "green_ghana_game" ? (
                                <td>{record?.TikcetId}</td>
                              ) : id === "wesco" ? (
                                <td>{record?.TikcetId}</td>
                              ) : (
                                <td>{record?.TSN}</td>
                              )}
                            </span>
                          </p>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="fw-bolder">Game:</span>
                            <span>{record?.mgametype}</span>
                          </p>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="fw-bolder">Game Name: </span>
                            <span>
                              {" "}
                              {id === "green_lotto" ? (
                                <td>{record?.drawname}</td>
                              ) : id === "green_ghana_game" ? (
                                <td>{record?.drawname}</td>
                              ) : id === "wesco" ? (
                                <td>{record?.drawname}</td>
                              ) : (
                                <td>{record?.GameName}</td>
                              )}
                            </span>
                          </p>
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="fw-bolder">Status:</span>{" "}
                            <span>{record?.status}</span>
                          </p>

                          <p
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="fw-bolder">Play Date:</span>{" "}
                            <span>{formattedDate}</span>
                          </p>

                          <p
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="fw-bolder">Action:</span>{" "}
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => openModal(record)}
                            >
                              View More &gt;&gt;{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>

          <nav aria-label="Page navigation example mb-5">
            <ul className="pagination">
              {betHistory?.links?.map((link, index) => (
                <div key={index}>
                  <li className={`page-item ${link?.active ? "active" : ""}`}>
                    <a
                      className="page-link"
                      href={link?.url}
                      onClick={(e) => {
                        e.preventDefault();
                        fetchDataTransact(link?.label);
                      }}
                    >
                      {renderPaginationLabel(link?.label)}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </nav>
        </div>
        <br />
      </div>

      <Modal
        // backdrop="static"
        // keyboard={false}
        size="md"
        centered
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header
          id="close_btn"
          style={{ background: "#406777" }}
          closeButton
        >
          <p className="ms-auto text-center text-white">
            {id === "ghana_game" ? (
              <>
                <div>5/90</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : id === "lotto_nigeria" ? (
              <>
                <div>Set Lotto</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : id === "green_lotto" ? (
              <>
                <div>Green Lotto</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : id === "green_ghana_game" ? (
              <>
                <div>Green Ghana Game</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : (
              <>
                <div>{id}</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            )}
          </p>
        </Modal.Header>
        <Modal.Body>
          {selectedBet && (
            <div className="p-3">
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">TICKET ID:</span>{" "}
                <span>
                  {" "}
                  {id === "green_lotto" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : id === "green_ghana_game" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : id === "wesco" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : id === "lotto_nigeria" ? (
                    <span> {selectedBet?.wagerID}</span>
                  ) : (
                    <span> {selectedBet?.TSN}</span>
                  )}
                </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">LINES:</span>{" "}
                <span>{selectedBet?.line}</span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">DRAW DATE: </span>{" "}
                <span>
                  {id === "green_lotto" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : id === "green_ghana_game" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : id === "wesco" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : id === "lotto_nigeria" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawDate, "DD-MM-YYYY HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.DrawTime, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  )}
                </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">STATUS:</span>{" "}
                <span>{selectedBet?.status}</span>
              </p>

              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">PLAY DATE:</span>{" "}
                <span>
                  {moment
                    .utc(selectedBet?.date, "YYYY-MM-DD HH:mm:ss")
                    .local()
                    .format("Do MMM YYYY | h:mm:ssA")}
                </span>
              </p>

              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">SELECTION:</span>{" "}
                <span>
                  {" "}
                  {id === "green_lotto" ? (
                    <span>Green Lotto</span>
                  ) : id === "green_ghana_game" ? (
                    <span>Green Ghana Game</span>
                  ) : id === "lotto_nigeria" ? (
                    <span> Set Lotto</span>
                  ) : id === "lottomania" ? (
                    <span className="text-capitalize">Lottomania</span>
                  ) : id === "ghana_game" ? (
                    <span className="text-capitalize">5/90 Games</span>
                  ) : (
                    <span> {id}</span>
                  )}
                  {/* {id} */}
                </span>
              </p>

              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">TOTAL:</span>{" "}
                <span>{selectedBet?.amount}</span>
              </p>

              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">NUMBERS:</span>{" "}
                <span>{selectedBet?.num}</span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">GAME NAME:</span>{" "}
                <span>
                  {id === "green_lotto" ? (
                    <td>{selectedBet?.drawname}</td>
                  ) : id === "green_ghana_game" ? (
                    <td>{selectedBet?.drawname}</td>
                  ) : id === "wesco" ? (
                    <p> {selectedBet?.drawname}</p>
                  ) : id === "lotto_nigeria" ? (
                    <p> {selectedBet?.drawAlias}</p>
                  ) : (
                    <td> {selectedBet?.GameName}</td>
                  )}
                </span>
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Footer />
    </React.Fragment>
  );
};

export default BetHistory;
