/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import supabase from "../supabase/supabase";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        return;
      }

      if (sessionData.session) {
        setData(sessionData.session);
      }
    };

    getUserData();
  }, []);

  return (
    <UserContext.Provider value={[data, setData]}>
      {children}
    </UserContext.Provider>
  );
};
