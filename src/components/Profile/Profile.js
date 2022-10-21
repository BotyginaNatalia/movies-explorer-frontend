import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import isEmail from "validator/lib/isEmail";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);  
  const [changedProfileInfo, getChangedProfileInfo] = useState(false);

  const [name, enterName] = useState(currentUser.name);
  const [email, enterEmail] = useState(currentUser.email);

  const [correctName, enterCorrectName] = useState(false);
  const [enterNameError, showEnterNameError] = useState("");

  function handleChangeLoginName(evt) {    
    const correctInputName = evt.target;    
    enterCorrectName(correctInputName.validity.valid);
    if (!correctName) {
      showEnterNameError(correctInputName.validationMessage)
    } else {
      showEnterNameError("");
    }
    enterName(correctInputName.value);
  }

  const [correctEmail, enterCorrectEmail] = useState(false);
  const [enterEmailError, showEnterEmailError] = useState("");

  function handleChangeLoginEmail(evt) {    
    const correctInputEmail = isEmail(evt.target.value);
    enterCorrectEmail(correctInputEmail);
    if (!correctInputEmail) {
      showEnterEmailError("Что-то пошло не так");
    } else {
      showEnterEmailError("");
    }
    enterEmail(evt.target.value);
  }   

  function handleSubmit(evt) {
    evt.preventDefault();
    if (name != currentUser.name || email != currentUser.email) {
      getChangedProfileInfo(true) 
    } else {
      getChangedProfileInfo(false);
    }
    props.onUpdateUser(name, email);  
  }

  function handleLogOut(evt) {
    evt.preventDefault();
    props.signingOut(name, email)
  }

  return (
    <>

      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__box" onSubmit={handleSubmit}>
          <div className="profile__input">
            <p className="profile__placeholder">Имя</p>
            <input
              id="name"
              type="text"
              name="name"
              className="profile__info"
              placeholder=""
              minLength="3"
              maxLength="40"
              required
              value={name}
              onChange={handleChangeLoginName}
            />
          </div>
          <span className="login__error">{enterNameError}</span>
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
              value={email}
              onChange={handleChangeLoginEmail}
            />
          </div>
          <span className="login__error">{enterEmailError}</span>          
          <button
          className={`profile__submit-button ${!(correctEmail || correctName) ? "profile__submit-button_disabled" : ""}`}            
            type="submit"
            aria-label=""
            disabled={!(correctEmail || correctName)}
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
