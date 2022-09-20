import React from "react";
import logo from "../../images/header-logo.svg";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__box">
        <Link to="/">
          <img src={logo} className="header__logo" alt="логотип" />
        </Link>
        <div className="header__nav">
          <Link className="header__nav_reg-button" to="/sign-up">
            Регистрация
          </Link>
          <Link className="header__nav_button" type="button" to="/sign-in">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
