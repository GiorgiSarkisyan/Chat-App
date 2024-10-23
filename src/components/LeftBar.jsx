import { useContext } from "react";
import { logout } from "../supabase/actions";
import { UserContext } from "../context/UserContext";
import { ModalContext } from "../context/ModalContext";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

export default function LeftBar() {
  const [data] = useContext(UserContext);
  const { modal, setModal, loginModal, setLoginModal } =
    useContext(ModalContext);

  const handleRegisterModal = () => {
    setModal((p) => !p);
  };

  const handleLoginModal = () => {
    setLoginModal((p) => !p);
  };

  const handleLogout = async () => {
    const { error } = await logout();

    if (error) {
      console.error("Could not log out:", error.message);
      return;
    }

    window.location.reload();
  };

  const guest = {
    image: "/avatar.png",
    name: "Guest",
  };

  const user = data?.user || guest;

  console.log(user);

  return (
    <div className="w-96 h-full bg-[#202123] flex flex-col">
      <div className="h-20 w-full bg-zinc-700 px-2 flex items-center gap-6 justify-start">
        <div className="h-14 w-14 relative ">
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

      {user === guest ? (
        <div className="mt-auto">
          <button
            className="w-full h-10 bg-slate-600 duration-300 transition-all text-white font-medium hover:bg-blue-500 hover:text-white"
            onClick={handleRegisterModal}
          >
            Register
          </button>
          <button
            className="w-full h-10 bg-slate-600  duration-300 transition-all text-white font-medium hover:bg-blue-500 hover:text-white"
            onClick={handleLoginModal}
          >
            Log in
          </button>
        </div>
      ) : (
        <button
          className="w-full h-10 bg-slate-600 mt-auto duration-300 transition-all text-white font-medium hover:bg-blue-500 hover:text-white"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
      {modal && <RegisterModal />}
      {loginModal && <LoginModal />}
    </div>
  );
}
