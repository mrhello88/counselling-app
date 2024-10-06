import { useAuth } from "../../store/auth";

export const CounselorCard = ({ counselor }) => {
const {postCounselorAdvice}= useAuth()
  const handleBuy = async (counselor) => {
    postCounselorAdvice(counselor);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3>{counselor.personalInfo.name}</h3>
      <p>{counselor.personalInfo.email}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleBuy(counselor)}
      >
        Buy Advice
      </button>
    </div>
  );
};
