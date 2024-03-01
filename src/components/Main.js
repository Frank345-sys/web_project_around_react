import React, { useState, useEffect, useContext } from "react";
import vector_edit_icon from "../images/editar.png";
import vector_add_icon from "../images/vector_add_icon.png";

import EditProfilePopup from "../components/EditProfilePopup";

import AddPlacePopup from "../components/AddPlacePopup";

import EditAvatarPopup from "../components/EditAvatarPopup";

import Card from "../components/Card";

import { Api } from "../utils/Api";

import ApiContext from "../contexts/CurrentUserContext";

function Main() {
  //context
  const currentUser = useContext(ApiContext);

  const [deletedCardId, setDeletedCardId] = useState(null);

  // LoadPageInfoUser
  const [isLoadInfoUser, setIsLoadInfoUser] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  // LoadPageCards
  const [isLoadCards, setIsLoadCards] = useState(false);
  const [card, setCard] = useState([]);

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

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
      setAvatar(currentUser.avatar);
      setIsLoadInfoUser(true);
    }
  }, [currentUser]);

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
  /*
  useEffect(() => {
    const getUser = new Api({
      baseUrl: "users/me",
      method: "GET",
      body: null,
      headers: {
        authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
        "Content-Type": "application/json",
      },
    });
    getUser
      .profile()
      .then((result) => {
        setName(result.name);
        setAbout(result.about);
        setAvatar(result.avatar);
        setIsLoadInfoUser(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  */
  /*
        <PopupWithForm isOpen={isEditModalOpen} onClose={closeEditModal}>
        <h2 className="modal__title">Editar perfil</h2>
        <form
          className="modal-form modal-form_edit"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleFormEditSubmit(name, about);
          }}
        >
          <fieldset className="modal-form__set">
            <input
              className="input input_name"
              id="input-name"
              type="text"
              name="name"
              placeholder="Ingrese el nombre"
              required
              minLength="2"
              maxLength="40"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="error error_input-name"></span>
            <input
              className="input input_occupation"
              id="input-occupation"
              type="text"
              name="occupation"
              placeholder="Ingrese la ocupación"
              required
              minLength="2"
              maxLength="200"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <span className="error error_input-occupation"></span>
            <button className="button button_edit" type="submit">
              {statusEdit ? "Guardando..." : "Guardar"}
            </button>
          </fieldset>
        </form>
      </PopupWithForm>


      <PopupWithForm
        isOpen={isCreateCardModalOpen}
        onClose={closeCreateCardModal}
      >
        <h2 className="modal__title">Nuevo lugar</h2>
        <form
          className="modal-form modal-form_add"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleFormCreateCardSubmit(namePlace, imageUrl);
          }}
        >
          <fieldset className="modal-form__set">
            <input
              className="input input_name-place"
              id="input-name-place"
              type="text"
              name="name-place"
              placeholder="Ingrese el nombre del lugar"
              required
              minLength="2"
              maxLength="30"
              onChange={(e) => setNamePlace(e.target.value)}
            />
            <span className="error error_input-name-place"></span>
            <input
              className="input input_url"
              id="input-url"
              type="url"
              name="url"
              placeholder="Ingrese la URL del lugar"
              required
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <span className="error error_input-url"></span>
            <button className="button button_add" type="submit">
              {statusCreateCard ? "Creando..." : "Crear"}
            </button>
          </fieldset>
        </form>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditPhotoModalOpen}
        onClose={closeEditPhotoModal}
      >
        <h2 className="modal__title">Cambiar foto de perfil</h2>
        <form
          className="modal-form modal-form_edit-photo"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleFormEditPhotoSubmit(newAvatar);
          }}
        >
          <fieldset className="modal-form__set">
            <input
              className="input input_url-edit"
              id="input-url-edit"
              type="url"
              name="url"
              placeholder="Ingrese la URL de la foto"
              required
              onChange={handleAvatarChange}
            />
            <span className="error error_input-url-edit"></span>
            <button className="button button_edit-photo" type="submit">
              {statusEditPhoto ? "Guardando..." : "Guardar"}
            </button>
          </fieldset>
        </form>
      </PopupWithForm>
   */

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
