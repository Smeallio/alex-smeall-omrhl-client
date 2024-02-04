import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TeamPage from "./pages/TeamPage/TeamPage";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManagePlayers from "./pages/ManagePlayers/ManagePlayers";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUsers } from "./utils/api-utils"
import "./App.scss";


function App() {
  const [authUser, setAuthUser] = useState(false);

  useEffect(() => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    setAuthUser(false)
  }

  const authorizeUser = async () => {
    try {
      const response = await axios.get(getUsers(), {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

        if (response.status === 200) {
          setAuthUser(true);
        } else {
          setAuthUser(false);
        }
      } catch(err) {
        console.error(`Error validating token: ${err}`);
        setAuthUser(false);
      }
    }
    authorizeUser();
  }, []);

  console.log(authUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/teams/:teamName" element={<TeamPage />}></Route>
        <Route path="/admin" element={<Login authUser={authUser} />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard authUser={authUser}/>}></Route>
        <Route path="/admin/dashboard/:teamName" element={<ManagePlayers authUser={authUser} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
