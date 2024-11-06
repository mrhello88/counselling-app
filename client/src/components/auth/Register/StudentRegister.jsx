import { useState } from "react";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";
import { studentSchemaZod } from "../../../zod-validation/studentZod";
import { Link } from "react-router-dom";
export const StudentRegister = () => {
  const [data, setData] = useState({
    personalInfo: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    role: "student",
  });
  const { userRegister } = useAuth();
  const [errors, setErrors] = useState({});
  const handleChange = (section, e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [section]: {
        ...data[section],
        [name]: value,
      },
      role: "student",
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = studentSchemaZod.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors.personalInfo);
      toast.error("Please fix the errors in the form.");
      return;
    }
    const formData = new FormData();
    formData.append("registerUser", JSON.stringify(data));
    // Submit form data (you can replace this with an API call)
    userRegister(formData);

    // Reset form and error
    setErrors({});
    setData({
      personalInfo: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
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
                value={data.personalInfo.name}
                onChange={(e) => handleChange("personalInfo", e)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name._errors[0]}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.personalInfo.email}
                onChange={(e) => handleChange("personalInfo", e)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email._errors[0]}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.personalInfo.password}
                onChange={(e) => handleChange("personalInfo", e)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password._errors[0]}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={data.personalInfo.confirmPassword}
                onChange={(e) => handleChange("personalInfo", e)}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword._errors[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-4 py-2 w-full rounded text-primary bg-secondary hover:text-black font-bold text-xl duration-300 hover:scale-110"
            >
              Register
            </button>
          </form>
          <div className="mt-4 flex justify-between">
            <Link
              to="/login/student"
              className="text-blue-500 text-sm hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
