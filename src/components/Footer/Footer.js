import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__box">
        <div className="footer__links">
          <a href="https://practicum.yandex.ru" className="footer__link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/BotyginaNatalia" className="footer__link">
            Github
          </a>
        </div>
        <p className="footer__copyright">&copy;2022. Наталья Ботыгина</p>
      </div>
    </footer>
  );
}

export default Footer;
