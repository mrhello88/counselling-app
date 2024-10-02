import { useState,useEffect } from "react";
import { CounselorCard } from "../components/Counselor-Card/CounselorCard";
import axios from "axios"
export const Home = () => {
  const [counselors, setCounselors] = useState([]);

  const fetchCounselors = async () => {
    const response = await fetch("http://localhost:3000/counselors");
    const data = await response.json();
    setCounselors(data);
  };

  const handleBuy = async (counselor) => {
    const userId = "66f52ee4447d1b20c6251153"; // Get the current logged-in user ID
    console.log(counselor,userId)
    const response = await fetch(`http://localhost:3000/buy-advice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, counselorId: counselor._id }),
    });

    if (response.ok) {
      alert("Advice bought successfully");
      // Add logic to update the UI (sidebar)
    }
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  return (
    <div>
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
