import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
import { environment } from "../../constants";
import { validateInput } from "../../core/helpers/inputValidator";
import http from "../../api";
//import numericOnly from "../../core/directives/numericOnly";
//import phoneNumber from "../../core/directives/phoneNumber";
//import { Loader } from "../../components/Loader";
//import UploadSpinner from "../../components/UploadSpinner";

export const SignUp = () => {
  const navigate = useNavigate();

  const defaultBody = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const defaultValidationErrors = {
    firstName: [],
    lastName: [],
    email: [],
    password: [],
  };

  const [body, setBody] = useState(defaultBody);
  const [validationErrors, setValidationErrors] = useState(
    defaultValidationErrors
  );
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
  useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const validateNumbers = () => {
    // TODO: Need a logic to check a valid US phone number here
    return true;
  };

  //const onProfileImageChange = (e) => {
  //let file = e.target.files[0];
  //let formData = new FormData();
  // formData.append("file", file);

  //setIsLoading(true);

  //axios
  //.post(environment.api_url + "/upload", formData, {
  //headers: { "Content-Type": "multipart/form-data" },
  //})
  //.then((res) => {
  // setIsLoading(false);

  //setBody({ ...body, profileImage: res.data.url });
  // });
  //};

  //const checkValidation = () => {
  // if (body.email.length <= 0 || body.primaryPhone.length <= 0) return true;

  //for (let field in validationErrors) {
  // if (validationErrors[field].length > 0) return true;
  // }

  // return false;
  //};

  const handleSubmit = () => {
    if (!validateNumbers()) return;

    http
      .post(environment.api_url + "/user/register", body)
      .then((res) => {
        setError("");
        setBody(defaultBody);
        navigate("/" + res.data.data.user._id);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      });
  };

  return (
    <div>
      <div className="auth-overlay signup-overlay">
        <div className="container">
          <div className="auth-form signup-form">
            <form className="pt-3">
              <h2 className="fw-600 text-900 mb-4 text-center">Sign Up</h2>
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="d-flex align-items-center mb-3"></div>
                </div>
                <div className="col-lg-6">
                  <label className="fs-14 fw-500 mb-1">First Name</label>
                  <div
                    className={`input-box mb-3 ${
                      validationErrors.firstName.length > 0
                        ? "error-message"
                        : ""
                    }`}
                  >
                    <input
                      type="text"
                      required
                      placeholder="First Name"
                      value={body?.firstName}
                      onInput={(e) =>
                        setBody({ ...body, firstName: e.target.value })
                      }
                      onBlur={(e) => {
                        setValidationErrors({
                          ...validationErrors,
                          firstName: validateInput(e),
                        });
                      }}
                      className="br-16 h-56 authInput"
                    />
                    {validationErrors.firstName.length > 0 &&
                      validationErrors.firstName.map((val, i) => {
                        return (
                          <div key={i} className="error">
                            {val}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <label className="fs-14 fw-500 mb-1">Last Name</label>
                  <div
                    className={`input-box mb-3 ${
                      validationErrors.lastName.length > 0
                        ? "error-message"
                        : ""
                    }`}
                  >
                    <input
                      type="text"
                      required
                      placeholder="Last Name"
                      value={body?.lastName}
                      onInput={(e) =>
                        setBody({ ...body, lastName: e.target.value })
                      }
                      onBlur={(e) => {
                        setValidationErrors({
                          ...validationErrors,
                          lastName: validateInput(e),
                        });
                      }}
                      className="br-16 h-56 authInput"
                    />
                    {validationErrors.lastName.length > 0 &&
                      validationErrors.lastName.map((val, i) => {
                        return (
                          <div key={i} className="error">
                            {val}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <label className="fs-14 fw-500 mb-1">Email</label>
                  <div
                    className={`input-box mb-3 ${
                      validationErrors.email.length > 0 ? "error-message" : ""
                    }`}
                  >
                    <input
                      type="email"
                      value={body?.email}
                      onInput={(e) =>
                        setBody({ ...body, email: e.target.value })
                      }
                      onBlur={(e) => {
                        setValidationErrors({
                          ...validationErrors,
                          email: validateInput(e),
                        });
                      }}
                      placeholder="Email"
                      className="br-16 h-56 authInput"
                    />
                    {validationErrors.email.length > 0 &&
                      validationErrors.email.map((val, i) => {
                        return (
                          <div key={i} className="error">
                            {val}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <label className="fs-14 fw-500 mb-1">Password</label>
                  <div
                    className={`input-box position-relative mb-5 ${
                      validationErrors.password.length > 0
                        ? "error-message"
                        : ""
                    }`}
                  >
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      required
                      minLength={4}
                      value={body?.password}
                      onInput={(e) =>
                        setBody({ ...body, password: e.target.value })
                      }
                      placeholder="Password"
                      onBlur={(e) => {
                        setValidationErrors({
                          ...validationErrors,
                          password: validateInput(e),
                        });
                      }}
                      className="br-16 h-56 authInput"
                    />
                    {validationErrors.password.length > 0 &&
                      validationErrors.password.map((val, i) => {
                        return (
                          <div key={i} className="error">
                            {val}
                          </div>
                        );
                      })}
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
                </div>
              </div>
              <div className="col-lg-12">
                {error?.length > 0 && (
                  <div className="error-message text-danger mb-3 fs-20 text-center">
                    {error}
                  </div>
                )}
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <button
                    type="button"
                    className="btnPrimary pointer h-56 w-100 br-16"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    // disabled={checkValidation()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
            <div className="form-footer">
              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <div className="fs-13 fw-500 text-900">Have an account?</div>
                <Link to="/" className="fs-13 fw-500 text-primary">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
