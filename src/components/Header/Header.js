import React from "react";
import logo from "../../images/header-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Menu from "../Menu/Menu";

function Header({ isLoggingIn }) {
  const location = useLocation();

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(true);

  const burgerMenuOpen = () => {
    setIsBurgerMenuOpen(false);
  };

  const burgerMenuClose = () => {
    setIsBurgerMenuOpen(true);
  };

  return (
    <>
      {location.pathname === "/" && isLoggingIn === false ? (
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
      ) : (
        <></>
      )}

      {(location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/savedMovies" ||
        location.pathname === "/profile") &&
        isLoggingIn === true ? (
        <header className="headerMovie headerMovie_loggingIn">
          <div className="headerMovie__box">
            <Link to="/">
              <img src={logo} className="headerMovie__logo" alt="логотип" />
            </Link>
            {isBurgerMenuOpen ? (
              <div
                className="headerMovie__burger"
                onClick={burgerMenuOpen}
              ></div>
            ) : (
              <Menu menuClose={burgerMenuClose} />
            )}
            <div className="headerMovie__links">
              <Link className="headerMovie__link" to="/movies">
                Фильмы
              </Link>
              <Link className="headerMovie__link" to="/savedMovies">
                Сохраненные фильмы
              </Link>
            </div>
            <Link
              className="headerMovie__acc-button"
              type="button"
              to="/profile"
            >
              Аккаунт
            </Link>
          </div>
        </header>
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;
