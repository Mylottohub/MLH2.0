import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistedStore } from "./react-redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import WhatsAppWidget from "./components/WhatsAppWidget.jsx";
// import { logout } from "./pages/slices/authSlice.js";

const queryClient = new QueryClient();

// const handleVisibilityChange = () => {
//   if (document.visibilityState === "hidden") {
//     store.dispatch(logout());
//     queryClient.clear();
//   }
// };

// document.addEventListener("visibilitychange", handleVisibilityChange);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistedStore} loading={null}>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <div>
            <App />
            {/* <WhatsAppWidget /> */}
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </React.StrictMode>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
