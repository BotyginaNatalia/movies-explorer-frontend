import React from "react";
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
    <div className="nFound">
      <div className="nFound__box">
        <h2 className="nFound__title">404</h2>
        <p className="nFound__text">Страница не найдена</p>
        <a href="/movies" onClick={() => navigate(-1)} className="nFound__button">Назад</a>       
      </div>
    </div>
    </>
  );
}

export default NotFound;
