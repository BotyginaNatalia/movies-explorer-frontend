import { useEffect, useState } from "react";

export default function FilterFilm(props) {
  const [displayedMovies, setDisplayedMovies] = useState([]);

  useEffect(() => {
    updateDisplayedMovies(
      JSON.parse(
        localStorage.getItem(`${props.isSaved}DisplayedMovies`) || "[]"
      )
    );
  }, []);

  function updateDisplayedMovies(displayedMovies) {
    setDisplayedMovies(displayedMovies);
    localStorage.setItem(
      `${props.isSaved}DisplayedMovies`,
      JSON.stringify(displayedMovies)
    );
  }

  function searchFilter(movieName, shortFilm) {
    if (
      movieName != null &&
      movieName.length === 0 &&
      !props.initialStateRender
    ) {
      !props.initialStateRender && updateFilteredMovies([]);
    } else {
      updateDisplayedMovies(
        props.films.filter(
          ({ nameRU, nameEN, duration }) =>
            (nameRU.toLowerCase().includes(movieName) ||
              nameEN?.toLowerCase().includes(movieName)) &
            (!shortFilm || duration <= 40)
        )
      );
    }
  }

  function onSearchButtonClick(movieName, shortFilm) {
    searchFilter(movieName, shortFilm)
  }

  return {
    displayedMovies,
    setDisplayedMovies,
    updateDisplayedMovies,
    onSearchButtonClick,
    searchFilter,
  };
}
