import { useState, useEffect } from "react";
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies(props) {
  const [displayedMovies, setDisplayedMovies] = useState([]);

  function onSearchButtonClick(movieName, shortFilm) {
    
    const searchOptions = props.films.filter((movie) => movie.nameRU.toLowerCase().includes(movieName.toLowerCase()))
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
      <HeaderMovie />
      <section className="movies">
        <SearchForm onSearchButtonClick={onSearchButtonClick} />
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
