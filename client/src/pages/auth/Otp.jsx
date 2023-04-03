import React, { useEffect, useState, useCallback } from "react";
//import { BackendApi } from "../../api";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
//import OTPInput from "otp-input-react";
//import Swal from "sweetalert2";
//import http from "../../api";
//import { environment } from "../../constants";

import axios from "axios";

export function OtpVerification() {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleVerification = () => {
    // Send a POST request to your server to verify the OTP
    axios
      .post("/user/verify-otp", { otp, email })
      .then((res) => {
        console.log(res.data.message);
        // OTP verification successful
        navigate("/auth");
      })
      .catch((err) => {
        setError(err?.response?.data);
      });
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <label>Enter the OTP sent to your email:</label>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <div className="row">
        <div className="col-lg-12">
          {error?.length > 0 && (
            <div className="error-message text-danger mb-3 fs-20 text-center">
              {error}
            </div>
          )}
        </div>
      </div>
      <button onClick={handleVerification}>Verify OTP</button>
    </div>
  );
}
