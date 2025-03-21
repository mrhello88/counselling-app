import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { counselingSessionSchemaZod } from "../../zod-validation/counselingSessionZod";
import { toast } from "react-toastify";
import { LoadingOverlay } from "../Loading/Loading";

export const CounselorProfile = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const { fetchData, apiLoading, isLoggedIn } = useAuth();
  const { counselorId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const responseData = await fetchData(
          `${process.env.BACKEND_URL}/api/counselorProfile/${counselorId}`
        );
        if (responseData.success) {
          setProfileData(responseData.data || {});
          const slotsData = await fetchData(
            `${process.env.BACKEND_URL}/api/counselorAvailableSlots/${counselorId}`
          );
          if (slotsData.success) {
            setAvailableSlots(slotsData.data || []);
          } else {
            toast.error(slotsData.message);
          }
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error("An unexpected error occurred while fetching profile data");
      }
    };
    fetchingData();
  }, [fetchData, isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDate === null) {
      toast.error("Date is Required!");
      return;
    }
    const startDate = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss"); // Ensure the date is stored as UTC
    const result = counselingSessionSchemaZod.safeParse({ date: startDate });

    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    const endDate = moment(selectedDate)
      .add(1, "hour")
      .format("YYYY-MM-DD HH:mm:ss"); // Ensure the date is stored as UTC
    if (!isLoggedIn) {
      return navigate("/login/student", {
        state: {
          navigateToPayment: `/payment`,
          scheduleSessionData: {
            counselorId: profileData?._id,
            startDate,
            price: profileData.counseling?.price,
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
          price: profileData.counseling?.price,
          endDate,
          duration: profileData.counseling?.duration,
        },
      },
    });
  };

  const isSlotAvailable = (date) => {
    return !availableSlots.some(
      (slot) => moment(slot).isSame(moment(date), "minute")
    );
  };

  if (!profileData?._id) {
    return <LoadingOverlay />;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6">Counselor Profile</h2>

      {/* Personal Info */}
      <div className="mb-4">
        <img
          src={`${process.env.BACKEND_URL}/images/${profileData?.profile}`} // Default profile image
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
            href={`${process.env.BACKEND_URL}/files/${profileData.counselor?.file}`}
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
          onChange={(date) => {
            setSelectedDate(date);
            setErrors({});
          }}
          showTimeSelect
          dateFormat="Pp"
          className="border border-gray-300 rounded-md p-2 w-full"
          minDate={moment().add(1, "hour").toDate()} // Prevent dates less than one hour from now
          filterTime={(time) => moment(time).minute() === 0 && isSlotAvailable(time)} // Only allow times on the hour and available slots
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors?.date?._errors[0]}</p>
        )}
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
