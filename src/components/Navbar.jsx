function Navbar({ totalVideojuegos }) {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top" aria-label="Navegación principal">
      <div className="container py-2">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
          <span className="brand-icon">
            <i className="bi bi-controller" />
          </span>
          <span className="brand-text">
            <strong>GameStore</strong>
            <small>Videojuegos online</small>
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <a className="nav-link" href="#inicio">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#catalogo">Catálogo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gestion">Gestión</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto">Contacto</a>
            </li>
            <li className="nav-item ms-lg-2">
              <span className="badge rounded-pill text-bg-dark px-3 py-2">
                {totalVideojuegos} juegos
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
