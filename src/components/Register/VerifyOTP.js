import React from "react";

export const VerifyOTP = ({ otp, handleOTPFieldChange, handleVerifyOtp }) => {
  return (
    <>
      <h3 className="formHeader">
        Enter the otp that has been sent to your mail
      </h3>
      <input
        type="text"
        value={otp}
        onChange={handleOTPFieldChange}
        name="otp"
      />
      <button onClick={handleVerifyOtp}>Verify Otp</button>
    </>
  );
};
