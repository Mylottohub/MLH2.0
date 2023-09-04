import axios from "axios";
import config from "../config/config";

const HTTP = axios.create({
  baseURL: config.baseURL,
});

export default HTTP;
