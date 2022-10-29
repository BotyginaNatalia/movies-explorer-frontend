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

  const [savedMovies, setSavedMovies] = useState([]);
  const [updateProfile , setUpdateProfile ] = useState(false);

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
          setIsLoggingIn(false);
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
        getUserInfo();
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
    isSaved([]); 
    setEmailInfo("");
    setCurrentUser("");
    setSavedMovies([]);
    getSavedMovies([]);
    setIsLoggingIn(false);
    localStorage.clear();
    localStorage.removeItem("jwt");
    localStorage.removeItem("films")
    localStorage.removeItem("movies");
    localStorage.removeItem("movieName");
    localStorage.removeItem("shortFilm");
    localStorage.removeItem("shortFilmSaved");
    localStorage.removeItem("savedMovies"); 
    localStorage.removeItem("favMovies")   
    localStorage.removeItem("displayedMovies");
    localStorage.removeItem("[]");
  }

  /** update profile info */

  function handleUpdateProfileInfo() {
    setUpdateProfile(true);
  }

  function handleUpdateProfile(name, email) {
    const jwt = localStorage.getItem("jwt");
    MainApi.changeProfileInfo(jwt, name, email)
      .then((res) => {
        setCurrentUser(res);
        setUpdateProfile(false);
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
        console.log(err);
      })
      .finally(handleInfoToolTip(true));
  }

  useEffect(() => {
    setUpdateProfile(false);    
  }, [navigate])

  useEffect((name, email) => {
    const jwt = localStorage.getItem("jwt");
    MainApi.getUser(jwt, name, email)
      .then((res) => {
        setIsLoggingIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        setIsLoggingIn(false)
        console.log(err);
      })
  }, [])

  //** Movies */

  function getUserInfo() {
    const jwt = localStorage.getItem("jwt");
    MainApi.getUser(jwt)
      .then((res) => {
        setIsLoggingIn(true)
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getSavedMovies() {
    const jwt = localStorage.getItem("jwt");
    MainApi.getMyMovies(jwt)
      .then((savedMovies) => {
        setSavedMovies(savedMovies)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {    
    const jwt = localStorage.getItem("jwt");
    MainApi.getUser(jwt)
    .then((res) => {
      setIsLoggingIn(true)
      setCurrentUser(res)
      getSavedMovies()
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
 
  function isSaved(film) {
    return savedMovies.some(movie => movie.movieId === film.id && movie.owner === currentUser._id)
  }

  function handleSaveButtonClick(film) {
    const jwt = localStorage.getItem("jwt");
    MainApi.addNewMovie(jwt, film)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])        
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
                signOut={signingOut}
                updateProfile={updateProfile}
                onUpdateUser={handleUpdateProfile}                
                handleUpdateProfileInfo={handleUpdateProfileInfo}
              />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-in" element={<Login getLogin={getLogin} isLoggingIn={isLoggingIn} />} />

          <Route
            path="/sign-up"
            element={<Register getRegistration={getRegistration} isLoggingIn={isLoggingIn} />}
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggingIn={isLoggingIn}>
              <Movies
                isSaved={isSaved}
                savedMovies={savedMovies}               
                onSaveButtonClick={handleSaveButtonClick}
                onDeleteButtonClick={handleDeleteButtonClick}                
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
                isSaved={isSaved}
                films={savedMovies}
                savedMovies={savedMovies}
                getMyMovies={getSavedMovies}                
                onDeleteButtonClick={handleDeleteButtonClick}                               
              />
              </ProtectedRoute>
            }
          />

          <Route path="/*" element={
          <>
          <NotFound /> 
          </>}
          />
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
