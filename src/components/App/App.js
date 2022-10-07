import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Main from "../Main/Main";
import Profile from "../Profile/Profile";

import Login from "../Login/Login";
import Register from "../Register/Register";

import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";

import { MainApi } from "../../utils/mainApi";
import { MoviesApi } from "../../utils/moviesApi";
import * as auth from "../../utils/auth";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import success from "../../images/success.svg";
import fail from "../../images/fail.svg";

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

  const handleInfoToolTip = () => {
    setIsOpenInfoToolTip(true);
  };

  const closeAllPopups = () => {
    setIsOpenInfoToolTip(false);
  };

  //** Movies */

  /** get original movies */

  function getOriginalMovies() {
    MoviesApi.getOriginalMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    MainApi.getOriginalProfileInfo()
      .then((originalProfileInfo) => {
        setIsLoggingIn(true);
        setCurrentUser(originalProfileInfo);
        getOriginalMovies();
        navigate("/movies")
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /** get favourite movies */

  function isSaved() {
    return savedMovies.some(
      (item) => item.movieId === movies.id && item.owner === currentUser._id
    );
  }

  function getSavedMovies() {
    MainApi.getMyMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    MainApi.getOriginalProfileInfo()
      .then((originalProfileInfo) => {
        setIsLoggingIn(true);
        setCurrentUser(originalProfileInfo);
        getSavedMovies();
        navigate("/savedMovies")
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSaveButtonClick(movie) {
    MainApi.addNewMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
        setInfoToolTipState({
          image: success,
          text: "Вы успешно добавили фильм в избранное",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteButtonClick(movie) {
    const deleteMovie = savedMovies.find(m => m.movieId === (movie.id || movie.movieId) && m.owner === currentUser._id)
    if (!deleteMovie) return
    MainApi.deleteMyMovie(deleteMovie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter(m => m._id !== deleteMovie._id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /** update profile info */

  function handleUpdateProfile(name, email) {
    MainApi.changeProfileInfo(name, email)
      .then(() => {
        setCurrentUser();
        setInfoToolTipState({
          image: success,
          text: "Вы успешно обновили данные профиля",
        });
      })
      .catch((err) => console.log(err));
  }

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
            navigate("/movies");
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
    if (isLoggingIn) {
      navigate("/movies");
    }
  }, [isLoggingIn]);

  /** registration, entrance and signing out */

  function getOriginalProfileInfo() {
    MainApi.getOriginalProfileInfo()
      .then((originalProfileInfo) => {
        setIsLoggingIn(true);
        setCurrentUser(originalProfileInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getRegistration(name, email, password) {
    auth
      .regNewUser(name, email, password)
      .then(() => {
        setInfoToolTipState({
          image: success,
          text: "Вы успешно зарегистрировались",
        });
        navigate("/sign-in");
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
        getOriginalProfileInfo();
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
    navigate("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route
            path="/profile"
            element={
              <Profile
                isLoggingIn={isLoggingIn}
                onUpdateUser={handleUpdateProfile}
                signingOut={signingOut}
              />
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
              <Movies
                isLoggingIn={isLoggingIn}
                movies={movies}
                isSaved={isSaved}
                onSaveButtonClick={handleSaveButtonClick}
                onDeleteButtonClick={handleDeleteButtonClick}
              />
            }
          />

          <Route
            path="/savedMovies"
            element={
              <SavedMovies
                isLoggingIn={isLoggingIn}
                movies={savedMovies}
                isSaved={isSaved}
                onDeleteButtonClick={handleDeleteButtonClick}
              />
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
