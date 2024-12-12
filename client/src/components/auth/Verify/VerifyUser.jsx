import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../context/Context";
import { toast } from "react-toastify";
import { LoadingOverlay } from "../../Loading/Loading";

export const VerifyUser = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const {
    fetchData,
    apiLoading,
    isLoggedIn,
    LogoutUser,
    storeTokenInLS,
  } = useAuth(); // Assuming VerifyUser is a function from useAuth

  // Effect to verify user and authenticate
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(
          `http://localhost:3000/register/verify/${token}`
        );
        console.log(responseData,"this isverfiy")
        if (responseData.success) {
          LogoutUser();
          storeTokenInLS(responseData.token);
          toast.success(responseData.message);
          if (responseData.data.role === "student") {
            navigate("/counselorList");
          } else {
            toast.info("Create Counseling to Show Profile");
            navigate("/user-dashboard");
          }
        }
      } catch (error) {
        toast.error("An unexpected error occurred while verifyUser.");
      }
    };

    fetchingData(); // Call the async function to execute the user verification
  }, [fetchData, isLoggedIn]);

  if (apiLoading) {
    return <LoadingOverlay />;
  }
};
