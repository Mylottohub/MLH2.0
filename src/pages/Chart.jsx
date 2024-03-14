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
    { length: currentYear - 1980 + 1 },
    (_, index) => 1980 + index
  );

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // const handleAddToSelection = (event) => {
  //   event.preventDefault(); // Prevent form submission and page reload

  //   if (!selectedOperator || !selectedGame || !selectedMonth || !selectedYear) {
  //     toast.error("Please select all options before adding to selection");
  //     return;
  //   }

  //   const newSelection = {
  //     operator: selectedOperator,
  //     game: selectedGame,
  //     month: selectedMonth,
  //     year: selectedYear,
  //   };

  //   setSelections([...selections, newSelection]);
  //   setSelectedOperator("");
  //   setSelectedGame("");
  //   setSelectedMonth("");
  //   setSelectedYear("");
  // };

  const handleAddToSelection = (event) => {
    event.preventDefault(); // Prevent form submission and page reload

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
        toast.error("You can only add games from the same operator");
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

  const fetchData = () => {
    setIsLoading(true);
    HTTP.get(`/mylotto_get_results`, { ...configHeaders })
      .then((response) => {
        setResults(response.data.data);
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
  }, [userInfo.token]);

  const handleCreateCharts = () => {
    const results = [];
    result.forEach((operator) => {
      operator.results.forEach((result) => {
        const monthIndex = months.indexOf(selections[0].month);
        const numericMonth = monthIndex !== -1 ? monthIndex + 1 : null;
        if (
          result.operator === operatorNames[selections[0].operator] &&
          result.game.toString() === selections[0].game &&
          result.month === numericMonth &&
          result.year.toString() === selections[0].year
        ) {
          results.push(result);
        }
      });
    });
    if (results.length === 0) {
      toast.error("No charts found for the selected criteria");
      return;
    }
    setFilteredResults(results);
    setShowCreateCharts(true);
    console.log(results);
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
            {filteredResults.map((result, index) => (
              <div key={index}>
                <p className="lead mt-50">
                  My selection for <strong>{result?.operator} </strong> |{" "}
                  <strong>{result?.game}</strong>
                </p>
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
                <div className="table-responsive">
                  <table
                    width="100%"
                    cellPadding="20"
                    className="table table-express mt-5"
                  >
                    <tr bgColor="#27AAE1" className="meg_white">
                      <th>DATE</th>
                      <th>Numbers</th>
                      <th>&nbsp;</th>
                    </tr>
                    <tr>
                      <td bgColor="#f9fafa">
                        {moment
                          .utc(result?.date, "YYYY-MM-DD HH:mm:ss")
                          .local()
                          .format("MMM DD, YYYY h:mm:ss a")}
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
                    </tr>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Chart;
