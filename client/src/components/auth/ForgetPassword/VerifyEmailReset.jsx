import { useState } from "react";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";

export const VerifyEmailReset = () => {
  const [email, setEmail] = useState("");
  const {postEmailResetPassword} = useAuth()
  const handleSubmit = async (e) =>{
     e.preventDefault()
    if(email === ""){
      toast.error("please fill the email box")
      return
    }
    postEmailResetPassword(email)
    setEmail("")
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Email For Reset Password</h2>
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
