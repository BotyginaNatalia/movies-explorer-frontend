import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="moviesCardList">
      <div className="moviesCardList__box">
        <div className="moviesCardList__element">
          <MoviesCard />
        </div>
        <button type="button" className="moviesCardList__box-button">
          Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
