import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routing/routes";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LatestWinner from "./components/LatestWinner";
import LatestGame from "./components/LatestGame";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/5c7d0cf73341d22d9ce737da/default";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                <PrivateRoute>{route.element}</PrivateRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
      </Routes>
      <LatestWinner />
      <LatestGame />
    </HashRouter>
  );
}

export default App;
