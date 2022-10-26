import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import isEmail from "validator/lib/isEmail";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [changedProfileInfo, getChangedProfileInfo] = useState(true);

  const [name, enterName] = useState(currentUser.name);
  const [email, enterEmail] = useState(currentUser.email);

  const [correctName, enterCorrectName] = useState(true);
  const [enterNameError, showEnterNameError] = useState("");

  function handleChangeLoginName(evt) {
    const input = evt.target;
    if (input.name === "name") {
      const correctInputName = input.validity.valid;
      enterCorrectName(correctInputName);
      enterName(input.value);
      if (!correctInputName) {
        showEnterNameError(correctInputName.validationMessage);
      } else {
        showEnterNameError("");
      }
    }

    if (input.value === currentUser.name) {
      getChangedProfileInfo(true);
    } else {
      getChangedProfileInfo(false);
    }
  }

  const [correctEmail, enterCorrectEmail] = useState(true);
  const [enterEmailError, showEnterEmailError] = useState("");

  function handleChangeLoginEmail(evt) {
    const input = evt.target;
    if (input.name === "email") {
      const correctInputEmail = isEmail(input.value);
      enterCorrectEmail(correctInputEmail);
      enterEmail(input.value);
      if (!correctInputEmail) {
        showEnterEmailError("Что-то пошло не так");
      } else {
        showEnterEmailError("");
      }
    }

    if (input.value === currentUser.email) {
      getChangedProfileInfo(true);
    } else {
      getChangedProfileInfo(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(name, email);
    getChangedProfileInfo(true);
  }

  function handleLogOut(evt) {
    evt.preventDefault();
    props.signingOut(name, email);
  }

  return (
    <>
      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__box" onSubmit={handleSubmit}>
          <div className="profile__input">
            <p className="profile__placeholder">Имя</p>
            {props.updateProfile ? (
              <input
                id="name"
                type="text"
                name="name"
                className="profile__info"
                placeholder=""
                minLength="3"
                maxLength="40"
                required
                defaultValue={currentUser.name}
                onChange={handleChangeLoginName}
              />
            ) : (
              <p className="profile__info">{currentUser.name}</p>
            )}
          </div>
          <span className="login__error">{enterNameError}</span>
          <div className="profile__input">
            <p className="profile__placeholder">E-mail</p>
            {props.updateProfile ? (
              <input
                id="email"
                type="email"
                name="email"
                className="profile__info"
                placeholder=""
                minLength="5"
                maxLength="40"
                required
                defaultValue={currentUser.email}
                onChange={handleChangeLoginEmail}
              />
            ) : (
              <p className="profile__info">{currentUser.email}</p>
            )}
          </div>
          <span className="login__error">{enterEmailError}</span>

          {props.updateProfile ? (
            <button
              className={`profile__submit-button ${
                changedProfileInfo || !correctName || !correctEmail
                  ? "profile__submit-button_disabled"
                  : ""
              }`}
              type="submit"
              aria-label=""
              disabled={changedProfileInfo || !correctName || !correctEmail}
              onClick={props.handleUpdateProfileInfo}
            >
              Сохранить
            </button>
          ) : (
            <div className="profile__buttons">
              <button
                className="profile__submit-button"
                type="button"
                onClick={props.handleUpdateProfileInfo}
              >
                Редактировать
              </button>
              <button className={"profile__link"} onClick={handleLogOut}>
               Выйти из аккаунта
              </button>
            </div>
          )}
        </form>
        
      </div>
    </>
  );
}

export default Profile;
