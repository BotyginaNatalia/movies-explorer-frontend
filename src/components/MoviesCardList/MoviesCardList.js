import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  
  return (
    <>
    <section className="moviesCardList">
      <div className="moviesCardList__box">
        <div className="moviesCardList__element">
        {
          props.movies.map(movie => {
            return (
              <MoviesCard
                movie={movie}
                key={props.favouriteMovies ? movie.movieId : movie.id}
                isSaved={props.isSaved}
                favouriteMovies={props.favouriteMovies}
                onSaveButtonClick={props.onSaveButtonClick}
                onDeleteButtonClick={props.onDeleteButtonClick}
              />
            )
          })
        }
        </div>
          <button type="button" className="moviesCardList__box-button" onClick={props.onMoreButtonClick}> 
          Ещё
        </button>
      </div>
    </section>
    </>
  );
}

export default MoviesCardList;
