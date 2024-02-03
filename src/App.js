import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TeamPage from "./pages/TeamPage/TeamPage";
import ManagePlayers from "./pages/ManagePlayers/ManagePlayers";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/teams/:teamName" element={<TeamPage />}></Route>
        <Route path="/admin/players/:teamName" element={<ManagePlayers />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
