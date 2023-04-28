import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import http from "../../../api";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "../../../components/Sidebar";
import { environment } from "../../../constants";
export const CreateBooking = () => {
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [error, setError] = useState("");

  //const defaultBody = {
  //model: "",
  //color: "",
  // Number: "",
  //};

  //console.log(authors);
  //console.log("Selected", selectedAuthor);

  const getFloors = () => {
    http
      .get(environment.api_url + "/floor/floorList")
      //.getAllFloors()
      .then((floors) => {
        console.log(floors.data);
        setFloors(floors.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    getFloors();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(e);
    // let body = {
    // model: model,
    // color: color,
    // number: number,
    // };
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    /* if (!data.name) {
      setError("Book name is required");
    } else if (!selectedAuthor) {
      setError("Author is Required");
    } else {*/
    http
      .post(environment.api_url + "/booking/register", data)
      .then((res) => {
        // toast.success('Book created successfully!');
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
        <h1>Book Your vehicle</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Vehicle Model</label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              placeholder="Enter Vehicle Model"
            />
          </div>
          <div className="form-group">
            <label htmlFor="titleInput">End Date</label>
            <input
              type="text"
              className="form-control"
              id="endBooking"
              name="endBooking"
              placeholder="Enter vehilce Color"
            />
          </div>
          <div className="form-group">
            <label htmlFor="priceInput">Vehicle Number</label>
            <input
              type="number"
              className="form-control"
              id="number"
              name="number"
              placeholder="Enter vehicle number"
            />
          </div>
          {/* <div className="form-group">
        <label htmlFor="passwordInput">Author</label>
        <input type="text" className="form-control" id="Author"  name='Author' placeholder="Enter Author" />
      </div> */}
          <label className="fs-14 fw-500 text-900 mb-1 mt-3">Floor</label>

          <Select
            defaultValue={null}
            value={selectedFloor}
            options={floors}
            getOptionLabel={(floors) => floors.floorNo}
            getOptionValue={(floors) => floors.floorNo}
            isSearchable={false}
            isClearable={true}
            id="floorNo"
            name="floorNo"
            onChange={(e) => {
              setSelectedFloor(e);
            }}
          />
          <div className="col-lg-12">
            {error?.length > 0 && (
              <div className="error-message text-danger mb-3 fs-16 text-center">
                {error}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Book
          </button>
        </form>
      </div>
    </div>
  );
};
