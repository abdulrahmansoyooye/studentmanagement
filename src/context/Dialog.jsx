/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogDisplay, setDialogDisplay] = useState(true);

  return (
    <DialogContext.Provider value={{ dialogDisplay, setDialogDisplay }}>
      {children}
    </DialogContext.Provider>
  );
};
export const useDialog = () => useContext(DialogContext);
