import './App.css';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { StudySchedule } from "./components/pages/StudySchedule";
import { Login } from "./components/pages/Login";

export const App = () => {

  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Link to="/studyschedule"></Link>
        <Link to="/login"></Link>
        <Routes>
        <Route path="/studyschedule" element={<StudySchedule />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
};