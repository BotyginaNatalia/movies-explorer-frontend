import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import ChangeWindowSize from "../../constants/ChangeWindowSize";

function MoviesCardList(props) {
  const location = useLocation();

  const {displayedMovies, onMoreButtonClick} = ChangeWindowSize(props.films);

  if (props.films != null && props.films.length < 1)
    return <span className="moviesCardList__error">Ничего не найдено</span>;

  return (
    <section className="moviesCardList">
      <div className="moviesCardList__box">
        <div className="moviesCardList__element">
          {displayedMovies.map((film) => {
              return (
                <MoviesCard
                  film={film}
                  key={props.savedFilm ? film.movieId : film.id}
                  isSaved={props.isSaved}
                  savedFilm={props.savedFilm}
                  onSaveButtonClick={props.onSaveButtonClick}
                  onDeleteButtonClick={props.onDeleteButtonClick}
                />
              );
            })}
        </div>

        {location.pathname === "/movies" && (props.films != null && props.films.length > displayedMovies.length) && (
          <button
            type="button"
            className="moviesCardList__box-button"
            onClick={onMoreButtonClick}
          >
            Ещё
          </button>        
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
