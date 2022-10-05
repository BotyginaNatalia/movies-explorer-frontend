import { useState, useEffect } from "react";

function SearchForm(props) {
  const [movieName, changeMovieName] = useState("");
  const [changeCheckButton, setChangeCheckButton] = useState(false);

  useEffect(() => {
    changeMovieName(props.defaultValue);
    setChangeCheckButton(JSON.parse(localStorage.getItem("shortFilm")) || false);
  }, []);

  function handleChangeMovieName(evt) {
    changeMovieName(evt.target.value);
  }

  function handleChangeCheckButton(evt) {
    const shortFilm = evt.target.checked;
    setChangeCheckButton(shortFilm);
    props.onSearchButtonClick(movieName, shortFilm);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSearchButtonClick(movieName, changeCheckButton);
  }

  return (
    <section className="sForm">
      <form className="sForm__box">
        <input
          className="sForm__search_input"
          type="text"
          placeholder="Фильм"
          name="film"
          required
          value={movieName || ""}
          onChange={handleChangeMovieName}
        />
        <button
          className="sForm__search_button"
          type="submit"
          onSubmit={handleSubmit}
        ></button>
      </form>
      <div className="sForm__switch">
        <p className="sForm__switch_text">Короткометражки</p>
        <div>
          <div className="sForm__switch-button">
            <input
              id="sForm__switch-button"
              type="checkbox"
              name="shortFilm"
              className="sForm__switch-button_defaultbutton"
              checked={changeCheckButton}
              onChange={handleChangeCheckButton}
            />
            <label
              htmlFor="sForm__switch-button"
              className="sForm__switch-button_state"
            ></label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
