import { useState } from "react";
import { Button, TextField } from "@mui/material";
import key from "../../assets/key.gif";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updatepassword } from "../../../redux/Slice/userSlice.js";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Password is required");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    try {
      await dispatch(updatepassword({ email, newPassword })).unwrap();
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to update password");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-white via-[#f1fefc] to-[#d5f5f3] px-4 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <div className="flex flex-col items-center gap-3 mb-6">
          <img src={key} alt="key" className="w-[10vw] md:w-[5vw]" />
          <h2 className="text-xl font-semibold text-gray-700">Update Password</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#0ABAB5", marginTop: "1rem" }}
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
