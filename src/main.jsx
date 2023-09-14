import React from "react";
import ReactDOM from "react-dom/client";
import store from "./react-redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
    <div>
      <App />
      <ToastContainer />
    </div>
    </React.StrictMode>
  </Provider>
);
