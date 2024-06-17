import Navbar from "../Navbar";
import "../../assets/css/table.css";
import HTTP from "../../utils/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import Footer from "../Footer";

const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [deposit, setDeposit] = useState([]);
  const [withdraw, setWithdraw] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchDepositQuery, setSearchDepositQuery] = useState("");

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

  useEffect(() => {
    fetchData();
    fetchDeposit();
    fetchWinnings();
  }, [userInfo.token, currentPage]);
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

  return (
    <>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TransactionHistory;
