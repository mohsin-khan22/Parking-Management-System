import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import http from "../../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "../../components/Sidebar";
import { environment } from "../../constants";
export const CreateFloor = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(e);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    http
      .post(environment.api_url + "/floor/create", data)
      .then((res) => {
        navigate(-1);

        console.log("res retrieved", res);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Create Floor</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titleInput">Floor No</label>
            <input
              type="text"
              className="form-control"
              id="floorNo"
              name="floorNo"
              placeholder="Enter vehilce Color"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
