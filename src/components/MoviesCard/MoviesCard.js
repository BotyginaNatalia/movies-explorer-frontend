import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({ movie, onDeleteButtonClick, onSaveButtonClick, }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  function handleSaveButtonClick() {
    onSaveButtonClick(movie)
  }

  function handleDeleteButtonClick() {
    onDeleteButtonClick(movie)
  }

  const isOwn = movie.owner === currentUser._id;
  const deleteButtonClassName = `movieCard__delete-button ${
    isOwn ? "movieCard__delete-button" : "movieCard__delete-button"
  }`;

  const isSaved = movie.savedMovies?.some(i => i.movieId === movie.id);
  const saveButtonClassName = `movieCard__add-button ${
    isSaved ? "movieCard__add-button_active" : "movieCard__add-button"
  }`;

  return (
    <div className="movieCard">
      <div className="movieCard__box">
        <a href={movie.trailerLink} rel="noreferrer" target="_blank">
          <img
            className="movieCard__pic"
            src={
              location.pathname === "/movies"
                ? `https://api.nomoreparties.co/${movie.image.url}`
                : movie.image
            }
            alt="moviePic"
          />
        </a>
        <div className="movieCard__about">
          <div className="movieCard__info">
            <p className="movieCard__title">{movie.nameRU}</p>
            <p className="movieCard__timeline">{`${Math.floor(
              movie.duration / 60
            )}ч ${movie.duration % 60}м`}</p>
          </div>
          
          {location.pathname === "/movies" && (
            <button
              className={saveButtonClassName}
              onClick={handleSaveButtonClick}
              type="button"
            ></button>
          )}

          {location.pathname === "/savedMovies" && (
            <button
              className={deleteButtonClassName}
              onClick={handleDeleteButtonClick}
              type="button"
            ></button>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default MoviesCard;