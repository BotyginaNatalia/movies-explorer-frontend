import { useState } from "react";
import logo from "../../images/header-logo.svg";
import Menu from "../Menu/Menu";

import { Link } from "react-router-dom";

function HeaderMovie() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(true);

  const burgerMenuOpen = () => {
    setIsBurgerMenuOpen(false);
  };

  const burgerMenuClose = () => {
    setIsBurgerMenuOpen(true);
  };

  return (
    <header className="headerMovie">
      <div className="headerMovie__box">
        <Link to="/">
          <img src={logo} className="headerMovie__logo" alt="логотип" />
        </Link>
        {isBurgerMenuOpen ? (
          <div className="headerMovie__burger" onClick={burgerMenuOpen}></div>
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
        <Link className="headerMovie__acc-button" type="button" to="/profile">
          Аккаунт
        </Link>
      </div>
    </header>
  );
}

export default HeaderMovie;
