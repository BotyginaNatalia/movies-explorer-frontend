import { useState, useEffect, useContext } from "react";
import HeaderMovie from "../Header/HeaderMovie";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, changeUserName] = useState("");
  const [userEmail, changeUserEmail] = useState("");

  useEffect(() => {
    changeUserName(currentUser.name);
    changeUserEmail(currentUser.email);
  }, [currentUser]);

  function handleChangeProfileName(evt) {
    changeUserName(evt.target.value);
  }

  function handleChangeProfileEmail(evt) {
    changeUserEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      inputName: userName,
      inputEmail: userEmail,
    });
  }

  function handleLogOut(evt) {
    evt.preventDefault();
    props.signingOut(userName, userEmail)
  }

  return (
    <>
      <HeaderMovie />
      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__box" onSubmit={handleSubmit}>
          <div className="profile__input">
            <p className="profile__placeholder">Имя</p>
            <input
              id="input-name"
              type="text"
              name="inputName"
              className="profile__info"
              placeholder=""
              minLength="3"
              maxLength="40"
              required
              value={userName || ""}
              onChange={handleChangeProfileName}
            />
          </div>
          <div className="profile__input">
            <p className="profile__placeholder">E-mail</p>
            <input
              id="input-email"
              type="email"
              name="inputEmail"
              className="profile__info"
              placeholder=""
              minLength="5"
              maxLength="40"
              required
              value={userEmail || ""}
              onChange={handleChangeProfileEmail}
            />
          </div>
          <button
            className="profile__submit-button"
            type="submit"
            aria-label=""
          >
            Редактировать
          </button>
        </form>
        <button className={"profile__link"} onClick={handleLogOut}>
          Выйти из аккаунта
        </button>
      </div>
    </>
  );
}

export default Profile;
