import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import http from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { environment } from "../../../constants";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
export const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  //const [bookingsToDisplay, setbookingsToDisplay] = useState([]);
  const loggedInUser = useSelector((state) => state.user.value);
  console.log("logged user from redux", loggedInUser);
  const fetchBookings = () => {
    http
      .get(environment.api_url + `/booking/${loggedInUser?.id}`)
      //.viewBooking()
      .then((bookings) => {
        console.log(bookings.data);
        //setbookingsToDisplay(bookings);
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

  // const returnBook = (booking) => {
  // console.log(booking._id);
  // BackendApi.booking
  //.returnOrder(booking._id)
  //.then((response) => {
  // fetchBookings();

  // console.log("response", response);
  //})
  //.catch((error) => {
  // console.log("error", error);
  //});
  //};
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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(index);
        console.log(bookings[index]);
        const data = bookings[index];
        console.log(data.id);
        http
          .put(environment.api_url + `/booking/remove/${data.id}`)
          .then((result) => {
            console.log(result);
            fetchBookings();

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
      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <NavLink
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
          </NavLink>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Model</th>
                <th>Floor No</th>
                <th>owner</th>
                <th>Fine</th>
                <th>bill</th>
                <th>Remove</th>
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
