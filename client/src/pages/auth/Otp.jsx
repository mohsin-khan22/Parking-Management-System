import React, { useEffect, useState, useCallback } from "react";
//import { BackendApi } from "../../api";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
//import OTPInput from "otp-input-react";
import Swal from "sweetalert2";
//import http from "../../api";
//import { environment } from "../../constants";

import axios from "axios";

export function OtpVerification() {
  const { email, type } = useParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleVerification = () => {
    // Send a POST request to your server to verify the OTP

    axios
      .post("/user/verify-otp/" + type, { otp, email })
      .then((res) => {
        console.log(res);
        if (parseInt(type) === 1) {
          navigate("/auth");
        } else if (parseInt(type) === 2) {
          navigate(
            `/auth/ResetPassword/${res.data.user.email}/${res.data.passwordRestToken}`
          );
        }
      })
      .catch((err) => {
        setError(err?.response?.data);
        console.log(err);
      });
  };

  const sendotp = () => {
    axios
      .post("/user/otpresend", { otp, email })
      .then((response) => {
        console.log(response.data.message);
        Swal.fire({
          icon: "success",
          title: "Otp resend successfully",
          text: "Please check your email for verification",
          confirmButtonText: "OK",
          //timer: 1500,
        });
        // OTP verification successful
        //navigate("/auth");
      })
      .catch((err) => {
        setError(err?.response?.data);
        console.log(err);
      });
  };

  return (
    <div className="row  justify-content-center mt-5">
      <div className="col-md-3">
        <h2 className="text-center">OTP Verification</h2>
        <label className="py-3 ">Enter the OTP sent to your email:</label>

        <div className="col-md-12">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-100"
          />
        </div>
        <div className="row">
          <div className="col-lg-6 py-3">
            {error?.length > 0 && (
              <div className="error-message text-danger mb-3 fs-20 text-center">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-12 py-3">
          <button
            className="w-100"
            onClick={(e) => {
              e.preventDefault();
              handleVerification();
            }}
          >
            Verify OTP
          </button>
        </div>
        <div className="col-md-12">
          <button
            className="w-100"
            onClick={(e) => {
              e.preventDefault();
              sendotp();
            }}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
