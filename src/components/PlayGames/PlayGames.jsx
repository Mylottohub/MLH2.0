// import React from 'react'

import Navbar from "../Navbar";
// import CheckboxForm from "./CheckedForm";
// import { toast } from "react-toastify";
import "../../assets/css/play.css";
import React, { useEffect, useState } from "react";

const PlayGames = () => {
  const [selectedBetType, setSelectedBetType] = useState("");
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

  const handleBetTypeChange = (event) => {
    const newBetType = event.target.value;
    setSelectedBetType(newBetType);

    // Clear the selected numbers and count immediately when the bet type changes.
    setSelectedNumbers([]);
    setSelectedCount(0);
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

  const checkboxes = [];

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
                  <b className="mb-2">Wesco VAG</b>
                  <div className="d-flex mb-5">
                    <p>27:06:2021 | 10:20 AM</p>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <small>...this game ends in 06hr:07m:02s</small>
                  </div>
                  <div className="col-md-12 d-flex">
                    <select
                      name="gtype"
                      className="form-select p-2 mb-2 blue_dropdown_select w-25"
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
                    <p className=" btn btn-light p-2 mb-2">Bet History</p>
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
                    <a id="randomize">
                      <i className="fa fa-crosshairs"></i> Randomize
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a id="crandomize">
                      <i className="fa fa-cube"></i> Clear Randomize
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a id="crandomize">
                      <i className="fa fa-dashboard"></i> Price Structure
                    </a>
                  </div>
                </div>
                <hr />
                <p>
                  <small>Select numbers manually or use randomizer</small>
                </p>
                <br />
                <div>{checkboxes}</div>
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
                    <br />
                    <strong>
                      <span id="bgname"></span>
                    </strong>
                  </p>
                  <b>Wesco VAG</b>
                </div>
                <div className="div_lgrey">
                  <div id="bet_info">
                    <strong>Lines: 1</strong>
                    <span id="bline"></span>
                    <br />
                    <br />
                    <strong>Type: NAP 2 </strong>
                    <span id="btype"></span>
                    <br />
                    <br />
                    <strong>My bets: 25, 24, 38, 12 </strong>
                    <span id="bbets"></span>
                    <br />
                    <br />
                    <p>
                      <p>Maximum Win: ₦234,000.00</p>
                      <span id="bmax_win"></span>
                    </p>
                    <p>
                      <p>Total Stake: ₦200</p>
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
                          <a className="btn btn-blue btn-block" id="bplace_bet">
                            Place Bet
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlayGames;
