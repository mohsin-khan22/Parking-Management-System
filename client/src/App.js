import logo from "./logo.svg";
//import Header from "./components/layout/";
import "./App.css";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserDashboard } from "./pages/user/UserDashboard";
//import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { OtpVerification } from "./pages/auth/Otp";
import { SetPassword } from "./pages/auth/ResetPassword";
import { Forget } from "./pages/auth/Forget";
import { HomePage } from "./pages/Home/main";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/auth/SignUp" element={<SignUp />} />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/user/UserDashboard" element={<UserDashboard />} />
        <Route path="/auth/Otp/:email/:type" element={<OtpVerification />} />
        <Route
          path="/auth/ResetPassword/:email/:passwordRestToken"
          element={<SetPassword />}
        />
        <Route path="/auth/Forget" element={<Forget />} />
      </Routes>
    </>
  );
}

export default App;
