import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import { MoviesApi } from "../../utils/moviesApi";

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(props.loadingMovies);

  function onSearchButtonClick(movieName, shortFilm) {
    setIsLoading(true);
    MoviesApi.getOriginalMovies(movieName, shortFilm).then((films) => {
      const searchOptions = films.filter((movie) =>
        movie.nameRU.toLowerCase().includes(movieName)
      );
      const displayedMovies = shortFilm
        ? searchOptions.filter((movie) => movie.duration <= 40)
        : searchOptions;
      localStorage.setItem("displayedMovies", JSON.stringify(displayedMovies));
      localStorage.setItem("movieName", movieName);
      if ((movieName, shortFilm)) {
        setMovies(displayedMovies);
      } else {
        setMovies(displayedMovies);
      }
    });
  }

  useEffect(() => {
    if (localStorage.getItem("displayedMovies")) {
      setMovies(JSON.parse(localStorage.getItem("displayedMovies")));
    }
  }, []);

  useEffect(() => {
    setIsLoading(props.loadingMovies);
  }, [props.loadingMovies]);

  useEffect(() => {
    if (movies) {
      setIsLoading(false);
    }
  }, [movies]);

  return (
    <>
      <section className="movies">
        <SearchForm
          onSearchButtonClick={onSearchButtonClick}
          handleChangeCheckButton={props.handleChangeCheckButton}
          defaultValue={props.defaultValue}
          shortFilm={props.shortFilm}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            films={movies}
            savedFilm={false}
            isSaved={props.isSaved}
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
