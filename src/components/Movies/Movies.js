import { useState, useEffect } from "react";
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies(props) {

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
      <section className="movies">
        <SearchForm onSearchButtonClick={onSearchButtonClick} />
        <MoviesCardList
          films={foundMovies}
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
