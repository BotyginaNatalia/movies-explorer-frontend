import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { MoviesApi } from "../../utils/moviesApi";

function Movies(props) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(props.loadingMovies);

  function onSearchButtonClick(movieName, shortFilm) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    MoviesApi.getOriginalMovies(jwt, movieName, shortFilm).then((films) => {
      const searchOptions = films.filter((movie) =>
        movie.nameRU.toLowerCase().includes(movieName)
      );
      const displayedMovies = shortFilm
        ? searchOptions.filter((movie) => movie.duration <= 40)
        : searchOptions;
      localStorage.setItem("displayedMovies", JSON.stringify(displayedMovies));
      localStorage.setItem("movieName", movieName);
      localStorage.setItem("shortFilm", shortFilm);
      if ((movieName, shortFilm)) {
        setDisplayedMovies(displayedMovies);
      } else {
        setDisplayedMovies(displayedMovies);
      }
    });
  }

  function showDisplayedMovies() {
    const displayedMovies = JSON.parse(localStorage.getItem("displayedMovies"));
    setDisplayedMovies(displayedMovies);
  }

  useEffect(() => {
    showDisplayedMovies();
  }, [props.displayedMovies]);

  useEffect(() => {
    setIsLoading(props.loadingMovies);
  }, [props.loadingMovies]);

  useEffect(() => {
    if (displayedMovies) {
      setIsLoading(false);
    }
  }, [displayedMovies]);

  return (
    <>
      <section className="movies">
        <SearchForm
          onSearchButtonClick={onSearchButtonClick}
          defaultValue={props.defaultValue}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            savedFilm={false}
            isSaved={props.isSaved}
            films={displayedMovies}
            savedMovies={props.savedMovies}
            onMoreButtonClick={props.onMoreButtonClick}
            onSaveButtonClick={props.onSaveButtonClick}
            onDeleteButtonClick={props.onDeleteButtonClick}
          />
        )}
      </section>
      <Footer />
    </>
  );
}

export default Movies;
