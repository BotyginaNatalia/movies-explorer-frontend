import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/header-logo.svg";
import isEmail from "validator/lib/isEmail";

function Login(props) {
  const [email, enterEmail] = useState("");
  const [password, enterPassword] = useState("");

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
      showEnterPasswordError("Что-то пошло не так")
    } else {
      showEnterPasswordError("");
    }
    enterPassword(correctInputPassword.value);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await props.getLogin(email, password)
  }


  return (
    <div className="login">
      <div className="login__head">
        <Link to="/">
          <img src={logo} className="login__logo" alt="логотип" />
        </Link>
        <h2 className="login__title">Добро пожаловать!</h2>
      </div>
      <form className="login__box" onSubmit={handleSubmit}>
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
            className="login__info"
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
          className={`login__submit-button ${!(correctEmail && correctPassword) ? "login__submit-button_disabled" : ""}`}
          type="submit"
          aria-label=""
          disabled={!(correctEmail && correctPassword)}
        >
          Войти
        </button>
      </form>
      <h3 className="login__text">
        Еще не зарегистрированы?
        <Link className={"login__link"} to="/sign-up">
          Регистрация
        </Link>
      </h3>
    </div>
  );
}

export default Login;
