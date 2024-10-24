import { useState } from "react";
import Login from "./pageComps/Login";
import SignUp from "./pageComps/SignUp";

export default function AuthComp() {
  const [auth, setAuth] = useState(false);
  return (
    <main className="h-dvh w-full bg-[#343541] flex items-center justify-center">
      {auth ? <SignUp setState={setAuth} /> : <Login setState={setAuth} />}
    </main>
  );
}
