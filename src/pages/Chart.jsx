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
  const [selections, setSelections] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateCharts, setShowCreateCharts] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleOperatorChange = (event) => {
    const selectedOperatorValue = event.target.value;
    setSelectedOperator(selectedOperatorValue);
    setSelectedGame("");
    setGameName("");
    setSelectedMonth("");
    setSelectedYear("");
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
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, index) => 2020 + index
  );

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleAddToSelection = (event) => {
    event.preventDefault();

    if (!selectedOperator || !selectedGame || !selectedMonth || !selectedYear) {
      toast.error("Please select all options before adding to selection");
      return;
    }

    const newSelection = {
      operator: selectedOperator,
      game: selectedGame,
      month: selectedMonth,
      year: selectedYear,
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
      const startDate = `${selection.year}-01-01`;
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

    if (results.length === 0) {
      toast.error("No charts found for the selected criteria");
      return;
    }
    setFilteredResults(results);
    setShowCreateCharts(true);
  };

  // const handleCreateCharts = async () => {
  //   const results = [];

  //   for (const selection of selections) {
  //     const startDate = `${selection.year}-01-01`;
  //     const endDate = `${selection.year}-${(
  //       "0" +
  //       (months.indexOf(selection.month) + 1)
  //     ).slice(-2)}-31`;

  //     const data = await fetchData(selection.operator, endDate, startDate);

  //     if (data) {
  //       const filteredData = data?.data?.filter((result) => {
  //         const resultYearMonth = moment.utc(result.date).format("YYYY-MM");
  //         const endYearMonth = moment(endDate).format("YYYY-MM");

  //         return resultYearMonth === endYearMonth;
  //       });

  //       filteredData?.forEach((result) => {
  //         results.push(result);
  //       });
  //     }
  //   }

  //   if (results.length === 0) {
  //     toast.error("No charts found for the selected end date");
  //     return;
  //   }

  //   setFilteredResults(results);
  //   setShowCreateCharts(true);
  // };

  const renderResultsTable = () => {
    if (!filteredResults || filteredResults.length === 0) {
      return null;
    }

    return (
      <div>
        <p className="lead mt-50">
          My selection for <strong>{operatorName} </strong> |{" "}
          <strong> {selections.length > 0 ? selections[0].game : ""}</strong>
        </p>
        <div className="table-responsive">
          <table width="100%" className="table table-express mt-3">
            <tbody>
              <tr>
                <th>Game</th>
                <th>Winning Number</th>
                <th>Machine Number</th>
                <th>Date</th>
                <th>Year</th>
              </tr>
            </tbody>
            <tbody>
              {filteredResults.map((result, index) => {
                return (
                  <tr key={index}>
                    {/* <td bgColor="#f9fafa">{operatorName}</td> */}
                    <td bgColor="#f9fafa" className="fw-bolder">
                      {selections.length > 0 ? selections[0].game : ""}
                    </td>
                    <td bgColor="#f9fafa">
                      <ul className="wnums">
                        <table>
                          <td>
                            {result?.winning_number?.split("-").map(
                              (digit, j) =>
                                digit && (
                                  <td key={j}>
                                    <div className="numboxgreen">{digit}</div>
                                  </td>
                                )
                            )}
                          </td>
                        </table>
                      </ul>
                    </td>
                    <td bgColor="#f9fafa">
                      <ul className="mnums">
                        <table>
                          <td>
                            {result?.machine_number?.split("-").map(
                              (digit, j) =>
                                digit && (
                                  <td key={j}>
                                    <div className="numboxred">{digit}</div>
                                  </td>
                                )
                            )}
                          </td>
                        </table>
                      </ul>
                    </td>
                    <td bgColor="#f9fafa">
                      {" "}
                      {moment
                        .utc(result?.date, "YYYY-MM-DD HH:mm:ss")
                        .local()
                        .format("MMM DD, YYYY h:mm:ss a")}
                    </td>
                    <td bgColor="#f9fafa">{result?.year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
            <div className="div_lgrey">
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
                  onChange={handleMonthChange}
                  value={selectedMonth}
                >
                  <option selected>Select Month</option>
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
                  onChange={handleYearChange}
                  value={selectedYear}
                >
                  <option selected>Select Year</option>
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
                <table className="table">
                  <tr style={{ backgroundColor: "#f9fafa !important" }}>
                    <th>OPERATOR</th>
                    <th>GAME</th>
                    <th>YEAR</th>
                    <th>MONTH</th>
                    <th>ACTION</th>
                  </tr>
                  <tbody>
                    {selections.map((selection, index) => (
                      <tr
                        key={index}
                        style={{ backgroundColor: "#f9fafa !important" }}
                      >
                        <td>{operatorNames[selection.operator]}</td>
                        <td>{selection?.game}</td>
                        <td>{selection?.year}</td>
                        <td>{selection?.month}</td>
                        <td>
                          <i
                            className="fa fa-trash text-danger btn-sm"
                            onClick={() => handleDeleteSelection(index)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  className="btn btn-blue btn-block w-100 mt-4"
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
