export const checkIfNigeriaIP = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country_code === "NG";
  } catch (e) {
    return false; // fail-safe: block access
  }
};
