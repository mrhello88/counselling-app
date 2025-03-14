import { Link} from "react-router-dom";
export const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Register Now</h1>
      <div className="space-y-4">
        <Link
          to={"/register/student"}
         className="w-64 py-2 bg-primary p-8 text-xl text-white font-semibold mr-4 rounded-lg hover:bg-secondary"
        >
          Register as Student
        </Link>
        <Link
          to={"/register/counselor"}
          className="w-64 py-2 bg-secondary p-8 text-xl text-white font-semibold mr-4 rounded-lg hover:bg-primary"
        >
          Register as Counselor
        </Link>
      </div>
    </div>
  );
};
