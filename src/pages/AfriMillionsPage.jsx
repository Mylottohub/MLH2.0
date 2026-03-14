import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    const location = useLocation();
    const { userInfo } = useSelector((state) => state.auth);

    const queryParams = new URLSearchParams(location.search);
    const gameType = queryParams.get('type') || '6_49';
    const is590 = gameType === '5_90';
    const is555 = gameType === '5_55';

    const [gameData, setGameData] = useState(null);
    const [isLoadingGame, setIsLoadingGame] = useState(true);
    const [operatorLogo, setOperatorLogo] = useState("/images/afrimillions.png");
    const [lines, setLines] = useState([{ id: 1, numbers: [] }]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const [selectedBetOption, setSelectedBetOption] = useState(is590 ? "2" : "");
    const [stakeAmount, setStakeAmount] = useState("");

    // Game configuration
    const MAX_LINES = 1;
    const MAX_NUMBERS_PER_LINE = is590 ? parseInt(selectedBetOption || "2") : is555 ? 5 : 6;
    const COST_PER_LINE = is590 ? 100 : is555 ? 200 : 1000; // Fixed ₦100 for 5/90, ₦200 for 5/55, ₦1000 for 6/49
    const TOTAL_NUMBERS = is590 ? 90 : is555 ? 55 : 49;
    const OPERATOR_TYPE = is590 ? "afri_millions_5_90" : is555 ? "afri_millions_5_55" : "afri_millions";
    const GAME_TITLE = is590 ? "Afrimillion 5/90" : is555 ? "Afrimillion 5/55" : "Afrimillion 6/49";
    const BET_HISTORY_ROUTE = is590 ? "/bet-history/afri_millions_5_90" : is555 ? "/" : "/";

    // Winnings based on NAP selection for 5/90
    const NAP_WINNINGS = {
        "2": 25000,      // NAP2: ₦25,000
        "3": 250000,     // NAP3: ₦250,000
        "4": 1000000,    // NAP4: ₦1,000,000
        "5": 10000000    // NAP5: ₦10,000,000
    };

    // Get potential winnings
    const getPotentialWinnings = () => {
        if (is590) return NAP_WINNINGS[selectedBetOption] || 0;
        return null; // For 6/49 and 5/55, we show jackpot instead
    };

    // Fetch operator logo
    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const response = await HTTP.get("/display-operators");
                let afrimillions;
                
                if (is555) {
                    // For 5/55, look for "Afrimillions 555"
                    afrimillions = response.data.data.find(
                        (op) => op.name.toLowerCase() === "afrimillions 555"
                    );
                } else {
                    // For 6/49 and 5/90, look for "Afrimillions"
                    afrimillions = response.data.data.find(
                        (op) => op.name.toLowerCase() === "afrimillions"
                    );
                }
                
                if (afrimillions?.logo) setOperatorLogo(afrimillions.logo);
            } catch (error) {
                console.error("Error fetching logo:", error);
            }
        };
        fetchLogo();
    }, [is555]);

    useEffect(() => {
        const fetchGame = async () => {
            setIsLoadingGame(true);
            try {
                const response = await HTTP.post(
                    "/get-games",
                    { operator_type: OPERATOR_TYPE },
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
    }, [OPERATOR_TYPE]);

    // Reset lines when bet option changes for 5/90
    useEffect(() => {
        if (is590) {
            setLines([{ id: 1, numbers: [] }]);
            setCurrentLineIndex(0);
        }
    }, [selectedBetOption, is590]);

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

    // Handle bet option change for 5/90
    const handleBetOptionChange = (option) => {
        setSelectedBetOption(option);
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
            document.querySelectorAll(".main-bg_ball").forEach((checkbox) => {
                checkbox.checked = false;
            });
        }, 0);
    };

    // Switch line
    const handleSwitchLine = (index) => setCurrentLineIndex(index);

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

        if (is590 && !selectedBetOption) {
            toast.error("Please select a bet option (NAP2, NAP3, NAP4, or NAP5)");
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
        if (completeLines.length > 1) {
            toast.error("Only one line is allowed per play");
            return;
        }

        if (!userInfo?.data?.id) {
            toast.error("Please login to proceed");
            return;
        }

        if (!gameData) {
            toast.error("Game data not loaded");
            return;
        }

        if (is590 && !selectedBetOption) {
            toast.error("Please select a bet option (NAP2, NAP3, NAP4, or NAP5)");
            return;
        }

        if (completeLines.length === 0) {
            toast.error("Complete at least one line");
            return;
        }

        const incompleteLines = lines.filter(
            l => l.numbers.length > 0 && l.numbers.length < MAX_NUMBERS_PER_LINE
        );

        if (incompleteLines.length > 0) {
            const lineNumbers = incompleteLines.map(l => l.id).join(", ");
            toast.warning(
                `Line(s) ${lineNumbers} are incomplete. Each line must have exactly ${MAX_NUMBERS_PER_LINE} numbers.`,
                { autoClose: 5000 }
            );
            return;
        }

        setIsSubmitting(true);
        try {
            const promises = completeLines.map((line) => {
                const payload = {
                    userID: userInfo.data.id,
                    line: "1",
                    ball: line.numbers.sort((a, b) => a - b),
                    operator_type: OPERATOR_TYPE,
                    game_name: gameData.GameName,
                    amount: COST_PER_LINE.toString(),
                    total: COST_PER_LINE.toString(),
                    gid: gameData.GameId,
                    drawID: gameData.GameDraw,
                    drawTime: gameData.drawTime.toString(),
                    closetime: gameData.endTime.toString(),
                    wallet: "wallet",
                };

                // Add betoption for 5/90
                if (is590) {
                    payload.betoption = selectedBetOption;
                }

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
                    `${completeLines.length} line placed! ₦${totalAmount.toLocaleString()} Successfully`
                );
                setLines([{ id: 1, numbers: [] }]);
                setCurrentLineIndex(0);
                setTimeout(() => navigate(BET_HISTORY_ROUTE), 2000);
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
                <div className="container-afri">
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
                <div className="container-afri">
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
                    className="chk-btn main-bg_ball"
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
            <div className="container-afri">
                <form onSubmit={handleConfirmBet} name="play_form" id="play_form">
                    <p className="mt-5">
                        <strong className="text-capitalize fw-bolder text-dark">
                            Select Operator &gt;&gt; {GAME_TITLE}
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
                            <div className="col-8 col-lg-6 app__play-bet_afri">
                                <div className="row">
                                    <div className="col-12 app__afri-49">
                                        <h4 className="fw-bold">{GAME_TITLE}</h4>
                                        <p className="text-muted mb-2">
                                            {moment(getDrawTime()).format("DD/MM/YYYY h:mm A")}
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-sm fw-bolder"
                                            onClick={() => navigate(BET_HISTORY_ROUTE)}
                                        >
                                            View Bet History
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Active Games Section */}
                            <div className="col-12 col-lg-4">
                                <div>
                                    <div className="jackpot-banner mb-4">
                                        <div className="countdown-display">
                                            <span className="countdown-label text-white" style={{ fontSize: "18px" }}>
                                                Count down: <CountdownTimer date={getDrawTime()} />
                                            </span>
                                        </div>
                                        <div className="jackpot-display">
                                            <h3 className="jackpot-text">
                                                {is590 && selectedBetOption 
                                                    ? `WIN ₦${getPotentialWinnings().toLocaleString()}` 
                                                    : is555 
                                                    ? '₦55.5M JACKPOT'
                                                    : '1 BILLION NAIRA JACKPOT'}
                                            </h3>
                                            <p className="jackpot-subtext text-dark fw-bolder" style={{ fontSize: "18px" }}>
                                                {is555 ? 'Live Draw Every Day at 5:55PM' : 'Live Draw Every Saturday 8PM'}
                                            </p>
                                        </div>
                                    </div>
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
                                <div className="row mb-3">
                                    <div className="row align-items-center">
                                        <div className="col-6 d-flex justify-content-start">
                                            <a
                                                onClick={handleRandomize}
                                                className="text-decoration-none"
                                                style={{ cursor: "pointer", color: "#2d5563" }}
                                            >
                                                Randomize
                                            </a>
                                        </div>
                                        <div className="col-6 d-flex justify-content-end">
                                            <a
                                                onClick={() => setShowHowToPlay(true)}
                                                className="text-decoration-none"
                                                style={{ cursor: "pointer", color: "#2d5563" }}
                                            >
                                                ❓ How to Play
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Bet Options for 5/90 */}
                                {is590 && (
                                    <div className="bet-options-section mb-3">
                                        <p style={{ cursor: "pointer", color: "#2d5563" }} className="fw-bolder mb-2">Select Bet Type:</p>
                                        <select
                                            className="form-select fw-bolder"
                                            style={{ cursor: "pointer", color: "#2d5563" }}
                                            value={selectedBetOption || ""}
                                            onChange={(e) => handleBetOptionChange(e.target.value)}
                                        >
                                            <option style={{ cursor: "pointer", color: "#2d5563" }} className="form-select fw-bolder" value="" disabled>
                                                -- Select bet type --
                                            </option>
                                            <option style={{ cursor: "pointer", color: "#2d5563" }} className="form-select fw-bolder" value="2">NAP2 (Pick 2) - Win ₦25,000</option>
                                            <option style={{ cursor: "pointer", color: "#2d5563" }} className="form-select fw-bolder" value="3">NAP3 (Pick 3) - Win ₦250,000</option>
                                            <option style={{ cursor: "pointer", color: "#2d5563" }} className="form-select fw-bolder" value="4">NAP4 (Pick 4) - Win ₦1,000,000</option>
                                            <option style={{ cursor: "pointer", color: "#2d5563" }} className="form-select fw-bolder" value="5">NAP5 (Pick 5) - Win ₦10,000,000</option>
                                        </select>
                                    </div>
                                )}

                                {/* Number Selection Header */}
                                <div className="selection-info-afri mb-3">
                                    <p className="mb-2 fw-bolder">
                                        Number selection
                                        <span className="float-end text-danger fw-bold">
                                            ₦{COST_PER_LINE} per play {is590 && '(Fixed)'}
                                        </span>
                                    </p>
                                    <p className="mb-2 app__strong mt-3">
                                        <p className="fw-bolder">
                                            Pick {MAX_NUMBERS_PER_LINE} {is590 && `(${selectedBetOption ? `NAP${selectedBetOption}` : 'Select bet type'})`}
                                        </p>
                                    </p>
                                </div>

                                {/* Show potential winnings for 5/90 */}
                                {is590 && selectedBetOption && (
                                    <div className="alert alert-success fw-bolder mb-3">
                                        <strong>💰 Potential Winnings:</strong> ₦{getPotentialWinnings().toLocaleString()}
                                    </div>
                                )}

                                <p>
                                    <small className="fw-bolder" style={{ color: "#406777" }}>
                                        Select numbers manually or use randomizer
                                    </small>
                                </p>
                                <br />

                                {/* Number Grid */}
                                <div className={`numbers-container fade-in slide-up ${is555 ? 'game-555' : ''}`}>
                                    {checkboxes}
                                </div>
                            </div>
                        </div>

                        {/* Bet Slip Section */}
                        <div className="col-md-4">
                            <div id="bet_slip" className={is555 ? 'game-555' : ''}>
                                <div
                                    style={{ background: "#4067770D" }}
                                    className="div_dgrey text-center p-4"
                                >
                                    <p className="fw-bolder text-dark mb-0">Bet Slip</p>
                                    <small>{GAME_TITLE}</small>
                                </div>

                                <div className="div_lgrey" style={{ marginTop: "-20px" }}>
                                    {lines.map((line, index) => (
                                        <div
                                            key={line.id}
                                            className={`bet-line ${index === currentLineIndex ? "active" : ""}`}
                                            onClick={() => handleSwitchLine(index)}
                                        >
                                            <div className="line-header">
                                                <strong>Line</strong>
                                                <span className="text-muted">
                                                    Type {is590 ? `5/90 (NAP${selectedBetOption || '?'})` : is555 ? '5/55' : '6/49'}
                                                </span>
                                            </div>

                                            <div className="line-content">
                                                <span className="my-bets-label">My bets:</span>
                                                <div className="bet-numbers">
                                                    {line.numbers.length > 0 ? (
                                                        line.numbers.map((num) => (
                                                            <span key={num} className="chk-btn">
                                                                {String(num).padStart(2, "0")}
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

                                    {/* Total Stake */}
                                    <div className="total-section">
                                        <label className="fw-bold">Total stake:</label>
                                        <input
                                            type="text"
                                            className="form-control text-end fw-bold"
                                            value={`₦${totalAmount}`}
                                            readOnly
                                        />
                                        {is590 && (
                                            <small className="text-muted d-block mt-1">
                                                * Fixed at ₦100 per play
                                            </small>
                                        )}
                                        {is555 && (
                                            <small className="text-muted d-block mt-1">
                                                * Fixed at ₦200 per play
                                            </small>
                                        )}
                                    </div>

                                    <br />

                                    {/* Action Buttons */}
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger btn-block w-100"
                                                onClick={() => {
                                                    setLines([{ id: 1, numbers: [] }]);
                                                    setCurrentLineIndex(0);
                                                }}
                                                disabled={isSubmitting || completeLines.length === 0}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <Button
                                                type="button"
                                                className="btn btn-blue btn-block w-100"
                                                onClick={handlePlaceBet}
                                                disabled={isSubmitting || completeLines.length === 0 || (is590 && !selectedBetOption)}
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

            {/* How to Play Modal */}
            {showHowToPlay && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
                    style={{ zIndex: 9999 }}
                >
                    <div
                        className="bg-white rounded-4 p-4 w-100 h-100 overflow-auto"
                        style={{ maxWidth: "700px" }}
                    >
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold mb-0" style={{ color: "#406777" }}>
                                🎯 How to Play {GAME_TITLE}
                            </h4>
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setShowHowToPlay(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <hr />

                        {/* Jackpot/Prize Highlight */}
                        <div className="mb-4">
                            {is590 ? (
                                <>
                                    <p className="fw-bolder fs-5 mb-1">
                                        💰 Win Up To <span style={{ color: "#406777" }}>₦10,000,000!</span>
                                    </p>
                                    <p>
                                        AfriMillions 5/90 offers <strong>massive prizes</strong> based on your NAP selection.
                                        Match all your numbers to win big!
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="fw-bolder fs-5 mb-1">
                                        💰 {is555 ? 'Win the ' : 'Play for the '}
                                        <span style={{ color: "#406777" }}>
                                            {is555 ? '₦55.5M JACKPOT!' : '₦1,000,000,000 JACKPOT'}
                                        </span>
                                    </p>
                                    <p>
                                        {is555 ? (
                                            <>
                                                AfriMillions 5/55 gives you a chance to win <strong>₦55.5 Million</strong>.
                                                Match all {MAX_NUMBERS_PER_LINE} numbers to claim the jackpot!
                                            </>
                                        ) : (
                                            <>
                                                AfriMillions gives you a chance to become a billionaire overnight.
                                                Match all {MAX_NUMBERS_PER_LINE} numbers and win the massive <strong>₦1 Billion Jackpot</strong>.
                                            </>
                                        )}
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Intro */}
                        <p className="mb-4">
                            {is590 ? (
                                <>
                                    AfriMillions 5/90 is a lottery game where you select between <strong>2 to 5 numbers</strong> from <strong>1 to 90</strong> based on your chosen NAP option.
                                </>
                            ) : is555 ? (
                                <>
                                    AfriMillions 5/55 is a lottery game where you select <strong>5 numbers</strong> from <strong>1 to 55</strong> and compete for life-changing rewards.
                                </>
                            ) : (
                                <>
                                    AfriMillions is a <strong>6/49 lottery game</strong> where you select six numbers and compete for life-changing rewards.
                                </>
                            )}
                        </p>

                        {/* Steps */}
                        <ol className="fs-6">
                            {is590 ? (
                                <>
                                    <li className="mb-3">
                                        <strong>Select your bet type and see your prize:</strong>
                                        <ul className="mt-2">
                                            <li><strong>NAP2</strong> - Pick 2 numbers → Win <strong className="text-success">₦25,000</strong></li>
                                            <li><strong>NAP3</strong> - Pick 3 numbers → Win <strong className="text-success">₦250,000</strong></li>
                                            <li><strong>NAP4</strong> - Pick 4 numbers → Win <strong className="text-success">₦1,000,000</strong></li>
                                            <li><strong>NAP5</strong> - Pick 5 numbers → Win <strong className="text-success">₦10,000,000</strong></li>
                                        </ul>
                                    </li>
                                    <li className="mb-3">
                                        <strong>Fixed stake: ₦100 per play</strong> - You cannot stake more or less.
                                    </li>
                                    <li className="mb-3">
                                        Select numbers <strong>manually</strong> or use <strong>Randomize</strong> 🎲.
                                    </li>
                                    <li className="mb-3">
                                        Click <strong>"Place Bet"</strong> to confirm your entry.
                                    </li>
                                    <li className="mb-3">
                                        The draw holds every <strong>Saturday at 8:00 PM</strong>.
                                    </li>
                                    <li className="mb-3">
                                        <strong>Match all your selected numbers</strong> to win the prize! 💎
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="mb-3">
                                        <strong>Pick exactly {MAX_NUMBERS_PER_LINE} numbers</strong> from <strong>1 to {TOTAL_NUMBERS}</strong>.
                                    </li>
                                    <li className="mb-3">
                                        Each line costs <strong>₦{COST_PER_LINE.toLocaleString()}</strong>{is555 ? ' (Fixed)' : ''}.
                                    </li>
                                    <li className="mb-3">
                                        Select numbers <strong>manually</strong> or use <strong>Randomize</strong> 🎲.
                                    </li>
                                    <li className="mb-3">
                                        Click <strong>"Place Bet"</strong> to confirm your entry.
                                    </li>
                                    <li className="mb-3">
                                        The draw holds every <strong>{is555 ? 'Day at 5:55 PM' : 'Saturday at 8:00 PM'}</strong>.
                                    </li>
                                    <li className="mb-3">
                                        Match all <strong>{MAX_NUMBERS_PER_LINE} numbers</strong> to win the <strong>{is555 ? '₦55.5M Jackpot' : '₦1,000,000,000 Jackpot'}</strong> 💎.
                                    </li>
                                </>
                            )}
                            <li className="mb-3">
                                Winnings are paid directly into your <strong>wallet</strong>.
                                Track all bets and results in your <strong>Bet History</strong>.
                            </li>
                        </ol>

                        {/* Tips */}
                        <div className="mt-4">
                            <h6 className="fw-bold mb-2">💡 Pro Tips</h6>
                            <ul className="fs-6">
                                <li>Every number has an equal chance.</li>
                                {is590 && (
                                    <>
                                        <li><strong>Higher NAP = Higher Prize!</strong> NAP5 offers ₦10 Million.</li>
                                        <li>Fixed ₦100 stake makes it affordable to play multiple times.</li>
                                    </>
                                )}
                                {!is590 && <li>Random picks are just as powerful as carefully chosen numbers.</li>}
                                <li>Always confirm your wallet balance before placing a bet.</li>
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 text-center">
                            <button
                                className="btn px-4 text-white"
                                style={{ background: "#406777" }}
                                onClick={() => setShowHowToPlay(false)}
                            >
                                {is590 ? "Got it, Let's Win Big! 🚀" : "Got it, Let's Win ₦1 Billion 🚀"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default AfriMillionsPage;