import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { CurrentUserProvider } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [deletedCardId, setDeletedCardId] = useState(null);

  // LoadPageCards
  const [isLoadCards, setIsLoadCards] = useState(false);
  const [card, setCard] = useState([]);

  useEffect(() => {
    const getCards = new api({
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

  const handleFormEditSubmit = async (name, occupation) => {
    try {
      const setUser = new api({
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

      const result = await setUser.profile();

      if (result && result.name && result.about) {
        return result;
      } else {
        throw new Error("Error al obtener la información del usuario");
      }
    } catch (error) {
      console.error("Error al actualizar los datos del usuario: ", error);
      throw error;
    }
  };

  const handleFormCreateCardSubmit = async (name, imageUrl) => {
    try {
      const createCard = new api({
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

  const handleFormEditAvatarSubmit = async (url) => {
    try {
      const setUserPhoto = new api({
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

      const result = await setUserPhoto.profile();

      if (result && result.avatar) {
        return result;
      } else {
        throw new Error("Error al obtener la información del usuario");
      }
    } catch (error) {
      console.error("Error al actualizar la foto de perfil: ", error);
      throw error;
    }
  };

  //DeleteCard
  const handleCardDelete = async (cardId) => {
    try {
      const deleteCard = new api({
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

  //LikeCard
  const handlLikeCard = async (idCard) => {
    try {
      const likeCard = new api({
        baseUrl: `cards/likes/${idCard}`,
        method: "PUT",
        body: null,
        headers: {
          authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
          "Content-Type": "application/json",
        },
      });

      const result = await likeCard.card();

      if (result && result.likes) {
        return result;
      } else {
        throw new Error("Error al obtener la información del usuario");
      }
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
      throw error;
    }
  };

  //DisLikeCard
  const handlDisLikeCard = async (idCard) => {
    try {
      const deleteLikeCard = new api({
        baseUrl: `cards/likes/${idCard}`,
        method: "DELETE",
        body: null,
        headers: {
          authorization: "28d1f77b-3605-449f-bf16-20a5216f8fdb",
          "Content-Type": "application/json",
        },
      });

      const result = await deleteLikeCard.card();

      if (result && result.likes) {
        return result;
      } else {
        throw new Error("Error al obtener la información del usuario");
      }
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
      throw error;
    }
  };

  return (
    <div className="page">
      <Header />
      <CurrentUserProvider>
        <Main
          onEditProfile={handleFormEditSubmit}
          onEditAvatar={handleFormEditAvatarSubmit}
          onAddPlace={handleFormCreateCardSubmit}
          onDeleteCard={handleCardDelete}
          onLikeCard={handlLikeCard}
          onDisLikeCard={handlDisLikeCard}
          isLoadCards={isLoadCards}
          cards={card}
        />
      </CurrentUserProvider>
      <Footer />
    </div>
  );
}

export default App;
