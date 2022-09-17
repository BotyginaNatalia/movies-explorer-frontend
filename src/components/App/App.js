import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          exact path="/"
          element={
            <Main />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies />
          }
        />
        <Route
          path="/savedMovies"
          element={
            <SavedMovies />
          }
        />
        <Route
          path=""
          element={
            <NotFound />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
