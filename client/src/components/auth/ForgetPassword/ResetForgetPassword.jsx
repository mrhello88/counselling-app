import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/Context";
import { resetPasswordZodSchema } from "../../../zod-validation/resetPasswordZod";
import { toast } from "react-toastify";
import { LoadingOverlay } from "../../Loading/Loading";

export const ResetForgetPassword = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { token, userId } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const { postData, apiLoading} = useAuth();
  // const { postResetPassword, postData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = resetPasswordZodSchema.safeParse({ password });
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }
    try {
      const responseData = await postData(
        `http://localhost:3000/password-reset`,
        {
          token,
          password,
          userId,
        }
      );
      if (responseData.success) {
        toast.success(responseData.message);
        setPassword("");
        navigate("/");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred while reset password email verification."
      );
    }
  };
  if (apiLoading) {
    return apiLoading && <LoadingOverlay />;
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">New Password</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "",
                  }));
                }}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password._errors[0]}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
