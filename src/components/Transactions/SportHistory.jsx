import Navbar from "../Navbar";
import "../../assets/css/sport-table.css";
import HTTP from "../../utils/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import Footer from "../Footer";

const SportHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
    const operatorType = "easywin";
    HTTP.get(
      `/user/sport-history/${userInfo.data.id}?page=${currentPage}&operator_type=${operatorType}`,
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

  useEffect(() => {
    fetchData();
  }, [userInfo.token, currentPage]);
  const fetchDataTransact = (page) => {
    setCurrentPage(page);
  };
  // console.log(deposit);

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
              Sport Transactions History
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
                <table className="table table-express app__transaction-web table-hover mt-4">
                  <tbody>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">REFERENCE ID</th>
                      <th scope="col">AMOUNT PLAYED</th>
                      <th scope="col">AMOUNT WON</th>
                      <th scope="col">CODE</th>
                      <th scope="col">DATE</th>
                      <th scope="col">STATUS</th>
                    </tr>
                  </tbody>

                  {/* <tbody>
                    <>
                      {transaction?.data
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.created_at, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");
                          let statusText;
                          switch (record?.status) {
                            case 0:
                              statusText = "Lost";
                              break;
                            case 1:
                              statusText = "Won";
                              break;
                            default:
                              statusText = "Pending";
                          }
                          return (
                            <tr key={index} className="table-light">
                              <td>{index + 1}</td>
                              <td>{record?.reference}</td>
                              <td>₦{record?.amount}</td>
                              <td>₦{record?.winmoney}</td>
                              <td>{record?.code}</td>
                              <td>{formattedDate}</td>
                              <td>{statusText}</td>
                            </tr>
                          );
                        })}
                    </>
                  </tbody> */}
                  <tbody>
                    <>
                      {transaction?.data
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.created_at, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");

                          let statusText, winMoneyText, color;

                          switch (record?.status) {
                            case 0:
                              statusText = "Lost";
                              winMoneyText = "₦0";
                              // backgroundColor = "red";
                              color = "red"; // Set text color to white for lost status
                              break;
                            case 1:
                              statusText = "Won";
                              winMoneyText = `₦${record?.winmoney}`;
                              color = "green";
                              break;
                            default:
                              statusText = "Pending";
                              winMoneyText = "In Play";
                              color = "grey";
                          }

                          return (
                            <tr key={index} className="table-light sport-color">
                              <td style={{ color: "#406777" }}>{index + 1}</td>
                              <td style={{ color: "#406777" }}>
                                {record?.reference}
                              </td>
                              <td style={{ color: "#406777" }}>
                                ₦{record?.amount}
                              </td>
                              <td style={{ color, fontWeight: "bolder" }}>
                                {winMoneyText}
                              </td>
                              <td style={{ color: "#406777" }}>
                                {record?.code}
                              </td>
                              <td style={{ color: "#406777" }}>
                                {formattedDate}
                              </td>
                              <td style={{ color, fontWeight: "bolder" }}>
                                {statusText}
                              </td>
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
                      {transaction?.data
                        ?.sort(
                          (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                        )
                        .map((record, index) => {
                          const formattedDate = moment
                            .utc(record?.created_at, "YYYY-MM-DD HH:mm:ss")
                            .local()
                            .format("Do MMM YYYY | h:mm:ssA");
                          // let statusText;
                          // switch (record?.status) {
                          //   case 0:
                          //     statusText = "Lost";
                          //     break;
                          //   case 1:
                          //     statusText = "Won";
                          //     break;
                          //   default:
                          //     statusText = "Pending";
                          // }
                          let statusText, winMoneyText, color;

                          switch (record?.status) {
                            case 0:
                              statusText = "Lost";
                              winMoneyText = "₦0";
                              // backgroundColor = "red";
                              color = "red"; // Set text color to white for lost status
                              break;
                            case 1:
                              statusText = "Won";
                              winMoneyText = `₦${record?.winmoney}`;
                              color = "green"; // Set text color to white for won status
                              break;
                            default:
                              statusText = "Pending";
                              winMoneyText = "In Play";
                              color = "grey"; // Set text color to black for pending (default)
                          }
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
                                  <span>{record?.reference}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">
                                    Amount Played:
                                  </span>
                                  <span>₦{record?.amount}</span>
                                </p>
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">
                                    Amount Won:{" "}
                                  </span>
                                  <span style={{ color, fontWeight: "bolder" }}>
                                    {winMoneyText}
                                  </span>
                                </p>

                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Code:</span>{" "}
                                  <span>{record?.code}</span>
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
                                <p
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span className="fw-bolder">Status:</span>{" "}
                                  <span style={{ color, fontWeight: "bolder" }}>
                                    {statusText}
                                  </span>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SportHistory;
