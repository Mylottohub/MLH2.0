import Navbar from "../Navbar";
import "../../assets/css/table.css";

const TransactionHistory = () => {
  return (
    <>
      <Navbar />
      <div className="container p-4 mt-5 app__transact-table">
        <h5>Transaction History</h5>
        <table className="table table-striped table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">TICKET ID</th>
              <th scope="col">DATE</th>
              <th scope="col">TIME</th>
              <th scope="col">OPERATOR</th>
              <th scope="col">CURRENT BAL</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">STATUS</th>
            </tr>
          </thead>

          <tbody>
            <tr className="table-light">
              <th>1</th>
              <td> PRE-1619-RNKW-195601-480</td>
              <td>26th Jan, 2021</td>
              <td>11:12 PM</td>
              <td>Baba Ijebu</td>
              <td>320,000.00</td>
              <td>N123,000.00</td>
              <td>Play Won</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionHistory;
