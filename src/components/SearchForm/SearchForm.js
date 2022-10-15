import { useState, useEffect } from "react";

function SearchForm({ defaultValue, onSearchButtonClick }) {
  const [movieName, changeMovieName] = useState("");
  const [changeCheckButton, setChangeCheckButton] = useState(false);
  const [enterMovieNameError, showEnterMovieNameError] = useState("");

  useEffect(() => {
    changeMovieName(defaultValue);
    setChangeCheckButton(
      JSON.parse(localStorage.getItem("shortFilm")) || false);
  }, []);

  function handleChangeMovieName(evt) {
    if (evt.target.value.length < 1) {
      showEnterMovieNameError("Нужно ввести ключевое слово");
    } else {
      showEnterMovieNameError("");
    }
    changeMovieName(evt.target.value);
  }

  function handleChangeCheckButton(evt) {
    const shortFilm = evt.target.checked;
    setChangeCheckButton(shortFilm);
    onSearchButtonClick(movieName, shortFilm);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearchButtonClick(movieName, changeCheckButton);
  }

  return (
    <section className="sForm">
      <form className="sForm__box" onSubmit={handleSubmit}>
        <input
          className="sForm__search_input"
          type="text"
          placeholder="Фильм"
          required
          value={movieName || ""}
          onChange={handleChangeMovieName}
        />
        <span className="sForm__error">{enterMovieNameError}</span> 
        <button
          className="sForm__search_button"
          type="submit"
          onSubmit={handleSubmit}
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
            className="sForm__switch-button_state">
          </label>
        </div>
        <p className="sForm__switch-button_text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
