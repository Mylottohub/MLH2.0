import { HashRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routing/routes";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import LatestWinner from "./components/LatestWinner";
import LatestGame from "./components/LatestGame";

function App() {
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
