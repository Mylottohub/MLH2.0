import { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";

const PhoneInputWithCountryFlag = () => {
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    // Function to fetch the user's IP address
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api64.ipify.org?format=json");
        const userIP = response.data.ip;
        fetchCountryCode(userIP);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIP();
  }, []);

  // Function to fetch the country code based on IP address
  const fetchCountryCode = async (ip) => {
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/country_code/`);
      setCountryCode(response.data);
    } catch (error) {
      console.error("Error fetching country code:", error);
    }
  };

  return (
    <div className="mb-2">
      <PhoneInput
        placeholder="Enter phone number"
        required
        value={value}
        onChange={setValue}
        defaultCountry={countryCode} />
    </div>
  );
};

export default PhoneInputWithCountryFlag;
