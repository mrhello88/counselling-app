import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../store/auth";

export const VerifyUser = () => {
    const { token } = useParams(); // Extract the token from the URL
    const {VerifyUser} = useAuth()

    useEffect(()=>{
       VerifyUser(token)
    },[token])

  return (
    <div>Verify User</div>
  );
};
