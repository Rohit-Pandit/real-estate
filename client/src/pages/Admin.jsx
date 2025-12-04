import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const navigate = useNavigate();
  const pin = import.meta.env.VITE_PIN;
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);

  const inputRefs = useRef([]);

  const collectOtp = () => {
    const code = inputRefs.current.map((input) => input.value).join("");
    setOtp(code);
  };

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    collectOtp();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    paste.split("").forEach((val, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = val;
      }
    });
    collectOtp();
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6 digit OTP");
      return;
    }
    try {
        if (otp === pin) {

          toast.success("OTP verified successfully");
          navigate("/dashboard");
          setOtpError(false);
          inputRefs.current.forEach((input) => (input.value = ""));
          setOtp("");
        } 
        else {
          toast.error("Invalid OTP");
          setOtpError(true);
          setOtp("");
          inputRefs.current.forEach((input) => (input.value = ""));
        } 
      }
      catch (error) {
      toast.error("Error verifying OTP");
      setOtpError(true);
      setOtp("");
      inputRefs.current.forEach((input) => (input.value = ""));
    } 
     
  };

  return (
    <div className="p-8 text-[#8A4B00] max-w-md mx-auto">

      
      {
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold flex gap-2 justify-center">Enter 6 digit PIN</h2>

          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-12 text-center text-xl border border-gray-500 rounded-md focus:border-[#FF8C00] outline-none hover:bg-[#e67c00]"
                />
              ))}
          </div>

          <button
            onClick={verifyOtp}
            className="bg-[#FF8C00] text-white px-4 py-2 rounded-lg shadow-md 
           transition-all duration-150 
           active:scale-95 active:shadow-inner 
           hover:bg-[#e67c00]"
          >
            Verify & Login
          </button>
          {otpError && (
            <p className="text-red-500 text-sm text-center">
              Invalid PIN. Please try again.
            </p>
            
          )}
        </div>
      }

    </div>
  );
}
