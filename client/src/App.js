import logo from "./logo.svg";
//import Header from "./components/layout/";
import "./App.css";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserDashboard } from "./pages/user/UserDashboard";
//import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/SignUp" element={<SignUp />} />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/user/UserDashboard" element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default App;
