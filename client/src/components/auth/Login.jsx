import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginPage = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("fill the inputs");
      return;
    }
    const loginSuccess = await userLogin(email, role, password); // Assuming userLogin returns a success flag or token
    setEmail("");
    setPassword("");
    if (loginSuccess) {
      // If there is a path to return to after login
      if (location.state?.navigateToPayment) {
        navigate(location.state.navigateToPayment, {
          state: { ...location.state },
        }); // Redirect to the intended session
      } else {
        if (
          loginSuccess.data.role === "student" &&
          loginSuccess.data.friends.length <= 0
        ) {
          return navigate("/counselorList"); // Default redirect after successful login
        } else {
          return navigate("/user-dashboard");
        }
      }
    } else {
      console.log("Login failed. Staying on login page or showing error.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between">
          <Link
            to="/email-reset"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
          <Link
            to={`/register/${role}`}
            className="text-blue-500 text-sm hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
