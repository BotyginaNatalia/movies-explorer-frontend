import HeaderMovie from "../Header/HeaderMovie";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies(props) {
  return (
    <>
      <HeaderMovie />
      <section className="movies">
        <SearchForm onSearchButtonClick={props.onSearchButtonClick} />
        <MoviesCardList
          movies={props.movies}
          isSaved={props.isSaved}
          onSaveButtonClick={props.onSaveButtonClick}
          onDeleteButtonClick={props.onDeleteButtonClick}
        />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
