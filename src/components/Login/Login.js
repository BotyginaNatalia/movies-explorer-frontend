import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/header-logo.svg";

function Login(props) {
  const [email, enterEmail] = useState("");
  const [password, enterPassword] = useState("");

  function handleChangeLoginEmail(evt) {
    enterEmail(evt.target.value);
  }

  function handleChangeLoginPassword(evt) {
    enterPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.getLogin(email, password);
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
        <div className="login__input">
          <p className="login__placeholder">Пароль</p>
          <input
            id="password"
            type="password"
            name="password"
            className="login__info"
            value={password}
            placeholder=""
            minLength="4"
            maxLength="40"
            required
            onChange={handleChangeLoginPassword}
          />
        </div>
        <Link
          className="login__submit-button"
          type="submit"
          aria-label=""
          to="/movies"
        >
          Войти
        </Link>
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
