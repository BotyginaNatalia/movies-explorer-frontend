import React from "react";
import { Link } from "react-router-dom";

function Menu({ menuClose }) {
  return (
    <section className="menu">
      <div className="menu__box">
        <button
          className="menu__close-button"
          aria-label="Закрыть"
          onClick={menuClose}
        ></button>
        <div className="menu__links">
          <Link className="menu__link" to="/">
            Главная
          </Link>
          <Link className="menu__link" to="/movies">
            Фильмы
          </Link>
          <Link className="menu__link" to="/savedMovies">
            Сохраненные фильмы
          </Link>
        </div>
        <div className="menu__acc">
          <Link className="menu__acc-button" type="button" to="/profile">
            Аккаунт
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Menu;
