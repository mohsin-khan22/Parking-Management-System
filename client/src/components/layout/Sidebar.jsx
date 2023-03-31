import React, { useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.value);
  console.log("logged", loggedInUser);

  return (
    <div
      style={{
        width: "200px",
        backgroundColor: "#f2f2f2",
        padding: "20px",
        height: "100vh",
      }}
    >
      <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
        {loggedInUser.role === "admin" && (
          <>
            <NavLink
              to={"/admin/dashboard/vehicles"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Books</span>
            </NavLink>
            <NavLink
              to={"/admin/dashboard/authors"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Authors </span>
            </NavLink>
            <NavLink
              to={"/admin/dashboard/users"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Users </span>
            </NavLink>
            <NavLink
              to={"/admin/dashboard/orders"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Orders </span>
            </NavLink>
          </>
        )}

        {loggedInUser.role === "user" && (
          <>
            <NavLink
              to={"/user/books"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Books</span>
            </NavLink>
            <NavLink
              to={"/user/authors"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Authors </span>
            </NavLink>
            <NavLink
              to={"/user/placeorder"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Place Order </span>
            </NavLink>
            <NavLink
              to={"/user/order"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Orders </span>
            </NavLink>
            <NavLink
              to={"/user/profile"}
              className="pointer"
              style={{ display: "block", marginBottom: "10px", color: "#000" }}
            >
              <span className="side-ic">
                <span className="iconify" data-icon="uim:calender"></span>
              </span>
              <span className="side-link">Profile </span>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};
