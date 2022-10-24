import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="nFound">
      <div className="nFound__box">
        <h2 className="nFound__title">404</h2>
        <p className="nFound__text">Страница не найдена</p>
        <Link to={-1} className="nFound__button">
          Назад
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
