import Navbar from "../Navbar";
import { toast } from "react-toastify";
import "../../assets/css/play.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";

const PlayGames = () => {
  const [selectedBetType, setSelectedBetType] = useState("");
  const [selectedGameType, setSelectedGameType] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfrimBet, setIsLoadingConfirmBet] = useState(false);
  const [isLoadingPlayBet, setIsLoadingPlayBet] = useState(false);
  const [perOperator, setPerOperator] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
      checkbox.disabled = false; // Enable the checkboxes
    });
    setSelectedNumbers([]);
    setSelectedCount(0);
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

  const handleConfirmBet = async (e) => {
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
      toast.success("Bet Slip Updated successfully");
    } else if (selectedBetType.startsWith("PERM")) {
      const requiredNumbers = selectedBetType.includes("PERM 2")
        ? 3 // Minimum of 3 numbers for PERM 2
        : selectedBetType.includes("PERM 3")
        ? 4 // Minimum of 4 numbers for PERM 3
        : selectedBetType.includes("PERM 4")
        ? 5 // Minimum of 5 numbers for PERM 4
        : selectedBetType.includes("PERM 5")
        ? 6 // Minimum of 6 numbers for PERM 5
        : 0;

      if (requiredNumbers === 0) {
        toast.error("Invalid Bet Type");
        return;
      }

      if (selectedNumbers.length < requiredNumbers) {
        toast.error(
          `Select at least ${requiredNumbers} numbers for ${selectedBetType}`
        );
        return;
      }

      const lines = await calculatePermLines(selectedBetType, selectedNumbers);
      const multiplier = calculatePermMultiplier(selectedBetType);
      const maxWin = stakeAmount * lines * multiplier;
      const totalStakeAmount = stakeAmount * lines;

      const newConfirmedBet = {
        gname: selectedGameType,
        line: lines.toString(),
        gtype: selectedBetType,
        bets: selectedNumbers,
        max_win: `₦${maxWin.toFixed(2)}`,
        total_stake: `₦${totalStakeAmount.toFixed(2)}`,
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
  const calculatePermLines = async (gameType, selectedNumbers) => {
    setIsLoadingConfirmBet(true);
    try {
      const response = await fetch(
        "https://sandbox.mylottohub.com/v1/line-calculator",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            gameType: gameType,
            num: selectedNumbers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data) {
        toast.success("Bet Slip Updated successfully");
      }
      return data;
    } catch (error) {
      console.error("Error calculating lines:", error);
      return 0;
    } finally {
      setIsLoadingConfirmBet(false);
    }
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
    setConfirmedBet(null);
    localStorage.removeItem(localStorageKey);
    clearRandomize(null);
    toast.success("Bet Slip Canceled Successfully");
  };

  const mapToOperatorPayload = (operatorType, betInfo, selectedWallet) => {
    const { gname, line, gtype, bets, max_win, total_stake } = betInfo;

    // Assuming operatorData is an array of games
    const selectedGame = perOperator.find((game) => {
      if (operatorType === "lotto_nigeria") {
        return game.drawAlias === gname;
      } else if (operatorType === "wesco") {
        return game.drawname === gname;
      } else if (operatorType === "green_lotto") {
        return game.drawname === gname;
      } else if (operatorType === "lottomania") {
        return game.gn === gname;
      } else if (operatorType === "ghana_game") {
        return game.gn === gname;
      }
      // Add other cases as needed

      return false;
    });

    if (!selectedGame) {
      console.error(`Game not found: ${gname}`);
      return {};
    }

    switch (operatorType) {
      case "lotto_nigeria":
        return {
          userID: userInfo.data.id,
          line,
          betname: gtype,
          isPerm: gtype.startsWith("PERM") ? 1 : 0,
          max_win: parseFloat(max_win.replace("₦", "")),
          ball: bets,
          wallet: selectedWallet,
          operator_type: operatorType,
          game_name: gname,
          amount: total_stake.replace("₦", ""),
          total: total_stake.replace("₦", ""),
          sdt: selectedGame.drawDate,
          drawID: selectedGame.drawId,
          drawDate: selectedGame.drawDate,
          drawTime: selectedGame.drawDate,
        };
      case "wesco":
        return {
          userID: userInfo.data.id,
          line,
          betname: gtype,
          isPerm: gtype.startsWith("PERM") ? 1 : 0,
          max_win: parseFloat(max_win.replace("₦", "")),
          ball: bets,
          wallet: selectedWallet,
          operator_type: operatorType,
          game_name: gname,
          amount: total_stake.replace("₦", ""),
          total: total_stake.replace("₦", ""),
          sdt: selectedGame.drawtime,
          drawID: selectedGame.drawid,
          drawDate: selectedGame.drawdate,
          drawTime: selectedGame.drawtime,
          closetime: selectedGame.closetime,
        };
      case "green_lotto":
        return {
          userID: userInfo.data.id,
          line,
          betname: gtype,
          isPerm: gtype.startsWith("PERM") ? 1 : 0,
          max_win: parseFloat(max_win.replace("₦", "")),
          ball: bets,
          wallet: selectedWallet,
          operator_type: operatorType,
          game_name: gname,
          amount: total_stake.replace("₦", ""),
          total: total_stake.replace("₦", ""),
          sdt: selectedGame.drawtime,
          drawID: selectedGame.drawid,
          drawDate: selectedGame.drawdate,
          drawTime: selectedGame.drawtime,
          closetime: selectedGame.closetime,
        };
      case "lottomania": {
        return {
          userID: userInfo.data.id,
          line,
          betname: gtype,
          isPerm: gtype.startsWith("PERM") ? 1 : 0,
          max_win: parseFloat(max_win.replace("₦", "")),
          ball: bets,
          wallet: selectedWallet,
          operator_type: operatorType,
          game_name: gname,
          amount: total_stake.replace("₦", ""),
          total: total_stake.replace("₦", ""),
          gid: selectedGame.gid,
          sdt: selectedGame.sdt,
          // drawID: selectedGame.drawid,
          drawDate: selectedGame.sdt,
          drawTime: selectedGame.sdt,
          closetime: selectedGame.sdt,
          // gid: operatorData.gid,
          // sdt: sdtDate,
          // drawDate: sdtDate,
          // drawTime: sdtDate,
          // closetime: sdtDate,
        };
      }
      case "ghana_game": {
        return {
          userID: userInfo.data.id,
          line,
          betname: gtype,
          isPerm: gtype.startsWith("PERM") ? 1 : 0,
          max_win: parseFloat(max_win.replace("₦", "")),
          ball: bets,
          operator_type: operatorType,
          game_name: gname,
          wallet: selectedWallet,
          amount: total_stake.replace("₦", ""),
          total: total_stake.replace("₦", ""),
          gid: selectedGame.gid,
          sdt: selectedGame.sdt,
          // drawID: selectedGame.drawid,
          drawDate: selectedGame.sdt,
          drawTime: selectedGame.sdt,
          closetime: selectedGame.sdt,
          // gid: operatorData.gid,
          // sdt: sdtDate,
          // drawDate: sdtDate,
          // drawTime: sdtDate,
          // closetime: sdtDate,
        };
      }
      default:
        // Handle other operators as needed
        return {};
    }
  };

  const playGame = async () => {
    setIsLoadingPlayBet(true);
    if (!confirmedBet) {
      toast.error("No bet confirmed to play.");
      return;
    }

    const selectedWallet = document.getElementById("account").value;

    const payload = mapToOperatorPayload(id, confirmedBet, selectedWallet);

    try {
      const response = await fetch(
        "https://sandbox.mylottohub.com/v1/play-games",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const responseError = await response.json();
      // const data = await response.json();
      if (!response.ok) {
        toast.error(responseError.msg);
        // throw new Error("Network response was not ok");
      } else {
        localStorage.removeItem(localStorageKey);
        toast.success("Your selected game has been submitted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPlayBet(false);
    }
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
            <strong className="text-capitalize">
              {id === "lotto_nigeria" ? (
                <strong> Select Operator &gt;&gt; Set Lotto</strong>
              ) : id === "ghana_game" ? (
                <strong> Select Operator &gt;&gt; 5/90 Games</strong>
              ) : (
                <strong>Select Operator &gt;&gt; {id}</strong>
              )}
            </strong>
          </p>
          <br />
          <div className="div_lgrey">
            <div className="row">
              <div className="col-4 col-lg-2 app__play-games">
                <img src={imageSrc} className="img-fluid" />
              </div>
              <div className="col-8 col-lg-6 app__play-bet">
                <div className="row">
                  <div className="col-12 col-lg-6">
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
                        } else if (id === "ghana_game") {
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
                        } else if (id === "green_lotto") {
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

                        return null;
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
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 hidden-xs">
                <div className="meg_active_game_scroll_div">
                  <table cellPadding="10" width="100%">
                    <tbody>
                      <tr>
                        <th colSpan="2">
                          <p
                            style={{ background: "#406777" }}
                            className="text-white  text-center"
                          >
                            Active Games
                          </p>
                        </th>
                      </tr>

                      {isLoading ? (
                        <div className="spinner text-dark text-center">
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        perOperator.map((item, index) => {
                          if (id === "lotto_nigeria") {
                            const drawDateTime = moment(
                              item.drawDate,
                              "DD/MM/YYYY HH:mm"
                            );
                            const currentTime = moment();
                            const timeDifference =
                              drawDateTime.diff(currentTime);

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
                                                  {days}days {hours}hrs{" "}
                                                  {minutes}
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
                            const timeDifference =
                              drawDateTime.diff(currentTime);

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
                                                  {days}days {hours}hrs{" "}
                                                  {minutes}
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
                          } else if (id === "green_lotto") {
                            const drawDateTimeString = `${item.drawdate} ${item.drawtime}`;
                            const drawDateTime = moment(
                              drawDateTimeString,
                              "YYYYMMDD HH:mm:ss"
                            );
                            const currentTime = moment();
                            const timeDifference =
                              drawDateTime.diff(currentTime);

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
                                                  {days}days {hours}hrs{" "}
                                                  {minutes}
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
                            const timeDifference =
                              drawDateTime.diff(currentTime);

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
                                                  {days}days {hours}hrs{" "}
                                                  {minutes}
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
                          } else if (id === "ghana_game") {
                            const drawDateTime = moment(item.sdt);

                            const currentTime = moment();
                            const timeDifference =
                              drawDateTime.diff(currentTime);

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
                                                  {days}days {hours}hrs{" "}
                                                  {minutes}
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
                        })
                      )}
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
                  <div className="col-md-4 mb-3">
                    <a
                      id="randomize"
                      style={{ cursor: "pointer" }}
                      onClick={randomizeCheckbox}
                    >
                      <i className="fa fa-crosshairs"></i> Randomize
                    </a>
                  </div>

                  <div className="col-md-4 mb-3" style={{ cursor: "pointer" }}>
                    <a id="crandomize" onClick={clearRandomize}>
                      <i className="fa fa-cube"></i> Clear Randomize
                    </a>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/bet-history/${id}`);
                    }}
                    className="col-md-4"
                    style={{ cursor: "pointer" }}
                  >
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

                <Button
                  type="submit"
                  name="cont_btn"
                  className="btn btn-primary btn-block btn-lg btn-blue w-100"
                  id="cont_btn"
                  onClick={handleConfirmBet}
                  disabled={isLoadingConfrimBet}
                >
                  {isLoadingConfrimBet ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "CONFIRM BET"
                  )}
                </Button>
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
                      <br />
                      <br />

                      <strong>My bets: {confirmedBet.bets.join(", ")} </strong>

                      <span id="bbets"></span>

                      {/* <div
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
                      </div> */}

                      <p className="fw-bold mt-4">
                        Maximum Win: {confirmedBet.max_win}
                      </p>

                      <p className="fw-bold mt-4">
                        Total Stake: {confirmedBet.total_stake}
                      </p>
                      <br />
                      <br />
                      <label className="fw-bolder">Play From:</label>

                      <br />
                      <br />
                      <select
                        name="account"
                        className="form-control"
                        id="account"
                      >
                        <option value="wallet">Main Wallet</option>

                        <option value="gl_bwallet">
                          Operator Bonus Wallet
                        </option>
                        <option value="ref_give">Referral Bonus Wallet</option>
                      </select>
                      <br />
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
                          <Button
                            type="submit"
                            className="btn btn-blue btn-block"
                            onClick={playGame}
                            disabled={isLoadingPlayBet}
                          >
                            {isLoadingPlayBet ? (
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
