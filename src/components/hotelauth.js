import React, { useEffect, useState } from "react";
import app from "./config/hotelfirebase";

export const Authcontext = React.createContext();

export const HotelAuthprovider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
      app.auth().onAuthStateChanged(setCurrentUser);
  },[]);

  return (
    <Authcontext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};