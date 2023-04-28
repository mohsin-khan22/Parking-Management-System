import React, { useState } from "react";
import { environment } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import http from "../..//api";
import Swal from "sweetalert2";

export const AdminProfile = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (data.oldPassword.length <= 0 === "") {
      setError("old password is required");
    } else if (data.oldPassword.length < 4) {
      setError("password   must be at least 4 characters");
    } else if (data.password !== data.confirmPassword) {
      setError("Password and confirm password must be the same");
    }
    let token = localStorage.getItem("token");
    http
      .post(environment.api_url + "/user/update-password", data)

      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Password has been changed successfully!!!",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#2c974acd",
          allowEnterKeyboard: true,
        }).then((result) => {
          if (result.isConfirmed) navigate("/user/vehicles/Vehicle");
        });
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="form ms-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput">Old password</label>
              <input
                type="password"
                className="form-control"
                id="name"
                name="oldPassword"
                placeholder="Enter your old password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">New Password</label>
              <input
                type="password"
                className="form-control"
                id="email"
                name="password"
                placeholder="Enter your new password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="email"
                name="confirmPassword"
                placeholder="enter password again"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Change
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
