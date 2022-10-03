import { useState, useEffect } from 'react';

function SearchForm(props) {
  const [movieName, setMovieName] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  function handleChangeMovieName(e) {
    setMovieName(e.target.value)
  }

  function handleChangeCheckbox(e) {
    const isShortFilms = e.target.checked
    setCheckbox(isShortFilms)
    props.onSearchButtonClick(movieName, isShortFilms)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onSearchButtonClick(movieName, checkbox)
  }
  
  useEffect(() => {
    setMovieName(props.defaultValue)
    setCheckbox(JSON.parse(localStorage.getItem('shortFilms')) || false)
  }, [])
  
  return (
    <section className="sForm" onSubmit={handleSubmit}>
      <form className="sForm__box">
        <input
          className="sForm__search_input"
          type="text"
          placeholder="Фильм"
          name="film"
          required
          value={movieName} 
          onChange={handleChangeMovieName}
        />
        <button className="sForm__search_button" type="submit" onSubmit={handleSubmit}></button>
      </form>
      <div className="sForm__switch">
        <p className="sForm__switch_text">Короткометражки</p>
        <div>
          <div className="sForm__switch-button">
            <input id="sForm__switch-button" type="checkbox" className="sForm__switch-button_defaultbutton" checked={checkbox} onChange={handleChangeCheckbox} />
            <label htmlFor="sForm__switch-button" className="sForm__switch-button_state"></label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
