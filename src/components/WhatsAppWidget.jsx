import { FaWhatsapp } from "react-icons/fa";
import "../assets/css/WhatsAppWidget.css";

const WhatsAppWidget = () => {
  const phoneNumber = "2347026091702";
  const message =
    "Welcome to MyLottoHub, the home of Lotto winners. How may we assist you today?";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="whatsapp-widget">
      <button onClick={handleClick} className="whatsapp-button">
        <FaWhatsapp className="fa-2x" />
      </button>
    </div>
  );
};

export default WhatsAppWidget;
