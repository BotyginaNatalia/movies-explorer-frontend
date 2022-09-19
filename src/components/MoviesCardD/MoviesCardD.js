import React from "react";
import moviePic1 from "../../images/mov1.png";
import moviePic2 from "../../images/mov2.png";
import moviePic3 from "../../images/mov3.png";

function MoviesCardD() {
  return (
    <div className="movieCard">
      <div className="movieCard__box">
        <img className="movieCard__pic" src={moviePic1} alt="moviePic" />
        <div className="movieCard__about">
          <div className="movieCard__info">
            <p className="movieCard__title">33 слова о дизайне</p>
            <p className="movieCard__timeline">1ч42м</p>
          </div>
          <button
            className="movieCard__delete-button"
            type="button"
            to="/"
          ></button>
        </div>
      </div>

      <div className="movieCard__box">
        <img className="movieCard__pic" src={moviePic2} alt="moviePic" />
        <div className="movieCard__about">
          <div className="movieCard__info">
            <p className="movieCard__title">33 слова о дизайне</p>
            <p className="movieCard__timeline">1ч42м</p>
          </div>
          <button
            className="movieCard__delete-button"
            type="button"
            to="/"
          ></button>
        </div>
      </div>

      <div className="movieCard__box">
        <img className="movieCard__pic" src={moviePic3} alt="moviePic" />
        <div className="movieCard__about">
          <div className="movieCard__info">
            <p className="movieCard__title">33 слова о дизайне</p>
            <p className="movieCard__timeline">1ч42м</p>
          </div>
          <button
            className="movieCard__delete-button"
            type="button"
            to="/"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default MoviesCardD;
