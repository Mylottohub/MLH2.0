import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routing/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(routes).map((el) => (
          <Route path={el.path} key={el.id} element={<el.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
