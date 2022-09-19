import React from "react";
import MoviesCardD from "../MoviesCardD/MoviesCardD";

function MoviesCardListD() {
  return (
    <section className="moviesCardList">
      <div className="moviesCardList__box">
        <div className="moviesCardList__element">
          <MoviesCardD />
        </div>
        <button type="button" className="moviesCardList__box-button">
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardListD;
