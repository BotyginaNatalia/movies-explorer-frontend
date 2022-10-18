import { useState, useEffect } from "react";
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
    const displayedMovies = JSON.parse(localStorage.getItem("displayedMovies"))
    setDisplayedMovies(displayedMovies)
  }

  useEffect(() => {
    showDisplayedMovies()
  }, [props.displayedMovies])

  

  return (
    <>
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
