
import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userData, setuserData] = useState(() => {
    const storedData = localStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : null;
  });

  const updateuserdata = (newData) => {
    setuserData(newData);
    localStorage.setItem("user", JSON.stringify(newData));
  };
  return (
    <UserContext.Provider value={{ userData, updateuserdata }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
