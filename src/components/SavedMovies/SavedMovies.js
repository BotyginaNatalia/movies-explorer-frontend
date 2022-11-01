import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  const [favMovies, setFavMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(props.loadingMovies);

  function onSearchButtonClick(movieName, shortFilmSaved) {
    setIsLoading(true);
    const favMovies = props.films.filter((movie) =>
      movie.nameRU.toLowerCase().includes(movieName)
    );
    if ((movieName, shortFilmSaved)) {
      setFavMovies(favMovies.filter((movie) => movie.duration <= 40));
    } else {
      setFavMovies(
        favMovies.filter((movie) =>
          props.films.some((film) => movie.movieId === film.movieId)
        )
      );
    }
  }

  useEffect(() => {
    props.getMyMovies();
  }, []);

  useEffect(() => {
    setFavMovies(props.films);
  }, [props.films]);

  useEffect(() => {
    setIsLoading(props.loadingMovies);
  }, [props.loadingMovies]);

  useEffect(() => {
    if (favMovies) {
      setIsLoading(false);
    }
  }, [favMovies]);

  return (
    <>
      <section className="savedMovies">
        <SearchForm
          onSearchButtonClick={onSearchButtonClick}
          defaultValue=""
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            savedFilm={true}
            films={favMovies}
            isSaved={props.isSaved}
            savedMovies={props.savedMovies}
            onDeleteButtonClick={props.onDeleteButtonClick}
          />
        )}
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
