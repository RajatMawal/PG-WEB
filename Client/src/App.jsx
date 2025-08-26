import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout.jsx";
import AdminLayout from "./Components/Layout/AdminLayout.jsx";

// User Pages
import Home from "./Pages/Home/Home.jsx";
import PgDetails from "./Pages/Home/PgDetails.jsx";
import ContactForm from "./Pages/Home/ContactForm.jsx";
import About from "./Pages/Home/About.jsx";
import Login from "./Pages/Home/Login.jsx";
import Register from "./Pages/Home/Register.jsx";
import Account from "./Pages/User/Account.jsx";
import UpdateInformation from "./Pages/User/UpdateInformation.jsx";
import AddProperty from "./Pages/Home/AddProperty.jsx";
import ForgotPassword from "./Pages/Home/ForgotPassword.jsx";
import OtpVerify from "./Pages/Home/OtpVerify.jsx";

// Admin Pages
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import ManageUsers from "./Components/Admin/ManageUsers.jsx";
import AllPg from "./Pages/Home/AllPg.jsx";
import UpdatePassword from "./Pages/Home/UpdatePassword.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./Pages/Admin/Protected.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAccess } from "../redux/Slice/userSlice.js";
import LoginRedirect from "./Pages/Admin/LoginRedirect.jsx";
import { Loader } from "./Components/Utils/Loader.jsx";
import SendRegisterOtp from "./Pages/Home/SendRegisterOtp.jsx";
import { ProtectedRegister } from "./Pages/Admin/ProtectedRegister.jsx";
import AuthRedirect from "./Components/Utils/AuthRedirect.jsx";
import PrivacyPolicy from "./Pages/Home/PrivacyPolicy.jsx";
import TermsAndConditions from "./Pages/Home/Term&Conditions.jsx";


const App = () => {
  const dispatch = useDispatch();
  const { users, isAuthenticated, role, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
  window.onpopstate = function () {
    window.location.reload(true);
    window.location.href = "/all-PG";
  };
}, []);


useEffect(() => {
    dispatch(getAccess()).unwrap();
}, []);


  if (loading) {
    return  <Loader/>
  }


  return (
    <>
     <AuthRedirect isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="pg-details/:id" element={<PgDetails />} />
          <Route path="contact" element={<ContactForm />} />
          <Route path="about" element={<About />} />
          <Route path="privacyPolicy" element={<PrivacyPolicy/>} />
          <Route path="termConditions" element={<TermsAndConditions/>} />
          <Route
            path="login"
            element={<LoginRedirect isAuthenticated={isAuthenticated} />}
          />
          <Route path="login/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/login/forgotPassword/otp-verify"
            element={<OtpVerify />}
          />
          <Route
            path="login/forgotPassword/otp-verify/update-password"
            element={<UpdatePassword />}
          />
          <Route path="registerOtp" element={<SendRegisterOtp />} />
          <Route path="register" element={<ProtectedRegister><Register /></ProtectedRegister>} />
          <Route path="account" element={<Account />} />
          <Route path="update-information" element={<UpdateInformation />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="all-PG" element={<AllPg />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<Protected />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="manage-Users" element={<ManageUsers />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  );
};

export default App;
