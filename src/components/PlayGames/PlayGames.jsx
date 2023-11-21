// import React from 'react'

import Navbar from "../Navbar";
// import CheckboxForm from "./CheckedForm";
import { toast } from "react-toastify";
import "../../assets/css/play.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Countdown from "react-countdown";
// import { useSelector } from "react-redux";

const PlayGames = () => {
  const [selectedBetType, setSelectedBetType] = useState("");
  const [selectedGameType, setSelectedGameType] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const { id } = useParams();

  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [perOperator, setPerOperator] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const requestData = { operator_type: id };
      try {
        const response = await fetch(
          "https://sandbox.mylottohub.com/v1/get-games",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setPerOperator(data.result);
      } catch (error) {
        console.error(`Error fetching ${id} games:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, []);
  useEffect(() => {
    // console.log("count", perOperator);
  }, [perOperator]);

  const maxSelectableNumbers = {
    "2 DIRECT": 2,
    "3 DIRECT": 3,
    "4 DIRECT": 4,
    "5 DIRECT": 5,
    "PERM 2": 24,
    "PERM 3": 24,
    "PERM 4": 24,
    "PERM 5": 24,
  };
  const [confirmedBet, setConfirmedBet] = useState(null);

  const clearSelectedNumbers = () => {
    setSelectedNumbers([]);
    setSelectedCount(0);
  };

  const handleBetTypeChange = (event) => {
    const newBetType = event.target.value;
    setSelectedBetType(newBetType);

    // Clear selected numbers
    clearSelectedNumbers();

    // Clear checkboxes
    const checkboxes = document.querySelectorAll(".chk-btn");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  const handleCheckboxChange = (event) => {
    const number = parseInt(event.target.value);
    // Check if the number is already selected.
    const isSelected = selectedNumbers.includes(number);

    if (isSelected) {
      // If it's already selected, remove it.
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
      setSelectedCount(selectedCount - 1);
    } else if (selectedCount < maxSelectableNumbers[selectedBetType]) {
      // If it's not selected and we haven't reached the maximum allowed for the current bet type, add it.
      setSelectedNumbers([...selectedNumbers, number]);
      setSelectedCount(selectedCount + 1);
    } else {
      // If the maximum selection limit is reached, show an alert.
      alert(
        `You can not select more than ${maxSelectableNumbers[selectedBetType]} numbers for ${selectedBetType}`
      );
    }
  };

  const handleGameChange = (e) => {
    const game = e.target.value;
    // console.log(game);
    setSelectedGameType(game);
  };

  const checkboxes = [];

  // const randomizeCheckbox = () => {
  //   if (!selectedBetType) {
  //     toast.error("Select Bet Type");
  //     return;
  //   }

  //   const gtype = selectedBetType;
  //   const mustCheck = maxSelectableNumbers[gtype];
  //   const checkboxes = document.querySelectorAll(".chk-btn");

  //   if (mustCheck >= checkboxes.length) {
  //     toast.error("Not enough numbers available for this bet type.");
  //     return;
  //   }

  //   const randomIndices = [];
  //   while (randomIndices.length < mustCheck) {
  //     const randomIndex = Math.floor(Math.random() * checkboxes.length);
  //     if (!randomIndices.includes(randomIndex)) {
  //       randomIndices.push(randomIndex);
  //     }
  //   }

  //   const randomizedNumbers = randomIndices.map((index) => parseInt(checkboxes[index].value));

  //   setSelectedNumbers(randomizedNumbers); // Update selectedNumbers with the randomized numbers

  //   checkboxes.forEach((checkbox, index) => {
  //     checkbox.checked = randomIndices.includes(index);
  //   });
  // };
  const randomizeCheckbox = () => {
    if (!selectedBetType) {
      toast.error("Select Bet Type");
      return;
    }

    const gtype = selectedBetType;
    const checkboxes = document.querySelectorAll(".chk-btn");

    if (gtype.startsWith("PERM")) {
      let numToRandomize;

      switch (gtype) {
        case "PERM 2":
          numToRandomize = 3;
          break;
        case "PERM 3":
          numToRandomize = 4;
          break;
        case "PERM 4":
          numToRandomize = 5;
          break;
        case "PERM 5":
          numToRandomize = 6;
          break;
        default:
          toast.error("Invalid Bet Type");
          return;
      }

      const randomIndices = [];

      if (numToRandomize > checkboxes.length) {
        toast.error(`Not enough numbers available for this bet type: ${gtype}`);
        return;
      }

      while (randomIndices.length < numToRandomize) {
        const randomIndex = Math.floor(Math.random() * checkboxes.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      const randomizedNumbers = randomIndices.map((index) =>
        parseInt(checkboxes[index].value)
      );

      setSelectedNumbers(randomizedNumbers); // Update selectedNumbers with the randomized numbers

      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = randomIndices.includes(index);
      });
    } else {
      // Handle other bet types here
      const mustCheck = maxSelectableNumbers[gtype];

      if (mustCheck >= checkboxes.length) {
        toast.error(`Not enough numbers available for this bet type: ${gtype}`);
        return;
      }

      const randomIndices = [];

      while (randomIndices.length < mustCheck) {
        const randomIndex = Math.floor(Math.random() * checkboxes.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      const randomizedNumbers = randomIndices.map((index) =>
        parseInt(checkboxes[index].value)
      );

      setSelectedNumbers(randomizedNumbers); // Update selectedNumbers with the randomized numbers

      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = randomIndices.includes(index);
      });

      if (
        gtype === "2 DIRECT" ||
        gtype === "3 DIRECT" ||
        gtype === "4 DIRECT" ||
        gtype === "5 DIRECT"
      ) {
        // Disable further selection for "DIRECT" bet types after randomization
        checkboxes.forEach((checkbox) => {
          checkbox.disabled = true;
        });
      }
    }
  };

  const clearRandomize = () => {
    const checkboxes = document.querySelectorAll(".chk-btn");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  for (let x = 1; x <= 90; x++) {
    const id = `c${x}`;
    checkboxes.push(
      <React.Fragment key={id}>
        <input
          type="checkbox"
          name="num[]"
          className="chk-btn"
          value={x}
          id={id}
          onChange={handleCheckboxChange}
          disabled={
            !selectedBetType ||
            (selectedCount >= maxSelectableNumbers[selectedBetType] &&
              !selectedNumbers.includes(x))
          }
        />
        <label htmlFor={id}>{x}</label>
      </React.Fragment>
    );
  }

  const handleConfirmBet = (e) => {
    e.preventDefault();
    if (!selectedGameType) {
      toast.error("Select a Game Name");
      return;
    }
    if (!selectedBetType) {
      toast.error("Select Bet Type");
      return;
    }

    const stakeAmount = parseFloat(
      document.getElementById("stakeAmount").value
    );

    if (isNaN(stakeAmount) || stakeAmount < 10) {
      toast.error("Minimum stake amount is ₦10");
      return;
    }

    // Define an array of valid "DIRECT" bet types
    const validDirectTypes = ["2 DIRECT", "3 DIRECT", "4 DIRECT", "5 DIRECT"];

    if (validDirectTypes.includes(selectedBetType)) {
      const requiredNumbers = maxSelectableNumbers[selectedBetType];

      if (selectedNumbers.length !== requiredNumbers) {
        toast.error(
          `Select exactly ${requiredNumbers} numbers for ${selectedBetType}`
        );
        return;
      }

      const multiplier = calculateDirectMultiplier(requiredNumbers);
      const maxWin = stakeAmount * multiplier;

      const newConfirmedBet = {
        gname: selectedGameType,
        line: "1",
        gtype: selectedBetType,
        bets: selectedNumbers,
        max_win: `₦${maxWin.toFixed(2)}`,
        total_stake: `₦${stakeAmount.toFixed(2)}`,
      };

      setConfirmedBet(newConfirmedBet);
    } else if (selectedBetType.startsWith("PERM")) {
      // Handle "PERM" bets
      const requiredNumbers = selectedBetType.includes("PERM 2")
        ? 2
        : selectedBetType.includes("PERM 3")
        ? 3
        : selectedBetType.includes("PERM 4")
        ? 4
        : selectedBetType.includes("PERM 5")
        ? 5
        : 0;

      if (requiredNumbers === 0) {
        toast.error("Invalid Bet Type");
        return;
      }

      // if (selectedNumbers.length !== requiredNumbers) {
      //   toast.error(`Select exactly ${requiredNumbers} numbers for ${selectedBetType}`);
      //   return;
      // }

      const lines = calculatePermLines(requiredNumbers);
      const multiplier = calculatePermMultiplier(selectedBetType);
      const maxWin = stakeAmount * lines * multiplier;

      const newConfirmedBet = {
        gname: selectedGameType,
        line: lines.toString(),
        gtype: selectedBetType,
        bets: selectedNumbers,
        max_win: `₦${maxWin.toFixed(2)}`,
        total_stake: `₦${stakeAmount.toFixed(2)}`,
      };

      setConfirmedBet(newConfirmedBet);
    }
  };

  const calculateDirectMultiplier = (requiredNumbers) => {
    switch (requiredNumbers) {
      case 2:
        return 240;
      case 3:
        return 2100;
      case 4:
        return 6000;
      case 5:
        return 44000;
      default:
        return 0;
    }
  };

  const calculatePermMultiplier = (permType) => {
    switch (permType) {
      case "PERM 2":
        return 240;
      case "PERM 3":
        return 2100;
      case "PERM 4":
        return 6000;
      case "PERM 5":
        return 44000;
      default:
        return 0;
    }
  };

  const calculatePermLines = (requiredNumbers) => {
    // Define a mapping of required numbers to possible lines for PERM bets
    const linesMapping = {
      2: 3,
      3: 6,
      4: 10,
      5: 15,
      6: 21,
      7: 28,
      8: 36,
      9: 45,
      10: 55,
    };

    return linesMapping[requiredNumbers] || 0;
  };

  const localStorageKey = "betSlip";
  useEffect(() => {
    const savedBetSlip = localStorage.getItem(localStorageKey);
    if (savedBetSlip) {
      setConfirmedBet(JSON.parse(savedBetSlip));
    }
  }, []);

  useEffect(() => {
    if (confirmedBet) {
      localStorage.setItem(localStorageKey, JSON.stringify(confirmedBet));
    } else {
      localStorage.removeItem(localStorageKey);
    }
  }, [confirmedBet]);

  const handleCancelBet = () => {
    // Clear the confirmed bet and remove it from localStorage
    setConfirmedBet(null);
    localStorage.removeItem(localStorageKey);
    clearRandomize(null);
  };
  const imageSrc = `/images/${id}.png`;

  return (
    <>
      <Navbar />
      <div className="container">
        <form
          action=""
          method="post"
          onSubmit={handleConfirmBet}
          name="play_form"
          id="play_form"
        >
          <p className="mt-5">
            <strong>Select Operator &gt;&gt; {id}</strong>
          </p>
          <br />
          <div className="div_lgrey">
            <div className="row">
              <div className="col-md-2 col-xs-4">
                <img src={imageSrc} className="img-fluid" />
              </div>
              <div className="col-md-6 col-xs-8">
                <div className="row">
                  <div className="col-md-6">
                    <select
                      name="game"
                      className="form-control"
                      required
                      id="game"
                      value={selectedGameType}
                      onChange={handleGameChange}
                    >
                      <option value="">Select Game</option>

                      {perOperator.map((item, index) => {
                        // Check if the operator is "lotto_nigeria"
                        if (id === "lotto_nigeria") {
                          return (
                            <option key={index} value={item.drawAlias}>
                              {item.drawAlias}
                            </option>
                          );
                        } else if (id === "lottomania") {
                          return (
                            <option key={index} value={item.gn}>
                              {item.gn}
                            </option>
                          );
                        } else if (id === "wesco") {
                          return (
                            <option
                              className="text-uppercase"
                              key={index}
                              value={item.drawname}
                            >
                              {item.drawname}
                            </option>
                          );
                        }

                        return null; // For other operators, you can add similar checks
                      })}
                    </select>
                    <br />
                    <select
                      name="gtype"
                      className="form-select p-2 mb-2 blue_dropdown_select w-100"
                      required=""
                      id="gtype"
                      value={selectedBetType}
                      onChange={handleBetTypeChange}
                    >
                      <option value="">Bet type</option>
                      <option value="2 DIRECT">2 DIRECT</option>
                      <option value="PERM 2">PERM 2</option>
                      <option value="3 DIRECT">3 DIRECT</option>
                      <option value="PERM 3">PERM 3</option>
                      <option value="4 DIRECT">4 DIRECT</option>
                      <option value="PERM 4">PERM 4</option>
                      <option value="5 DIRECT">5 DIRECT</option>
                      <option value="PERM 5">PERM 5</option>
                    </select>
                    &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                    {/* <p className=" btn btn-light p-2 mb-2">Bet History</p> */}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xs-12 hidden-xs">
                <div className="meg_active_game_scroll_div">
                  <table cellPadding="10" width="100%">
                    <tbody>
                      <tr>
                        <th colSpan="2">
                          <p
                            style={{ background: "#406777" }}
                            className="text-white p-4 text-center"
                          >
                            Active Games
                          </p>
                        </th>
                      </tr>

                      {perOperator.map((item, index) => {
                        if (id === "lotto_nigeria") {
                          const drawDateTime = moment(
                            item.drawDate,
                            "DD/MM/YYYY HH:mm"
                          );
                          const currentTime = moment();
                          const timeDifference = drawDateTime.diff(currentTime);

                          if (timeDifference > 0) {
                            return (
                              <>
                                <tr key={index}>
                                  <td>
                                    <small>
                                      <strong>{item.drawAlias}:</strong>
                                    </small>
                                  </td>
                                  <td>
                                    <small>
                                      <span>
                                        <small>
                                          <Countdown
                                            date={
                                              currentTime.valueOf() +
                                              timeDifference
                                            }
                                            renderer={({
                                              days,
                                              hours,
                                              minutes,
                                              seconds,
                                            }) => (
                                              <>
                                                {days}days {hours}hrs {minutes}
                                                mins {seconds}secs
                                              </>
                                            )}
                                          />
                                        </small>
                                      </span>
                                    </small>
                                  </td>
                                </tr>
                              </>
                            );
                          } else {
                            return null;
                          }
                        } else if (id === "wesco") {
                          const drawDateTimeString = `${item.drawdate} ${item.drawtime}`;
                          const drawDateTime = moment(
                            drawDateTimeString,
                            "YYYYMMDD HH:mm:ss"
                          );
                          const currentTime = moment();
                          const timeDifference = drawDateTime.diff(currentTime);

                          if (timeDifference > 0) {
                            return (
                              <>
                                <tr key={index}>
                                  <td>
                                    <small>
                                      <strong>{item.drawname}:</strong>
                                    </small>
                                  </td>
                                  <td>
                                    <small>
                                      <span>
                                        <small>
                                          <Countdown
                                            date={
                                              currentTime.valueOf() +
                                              timeDifference
                                            }
                                            renderer={({
                                              days,
                                              hours,
                                              minutes,
                                              seconds,
                                            }) => (
                                              <>
                                                {days}days {hours}hrs {minutes}
                                                mins {seconds}secs
                                              </>
                                            )}
                                          />
                                        </small>
                                      </span>
                                    </small>
                                  </td>
                                </tr>
                              </>
                            );
                          } else {
                            return null;
                          }
                         
                        } else if (id === "lottomania") {
                          const drawDateTime = moment(item.sdt);

                          const currentTime = moment();
                          const timeDifference = drawDateTime.diff(currentTime);

                          if (timeDifference > 0) {
                            return (
                              <>
                                <tr key={index}>
                                  <td>
                                    <small>
                                      <strong>{item.gn}:</strong>
                                    </small>
                                  </td>
                                  <td>
                                    <small>
                                      <span>
                                        <small>
                                          <Countdown
                                            date={
                                              currentTime.valueOf() +
                                              timeDifference
                                            }
                                            renderer={({
                                              days,
                                              hours,
                                              minutes,
                                              seconds,
                                            }) => (
                                              <>
                                                {days}days {hours}hrs {minutes}
                                                mins {seconds}secs
                                              </>
                                            )}
                                          />
                                        </small>
                                      </span>
                                    </small>
                                  </td>
                                </tr>
                              </>
                            );
                          } else {
                            return null;
                          }
                        }

                        return null; // For other operators, you can add similar checks
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row mb-5">
            <div className="col-md-8">
              <div className="div_lgrey">
                <div className="row">
                  <div className="col-md-4">
                    <a
                      id="randomize"
                      style={{ cursor: "pointer" }}
                      onClick={randomizeCheckbox}
                    >
                      <i className="fa fa-crosshairs"></i> Randomize
                    </a>
                  </div>

                  <div className="col-md-4" style={{ cursor: "pointer" }}>
                    <a id="crandomize" onClick={clearRandomize}>
                      <i className="fa fa-cube"></i> Clear Randomize
                    </a>
                  </div>
                  <div className="col-md-4" style={{ cursor: "pointer" }}>
                    <a id="crandomize">
                      <i className="fa fa-dashboard"></i> Bet History
                    </a>
                  </div>
                </div>
                <hr />
                <p>
                  <small>Select numbers manually or use randomizer</small>
                </p>
                <br />
                <div>{checkboxes}</div>
                <br />
                <br />
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Amount"
                  required
                  id="stakeAmount"
                />
                <br />
                <button
                  name="cont_btn"
                  className="btn btn-primary btn-block btn-lg btn-blue w-100"
                  id="cont_btn"
                  onClick={handleConfirmBet}
                >
                  CONFIRM BET
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div id="bet_slip">
                <div
                  style={{ background: "#4067770D" }}
                  className="div_dgrey text-center p-4"
                >
                  <p>Bet Slip</p>
                </div>
                {confirmedBet && (
                  <div className="div_lgrey" style={{ marginTop: "-20px" }}>
                    <b>Game Name: {confirmedBet.gname}</b> <br />
                    <br />
                    <div id="bet_info">
                      <strong>Lines: {confirmedBet.line}</strong>
                      <span id="bline"></span>
                      <br />
                      <br />
                      <strong>Type: {confirmedBet.gtype}</strong>
                      <span id="btype"></span>
                      <br />
                      <br />
                      <strong>My bets: {confirmedBet.bets.join(" ")} </strong>

                      <span id="bbets"></span>

                      <div
                        className="d-flex justify-content-between mt-3 mb-3"
                        style={{
                          background: "#fff",
                          border: "1px solid #406777",
                          borderRadius: "5px",
                        }}
                      >
                        <p className="mt-2 p-1">0.0</p>
                        <p className="mt-2 p-1">₦</p>
                      </div>
                      <div className="d-flex justify-content-around mt-3 mb-3">
                        <a
                          style={{ color: "#406777!important" }}
                          className="btn mt-2 p-1 bg-light"
                        >
                          20
                        </a>
                        <a className="btn mt-2 p-1">50</a>
                        <a className="btn mt-2 p-1">100</a>
                        <a className="btn mt-2 p-1">200</a>
                      </div>

                      <p>
                        <p>Maximum Win: {confirmedBet.max_win}</p>
                        <span id="bmax_win"></span>
                      </p>
                      <p>
                        <p>Total Stake: {confirmedBet.total_stake}</p>
                        <span id="btotal_stake"></span>
                      </p>

                      <br />
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <a
                              className="btn btn-trans2 btn-block btn-outline-danger"
                              id="bcancel"
                              onClick={handleCancelBet}
                            >
                              Cancel
                            </a>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <a
                              className="btn btn-blue btn-block"
                              id="bplace_bet"
                            >
                              Place Bet
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlayGames;
