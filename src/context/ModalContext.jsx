/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{ modal, setModal, loginModal, setLoginModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
