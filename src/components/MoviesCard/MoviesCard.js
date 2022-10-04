import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const location = useLocation();

  const favouriteMovies = props.savedMovies?.some(
    (i) => i.movieId === props.movie.id
  );

  function handleSaveButtonClick() {
    props.onSaveButtonClick(props.movie);
  }

  function handleDeleteButtonClick() {
    props.onDeleteButtonClick(props.movie);
  }

  return (
    <div className="movieCard">
      <div className="movieCard__box">
        <a href={props.movie.trailerLink} rel="noreferrer" target="_blank">
          <img
            className="movieCard__pic"
            src={
              location.pathname === "/movies"
                ? `https://api.nomoreparties.co/${props.movie.image.url}`
                : props.movie.image
            }
            alt="moviePic"
          />
        </a>
        <div className="movieCard__about">
          <div className="movieCard__info">
            <p className="movieCard__title">{props.movie.nameRU}</p>
            <p className="movieCard__timeline">{`${Math.floor(
              props.movie.duration / 60
            )}ч ${props.movie.duration % 60}м`}</p>
          </div>
          {location.pathname === "/savedMovies" && (
            <button
              className="movieCard__delete-button"
              onClick={handleDeleteButtonClick}
              type="button"
            ></button>
          )}

          {location.pathname === "/movies" && (
            <button
              className={`movieCard__add-button ${
                favouriteMovies && "moviesCard__add-button_active"
              }`}
              onClick={handleSaveButtonClick}
              type="button"
            ></button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviesCard;
