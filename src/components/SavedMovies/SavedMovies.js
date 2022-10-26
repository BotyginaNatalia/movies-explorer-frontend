import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";


function SavedMovies(props) {
  const [favMovies, setFavMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(props.loadingMovies);

  function onSearchButtonClick(movieName, shortFilm) {
    
    setIsLoading(true);
    
      const searchOptions = props.films.filter((item) =>
        item.nameRU.toLowerCase().includes(movieName)
      );
      const favMovies = shortFilm
        ? searchOptions.filter((item) => item.duration <= 40)
        : searchOptions;
      setFavMovies(favMovies);  
      localStorage.setItem("favMovies", JSON.stringify(favMovies));
      localStorage.setItem("movieName", movieName);
      localStorage.setItem("shortFilm", JSON.stringify(shortFilm));
      if ((movieName, shortFilm)) {
        setFavMovies(favMovies);
      } else {
        setFavMovies(favMovies);
      }
  }

  function renderFavMovies(favMovies) {
    setFavMovies(favMovies);
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
  }

  useEffect(() => {
    renderFavMovies(JSON.parse(localStorage.getItem("favMovies" || "[]")));
  }, [props.films]);

  useEffect(() => {
    renderFavMovies(props.films);
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
        <SearchForm onSearchButtonClick={onSearchButtonClick} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            films={favMovies}
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
