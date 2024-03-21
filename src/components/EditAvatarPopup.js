import React, { useEffect, useState, useRef } from "react";
import vector_close_icon from "../images/vector_close_icon.png";

function EditAvatarPopup({
  onAvatarUser,
  isOpen,
  onClose,
  formEditAvatarSubmit,
}) {
  const inputUrlAvatarRef = useRef(null);
  const [statusEditPhoto, setStatusEditPhoto] = useState(false);
  const [errorUrlAvatar, setErrorUrlAvatar] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [urlAvatar, setUrlAvatar] = useState("");

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

  const handleAvatarChange = (e) => {
    setErrorUrlAvatar(!inputUrlAvatarRef.current.validity.valid);
    setIsSubmitButtonDisabled(!inputUrlAvatarRef.current.validity.valid);
    setUrlAvatar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusEditPhoto(true);
    try {
      await formEditAvatarSubmit(urlAvatar).then((result) => {
        onAvatarUser(result.avatar);
        setStatusEditPhoto(false);
        onClose();
      });
    } catch (error) {
      console.error("Error al actualizar foto de perfil:", error);
    }
  };

  return (
    <div
      className={`content-modal ${
        isOpen ? "content-modal_visibility_visible" : ""
      }`}
      onClick={handleOutsideClick}
    >
      <div className="modal">
        <button onClick={onClose} type="button" className="modal__button-close">
          <img alt="icono cerrar modal" src={vector_close_icon} />
        </button>
        <h2 className="modal__title">Cambiar foto de perfil</h2>
        <form
          className="modal-form modal-form_edit-photo"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="modal-form__set">
            <input
              className={`input input_url-edit ${
                errorUrlAvatar ? "input_error-active" : ""
              }`}
              id="input-url-edit"
              type="url"
              name="url"
              placeholder="Ingrese la URL de la foto"
              required
              ref={inputUrlAvatarRef}
              onChange={handleAvatarChange}
            />
            <span
              className={`error error_input-url-edit ${
                errorUrlAvatar ? "input_error-active" : ""
              }`}
            >
              {inputUrlAvatarRef.current &&
                inputUrlAvatarRef.current.validationMessage}
            </span>
            <button
              className={`button button_edit-photo ${
                isSubmitButtonDisabled ? "button_inactive" : ""
              }`}
              type="submit"
              disabled={isSubmitButtonDisabled}
            >
              {statusEditPhoto ? "Guardando..." : "Guardar"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default EditAvatarPopup;
