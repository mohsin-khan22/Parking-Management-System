import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import { FaTrashAlt } from "react-icons/fa";
import http from "../../api";
import { FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import Swal from "sweetalert2";
import { environment } from "../../constants";

export const UsersBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const fetchBookings = () => {
    http
      .get(environment.api_url + "/booking/list")

      .then((bookings) => {
        console.log(bookings.data);

        setBookings(bookings.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchBookings();
    console.log(bookings);
  }, []);

  const removeVehicle = (booking, index) => {
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
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(index);
        console.log(bookings[index]);
        const data = bookings[index];
        console.log(data.id);
        http
          .delete(environment.api_url + `/booking/delete/${data.id}`)
          .then((result) => {
            console.log(result);
            fetchBookings();

            Swal.fire("Removed!", "Vehicle has been deleted.", "success");
          })
          .catch((err) => {
            setError(err);

            Swal.fire("Error!", "Failed to remove booking.", "error");
          });
      }
    });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <h1>Booking List</h1>
          {/* <NavLink 
            to={"/user/bookings/park"}
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
            <button className="h-5 w-5">Book a Vehicle</button>
        </NavLink>*/}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Model</th>
                <th>Floor No</th>
                <th>owner</th>
                <th>Fine</th>
                <th>bill</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                return (
                  <tr key={booking._id}>
                    {/* <td> *
                      {booking.vehicles
                        .map((vehicle) => vehicle.number)
                        .join(", ")}
                      </td>*/}
                    <td>{booking.model}</td>
                    <td>{booking.floorNo}</td>
                    <td>{booking.owner?.firstName}</td>
                    <td>{booking.fine}</td>
                    <td>{booking.bill}</td>
                    <td>
                      <button onClick={() => removeVehicle(booking, index)}>
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </td>

                    {/* <td> 
                      {booking.status === "Returned" ? (
                        <td>{"Returned successfully"}</td>
                      ) : (
                        <button onClick={() => returnVehicle(booking)}>
                          Return
                        </button>
                      )}
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
