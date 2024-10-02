import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({
    userData: [],
    friends: [],
    postMessage: [],
  });
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
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
    console.log(userId, "request by 1153")
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
    console.log(userId)
    try {
      const response = await fetch(`http://localhost:3000/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const {chat} = await response.json();
        return chat
        // setUser({ ...user, chat });
      }
    } catch (error) {
      console.error("Error fetching friends list");
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
        getUserMessages,
        LogoutUser,
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
