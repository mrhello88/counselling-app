import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../store/auth";
import { useNavigate, useParams } from "react-router-dom";

export const CounselorProfile = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [profileData, setProfileData] = useState({});
  const {
    getCounselorProfile,
    // postCounselingSession,
    isLoggedIn,
    // setFormDataSession,
    // formDataSession,
  } = useAuth();
  const { counselorId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const counselorData = async () => {
      const data = await getCounselorProfile(counselorId);
      setProfileData(data || {});
    };
    counselorData();
  }, [getCounselorProfile]);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startDate = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
    const endDate = moment(selectedDate)
      .add(profileData.counseling?.duration, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");

    if (!isLoggedIn) {
      return navigate("/login", {
        state: {
          navigateToPayment: `/payment`,
          scheduleSessionData: {
            counselorId: profileData?._id,
            startDate,
            endDate,
            duration: profileData.counseling?.duration,
          },
        },
      });
    }
    navigate("/payment", {
      state: {
        navigateToPayment: `/payment`,
        scheduleSessionData: {
          counselorId: profileData?._id,
          startDate,
          endDate,
          duration: profileData.counseling?.duration,
        },
      },
    });
    // navigate("/payment");
    // alert("Counseling session scheduled successfully!");
  };
 
  if (!profileData?._id) {
    return <p>Loading.... at counselorProfile</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6">Counselor Profile</h2>

      {/* Personal Info */}
      <div className="mb-4">
        <img
          src={`http://localhost:3000/images/${profileData?.profile}`} // Default profile image
          alt="Counselor"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-2xl font-semibold">
          {profileData.personalInfo.name}
        </h3>
        <p className="text-gray-600">{profileData.personalInfo.email}</p>
      </div>

      {/* Education Info */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold">Education</h4>
        <p>
          <strong>Degree:</strong> {profileData.counselor?.education.degree}
        </p>
        <p>
          <strong>Institution:</strong>{" "}
          {profileData.counselor?.education.institution}
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          {profileData.counselor?.education.experience} years
        </p>
        <p>{profileData.counselor?.education.description}</p>
      </div>

      {/* Counseling Info */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold">Counseling Details</h4>
        <p>
          <strong>Category:</strong> {profileData.counseling?.category}
        </p>
        <p>
          <strong>Price per session:</strong> ${profileData.counseling?.price}
        </p>
        <p>
          <strong>Duration:</strong> {profileData.counseling?.duration}
        </p>
      </div>

      {/* File Section */}
      {profileData.counselor?.file && (
        <div className="mt-6">
          <h4 className="text-xl font-semibold">Attached Document:</h4>
          <a
            href={`http://localhost:3000/files/${profileData.counselor?.file}`}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Document
          </a>
        </div>
      )}

      {/* Select Counseling Time */}
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block font-semibold mb-2">
          Select Date and Time:
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border border-gray-300 rounded-md p-2 w-full"
          minDate={new Date()} // Prevent past dates
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Schedule Counseling
        </button>
      </form>
    </div>
  );
};
