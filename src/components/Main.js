import React, { useState, useEffect, useContext } from "react";
import vector_edit_icon from "../images/editar.png";
import vector_add_icon from "../images/vector_add_icon.png";

import EditProfilePopup from "../components/EditProfilePopup";
import AddPlacePopup from "../components/AddPlacePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import Card from "../components/Card";
import Api from "../utils/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main() {
  //context
  const currentUser = useContext(CurrentUserContext);

  const [deletedCardId, setDeletedCardId] = useState(null);

  // LoadPageInfoUser
  const [isLoadInfoUser, setIsLoadInfoUser] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
      setAvatar(currentUser.avatar);
      setIsLoadInfoUser(true);
    }
  }, [currentUser]);

  // LoadPageCards
  const [isLoadCards, setIsLoadCards] = useState(false);
  const [card, setCard] = useState([]);

  useEffect(() => {
    const getCards = new Api({
      baseUrl: "cards",
      method: "GET",
      body: null,
      headers: {
        authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
        "Content-Type": "application/json",
      },
    });
    getCards
      .card()
      .then((result) => {
        setCard([...result]);
        setIsLoadCards(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deletedCardId]);

  // EditModal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleFormEditSubmit = async (name, occupation) => {
    try {
      const setUser = new Api({
        baseUrl: "users/me",
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          about: occupation,
        }),
        headers: {
          authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
          "Content-Type": "application/json",
        },
      });
      await setUser.profile().then((result) => {
        setName(result.name);
        setAbout(result.about);
      });
      return "Tarjeta eliminada correctamente";
    } catch (error) {
      console.error("Error al actualizar los datos del usuario: ", error);
      throw error;
    }
  };

  // CreateCardModal
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);

  const openCreateCardModal = () => {
    setIsCreateCardModalOpen(true);
  };

  const closeCreateCardModal = () => {
    setIsCreateCardModalOpen(false);
  };

  const handleFormCreateCardSubmit = async (name, imageUrl) => {
    try {
      const createCard = new Api({
        baseUrl: "cards",
        method: "POST",
        body: JSON.stringify({
          name: name,
          link: imageUrl,
        }),
        headers: {
          authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
          "Content-Type": "application/json",
        },
      });
      await createCard.card().then((result) => {
        setCard((prevCard) => [result, ...prevCard]);
      });
      return "Tarjeta eliminada correctamente";
    } catch (error) {
      console.error("Error al crear la tarjeta: ", error);
      throw error;
    }
  };

  //EditPhotoModal
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);

  const openEditPhotoModal = () => {
    setIsEditPhotoModalOpen(true);
  };

  const closeEditPhotoModal = () => {
    setIsEditPhotoModalOpen(false);
  };

  const handleFormEditAvatarSubmit = async (url) => {
    //setStatusEditPhoto(true);
    try {
      const setUserPhoto = new Api({
        baseUrl: `users/me/avatar`,
        method: "PATCH",
        body: JSON.stringify({
          avatar: url,
        }),
        headers: {
          authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
          "Content-Type": "application/json",
        },
      });
      await setUserPhoto.profile().then((result) => {
        setAvatar(result.avatar);
      });
      return "Foto de perfil actualizada Correctamente";
    } catch (error) {
      console.error("Error al actualizar la foto de perfil: ", error);
      throw error;
    }
  };

  //DeleteCard

  const handleCardDelete = async (cardId) => {
    try {
      const deleteCard = new Api({
        baseUrl: `cards/${cardId}`,
        method: "DELETE",
        body: null,
        headers: {
          authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
          "Content-Type": "application/json",
        },
      });

      await deleteCard.card().then(() => {
        setCard((prevCard) =>
          prevCard.filter((cardItem) => cardItem.id !== cardId)
        );
        setDeletedCardId(cardId);
      });

      return "Tarjeta eliminada correctamente";
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
      throw error;
    }
  };

  return (
    <div>
      <EditProfilePopup
        nameUser={name}
        aboutUser={about}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        formEditSubmit={handleFormEditSubmit}
      ></EditProfilePopup>

      <AddPlacePopup
        isOpen={isCreateCardModalOpen}
        onClose={closeCreateCardModal}
        formAddSubmit={handleFormCreateCardSubmit}
      ></AddPlacePopup>

      <EditAvatarPopup
        isOpen={isEditPhotoModalOpen}
        onClose={closeEditPhotoModal}
        formEditAvatarSubmit={handleFormEditAvatarSubmit}
      ></EditAvatarPopup>

      <main className="content">
        <section className="profile">
          <div className="content-profile">
            <div className="profile-info">
              <div
                className={`profile-image ${isLoadInfoUser ? "" : "shimmer"}`}
              >
                <img
                  alt={`${isLoadInfoUser ? "mi foto de perfil " + name : ""}`}
                  src={avatar}
                  className="profile-image__image"
                />
                <div
                  className="profile-image__edit-icon"
                  onClick={openEditPhotoModal}
                >
                  <img src={vector_edit_icon} alt="Editar" />
                </div>
              </div>
              <div className="content-prof-info-text">
                <h2
                  className={`content-prof-info-text__name ${
                    isLoadInfoUser ? "" : "shimmer"
                  }`}
                >
                  {name}
                </h2>
                <button
                  type="button"
                  className="content-prof-info-text__edit-button"
                  onClick={openEditModal}
                >
                  <img alt="icono editar" src={vector_edit_icon} />
                </button>
                <h3
                  className={`content-prof-info-text__ocupation ${
                    isLoadInfoUser ? "" : "shimmer"
                  }`}
                >
                  {about}
                </h3>
              </div>
            </div>
            <button
              type="button"
              className="content-profile__add-button"
              onClick={openCreateCardModal}
            >
              <img alt="icono agregar" src={vector_add_icon} />
            </button>
          </div>
        </section>
        <section className="photos-grid">
          <div className={`content-photos ${isLoadCards ? "" : "shimmer"}`}>
            {card.map((item) => (
              <Card
                key={item._id}
                name={item.name}
                link={item.link}
                idCard={item._id}
                likes={item.likes}
                user={item.owner}
                onDelete={() => handleCardDelete(item._id)}
              ></Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main;
