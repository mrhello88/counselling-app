import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingOverlay } from "../Loading/Loading";

export const LoginPage = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { apiLoading, postData, LogoutUser, storeTokenInLS } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all inputs.");
      return;
    }

    try {
      const responseData = await postData("http://localhost:3000/login", {
        email,
        role,
        password,
      });

      if (responseData.success) {
        LogoutUser(); // If logout is required before login, ensure this is intentional.
        storeTokenInLS(responseData.token); // Ensure this function is correctly implemented.
        toast.success(responseData.message || "Login successful!");
        // Redirect logic
        const { role, friends } = responseData.data;
        if (location.state?.navigateToPayment) {
          navigate(location.state.navigateToPayment, {
            state: { ...location.state },
          });
        } else if (role === "student" && (!friends || friends.length === 0)) {
          navigate("/counselorList");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        toast.error(responseData.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred during login.");
    }
  };
  if (apiLoading) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
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
              className="px-4 py-2 w-full rounded text-primary bg-secondary hover:text-black font-bold text-xl duration-300 hover:scale-110"
            >
              Login
            </button>
          </form>
          {role !== "admin" && (
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
          )}
        </div>
      </div>
    </>
  );
};
