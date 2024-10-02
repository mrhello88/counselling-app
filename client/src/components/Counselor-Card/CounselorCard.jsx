export const CounselorCard = ({ counselor, onBuy }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3>{counselor.name}</h3>
      <p>{counselor.email}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onBuy(counselor)}
      >
        Buy Advice
      </button>
    </div>
  );
};
