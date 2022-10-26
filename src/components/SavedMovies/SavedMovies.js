import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";


function SavedMovies(props) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(props.loadingMovies);

  function onSearchButtonClick(movieName, shortFilm) {
    
    setIsLoading(true);
    
      const searchOptions = props.films.filter((item) =>
        item.nameRU.toLowerCase().includes(movieName)
      );
      const displayedMovies = shortFilm
        ? searchOptions.filter((item) => item.duration <= 40)
        : searchOptions;
      setDisplayedMovies(displayedMovies);  
      localStorage.setItem("displayedMovies", JSON.stringify(displayedMovies));
      localStorage.setItem("movieName", movieName);
      localStorage.setItem("shortFilm", JSON.stringify(shortFilm));
      if ((movieName, shortFilm)) {
        setDisplayedMovies(displayedMovies);
      } else {
        setDisplayedMovies(displayedMovies);
      }
  }

  function renderFavMovies(displayedMovies) {
    setDisplayedMovies(displayedMovies);
    localStorage.setItem("favMovies", JSON.stringify(displayedMovies));
  }

  useEffect(() => {
    renderFavMovies(JSON.parse(localStorage.getItem("displayedMovies" || "[]")));
  }, [props.films]);

  useEffect(() => {
    renderFavMovies(props.films);
  }, [props.films]);

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
      <section className="savedMovies">
        <SearchForm onSearchButtonClick={onSearchButtonClick} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            films={displayedMovies}
            isSaved={props.isSaved}
            savedFilm={true}
            onDeleteButtonClick={props.onDeleteButtonClick}
          />
        )}
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
