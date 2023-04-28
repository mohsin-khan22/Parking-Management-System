import React, { useState, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import user, { setAuth, logout } from "../store/user";
export const Sidebar = () => {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.value);

  console.log("logged", loggedInUser);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    // navigate("/auth");
    handleCloseUserMenu();
  };
  return (
    <div
      style={{
        width: "200px",
        backgroundColor: "#0000FF",
        padding: "20px",
        height: "100vh",
      }}
    >
      <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
        {loggedInUser?.role === 1 && (
          <>
            <NavLink
              to={"/admin/user"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">Users</span>
            </NavLink>
            <NavLink
              to={"/admin/vehicles"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">Vehicles </span>
            </NavLink>
            <NavLink
              to={"/admin/booking"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">Bookings </span>
            </NavLink>
            <NavLink
              to={"/admin/floor"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">Floors </span>
            </NavLink>

            <NavLink
              to={"/admin/profile"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">Profile </span>
            </NavLink>
            <NavLink
              onClick={handleLogout}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">LogOut </span>
            </NavLink>
          </>
        )}

        {loggedInUser?.role === 0 && (
          <>
            <NavLink
              to={"/user/vehicles/vehicle"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">Vehicles</span>
            </NavLink>
            <NavLink
              to={"/user/bookings/booking"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">Booking</span>
            </NavLink>

            <NavLink
              to={"/user/vehicles/profile"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">Profile</span>
            </NavLink>
            <NavLink
              onClick={handleLogout}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link text-white">LogOut </span>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};
