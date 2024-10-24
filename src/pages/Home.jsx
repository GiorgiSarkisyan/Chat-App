import { useEffect, useState } from "react";
import LeftBar from "../components/LeftBar";
import Main from "../components/Main";
import Spinner from "../components/Spinner";
import supabase from "../supabase/supabase";

export default function Home() {
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
        console.log("Session data:", sessionData.session);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="h-dvh bg-[#343541] w-full grid grid-cols-[380px_1fr] relative">
      {!data ? (
        <Spinner />
      ) : (
        <>
          <LeftBar data={data} setData={setData} />
          <Main data={data} setData={setData} />
        </>
      )}
    </div>
  );
}
