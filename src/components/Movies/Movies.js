import { useState, useEffect } from "react";
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies(props) {

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
      foundMovies.filter(movie => props.movies.some(movie => movie.movieId === movie.movieId))
    )
  }, [props.movies])

  useEffect(() => {
    showFoundMovies()
  }, [])

  return (
    <>
      <HeaderMovie />
      <section className="movies">
        <SearchForm onSearchButtonClick={onSearchButtonClick} />
        <MoviesCardList
          movies={foundMovies}
          onSaveButtonClick={props.onSaveButtonClick}
          onDeleteButtonClick={props.onDeleteButtonClick}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
