import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";

export const VerifyUser = () => {
  const { token } = useParams();
  const { userVerification } = useAuth();
  useEffect(() => {
    console.log("verify");
    userVerification(token);
  }, [token]);
  return <div>VerifyUser Component</div>;
};
