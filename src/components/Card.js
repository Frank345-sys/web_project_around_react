import React, { useState, useContext, useEffect } from "react";
import vector_delete_icon from "../images/vector_delete_icon.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  name,
  link,
  idCard,
  likes,
  user,
  onLike,
  onDisLike,
  onOpenPopUpImage,
  onOpenModalDeleteCard,
}) {
  //context
  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(false);

  const [countLikes, setCountLikes] = useState(0);

  useEffect(() => {
    setIsLiked(
      likes.some((element) => element._id === (currentUser && currentUser._id))
    );
    setCountLikes(likes.length);
  }, []);

  const handleOpenPopUpImageClick = () => {
    onOpenPopUpImage(name, link);
  };

  const handleOpenModalDeleteCard = () => {
    onOpenModalDeleteCard(idCard);
  };

  const handleLikeClick = async () => {
    if (isLiked === false) {
      try {
        await onLike(idCard).then((result) => {
          setCountLikes(result.likes.length);
          setIsLiked(isLiked ? false : true);
        });
      } catch (error) {
        console.error("Error al dar like a la tarjeta:", error);
      }
    } else if (isLiked === true) {
      try {
        await onDisLike(idCard).then((result) => {
          setCountLikes(result.likes.length);
          setIsLiked(isLiked ? false : true);
        });
      } catch (error) {
        console.error("Error al dar Dislike a la tarjeta:", error);
      }
    }
  };

  return (
    <>
      <article className="card">
        <button
          type="button"
          className={`card__button-delete ${
            (currentUser && currentUser._id) === user._id
              ? ""
              : "card__button-delete_visibility_visible"
          }`}
          onClick={handleOpenModalDeleteCard}
        >
          <img alt="icono borrar" src={vector_delete_icon} />
        </button>

        <img
          alt={"Imagen ilustrativa del usuario " + user.name}
          src={user.avatar}
          className="card__photo-item-user"
        />
        <div className="card__photo-item">
          <img
            alt={"Imagen ilustrativa de " + name}
            src={link}
            onClick={handleOpenPopUpImageClick}
          />
        </div>
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
    </>
  );
}

export default Card;
