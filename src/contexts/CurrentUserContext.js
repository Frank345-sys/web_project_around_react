import React, { createContext, useState, useEffect } from "react";
import Api from "../utils/Api";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const api = new Api({
          baseUrl: "users/me",
          method: "GET",
          body: null,
          headers: {
            authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
            "Content-Type": "application/json",
          },
        });
        const userInfo = await api.profile();
        setCurrentUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
