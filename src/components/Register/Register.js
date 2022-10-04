import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/header-logo.svg";

function Register(props) {
  const [name, enterName] = useState("");
  const [email, enterEmail] = useState("");
  const [password, enterPassword] = useState("");

  function handleChangeLoginName(evt) {
    enterName(evt.target.value);
  }

  function handleChangeLoginEmail(evt) {
    enterEmail(evt.target.value);
  }

  function handleChangeLoginPassword(evt) {
    enterPassword(evt.target.value);
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
            className="login__info login__info_invalid"
            value={password}
            placeholder=""
            minLength="4"
            maxLength="40"
            required
            onChange={handleChangeLoginPassword}
          />
        </div>
        <button
          className="login__reg-submit-button"
          type="submit"
          aria-label=""
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
