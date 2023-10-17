import vector_edit_icon from "../images/editar.png";
import vector_add_icon from "../images/vector_add_icon.png";

function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="content-profile">
          <div className="profile-info">
            <div className="profile-image shimmer">
              <img
                alt="foto de perfil"
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
                <img alt="icono editar" src={vector_edit_icon} />
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
  );
}

export default Main;
