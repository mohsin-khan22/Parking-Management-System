import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import { FaTrashAlt } from "react-icons/fa";
import http from "../../api";
import { FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import Swal from "sweetalert2";
import { environment } from "../../constants";

export const Floor = ({ loggedInUser }) => {
  const [floors, setFloors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [floorsToDisplay, setfloorsToDisplay] = useState([]);
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

  const fetchFloors = () => {
    http
      .get(environment.api_url + "/floor/floorList")
      .then((floors) => {
        console.log(floors.data);

        setfloorsToDisplay(floors.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    fetchFloors();
    console.log(floors);
  }, []);

  const removeFloor = (Floor, index) => {
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
        console.log(floorsToDisplay[index]);
        const data = floorsToDisplay[index];
        console.log(data.id);
        http
          .delete(environment.api_url + `/floor/delete/${data.id}`)
          .then((result) => {
            console.log(result);
            fetchFloors();

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
          <h1>Floors</h1>
          <NavLink
            to={"/admin/create"}
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
            <button className="h-5 w-5">Create Floor</button>
          </NavLink>
          <Table striped bordered hover>
            <thead>
              <tr>
                {/*<th>Vehicle Id</th>*/}
                <th>Floor NO</th>

                {/*<th>Action</th>*/}
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              *{" "}
              {floorsToDisplay?.length > 0 &&
                floorsToDisplay.map((floor, index) => {
                  return (
                    <tr key={floor._id}>
                      <td>{floor.floorNo}</td>
                      {/* s<td>{floor.spots}</td> */}

                      <td>
                        <button onClick={() => removeFloor(floor, index)}>
                          <FaTrashAlt></FaTrashAlt>
                        </button>
                      </td>
                      <td>
                        {/* <NavLink 
                          to={"/admin/create"}
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
                        </NavLink>*/}
                      </td>
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
