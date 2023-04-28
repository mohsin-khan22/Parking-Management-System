import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { Sidebar } from "./components/Sidebar";
import { Provider } from "react-redux";
import { OtpVerification } from "./pages/auth/Otp";
import { SetPassword } from "./pages/auth/ResetPassword";
import { Forget } from "./pages/auth/Forget";
import { HomePage } from "./pages/Home/main";
import { Vehicle } from "./pages/user/vehicles/Vehicle";
import { Profile } from "./pages/user/vehicles/profile";
import { CreateVehicle } from "./pages/user/vehicles/create";
import { EditVehicle } from "./pages/user/vehicles/edit";
import { Booking } from "./pages/user/bookings/booking";
import { CreateBooking } from "./pages/user/bookings/park";
import http from "./api";
import { Users } from "./pages/admin/user";
import { Vehicles } from "./pages/admin/vehicles";
import { AdminProfile } from "./pages/admin/profile";
import { Floor } from "./pages/admin/floor";
import { CreateFloor } from "./pages/admin/create";
import { UsersBooking } from "./pages/admin/booking";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, logout } from "./store/user";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "./constants/path";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.value);
  console.log("logged user from redux", loggedInUser);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      http.get("/user/context").then((user) => {
        console.log(user.data, "context api");
        if (user.data.role === 0) {
          if (user.data.isOtpVerified === true) {
            dispatch(setAuth(user.data));
          }
        } else if (user.data.role === 1) {
          if (user.data.isOtpVerified === false) {
            dispatch(setAuth(user.data));
          }
        }
      });
    }
  }, []);

  return (
    <Routes>
      {console.log(loggedInUser, "logged in user")}
      {loggedInUser?.role === 1 && (
        <>
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />

          <Route path="/admin/user" element={<Users />} />
          <Route path="/admin/vehicles" element={<Vehicles />} />
          <Route path="/admin/floor" element={<Floor />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/create" element={<CreateFloor />} />
          <Route path="/admin/booking" element={<UsersBooking />} />
        </>
      )}
      {/* {console.log(loggedInUser?.data?.role)} */}
      {loggedInUser?.role === 0 && (
        <>
          <Route path="/user/vehicles/Vehicle" element={<Vehicle />} />
          <Route path="/user/vehicles/create" element={<CreateVehicle />} />
          <Route path="/user/bookings/booking" element={<Booking />} />
          <Route path="/user/bookings/park" element={<CreateBooking />} />
          <Route path="/user/vehicles/profile" element={<Profile />} />
          <Route path="/user/vehicles/edit/:id" element={<EditVehicle />} />
        </>
      )}
      {Object.keys(loggedInUser).length === 0 && (
        <Route path="*" element={<Navigate to={Paths[loggedInUser?.role]} />} />
      )}
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Login />} />

        <Route path="/auth/SignUp" element={<SignUp />} />
        <Route path="/auth/Otp/:email/:type" element={<OtpVerification />} />
        <Route
          path="/auth/ResetPassword/:email/:passwordRestToken"
          element={<SetPassword />}
        />
        <Route path="/auth/Forget" element={<Forget />} />
      </>
    </Routes>
  );
}

export default App;
