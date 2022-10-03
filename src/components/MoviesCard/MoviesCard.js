import React from "react";

function MoviesCard(props) {
    
  function handleSaveButtonClick() {
  props.onSaveButtonClick(props.movie)
  }

  function handleDeleteButtonClick() {
    props.onDeleteButtonClick(props.movie)
  }

  return (
    <div className="movieCard">
      <div className="movieCard__box">
      <a href={props.movie.trailerLink} rel="noreferrer" target="_blank">
        <img className="movieCard__pic" src={props.favouriteMovies ? props.movie.image : `https://api.nomoreparties.co/${props.movie.image.url}`} alt="moviePic" />
      </a>  
      <div className="movieCard__about">
          <div className="movieCard__info">
            <p className="movieCard__title">{props.movie.nameRU}</p>
            <p className="movieCard__timeline">{`${Math.floor(props.movie.duration / 60)}ч ${props.movie.duration % 60}м`}</p>
          </div>
          {props.favouriteMovies ? <button className="movieCard__delete-button" onClick={handleDeleteButtonClick} type="button"></button> :
          (props.isSaved(props.movie) ? <button className="movieCard__add-button_active" onClick={handleSaveButtonClick} type="button"></button> :
            <button className="movieCard__add-button" onClick={handleSaveButtonClick} type="button"></button>)}         
          </div>
      </div>
    </div>
  );
}

export default MoviesCard;
