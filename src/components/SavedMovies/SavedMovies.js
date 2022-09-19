import React from "react";
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardListD from "../MoviesCardListD/MoviesCardListD";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
      <HeaderMovie />
      <section className="savedMovies">
        <SearchForm />
        <MoviesCardListD />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
