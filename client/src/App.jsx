import "../public/css/App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar-Footer/Navbar";
import { UserDashboard } from "./pages/U-Dashboard";
import { ChatWindow } from "./components/Dashboard/Chat/Chat-Window";
import { Footer } from "./components/Navbar-Footer/Footer";
import { LoginPage } from "./components/auth/Login";
import { Payment } from "./pages/Payment";
import { Register } from "./pages/Register";
import { StudentRegister } from "./components/auth/Register/StudentRegister";
import { CounselorRegister } from "./components/auth/Register/CounselorRegister";
import { VerifyUser } from "./components/auth/Verify/VerifyUser";
import { CounselorProfilePage } from "./components/EditProfile/CounselorProfile";
import { StudentProfilePage } from "./components/EditProfile/StudentProfile";
import { AdminProfilePage } from "./components/EditProfile/AdminProfile";
import { CreateSession } from "./components/Dashboard/createCounseling/CreateCounseling";
import { CounselorProfile } from "./components/CounselorProfile/CounselorProfile";
import { CounselorList } from "./components/FilterCounselors/CounselorList";
import { HomePage } from "./pages/HomePage";
import { useAuth } from "./context/Context";
import { Login } from "./pages/Login";
import { VerifyEmailReset } from "./components/auth/ForgetPassword/VerifyEmailReset";
import { ResetForgetPassword } from "./components/auth/ForgetPassword/ResetForgetPassword";
import { toast } from "react-toastify";
import { AdminCounselorPage } from "./components/Dashboard/admin-dashboard/adminCounselorAccess/AdminCounselorAccess";
import { AdminCounselorProfile } from "./components/Dashboard/admin-dashboard/adminCounselorAccess/adminCounselorProfile/AdminCounselorProfile";
import { AdminStudentProfile } from "./components/Dashboard/admin-dashboard/adminStudentAccess/adminStudentProfile/AdminStudentProfile";
import { AdminStudentPage } from "./components/Dashboard/admin-dashboard/adminStudentAccess/AdminStudentAccess";
import { AdminBookUpload } from "./components/Dashboard/admin-dashboard/adminBookUpload/AdminBookUpload";
import { AllBooks } from "./components/Dashboard/bookLibrary/BookLibrary";
import NotFound from "./components/Error/Error404";
import { AboutUs } from "./pages/AboutUs.jsx";

export const App = () => {
  const { isLoggedIn, fetchData, refreshFlag } = useAuth();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(
          `${process.env.BACKEND_URL}/api/user`
        );
        if (responseData.success) {
          setUserData(responseData.data || {});
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("An unexpected error occurred while fetching user data.");
      }
    };
    // Call the async function inside useEffect
    fetchingData(userData);
  }, [isLoggedIn, fetchData, refreshFlag]);

  return (
    <Router>
      <div className="">
        <Navbar />
      </div>
      <Routes>
        {isLoggedIn && userData.role ? (
          <>
            <Route path="/payment" element={<Payment />} />
            {userData.role === "student" && userData.friends.length > 0 ? (
              <>
                <Route path="/dashboard" element={<UserDashboard />}>
                  <Route index element={<ChatWindow />} />
                  <Route
                    path="/dashboard/book-library"
                    element={<AllBooks />}
                  />
                </Route>
                <Route
                  path="/profile/student"
                  element={<StudentProfilePage />}
                />
              </>
            ) : (
              <Route path="/" element={<HomePage />} />
            )}
            {userData.role === "counselor" ? (
              <>
                <Route path="/dashboard" element={<UserDashboard />}>
                  <Route index element={<ChatWindow />} />
                  <Route
                    path="/dashboard/create-session"
                    element={<CreateSession />}
                  />
                </Route>
                <Route
                  path="/profile/counselor"
                  element={<CounselorProfilePage />}
                />
              </>
            ) : (
              <Route path="/" element={<HomePage />} />
            )}
            {userData.role === "admin" ? (
              <>
                <Route path="/dashboard" element={<UserDashboard />}>
                  <Route index element={<ChatWindow />} />
                  <Route
                    path="/dashboard/admin-counselor"
                    element={<AdminCounselorPage />}
                  />
                  <Route
                    path="/dashboard/admin-student"
                    element={<AdminStudentPage />}
                  />
                  <Route
                    path="/dashboard/admin-counselor-profile/:counselorId"
                    element={<AdminCounselorProfile />}
                  />
                  <Route
                    path="/dashboard/admin-student-profile/:studentId"
                    element={<AdminStudentProfile />}
                  />
                  <Route
                    path="/dashboard/upload-book"
                    element={<AdminBookUpload />}
                  />
                  <Route
                    path="/dashboard/book-library"
                    element={<AllBooks />}
                  />
                </Route>
                <Route
                  path="/profile/admin"
                  element={<AdminProfilePage />}
                />
              </>
            ) : null}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route
              path="/login/student"
              element={<LoginPage role={"student"} />}
            />
            <Route
              path="/login/counselor"
              element={<LoginPage role={"counselor"} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/register/student" element={<StudentRegister />} />
            <Route path="/register/counselor" element={<CounselorRegister />} />
            <Route path="/register/verify/:token" element={<VerifyUser />} />
            <Route path={"/email-reset"} element={<VerifyEmailReset />} />
            <Route
              path={"/password-reset/:token/:userId"}
              element={<ResetForgetPassword />}
            />
          </>
        )}
        <Route
          path="/counselor-profile/:counselorId"
          element={<CounselorProfile />}
        />
        <Route path="/login/admin" element={<LoginPage role={"admin"} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/counselorList" element={<CounselorList />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Catch-all route for 404 */}
      </Routes>
      <Footer />
    </Router>
  );  
}; 
 