import logo from "./logo.svg";
//import Header from "./components/layout/";
import "./App.css";
import { Login } from "./pages/auth/Login";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
//import { Provider } from "react-redux";
//import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
