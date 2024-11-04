import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../store/auth";
import { toast } from "react-toastify";

export const VerifyUser = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const { VerifyUser, isLoggedIn } = useAuth(); // Assuming VerifyUser is a function from useAuth

  // Effect to verify user and authenticate
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        // First, verify the user and wait for the result
        const data = await VerifyUser(token); // Assuming VerifyUser returns a promise
        if (data.role === "student") {
          navigate("/counselorList");
        } else {
          toast.info("Create Counseling to Show Profile");
          navigate("/user-dashboard");
        }
      } catch (error) {
        console.error("Error during user verification:", error);
      }
    };

    authenticateUser(); // Call the async function to execute the user verification
  }, [VerifyUser, isLoggedIn]);

  return <div>Verifying User...</div>;
};
