import { useEffect } from "react";
import { CounselorCard } from "../components/Counselor-Card/CounselorCard";
import { useAuth } from "../store/auth";
export const Home = () => {
  const { getCounselors, user } = useAuth();
  const { counselors } = user;

 
  useEffect(() => {
    getCounselors();
  }, []);

  return (
    <div className="min-h-screen">
      Home Component
      <div className="p-5 border-2 border-black w-96">
        <div>
          {counselors.map((counselor) => (
            <CounselorCard
              key={counselor._id}
              counselor={counselor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
