import { useState, useEffect, useContext } from "react"
import HeaderMovie from "../Header/HeaderMovie";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js"

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [userName, changeUserName] = useState("");
  const [userEmail, changeUserEmail] = useState("");

  useEffect(() => {
    changeUserEmail(currentUser.name);
    changeUserEmail(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeProfileName(evt) {
    changeUserName(evt.target.value);
  }

  function handleChangeProfileEmail(evt) {
    changeUserEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      "inputName": userName,
      "inputEmail": userEmail,
    });
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
              id="name"
              type="name"
              name="name"
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
              id="email"
              type="email"
              name="email"
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
        <button className={"profile__link"} to="/">
          Выйти из аккаунта
        </button>
      </div>
    </>
  );
}

export default Profile;
