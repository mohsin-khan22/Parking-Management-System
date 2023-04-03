import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//import { useDispatch } from "react-redux";

//import { setAuth } from "../../store/user";
import http from "../../api";
import { environment } from "../../constants";
import { validateEmail } from "../../core/helpers/validation";

export const Login = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleValidation = (e) => {
    let temp = { ...validation };
    if (e.target.name === "email") {
      if (email.length <= 0) {
        temp = { ...temp, email: "email is required" };
      } else if (!validateEmail(email)) {
        temp = { ...temp, email: "email is not valid" };
      } else {
        temp = { ...temp, email: "" };
      }
    }
    if (e.target.name === "password") {
      if (password.length <= 0)
        temp = { ...temp, password: "password is required" };
      else if (password.length < 4)
        temp = {
          ...temp,
          password: "This field must be at least 4 characters long",
        };
      else temp = { ...temp, password: "" };
    }
    setValidation(temp);
  };

  const checkDisable = () => {
    if (email.length <= 0 || password.length <= 0) {
      return true;
    }
    if (validation.email.length > 0 || validation.password.length > 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };

    http
      .post(environment.api_url + "/user/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setError("");
        //dispatch(setAuth(res.data.data.user));
        // console.log(res);

        localStorage.setItem("token", res.data.token);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          confirmButtonText: "OK",
        }).then(() => {
          if (res.data.role == 1) {
            console.log("goto admin side");
            navigate("/admin/AdminDashboard");
          } else {
            console.log("goto user side");
            navigate("/user/UserDashboard");
          }
          http.refreshToken();
          setEmail("");
          setPassword("");
          setProfileError(null);
          // navigate("/");
        });
      })
      .catch((error) => {
        //console.log(err);
        setError(error?.response?.data);

        console.log("err", error?.res?.data);
      });
  };

  return (
    <div>
      <div className="auth-overlay">
        <div className="container">
          <div className="auth-form">
            <form className="pt-3">
              <div className="text-center mb-4">
                <img
                  src="/assets/images/fixerstation-logo.png"
                  height={60}
                  alt=""
                />
              </div>
              <h2 className="fw-600 text-900 fs-50 mb-4 text-center">
                Sign in
              </h2>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <label className="fs-14 fw-500 mb-1">Email</label>
                  <div
                    className={`input-box mb-3 ${
                      validation.email.length > 0 ? "error-message" : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onBlur={(e) => handleValidation(e)}
                      onChange={(e) => handleChange(e)}
                      className="br-16 h-56 authInput"
                    />
                    {validation.email.length > 0 && (
                      <div className="error">{validation.email}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <label className="fs-14 fw-500 mb-1">Password</label>
                  <div
                    className={`input-box position-relative mb-3 ${
                      validation.password.length > 0 ? "error-message" : ""
                    }`}
                  >
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={password}
                      onBlur={(e) => handleValidation(e)}
                      onChange={(e) => handleChange(e)}
                      className="br-16 h-56 authInput"
                    />
                  </div>
                </div>
                {validation.password.length > 0 && (
                  <div className="error">{validation.password}</div>
                )}
                {!isPasswordVisible && (
                  <span
                    onClick={() => {
                      setIsPasswordVisible(true);
                    }}
                    className="iconEye"
                  >
                    <span
                      className="iconify"
                      data-icon="ic:outline-remove-red-eye"
                    ></span>
                  </span>
                )}
                {isPasswordVisible && (
                  <span
                    onClick={() => {
                      setIsPasswordVisible(false);
                    }}
                    className="iconEye"
                  >
                    <span
                      className="iconify"
                      data-icon="pajamas:eye-slash"
                    ></span>
                  </span>
                )}
              </div>
              <div className="col-lg-12">
                {error?.length > 0 && (
                  <div className="error-message text-danger mb-3 fs-16 text-center">
                    {error}
                  </div>
                )}
              </div>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="mb-3 mt-5">
                    <button
                      type="submit"
                      disabled={checkDisable()}
                      onClick={handleSubmit}
                      className="btn-submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link
                  to="/auth/forget"
                  className="fs-14 fw-500 text-800 text-center"
                >
                  Forgot password
                </Link>
              </div>
            </form>
            <div className="form-footer">
              <div className="d-flex justify-content-center align-items-center gap-3">
                {/* <div className="fs-13 fw-500 text-900">Don't have an account?</div> */}
                <Link to="/auth/SignUp" className="fs-13 fw-500 text-primary">
                  Register Yourself
                </Link>
              </div>
            </div>
            <div className="form-footer">
              <div className="d-flex justify-content-center align-items-center gap-3">
                {/* <div className="fs-13 fw-500 text-900">Don't have an account?</div> */}
              </div>

              <div className="d-flex justify-content-center align-items-center gap-3">
                {/* <div className="fs-13 fw-500 text-900">Become a Manager</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
