import React from "react";
import { NavLink } from "react-router-dom";

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
          <NavLink className="menu__link" to="/">
            Главная
          </NavLink>
          <NavLink className="menu__link" to="/movies">
            Фильмы
          </NavLink>
          <NavLink className="menu__link" to="/savedMovies">
            Сохраненные фильмы
          </NavLink>
        </div>
        <div className="menu__acc">
          <NavLink className="menu__acc-button" type="button" to="/profile">
            Аккаунт
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Menu;
