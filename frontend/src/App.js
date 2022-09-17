import './App.css';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { StudySchedule } from "./components/pages/StudySchedule";
import { Login } from "./components/pages/Login";
import { Studying } from "./components/pages/Studying";
import { Regist } from "./components/pages/Regist";
import { History } from "./components/pages/History";

export const App = () => {

  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Link to="/studyschedule"></Link>
        <Link to="/login"></Link>
        <Link to="/studying"></Link>
        <Link to="/regist"></Link>
        <Link to="/history"></Link>
        <Routes>
        <Route path="/studyschedule" element={<StudySchedule />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studying" element={<Studying />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
};