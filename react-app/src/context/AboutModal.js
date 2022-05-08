import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./AboutModal.css";

const AboutModalContext = React.createContext();

export function AboutModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <AboutModalContext.Provider value={value}>{children}</AboutModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function AboutModal({ onClose, children }) {
  const modalNode = useContext(AboutModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal2">
      <div id="modal2-background" onClick={onClose} />
      <div id="modal2-content">{children}</div>
    </div>,
    modalNode
  );
}
