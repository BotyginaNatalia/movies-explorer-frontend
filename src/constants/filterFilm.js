import { useState } from "react";

export default function FilterFilm(films) {
  const [displayedMovies, setDisplayedMovies] = useState([]);

  function onSearchButtonClick(movieName, shortFilm) {    
    const searchOptions = films.filter((movie) =>
      movie.nameRU.toLowerCase().includes(movieName)
    );
    const displayedMovies = shortFilm
      ? searchOptions.filter((movie) => movie.duration <= 40)
      : searchOptions;
    localStorage.setItem("displayedMovies", JSON.stringify(displayedMovies));
    localStorage.setItem("movieName", movieName);
    localStorage.setItem("shortFilm", shortFilm);
    if ((movieName, shortFilm)) {
      setDisplayedMovies(displayedMovies);
    } else {
      setDisplayedMovies(displayedMovies);
    }
  }

  return {
    displayedMovies,
    onSearchButtonClick,
  };
}
