import { useState, useEffect, useContext } from "react";
import HeaderMovie from "../Header/HeaderMovie";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { Link } from "react-router-dom";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const [commonProfileInfo, setCommonProfileInfo] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
  });

  useEffect(() => {
    setCommonProfileInfo({
      name: currentUser.name || "",
      email: currentUser.email || "",
    });
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(commonProfileInfo);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setCommonProfileInfo({
      ...commonProfileInfo,
      [name]: value,
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
              type="text"
              name="name"
              className="profile__info"
              placeholder=""
              minLength="3"
              maxLength="40"
              required
              value={commonProfileInfo.name || ""}
              onChange={handleChange}
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
              value={commonProfileInfo.email || ""}
              onChange={handleChange}
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
        <button className={"profile__link"} onClick={props.signingOut}>
          Выйти из аккаунта
        </button>
      </div>
    </>
  );
}

export default Profile;
