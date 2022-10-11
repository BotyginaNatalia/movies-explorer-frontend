import { useState, useEffect } from "react";
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  const [displayedMovies, setDisplayedMovies] = useState([])

  function onSearchButtonClick(movieName, shortFilm) {
    const displayedMovies = props.films.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (shortFilm) {
      setDisplayedMovies(displayedMovies.filter((movie) => movie.duration <= 40))
    }
    else {
      setDisplayedMovies(displayedMovies)
    }
  }

  function showDisplayedMovies() {
    setDisplayedMovies(props.films)
  }

  useEffect(() => {
    setDisplayedMovies(
      displayedMovies.filter(movie => props.films.some(film => movie.movieId === film.movieId))
    )
  }, [props.films])

  useEffect(() => {
    showDisplayedMovies()
  }, [])

  

  return (
    <>
      <HeaderMovie />
      <section className="savedMovies">
        <SearchForm onSearchButtonClick={onSearchButtonClick} />
        <MoviesCardList
          films={displayedMovies}
          isSaved={props.isSaved}
          savedFilm={true}          
          onDeleteButtonClick={props.onDeleteButtonClick}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
