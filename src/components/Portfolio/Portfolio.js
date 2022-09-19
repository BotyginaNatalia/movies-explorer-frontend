import React from "react";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__box">
        <nav className="portfolio__nav">
          <a
            href="https://botyginanatalia.github.io/how-to-learn/"
            className="portfolio__nav_link" target="_blank"
          >
            <p className="portfolio__nav_text">Статичный сайт</p>
            <img src={arrow} className="portfolio__nav_arrow" />
          </a>
          <a
            href="https://botyginanatalia.github.io/russian-travel/"
            className="portfolio__nav_link" target="_blank"
          >
            <p className="portfolio__nav_text">Адаптивный сайт</p>
            <img src={arrow} className="portfolio__nav_arrow" />
          </a>
          <a
            href="https://domainname.nb.nomoredomains.sbs"
            className="portfolio__nav_link" target="_blank"
          >
            <p className="portfolio__nav_text">Одностраничное приложение</p>
            <img src={arrow} className="portfolio__nav_arrow" />
          </a>
        </nav>
      </div>
    </section>
  );
}

export default Portfolio;
