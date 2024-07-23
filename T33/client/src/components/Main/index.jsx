import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './styles.module.css';

const Main = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);

  // Zamykanie okna na małym ekranie naciskająć poza nie
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.main_container}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/logo192.png" alt="logo" width="30" height="30" className="d-inline-block align-top" />
            Job Offers
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-controls="navbarNav"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`} id="navbarNav" ref={navRef}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Zacznij szukać</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/offers">Oferty pracy</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/salaries">Zarobki</Link>
              </li>
            </ul>
            <div className="d-flex">
              <Link to="/login">
                <button className="btn btn-outline-primary me-2" type="button">Zaloguj się</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary" type="button">Rejestracja</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-5 pt-5">
        <div className="px-3">
          <div className="text-start">
            <h1><b>Poszukaj <a href="#" className="text-primary text-decoration-none">pracy</a> już teraz</b></h1>
            <p>Tysiące oferty pracy w branżach komputerowych i technologicznych czekają na Ciebie.</p>

            <form className="row g-3">
              <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Jakiego stanowiska szukasz?" />
              </div>
              <div className="col-md-5">
                <input type="text" className="form-control" placeholder="Lokalizacja" />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">Szukaj</button>
              </div>
            </form>

            <div className="mt-3">
              <label>Filter by: </label>
              <select className="form-select w-25 d-inline ms-2">
                <option value="stanowiska">Stanowiska</option>
              </select>
              <select className="form-select w-25 d-inline ms-2">
                <option value="technologii">Technologii</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="card mb-3 mx-auto" style={{ maxWidth: '540px', border: 'none' }}>
            <div className="row g-0 align-items-center">
              <div className="col-md-2 d-flex justify-content-center">
                <img src="/logo192.png" className="img-fluid rounded-start" alt="Company Logo" style={{ maxWidth: '80px', objectFit: 'contain' }} />
              </div>
              <div className="col-md-10">
                <div className="card-body">
                  <p className="card-text"><small className="text-muted">Firma #1</small></p>
                  <h5 className="card-title">Software Engineer</h5>
                  <div className="d-flex flex-wrap mb-2">
                    <span className="badge bg-secondary me-2">Warszawa</span> {/* Lokalizacja */}
                    <span className="badge bg-secondary me-2">Kontrakt B2B</span> {/* Typ kontraktu*/}
                    <span className="badge bg-secondary me-2">PLN 50-55k</span>  {/* Wynagrodzenie */}
                    <span className="badge bg-secondary">31 min temu</span>  {/* Kiedy oferta została dodana */}
                  </div>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod magna vitae libero tincidunt, vitae suscipit elit malesuada.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
