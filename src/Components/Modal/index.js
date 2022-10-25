import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FaWindowClose } from "react-icons/fa";

function Modal({ onClose, DeleteCard, id }) {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modalBox">
        <FaWindowClose className="closeModal" size={30} onClick={onClose} />
        <p>آیا از پاک کردن این مخاطب اطمینان دارید؟</p>
        <div className="btnContainer">
          <button className="ModalBtn noBtn" onClick={onClose}>
            خیر
          </button>
          <button className="ModalBtn yesBtn" onClick={() => DeleteCard(id)}>
            بله
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
