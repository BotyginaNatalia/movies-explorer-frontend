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
    if ((movieName, shortFilm)) {
      setFavMovies(favMovies.filter(movie => props.films.some(film => movie.movieId === film.movieId)));
    } else {
      setFavMovies(favMovies.filter(movie => props.films.some(film => movie.movieId === film.movieId)));
    }
  }

  useEffect(() => {
    props.getMyMovies();
  }, [])

  useEffect(() => {
    setFavMovies(props.films);   
}, [props.films]);

  /*function renderFavMovies(favMovies) {
    setFavMovies(favMovies);
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
  }

  useEffect(() => {
    renderFavMovies(JSON.parse(localStorage.getItem("favMovies" || "[]")));
  }, [props.films]);

  useEffect(() => {
    renderFavMovies(props.films);
  }, [props.films]);*/

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
        <SearchForm onSearchButtonClick={onSearchButtonClick} 
        defaultValue=""/>
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
