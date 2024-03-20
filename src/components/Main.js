import React, { useState, useEffect, useContext } from "react";
import vector_edit_icon from "../images/editar.png";
import vector_add_icon from "../images/vector_add_icon.png";

import EditProfilePopup from "../components/EditProfilePopup";
import AddPlacePopup from "../components/AddPlacePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import Card from "../components/Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

//import api from "../utils/api";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onDeleteCard,
  onLikeCard,
  onDisLikeCard,
  isLoadCards,
  cards,
}) {
  //context
  const currentUser = useContext(CurrentUserContext);

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

  // EditModal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // CreateCardModal
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);

  const openCreateCardModal = () => {
    setIsCreateCardModalOpen(true);
  };

  const closeCreateCardModal = () => {
    setIsCreateCardModalOpen(false);
  };

  //EditPhotoModal
  const [isEditPhotoModalOpen, setIsEditPhotoModalOpen] = useState(false);

  const openEditPhotoModal = () => {
    setIsEditPhotoModalOpen(true);
  };

  const closeEditPhotoModal = () => {
    setIsEditPhotoModalOpen(false);
  };

  return (
    <div>
      <EditProfilePopup
        nameUser={name}
        onNameUser={setName}
        aboutUser={about}
        onAboutUser={setAbout}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        formEditSubmit={onEditProfile}
      ></EditProfilePopup>

      <AddPlacePopup
        isOpen={isCreateCardModalOpen}
        onClose={closeCreateCardModal}
        formAddSubmit={onAddPlace}
      ></AddPlacePopup>

      <EditAvatarPopup
        onAvatarUser={setAvatar}
        isOpen={isEditPhotoModalOpen}
        onClose={closeEditPhotoModal}
        formEditAvatarSubmit={onEditAvatar}
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
            {cards.map((item) => (
              <Card
                key={item._id}
                name={item.name}
                link={item.link}
                idCard={item._id}
                likes={item.likes}
                user={item.owner}
                onDelete={() => onDeleteCard(item._id)}
                onLike={onLikeCard}
                onDisLike={onDisLikeCard}
              ></Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main;
