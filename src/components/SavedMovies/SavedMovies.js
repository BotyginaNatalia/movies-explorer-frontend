import { useState, useEffect } from 'react'
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  const [filteredMovies, setFilteredMovies] = useState([])

  function onSearchButtonClick(movieName, isShortFilms) {
    const filteredMovies = props.movies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (isShortFilms) {
      setFilteredMovies(filteredMovies.filter((item) => item.duration <= 40))
    }
    else {
      setFilteredMovies(filteredMovies)
    }
  }

  function initFilteredMovies() {
    setFilteredMovies(props.movies)
  }

  useEffect(() => {
    setFilteredMovies(
      filteredMovies.filter(movie => props.movies.some(movie => movie.movieId === movie.movieId))
    )
  }, [props.movies])

  useEffect(() => {
    initFilteredMovies()
  }, [])


  return (
    <>
      <HeaderMovie />
      <section className="savedMovies">
        <SearchForm
        onSearchButtonClick={onSearchButtonClick}
        />
        <MoviesCardList
          movies={filteredMovies}
          isSaved={props.isSaved}
          favourtieMovies={true}
          onDeleteButtonClick={props.onDeleteButtonClick}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
