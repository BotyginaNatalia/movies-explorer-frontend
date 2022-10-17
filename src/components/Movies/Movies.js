import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { MoviesApi } from "../../utils/moviesApi";

function Movies(props) {
  const [displayedMovies, setDisplayedMovies] = useState([]);  

  function onSearchButtonClick(movieName, shortFilm) {
    MoviesApi.getOriginalMovies()
  .then((films) => {    
    const searchOptions = films.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    const displayedMovies = shortFilm ? searchOptions.filter((movie) => movie.duration <= 40) : searchOptions
        localStorage.setItem("displayedMovies", JSON.stringify(displayedMovies))
        localStorage.setItem("movieName", movieName)
        localStorage.setItem("shortFilm", shortFilm)
    if (movieName, shortFilm) {
      setDisplayedMovies(displayedMovies)
    }
    else {
      setDisplayedMovies(displayedMovies)
    }
  })
}

  function showDisplayedMovies() {
    const displayedMovies = JSON.parse(localStorage.getItem("displayedMovies"))
    setDisplayedMovies(displayedMovies)
  }

  useEffect(() => {
    showDisplayedMovies()
  }, [props.displayedMovies])

  return (
    <>
      <section className="movies">
        <SearchForm onSearchButtonClick={onSearchButtonClick} 
        defaultValue={props.defaultValue} />
        <MoviesCardList
          films={displayedMovies}
          onMoreButtonClick={props.onMoreButtonClick}
          isSaved={props.isSaved}
          savedFilm={false}
          onSaveButtonClick={props.onSaveButtonClick}
          onDeleteButtonClick={props.onDeleteButtonClick}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;

