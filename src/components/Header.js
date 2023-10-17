import logo_header from "../images/logo/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="content-header">
        <img
          alt="Logo-header"
          src={logo_header}
          className="content-header__logo"
        />
      </div>
    </header>
  );
}

export default Header;
