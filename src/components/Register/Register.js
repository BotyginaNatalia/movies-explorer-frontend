import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/header-logo.svg";
import isEmail from "validator/lib/isEmail";

function Register(props) {
  const [name, enterName] = useState("");
  const [email, enterEmail] = useState("");
  const [password, enterPassword] = useState("");

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

  const [correctPassword, enterCorrectPassword] = useState(false);
  const [enterPasswordError, showEnterPasswordError] = useState("");

  function handleChangeLoginPassword(evt) {
    const correctInputPassword = evt.target;    
    enterCorrectPassword(correctInputPassword.validity.valid);
    if (!correctPassword) {
      showEnterPasswordError(correctInputPassword.validationMessage)
    } else {
      showEnterPasswordError("");
    }
    enterPassword(correctInputPassword.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.getRegistration(name, email, password);
  }

  return (
    <div className="login">
      <div className="login__head">
        <Link to="/">
          <img src={logo} className="login__logo" alt="логотип" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <form className="login__box" onSubmit={handleSubmit}>
        <div className="login__input">
          <p className="login__placeholder">Имя</p>
          <input
            id="name"
            type="name"
            name="name"
            className="login__info login__info_invalid"
            value={name}
            placeholder=""
            minLength="3"
            maxLength="40"
            required
            onChange={handleChangeLoginName}
          />
        </div>
        <span className="login__error">{enterNameError}</span>

        <div className="login__input">
          <p className="login__placeholder">E-mail</p>
          <input
            id="email"
            type="email"
            name="email"
            className="login__info"
            value={email}
            placeholder=""
            minLength="5"
            maxLength="40"
            required
            onChange={handleChangeLoginEmail}
          />
        </div>
        <span className="login__error">{enterEmailError}</span>

        <div className="login__input">
          <p className="login__placeholder">Пароль</p>
          <input
            id="password"
            type="password"
            name="password"
            className="login__info login__info_invalid"
            value={password}
            placeholder=""
            minLength="5"
            maxLength="40"
            required
            onChange={handleChangeLoginPassword}
          />
        </div>
        <span className="login__error">{enterPasswordError}</span>

        <button
          className={`login__reg-submit-button ${!(correctEmail && correctPassword && correctName) ? "login__reg-submit-button_disabled" : ""}`}
          type="submit"
          aria-label=""
          disabled={!(correctEmail && correctPassword && correctName)}
        >
          Зарегистрироваться
        </button>
      </form>
      <h3 className="login__text">
        Уже зарегистрированы?
        <Link className={"login__link"} to="/sign-in">
          Войти
        </Link>
      </h3>
    </div>
  );
}

export default Register;
