import { useState, useEffect } from 'react'
import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  
  return (
    <>
      <HeaderMovie />
      <section className="savedMovies">
        <SearchForm
        onSearchButtonClick={onSearchButtonClick}
        />
        <MoviesCardList
          movies={filteredMovies}
          isSaved={props.isSaved}
          favourtieMovies={true}
          onDeleteButtonClick={props.onDeleteButtonClick}
        />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
