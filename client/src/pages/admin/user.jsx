import React, { useState, useEffect } from "react";
import http from "../../api";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";

import { FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import { Sidebar } from "../../components/Sidebar";
import { environment } from "../../constants";
import { useDispatch } from "react-redux";
//import { setUser } from "../../store/user";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const deleteUser = (user) => {
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
        // console.log(users);
        // const data = users[index];
        // console.log(index);
        http
          .delete(environment.api_url + `/admin/delete/${user.id}`)
          .then(() => {
            fetchUsers();

            Swal.fire("Deleted!", "User has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);

            Swal.fire("Error!", "Failed to delete user.", "error");
          });
      }
    });
  };

  const fetchUsers = async () => {
    http
      .get(environment.api_url + "/admin/getUsers")
      .then((users) => {
        console.log(users.data);

        setUsers(users.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deleteUser = (user)=>{

  //   BackendApi.user.deleteUser(user)
  //   .then((users)=>{
  //     fetchUsers()
  //     console.log(users)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  // }

  const changeStatus = (user, newStatus) => {
    http
      .get(environment.api_url + "/admin")
      .then((user) => {
        console.log("user", user);

        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <h1 className="text-grey">Customers List</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name </th>

                <th>email</th>
                <th>Role</th>
                {/*<th>change status</th>*/}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {console.log(users)}
              {users &&
                users.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>

                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      {/* <td>
                        /* {user.status == "active" ? (
                          <button>
                            <BsCheckLg
                              onClick={() => changeStatus(user, "blocked")}
                            ></BsCheckLg>
                          </button>
                        ) : (
                          <button>
                            <ImCross
                              onClick={() => changeStatus(user, "active")}
                            ></ImCross>
                          </button>
                        )}
                        </td>*/}
                      <td>
                        <button onClick={() => deleteUser(user)}>
                          <FaTrashAlt></FaTrashAlt>
                        </button>
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
