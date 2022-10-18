import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Main from "../Main/Main";
import Profile from "../Profile/Profile";

import Login from "../Login/Login";
import Register from "../Register/Register";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";

import * as MainApi from "../../utils/mainApi";
import { MoviesApi } from "../../utils/moviesApi";
import * as auth from "../../utils/auth";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import success from "../../images/success.svg";
import fail from "../../images/fail.svg";
import Header from "../Header/Header";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [emailInfo, setEmailInfo] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [infoToolTipState, setInfoToolTipState] = useState({
    image: "",
    text: "",
  });
  const [isOpenInfoToolTip, setIsOpenInfoToolTip] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const handleInfoToolTip = () => {
    setIsOpenInfoToolTip(true);
  };

  const closeAllPopups = () => {
    setIsOpenInfoToolTip(false);
  };

  /** check Token */

  function checkingToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .receiveToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggingIn(true);
            setEmailInfo(res.email);
            setCurrentUser(res);
            navigate(location.pathname);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    checkingToken();
  }, []);

  useEffect(() => {
    if (isLoggingIn && location.pathname === "/sign-up") {
      navigate("/movies")
    }
    if (isLoggingIn && location.pathname === "/sign-in") {
      navigate("/movies")
    }
  }, [isLoggingIn, navigate])

  /** registration, entrance and signing out */

  function getRegistration(name, email, password) {
    auth
      .regNewUser(name, email, password)
      .then(() => {
        setInfoToolTipState({
          image: success,
          text: "Вы успешно зарегистрировались",
        });
        getLogin(email, password)
        navigate("/movies");
      })
      .catch((err) => {
        setInfoToolTipState({
          image: fail,
          text: "Что-то пошло не так! Попробуйте ещё раз",
        });
        console.log(err);
      })
      .finally(handleInfoToolTip(true));
  }

  function getLogin(email, password) {
    auth
      .logNewUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggingIn(true);
        checkingToken();
        setCurrentUser();
        getOriginalMovies();
        navigate("/movies");
      })
      .catch((err) => {
        setInfoToolTipState({
          image: fail,
          text: "Что-то пошло не так! Попробуйте ещё раз",
        });
        handleInfoToolTip();
        console.log(err);
      });
  }

  function signingOut() {
    setIsLoggingIn(false);
    localStorage.removeItem("jwt");
    localStorage.clear();
  }

  /** update profile info */

  function handleUpdateProfile(name, email) {
    const jwt = localStorage.getItem("jwt");
    auth.changeProfileInfo(jwt, name, email)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email })
        setIsOpenInfoToolTip(true);
        setInfoToolTipState({
          image: success,
          text: "Вы успешно обновили данные пользователя",
        });
      })
      .catch((err) => {
        setInfoToolTipState({
          image: fail,
          text: "Что-то пошло не так! Попробуйте ещё раз",
        });
        handleInfoToolTip();
        console.log(err);
      });
  }

  //** Movies */

  /** get original movies */

  function getOriginalMovies() {
    const jwt = localStorage.getItem("jwt");
    MoviesApi.getOriginalMovies(jwt)
      .then((displayedMovies) => {
        setMovies(displayedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function isSaved(film) {
    return savedMovies.some(movie => movie.movieId === film.id && movie.owner === currentUser._id)
  }

  function handleSaveButtonClick(film) {
    const jwt = localStorage.getItem("jwt");
    MainApi.addNewMovie(jwt, film)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
        setIsOpenInfoToolTip(true);
          setInfoToolTipState({
            image: success,
            text: "Фильм успешно добавлен в избранное.",
          });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleDeleteButtonClick(film) {
    const jwt = localStorage.getItem("jwt");
    const deleteCard = savedMovies.find(f => f.movieId === (film.id || film.movieId) && f.owner === currentUser._id)
    if (!deleteCard) return
    MainApi.deleteMyMovie(jwt, deleteCard._id)
      .then(() => {
        setSavedMovies(savedMovies.filter(f => f._id !== deleteCard._id))
        setIsOpenInfoToolTip(true);
        setInfoToolTipState({
          image: success,
          text: "Фильм успешно удален из избранного.",
        });
      })
      .catch((err) => {
        setInfoToolTipState({
          image: fail,
          text: "Нельзя удалить фильм, добавленный другим пользователем.",
        });
        console.log(err);
      })
      .finally(handleInfoToolTip(true));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header isLoggingIn={isLoggingIn} />
        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggingIn={isLoggingIn}>
              <Profile
                onUpdateUser={handleUpdateProfile}
                signingOut={signingOut}
              />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-in" element={<Login getLogin={getLogin} />} />

          <Route
            path="/sign-up"
            element={<Register getRegistration={getRegistration} />}
          />


          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggingIn={isLoggingIn}>
              <Movies
                films={movies}
                onSaveButtonClick={handleSaveButtonClick}
                onDeleteButtonClick={handleDeleteButtonClick}
                isSaved={isSaved}
                defaultValue={localStorage.getItem("movieName")}              
              />
              </ProtectedRoute>
            }
          />

          <Route
            path="/savedMovies"
            element={
              <ProtectedRoute isLoggingIn={isLoggingIn}>
              <SavedMovies
                films={savedMovies}
                isSaved={isSaved}
                onDeleteButtonClick={handleDeleteButtonClick}
              />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <InfoToolTip
          image={infoToolTipState.image}
          title={infoToolTipState.text}
          isOpen={isOpenInfoToolTip}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

