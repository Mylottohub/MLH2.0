import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routing/routes";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        {Object.values(routes).map((el) => (
          <Route path={el.path} key={el.id} element={<el.component />} />
        ))}
      </Routes> */}
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
        {/* Add more regular routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
