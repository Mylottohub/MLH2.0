import Navbar from "../Navbar";
import "../../assets/css/table.css";
import HTTP from "../../utils/httpClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";

const TransactionHistory = () => {
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
    HTTP.get(`/user/transaction/${userInfo.data.id}?page=${currentPage}`, {
      ...configHeaders,
    })
      .then((response) => {
        setTransaction(response.data.data);
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
  }, [userInfo.token]);
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
    <>
      <Navbar />
      <div className="container p-4 mt-5 app__transact-table mb-5">
        <h5>Transaction History</h5>
        <div className="table-responsive">
          <table className="table table-express table-hover mt-4">
            <tbody>
              <tr>
                <th scope="col">#</th>
                <th scope="col">TICKET ID</th>
                <th scope="col">TYPE</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">CHANNEL</th>
                <th scope="col">CURRENT BAL</th>
                <th scope="col">DATE</th>
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
              ) : transaction?.data?.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="flex justify-center text-center p-5"
                  >
                    No Record Found
                  </td>
                </tr>
              ) : (
                <>
                  {transaction?.data?.map((record, index) => {
                    const formattedDate = moment
                      .utc(record?.date, "YYYY-MM-DD HH:mm:ss")
                      .local()
                      .format("Do MMM YYYY | h:mm:ssA");

                    return (
                      <tr key={index} className="table-light">
                        <td>{index + 1}</td>
                        <td>{record?.ref}</td>
                        <td>{record?.type}</td>
                        <td>{record?.description}</td>
                        <td>{record?.amount}</td>
                        <td>{record?.channel}</td>
                        <td>{record?.abalance}</td>
                        <td>{formattedDate}</td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {transaction?.links?.map((link, index) => (
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
      </div>
    </>
  );
};

export default TransactionHistory;
