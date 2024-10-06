import { useState } from "react";
import { useAuth } from "../../../store/auth";

export const StudentRegister = () => {
  const [Data, setData] = useState({
    personalInfo: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    role:"student"
  });
  const { userRegister } = useAuth();

  const [error, setError] = useState("");

  const handleChange = (section,e) => {
    const { name, value } = e.target;
    setData({
      ...Data,
      [section]: {
        ...Data[section],
        [name]: value,
      },
      role:"student"
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = Data.personalInfo;

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Submit form data (you can replace this with an API call)
    const formData = new FormData()
    formData.append("registerUser", JSON.stringify(Data))
    userRegister(formData);

    // Reset form and error
    setData({
      personalInfo: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {error ? <div>{error}</div> : ""}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Student Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={Data.personalInfo.name}
              onChange={(e)=>handleChange("personalInfo",e)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={Data.personalInfo.email}
              onChange={(e)=>handleChange( "personalInfo",e)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={Data.personalInfo.password}
              onChange={(e)=>handleChange( "personalInfo",e)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={Data.personalInfo.confirmPassword}
              onChange={(e)=>handleChange( "personalInfo",e)}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
