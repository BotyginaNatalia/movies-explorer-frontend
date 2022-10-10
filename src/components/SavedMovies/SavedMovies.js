import { useState, useEffect } from "react";
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {

  const [foundMovies, setFoundMovies] = useState([]);

  function onSearchButtonClick(movieName, shortFilm) {
    const foundMovies = props.movies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    if (shortFilm) {
      setFoundMovies(foundMovies.filter((item) => item.duration <= 40))
    }
    else {
      setFoundMovies(foundMovies)
    }
  }

  function showFoundMovies() {
    setFoundMovies(props.movies)
  }

  useEffect(() => {
    setFoundMovies(
      foundMovies.filter(film => props.movies.some(movie => film.movieId === movie.movieId))
    )
  }, [props.movies])

  useEffect(() => {
    showFoundMovies()
  }, [])

  return (
    <>
      <HeaderMovie />
      <section className="savedMovies">
        <SearchForm onSearchButtonClick={onSearchButtonClick}
        defaultValue="" />
        <MoviesCardList
          movies={foundMovies}
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
