import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({
    userData: [],
    postMessage: [],
    counselors: [],
  });
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userRegister = async (registerUser) => {
    console.log(registerUser, "register user by user");
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: registerUser,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // setUser({ ...user, userData: data.userData });
      }
    } catch (error) {
      console.error("Error post user data");
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
      if (response.status === 200) {
        const data = await response.json();
        LogoutUser();
        storeTokenInLS(data.token);
        console.log(data);
      }
    } catch (err) {
      console.log("Error when verifyUser");
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
      if (response.ok) {
        const data = await response.json();
        setUser({ ...user, userData: data.userData });
      }
    } catch (error) {
      console.error("Error fetching user data");
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
      if (response.ok) {
        const userFriend = await response.json();
        // setUser({ ...user, Userfriends });
        return userFriend;
      }
    } catch (error) {
      console.error("Error fetching friends list");
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
      if (response.ok) {
        const postMessage = await response.json();
        setUser({ ...user, postMessage });
      }
    } catch (error) {
      console.error("Error post message", error);
    }
  };

  const getUserMessages = async (userId) => {
    console.log(userId);
    try {
      const response = await fetch(`http://localhost:3000/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const { chat } = await response.json();
        return chat;
        // setUser({ ...user, chat });
      }
    } catch (error) {
      console.error("Error fetching friends list");
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
      if (response.ok) {
        const counselors = await response.json();
        setUser({ ...user, counselors });
      }
    } catch (error) {
      console.error("Error fetching counselors list");
    }
  };

  const postCounselorAdvice = async (counselor) => {
    try {
      const response = await fetch(`http://localhost:3000/buy-advice`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ counselorId: counselor._id }),
      });

      if (response.ok) {
        alert("Advice bought successfully");
        // Add logic to update the UI (sidebar)
      } else {
        console.log(await response.json());
      }
    } catch (error) {
      console.error("Error post advice list");
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
      console.log("this is profileData,");
      if (response.ok) {
        const profileData = await response.json();
        console.log(profileData, "thsi is auth, at fetch profile data");
        return profileData;
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
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

      if (response.ok) {
        // Optionally fetch updated profile data after saving
        fetchProfileData();
      } else {
        // Handle errors
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const postUpdatedStudentProfile = async (formData) => {
    console.log(formData, "from student");
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
      if (response.ok) {
        fetchProfileData();
      } else {
        // Handle errors
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("Server Error", error.message);
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
        postUpdatedStudentProfile,
        postCreateCounseling,
        putUpdateProfileData,
        VerifyUser,
        userRegister,
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
