import { Form, Formik } from "formik";
import check from "../../assets/check.gif";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { CiLogin } from "react-icons/ci";
import CountDown from "react-countdown";
import { useDispatch } from "react-redux";
import { otpVerify } from "../../../redux/Slice/userSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const initialState = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const validationSchema = yup.object({
    otp1: yup.string().required(""),
    otp2: yup.string().required(""),
    otp3: yup.string().required(""),
    otp4: yup.string().required(""),
    otp5: yup.string().required(""),
    otp6: yup.string().required(""),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const otpArray = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"];

  const inputChange = (value, setFieldValue, idx, item) => {
    setFieldValue(item, value);
    if (value && idx < 6) {
      const nextElement = document.getElementById(idx + 1);
      nextElement?.focus();
    }
  };

  const handleSubmit = async (values) => {
    const otp = Object.values(values).join("");
    try {
      const result = await dispatch(otpVerify({ otp, email })).unwrap();
      toast.success(result.message || "OTP Verified");
      navigate("/login/forgotPassword/otp-verify/update-password", { state: { email } });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f1fefc] to-[#d5f5f3] p-4">
      <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleBlur, values, errors, touched, setFieldValue }) => (
          <Form className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-10 rounded-xl shadow-md flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
              <img src={check} alt="check" className="w-24 sm:w-32" />
              <h1 className="text-center text-base sm:text-lg font-bold text-gray-700 uppercase px-2">
                Enter the 6-digit OTP sent to your registered email
              </h1>
            </div>

            <div className="flex justify-between gap-2 sm:gap-3">
              {otpArray.map((item, idx) => (
                <TextField
                  key={idx}
                  size="small"
                  fullWidth
                  id={idx + 1}
                  inputProps={{ maxLength: 1, pattern: "[0-9]*", className: "text-center text-lg sm:text-xl" }}
                  name={item}
                  type="text"
                  value={values[item]}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    inputChange(value, setFieldValue, idx + 1, item);
                  }}
                  error={touched[item] && Boolean(errors[item])}
                  helperText={touched[item] && errors[item]}
                  className="w-12 sm:w-14 h-12 sm:h-14"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={Object.values(values).some((value) => value === "")}
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#0ABAB5", "&:hover": { backgroundColor: "#099a94" }, py: 1.5 }}
            >
              Verify OTP
            </Button>

            <Button
              onClick={() => navigate("/login")}
              fullWidth
              variant="outlined"
              startIcon={<CiLogin />}
              sx={{ borderColor: "#0ABAB5", color: "#0ABAB5" }}
            >
              Back to Login
            </Button>

            <div className="flex justify-center mt-2 text-gray-600">
              <CountDown
                renderer={({ minutes, seconds, completed }) =>
                  completed ? (
                    <Button variant="text">Resend</Button>
                  ) : (
                    <span>
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                  )
                }
                date={Date.now() + 2 * 60 * 1000}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpVerify;
