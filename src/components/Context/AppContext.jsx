import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function MyContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("token") !== null
      ? localStorage.getItem("token")
      : null
  );
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AppContext.Provider>
  );
}
