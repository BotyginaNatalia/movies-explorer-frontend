import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import * as MainApi from "../../utils/mainApi";

function SavedMovies(props) {
  const [favMovies, setFavMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(props.loadingMovies);  

  useEffect(() => {
    updateFavMovies(JSON.parse(localStorage.getItem("favMovies") || "[]"));
  }, []);

  function updateFavMovies(favMovies) {
    setFavMovies(favMovies);
    localStorage.setItem("favMovies", JSON.stringify(favMovies));
  }

  function onSearchButtonClick(movieName, shortFilm) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    MainApi.getMyMovies(jwt, movieName, shortFilm).then((films) => {
      const searchOptions = films.filter((item) =>
        item.nameRU.toLowerCase().includes(movieName)
      );
      const favMovies = shortFilm
        ? searchOptions.filter((item) => item.duration <= 40)
        : searchOptions;
      localStorage.setItem("favMovies", JSON.stringify(favMovies));
      localStorage.setItem("movieName", movieName);
      localStorage.setItem("shortFilm", shortFilm);
      if ((movieName, shortFilm)) {
        setFavMovies(favMovies);
      } else {
        setFavMovies(favMovies);
      }
    });
  }

  useEffect(() => {
    updateFavMovies(props.films);    
  }, [props.films]);

  useEffect(() => {
    setIsLoading(props.loadingMovies);
  }, [props.loadingMovies]);

  useEffect(() => {
    if (favMovies) {
      setIsLoading(false);
    }
  }, [favMovies]);

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
