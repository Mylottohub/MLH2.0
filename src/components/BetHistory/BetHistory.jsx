import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";
// import ViewMore from "./ViewMore";
// import BModal from "../BModal/BModal";
import { Modal } from "react-bootstrap";

const BetHistory = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [betHistory, setBetHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const requestData = { operator_type: id };
      const queryString = Object.keys(requestData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(requestData[key])
        )
        .join("&");
      try {
        const response = await fetch(
          `https://sandbox.mylottohub.com/v1/user/bet-history/${userInfo.data.id}?page=${currentPage}&${queryString}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setBetHistory(data.data);
      } catch (error) {
        console.error(`Error fetching ${id} games:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {}, [betHistory]);

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
                : `${id}`}{" "}
              Bet History
            </strong>
          </h4>
        </span>
        <div className="div_lgrey hidden-sm hidden-xs">
          <form method="post" action="">
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
                      <input
                        type="date"
                        name="daterange"
                        value=""
                        className="form-control"
                        id="config-demo"
                        placeholder="Date Range"
                      />
                      <i className="glyphicon glyphicon-calendar"></i>
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
                      className="btn btn-blue btn-lg"
                      value="Filter"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="table-responsive">
          <table className="table table-express table-hover mt-5">
            <tbody>
              <tr>
                <th scope="col">#</th>
                <th scope="col">TICKET ID</th>
                <th scope="col">GAME</th>
                <th scope="col">GAME NAME</th>
                <th scope="col">STATUS</th>
                <th scope="col">PLAY DATE</th>
                <th scope="col">ACTION</th>
              </tr>
            </tbody>

            <tbody>
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
                <tr>
                  <td
                    colSpan="8"
                    className="flex justify-center text-center p-5"
                  >
                    <div className="hidden-xs hidden-sm">
                      <p></p>
                      <div className="alert alert-danger" role="alert">
                        No Record Found
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {betHistory?.data?.map((record, index) => {
                    const formattedDate = moment
                      .utc(record?.created_at, "YYYY-MM-DD HH:mm:ss")
                      .local()
                      .format("Do MMM YYYY | h:mm:ssA");

                    return (
                      <tr key={index} className="table-light">
                        <td>{index + 1}</td>
                        <td>{record?.TSN}</td>
                        <td>{record?.mgametype}</td>
                        <td>{record?.GameName}</td>
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
              )}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
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
        backdrop="static"
        keyboard={false}
        size="md"
        centered
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header style={{ background: "#406777" }} closeButton>
          <p className="ms-auto text-white">
            {id === "ghana_game" ? (
              <div>5/90 Games</div>
            ) : id === "lotto_nigeria" ? (
              <div>Set Lotto</div>
            ) : (
              <div>{id} Bet History</div>
            )}
          </p>

          <span id="modal_head" className="text-white">
            {selectedBet?.mgametype}
          </span>
        </Modal.Header>
        <Modal.Body>
          {selectedBet && (
            <div className="p-3">
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">TICKET ID:</span>{" "}
                <span>{selectedBet.TSN}</span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">LINES:</span>{" "}
                <span>{selectedBet.line}</span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">DRAW DATE: </span>{" "}
                <span>
                  {moment
                    .utc(selectedBet.DrawTime, "YYYY-MM-DD HH:mm:ss")
                    .local()
                    .format("Do MMM YYYY | h:mm:ssA")}
                </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">STATUS:</span>{" "}
                <span>{selectedBet.status}</span>
              </p>

              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">PLAY DATE:</span>{" "}
                <span>
                  {moment
                    .utc(selectedBet.created_at, "YYYY-MM-DD HH:mm:ss")
                    .local()
                    .format("Do MMM YYYY | h:mm:ssA")}
                </span>
              </p>

              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">SELECTION:</span>{" "}
                <span>{selectedBet.SelectionType}</span>
              </p>

              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">TOTAL:</span>{" "}
                <span>{selectedBet.amount}</span>
              </p>

              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">NUMBERS:</span>{" "}
                <span>{selectedBet.num}</span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">GAME NAME:</span>{" "}
                <span>{selectedBet.GameName}</span>
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