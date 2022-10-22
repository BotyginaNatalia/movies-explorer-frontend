function MoviesCard(props) {  

  function handleSaveButtonClick() {
    props.onSaveButtonClick(props.film)
  }

  function handleDeleteButtonClick() {
    props.onDeleteButtonClick(props.film)
  }

 return (
    <div className="movieCard">
      <div className="movieCard__box">
        <a href={props.film.trailerLink} rel="noreferrer" target="_blank">
          <img
            className="movieCard__pic"
            src={
              location.pathname === "/movies"
                ? `https://api.nomoreparties.co/${props.film.image.url}`
                : props.film.image
            }
            alt="moviePic"
          />
        </a>
        <div className="movieCard__about">
          <div className="movieCard__info">
            <p className="movieCard__title">{props.film.nameRU}</p>
            <p className="movieCard__timeline">{`${Math.floor(
              props.film.duration / 60
            )}ч ${props.film.duration % 60}м`}</p>
          </div>


          {props.savedFilm ? <button className="movieCard__delete-button" onClick={handleDeleteButtonClick} type="button"></button> :
          (props.isSaved(props.film) ? <button className="movieCard__add-button_active" onClick={handleDeleteButtonClick} type="button"></button> :
            <button className="movieCard__add-button" onClick={handleSaveButtonClick} type="button"></button>)}
                
        </div>
      </div>
    </div>
  );
}

export default MoviesCard;