import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { validateInput } from "../../core/helpers/inputValidator";
import http from "../../api";
import { environment } from "../../constants";
//import { errorDisplay } from "../../core/helpers/swal";
import Swal from "sweetalert2";

export const SetPassword = () => {
  const navigate = useNavigate();
  const { id, resetToken } = useParams();

  const defaultBody = {
    password: "",
    confirmPassword: "",
  };

  const defaultValidationErrors = {
    password: [],
    confirmPassword: [],
  };

  const defaultIsPasswordVisible = [false, false];

  const [body, setBody] = useState(defaultBody);
  const [validationErrors, setValidationErrors] = useState(
    defaultValidationErrors
  );
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    defaultIsPasswordVisible
  );
  const [isPasswordDisMatch, setIsPasswordDisMatch] = useState(false);
  const [validation, setValidation] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleValidation = (e) => {
    let temp = { ...validation };
    if (e.target.name === "password") {
      if (body.password.length <= 0)
        temp = { ...temp, password: "password is required" };
      else if (body.password.length < 4)
        temp = {
          ...temp,
          password: "This field must be at least 4 characters long",
        };
      else temp = { ...temp, password: "" };
    }
    if (e.target.name === "confirmPassword") {
      if (body.confirmPassword.length <= 0)
        temp = { ...temp, password: "password is required" };
      else if (body.confirmPassword.length < 4)
        temp = {
          ...temp,
          password: "This field must be at least 4 characters long",
        };
      else temp = { ...temp, password: "" };
    }
    setValidation(temp);
  };

  const checkValidation = () => {
    let isBodyInValid = false;
    for (let field in body) if (body[field].length <= 0) isBodyInValid = true;

    if (isBodyInValid) return true;

    for (let field in validationErrors) {
      if (validationErrors[field].length > 0) return true;
    }
    return false;
  };

  const validatePasswords = () => {
    if (body.password !== body.confirmPassword) {
      setIsPasswordDisMatch(true);
      setBody({ ...body, confirmPassword: "" });
      return false;
    } else {
      setIsPasswordDisMatch(false);
      return true;
    }
  };

  const handleSubmit = () => {
    if (!validatePasswords()) return;

    http
      .post(`${environment.api_url}/user/resetPasword/${id}/${resetToken}`, {
        password: body.password,
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Password has been changed successfully!!!",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#2c974acd",
          allowEnterKeyboard: true,
        }).then((result) => {
          if (result.isConfirmed) navigate("/auth");
        });
      })
      .catch((e) => {
        setError(e.response.data.message);
        // errorDisplay(e.response.data.message);
      });
  };

  return (
    <div>
      <div className="auth-overlay">
        <div className="container">
          <div className="auth-form">
            <form>
              <div className="text-center mb-4">
                <img
                  src="/assets/images/fixerstation-logo.png"
                  height={60}
                  alt=""
                />
              </div>
              <h2 className="fw-600 text-900 mb-3">Set New Password</h2>
              <div
                className={`input-box position-relative mb-3 ${
                  validation.password.length > 0 ? "error-message" : ""
                }`}
              >
                <input
                  type={isPasswordVisible[0] ? "text" : "password"}
                  required
                  name="password"
                  minLength={4}
                  value={body.password}
                  onChange={(e) =>
                    setBody({ ...body, password: e.target.value })
                  }
                  onBlur={(e) => {
                    setValidationErrors({
                      ...validationErrors,
                      password: validateInput(e),
                    });
                    handleValidation(e);
                  }}
                  placeholder="Password"
                  className="br-16 h-56 authInput"
                />
                {isPasswordVisible[0] && (
                  <span
                    onClick={() => {
                      let temp = [...isPasswordVisible];
                      temp[0] = false;
                      setIsPasswordVisible(temp);
                    }}
                    className="iconEye"
                  >
                    <span
                      className="iconify"
                      data-icon="pajamas:eye-slash"
                    ></span>
                  </span>
                )}
                {!isPasswordVisible[0] && (
                  <span
                    onClick={() => {
                      let temp = [...isPasswordVisible];
                      temp[0] = true;
                      setIsPasswordVisible(temp);
                    }}
                    className="iconEye"
                  >
                    <span
                      className="iconify"
                      data-icon="ic:outline-remove-red-eye"
                    ></span>
                  </span>
                )}

                {validationErrors.password.map((error, index) => (
                  <div key={index} className="error-message text-danger fs-12">
                    {error}
                  </div>
                ))}
              </div>
              <div
                className={`input-box position-relative mb-3 ${
                  validation.password.length > 0 ? "error-message" : ""
                }`}
              >
                <input
                  type={isPasswordVisible[1] ? "text" : "password"}
                  required
                  name="confirmPassword"
                  minLength={4}
                  value={body.confirmPassword}
                  onChange={(e) =>
                    setBody({ ...body, confirmPassword: e.target.value })
                  }
                  onBlur={(e) => {
                    setValidationErrors({
                      ...validationErrors,
                      confirmPassword: validateInput(e),
                    });
                    handleValidation(e);
                  }}
                  placeholder="Confirm Password"
                  className="br-16 h-56 authInput"
                />
                {isPasswordVisible[1] && (
                  <span
                    onClick={() => {
                      let temp = [...isPasswordVisible];
                      temp[1] = false;
                      setIsPasswordVisible(temp);
                    }}
                    className="iconEye"
                  >
                    <span
                      className="iconify"
                      data-icon="pajamas:eye-slash"
                    ></span>
                  </span>
                )}
                {!isPasswordVisible[1] && (
                  <span
                    onClick={() => {
                      let temp = [...isPasswordVisible];
                      temp[1] = true;
                      setIsPasswordVisible(temp);
                    }}
                    className="iconEye"
                  >
                    <span
                      className="iconify"
                      data-icon="ic:outline-remove-red-eye"
                    ></span>
                  </span>
                )}

                {validationErrors.confirmPassword.map((error, index) => (
                  <div key={index} className="error-message text-danger fs-12">
                    {error}
                  </div>
                ))}
                {validationErrors?.confirmPassword.length <= 0 &&
                  isPasswordDisMatch && (
                    <div className="error-message text-danger text-center fs-12 mt-2">
                      Password and Confirm Password did not match!!
                    </div>
                  )}
              </div>
              {error?.length > 0 && (
                <div className="error-message text-danger text-center mt-2  fs-5 ms-3 mb-3">
                  {error}
                </div>
              )}
              <div className="mb-3">
                <button
                  className="btnPrimary h-56 w-100 br-16"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  disabled={checkValidation()}
                >
                  Send
                </button>
                {/* <Link to="" className="btnPrimary h-56 w-100 br-16">
									Send
								</Link> */}
              </div>
            </form>
            <div className="form-footer">
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div className="fs-13 fw-500 text-900">
                  Don't have an account?
                </div>
                <Link to="/auth/signup" className="fs-13 fw-500 text-primary">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
