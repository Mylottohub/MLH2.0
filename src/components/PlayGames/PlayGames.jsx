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
import { HTTP } from "../../utils";
import { useQueryClient } from "@tanstack/react-query";
import Gd570Image from "/images/GD570.png";
import Gd580Image from "/images/GD580.png";
import Gd590Image from "/images/GD590.png";

const PlayGames = () => {
  const [selectedBetType, setSelectedBetType] = useState("");
  const [selectedPlayMode, setSelectedPlayMode] = useState("");
  const [selectedGameType, setSelectedGameType] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedJackpotGame, setSelectedJackpotGame] = useState("gd_70");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfrimBet, setIsLoadingConfirmBet] = useState(false);
  const [isLoadingPlayBet, setIsLoadingPlayBet] = useState(false);
  const [perOperator, setPerOperator] = useState([]);
  const [isSelectingTop, setIsSelectingTop] = useState(true);
  const [topSelectedNumber, setTopSelectedNumber] = useState(null);
  const [bottomSelectedNumber, setBottomSelectedNumber] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let bonusWalletValue = "";

  // Set bonusWalletValue based on id
  switch (id) {
    case "green_lotto":
      bonusWalletValue = "gl_bwallet";
      break;
    case "lotto_nigeria":
      bonusWalletValue = "sl_bwallet";
      break;
    case "lottomania":
      bonusWalletValue = "lm_bwallet";
      break;
    case "ghana_game":
      bonusWalletValue = "gh_bwallet";
      break;
    case "wesco":
      bonusWalletValue = "we_bwallet";
      break;
    default:
      bonusWalletValue = "";
  }

  let displayText;

  switch (bonusWalletValue) {
    case "gl_bwallet":
      displayText = "Green Lotto Bonus Wallet";
      break;
    case "gh_bwallet":
      displayText = "5/90 Bonus Wallet";
      break;
    case "sl_bwallet":
      displayText = "Set Lotto Bonus Wallet";
      break;
    case "lm_bwallet":
      displayText = "Lottomania Bonus Wallet";
      break;
    case "we_bwallet":
      displayText = "Wesco Bonus Wallet";
      break;
    default:
      displayText = "";
  }
  const handleJackpotSelection = (gameLogo) => {
    setSelectedJackpotGame(gameLogo);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let requestData = { operator_type: id };
      if (id === "GH_5_90") {
        requestData = { operator_type: "GH 5/90" };
      } else if (id.startsWith("gd_")) {
        if (id === "gd_jackpot") {
          requestData = {
            operator_type: "gd_lotto",
            gd_operator_type: "5/70",
          };
        } else {
          requestData = {
            operator_type: "gd_lotto",
            gd_operator_type: id.replace("gd_", "5/"),
          };
        }
      }

      try {
        const response = await HTTP.post("/get-games", requestData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setPerOperator(data.result);
        } else {
          throw new Error("Network response was not ok");
        }
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
    "1 BANKER": 1,
    AGAINST: 2,
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
  const handlePlayModeChange = (event) => {
    const newPlayMode = event.target.value;
    setSelectedPlayMode(newPlayMode);

    // Clear selected numbers
    clearSelectedNumbers();

    // Clear checkboxes
    const checkboxes = document.querySelectorAll(".chk-btn");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  // const handleCheckboxChange = (event) => {
  //   const value = event.target.value;
  //   const isNumber = !isNaN(value); // Check if it's a number or an alphabet
  //   const isSelected = selectedNumbers.includes(value);

  //   // Separate numbers and alphabets
  //   const selectedNumbersOnly = selectedNumbers.filter((item) => !isNaN(item));
  //   const selectedAlphabetsOnly = selectedNumbers.filter((item) => isNaN(item));

  //   if (isSelected) {
  //     const updatedSelection = selectedNumbers.filter((item) => item !== value);
  //     setSelectedNumbers(updatedSelection);
  //     return;
  //   }

  //   if (id === "NNP") {
  //     if (isNumber) {
  //       if (selectedNumbersOnly.length >= 3) {
  //         toast.error("You can only select up to 3 numbers (0-9) for NNP.");
  //         return;
  //       }
  //       setSelectedNumbers([...selectedNumbers, value]);
  //     } else {
  //       if (selectedAlphabetsOnly.length >= 2) {
  //         toast.error("You can only select up to 2 alphabets (A-Z) for NNP.");
  //         return;
  //       }
  //       setSelectedNumbers([...selectedNumbers, value]);
  //     }
  //   } else {
  //     if (selectedCount < maxSelectableNumbers[selectedBetType]) {
  //       setSelectedNumbers([...selectedNumbers, value]);
  //       setSelectedCount(selectedCount + 1);
  //     } else {
  //       alert(
  //         `You cannot select more than ${maxSelectableNumbers[selectedBetType]} numbers for ${selectedBetType}`
  //       );
  //     }
  //   }
  // };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isSelected = selectedNumbers.includes(value);
    const isNumber = !isNaN(value); // Check if it's a number or a letter

    // Separate numbers and alphabets for NNP validation
    const selectedNumbersOnly = selectedNumbers.filter((item) => !isNaN(item));
    const selectedAlphabetsOnly = selectedNumbers.filter((item) => isNaN(item));

    if (isSelected) {
      // If already selected, remove it
      const updatedSelection = selectedNumbers.filter((item) => item !== value);
      setSelectedNumbers(updatedSelection);
      return;
    }
    if (selectedBetType === "AGAINST") {
      if (isSelectingTop) {
        setTopSelectedNumber(value);
      } else {
        setBottomSelectedNumber(value);
      }
    }
    if (id === "NNP") {
      if (isNumber) {
        if (selectedNumbersOnly.length >= 3) {
          toast.error("You can only select up to 3 numbers (0-9) for NNP.");
          return;
        }
      } else {
        if (selectedAlphabetsOnly.length >= 2) {
          toast.error("You can only select up to 2 alphabets (A-Z) for NNP.");
          return;
        }
      }
      setSelectedNumbers([...selectedNumbers, value]);
    } else {
      if (selectedNumbers.length < maxSelectableNumbers[selectedBetType]) {
        setSelectedNumbers([...selectedNumbers, value]);
      }
    }
  };

  const handleGameChange = (e) => {
    const game = e.target.value;
    // console.log(game);
    setSelectedGameType(game);
  };

  const checkboxes = [];

  const randomizeCheckbox = () => {
    if (!selectedBetType) {
      toast.error("Select Bet Type");
      return;
    }

    if (
      !selectedPlayMode &&
      !["1 BANKER", "AGAINST"].includes(selectedBetType) &&
      playModes.some((mode) => mode.value === selectedPlayMode)
    ) {
      toast.error("Select Play Mode");
      return;
    }

    const gtype = selectedBetType;
    const checkboxes = document.querySelectorAll(".chk-btn");

    if (id === "NNP") {
      const numToRandomize = 3;
      const alphaToRandomize = 2;

      const availableNumbers = [];
      const availableAlphabets = [];

      checkboxes.forEach((checkbox) => {
        const value = checkbox.value;
        if (!isNaN(value)) {
          availableNumbers.push(value);
        } else {
          availableAlphabets.push(value);
        }
      });

      if (
        availableNumbers.length < numToRandomize ||
        availableAlphabets.length < alphaToRandomize
      ) {
        toast.error(
          "Not enough numbers or alphabets available for randomization."
        );
        return;
      }

      const getRandomElements = (array, count) => {
        const result = [];
        while (result.length < count) {
          const randomIndex = Math.floor(Math.random() * array.length);
          const selected = array[randomIndex];
          if (!result.includes(selected)) {
            result.push(selected);
          }
        }
        return result;
      };

      const randomizedNumbers = getRandomElements(
        availableNumbers,
        numToRandomize
      );
      const randomizedAlphabets = getRandomElements(
        availableAlphabets,
        alphaToRandomize
      );

      const randomizedSelections = [
        ...randomizedNumbers,
        ...randomizedAlphabets,
      ];

      setSelectedNumbers(randomizedSelections);

      checkboxes.forEach((checkbox) => {
        checkbox.checked = randomizedSelections.includes(checkbox.value);
      });

      return;
    }
    if (id === "gd_jackpot") {
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

      setSelectedNumbers(randomizedNumbers);

      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = randomIndices.includes(index);
      });

      if (gtype === "2 DIRECT" || gtype === "3 DIRECT") {
        checkboxes.forEach((checkbox) => {
          checkbox.disabled = true;
        });
      }
    }

    if (gtype.startsWith("AGAINST")) {
      if (checkboxes.length < 2) {
        toast.error("Not enough numbers available for AGAINST selection");
        return;
      }

      let randomTop, randomBottom;

      do {
        randomTop = Math.floor(Math.random() * 90) + 1;
        randomBottom = Math.floor(Math.random() * 90) + 1;
      } while (randomTop === randomBottom);

      setTopSelectedNumber(randomTop);
      setBottomSelectedNumber(randomBottom);

      setSelectedNumbers([randomTop, randomBottom]);

      setTimeout(() => {
        checkboxes.forEach((checkbox) => {
          checkbox.checked =
            parseInt(checkbox.value) === randomTop ||
            parseInt(checkbox.value) === randomBottom;
        });
      }, 100);

      toast.success(`Randomized: Top - ${randomTop}, Bottom - ${randomBottom}`);
    }

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

      setSelectedNumbers(randomizedNumbers);
      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = randomIndices.includes(index);
      });
    } else {
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

      setSelectedNumbers(randomizedNumbers);

      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = randomIndices.includes(index);
      });

      if (
        gtype === "2 DIRECT" ||
        gtype === "3 DIRECT" ||
        gtype === "4 DIRECT" ||
        gtype === "5 DIRECT"
      ) {
        checkboxes.forEach((checkbox) => {
          checkbox.disabled = true;
        });
      }
    }
  };

  const clearRandomize = () => {
    setSelectedNumbers([]);
    setSelectedCount(0);

    setTimeout(() => {
      const checkboxes = document.querySelectorAll(".chk-btn");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.disabled = false;
      });
    }, 0);
  };

  let maxNumber = 90;

  if (id === "gd_jackpot") {
    if (selectedJackpotGame === "gd_70") {
      maxNumber = 70;
    } else if (selectedJackpotGame === "gd_80") {
      maxNumber = 80;
    } else if (selectedJackpotGame === "gd_90") {
      maxNumber = 90;
    }
  } else if (id === "gd_70") {
    maxNumber = 70;
  } else if (id === "gd_80") {
    maxNumber = 80;
  } else if (id === "gd_90") {
    maxNumber = 90;
  } else if (id === "NNP") {
    maxNumber = 9;
  }

  const alphabetsCheckboxes = [];
  if (id === "NNP") {
    for (let x = 0; x <= 9; x++) {
      const checkId = `c${x}`;
      const isChecked = selectedNumbers.includes(x.toString());
      checkboxes.push(
        <React.Fragment key={checkId}>
          <input
            type="checkbox"
            name="num[]"
            className="chk-btn"
            value={x}
            id={checkId}
            onChange={handleCheckboxChange}
            disabled={
              !isChecked &&
              selectedNumbers.filter((num) => !isNaN(num)).length >= 3
            }
          />
          <label htmlFor={checkId}>{x}</label>
        </React.Fragment>
      );
    }

    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const checkId = `c${letter}`;
      alphabetsCheckboxes.push(
        <React.Fragment key={checkId}>
          <input
            type="checkbox"
            name="num[]"
            className="chk-btn"
            value={letter}
            id={checkId}
            onChange={handleCheckboxChange}
            disabled={
              selectedNumbers.filter((num) => isNaN(num)).length >= 2 &&
              !selectedNumbers.includes(letter)
            }
          />
          <label htmlFor={checkId}>{letter}</label>
        </React.Fragment>
      );
    }
  } else {
    for (let x = id === "gd_70" ? 1 : 1; x <= maxNumber; x++) {
      const checkId = `c${x}`;
      const value = String(x);
      const isChecked = selectedNumbers.includes(value);

      const isDisabled =
        selectedNumbers.length >= maxSelectableNumbers[selectedBetType] &&
        !isChecked;

      checkboxes.push(
        <React.Fragment key={checkId}>
          <input
            type="checkbox"
            name="num[]"
            className="chk-btn"
            value={x}
            id={checkId}
            onChange={handleCheckboxChange}
            disabled={isDisabled}
          />
          <label htmlFor={checkId}>{x}</label>
        </React.Fragment>
      );
    }
    // for (let x = id === "gd_70" ? 1 : 1; x <= maxNumber; x++) {
    //   const checkId = `c${x}`;
    //   const value = String(x);
    //   const isChecked = selectedNumbers.includes(value);

    // const isDisabled =
    //   selectedNumbers.length >= maxSelectableNumbers[selectedBetType] &&
    //   !isChecked;

    //   checkboxes.push(
    //     <React.Fragment key={checkId}>
    //       <input
    //         type="checkbox"
    //         name="num[]"
    //         className="chk-btn"
    //         value={value}
    //         id={checkId}
    //         onChange={handleCheckboxChange}
    //         checked={isChecked}
    //         disabled={isDisabled}
    //       />
    //       <label htmlFor={checkId}>{x}</label>
    //     </React.Fragment>
    //   );
    // }
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

    if (
      !selectedPlayMode &&
      ["gd_70", "gd_80", "gd_90"].includes(id) &&
      !["1 BANKER", "AGAINST"].includes(selectedBetType)
    ) {
      toast.error("Select Play Mode");
      return;
    }

    const stakeAmount = parseFloat(
      document.getElementById("stakeAmount").value
    );

    if (isNaN(stakeAmount)) {
      toast.error("Invalid stake amount");
      return;
    }

    const minStake = id === "NNP" ? 100 : 10;

    if (stakeAmount < minStake) {
      toast.error(`Minimum stake amount is ₦${minStake}`);
      return;
    }
    const maxStake = 100;

    if (stakeAmount < minStake) {
      toast.error(`Minimum stake amount is ₦${minStake}`);
      return;
    }

    if (id === "NNP" && stakeAmount > maxStake) {
      toast.error(`Maximum stake amount for NNP is ₦${maxStake}`);
      return;
    }

    const validDirectTypes = ["2 DIRECT", "3 DIRECT", "4 DIRECT", "5 DIRECT"];

    const gameTypeKey = ["gd_70", "gd_80", "gd_90"].includes(id) ? id : null;

    if (validDirectTypes.includes(selectedBetType)) {
      const requiredNumbers = maxSelectableNumbers[selectedBetType];

      if (selectedNumbers.length !== requiredNumbers) {
        toast.error(
          `Select exactly ${requiredNumbers} numbers for ${selectedBetType}`
        );
        return;
      }

      const multiplier = gameTypeKey
        ? calculateDirectMultiplier(requiredNumbers, gameTypeKey)
        : calculateDirectMultiplier(requiredNumbers);

      const maxWin = stakeAmount * multiplier;

      const newConfirmedBet = {
        gname: selectedGameType,
        line: "1",
        gtype: selectedBetType,
        ptype: selectedPlayMode,
        bets: selectedNumbers,
        max_win: `${maxWin.toFixed(2)}`,
        total_stake: `₦${stakeAmount.toFixed(2)}`,
      };

      setConfirmedBet(newConfirmedBet);

      toast.success("Bet Slip Updated successfully");
    } else if (id === "NNP") {
      const selectedNumbersOnly = selectedNumbers.filter(
        (item) => !isNaN(item)
      );
      const selectedAlphabetsOnly = selectedNumbers.filter((item) =>
        isNaN(item)
      );

      if (
        selectedNumbersOnly.length !== 3 ||
        selectedAlphabetsOnly.length !== 2
      ) {
        toast.error(
          "For NNP, select exactly 3 numbers (0-9) and 2 letters (A-Z)."
        );
        return;
      }

      const formattedBet = [
        ...selectedNumbersOnly,
        ...selectedAlphabetsOnly,
      ].join("");

      const lines = selectedBetType.startsWith("PERM") ? 12 : 1;
      const totalStakeAmount = 100 * lines;

      const newConfirmedBet = {
        gname: selectedGameType,
        line: lines.toString(),
        gtype: selectedBetType,
        bets: formattedBet,
        total_stake: `${totalStakeAmount.toFixed(2)}`,
      };

      setConfirmedBet(newConfirmedBet);
      toast.success("Bet Slip Updated successfully");
    } else if (selectedBetType.startsWith("PERM")) {
      const requiredNumbers = selectedBetType.includes("PERM 2")
        ? 3
        : selectedBetType.includes("PERM 3")
        ? 4
        : selectedBetType.includes("PERM 4")
        ? 5
        : selectedBetType.includes("PERM 5")
        ? 6
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
      const multiplier = gameTypeKey
        ? calculatePermMultiplier(selectedBetType, gameTypeKey)
        : calculatePermMultiplier(selectedBetType);

      const maxWin = stakeAmount * lines * multiplier;
      const totalStakeAmount = stakeAmount * lines;

      const newConfirmedBet = {
        gname: selectedGameType,
        line: lines.toString(),
        gtype: selectedBetType,
        ptype: selectedPlayMode,
        bets: selectedNumbers,
        max_win: `${maxWin.toFixed(2)}`,
        total_stake: `₦${totalStakeAmount.toFixed(2)}`,
      };
      setConfirmedBet(newConfirmedBet);
    } else if (selectedBetType.startsWith("1 BANKER")) {
      const requiredNumbers = maxSelectableNumbers[selectedBetType];

      if (selectedNumbers.length !== requiredNumbers) {
        toast.error(
          `Select exactly ${requiredNumbers} numbers for ${selectedBetType}`
        );
        return;
      }
      const gameTypeKey = ["gd_70", "gd_80", "gd_90", "GH_5_90"].includes(id)
        ? id
        : null;
      const multiplier = await calculateOneBankerMultiplier(
        requiredNumbers,
        gameTypeKey
      );
      let lines = 1;
      if (["gd_70"].includes(id)) {
        lines = 69;
      } else if (["gd_80"].includes(id)) {
        lines = 79;
      } else if (["gd_90", "GH_5_90"].includes(id)) {
        lines = 89;
      }

      const totalStake = stakeAmount * lines;
      const maxWin = multiplier ? totalStake * multiplier : 0;

      const newConfirmedBet = {
        gname: selectedGameType,
        line: lines.toString(),
        gtype: selectedBetType,
        ptype: selectedPlayMode,
        bets: selectedNumbers,
        max_win: `${maxWin.toFixed(2)}`,
        total_stake: `₦${totalStake.toFixed(2)}`,
      };

      setConfirmedBet(newConfirmedBet);

      toast.success("Bet Slip Updated successfully");
    } else if (selectedBetType.startsWith("AGAINST")) {
      const requiredNumbers = maxSelectableNumbers[selectedBetType];

      if (!topSelectedNumber || !bottomSelectedNumber) {
        toast.error("Select one number from the top and one from the bottom.");
        return;
      }
      const gameTypeKey = ["gd_70", "gd_80", "gd_90", "GH_5_90"].includes(id)
        ? id
        : null;
      const multiplier = await calculateAgainstMultiplier(
        requiredNumbers,
        gameTypeKey
      );
      const stakeAmount = parseFloat(
        document.getElementById("stakeAmount").value
      );
      const maxWin = stakeAmount * multiplier;

      const newConfirmedBet = {
        gname: selectedGameType,
        line: "1",
        gtype: selectedBetType,
        ptype: selectedPlayMode,
        bets: [topSelectedNumber, bottomSelectedNumber],
        max_win: `${maxWin.toFixed(2)}`,
        total_stake: `₦${stakeAmount.toFixed(2)}`,
      };

      setConfirmedBet(newConfirmedBet);

      toast.success("Bet Slip Updated successfully");
    }
  };

  const calculateOneBankerMultiplier = (requiredNumbers, gameType) => {
    const gdMultipliers = {
      gd_70: { 1: 560 },
      gd_80: { 1: 720 },
      gd_90: { 1: 1000 },
      GH_5_90: { 1: 1000 },
    };

    if (gdMultipliers[gameType] && gdMultipliers[gameType][requiredNumbers]) {
      return gdMultipliers[gameType][requiredNumbers];
    }

    return 0;
  };

  const calculateAgainstMultiplier = (requiredNumbers, gameType) => {
    const gdMultipliers = {
      gd_70: { 2: 140 },
      gd_80: { 2: 180 },
      gd_90: { 2: 250 },
      GH_5_90: { 2: 250 },
    };

    if (gdMultipliers[gameType] && gdMultipliers[gameType][requiredNumbers]) {
      return gdMultipliers[gameType][requiredNumbers];
    }

    return 0;
  };

  const calculateDirectMultiplier = (requiredNumbers, gameType) => {
    const gdMultipliers = {
      gd_70: { 2: 140, 3: 1300, 4: 4000, 5: 30000 },
      gd_80: { 2: 180, 3: 1600, 4: 4600, 5: 35000 },
      gd_90: { 2: 250, 3: 2200, 4: 6200, 5: 46000 },
      GH_5_90: { 2: 250, 3: 2200, 4: 6200, 5: 46000 },
    };

    if (gameType in gdMultipliers) {
      return gdMultipliers[gameType]?.[requiredNumbers] || 0;
    }

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

  const calculatePermMultiplier = (permType, gameType) => {
    const gdMultipliers = {
      gd_70: { "PERM 2": 140, "PERM 3": 1300, "PERM 4": 4000, "PERM 5": 30000 },
      gd_80: { "PERM 2": 180, "PERM 3": 1600, "PERM 4": 4600, "PERM 5": 35000 },
      gd_90: { "PERM 2": 250, "PERM 3": 2200, "PERM 4": 6200, "PERM 5": 46000 },
      GH_5_90: {
        "PERM 2": 250,
        "PERM 3": 2200,
        "PERM 4": 6200,
        "PERM 5": 46000,
      },
    };

    if (gameType in gdMultipliers) {
      return gdMultipliers[gameType]?.[permType] || 0;
    }

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
      const response = await HTTP.post(
        "/line-calculator",
        {
          gameType: gameType,
          num: selectedNumbers,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        if (data) {
          toast.success("Bet Slip Updated successfully");
        }
        return data;
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error calculating lines:", error);
      return 0;
    } finally {
      setIsLoadingConfirmBet(false);
    }
  };

  const localStorageKey = "betSlip";
  useEffect(() => {
    const savedBetSlip = sessionStorage.getItem(localStorageKey);

    if (savedBetSlip) {
      setConfirmedBet(JSON.parse(savedBetSlip));
    }
  }, []);

  useEffect(() => {
    if (confirmedBet) {
      sessionStorage.setItem(localStorageKey, JSON.stringify(confirmedBet));
    } else {
      sessionStorage.removeItem(localStorageKey);
    }
  }, [confirmedBet]);

  const handleCancelBet = () => {
    setConfirmedBet(null);
    sessionStorage.removeItem(localStorageKey);
    clearRandomize(null);
    toast.success("Bet Slip Canceled Successfully");
  };

  const mapToOperatorPayload = (operatorType, betInfo, selectedWallet) => {
    const { gname, line, gtype, bets, max_win, total_stake, ptype } = betInfo;

    const selectedGame = perOperator.find((game) => {
      if (operatorType === "lotto_nigeria") {
        return game.drawAlias === gname;
      } else if (operatorType === "wesco") {
        return game.drawname === gname;
      } else if (operatorType === "green_lotto") {
        return game.drawname === gname;
      } else if (operatorType === "green_ghana_game") {
        return game.drawname === gname;
      } else if (operatorType === "lottomania") {
        return game.gn === gname;
      } else if (operatorType === "ghana_game") {
        return game.gn === gname;
      } else if (["gd_70", "gd_80", "gd_90"].includes(operatorType)) {
        return game.gameName === gname;
      } else if (operatorType === "GH_5_90") {
        return game.gameName === gname;
      } else if (operatorType === "NNP") {
        return game.gameName === gname;
      }
      return false;
    });

    if (!selectedGame) {
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
      case "green_ghana_game":
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
        };
      }
      case "gd_70":
      case "gd_80":
      case "gd_90": {
        let payload = {
          userID: userInfo.data.id,
          line,
          betname: gtype,
          isBanker: gtype === "1 BANKER" ? 1 : 0,
          isAgainst: gtype === "AGAINST" ? 1 : 0,
          max_win: parseFloat(max_win.replace("₦", "")),
          ball: bets,
          operator_type: "gd_lotto",
          gd_operator_type:
            operatorType === "gd_70"
              ? "5/70"
              : operatorType === "gd_80"
              ? "5/80"
              : "5/90",
          game_name: gname,
          amount: total_stake.replace("₦", ""),
          total: total_stake.replace("₦", ""),
          drawID: selectedGame.drawTypeId,
          drawTime: selectedGame.drawTime,
          closetime: selectedGame.drawTime,
          double_chance: ptype === "Dual Chance" ? 1 : 0,
          wallet: selectedWallet,
        };

        if (!payload.isBanker && !payload.isAgainst) {
          payload.isPerm = gtype.startsWith("PERM") ? 1 : 0;
        }

        return payload;
      }
      case "GH_5_90": {
        let payload = {
          userID: userInfo.data.id,
          line,
          betname: gtype,
          isBanker: gtype === "1 BANKER" ? 1 : 0,
          isAgainst: gtype === "AGAINST" ? 1 : 0,
          max_win: parseFloat(max_win.replace("₦", "")),
          ball: bets,
          operator_type: "gd_lotto",
          gd_operator_type: "GH 5/90",
          game_name: gname,
          amount: total_stake.replace("₦", ""),
          total: total_stake.replace("₦", ""),
          drawID: selectedGame.drawTypeId,
          drawTime: selectedGame.drawTime,
          closetime: selectedGame.drawTime,
          double_chance: 0,
          wallet: selectedWallet,
        };

        if (!payload.isBanker && !payload.isAgainst) {
          payload.isPerm = gtype.startsWith("PERM") ? 1 : 0;
        }

        return payload;
      }

      case "NNP": {
        let formattedBets =
          typeof bets === "string"
            ? bets
                .split("")
                .map((item) =>
                  !isNaN(item) ? Number(item) : item.toUpperCase()
                )
            : [];

        return {
          userID: userInfo.data.id,
          line,
          betname: gtype,
          ball: formattedBets,
          operator_type: "NNP",
          game_name: gname,
          amount: total_stake.replace("₦", ""),
          total: total_stake.replace("₦", ""),
          drawID: selectedGame.drawTypeId,
          drawTime: selectedGame.drawTime,
          closetime: selectedGame.drawTime,
          double_chance: 0,
          wallet: selectedWallet,
        };
      }
      default:
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
      const response = await HTTP.post("/play-games", payload, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Your selected game has been submitted successfully");
        navigate(`/play-game/${id}`);
        sessionStorage.removeItem(localStorageKey);

        setConfirmedBet(null);
        clearSelectedNumbers();
        clearRandomize();
        setSelectedGameType("");
        setSelectedBetType("");
        setSelectedPlayMode("");
        const checkboxes = document.querySelectorAll(".chk-btn");
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
        document.getElementById("stakeAmount").value = "";
        queryClient.invalidateQueries("GET_USER_PROFILE");
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("Insufficient Fund");
    } finally {
      setIsLoadingPlayBet(false);
    }
  };
  const gameImageMap = {
    gd_70: "GD570",
    gd_80: "GD580",
    gd_90: "GD590",
  };
  const gameTypes = [
    { image: Gd570Image, game_logo: "gd_70" },
    { image: Gd580Image, game_logo: "gd_80" },
    { image: Gd590Image, game_logo: "gd_90" },
  ];

  const imageSrc = `/images/${gameImageMap[id] || id}.png`;
  const allBetTypes = [
    { value: "2 DIRECT", label: "2 DIRECT" },
    { value: "PERM 2", label: "PERM 2" },
    { value: "3 DIRECT", label: "3 DIRECT" },
    { value: "PERM 3", label: "PERM 3" },
    { value: "4 DIRECT", label: "4 DIRECT" },
    { value: "PERM 4", label: "PERM 4" },
    { value: "5 DIRECT", label: "5 DIRECT" },
    { value: "PERM 5", label: "PERM 5" },
  ];

  const specialIds = ["gd_70", "gd_80", "gd_90", "GH_5_90"];
  const specialGh = ["gd_70", "gd_80", "gd_90"];

  const filteredBetTypes =
    id === "NNP"
      ? [
          { value: "STRAIGHT", label: "Straight" },
          { value: "PERM", label: "Perm" },
        ]
      : id === "gd_jackpot"
      ? [
          { value: "2 DIRECT", label: "Direct 2 Bundle" },
          { value: "3 DIRECT", label: "Direct 3 Bundle" },
        ]
      : specialIds.includes(id)
      ? [
          ...allBetTypes,
          { value: "1 BANKER", label: "1 BANKER" },
          { value: "AGAINST", label: "AGAINST" },
        ]
      : allBetTypes;
  const playModes = [
    { value: "Winning", label: "Winning" },
    { value: "Machine", label: "Machine" },
    { value: "Dual Chance", label: "Dual Chance" },
  ];
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
              ) : id === "green_lotto" ? (
                <strong> Select Operator &gt;&gt; Green Lotto</strong>
              ) : id === "green_ghana_game" ? (
                <strong> Select Operator &gt;&gt; Green Ghana Games</strong>
              ) : id === "gd_70" ? (
                <strong> Select Operator &gt;&gt; Gd Lotto 70</strong>
              ) : id === "gd_80" ? (
                <strong> Select Operator &gt;&gt; Gd Lotto 80</strong>
              ) : id === "gd_90" ? (
                <strong> Select Operator &gt;&gt; Gd Lotto 90</strong>
              ) : id === "GH_5_90" ? (
                <strong> Select Operator &gt;&gt; Gd GH 90</strong>
              ) : id === "gd_jackpot" ? (
                <strong> Select Operator &gt;&gt; Gd Jackpot</strong>
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

                      {perOperator?.map((item, index) => {
                        const isToday = moment(item?.sdt).isSame(
                          moment(),
                          "day"
                        );
                        if (id === "lotto_nigeria") {
                          return (
                            <option key={index} value={item.drawAlias}>
                              {item.drawAlias}
                            </option>
                          );
                        } else if (id === "lottomania" && isToday) {
                          return (
                            <option key={index} value={item.gn}>
                              {item.gn}
                            </option>
                          );
                        } else if (id === "ghana_game" && isToday) {
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
                        } else if (id === "green_ghana_game") {
                          return (
                            <option
                              className="text-uppercase"
                              key={index}
                              value={item.drawname}
                            >
                              {item.drawname}
                            </option>
                          );
                        } else if (
                          id === "gd_70" ||
                          id === "gd_80" ||
                          id === "gd_90"
                        ) {
                          return (
                            <option
                              className="text-uppercase"
                              key={index}
                              value={item.gameName}
                            >
                              {item.gameName}
                            </option>
                          );
                        } else if (id === "GH_5_90") {
                          return (
                            <option
                              className="text-uppercase"
                              key={index}
                              value={item.gameName}
                            >
                              {item.gameName}
                            </option>
                          );
                        } else if (id === "NNP") {
                          return (
                            <option
                              className="text-uppercase"
                              key={index}
                              value={item.gameName}
                            >
                              {item.gameName}
                            </option>
                          );
                        } else if (id === "gd_jackpot") {
                          if (index === 0) {
                            return (
                              <option
                                className="text-uppercase"
                                key={index}
                                value={item.gameName}
                              >
                                {item.gameName}
                              </option>
                            );
                          } else {
                            return null;
                          }
                        }
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
                      {filteredBetTypes.map((bet) => (
                        <option key={bet.value} value={bet.value}>
                          {bet.label}
                        </option>
                      ))}
                    </select>
                    {selectedBetType === "AGAINST" && (
                      <div className="btn-group my-3">
                        <p
                          className={`btn ${
                            isSelectingTop ? "btn-primary" : "btn-secondary"
                          }`}
                          onClick={() => setIsSelectingTop(true)}
                        >
                          Select Top
                        </p>
                        <p
                          className={`btn ${
                            !isSelectingTop ? "btn-primary" : "btn-secondary"
                          }`}
                          onClick={() => setIsSelectingTop(false)}
                        >
                          Select Bottom
                        </p>
                      </div>
                    )}
                    {!["1 BANKER", "AGAINST"].includes(selectedBetType) &&
                      specialGh.includes(id) && (
                        <select
                          name="playMode"
                          className="form-select p-2 mb-2 blue_dropdown_select w-100"
                          required
                          id="playMode"
                          value={selectedPlayMode}
                          onChange={handlePlayModeChange}
                        >
                          <option value="">Select Play Mode</option>
                          {playModes.map((mode) => (
                            <option key={mode.value} value={mode.value}>
                              {mode.label}
                            </option>
                          ))}
                        </select>
                      )}
                    &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 hidden-xs">
                <div className="meg_active_game_scroll_div">
                  <table cellPadding="10" width="100%">
                    <tbody>
                      <tr>
                        <th colSpan="3">
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
                        perOperator?.map((item, index) => {
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
                          } else if (id === "green_ghana_game") {
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
                            const drawDateTime = moment(item?.sdt);

                            const currentTime = moment();
                            const timeDifference =
                              drawDateTime.diff(currentTime);
                            perOperator.sort((a, b) => {
                              const drawDateTimeA = moment(b.sdt);
                              const drawDateTimeB = moment(a.sdt);
                              const timeDifferenceB =
                                drawDateTimeB.diff(currentTime);
                              const timeDifferenceA =
                                drawDateTimeA.diff(currentTime);
                              return timeDifferenceB - timeDifferenceA; // Sort in descending order
                            });

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
                            const drawDateTime = moment(item?.sdt);
                            const currentTime = moment();
                            const timeDifference =
                              drawDateTime.diff(currentTime);
                            perOperator.sort((a, b) => {
                              const drawDateTimeA = moment(b.sdt);
                              const drawDateTimeB = moment(a.sdt);
                              const timeDifferenceB =
                                drawDateTimeB.diff(currentTime);
                              const timeDifferenceA =
                                drawDateTimeA.diff(currentTime);
                              return timeDifferenceB - timeDifferenceA;
                            });

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
                              ("No Active Game Available");
                            }
                          } else if (
                            id === "gd_70" ||
                            id === "gd_80" ||
                            id === "gd_90" ||
                            id === "gd_jackpot"
                          ) {
                            const drawDateTime = moment(item?.drawTime);
                            const currentTime = moment();
                            const timeDifference =
                              drawDateTime.diff(currentTime);

                            perOperator.sort((a, b) => {
                              const drawDateTimeA = moment(b.drawTime);
                              const drawDateTimeB = moment(a.drawTime);
                              return (
                                drawDateTimeB.diff(currentTime) -
                                drawDateTimeA.diff(currentTime)
                              );
                            });

                            if (timeDifference > 0) {
                              return (
                                <tr key={index}>
                                  <td>
                                    <small>
                                      <strong>{item.gameName}</strong>
                                    </small>
                                  </td>
                                  <td>
                                    <img
                                      src={item.gameIconUrl}
                                      alt={item.gameTitle}
                                      width="100"
                                    />
                                  </td>
                                  <td>
                                    <small>
                                      <Countdown
                                        date={
                                          currentTime.valueOf() + timeDifference
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
                                  </td>
                                </tr>
                              );
                            }
                          } else if (id === "GH_5_90") {
                            const drawDateTime = moment(item?.drawTime);
                            const currentTime = moment();
                            const timeDifference =
                              drawDateTime.diff(currentTime);

                            perOperator.sort((a, b) => {
                              const drawDateTimeA = moment(b.drawTime);
                              const drawDateTimeB = moment(a.drawTime);
                              return (
                                drawDateTimeB.diff(currentTime) -
                                drawDateTimeA.diff(currentTime)
                              );
                            });

                            if (timeDifference > 0) {
                              return (
                                <tr key={index}>
                                  <td>
                                    <small>
                                      <strong>{item.gameName}</strong>
                                    </small>
                                  </td>
                                  <td>
                                    <img
                                      src={item.gameIconUrl}
                                      alt={item.gameTitle}
                                      width="100"
                                    />
                                  </td>
                                  <td>
                                    <small>
                                      <Countdown
                                        date={
                                          currentTime.valueOf() + timeDifference
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
                                  </td>
                                </tr>
                              );
                            }
                          } else if (id === "NNP") {
                            const drawDateTime = moment(item?.drawTime);
                            const currentTime = moment();
                            const timeDifference =
                              drawDateTime.diff(currentTime);

                            perOperator.sort((a, b) => {
                              const drawDateTimeA = moment(b.drawTime);
                              const drawDateTimeB = moment(a.drawTime);
                              return (
                                drawDateTimeB.diff(currentTime) -
                                drawDateTimeA.diff(currentTime)
                              );
                            });

                            if (timeDifference > 0) {
                              return (
                                <tr key={index}>
                                  <td>
                                    <small>
                                      <strong>{item.gameName}</strong>
                                    </small>
                                  </td>
                                  <td>
                                    <img
                                      src={item.gameIconUrl}
                                      alt={item.gameTitle}
                                      width="100"
                                    />
                                  </td>
                                  <td>
                                    <small>
                                      <Countdown
                                        date={
                                          currentTime.valueOf() + timeDifference
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
                                  </td>
                                </tr>
                              );
                            }
                          }

                          return null;
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
              {id === "gd_jackpot" && (
                <div className="row">
                  <strong>Select Game Type</strong>

                  {gameTypes.map(({ image, game_logo }, index) => (
                    <div key={index} className="col-3 p-2 mx-auto">
                      <img
                        src={image}
                        className={`img-fluid ${
                          selectedJackpotGame === game_logo ? "selected" : ""
                        }`}
                        onClick={() => handleJackpotSelection(game_logo)}
                        style={{
                          cursor: "pointer",
                          border:
                            selectedJackpotGame === game_logo
                              ? "2px solid #FDC718"
                              : "none",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

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
                      const adjustedId = [
                        "GH_5_90",
                        "gd_70",
                        "gd_80",
                        "gd_90",
                      ].includes(id)
                        ? "gd_lotto"
                        : id;
                      navigate(`/bet-history/${adjustedId}`);
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
                  <small>
                    Select{" "}
                    {id === "NNP"
                      ? "Numbers or Alphabets manually or use randomizer"
                      : "numbers manually or use randomizer"}{" "}
                  </small>
                </p>
                <br />
                <div>
                  {id === "NNP" && (
                    <div>
                      <h5>Select Exactly 3 Numbers</h5>
                      <div className="numbers-container">{checkboxes}</div>
                      <h5 className="mt-5">Select Exactly 2 Alphabets</h5>
                      <div className="alphabets-container">
                        {alphabetsCheckboxes}
                      </div>
                    </div>
                  )}
                  {id !== "NNP" && (
                    <>
                      {selectedBetType === "AGAINST" ? (
                        <div className="numbers-container">
                          {Array.from({ length: 90 }, (_, i) => i + 1).map(
                            (num) => {
                              const checkId = `num-${num}`;
                              const value = String(num);

                              const isChecked =
                                (isSelectingTop &&
                                  topSelectedNumber === value) ||
                                (!isSelectingTop &&
                                  bottomSelectedNumber === value);

                              const isDisabled =
                                (isSelectingTop &&
                                  bottomSelectedNumber === value) ||
                                (!isSelectingTop &&
                                  topSelectedNumber === value);

                              return (
                                <React.Fragment key={checkId}>
                                  <input
                                    type="checkbox"
                                    name="num[]"
                                    className="chk-btn"
                                    value={value}
                                    id={checkId}
                                    onChange={handleCheckboxChange}
                                    checked={isChecked}
                                    disabled={isDisabled}
                                  />
                                  <label htmlFor={checkId}>{num}</label>
                                </React.Fragment>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <div className="numbers-container">{checkboxes}</div>
                      )}
                    </>
                  )}
                </div>

                <br />
                <br />
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Amount"
                  required
                  value={id === "NNP" ? 100 : undefined}
                  id="stakeAmount"
                  disabled={id === "NNP"}
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
                    <b>Game Name: {confirmedBet?.gname}</b> <br />
                    <br />
                    <div id="bet_info">
                      <strong>Lines: {confirmedBet?.line}</strong>
                      <span id="bline"></span>
                      <br />
                      <br />
                      <strong>Type: {confirmedBet?.gtype}</strong>
                      <br />
                      <br />

                      <strong>
                        My bets:{" "}
                        {id === "NNP"
                          ? confirmedBet?.bets
                          : confirmedBet?.bets.join(", ")}
                      </strong>

                      {["gd_70", "gd_80", "gd_90"].includes(id) &&
                        confirmedBet?.ptype &&
                        !["AGAINST", "1 BANKER"].includes(
                          confirmedBet.ptype
                        ) && (
                          <p className="fw-bold mt-4">
                            Play Mode: {confirmedBet.ptype}
                          </p>
                        )}

                      {id !== "NNP" && confirmedBet?.max_win && (
                        <p className="fw-bold mt-4">
                          Maximum Win: ₦
                          {confirmedBet.ptype === "Dual Chance"
                            ? (
                                parseFloat(
                                  confirmedBet.max_win.replace("₦", "")
                                ) / 2
                              ).toFixed(2)
                            : confirmedBet.max_win}
                        </p>
                      )}

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
                        className="form-select"
                        id="account"
                      >
                        <option value="wallet">Main Wallet</option>

                        <option value={bonusWalletValue}>{displayText}</option>
                        {/* <option value="ref_give">Referral Bonus Wallet</option> */}
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
