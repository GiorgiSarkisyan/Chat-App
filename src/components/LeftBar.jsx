/* eslint-disable react/prop-types */
import { logout } from "../supabase/actions";

export default function LeftBar({ data }) {
  const guest = {
    image: "/avatar.png",
    name: "Guest",
  };

  const handleLogout = async () => {
    const { error } = await logout();

    if (error) {
      console.error("Could not log out:", error.message);
      return;
    }

    window.location.reload();
  };

  const user = data?.user || guest;

  return (
    <div className="w-96 h-full bg-[#202123] flex flex-col select-none">
      <div className="h-20 w-full bg-zinc-700 px-2 flex items-center gap-6 justify-start">
        <div className="h-14 w-14 relative">
          <img
            src={user.user_metadata?.avatar_url || guest.image}
            alt="avatar"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <span className="font-inter text-3xl text-white">
          {user.user_metadata?.name || guest.name}
        </span>
      </div>
      <button
        className="w-full h-10 bg-slate-600 mt-auto duration-300 transition-all text-white font-medium hover:bg-blue-500 hover:text-white"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}
