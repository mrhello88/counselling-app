import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">
          Oops! The page you are looking for doesn't exist.
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
