import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

//import Select from "react-select";
import { Sidebar } from "../../../components/Sidebar";
import http from "../../../api";
import { environment } from "../../../constants";

export const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Vehicle, setVehicle] = useState({});
  const [error, setError] = useState("");
  const getVehicleById = () => {
    http
      .get(environment.api_url + `/vehicle/getOne/${id}`)
      .then((vehicle) => {
        console.log(vehicle.data);
        setVehicle(vehicle.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    // getAuthors();
    getVehicleById();
  }, []);
  const handleSubmit = (event) => {
    console.log("clicked", event);

    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    http
      .put(environment.api_url + `/vehicle/update/${id}`, data)
      .then((res) => {
        navigate(-1);

        console.log("res retrieved", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Edit Vehicle</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Model</label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              placeholder="Enter Model"
            />
          </div>
          <div className="form-group">
            <label htmlFor="titleInput">Color </label>
            <input
              type="text"
              className="form-control"
              id="color"
              name="color"
              placeholder="Enter Vehicle Color"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="priceInput">Book Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="Enter Book Price"
            />
  </div>*/}
          {/* <div className="form-group">
        <label htmlFor="passwordInput">Author</label>
        <input type="text" className="form-control" id="Author"  name='Author' placeholder="Enter Author" />
      </div> */}

          {/* <label className="fs-14 fw-500 text-900 mb-1 mt-3">Author</label>

          <Select
            defaultValue={null}
            value={selectedAuthor}
            options={authors}
            getOptionLabel={(authors) => authors.name}
            getOptionValue={(authors) => authors.name}
            isSearchable={false}
            isClearable={true}
            onChange={(e) => {
              setSelectedAuthor(e);
            }}
        />*/}
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};
