import HeaderMovie from "../Header/HeaderMovie";
import { useState } from "react";
import { Link } from "react-router-dom";

function Profile(props) {
  const [name, enterName] = useState("");
  const [email, enterEmail] = useState("");

  function handleChangeProfileName(evt) {
    enterName(evt.target.value);
  }

  function handleChangeProfileEmail(evt) {
    enterEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.getProfile(name, email);
  }

  return (
    <>
      <HeaderMovie />
      <div className="profile">
        <h2 className="profile__title">Привет, {name}</h2>
        <form className="profile__box" onSubmit={handleSubmit}>
          <div className="profile__input">
            <p className="profile__placeholder">Имя</p>
            <input
              id="name"
              type="name"
              name="name"
              className="profile__info"
              value={name}
              placeholder=""
              minLength="3"
              maxLength="40"
              required
              onChange={handleChangeProfileName}
            />
          </div>
          <div className="profile__input">
            <p className="profile__placeholder">E-mail</p>
            <input
              id="email"
              type="email"
              name="email"
              className="profile__info"
              value={email}
              placeholder=""
              minLength="5"
              maxLength="40"
              required
              onChange={handleChangeProfileEmail}
            />
          </div>
          <Link
            className="profile__submit-button"
            type="submit"
            aria-label=""
            to="/"
          >
            Редактировать
          </Link>
        </form>
        <Link className={"profile__link"} to="/">
          Выйти из аккаунта
        </Link>
      </div>
    </>
  );
}

export default Profile;
