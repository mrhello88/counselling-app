import { createContext, useState, useEffect, useContext } from "react";
// import { getCounselor } from "../../../server/controller/counselor";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({
    userData: [],
    friends: [],
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
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ registerUser }),
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

  const userFriends = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/friends`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const friends = await response.json();
        setUser({ ...user, friends });
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userAuthentication,
        userFriends,
        postUserMessage,
        storeTokenInLS,
        postCounselorAdvice,
        getCounselors,
        getUserMessages,
        LogoutUser,
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
