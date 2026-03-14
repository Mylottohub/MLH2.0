import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import { Spinner, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HTTP } from "../utils";
import "../assets/css/afrimillions-page.css";

const AfriMillionsPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // State
  const [gameData, setGameData] = useState(null);
  const [isLoadingGame, setIsLoadingGame] = useState(true);
  const [operatorLogo, setOperatorLogo] = useState("/images/afrimillions.png");
  const [lines, setLines] = useState([{ id: 1, numbers: [] }]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");

  const MAX_LINES = 7;
  const MAX_NUMBERS_PER_LINE = 6;
  const COST_PER_LINE = 1000;
  const TOTAL_NUMBERS = 49;

  // Fetch operator logo
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await HTTP.get("/display-operators");
        const afrimillions = response.data.data.find(
          (op) => op.name.toLowerCase() === "afrimillions"
        );
        if (afrimillions?.logo) setOperatorLogo(afrimillions.logo);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchLogo();
  }, []);

  // Fetch game data
  useEffect(() => {
    const fetchGame = async () => {
      setIsLoadingGame(true);
      try {
        const response = await HTTP.post(
          "/get-games",
          { operator_type: "afri_millions" },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (response.status === 200 && response.data.result?.length > 0) {
          setGameData(response.data.result[0]);
        } else {
          toast.error("No active game available");
        }
      } catch (error) {
        console.error("Error fetching game:", error);
        toast.error("Failed to load game data");
      } finally {
        setIsLoadingGame(false);
      }
    };
    fetchGame();
  }, []);

  // Get draw time
  const getDrawTime = () => {
    if (gameData?.drawTime) return new Date(gameData.drawTime);
    const now = new Date();
    const next = new Date();
    const days = (6 - now.getDay() + 7) % 7 || 7;
    next.setDate(now.getDate() + days);
    next.setHours(20, 0, 0, 0);
    if (now.getDay() === 6 && now.getHours() >= 20) {
      next.setDate(next.getDate() + 7);
    }
    return next;
  };

  const currentLine = lines[currentLineIndex];

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value);
    const nums = currentLine.numbers;

    if (nums.includes(value)) {
      const updated = [...lines];
      updated[currentLineIndex].numbers = nums.filter((n) => n !== value);
      setLines(updated);
    } else if (nums.length < MAX_NUMBERS_PER_LINE) {
      const updated = [...lines];
      updated[currentLineIndex].numbers = [...nums, value].sort((a, b) => a - b);
      setLines(updated);
    } else {
      toast.warning(`You can only select ${MAX_NUMBERS_PER_LINE} numbers per line`);
    }
  };

  // Randomize
  const handleRandomize = () => {
    const available = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
    const random = [];
    while (random.length < MAX_NUMBERS_PER_LINE) {
      const idx = Math.floor(Math.random() * available.length);
      random.push(available[idx]);
      available.splice(idx, 1);
    }
    random.sort((a, b) => a - b);
    const updated = [...lines];
    updated[currentLineIndex].numbers = random;
    setLines(updated);
  };

  // Clear randomize
  const clearRandomize = () => {
    const updated = [...lines];
    updated[currentLineIndex].numbers = [];
    setLines(updated);

    setTimeout(() => {
      document.querySelectorAll(".chk-btn").forEach((checkbox) => {
        checkbox.checked = false;
      });
    }, 0);
  };

  // Add line
  const handleAddLine = () => {
    if (lines.length >= MAX_LINES) {
      toast.error(`Maximum ${MAX_LINES} lines allowed`);
      return;
    }
    if (currentLine.numbers.length !== MAX_NUMBERS_PER_LINE) {
      toast.error("Complete current line before adding new line");
      return;
    }
    const newLine = { id: lines.length + 1, numbers: [] };
    setLines([...lines, newLine]);
    setCurrentLineIndex(lines.length);
  };

  // Remove line
  const handleRemoveLine = (lineId) => {
    if (lines.length === 1) {
      toast.error("At least one line required");
      return;
    }
    const updated = lines.filter((l) => l.id !== lineId).map((l, i) => ({ ...l, id: i + 1 }));
    setLines(updated);
    if (currentLineIndex >= updated.length) setCurrentLineIndex(updated.length - 1);
  };

  // Switch line
  const handleSwitchLine = (index) => setCurrentLineIndex(index);

  // Remove number from line
  const handleRemoveNumber = (lineIndex, number) => {
    const updated = [...lines];
    updated[lineIndex].numbers = updated[lineIndex].numbers.filter((n) => n !== number);
    setLines(updated);
  };

  // Clear line
  const handleClearLine = (lineIndex) => {
    const updated = [...lines];
    updated[lineIndex].numbers = [];
    setLines(updated);
  };

  const completeLines = lines.filter((l) => l.numbers.length === MAX_NUMBERS_PER_LINE);
  const totalAmount = completeLines.length * COST_PER_LINE;

  // Confirm bet
  const handleConfirmBet = (e) => {
    e.preventDefault();

    if (!gameData) {
      toast.error("Game data not loaded");
      return;
    }

    const incompleteLines = lines.filter(
      (l) => l.numbers.length > 0 && l.numbers.length < MAX_NUMBERS_PER_LINE
    );

    if (incompleteLines.length > 0) {
      toast.warning(`Line(s) ${incompleteLines.map((l) => l.id).join(", ")} are incomplete`);
      return;
    }

    if (completeLines.length === 0) {
      toast.error("Complete at least one line");
      return;
    }

    toast.success("Bet slip confirmed!");
  };

  // Place bet
  const handlePlaceBet = async () => {
    if (!userInfo?.data?.id) {
      toast.error("Please login to proceed");
      navigate("/login");
      return;
    }

    if (!gameData) {
      toast.error("Game data not loaded");
      return;
    }

    if (completeLines.length === 0) {
      toast.error("Complete at least one line");
      return;
    }

    setIsSubmitting(true);
    try {
      const promises = completeLines.map((line) => {
        const payload = {
          userID: userInfo.data.id,
          line: "1",
          ball: line.numbers.sort((a, b) => a - b),
          operator_type: "afri_millions",
          game_name: gameData.GameName,
          amount: COST_PER_LINE.toString(),
          total: COST_PER_LINE.toString(),
          gid: gameData.GameId,
          drawID: gameData.GameDraw,
          drawTime: gameData.drawTime.toString(),
          closetime: gameData.endTime.toString(),
          wallet: "wallet",
        };
        return HTTP.post("/play-games", payload, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      });

      const responses = await Promise.all(promises);
      if (responses.every((r) => r.status === 200)) {
        toast.success(
          `${completeLines.length} line(s) placed! ₦${totalAmount.toLocaleString()}`
        );
        setLines([{ id: 1, numbers: [] }]);
        setCurrentLineIndex(0);
        setTimeout(() => navigate("/bet-history/afri_millions"), 2000);
      } else {
        toast.error("Some bets failed");
      }
    } catch (error) {
      console.error("Bet error:", error);
      toast.error(error.response?.data?.message || "Failed to place bet");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Countdown renderer
  const CountdownTimer = ({ date }) => (
    <Countdown
      date={date}
      renderer={({ days, hours, minutes, seconds }) => (
        <small>
          {days}days {hours}hrs {minutes}mins {seconds}secs
        </small>
      )}
    />
  );

  if (isLoadingGame) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="text-center" style={{ padding: "100px 0" }}>
            <Spinner animation="border" className="text-success" />
            <p className="mt-3">Loading AfriMillions...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!gameData) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="text-center" style={{ padding: "100px 0" }}>
            <h3>No Active Game</h3>
            <p>No active AfriMillions games at the moment.</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Generate checkboxes
  const checkboxes = [];
  for (let x = 1; x <= TOTAL_NUMBERS; x++) {
    const checkId = `c${x}`;
    const isChecked = currentLine.numbers.includes(x);
    const isDisabled =
      !isChecked && currentLine.numbers.length >= MAX_NUMBERS_PER_LINE;

    checkboxes.push(
      <React.Fragment key={checkId}>
        <input
          type="checkbox"
          name="num[]"
          className="chk-btn"
          value={x}
          id={checkId}
          onChange={handleCheckboxChange}
          checked={isChecked}
          disabled={isDisabled}
        />
        <label htmlFor={checkId}>{x}</label>
      </React.Fragment>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <form onSubmit={handleConfirmBet} name="play_form" id="play_form">
          <p className="mt-5">
            <strong className="text-capitalize fw-bolder text-dark">
              Select Operator &gt;&gt; Afrimillions
            </strong>
          </p>
          <br />

          <div className="div_lgrey">
            <div className="row">
              {/* Logo Section */}
              <div className="col-4 col-lg-2 app__play-games">
                <img src={operatorLogo} className="img-fluid" alt="AfriMillions" />
              </div>

              {/* Game Info Section */}
              <div className="col-8 col-lg-6 app__play-bet">
                <div className="row">
                  <div className="col-12">
                    <h4 className="text-dark fw-bold">Afrimillion 6/49</h4>
                    <p className="text-muted mb-2">
                      {moment(getDrawTime()).format("DD/MM/YYYY h:mm A")}
                    </p>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate("/bet-history/afri_millions")}
                    >
                      View Bet History
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Games Section */}
              <div className="col-12 col-lg-4 hidden-xs">
                <div className="meg_active_game_scroll_div">
                  <table cellPadding="10" width="100%">
                    <tbody>
                      <tr>
                        <th colSpan="2">
                          <p
                            style={{ background: "#406777" }}
                            className="text-white text-center p-2"
                          >
                            Active Games
                          </p>
                        </th>
                      </tr>
                      <tr>
                        <td>
                          <small>
                            <strong>{gameData.GameName}:</strong>
                          </small>
                        </td>
                        <td>
                          <CountdownTimer date={getDrawTime()} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div className="row mb-5">
            {/* Number Selection Section */}
            <div className="col-md-8">
              <div className="div_lgrey">
                {/* Action Buttons */}
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={handleRandomize}
                      className="text-decoration-none"
                    >
                      <i className="fa fa-crosshairs"></i> Randomize
                    </a>
                  </div>
                  <div className="col-md-4 mb-3">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={clearRandomize}
                      className="text-decoration-none"
                    >
                      <i className="fa fa-cube"></i> Clear Randomize
                    </a>
                  </div>
                  <div className="col-md-4 mb-3">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/bet-history/afri_millions")}
                      className="text-decoration-none"
                    >
                      <i className="fa fa-dashboard"></i> Bet History
                    </a>
                  </div>
                </div>

                <hr />

                {/* Info Banner */}
                <div className="jackpot-banner mb-4">
                  <div className="countdown-display">
                    <span className="countdown-label">Count down:</span>
                    <CountdownTimer date={getDrawTime()} />
                  </div>
                  <div className="jackpot-display">
                    <h3 className="jackpot-text">1 BILLION NAIRA JACKPOT</h3>
                    <p className="jackpot-subtext">Live Draw Every Saturday 8PM</p>
                  </div>
                </div>

                {/* Number Selection Header */}
                <div className="selection-info mb-3">
                  <p className="mb-2">
                    <strong>Number selection</strong>
                    <span className="float-end text-danger fw-bold">N1000 per play</span>
                  </p>
                  <p className="mb-2">
                    <strong>Pick 6</strong>
                    <span className="float-end">
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={handleRandomize}
                        className="text-decoration-none me-3"
                      >
                        ⭐ Randomize
                      </a>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          toast.info("Select 6 numbers from 1-49 to win!")
                        }
                        className="text-decoration-none"
                      >
                        ❓ How to Play
                      </a>
                    </span>
                  </p>
                </div>

                <hr />

                <p>
                  <small>Select numbers manually or use randomizer</small>
                </p>
                <br />

                {/* Number Grid */}
                <div className="numbers-container fade-in slide-up">
                  {checkboxes}
                </div>

                <br />
                <br />

                {/* Stake Amount */}
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Amount"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  id="stakeAmount"
                  disabled
                />
                <br />

                {/* Confirm Button */}
                <Button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg btn-blue w-100"
                >
                  CONFIRM BET
                </Button>
              </div>
            </div>

            {/* Bet Slip Section */}
            <div className="col-md-4">
              <div id="bet_slip">
                <div
                  style={{ background: "#4067770D" }}
                  className="div_dgrey text-center p-4"
                >
                  <p className="fw-bolder text-dark mb-0">Bet Slip</p>
                  <small>Afrimillions 6/49</small>
                </div>

                <div className="div_lgrey" style={{ marginTop: "-20px" }}>
                  {lines.map((line, index) => (
                    <div
                      key={line.id}
                      className={`bet-line ${
                        index === currentLineIndex ? "active" : ""
                      }`}
                      onClick={() => handleSwitchLine(index)}
                    >
                      <div className="line-header">
                        <strong>Lines {line.id}</strong>
                        <span className="text-muted">Type 6/49</span>
                      </div>

                      <div className="line-content">
                        <span className="my-bets-label">My bets:</span>
                        <div className="bet-numbers">
                          {line.numbers.length > 0 ? (
                            line.numbers.map((num) => (
                              <span key={num} className="bet-number">
                                {String(num).padStart(2, "0")}
                                <button
                                  className="remove-number"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveNumber(index, num);
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))
                          ) : (
                            <span className="empty-bets">No numbers</span>
                          )}
                        </div>
                      </div>

                      {line.numbers.length > 0 && (
                        <button
                          className="clear-line-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClearLine(index);
                          }}
                        >
                          Clear line
                        </button>
                      )}
                    </div>
                  ))}

                  {lines.length < MAX_LINES && (
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm w-100 mt-3"
                      onClick={handleAddLine}
                    >
                      + Add Another Line ({MAX_LINES - lines.length} remaining)
                    </button>
                  )}

                  <hr />

                  {/* Total Stake */}
                  <div className="total-section">
                    <label className="fw-bold">Total stake:</label>
                    <input
                      type="text"
                      className="form-control text-end fw-bold"
                      value={`₦${totalAmount}`}
                      readOnly
                    />
                  </div>

                  <br />

                  {/* Action Buttons */}
                  <div className="row">
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-block w-100"
                        onClick={() => {
                          setLines([{ id: 1, numbers: [] }]);
                          setCurrentLineIndex(0);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-md-6">
                      <Button
                        type="button"
                        className="btn btn-blue btn-block w-100"
                        onClick={handlePlaceBet}
                        disabled={isSubmitting || completeLines.length === 0}
                      >
                        {isSubmitting ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Place Bet"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AfriMillionsPage;
