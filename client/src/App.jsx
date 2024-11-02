import "../public/css/App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar-Footer/Navbar";
import { UserDashboard } from "./pages/U-Dashboard";
import { ChatWindow } from "./components/Dashboard/Chat/Chat-Window";
// import { ChatWindows } from "./components/Dashboard/Chat/Chat-Window";
import { Footer } from "./components/Navbar-Footer/Footer";
import { LoginPage } from "./components/auth/login";
// import { Home } from "./pages/Home";
import { Payment } from "./pages/Payment";
import { Register } from "./pages/Register";
import { StudentRegister } from "./components/auth/Register/StudentRegister";
import { CounselorRegister } from "./components/auth/Register/CounselorRegister";
import { VerifyUser } from "./components/auth/Verify/VerifyUser";
import { CounselorProfilePage } from "./components/EditProfile/CounselorProfile";
import { StudentProfilePage } from "./components/EditProfile/StudentProfile";
import { CreateSession } from "./components/Dashboard/createCounseling/CreateCounseling";
import { CounselorProfile } from "./components/CounselorProfile/CounselorProfile";
import { CounselorList } from "./components/FilterCounselors/CounselorList";
import { HomePage } from "./pages/HomePage"
import { useAuth } from "./store/auth";
// import { CounsellorDashboard } from "./pages/C-Dashboard";

export const App = () => {
  const { isLoggedIn, userAuthentication, user } = useAuth();
  const { userData } = user;
  useEffect(() => {
    userAuthentication();
  }, [isLoggedIn]);
  return (
    <Router>
      <div className="">
        <Navbar />
      </div>
      <Routes>
        {/* <Route path={`/`} element={<Home />} /> */}
        {isLoggedIn ? (
          <>
            {userData.role === "student" && userData.friends.length > 0 ? (
              <Route path="/user-dashboard" element={<UserDashboard />}>
                <Route index element={<ChatWindow />} />
                <Route
                  path="/user-dashboard/create-session"
                  element={<CreateSession />}
                />
              </Route>
            ) : null}
            {userData.role === "counselor" ? (
              <>
                <Route path="/user-dashboard" element={<UserDashboard />}>
                  <Route index element={<ChatWindow />} />
                  <Route
                    path="/user-dashboard/create-session"
                    element={<CreateSession />}
                  />
                </Route>
                <Route
                  path="/profile/counselor"
                  element={<CounselorProfilePage />}
                />
              </>
            ) : null}
            {userData.role === "counselor" ? (
              <Route
                path="/profile/counselor"
                element={<CounselorProfilePage />}
              />
            ) : null}
            {userData.role === "student" && userData.friends.length > 0 ? (
              <Route path="/profile/student" element={<StudentProfilePage />} />
            ) : null}
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/student" element={<StudentRegister />} />
            <Route path="/register/counselor" element={<CounselorRegister />} />
            <Route path="/register/verify/:token" element={<VerifyUser />} />
          </>
        )}
        <Route
          path="/counselor-profile/:counselorId"
          element={<CounselorProfile />}
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/counselorList" element={<CounselorList />} />
      </Routes>
      <Footer />
    </Router>
  );
};
