import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../context/Context";
import { toast } from "react-toastify";
import { LoadingOverlay } from "../../Loading/Loading";

export const VerifyUser = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const { fetchData, apiLoading, LogoutUser, storeTokenInLS } =
    useAuth(); // Assuming VerifyUser is a function from useAuth
  // Effect to verify user and authenticate
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(
          `${process.env.BACKEND_URL}/api/register/verify/${token}`
        );
        if (responseData.success) {
          LogoutUser();
          storeTokenInLS(responseData.token);
          const responseUserData = await fetchData(
            `${process.env.BACKEND_URL}/api/user`
          );
          if (responseUserData.success) {
            toast.success(responseData.message);
            const { role, friends } = responseUserData.data;
            if (role === "student" && (!friends || friends.length === 0)) {
              navigate("/counselorList");
            } else if (role === "counselor") {
              toast.info("Create Counseling to Show Profile");
              navigate("/dashboard");
            } else if (
              role === "admin" ||
              (role === "student" && (friends.length > 0))
            ) {
              navigate("/dashboard");
            }
          } else {
            toast.error(responseUserData.message);
          }
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred while verifyUser.");
      }
    };

    fetchingData(); // Call the async function to execute the user verification
  }, [fetchData]);

  if (apiLoading) {
    return <LoadingOverlay />;
  }
};
