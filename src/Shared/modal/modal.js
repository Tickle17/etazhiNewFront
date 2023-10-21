import React from "react";
import "./style.css";

const Modal = ({ contentModal, closeContentModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeContentModal}>
          &times;
        </span>
        <div>{contentModal}</div>
      </div>
    </div>
  );
};

export default Modal;
