import React, { createContext, useState, useEffect } from "react";
import api from "../utils/Api";

//const api = new Api();

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await api.get("users/me");
        setCurrentUser(user);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
