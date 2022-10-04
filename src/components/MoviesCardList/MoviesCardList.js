import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [displayedMovies, setDisplayedMovies] = useState([]);

  const [moviesQuantity, defaultMoviesQuantity] = useState(0);

  const [moreMovies, showMoreMovies] = useState(0);

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    if (windowWidth >= 1280) {
      defaultMoviesQuantity(12);
      showMoreMovies(4);
    } else if (windowWidth > 480 && windowWidth < 1280) {
      defaultMoviesQuantity(8);
      showMoreMovies(2);
    } else if (windowWidth <= 480) {
      defaultMoviesQuantity(5);
      showMoreMovies(2);
    }
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);
    onMoreButtonClick();
  }, [windowWidth]);

  useEffect(() => {
    setDisplayedMovies(props.movies.slice(0, moviesQuantity));
  }, [moviesQuantity, props.movies]);

  function onMoreButtonClick() {
    setDisplayedMovies(
      props.movies.slice(0, displayedMovies.length + moreMovies)
    );
  }

  return (
    <section className="moviesCardList">
      <div className="moviesCardList__box">
        <div className="moviesCardList__element">
          {displayedMovies.map((movie) => {
            return (
              <MoviesCard
                movie={movie}
                key={movie.movieId || movie.id}
                isSaved={props.isSaved}
                onSaveButtonClick={props.onSaveButtonClick}
                onDeleteButtonClick={props.onDeleteButtonClick}
              />
            );
          })}
        </div>
        {location.pathname === "/movies" &&
        props.movies.length > displayedMovies.length ? (
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
