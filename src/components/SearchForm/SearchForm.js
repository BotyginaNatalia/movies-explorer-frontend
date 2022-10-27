import { useState, useEffect } from "react";

function SearchForm({ onSearchButtonClick, inputMovieName, defaultValue }) {
  const [movieName, changeMovieName] = useState(inputMovieName);
  const [changeCheckButton, setChangeCheckButton] = useState(false);
  const [enterMovieNameError, showEnterMovieNameError] = useState("");

  function fixEnterMovieNameError() {
    showEnterMovieNameError(null);
  }

  function handleChangeMovieName(evt) {
    fixEnterMovieNameError();
    changeMovieName(evt.target.value);
  }

  function handleSearch(evt) {
    const shortFilm = evt.target.checked;
    fixEnterMovieNameError();
    evt.preventDefault();
    if (!movieName) {
      showEnterMovieNameError("Нужно ввести ключевое слово");
    } else if (movieName.length < 1) {
      showEnterMovieNameError("");
    } else {
      onSearchButtonClick(movieName, shortFilm);
    }
  }

  function handleChangeCheckButton(evt) {
    const shortFilm = evt.target.checked;
    setChangeCheckButton(shortFilm);
    onSearchButtonClick(movieName, shortFilm);
  }
  
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(movieName, changeCheckButton);
  }

  useEffect(() => {
    changeMovieName(defaultValue);
    setChangeCheckButton(JSON.parse(localStorage.getItem("shortFilm")) || false)
  }, []);

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
      <div className="sForm__switch">
        <div className="sForm__switch-button">
          <input
            id="sForm__switch-button"
            type="checkbox"
            className="sForm__switch-button_defaultbutton"
            checked={changeCheckButton}
            onChange={handleChangeCheckButton}
          />
          <label
            htmlFor="sForm__switch-button"
            className="sForm__switch-button_state"
          ></label>
        </div>
        <p className="sForm__switch-button_text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
