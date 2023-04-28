import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import http from "../../../api";
//import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "../../../components/Sidebar";
import { environment } from "../../../constants";
export const CreateVehicle = () => {
  //const [authors, setAuthors] = useState([]);
  //const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [error, setError] = useState("");

  //const defaultBody = {
  //model: "",
  //color: "",
  // Number: "",
  //};

  //console.log(authors);
  //console.log("Selected", selectedAuthor);

  /*const getAuthors = () => {
    BackendApi.author
      .getAllAuthors()
      .then((authors) => {
        setAuthors(authors);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    getAuthors();
  }, []);*/

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
      .post(environment.api_url + "/vehicle/create", data)
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
        <h1>Vehicle Registeration</h1>

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
            <label htmlFor="titleInput">Vehicle Color</label>
            <input
              type="text"
              className="form-control"
              id="color"
              name="color"
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
          />

          <div className="col-lg-12">
            {error?.length > 0 && (
              <div className="error-message text-danger mb-3 fs-16 text-center">
                {error}
              </div>
            )}
            </div>*/}

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
