import { useState, useEffect } from "react";
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  const [foundMovies, setFoundMovies] = useState([])

  function onSearchButtonClick(movieName, shortFilm) {
    const foundMovies = props.films.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (shortFilm) {
      setFoundMovies(foundMovies.filter((movie) => movie.duration <= 40))
    }
    else {
      setFoundMovies(foundMovies)
    }
  }

  function showFoundMovies() {
    setFoundMovies(props.films)
  }

  useEffect(() => {
    setFoundMovies(
      foundMovies.filter(movie => props.films.some(film => movie.movieId === film.movieId))
    )
  }, [props.films])

  useEffect(() => {
    showFoundMovies()
  }, [])

  

  return (
    <>
      <HeaderMovie />
      <section className="savedMovies">
        <SearchForm onSearchButtonClick={onSearchButtonClick} />
        <MoviesCardList
          films={foundMovies}
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
