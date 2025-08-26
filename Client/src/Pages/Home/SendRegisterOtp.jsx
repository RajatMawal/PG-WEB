import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import details from "../../assets/magnify.gif"
import security from "../../assets/security.gif"
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { VscArrowLeft } from "react-icons/vsc";
import { sendOtp, verifyOtp } from "../../../redux/Slice/otpSlicee.js";


const SendRegisterOtp= () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtpField, setShowOtpField] = useState(false);
  const { otps } = useSelector((state) => state.otp);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (showOtpField && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [showOtpField]);

  const handleOtpChange = (e, idx) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < 5) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!showOtpField) {
        const result = await dispatch(sendOtp({ email })).unwrap();
        setShowOtpField(true);
        toast.success(result.message || "OTP sent to your email");
      } else {
        const otpValue = otp.join("");
        const result = await dispatch(verifyOtp({ email, otp: otpValue })).unwrap();

        if (result?.token) {
          localStorage.setItem("token", result.token);
          toast.success(result.message || "OTP verified successfully");
          navigate("/register");
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-white via-[#f1fefc] to-[#d5f5f3] p-4 min-h-screen items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md flex flex-col gap-6"
      >
        <div className="w-full flex justify-center">
          <img
            src={!showOtpField ? details : security}
            alt=""
            className="h-30 w-30"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-700">
          Verify Your Email
        </h2>

        {!showOtpField ? (
          <TextField
            label="Enter Your Email"
            onChange={handleEmailChange}
            value={email}
            type="email"
            variant="outlined"
            fullWidth
            required
          />
        ) : (
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((value, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                onChange={(e) => handleOtpChange(e, idx)}
                value={value}
                maxLength={1}
                type="text"
                pattern="[0-9]*"
                required
                className="w-12 sm:w-14 h-12 sm:h-14 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#03A6A1] text-lg sm:text-xl"
              />
            ))}
          </div>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#0ABAB5",
            "&:hover": { backgroundColor: "#099a94" },
            py: 1.5,
          }}
        >
          {showOtpField ? "Verify OTP" : "Continue"}
        </Button>

        {showOtpField && (
          <Button
            onClick={() => setShowOtpField(false)}
            className="flex items-center justify-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <VscArrowLeft /> 
          </Button>
        )}
      </form>
    </div>
  );
};

export default SendRegisterOtp