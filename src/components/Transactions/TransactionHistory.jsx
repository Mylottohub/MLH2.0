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
    HTTP.get(`/user/transaction/${userInfo.data.id}`, { ...configHeaders })
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

  return (
    <>
      <Navbar />
      <div className="container p-4 mt-5 app__transact-table">
        <h5>Transaction History</h5>
        <table className="table table-striped table-hover mt-4 table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">TICKET ID</th>
              <th scope="col">DATE</th>
              <th scope="col">TIME</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">CURRENT BAL</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">CHANNEL</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <div className="spinner-container d-flex align-items-center justify-content-center">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </div>
            ) : transaction.length === 0 ? (
              <tr>
                <td colSpan="8" className="flex justify-center text-center p-5">
                  No Record Found
                </td>
              </tr>
            ) : (
              <>
                {transaction.map((record, index) => {
                  const formattedDate = moment(record.date)
                    .utcOffset("+00:00")
                    .format("DD/MM/YYYY HH:mm");
                  const formattedTime = moment(
                    formattedDate,
                    "DD/MM/YYYY HH:mm"
                  ).format("hh:mm A");

                  return (
                    <tr key={index} className="table-light">
                      <th>{index + 1}</th>
                      <td>{record.ref}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>{record.description}</td>
                      <td>{record.abalance}</td>
                      <td>{record.amount}</td>
                      <td>{record.channel}</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionHistory;
