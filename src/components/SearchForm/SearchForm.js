import React from "react";

function SearchForm() {
  return (
    <section className="sForm">
      <div className="sForm__box">
        <div className="sForm__search">
          <input
            className="sForm__search_input"
            type="text"
            placeholder="Фильм"
            name="film"
            required
          />
          <button className="sForm__search_button" type="submit"></button>
        </div>
      </div>
      <div className="sForm__switch">
        <p className="sForm__switch_text">Короткометражки</p>
        <button
          className="sForm__switch_button"
          name="switch-button"
          type="button"
        ></button>
      </div>
    </section>
  );
}

export default SearchForm;
