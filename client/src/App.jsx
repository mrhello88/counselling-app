import "../public/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar-Footer/Navbar";
import { UserDashboard } from "./pages/U-Dashboard";
import { ChatWindow } from "./components/Dashboard/Chat/Chat-Window";
// import { ChatWindows } from "./components/Dashboard/Chat/Chat-Window";
import { Footer } from "./components/Navbar-Footer/Footer";
import { LoginPage } from "./components/auth/login";
import { Home } from "./pages/Home";
import { Payment } from "./pages/Payment";
import { Register } from "./pages/Register";
import { StudentRegister } from "./components/auth/Register/StudentRegister";
import { CounselorRegister } from "./components/auth/Register/CounselorRegister";
import About from "./pages/About";
import { VerifyUser } from "./components/auth/Verify/VerifyUser";
import { ProfilePage } from "./pages/Profile";
// import { CounsellorDashboard } from "./pages/C-Dashboard";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={"/about"} element={<About />} />
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route index element={<ChatWindow />} />
        </Route>
        {/* <Route path="/counsellor-dashboard" element={<CounsellorDashboard />}>
          <Route index element={<ChatWindow />} />
          </Route> */}

        <Route path="/profile/counselor" element={<ProfilePage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/counselor" element={<CounselorRegister />} />
        <Route path="/register/verify/:token" element={<VerifyUser />} />
      </Routes>
      <Footer />
    </Router>
  );
};
