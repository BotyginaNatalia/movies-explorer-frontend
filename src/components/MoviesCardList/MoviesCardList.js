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
    setDisplayedMovies(props.films.slice(0, moviesQuantity));
  }, [moviesQuantity, props.films]);

  function onMoreButtonClick() {
    setDisplayedMovies(
      props.films.slice(0, displayedMovies.length + moreMovies)
    );
  }

  return (
    <>
    <section className="moviesCardList">
      <div className="moviesCardList__box">
        <div className="moviesCardList__element">
        {
          displayedMovies.map((film) => {
            return (
              <MoviesCard
                film={film}
                key={props.savedFilm ? film.movieId : film.id}
                isSaved={props.isSaved}
                savedFilm={props.savedFilm}
                onSaveButtonClick={props.onSaveButtonClick}
                onDeleteButtonClick={props.onDeleteButtonClick}
                onSearchButtonClick={props.onSearchButtonClick}
              />
            )
          })
        }
        </div>
 
        {location.pathname === "/movies" &&
        props.films.length > displayedMovies.length ? (
          <button
            type="button"
            className="moviesCardList__box-button"
            onClick={props.onMoreButtonClick}
          >
            Ещё
          </button>
        ) : (
          ""
        )}   

      </div>
    </section>
    </>
  );
}

export default MoviesCardList;
