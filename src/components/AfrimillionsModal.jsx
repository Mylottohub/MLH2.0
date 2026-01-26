import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import "../assets/css/afrimillions.css";

const AfriMillionsModal = ({ showModal, onClose, userInfo }) => {
  const [lines, setLines] = useState([
    { id: 1, numbers: [], isComplete: false }
  ]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_LINES = 7;
  const MAX_NUMBERS_PER_LINE = 6;
  const COST_PER_LINE = 1000;
  const TOTAL_NUMBERS = 49;
  const JACKPOT = 1000000000; // ₦1 Billion

  // Next draw time - Saturday 8:00 PM
  const getNextDrawTime = () => {
    const now = new Date();
    const nextSaturday = new Date();
    const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
    nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    nextSaturday.setHours(20, 0, 0, 0);
    
    if (now.getDay() === 6 && now.getHours() >= 20) {
      nextSaturday.setDate(nextSaturday.getDate() + 7);
    }
    
    return nextSaturday;
  };

  const currentLine = lines[currentLineIndex];

  // Handle number selection
  const handleNumberSelect = (number) => {
    const currentNumbers = currentLine.numbers;

    if (currentNumbers.includes(number)) {
      // Deselect number
      const updatedLines = [...lines];
      updatedLines[currentLineIndex].numbers = currentNumbers.filter(n => n !== number);
      updatedLines[currentLineIndex].isComplete = false;
      setLines(updatedLines);
    } else if (currentNumbers.length < MAX_NUMBERS_PER_LINE) {
      // Select number
      const updatedLines = [...lines];
      updatedLines[currentLineIndex].numbers = [...currentNumbers, number];
      updatedLines[currentLineIndex].isComplete = 
        updatedLines[currentLineIndex].numbers.length === MAX_NUMBERS_PER_LINE;
      setLines(updatedLines);
    }
  };

  // Quick Pick - Generate random numbers
  const handleQuickPick = () => {
    const availableNumbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
    const randomNumbers = [];

    while (randomNumbers.length < MAX_NUMBERS_PER_LINE) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      randomNumbers.push(availableNumbers[randomIndex]);
      availableNumbers.splice(randomIndex, 1);
    }

    randomNumbers.sort((a, b) => a - b);

    const updatedLines = [...lines];
    updatedLines[currentLineIndex].numbers = randomNumbers;
    updatedLines[currentLineIndex].isComplete = true;
    setLines(updatedLines);
  };

  // Clear current line
  const handleClear = () => {
    const updatedLines = [...lines];
    updatedLines[currentLineIndex].numbers = [];
    updatedLines[currentLineIndex].isComplete = false;
    setLines(updatedLines);
  };

  // Add new line
  const handleAddLine = () => {
    if (lines.length < MAX_LINES && currentLine.isComplete) {
      const newLine = {
        id: lines.length + 1,
        numbers: [],
        isComplete: false
      };
      setLines([...lines, newLine]);
      setCurrentLineIndex(lines.length);
    }
  };

  // Remove line
  const handleRemoveLine = (lineId) => {
    if (lines.length === 1) {
      toast.error("You must have at least one line");
      return;
    }

    const updatedLines = lines
      .filter(line => line.id !== lineId)
      .map((line, index) => ({ ...line, id: index + 1 }));

    setLines(updatedLines);
    
    if (currentLineIndex >= updatedLines.length) {
      setCurrentLineIndex(updatedLines.length - 1);
    }
  };

  // Switch active line
  const handleSwitchLine = (index) => {
    setCurrentLineIndex(index);
  };

  // Calculate totals
  const completeLines = lines.filter(line => line.isComplete);
  const totalAmount = completeLines.length * COST_PER_LINE;

  // Handle checkout
  const handleCheckout = async () => {
    if (completeLines.length === 0) {
      toast.error("Please complete at least one line");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`${completeLines.length} line(s) submitted successfully!`);
      onClose();
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animated Countdown
  const MotionCountdown = ({ date }) => (
    <Countdown
      date={date}
      renderer={({ days, hours, minutes, seconds }) => (
        <div className="afri-countdown">
          <motion.div 
            className="countdown-unit"
            key={`d-${days}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="countdown-value">{String(days).padStart(2, '0')}</span>
            <span className="countdown-label">Days</span>
          </motion.div>
          <motion.div 
            className="countdown-unit"
            key={`h-${hours}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="countdown-value">{String(hours).padStart(2, '0')}</span>
            <span className="countdown-label">Hours</span>
          </motion.div>
          <motion.div 
            className="countdown-unit"
            key={`m-${minutes}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="countdown-value">{String(minutes).padStart(2, '0')}</span>
            <span className="countdown-label">Mins</span>
          </motion.div>
          <motion.div 
            className="countdown-unit pulse"
            key={`s-${seconds}`}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="countdown-value">{String(seconds).padStart(2, '0')}</span>
            <span className="countdown-label">Secs</span>
          </motion.div>
        </div>
      )}
    />
  );

  return (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            className="afri-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="afri-modal-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="afri-modal-content">
              {/* Header Section */}
              {/* <div className="afri-header">
                <button className="afri-close-btn" onClick={onClose}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>

                <motion.div 
                  className="afri-logo"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="afri-logo-text">AFRIMILLIONS</span>
                  <span className="afri-logo-subtitle">LOTTERY</span>
                </motion.div>

                <motion.div 
                  className="afri-jackpot"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="jackpot-label">JACKPOT</div>
                  <div className="jackpot-amount">
                    ₦{JACKPOT.toLocaleString()}
                  </div>
                </motion.div>

                <motion.div 
                  className="afri-draw-info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="draw-schedule">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Every Saturday at 8:00 PM</span>
                  </div>
                  <div className="draw-countdown">
                    <span className="countdown-title">Next Draw In:</span>
                    <MotionCountdown date={getNextDrawTime()} />
                  </div>
                </motion.div>

                <div className="afri-instructions">
                  <p>Pick 6 numbers from 1-49 • ₦{COST_PER_LINE.toLocaleString()} per line • Max {MAX_LINES} lines</p>
                </div>
              </div> */}
              <div className="afri-header compact">
  <div className="header-left">
    <button className="afri-close-btn" onClick={onClose}>✕</button>

    <div className="afri-logo-inline text-white">
      <span>AFRIMILLIONS</span>
      <small>₦{JACKPOT.toLocaleString()}</small>
    </div>
  </div>

  <div className="header-right">
    <span className="draw-time">Next Draw</span>
    <MotionCountdown date={getNextDrawTime()} />
  </div>
</div>


              {/* Main Content Area */}
              <div className="afri-main">
                {/* Left Side - Number Selection */}
                <div className="afri-selection-panel">
                  <div className="selection-header">
                    <div className="line-indicator">
                      <span className="line-number">Line {currentLineIndex + 1}</span>
                      <span className="line-count">of {lines.length}</span>
                    </div>
                    <div className="selection-actions">
                      <motion.button
                        className="btn-quick-pick"
                        onClick={handleQuickPick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                            fill="currentColor"/>
                        </svg>
                        Quick Pick
                      </motion.button>
                      <motion.button
                        className="btn-clear"
                        onClick={handleClear}
                        disabled={currentLine.numbers.length === 0}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear
                      </motion.button>
                    </div>
                  </div>

                  {/* Selected Numbers Display */}
                  <div className="selected-numbers-container">
                    <AnimatePresence mode="popLayout">
                      {currentLine.numbers.length > 0 ? (
                        currentLine.numbers.map((number, index) => (
                          <motion.div
                            key={number}
                            className="selected-chip"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 30,
                              delay: index * 0.03 
                            }}
                            onClick={() => handleNumberSelect(number)}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {String(number).padStart(2, '0')}
                          </motion.div>
                        ))
                      ) : (
                        <motion.div 
                          className="empty-selection"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Select your numbers below
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="selection-progress">
                      <span className={currentLine.isComplete ? "complete" : ""}>
                        {currentLine.numbers.length}/{MAX_NUMBERS_PER_LINE} picked
                      </span>
                      {currentLine.isComplete && (
                        <motion.svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                        </motion.svg>
                      )}
                    </div>
                  </div>

                  {/* Number Grid */}
                  <motion.div 
                    className="number-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1).map((number) => {
                      const isSelected = currentLine.numbers.includes(number);
                      const isDisabled = !isSelected && currentLine.numbers.length >= MAX_NUMBERS_PER_LINE;

                      return (
                        <motion.button
                          key={number}
                          className={`number-ball ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                          onClick={() => !isDisabled && handleNumberSelect(number)}
                          disabled={isDisabled}
                          whileHover={!isDisabled ? { scale: 1.15, y: -2 } : {}}
                          whileTap={!isDisabled ? { scale: 0.95 } : {}}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: Math.floor((number - 1) / 7) * 0.02,
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                        >
                          {String(number).padStart(2, '0')}
                        </motion.button>
                      );
                    })}
                  </motion.div>

                  {/* Add Line Button */}
                  {lines.length < MAX_LINES && (
                    <motion.button
                      className="btn-add-line"
                      onClick={handleAddLine}
                      disabled={!currentLine.isComplete}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Add Another Line ({MAX_LINES - lines.length} remaining)
                    </motion.button>
                  )}
                </div>

                {/* Right Side - Lines Management */}
                <div className="afri-lines-panel">
                  <div className="lines-header">
                    <h3>Your Lines</h3>
                    <span className="lines-count">{lines.length}/{MAX_LINES}</span>
                  </div>

                  <div className="lines-list">
                    <AnimatePresence mode="popLayout">
                      {lines.map((line, index) => (
                        <motion.div
                          key={line.id}
                          className={`line-card ${index === currentLineIndex ? 'active' : ''} ${!line.isComplete ? 'incomplete' : ''}`}
                          onClick={() => handleSwitchLine(index)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                          layout
                        >
                          <div className="line-card-header">
                            <span className="line-title">Line {line.id}</span>
                            {line.isComplete && (
                              <span className="line-cost">₦{COST_PER_LINE.toLocaleString()}</span>
                            )}
                            <button
                              className="btn-remove-line"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveLine(line.id);
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </div>
                          <div className="line-numbers">
                            {line.numbers.length > 0 ? (
                              line.numbers.map((num) => (
                                <span key={num} className="line-number-badge">
                                  {String(num).padStart(2, '0')}
                                </span>
                              ))
                            ) : (
                              <span className="line-empty">Select numbers...</span>
                            )}
                          </div>
                          {!line.isComplete && line.numbers.length > 0 && (
                            <div className="line-incomplete-tag">
                              {MAX_NUMBERS_PER_LINE - line.numbers.length} more needed
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Checkout Section */}
                  <div className="checkout-section">
                    <div className="checkout-divider"></div>
                    <div className="checkout-summary">
                      <div className="summary-row">
                        <span>Complete Lines:</span>
                        <span className="summary-value">{completeLines.length}</span>
                      </div>
                      <div className="summary-row total">
                        <span>Total Amount:</span>
                        <span className="summary-value">₦{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <motion.button
                      className="btn-checkout"
                      onClick={handleCheckout}
                      disabled={completeLines.length === 0 || isSubmitting}
                      whileHover={completeLines.length > 0 ? { scale: 1.02 } : {}}
                      whileTap={completeLines.length > 0 ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          Buy Now
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AfriMillionsModal;
