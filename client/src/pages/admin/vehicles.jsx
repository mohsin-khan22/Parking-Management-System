import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import { FaTrashAlt } from "react-icons/fa";
import http from "../../api";
import { FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import Swal from "sweetalert2";
import { environment } from "../../constants";

export const Vehicles = ({ loggedInUser }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [vehiclesToDisplay, setvehiclesToDisplay] = useState([]);
  function handleChange(event) {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    if (newSearchText === "") {
      setSearchResults([]);
    } else {
      http
        .post(environment.api_url + "/vehicle/searchsearch?q=${value}")
        .then((vehicle) => {
          setSearchResults(vehicle);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }

  // const vehiclesToDisplay = searchText === "" ? vehicles : searchResults;

  const fetchVehicles = () => {
    http
      .get(environment.api_url + "/vehicle/getVehicles")
      .then((vehicles) => {
        console.log(vehicles.data);

        setvehiclesToDisplay(vehicles.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    fetchVehicles();
    console.log(vehicles);
  }, []);

  const removeVehicle = (Vehicle, index) => {
    let token = localStorage.getItem("token");

    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(token);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(vehiclesToDisplay[index]);
        const data = vehiclesToDisplay[index];
        console.log(data.id);
        http
          .delete(environment.api_url + `/vehicle/delete/${data.id}`)
          .then((result) => {
            console.log(result);
            fetchVehicles();

            Swal.fire("Deleted!", "Vehicle has been deleted.", "success");
          })
          .catch((err) => {
            setError(err);

            Swal.fire("Error!", "Failed to delete user.", "error");
          });
      }
    });
  };

  return (
    <>
      <div className="col-lg-12">
        {error?.length > 0 && (
          <div className="error-message text-danger mb-3 fs-16 text-center">
            {error}
          </div>
        )}
      </div>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          {/* <input type="text" value={searchText} onChange={handleChange} />*/}
          <h1 className="text-grey">Registered Vehicles</h1>
          <NavLink
            to={"/user/vehicles/create"}
            className="pointer"
            style={{
              display: "block",
              marginBottom: "10px",
              color: "#000",
              marginRight: "12px",
            }}
          >
            <span className="side-ic">
              <span className="iconify" data-icon="uim:calender"></span>
            </span>
            {/* <button className="h-5 w-5">Register Vehicle</button>*/}
          </NavLink>
          <Table striped bordered hover>
            <thead>
              <tr>
                {/*<th>Vehicle Id</th>*/}
                <th>Vehicle Model</th>
                <th>Vehicle color</th>
                <th>Vehicle number</th>
                <th>Owner</th>

                {/*<th>Action</th>*/}
                <th>Delete</th>
                {/* <th>Edit</th>*/}
              </tr>
            </thead>
            <tbody>
              *{" "}
              {vehiclesToDisplay?.length > 0 &&
                vehiclesToDisplay.map((vehicle, index) => {
                  return (
                    <tr key={vehicle._id}>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.color}</td>
                      <td>{vehicle.number}</td>
                      <td>{vehicle.owner?.firstName}</td>

                      <td>
                        <button onClick={() => removeVehicle(vehicle, index)}>
                          <FaTrashAlt></FaTrashAlt>
                        </button>
                      </td>
                      {/* <td>
                        <NavLink
                          to={`/user/vehicles/edit/${vehicle.id}`}
                          className="pointer"
                          style={{
                            display: "block",
                            marginBottom: "10px",
                            color: "#000",
                          }}
                        >
                          <span className="side-ic">
                            <span
                              className="iconify"
                              data-icon="uim:calender"
                            ></span>
                          </span>
                          <FaEdit className="h-5 w-5"></FaEdit>
                        </NavLink>
                        </td>*/}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
