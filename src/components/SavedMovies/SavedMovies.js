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
    if (!localStorage.getItem("savedMovies")) {
    
      const searchOptions = props.films.filter((movie) =>
        movie.nameRU.toLowerCase().includes(movieName)
      );
      const favMovies = shortFilmSaved
        ? searchOptions.filter((movie) => movie.duration <= 40)
        : searchOptions;

      localStorage.setItem("favMovies", JSON.stringify(favMovies));
      localStorage.setItem("movieName", movieName);
      localStorage.setItem("shortFilmSaved", shortFilmSaved);
      if ((movieName, shortFilmSaved)) {
        setFavMovies(favMovies);
      } else {
        setFavMovies(favMovies);
      }

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
          handleChangeCheckButtonSaved={props.handleChangeCheckButtonSaved}
          defaultValue=""
          shortFilmSaved={props.shortFilmSaved}
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
