import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [displayedMovies, setDisplayedMovies] = useState(true);

  const [moviesQuantity, defaultMoviesQuantity] = useState(0);

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    windowWidth, addEventListener("resize", checkWindowWidth);
    if (windowWidth >= 1280) {
      defaultMoviesQuantity(12);
      defaultMoviesQuantity(moviesQuantity + 3)
    } else if (windowWidth > 480 && windowWidth < 1280) {
      defaultMoviesQuantity(8);
      defaultMoviesQuantity(moviesQuantity + 2);
    } else if (windowWidth <= 480) {
      defaultMoviesQuantity(5);
      defaultMoviesQuantity(moviesQuantity + 2);
    }

    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, [windowWidth]);

  function onMoreButtonClick() {
    if (windowWidth > 768) {
      defaultMoviesQuantity(moviesQuantity + 3)
    } else if 
      (windowWidth <= 768) {
      defaultMoviesQuantity(moviesQuantity + 2)
    } else if 
      (windowWidth <= 320) {
      defaultMoviesQuantity(moviesQuantity + 2)
    }
  }

  useEffect(() => {
    if (moviesQuantity >= props.films.length) {
      setDisplayedMovies(false);
    } else {
      setDisplayedMovies(true);
    }
    if (moviesQuantity === null) {
      setDisplayedMovies(false);
    }
  }, [moviesQuantity, props.films]);

  if (props.films != null && props.films.length < 1)
    return <span className="moviesCardList__error">Ничего не найдено</span>;

  return (
    <section className="moviesCardList">
      <div className="moviesCardList__box">
        <div className="moviesCardList__element">
          {props.films &&
            props.films.slice(0, moviesQuantity).map((film) => {
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

        {location.pathname === "/movies" && displayedMovies ? (
          <button
            type="button"
            className="moviesCardList__box-button"
            onClick={onMoreButtonClick}
          >
            Ещё
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
