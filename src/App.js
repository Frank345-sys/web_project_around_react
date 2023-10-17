import vector_close_icon from "./images/vector_close_icon.png";
//import logo_header from "./images/logo/logo.png";
//import vector_edit_icon from "./images/editar.png";
//import vector_add_icon from "./images/vector_add_icon.png";
//import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="page">
      <div className="content-modal content-modal_edit">
        <div className="modal modal_edit">
          <h2 className="modal__title">Editar perfil</h2>
          <button
            type="button"
            className="modal__button-close modal__button-close_edit"
          >
            <img alt="icono close modal edit" src={vector_close_icon} />
          </button>
          <form className="modal-form modal-form_edit" novalidate>
            <fieldset className="modal-form__set">
              <input
                className="input input_name"
                id="input-name"
                type="text"
                name="name"
                placeholder="Ingrese el nombre"
                required
                minlength="2"
                maxlength="40"
                value="texto"
              />
              <span className="error error_input-name"></span>
              <input
                className="input input_ocupation"
                id="input-ocupation"
                type="text"
                name="ocupation"
                placeholder="Ingrese la ocupación"
                required
                minlength="2"
                maxlength="200"
                value="texto"
              />
              <span className="error error_input-ocupation"></span>
              <button className="button button_edit" type="submit">
                Guardar
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="content-modal content-modal_add">
        <div className="modal modal_add">
          <h2 className="modal__title">Nuevo lugar</h2>
          <button
            type="button"
            className="modal__button-close modal__button-close_add"
          >
            <img alt="icono cerrar modal add" src={vector_close_icon} />
          </button>
          <form className="modal-form modal-form_add" novalidate>
            <fieldset className="modal-form__set">
              <input
                className="input input_name-place"
                id="input-name-place"
                type="text"
                name="name-place"
                placeholder="Ingrese el nombre del lugar"
                required
                minlength="2"
                maxlength="30"
              />
              <span className="error error_input-name-place"></span>
              <input
                className="input input_url"
                id="input-url"
                type="url"
                name="url"
                placeholder="Ingrese la URL del lugar"
                required
              />
              <span className="error error_input-url"></span>
              <button className="button button_add" type="submit">
                Crear
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="content-modal content-modal_edit-photo">
        <div className="modal modal_edit-photo">
          <h2 className="modal__title">Cambiar foto de perfil</h2>
          <button
            type="button"
            className="modal__button-close modal__button-close_edit-photo"
          >
            <img alt="icono cerrar modal edit photo " src={vector_close_icon} />
          </button>
          <form className="modal-form modal-form_edit-photo" novalidate>
            <fieldset className="modal-form__set">
              <input
                className="input input_url-edit"
                id="input-url-edit"
                type="url"
                name="url"
                placeholder="Ingrese la URL de la foto"
                required
              />
              <span className="error error_input-url-edit"></span>
              <button className="button button_edit-photo" type="submit">
                Guardar
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="content-modal content-modal_delete-card">
        <div className="modal modal_delete-card">
          <h2 className="modal__title">¿Estás segudo/a?</h2>
          <button
            type="button"
            className="modal__button-close modal__button-close_delete-card"
          >
            <img alt="icono cerrar modal delete card" src={vector_close_icon} />
          </button>
          <form className="modal-form" novalidate>
            <fieldset className="modal-form__set">
              <button className="button button_delete-card" type="submit">
                Elimiar
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="content-pop-up content-pop-up_image">
        <div className="pop-up-window">
          <button type="button" className="pop-up-window__button-close">
            <img alt="icono cerrar pop-up image" src={vector_close_icon} />
          </button>
          <img src="." alt="Vista previa imagen de la card" />
          <h3></h3>
        </div>
      </div>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

/*
<header className="header">
        <div className="content-header">
          <img
            alt="Logo-header"
            src={logo_header}
            className="content-header__logo"
          />
        </div>
      </header>
      <main className="content">
        <section className="profile">
          <div className="content-profile">
            <div className="profile-info">
              <div className="profile-image shimmer">
                <img
                  alt="foto de perfil"
                  //src="<%= require('./images/profile.jpg')%>"
                  src="."
                  className="profile-image__image"
                />
                <div className="profile-image__edit-icon">
                  <img src={vector_edit_icon} alt="Editar" />
                </div>
              </div>
              <div className="content-prof-info-text">
                <h2 className="content-prof-info-text__name shimmer"></h2>
                <button
                  type="button"
                  className="content-prof-info-text__edit-button"
                >
                  <img
                    alt="icono editar"
                    //src="<%= require('./images/vector_pencil_icon.png')%>"
                    src={vector_edit_icon}
                  />
                </button>
                <h3 className="content-prof-info-text__ocupation shimmer"></h3>
              </div>
            </div>
            <button type="button" className="content-profile__add-button">
              <img alt="icono agregar" src={vector_add_icon} />
            </button>
          </div>
        </section>
        <section className="photos-grid">
          <div className="content-photos shimmer"></div>
        </section>
      </main>
      <footer className="footer">
        <div className="content-footer">
          <p className="content-footer__copyright">
            © 2021 Alrededor de los EEUU
          </p>
        </div>
      </footer>
*/

/*
<div classNameName="App">
      <header classNameName="App-header">
        <img src={logo} classNameName="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          classNameName="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/

export default App;
