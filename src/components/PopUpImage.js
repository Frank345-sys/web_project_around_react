import vector_close_icon from "../images/vector_close_icon.png";
import React, { useEffect } from "react";

function PopUpImage({ isOpen, onClose, nameCard, imageUrlCard }) {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKeyPress);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`content-pop-up content-pop-up_image ${
        isOpen ? "content-pop-up_visibility_visible" : ""
      }`}
      onClick={handleOutsideClick}
    >
      <div className="pop-up-window">
        <button
          type="button"
          className="pop-up-window__button-close"
          onClick={onClose}
        >
          <img alt="icono cerrar pop-up image" src={vector_close_icon} />
        </button>
        <img
          src={imageUrlCard}
          alt={"Vista previa imagen de la card " + nameCard}
        />
        <h3>{nameCard}</h3>
      </div>
    </div>
  );
}

export default PopUpImage;
