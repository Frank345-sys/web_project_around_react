import React, { useState, useContext } from "react";
import vector_delete_icon from "../images/vector_delete_icon.png";

import api from "../utils/api";
import ImagePopup from "../components/ImagePopup";
import PopupWithForm from "../components/PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ name, link, idCard, likes, user, onDelete }) {
  //context
  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(
    likes.some((element) => element._id === (currentUser && currentUser._id))
  );

  const [countLikes, setCountLikes] = useState(likes.length);
  const [status, setStatus] = useState(false);

  //OpenModalDeleteCard
  const [isOpenModalDeleteCard, setIsOpenModalDeleteCard] = useState(false);

  const openModalDeleteCard = () => {
    setIsOpenModalDeleteCard(true);
  };

  const closeModalDeleteCard = () => {
    setIsOpenModalDeleteCard(false);
  };

  //OpenModalImage
  const [isOpenPopUpImage, setIsOpenPopUpImage] = useState(false);

  const openPopUpImage = () => {
    setIsOpenPopUpImage(true);
  };

  const closePopUpImage = () => {
    setIsOpenPopUpImage(false);
  };

  const handleConfirmDelete = async () => {
    setStatus(true);
    try {
      closeModalDeleteCard();
      await onDelete(idCard);
      setStatus(false);
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  };

  const handleLikeClick = () => {
    if (isLiked === false) {
      const likeCard = new api({
        baseUrl: `cards/likes/${idCard}`,
        method: "PUT",
        body: null,
        headers: {
          authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
          "Content-Type": "application/json",
        },
      });
      likeCard
        .card()
        .then((result) => {
          setCountLikes(result.likes.length);
          setIsLiked(isLiked ? false : true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isLiked === true) {
      const deleteLikeCard = new api({
        baseUrl: `cards/likes/${idCard}`,
        method: "DELETE",
        body: null,
        headers: {
          authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
          "Content-Type": "application/json",
        },
      });
      deleteLikeCard
        .card()
        .then((result) => {
          setCountLikes(result.likes.length);
          setIsLiked(isLiked ? false : true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <article className="card">
        <button
          type="button"
          className={`card__button-delete ${
            (currentUser && currentUser._id) === user._id
              ? ""
              : "card__button-delete_visibility_visible"
          }`}
          onClick={openModalDeleteCard}
        >
          <img alt="icono borrar" src={vector_delete_icon} />
        </button>
        <img
          alt={"Imagen ilustrativa del usuario " + user.name}
          src={user.avatar}
          className="card__photo-item-user"
        />
        <img
          alt={"Imagen ilustrativa de " + name}
          src={link}
          className="card__photo-item"
          onClick={openPopUpImage}
        />
        <div className="content-footer-card">
          <h2 className="content-footer-card__title">{name}</h2>
          <button
            type="button"
            className="heart-button"
            onClick={handleLikeClick}
          >
            <span
              className={`heart-button__icon ${
                isLiked ? "heart-button__icon_liked" : ""
              }`}
            >
              ❤️
            </span>
          </button>
          <span className="content-footer-card__likes">{countLikes}</span>
        </div>
      </article>

      <ImagePopup
        isOpen={isOpenPopUpImage}
        onClose={closePopUpImage}
        nameCard={name}
        imageUrlCard={link}
      ></ImagePopup>

      <PopupWithForm
        isOpen={isOpenModalDeleteCard}
        onClose={closeModalDeleteCard}
      >
        <h2 className="modal__title">¿Estás segudo/a?</h2>
        <form
          className="modal-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmDelete();
          }}
        >
          <fieldset className="modal-form__set">
            <button className="button button_delete-card" type="submit">
              {status ? "Eliminando..." : "Elimiar"}
            </button>
          </fieldset>
        </form>
      </PopupWithForm>
    </div>
  );
}

export default Card;
