import LeftBar from "../components/LeftBar";
import Main from "../components/Main";

export default function Home() {
  return (
    <div className="h-dvh bg-[#343541] w-full grid grid-cols-[380px_1fr]">
      <LeftBar />
      <Main />
    </div>
  );
}
