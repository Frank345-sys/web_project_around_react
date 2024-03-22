import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { CurrentUserProvider } from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  const [deletedCardId, setDeletedCardId] = useState(null);

  // LoadPageCards
  const [isLoadCards, setIsLoadCards] = useState(false);
  const [card, setCard] = useState([]);

  useEffect(() => {
    api
      .get("cards")
      .then((result) => {
        setCard([...result]);
        setIsLoadCards(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deletedCardId]);

  //EditInfoUser
  const handleFormEditSubmit = async (name, occupation) => {
    try {
      const result = await api.patch("users/me", {
        name: name,
        about: occupation,
      });
      return result;
    } catch (error) {
      console.error("Error al actualizar los datos del usuario: ", error);
      throw error;
    }
  };

  //CreateCard
  const handleFormCreateCardSubmit = async (name, imageUrl) => {
    try {
      api
        .post("cards", {
          name: name,
          link: imageUrl,
        })
        .then((result) => {
          setCard((prevCard) => [result, ...prevCard]);
        });
    } catch (error) {
      console.error("Error al crear la card: ", error);
      throw error;
    }
  };

  //ChangeAvatarImage
  const handleFormEditAvatarSubmit = async (url) => {
    try {
      const result = await api.patch("users/me/avatar", {
        avatar: url,
      });
      return result;
    } catch (error) {
      console.error(
        "Error al actualizar la foto de perfil del usuario: ",
        error
      );
      throw error;
    }
  };

  //DeleteCard
  const handleCardDelete = async (cardId) => {
    try {
      api.delete(`cards/${cardId}`).then(() => {
        setCard((prevCard) =>
          prevCard.filter((cardItem) => cardItem.id !== cardId)
        );
        setDeletedCardId(cardId);
      });
    } catch (error) {
      console.error("Error al eliminar la tarjeta del usuario: ", error);
      throw error;
    }
  };

  //LikeCard
  const handlLikeCard = async (idCard) => {
    try {
      const result = await api.put(`cards/likes/${idCard}`);
      return result;
    } catch (error) {
      console.error("Error al dar like a la tarjeta: ", error);
      throw error;
    }
  };

  //DisLikeCard
  const handlDisLikeCard = async (idCard) => {
    try {
      const result = await api.delete(`cards/likes/${idCard}`);
      return result;
    } catch (error) {
      console.error("Error al dar dislike a la tarjeta: ", error);
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
