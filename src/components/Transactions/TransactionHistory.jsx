import Navbar from "../Navbar";
import "../../assets/css/table.css";
import HTTP from "../../utils/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import Footer from "../Footer";
import { Modal } from "react-bootstrap";
import { useGetProfileUser } from "../../react-query";

const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [deposit, setDeposit] = useState([]);
  const [withdraw, setWithdraw] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("ghana_game");

  const [betHistory, setBetHistory] = useState([]);
  const [selectedBet, setSelectedBet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalGolden, setShowModalGolden] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const openModal = (bet) => {
    setSelectedBet(bet);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const configHeaders = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchData = () => {
    setIsLoading(true);
    HTTP.get(
      `/user/transaction/${userInfo.data.id}?page=${currentPage}&search=${searchQuery}`,
      {
        ...configHeaders,
      }
    )
      .then((response) => {
        setTransaction(response.data.data);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchDeposit = () => {
    setIsLoading(true);
    HTTP.get(
      `/user/deposit/transaction/${userInfo.data.id}?page=${currentPage}`,
      {
        ...configHeaders,
      }
    )
      .then((response) => {
        setDeposit(response.data.data);
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchWinnings = () => {
    setIsLoading(true);
    HTTP.get(
      `/user/winnings/transaction/${userInfo.data.id}?page=${currentPage}`,
      {
        ...configHeaders,
      }
    )
      .then((response) => {
        setWithdraw(response.data.data);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchDataBetHistory = async () => {
    if (selectedOperator) {
      setIsLoading(true);
      const requestData = {
        operator_type: selectedOperator,
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

        setBetHistory(response?.data?.data?.data);
      } catch (error) {
        // console.error(`Error fetching ${selectedOperator} games:`, error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchDeposit();
    fetchWinnings();
  }, [userInfo.token, currentPage]);

  useEffect(() => {
    fetchDataBetHistory();
  }, [selectedOperator, currentPage]);
  const fetchDataTransact = (page) => {
    setCurrentPage(page);
  };
  const { userProfileTempToken, userProfileResponse } = useGetProfileUser([]);
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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTransactions = transaction.data?.filter((record) =>
    [record.ref, record.type, record.channel]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredDepositTransactions = deposit.data?.filter((record) =>
    [record.ref, record.type, record.channel]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const filteredWithdrawTransactions = withdraw.data?.filter((record) =>
    [record.ref, record.type, record.channel]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleCloseModal = async () => {
    setShowModal(false);
    setIframeUrl("");
    setIsIframeLoading(false);

    try {
      const payload = {
        user_id: userProfileResponse?.id,
      };

      await HTTP.post("/update_temp_token", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      // console.error(
      //   "Error updating temp token:",
      //   error.response?.data || error.message
      // );
    }
  };

  // Function to handle modal open
  const handleOpenModal = (url) => {
    setIframeUrl(url);
    setIsIframeLoading(true);
    setShowModalGolden(true);
  };

  // Function to handle iframe load
  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };
  return (
    <>
      {/* Modal for Golden Chance Iframe */}
      <div
        className={`modal fade ${showModalGolden ? "show" : ""}`}
        style={{ display: showModalGolden ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Golden Chance Lotto</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body position-relative">
              {isIframeLoading && (
                <div className="spinner-overlay">
                  <Spinner
                    animation="border"
                    role="status"
                    className="text-dark"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              <iframe
                src={iframeUrl}
                className="w-100 h-100"
                title="Golden Chance Lotto"
                onLoad={handleIframeLoad}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      <div className="container p-4 mt-5 app__transact-table mb-5">
        {/* <h5 className="fw-bold">Transaction History</h5> */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              All Transactions History
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              Deposit History
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Winning History
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="bet-tab"
              data-bs-toggle="tab"
              data-bs-target="#bet-tab-pane"
              type="button"
              role="tab"
              aria-controls="bet-tab-pane"
              aria-selected="false"
            >
              Bet History
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex="0"
          >
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
            ) : transaction?.data?.length === 0 ? (
              <div className="d-flex justify-content-center text-center p-5">
                <div className="hidden-xs hidden-sm mx-auto">
                  <div className="alert alert-danger text-center" role="alert">
                    No Record Found
                  </div>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <div className="mb-2 mt-4 sports__code">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Ticket ID, Type or Channel"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <table className="table table-express app__transaction-web table-hover mt-4">
                  <tbody>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">REFERENCE ID</th>
                      <th scope="col">TYPE</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">AMOUNT</th>
                      <th scope="col">CHANNEL</th>
                      <th scope="col">CURRENT BAL</th>
                      <th scope="col">DATE</th>
                    </tr>
                  </tbody>

                  <tbody>
                    <>
                      {filteredTransactions
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");

                          return (
                            <tr key={index} className="transact table-light">
                              <td>{index + 1}</td>
                              <td>{record?.ref}</td>
                              <td>{record?.type}</td>
                              <td>{record?.description}</td>
                              <td>₦{record?.amount}</td>
                              <td>{record?.channel}</td>
                              <td>₦{record?.abalance}</td>
                              <td>{formattedDate}</td>
                            </tr>
                          );
                        })}
                    </>
                  </tbody>
                </table>

                <div className="app__transaction-mobile">
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
                  ) : transaction?.data?.length === 0 ? (
                    <div className="d-flex justify-content-center text-center p-5">
                      <div className="hidden-xs hidden-sm mx-auto">
                        <div
                          className="alert alert-danger text-center"
                          role="alert"
                        >
                          No Record Found
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {filteredTransactions
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");
                          return (
                            <div
                              key={index}
                              className="p-3 mb-5 mt-3 app__transaction-mobile"
                              style={{ background: "#f5f7f8" }}
                            >
                              <div>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Reference:</span>
                                  <span>{record?.ref}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Type:</span>
                                  <span>{record?.type}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">
                                    Description:{" "}
                                  </span>
                                  <span>{record?.description}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Amount:</span>{" "}
                                  <span>₦{record?.amount}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Channel:</span>{" "}
                                  <span>{record?.channel}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">
                                    Current Balance:
                                  </span>{" "}
                                  <span>₦{record?.abalance}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Date:</span>{" "}
                                  <span>{formattedDate}</span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </div>

                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {transaction?.links?.map((link, index) => (
                      <div key={index}>
                        <li
                          className={`page-item ${
                            link?.active ? "active" : ""
                          }`}
                        >
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
            )}
          </div>

          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
            tabIndex="0"
          >
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
            ) : deposit?.data?.length === 0 ? (
              <div className="d-flex justify-content-center text-center p-5">
                <div className="hidden-xs hidden-sm mx-auto">
                  <div className="alert alert-danger text-center" role="alert">
                    No Record Found
                  </div>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <div className="mb-2 mt-4 sports__code">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Ticket ID, Type or Channel"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <table className="table table-express app__transaction-web table-hover mt-4">
                  <tbody>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">REFERENCE ID</th>
                      <th scope="col">TYPE</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">AMOUNT</th>
                      <th scope="col">CHANNEL</th>
                      <th scope="col">CURRENT BAL</th>
                      <th scope="col">DATE</th>
                    </tr>
                  </tbody>

                  <tbody>
                    <>
                      {filteredDepositTransactions
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");

                          return (
                            <tr key={index} className="transact table-light">
                              <td>{index + 1}</td>
                              <td>{record?.ref}</td>
                              <td>{record?.type}</td>
                              <td>{record?.description}</td>
                              <td>₦{record?.amount}</td>
                              <td>{record?.channel}</td>
                              <td>₦{record?.abalance}</td>
                              <td>{formattedDate}</td>
                            </tr>
                          );
                        })}
                    </>
                  </tbody>
                </table>

                <div className="app__transaction-mobile">
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
                  ) : deposit?.data?.length === 0 ? (
                    <div className="d-flex justify-content-center text-center p-5">
                      <div className="hidden-xs hidden-sm mx-auto">
                        <div
                          className="alert alert-danger text-center"
                          role="alert"
                        >
                          No Record Found
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {filteredDepositTransactions
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");
                          return (
                            <div
                              key={index}
                              className="p-3 mb-5 mt-3 app__transaction-mobile"
                              style={{ background: "#f5f7f8" }}
                            >
                              <div>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Reference:</span>
                                  <span>{record?.ref}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Type:</span>
                                  <span>{record?.type}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">
                                    Description:{" "}
                                  </span>
                                  <span>{record?.description}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Amount:</span>{" "}
                                  <span>₦{record?.amount}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Channel:</span>{" "}
                                  <span>{record?.channel}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">
                                    Current Balance:
                                  </span>{" "}
                                  <span>₦{record?.abalance}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Date:</span>{" "}
                                  <span>{formattedDate}</span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </div>

                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {deposit?.links?.map((link, index) => (
                      <div key={index}>
                        <li
                          className={`page-item ${
                            link?.active ? "active" : ""
                          }`}
                        >
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
            )}
          </div>

          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex="0"
          >
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
            ) : withdraw?.data?.length === 0 ? (
              <div className="d-flex justify-content-center text-center p-5">
                <div className="hidden-xs hidden-sm mx-auto">
                  <div className="alert alert-danger text-center" role="alert">
                    No Record Found
                  </div>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <div className="mb-2 mt-4 sports__code">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Ticket ID, Type or Channel"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <table className="table table-express app__transaction-web table-hover mt-4">
                  <tbody>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">REFERENCE ID</th>
                      <th scope="col">TYPE</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">AMOUNT</th>
                      <th scope="col">CHANNEL</th>
                      <th scope="col">CURRENT BAL</th>
                      <th scope="col">DATE</th>
                    </tr>
                  </tbody>

                  <tbody>
                    <>
                      {filteredWithdrawTransactions
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");

                          return (
                            <tr key={index} className="transact table-light">
                              <td>{index + 1}</td>
                              <td>{record && record.ref ? record.ref : "-"}</td>
                              <td>{record?.type}</td>
                              <td>{record?.description}</td>
                              <td>₦{record?.amount}</td>
                              <td>{record?.channel}</td>
                              <td>₦{record?.abalance}</td>
                              <td>{formattedDate}</td>
                            </tr>
                          );
                        })}
                    </>
                  </tbody>
                </table>

                <div className="app__transaction-mobile">
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
                  ) : withdraw?.data?.length === 0 ? (
                    <div className="d-flex justify-content-center text-center p-5">
                      <div className="hidden-xs hidden-sm mx-auto">
                        <div
                          className="alert alert-danger text-center"
                          role="alert"
                        >
                          No Record Found
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {filteredWithdrawTransactions
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");
                          return (
                            <div
                              key={index}
                              className="p-3 mb-5 mt-3 app__transaction-mobile"
                              style={{ background: "#f5f7f8" }}
                            >
                              <div>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Reference:</span>
                                  <span>
                                    {record && record.ref ? record.ref : "-"}
                                  </span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Type:</span>
                                  <span>{record?.type}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">
                                    Description:{" "}
                                  </span>
                                  <span>{record?.description}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Amount:</span>{" "}
                                  <span>₦{record?.amount}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Channel:</span>{" "}
                                  <span>{record?.channel}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">
                                    Current Balance:
                                  </span>{" "}
                                  <span>₦{record?.abalance}</span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Date:</span>{" "}
                                  <span>{formattedDate}</span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </>
                  )}
                </div>

                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {withdraw?.links?.map((link, index) => (
                      <div key={index}>
                        <li
                          className={`page-item ${
                            link?.active ? "active" : ""
                          }`}
                        >
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
            )}
          </div>

          <div
            className="tab-pane fade"
            id="bet-tab-pane"
            role="tabpanel"
            aria-labelledby="bet-tab"
            tabIndex="0"
          >
            <div className="mb-3 position-relative">
              <select
                className="form-select mb-2 mt-4 app__bet-history"
                value={selectedOperator}
                onChange={(e) => setSelectedOperator(e.target.value)}
              >
                <option value="">Select Operator</option>
                <option value="golden_chance">Golden Chance</option>
                <option value="ghana_game">5/90 Games</option>
                <option value="wesco">Wesco</option>
                <option value="green_lotto">Green lotto</option>
                {/* <option value="27">Baba Ijebu</option> */}
                <option value="lottomania">Lottomania</option>
                <option value="lotto_nigeria">Set Lotto</option>
                <option value="green_ghana_game">Green Ghana Games</option>
                <option value="gd_lotto">Gd Lotto</option>
                <option value="gh_5_90">GH 5/90</option>
                <option value="gd_jackpot">Gd Jackpot</option>
                <option value="nnp">NNP</option>
              </select>
              <i
                className="bi bi-chevron-down position-absolute"
                style={{ right: "16px", top: "calc(50% - 0.5em)" }}
              ></i>
            </div>
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
              <div className="table-responsive">
                {/* <div className="mb-2 mt-4 sports__code">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Ticket ID, Type or Channel"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div> */}
                <table className="table table-express app__transaction-web table-hover mt-4">
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
                      {betHistory
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");
                          // console.log("ddf", record);

                          return (
                            <tr key={index} className="table-light transact">
                              <td>{index + 1}</td>
                              <td>
                                {selectedOperator === "green_lotto" ? (
                                  <td>{record?.TikcetId}</td>
                                ) : selectedOperator === "green_ghana_game" ? (
                                  <td>{record?.TikcetId}</td>
                                ) : selectedOperator === "lotto_nigeria" ? (
                                  <td>{record?.wagerID}</td>
                                ) : selectedOperator === "wesco" ? (
                                  <td>{record?.TikcetId}</td>
                                ) : selectedOperator === "gd_lotto" ? (
                                  <td>{record?.TikcetId}</td>
                                ) : selectedOperator === "gh_5_90" ? (
                                  <td>{record?.TikcetId}</td>
                                ) : selectedOperator === "gd_jackpot" ? (
                                  <td>{record?.TikcetId}</td>
                                ) : selectedOperator === "golden_chance" ? (
                                  <td>{record?.TikcetId}</td>
                                ) : selectedOperator === "nnp" ? (
                                  <td>{record?.TikcetId}</td>
                                ) : (
                                  <td>{record?.TSN}</td>
                                )}
                              </td>
                              <td>
                                {selectedOperator === "golden_chance" ? (
                                  <span
                                    onClick={() => {
                                      const uid = userProfileResponse?.id;
                                      // const tempToken = userProfileTempToken;

                                      if (uid && userProfileTempToken) {
                                        const url = `https://goldenchancelotto.com/lotto-iframe/play-now?IntegrationCode=mlh&AffiliateCustomerUID=${uid}&TempToken=${userProfileTempToken}`;
                                        handleOpenModal(url);
                                      }
                                    }}
                                    className="btn btn-blue"
                                  >
                                    View Here
                                  </span>
                                ) : (
                                  record?.mgametype || "-"
                                )}
                              </td>

                              <td>
                                {" "}
                                {selectedOperator === "green_lotto" ? (
                                  <td>{record?.drawname}</td>
                                ) : selectedOperator === "green_ghana_game" ? (
                                  <td>{record?.drawname}</td>
                                ) : selectedOperator === "wesco" ? (
                                  <td>{record?.drawname}</td>
                                ) : selectedOperator === "gd_lotto" ? (
                                  <td>{record?.drawname}</td>
                                ) : selectedOperator === "gh_5_90" ? (
                                  <td>{record?.drawname}</td>
                                ) : selectedOperator === "gd_jackpot" ? (
                                  <td>{record?.drawname}</td>
                                ) : selectedOperator === "nnp" ? (
                                  <td>{record?.drawname}</td>
                                ) : selectedOperator === "golden_chance" ? (
                                  <td>{record?.operator_type}</td>
                                ) : selectedOperator === "lotto_nigeria" ? (
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

                <>
                  <div className="app__transaction-mobile">
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
                          <div
                            className="alert alert-danger text-center"
                            role="alert"
                          >
                            No Record Found
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {betHistory
                          ?.sort(
                            (a, b) =>
                              new Date(b.created_at) - new Date(a.created_at)
                          )
                          .map((record, index) => {
                            const formattedDate = moment
                              .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                              .local()
                              .format("Do MMM YYYY | h:mm:ssA");

                            return (
                              <div
                                key={index}
                                className={`mb-5 mt-3 ${
                                  selectedOperator === "golden_chance"
                                    ? ""
                                    : "p-3"
                                }`}
                                style={{ background: "#f5f7f8" }}
                              >
                                <div>
                                  <p
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span className="fw-bolder">
                                      Ticket ID:
                                    </span>
                                    <span>
                                      {selectedOperator === "green_lotto" ? (
                                        <td>{record?.TikcetId}</td>
                                      ) : selectedOperator ===
                                        "green_ghana_game" ? (
                                        <td>{record?.TikcetId}</td>
                                      ) : selectedOperator === "wesco" ? (
                                        <td>{record?.TikcetId}</td>
                                      ) : selectedOperator ===
                                        "golden_chance" ? (
                                        <td>{record?.TikcetId}</td>
                                      ) : selectedOperator === "gd_lotto" ? (
                                        <td>{record?.TikcetId}</td>
                                      ) : selectedOperator === "gh_5_90" ? (
                                        <td>{record?.TikcetId}</td>
                                      ) : selectedOperator === "gd_jackpot" ? (
                                        <td>{record?.TikcetId}</td>
                                      ) : selectedOperator === "nnp" ? (
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
                                      alignItems: "center",
                                    }}
                                  >
                                    <span className="fw-bolder">Game:</span>
                                    <span> {record?.mgametype || "-"}</span>

                                    {selectedOperator === "golden_chance" && (
                                      <>
                                        <button
                                          onClick={() => {
                                            const uid = userProfileResponse?.id;
                                            const tempToken =
                                              userProfileTempToken;

                                            if (uid && tempToken) {
                                              const url = `https://goldenchancelotto.com/lotto-iframe/play-now?IntegrationCode=mlh&AffiliateCustomerUID=${uid}&TempToken=${tempToken}`;
                                              handleOpenModal(url);
                                            }
                                          }}
                                          className="btn btn-blue"
                                        >
                                          View Here
                                        </button>
                                      </>
                                    )}
                                  </p>

                                  <p
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <span className="fw-bolder">
                                      Game Name:{" "}
                                    </span>
                                    <span>
                                      {" "}
                                      {selectedOperator === "green_lotto" ? (
                                        <td>{record?.drawname}</td>
                                      ) : selectedOperator ===
                                        "green_ghana_game" ? (
                                        <td>{record?.drawname}</td>
                                      ) : selectedOperator === "wesco" ? (
                                        <td>{record?.drawname}</td>
                                      ) : selectedOperator === "gd_lotto" ? (
                                        <td>{record?.drawname}</td>
                                      ) : selectedOperator ===
                                        "golden_chance" ? (
                                        <td>{record?.operator_type}</td>
                                      ) : selectedOperator === "gh_5_90" ? (
                                        <td>{record?.drawname}</td>
                                      ) : selectedOperator === "gd_jackpot" ? (
                                        <td>{record?.drawname}</td>
                                      ) : selectedOperator === "nnp" ? (
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
                                    <span className="fw-bolder">
                                      Play Date:
                                    </span>{" "}
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
                                      View Here &gt;&gt;{" "}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                </>

                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {withdraw?.links?.map((link, index) => (
                      <div key={index}>
                        <li
                          className={`page-item ${
                            link?.active ? "active" : ""
                          }`}
                        >
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
            )}
          </div>
        </div>
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
            {selectedOperator === "ghana_game" ? (
              <>
                <div>5/90</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : selectedOperator === "lotto_nigeria" ? (
              <>
                <div>Set Lotto</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : selectedOperator === "green_lotto" ? (
              <>
                <div>Green Lotto</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : selectedOperator === "green_ghana_game" ? (
              <>
                <div>Green Ghana Game</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : selectedOperator === "gd_lotto" ? (
              <>
                <div>Gd Lotto</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : selectedOperator === "gh_5_90" ? (
              <>
                <div>GH 5/90</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : selectedOperator === "gd_jackpot" ? (
              <>
                <div>GD Jackpot</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : selectedOperator === "nnp" ? (
              <>
                <div>NNP</div>
                <span className="text-white text-center">
                  {selectedBet?.mgametype}
                </span>
              </>
            ) : selectedOperator === "golden_chance" ? (
              <>
                <div>Golden Chance</div>
                <span className="text-white text-center">
                  {/* {selectedBet?.mgametype} */}
                </span>
              </>
            ) : (
              <>
                <div>{selectedOperator}</div>
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
                  {selectedOperator === "green_lotto" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : selectedOperator === "green_ghana_game" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : selectedOperator === "wesco" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : selectedOperator === "gd_lotto" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : selectedOperator === "gh_5_90" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : selectedOperator === "gd_jackpot" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : selectedOperator === "golden_chance" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : selectedOperator === "nnp" ? (
                    <span> {selectedBet?.TikcetId}</span>
                  ) : selectedOperator === "lotto_nigeria" ? (
                    <span> {selectedBet?.wagerID}</span>
                  ) : (
                    <span> {selectedBet?.TSN}</span>
                  )}
                </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">LINES:</span>{" "}
                <span>{selectedBet?.line}</span>
                {selectedOperator === "golden_chance" && (
                  <button
                    onClick={() => {
                      const uid = userProfileResponse?.id;
                      const tempToken = userProfileTempToken;

                      if (uid && tempToken) {
                        const url = `https://goldenchancelotto.com/lotto-iframe/play-now?IntegrationCode=mlh&AffiliateCustomerUID=${uid}&TempToken=${tempToken}`;
                        handleOpenModal(url);
                      }
                    }}
                    className="btn btn-blue"
                  >
                    View Here
                  </button>
                )}
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">DRAW DATE: </span>{" "}
                <span>
                  {selectedOperator === "green_lotto" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : selectedOperator === "green_ghana_game" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : selectedOperator === "golden_chance" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.date, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : selectedOperator === "gd_lotto" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : selectedOperator === "gh_5_90" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : selectedOperator === "gd_jackpot" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : selectedOperator === "nnp" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : selectedOperator === "wesco" ? (
                    <span>
                      {" "}
                      {moment
                        .utc(selectedBet?.drawdate, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("Do MMM YYYY | h:mm:ssA")}
                    </span>
                  ) : selectedOperator === "lotto_nigeria" ? (
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
                  {selectedOperator === "green_lotto" ? (
                    <span>Green Lotto</span>
                  ) : selectedOperator === "green_ghana_game" ? (
                    <span>Green Ghana Game</span>
                  ) : selectedOperator === "lotto_nigeria" ? (
                    <span> Set Lotto</span>
                  ) : selectedOperator === "lottomania" ? (
                    <span className="text-capitalize">Lottomania</span>
                  ) : selectedOperator === "ghana_game" ? (
                    <span className="text-capitalize">5/90 Games</span>
                  ) : selectedOperator === "gd_lotto" ? (
                    <span className="text-capitalize">Gd Lotto</span>
                  ) : selectedOperator === "gh_5_90" ? (
                    <span className="text-capitalize">GH 5/90</span>
                  ) : selectedOperator === "gd_jackpot" ? (
                    <span className="text-capitalize">Gd Jackpot</span>
                  ) : selectedOperator === "nnp" ? (
                    <span className="text-capitalize">NNP</span>
                  ) : selectedOperator === "golden_chance" ? (
                    <span className="text-capitalize">Golden Chance</span>
                  ) : (
                    <span> {selectedOperator}</span>
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
                <span>
                  {" "}
                  {selectedOperator === "gd_jackpot" ? (
                    <>
                      {selectedBet?.gh_570_num && (
                        <span>GH 70: {selectedBet.gh_570_num} </span>
                      )}
                      {selectedBet?.gh_580_num && (
                        <span>GH 80: {selectedBet.gh_580_num} </span>
                      )}
                      {selectedBet?.gh_590_num && (
                        <span>GH 90: {selectedBet.gh_590_num} </span>
                      )}
                    </>
                  ) : (
                    selectedBet?.num
                  )}
                  {selectedOperator === "golden_chance" && (
                    <button
                      onClick={() => {
                        const uid = userProfileResponse?.id;
                        const tempToken = userProfileTempToken;

                        if (uid && tempToken) {
                          const url = `https://goldenchancelotto.com/lotto-iframe/play-now?IntegrationCode=mlh&AffiliateCustomerUID=${uid}&TempToken=${tempToken}`;
                          handleOpenModal(url);
                        }
                      }}
                      className="btn btn-blue"
                    >
                      View Here
                    </button>
                  )}
                </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="fw-bolder">GAME NAME:</span>{" "}
                <span>
                  {selectedOperator === "green_lotto" ? (
                    <td>{selectedBet?.drawname}</td>
                  ) : selectedOperator === "green_ghana_game" ? (
                    <td>{selectedBet?.drawname}</td>
                  ) : selectedOperator === "wesco" ? (
                    <p> {selectedBet?.drawname}</p>
                  ) : selectedOperator === "gd_lotto" ? (
                    <p> {selectedBet?.drawname}</p>
                  ) : selectedOperator === "gh_5_90" ? (
                    <p> {selectedBet?.drawname}</p>
                  ) : selectedOperator === "gd_jackpot" ? (
                    <p> {selectedBet?.drawname}</p>
                  ) : selectedOperator === "nnp" ? (
                    <p> {selectedBet?.drawname}</p>
                  ) : selectedOperator === "lotto_nigeria" ? (
                    <p> {selectedBet?.drawAlias}</p>
                  ) : selectedOperator === "golden_chance" ? (
                    <p> {selectedBet?.operator_type}</p>
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
    </>
  );
};

export default TransactionHistory;
