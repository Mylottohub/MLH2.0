// import React from 'react'

import Navbar from "../Navbar";
// import CheckboxForm from "./CheckedForm";
import { toast } from "react-toastify";
import "../../assets/css/play.css";
import React, { useEffect, useState } from "react";

const PlayGames = () => {
  const [selectedBetType, setSelectedBetType] = useState("");
  const [selectedGameType, setSelectedGameType] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0); // Track selected count
  const maxSelectableNumbers = {
    "2 DIRECT": 2,
    "3 DIRECT": 3,
    "4 DIRECT": 4,
    "5 DIRECT": 5,
    "PERM 2": 24,
    "PERM 3": 24,
    "PERM 5": 24,
  };
  const [confirmedBet, setConfirmedBet] = useState(null);

  const handleConfirmBet = () => {
    const newConfirmedBet = {
      gname: selectedGameType, 
      line: "1", 
      gtype: selectedBetType, 
      bets:selectedNumbers, 
      max_win: "₦234,000.00", 
      total_stake: "₦200",
    };

    setConfirmedBet(newConfirmedBet);
  };

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
    setSelectedGameType(game)
  }

  const checkboxes = [];
  const randomizeCheckbox = () => {
    if (!selectedBetType) {
      toast.error("Select Bet Type");
      return;
    }

    const gtype = selectedBetType;
    let count;

    switch (gtype) {
      case "2 DIRECT":
        count = 2;
        break;
      case "3 DIRECT":
        count = 3;
        break;
      case "4 DIRECT":
        count = 4;
        break;
      case "5 DIRECT":
        count = 5;
        break;
      case "6 DIRECT":
        count = 6;
        break;
      case "PERM 2":
        count = 4;
        break;
      case "PERM 3":
        count = 6;
        break;
      case "PERM 4":
        count = 8;
        break;
      case "PERM 5":
        count = 10;
        break;
      case "PERM 6":
        count = 12;
        break;
      default:
        break;
    }

    const mustCheck = count;
    const checkboxes = document.querySelectorAll(".chk-btn");

    if (mustCheck >= checkboxes.length) {
      toast.error("Not enough numbers available for this bet type.");
      return;
    }

    const randomIndices = [];
    while (randomIndices.length < mustCheck) {
      const randomIndex = Math.floor(Math.random() * checkboxes.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = randomIndices.includes(index);
    });
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

  return (
    <>
      <Navbar />
      <div className="container">
        <form action="" method="post" name="play_form" id="play_form">
          <p className="mt-5">
            <strong>Select Operator &gt;&gt; Wesco</strong>
          </p>
          <br />
          <div className="div_lgrey">
            <div className="row">
              <div className="col-md-2 col-xs-4">
                <img
                  src="https://www.mylottohub.com/images/operator/Wesco-Logo.png"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6 col-xs-8">
                <div className="row">
                  {/* <b className="mb-2">Wesco VAG</b>
                  <div className="d-flex mb-5">
                    <p>27:06:2021 | 10:20 AM</p>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <small>...this game ends in 06hr:07m:02s</small>
                  </div> */}
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
                      <option value="WESCO GREEN">WESCO GREEN</option>
                      <option value="WESCO GREEN MACH">WESCO GREEN MACH</option>
                      <option value="WESCO BONUS">WESCO BONUS</option>
                      <option value="WESCO BONUS MACH">WESCO BONUS MACH</option>
                      <option value="WESCO TREASURE">WESCO TREASURE</option>
                      <option value="WESCO TREASURE MACH">WESCO TREASURE MACH</option>
                      <option value="WESCO MIDWEEK">WESCO MIDWEEK</option>
                      <option value="WESCO KEY">WESCO KEY</option>
                      <option value="WESCO KEY MACH">WESCO KEY MACH</option>
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
                            Select Next Game
                          </p>
                        </th>
                      </tr>
                      <tr>
                        <td>
                          <small>
                            <strong>Wesco VAG:</strong>
                          </small>
                        </td>
                        <td>
                          <small>
                            <span data-countdown2="2023/09/14 10:40:00">
                              <small>00 days 00 hrs 38 mins 20 secs</small>
                            </span>
                          </small>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <small>
                            <strong>WESCO BONANZA:</strong>
                          </small>
                        </td>
                        <td>
                          <small>
                            <span data-countdown2="2023/09/14 11:50:00">
                              <small>00 days 01 hrs 48 mins 20 secs</small>
                            </span>
                          </small>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <small>
                            <strong>WESCO LUCKY MACH:</strong>
                          </small>
                        </td>
                        <td>
                          <small>
                            <span data-countdown2="2023/09/14 22:25:00">
                              <small>00 days 12 hrs 23 mins 20 secs</small>
                            </span>
                          </small>
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
                  value=""
                  placeholder="Amount"
                  required
                  name="amount"
                 
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
                  <p>
                    Bet Slip
                    {/* <br />
                    <strong>
                      <span id="bgname"></span>
                    </strong> */}
                  </p>
                </div>
                {confirmedBet && (
                  <div className="div_lgrey" style={{marginTop:'-20px'}}>
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
                     <strong>My bets: {confirmedBet.bets.join(' ')} </strong>

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
