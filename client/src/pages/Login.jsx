import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Register Now</h1>
      <div className="space-y-4">
        <Link
          to={"/login/student"}
          className="w-64 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Login as Student
        </Link>
        <Link
          to={"/login/counselor"}
          className="w-64 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Login as Counselor
        </Link>
      </div>
    </div>
  );
};
