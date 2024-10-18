// import { useAuth } from "../../store/auth";

export const CounselorCard = ({ counselorData, handlCounselorProfile }) => {
  // const { postCounselorAdvice } = useAuth();
  // const handleBuy = async (counselor) => {
  //   postCounselorAdvice(counselor);
  // };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={`http://localhost:3000/images/${counselorData?.profile}`} // Default profile image
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold">{counselorData.name}</h3>
      <p className="text-gray-600 mb-2">{counselorData.counselor?.education.degree}</p>
      <p className="text-gray-600 mb-2">
        Experience: {counselorData.counselor?.education.experience}
      </p>
      <p className="text-gray-600 mb-2">
        Category: {counselorData.counseling?.category}
      </p>
      <p className="text-gray-600 mb-4">
        Price: ${counselorData.counseling?.price}
      </p>
      <button
        onClick={(e) => handlCounselorProfile(e, counselorData?._id)}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Profile
      </button>
    </div>
    // <div className="bg-white p-4 rounded shadow-md">
    //   <h3>{counselor.personalInfo.name}</h3>
    //   <p>{counselor.personalInfo.email}</p>
    //   <button
    //     className="bg-blue-500 text-white px-4 py-2 rounded"
    //     onClick={() => handleBuy(counselor)}
    //   >
    //     Buy Advice
    //   </button>
    // </div>
  );
};
