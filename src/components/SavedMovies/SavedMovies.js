import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import * as MainApi from "../../utils/mainApi";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const [favMovies, setFavMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(props.loadingMovies);  

  function onSearchButtonClick(movieName, shortFilm) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    MainApi.getMyMovies(jwt, movieName, shortFilm)
    .then(() => {
    const favMovies = props.films.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
    localStorage.setItem("favMovies", JSON.stringify(favMovies))
    localStorage.setItem("movieName", movieName)
    localStorage.setItem("shortFilm", shortFilm)
    if (movieName, shortFilm) {
      setFavMovies(favMovies.filter((movie) => props.films.some(film => movie.movieId === film.movieId)))
    } else {
      setFavMovies(favMovies.filter((movie) => props.films.some(film => movie.movieId === film.movieId)))
    }  
  })
}


  function showFavMovies() {
    const favMovies = JSON.parse(localStorage.getItem("favMovies"))
    setFavMovies(favMovies)
  }

  useEffect(() => {
    showFavMovies()
  }, [props.favMovies])





  

  useEffect(() => {
    setIsLoading(props.loadingMovies);
  }, [props.loadingMovies])

  useEffect(() => {
    if(favMovies){
      setIsLoading(false);
    }
  }, [favMovies])

  

  return (
    <>
      <section className="savedMovies">
        <SearchForm onSearchButtonClick={onSearchButtonClick} />
        {isLoading ?
        <Preloader /> :
        <MoviesCardList
          films={favMovies}
          isSaved={props.isSaved}
          savedFilm={true}          
          onDeleteButtonClick={props.onDeleteButtonClick}
        />
        }
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
