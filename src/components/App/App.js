import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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

  function findMovie(data) {
    MainApi.addNewMovie(data)
      .then((res) => {
        setMovies([res, ...movies]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isLoggingIn) {
      Promise.all([MainApi.getMyMovies(), MoviesApi.getOriginalMovies()])
        .then(([allProfileInfo, allMoviesInfo]) => {
          setCurrentUser(allProfileInfo);
          setMovies(allMoviesInfo);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggingIn]);

  function onSearchButtonClick() {
    findMovie();
  }

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
      .then((userData) => {
        setIsLoggingIn(true);
        setCurrentUser(userData);
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSaveButtonClick(movie) {
    MainApi.addNewMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteButtonClick(movie) {
    MainApi.deleteMyMovie(movie._id)
      .then(() => {
        setMovies((state) => state.filter((m) => m._id !== movie._id && m));
      })
      .catch((err) => console.log(err));
  }

  /** update profile info */

  function handleUpdateProfile(data) {
    MainApi.changeProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
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
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggingIn]);

  /** registration, entrance and signing out */

  function getRegistration(email, password) {
    auth
      .regNewUser(email, password)
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
        setEmailInfo(email);
        navigate("/");
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
                onSearchButtonClick={onSearchButtonClick}
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

          <Route path="" element={<NotFound />} />
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
