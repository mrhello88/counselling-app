import { useState } from "react";
import { useAuth } from "../../../context/Context";
import { toast } from "react-toastify";
import { emailResetPasswordZodSchema } from "../../../zod-validation/emailResetPasswordZod";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../../Loading/Loading";

export const VerifyEmailReset = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { postData, apiLoading } = useAuth();
  // const { postEmailResetPassword, postData } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pass email as an object to match the schema structure
    const result = emailResetPasswordZodSchema.safeParse({ email });

    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }
    try {
      const responseData = await postData(`${process.env.BACKEND_URL}/api/email-reset`, {
        email,
      });
      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/");
        setEmail("");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred while reset password email verification."
      );
    }
  };
  // if (apiLoading) {
  //   return apiLoading && <LoadingOverlay />;
  // }

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Email For Reset Password
          </h2>
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
                name="email" // Add the name attribute
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "", // Reset error for the "email" field
                  }));
                }}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email._errors[0]}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
