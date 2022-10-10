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
      foundMovies.filter(film => props.movies.some(movie => film.movieId === movie.movieId))
    )
  }, [props.movies])

  useEffect(() => {
    showFoundMovies()
  }, [])

  return (
    <>
      <HeaderMovie />
      <section className="movies">
        <SearchForm onSearchButtonClick={onSearchButtonClick}
        defaultValue={props.defaultSearchValue} />
        <MoviesCardList
          movies={foundMovies}
          isSaved={props.isSaved}
          favouriteMovies={false}
          onSaveButtonClick={props.onSaveButtonClick}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
