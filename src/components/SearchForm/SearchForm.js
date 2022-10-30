import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ onSearchButtonClick, inputMovieName, defaultValue, isSaved }) {
  const location = useLocation();
  const [movieName, changeMovieName] = useState(inputMovieName);
  const [shortFilm, setShortFilm] = useState(true);
  const [shortFilmSaved, setShortFilmSaved] = useState(true);
  const [enterMovieNameError, showEnterMovieNameError] = useState("");

  useEffect(() => {    
    updateShortFilm(JSON.parse(localStorage.getItem(`${isSaved}shortFilm`) || "false"));
  }, []);

  function updateShortFilm(shortFilm) {
    setShortFilm(shortFilm);
    localStorage.setItem("shortFilm", JSON.stringify(shortFilm));
  }

  useEffect(() => {    
    updateShortFilmSaved(JSON.parse(localStorage.getItem(`${isSaved}shortFilmSaved`) || "false"));
  }, []);

  function updateShortFilmSaved(shortFilmSaved) {
    setShortFilmSaved(shortFilmSaved);
    localStorage.setItem("shortFilmSaved", JSON.stringify(shortFilmSaved));
  }

  function fixEnterMovieNameError() {
    showEnterMovieNameError(null);
  }

  function handleChangeMovieName(evt) {
    fixEnterMovieNameError();
    changeMovieName(evt.target.value);
  }

  function handleSearch() {
    fixEnterMovieNameError();    
    if (!movieName) {
      showEnterMovieNameError("Нужно ввести ключевое слово");
    } else if (movieName.length < 1) {
      showEnterMovieNameError("");
    } else {
      onSearchButtonClick(movieName);
    }
  }

  function handleChangeCheckButton(evt) {
    const switchShortFilm = evt.target.checked;
    updateShortFilm(switchShortFilm);
    onSearchButtonClick(movieName, switchShortFilm);
  }

  function handleChangeCheckButtonSaved(evt) {
    const switchShortFilm = evt.target.checked;
    updateShortFilmSaved(switchShortFilm);
    onSearchButtonClick(movieName, switchShortFilm);
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    handleSearch(movieName)
  }
  
  useEffect(() => {
    changeMovieName(defaultValue)
  }, [])

  return (
    <section className="sForm">
      <form className="sForm__box" onSubmit={handleSubmit}>
        <input
          className="sForm__search_input"
          type="text"
          placeholder="Фильм"
          value={movieName || ""}
          onChange={handleChangeMovieName}
        />
        <span className="sForm__error">{enterMovieNameError}</span>
        <button
          className="sForm__search_button"
          type="submit"
          onClick={handleSearch}
        ></button>
      </form>

      {location.pathname === "/movies" && (
      <div className="sForm__switch">
        <div className="sForm__switch-button">
          <input
            id="sForm__switch-button"
            type="checkbox"
            className="sForm__switch-button_defaultbutton"
            checked={shortFilm}
            onChange={handleChangeCheckButton}
          />
          <label
            htmlFor="sForm__switch-button"
            className="sForm__switch-button_state"
          ></label>           
        </div>       
        <p className="sForm__switch-button_text">Короткометражки</p>
      </div>
      )}

      {location.pathname === "/savedMovies" && (
      <div className="sForm__switch">
        <div className="sForm__switch-button">
          <input
            id="sForm__switch-button"
            type="checkbox"
            className="sForm__switch-button_defaultbutton"
            checked={shortFilmSaved}            
            onChange={handleChangeCheckButtonSaved}
          />
          <label
            htmlFor="sForm__switch-button"
            className="sForm__switch-button_state"
          ></label>           
        </div>       
        <p className="sForm__switch-button_text">Короткометражки</p>
      </div>
      )}
    </section>
  );
}

export default SearchForm;
