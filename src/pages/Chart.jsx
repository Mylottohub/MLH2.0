import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useTimeTable from "../react-query/api-hooks/useTimeTable";
import "../assets/css/forecast.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { Button, Spinner } from "react-bootstrap";
import { HTTP } from "../utils";
import { useSelector } from "react-redux";
import moment from "moment";

const Chart = () => {
  const { operatorTimetable } = useTimeTable();
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [gamesForOperator, setGamesForOperator] = useState([]);
  const [gameName, setGameName] = useState("");
  const [operatorName, setOperatorName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStartYear, setSelectedStartYear] = useState("");
  const [selections, setSelections] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedStartMonth, setSelectedStartMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateCharts, setShowCreateCharts] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleOperatorChange = (event) => {
    const selectedOperatorValue = event.target.value;
    setSelectedOperator(selectedOperatorValue);
    setSelectedGame("");
    setGameName("");
    setSelectedMonth("");
    setSelectedStartMonth("");
    setSelectedYear("");
    setSelectedStartYear("");
    setOperatorName(event.target.options[event.target.selectedIndex].text);

    const games = operatorTimetable?.data.filter(
      (entry) => entry.operator.toString() === selectedOperatorValue
    );

    setGamesForOperator(games || []);
  };

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
    setGameName(event.target.options[event.target.selectedIndex].text);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const startMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, index) => 2020 + index
  );
  const startYears = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, index) => 2020 + index
  );

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleStartMonthChange = (event) => {
    setSelectedStartMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleStartYearChange = (event) => {
    setSelectedStartYear(event.target.value);
  };

  const handleAddToSelection = (event) => {
    event.preventDefault();

    if (
      !selectedOperator ||
      !selectedGame ||
      !selectedMonth ||
      !selectedStartMonth ||
      !selectedYear ||
      !selectedStartYear
    ) {
      toast.error("Please select all options before adding to selection");
      return;
    }

    const newSelection = {
      operator: selectedOperator,
      game: selectedGame,
      month: selectedMonth,
      startMonth: selectedStartMonth,
      year: selectedYear,
      startYear: selectedStartYear,
    };

    // Check if any selection exists
    if (selections.length > 0) {
      // Check if the selected operator matches the operator of existing selections
      if (selectedOperator !== selections[0].operator) {
        // toast.error("You can only add games from the same operator");
        toast.error(
          "You can only create chart from the same game and operator"
        );
        return;
      }
    }

    setSelections([...selections, newSelection]);
    setSelectedOperator("");
    setSelectedGame("");
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedStartYear("");
  };

  const handleDeleteSelection = (index) => {
    const newSelections = [...selections];
    newSelections.splice(index, 1);
    setSelections(newSelections);
    toast.success("Selection removed successfully");
  };

  const operatorNames = {
    26: "5/90 Games",
    28: "Wesco",
    43: "Green lotto",
    27: "Baba Ijebu",
    45: "Lottomania",
    57: "Set Lotto",
    42: "Golden Chance",
  };

  const [result, setResults] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  const configHeaders = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchData = async (operator, endDate, startDate) => {
    const requestBody = {
      start_date: startDate,
      end_date: endDate,
    };

    try {
      setIsLoading(true);

      const response = await HTTP.get(
        `/mylotto_get_results_games/${operator}`,
        { params: requestBody },
        configHeaders
      );

      const lottoResults = response.data.data;
      setResults(lottoResults);

      return lottoResults;
    } catch (error) {
      toast.error("Failed to fetch lotto results.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCharts = async () => {
    const results = [];

    for (const selection of selections) {
      const startDate = `${selection.startYear}-${(
        "0" +
        (startMonths.indexOf(selection.startMonth) + 1)
      ).slice(-2)}-01`;
      const endDate = `${selection.year}-${(
        "0" +
        (months.indexOf(selection.month) + 1)
      ).slice(-2)}-31`;

      const data = await fetchData(selection.operator, endDate, startDate);

      if (data) {
        data?.data?.forEach((result) => {
          results.push(result);
        });
      }
    }
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (results.length === 0) {
      toast.error("No charts found for the selected criteria");
      return;
    }
    setFilteredResults(results);
    setShowCreateCharts(true);
  };

  const renderResultsTable = () => {
    if (!filteredResults || filteredResults.length === 0) {
      return null;
    }

    // return (
    //   <div>
    //     <p className="lead mt-50">
    //       My selection for <strong>{operatorName} </strong> |{" "}
    //       <strong> {selections.length > 0 ? selections[0].game : ""}</strong>
    //     </p>
    //     <div className="table-responsive">
    //       <table width="100%" className="table table-express mt-3">
    //         <tbody>
    //           <tr>
    //             <th>Game</th>
    //             <th>Winning Number</th>
    //             <th>Machine Number</th>
    //             <th>Date</th>
    //             <th>Year</th>
    //           </tr>
    //         </tbody>
    //         <tbody>
    //           {filteredResults.map((result, index) => {
    //             return (
    //               <tr key={index}>
    //                 <td bgColor="#f9fafa" className="fw-bolder">
    //                   {selections.length > 0 ? selections[0].game : ""}
    //                 </td>
    //                 <td bgColor="#f9fafa">
    //                   <ul className="wnums">
    //                     <table>
    //                       <td>
    //                         {result?.winning_number?.split("-").map(
    //                           (digit, j) =>
    //                             digit && (
    //                               <td key={j}>
    //                                 <div className="numboxgreen">{digit}</div>
    //                               </td>
    //                             )
    //                         )}
    //                       </td>
    //                     </table>
    //                   </ul>
    //                 </td>
    //                 <td bgColor="#f9fafa">
    //                   <ul className="mnums">
    //                     <table>
    //                       <td>
    //                         {result?.machine_number?.split("-").map(
    //                           (digit, j) =>
    //                             digit && (
    //                               <td key={j}>
    //                                 <div className="numboxred">{digit}</div>
    //                               </td>
    //                             )
    //                         )}
    //                       </td>
    //                     </table>
    //                   </ul>
    //                 </td>
    //                 <td bgColor="#f9fafa">
    //                   {" "}
    //                   {moment
    //                     .utc(result?.date, "YYYY-MM-DD HH:mm:ss")
    //                     .local()
    //                     .format("MMM DD, YYYY h:mm:ss a")}
    //                 </td>
    //                 <td bgColor="#f9fafa">{result?.year}</td>
    //               </tr>
    //             );
    //           })}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // );
    return (
      <div>
        <p className="lead mt-3">
          My selection for <strong>{operatorName} </strong> |{" "}
          <strong>{selections.length > 0 ? selections[0].game : ""}</strong>
        </p>
        <div className="container mt-3 mb-2">
          <div className="row">
            {filteredResults.map((result, index) => (
              <div key={index} className="col-md-4 col-sm-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="result-field d-flex">
                      <h6 className="card-title">Game: </h6> &nbsp;&nbsp;
                      <p className="card-text">
                        {selections.length > 0 ? selections[0].game : ""}
                      </p>
                    </div>
                    <div className="result-field d-flex">
                      <h6 className="card-title">Date:</h6>
                      &nbsp;&nbsp;
                      <p className="card-text">
                        {moment
                          .utc(result?.date, "YYYY-MM-DD HH:mm:ss")
                          .local()
                          .format("MMM DD, YYYY h:mm:ss a")}
                      </p>
                    </div>
                    <div className="result-field d-flex">
                      <h6 className="card-title">Year:</h6>&nbsp;&nbsp;
                      <p className="card-text">{result?.year}</p>
                    </div>
                    <div className="result-field mt-3 mb-3">
                      <h6 className="card-title">Winning Number:</h6>
                      <div className="number-list d-flex flex-wrap">
                        {result?.winning_number?.split("-").map((digit, j) => (
                          <span
                            key={j}
                            className="p-3 me-2 mb-2"
                            style={{
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#27AE60",
                              color: "#FFF",
                            }}
                          >
                            {digit}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="result-field mt-3 mb-3">
                      <h6 className="card-title">Machine Number:</h6>
                      <div className="number-list d-flex flex-wrap">
                        {result?.machine_number?.split("-").map((digit, j) => (
                          <span
                            key={j}
                            className="p-3 me-2 mb-2"
                            style={{
                              borderRadius: "50%",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#FF0013",
                              color: "#fff",
                            }}
                          >
                            {digit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />

      <div className="container" style={{ marginTop: "70px" }}>
        {!showCreateCharts && (
          <div className="meg_container mx-auto select__chart table">
            <p align="center">
              <span className="lead">
                <strong className="text-express">
                  <h4 className="text-center"> Create Lotto Chart </h4>
                </strong>
              </span>
              <p className="text-center">
                To create chart, you can only add a single game to an operator
                to create a selection, choosing different year and months.
              </p>
            </p>
            <div className="div_lgrey mb-5">
              <form onSubmit={handleAddToSelection}>
                {" "}
                {/* Added onSubmit handler */}
                <select
                  name="operator"
                  className="form-control mb-3 p-2"
                  required
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
                <div className="form-group mb-4">
                  <select
                    name="game"
                    className="form-control p-2"
                    required
                    id="game_div"
                    onChange={handleGameChange}
                    value={selectedGame}
                  >
                    <option value="">Select Game</option>
                    {gamesForOperator.map((game) => (
                      <option key={game.id} value={game.name}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  required
                  name="month"
                  id=""
                  className="form-control p-2 mb-4"
                  onChange={handleStartMonthChange}
                  value={selectedStartMonth}
                >
                  <option selected>Select Start Month</option>
                  {startMonths.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  required
                  name="month"
                  id=""
                  className="form-control p-2 mb-4"
                  onChange={handleMonthChange}
                  value={selectedMonth}
                >
                  <option selected>Select End Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  required
                  name="year"
                  id=""
                  className="form-control p-2 mb-4"
                  onChange={handleStartYearChange}
                  value={selectedStartYear}
                >
                  <option selected>Select Start Year</option>
                  {startYears.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  required
                  name="year"
                  id=""
                  className="form-control p-2 mb-4"
                  onChange={handleYearChange}
                  value={selectedYear}
                >
                  <option selected>Select End Year</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <Button type="submit" className="btn btn-blue btn-block w-100">
                  Add to Selection
                </Button>
              </form>
            </div>
            {selections.length > 0 && (
              <>
                <p className="lead  mt-5">Selections</p>

                <div className="card-container">
                  {selections.map((selection, index) => (
                    <div key={index} className="card-item">
                      <div className="card-row">
                        <span className="card-label">Operator:</span>
                        <span className="card-value">
                          {operatorNames[selection.operator]}
                        </span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Game:</span>
                        <span className="card-value">{selection?.game}</span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Start Year:</span>
                        <span className="card-value">
                          {selection?.startYear}
                        </span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">End Year:</span>
                        <span className="card-value">{selection?.year}</span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Start Month:</span>
                        <span className="card-value">
                          {selection?.startMonth}
                        </span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">End Month:</span>
                        <span className="card-value">{selection?.month}</span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Action:</span>
                        <span className="card-value">
                          <i
                            className="fa fa-trash text-danger btn-sm"
                            onClick={() => handleDeleteSelection(index)}
                          ></i>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className="btn btn-blue btn-block w-100 mt-4 mb-5"
                  onClick={handleCreateCharts}
                >
                  Create Charts
                </Button>
              </>
            )}
          </div>
        )}

        {showCreateCharts && (
          <div className="meg_container mb-40">
            <div>
              <table cellPadding="3">
                <tr>
                  <td>
                    <table cellPadding="3">
                      <tr>
                        <td>
                          <div className="numboxgreen">&nbsp;</div>
                        </td>
                        <td>Winning</td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table cellPadding="3">
                      <tr>
                        <td>
                          <div className="numboxred">&nbsp;</div>
                        </td>
                        <td>Machine</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              {renderResultsTable()}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Chart;
