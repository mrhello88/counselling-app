import { useState } from "react";
import { useAuth } from "../../../store/auth";
export const CreateSession = () => {
  const [data, setData] = useState({ category: "", duration: 30, price: ""});
  const { postCreateCounseling } = useAuth();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.duration === "" || data.category === "" || data.price === "") {
      console.log("select the options");
      return;
    }
    // Add your submission logic here
    postCreateCounseling(data);
    setData({ category: "", duration: "", price: "" });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Counseling Session
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Category Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={data.category}
            name="category"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            <option value="mental_health">Mental Health</option>
            <option value="career_counseling">Career Counseling</option>
            <option value="scholarship_counseling">
              Scholarship Counseling
            </option>
          </select>
        </div>

        {/* Duration Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <select
            value={data.duration}
            name="duration"
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Duration</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
          </select>
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter price in Rs"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
