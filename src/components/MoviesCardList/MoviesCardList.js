import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [displayedMovies, setDisplayedMovies] = useState([]);

  const [moreMovies, showMoreMovies] = useState(0);

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  function changeWindowSize() {
    if (windowWidth >= 1280) {
      setDisplayedMovies(12);
      showMoreMovies(4);
    } else if (windowWidth > 480 && windowWidth < 1280) {
      setDisplayedMovies(8);
      showMoreMovies(2);
    } else if (windowWidth <= 480) {
      setDisplayedMovies(5);
      showMoreMovies(2);
    }
  }

  function onMoreButtonClick() {
    const films = JSON.parse(localStorage.getItem("films"));
    setDisplayedMovies(films.slice(0, movies.length + moreMovies))
  }

  useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);
    changeWindowSize();
  }, [windowWidth]);

  if (props.films != null && props.films.length < 1) return <span className="moviesCardList__error">Ничего не найдено</span>

  return (
    <>
    <section className="moviesCardList">
      <div className="moviesCardList__box">
        <div className="moviesCardList__element">
        {
          props.films != null && props.films.map(film => {
            return (
              <MoviesCard
                film={film}
                key={film.id || film._id}
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
        props.films != null && props.films.length > displayedMovies.length ? (
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
    </>
  );
}

export default MoviesCardList;
