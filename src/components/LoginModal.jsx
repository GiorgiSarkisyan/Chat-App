// import { useContext, useState } from "react";
// import { signIn } from "../supabase/actions.js";
// import { BiX } from "react-icons/bi";
// import { ModalContext } from "../context/ModalContext";

// export default function LoginModal() {

//   return (
//     <div className="transition-all duration-300 absolute left-1/2 bottom-1/2 transform  translate-y-1/2 w-96 h-auto bg-slate-800 rounded-lg shadow-lg p-6">
//       <BiX
//         className="absolute right-2 w-12 h-12 top-0 text-white cursor-pointer"
//         onClick={() => setLoginModal(false)}
//       />
//       <form
//         className="w-full flex flex-col items-center gap-4"
//         onSubmit={handleSubmit}
//       >
//         {error && <p className="text-red-500">{error}</p>}
//         <div className="flex w-full flex-col">
//           <label className="text-white mb-1 font-inter">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="flex w-full flex-col">
//           <label className="text-white mb-1 font-inter">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-slate-700 w-40 h-10 text-white font-inter"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
