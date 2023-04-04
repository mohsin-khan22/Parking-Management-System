import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateInput } from "../../core/helpers/inputValidator";
import http from "../../api";
import { environment } from "../../constants";
import { validateEmail } from "../../core/helpers/validation";
import Swal from "sweetalert2";

export const Forget = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [validation, setValidation] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  //const [body, setBody] = useState(defaultBody);

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
    setValidation(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      email: email,
    };
    http
      .post(environment.api_url + "/user/forgot", body)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Success",
          text: "Please check your email for reset password!",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#2c974acd",
          allowEnterKeyboard: true,
        }).then((result) => {
          console.log(result);
          //if (result.isConfirmed) {
          navigate(`/auth/otp/${res.data.result.email}/2`);
          //}
        });
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <div>
      <div className="auth-overlay">
        <div className="container">
          <div className="auth-form">
            <form>
              <div className="text-center mb-4">
                <img src="/assets/images/FixerStation.png" height={60} alt="" />
              </div>
              <h2 className="fw-600 text-900 mb-3">Forgot Password</h2>
              <div
                className={`input-box mb-3 ${
                  validation.email.length > 0 ? "error-message" : ""
                }`}
              >
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  onBlur={(e) => {
                    handleValidation(e);
                    setValidationErrors(validateInput(e));
                  }}
                  className="br-16 h-56 authInput"
                />
                {validationErrors.length > 0 &&
                  validationErrors.map((error, index) => (
                    <div
                      key={index}
                      className="error-message text-danger  fs-12"
                    >
                      {error}
                    </div>
                  ))}
              </div>
              {error.length > 0 && (
                <div className="error-message text-danger text-center mt-2  fs-5 ms-3 mb-3">
                  {error}
                </div>
              )}
              <div className="mb-3">
                <button
                  className="btnPrimary h-56 w-100 br-16"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  disabled={email.length <= 0 || validationErrors.length > 0}
                >
                  Send
                </button>
                {/* <Link to="/auth/set-password" className="btnPrimary h-56 w-100 br-16">
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
