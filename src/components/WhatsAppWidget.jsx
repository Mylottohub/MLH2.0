import { FaWhatsapp } from "react-icons/fa";
import "../assets/css/WhatsAppWidget.css";

const WhatsAppWidget = () => {
  const phoneNumber = "2347026091702"; // Corrected phone number format (without + and spaces)
  const message = "Hi, My name is [Name], I’d love to know more about MyLottoHub."; // Message to send

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank"); // Open the WhatsApp link in a new tab
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
