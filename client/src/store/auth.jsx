import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Configure toast notifications

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({
    userData: [],
    postMessage: [],
    counselors: [],
  });
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    return setToken(localStorage.getItem("token"));
  };

  let isLoggedIn = !!token;
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userLogin = async (email) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email to backend
      });
      const res_data = await response.json();
      if (res_data.success) {
        LogoutUser();
        storeTokenInLS(res_data.token);
        toast.success(res_data.message || "Login Successfully");
        return res_data;
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message || "Failed to Post Login details");
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error("Error Post login details", error);
      toast.error("An unexpected error occurred while Post login details.");
    }
  };

  const userRegister = async (registerUser) => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: registerUser,
      });
      const res_data = await response.json();
      if (res_data.success) {
        console.log(res_data.message);
        toast.success(res_data.message || "you got Email");
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message || "Failed to Post Register details");
      }
    } catch (error) {
      // Catch any unexpected errors
      console.error("Error Post Register details", error);
      toast.error("An unexpected error occurred while Post Register details.");
    }
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res_data = await response.json();
      if (res_data.success) {
        setUser({ ...user, userData: res_data.data });
      } else {
        // console.log(res_data.message);
        // // If the backend response indicates failure, show the error message
        // toast.error(res_data.message || "user is not LoggedIn");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      // Catch any unexpected errors
      toast.error("An unexpected error occurred while fetching user data.");
    }
  };

  const VerifyUser = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:3000/register/verify/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res_data = await response.json();
      if (res_data.success) {
        LogoutUser();
        storeTokenInLS(res_data.token);
        toast.success(res_data.message);
        return res_data.data;
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message || "user is Registr");
      }
    } catch (error) {
      console.log("Error when verifyUser", error);
      toast.error("An unexpected error occurred while verifyUser.");
    }
  };

  const getCounselors = async () => {
    try {
      const response = await fetch(`http://localhost:3000/counselors`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res_data = await response.json();
      if (res_data.success) {
        return res_data.data;
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message || "counselors list");
      }
    } catch (error) {
      console.error("Error fetching counselors list");
      toast.error("An unexpected error occurred while counselors list");
    }
  };

  const postCounselorAdvice = async (scheduleSessionData) => {
    try {
      const response = await fetch(`http://localhost:3000/buy-advice`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ counselorId: scheduleSessionData.counselorId }),
      });
      const res_data = await response.json();

      if (res_data.success) {
        toast.success(res_data.message || "Advice bought successfully");
        await postCounselingSession(scheduleSessionData);

        // Add logic to update the UI (sidebar) nbcd bgnh
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message || "Advice not bought successfully");
      }
    } catch (error) {
      console.error("Error fetching advice list");
      toast.error("An unexpected error occurred while advice list");
    }
  };

  const postCreateCounseling = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/create-counseling", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();
      if (res_data.success) {
        toast.success(res_data.message || "counseling created successfully");
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message || "counseling not created successfully");
      }
    } catch (error) {
      console.error("Error post counseling created");
      toast.error("An unexpected error occurred while counseling creating");
    }
  };

  const userFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/friends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res_data = await response.json();
      if (res_data.success) {
        return res_data.data;
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error fetching friends list");
      toast.error("An unexpected error occurred while friends list");
    }
  };

  const postUserMessage = async (userId, message) => {
    console.log(userId, message, "this this line 60 auth");
    if (message === "") {
      message = "please write something";
    }
    try {
      const response = await fetch(`http://localhost:3000/send/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });
      const res_data = await response.json();
      if (res_data.success) {
        setUser({ ...user, postMessage: res_data.data });
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error post message", error);
      toast.error("An unexpected error occurred while post message");
    }
  };

  const getUserMessages = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res_data = await response.json();
      if (res_data.success) {
        return res_data.data;
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error fetching message", error);
      toast.error("An unexpected error occurred while fetching message");
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Adjust the endpoint to your backend route
      const res_data = await response.json();
      if (res_data.success) {
        return res_data.data;
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      toast.error("An unexpected error occurred while fetching profile data");
    }
  };

  const putUpdateProfileData = async (formData) => {
    try {
      // Make an API call to update the profile in the database
      const response = await fetch("http://localhost:3000/update-profile", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const res_data = await response.json();
      if (res_data.success) {
        // Optionally fetch updated profile data after saving
        toast.success(res_data.message);
        fetchProfileData();
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An unexpected error occurred while updating profile");
    }
  };

  const postUpdatedStudentProfile = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:3000/update-student-profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const res_data = await response.json();
      if (res_data.success) {
        toast.success(res_data.message);
        fetchProfileData();
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An unexpected error occurred while updating profile");
    }
  };

  const getCounselorProfile = async (counselorId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/counselorProfile/${counselorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res_data = await response.json();
      if (res_data.success) {
        return res_data.data;
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error fetching counselor Profile by Id");
      toast.error(
        "An unexpected error occurred while fetching counselor Profile by Id"
      );
    }
  };

  const postCounselingSession = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:3000/counseling-schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const res_data = await response.json();
      if (res_data.success) {
        console.log("Counseling session scheduled successfully!");
        // toast.success(
        //   res_data.message || "Counseling session scheduled successfully!"
        // );
      } else if (res_data.success === false) {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error post counsling schedule");
      toast.error("An unexpected error occurred while post counsling schedule");
    }
  };

  const getCounselingSession = async (counselorId) => {
    console.log("counselorId = ", counselorId);
    try {
      const response = await fetch(
        `http://localhost:3000/counseling-schedule/${counselorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res_data = await response.json();
      if (res_data.success) {
        console.log("res_data = ", res_data.data);
        return res_data.data;
      } else {
        console.log(res_data.message);
        // If the backend response indicates failure, show the error message
        toast.error(res_data.message);
      }
    } catch (error) {
      console.error("Error fetching counsling schedule");
      toast.error(
        "An unexpected error occurred while fetching counsling schedule"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userAuthentication,
        userFriends,
        postUserMessage,
        storeTokenInLS,
        postCounselorAdvice,
        fetchProfileData,
        getCounselors,
        getUserMessages,
        LogoutUser,
        userLogin,
        getCounselorProfile,
        postUpdatedStudentProfile,
        postCounselingSession,
        postCreateCounseling,
        putUpdateProfileData,
        getCounselingSession,
        VerifyUser,
        userRegister,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
