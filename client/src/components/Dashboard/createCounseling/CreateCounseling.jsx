import { useState } from "react";
import { useAuth } from "../../../context/Context";
import { toast } from "react-toastify";
import { createCounselingSchemaZod } from "../../../zod-validation/createCounselingZod";
import { LoadingOverlay } from "../../Loading/Loading";

export const CreateSession = () => {
  const [data, setData] = useState({ category: "", duration: "", price: "" });
  const [errors, setErrors] = useState({});
  const { postData, apiLoading } = useAuth();
  // const { postCreateCounseling, apiLoading, postData } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "duration" || name === "price"
          ? value === " "
            ? null
            : Number(value) // Set to null if empty, otherwise convert to number
          : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = createCounselingSchemaZod.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }
    // Add your submission logic here
    try {
      const responseData = await postData(
        `${process.env.BACKEND_URL}/api/create-counseling`,
        data
      );
      if (responseData.success) {
        toast.success(responseData.message);
        setData({ category: "", duration: "", price: "" });
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while counseling creating");
    }
  };
  // if (apiLoading) {
  //   return apiLoading && <LoadingOverlay />;
  // }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-md">
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
          <option value="scholarship_counseling">Scholarship Counseling</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category._errors[0]}</p>
        )}
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
          <option value="45">45 minutes</option>
        </select>
        {errors.duration && (
          <p className="text-red-500 text-sm">{errors.duration._errors[0]}</p>
        )}
      </div>

      {/* Price Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          name="price"
          type="number"
          value={data.price}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter price in Rs"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price._errors[0]}</p>
        )}
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
</div>
  );
};
