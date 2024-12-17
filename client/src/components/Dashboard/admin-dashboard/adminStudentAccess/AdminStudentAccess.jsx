import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/Context"; // Assuming useAuth is in hooks folder
import { StudentCard } from "../../../Cards/Student-Card/StudentCard"; // Update this to the correct path
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminStudentPage = () => {
  const { fetchData, postData, isLoggedIn } = useAuth();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const responseData = await fetchData(`http://localhost:3000/students`);
      if (responseData.success) {
        setStudents(responseData.data || []);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchData, isLoggedIn]);

  // Delete a student
  const toggleStudent = async (e, studentId) => {
    e.preventDefault();
    try {
      const responseData = await fetchData(
        `http://localhost:3000/toggleStatus/${studentId}`
      );
      if (responseData.success) {
        await fetchStudents();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleStudentProfile = async (e, studentId) => {
    e.preventDefault();
    navigate(`/dashboard/admin-student-profile/${studentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Admin - Manage Students
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard
            key={student._id}
            handleStudentProfile={handleStudentProfile}
            toggleStudent={toggleStudent}
            studentData={student}
          />
        ))}
      </div>
      {students.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No students found.</p>
      )}
    </div>
  );
};
