import { useState, useEffect } from "react";

export default function ChangeWindowSize(films) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [moviesQuantity, defaultMoviesQuantity] = useState(7);

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    windowWidth, addEventListener("resize", checkWindowWidth);
    if (windowWidth > 768) {
      defaultMoviesQuantity(12);
    } else if (windowWidth > 480 && windowWidth < 768) {
      defaultMoviesQuantity(8);
    } else if (windowWidth <= 480) {
      defaultMoviesQuantity(5);
    }

    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, [windowWidth]);

  function onMoreButtonClick() {
    if (windowWidth > 768) {
      defaultMoviesQuantity(moviesQuantity + 3);
    } else {
      defaultMoviesQuantity(moviesQuantity + 2);    
    }
  }
  
  const displayedMovies =
    films != null && films.length > 0 ? films.slice(0, moviesQuantity) : [];

  return {
    displayedMovies,
    onMoreButtonClick,
  };
}
