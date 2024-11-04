import {useState} from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
export const ResetForgetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const { postResetPassword } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      toast.error("fill the inputs");
      return;
    }
    postResetPassword(token, password);
    setPassword("");
    navigate("/email-reset");
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
        </div>
      </div>
    </>
  );
};
