/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import supabase from "../supabase/supabase";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session data:", session);
      if (session && session.user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!authenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
}
