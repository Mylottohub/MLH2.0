import { FaTelegramPlane } from "react-icons/fa";
import "../assets/css/TelegramWidget.css";

const TelegramWidget = () => {
  const telegramLink = "https://t.me/mylottohubcommunity";

  const handleClick = () => {
    window.open(telegramLink, "_blank");
  };

  return (
    <div className="telegram-widget">
      <button onClick={handleClick} className="telegram-button">
        <FaTelegramPlane className="fa-2x" />
      </button>
    </div>
  );
};

export default TelegramWidget;