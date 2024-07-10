/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
const sessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(() => {
    const storedData = sessionStorage.getItem("token");
    return storedData ? JSON.parse(storedData) : null;
  });
  const updateSessionData = (newData) => {
    setSessionData(newData);
    sessionStorage.setItem("session", JSON.stringify(newData));
  };
  const logout = () => {
    sessionStorage.removeItem("session");
  };
  return (
    <sessionContext.Provider value={{ sessionData, updateSessionData, logout }}>
      {children}
    </sessionContext.Provider>
  );
};

export const useSession = () => useContext(sessionContext);
