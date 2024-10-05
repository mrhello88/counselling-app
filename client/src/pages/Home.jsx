import { useState, useEffect } from "react";
import { CounselorCard } from "../components/Counselor-Card/CounselorCard";
import axios from "axios";
import { useAuth } from "../store/auth";
export const Home = () => {
  const { getCounselors, postCounselorAdvice, user } = useAuth();
  const { counselors } = user;

  const handleBuy = async (counselor) => {
    postCounselorAdvice(counselor);
  };

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
              onBuy={handleBuy}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
