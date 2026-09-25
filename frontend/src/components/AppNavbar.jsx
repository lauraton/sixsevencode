import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const miCiudadLinks = [
  { to: "/reportes", label: "Reportes Formosa", icon: "bi-file-earmark-text" },
  { to: "/foro", label: "Foros Vecinales", icon: "bi-people" },
  { to: "/alertas", label: "Alertas", icon: "bi-bell" },
  { to: "/avisos", label: "Avisos Municipales", icon: "bi-megaphone" },
];

function BrandLogo() {
  return (
    <NavLink
      to="/"
      className="d-flex align-items-center gap-2 text-decoration-none"
    >
      <span className="brand-mark">
        <i className="bi bi-shield-plus text-white fs-5" aria-hidden="true"></i>
      </span>
      <span className="d-flex flex-column">
        <span className="brand-text-name">SaludCom</span>
        <span className="brand-text-sub">Gestión Municipal</span>
      </span>
    </NavLink>
  );
}

function AppNavbar() {
  const { auth, login, logout } = useApp();
  const showAdminLink = auth.isAuthenticated && auth.role === "municipio";

  return (
    <>
      <header className="app-header sticky-top">
        <nav className="navbar navbar-expand-lg">
          <div className="container py-2">
            <BrandLogo />

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mainOffcanvas"
              aria-controls="mainOffcanvas"
              aria-label="Abrir menú"
            >
              <i className="bi bi-list fs-2 text-dark" aria-hidden="true"></i>
            </button>

            {/* Navegación desktop */}
            <div className="d-none d-lg-flex align-items-center gap-4 mx-auto">
              <NavLink to="/" end className="nav-link fw-semibold text-dark">
                Inicio
              </NavLink>

              <div className="dropdown">
                <button
                  className="nav-link fw-semibold text-dark bg-transparent border-0 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi Ciudad
                </button>
                <ul className="dropdown-menu p-2">
                  {miCiudadLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className="dropdown-item rounded-3 d-flex align-items-center gap-2"
                      >
                        <i
                          className={`bi ${link.icon} text-primary`}
                          aria-hidden="true"
                        ></i>
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <NavLink to="/retos" className="nav-link fw-semibold text-dark">
                Recompensas Vecino
              </NavLink>
              <NavLink
                to="/noticias"
                className="nav-link fw-semibold text-dark"
              >
                Noticias Formoseñas
              </NavLink>
              {showAdminLink && (
                <NavLink to="/admin" className="nav-link fw-semibold text-dark">
                  Panel Municipio
                </NavLink>
              )}
            </div>

            <div className="d-none d-lg-block">
              <SessionArea auth={auth} login={login} logout={logout} />
            </div>
          </div>
        </nav>
      </header>

      {/* Menú mobile (offcanvas) */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mainOffcanvas"
      >
        <div className="offcanvas-header">
          <BrandLogo />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-2">
          <NavLink
            to="/"
            end
            className="nav-link fw-semibold text-dark"
            data-bs-dismiss="offcanvas"
          >
            Inicio
          </NavLink>
          <p className="text-uppercase small fw-bold text-primary mb-1 mt-2">
            Mi Ciudad
          </p>
          {miCiudadLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="nav-link fw-semibold text-dark ps-2"
              data-bs-dismiss="offcanvas"
            >
              <i className={`bi ${link.icon} me-2`} aria-hidden="true"></i>
              {link.label}
            </NavLink>
          ))}
          <hr />
          <NavLink
            to="/retos"
            className="nav-link fw-semibold text-dark"
            data-bs-dismiss="offcanvas"
          >
            Recompensas Vecino
          </NavLink>
          <NavLink
            to="/noticias"
            className="nav-link fw-semibold text-dark"
            data-bs-dismiss="offcanvas"
          >
            Noticias Formoseñas
          </NavLink>
          {showAdminLink && (
            <NavLink
              to="/admin"
              className="nav-link fw-semibold text-dark"
              data-bs-dismiss="offcanvas"
            >
              Panel Municipio
            </NavLink>
          )}
          <hr />
          <SessionArea auth={auth} login={login} logout={logout} />
        </div>
      </div>
    </>
  );
}

function SessionArea({ auth, login, logout }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (auth.isAuthenticated) {
    return (
      <div className="dropdown">
        <button
          className="btn btn-brand-outline d-flex align-items-center gap-2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle fs-5" aria-hidden="true"></i>
          <span className="d-none d-xl-inline">{auth.nombre}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end p-2">
          <li>
            <span className="dropdown-item-text small text-muted">
              Sesión: {auth.role === "municipio" ? "Municipio" : "Vecino"}
            </span>
          </li>
          <li>
            <button
              className="dropdown-item rounded-3"
              type="button"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right me-2" aria-hidden="true"></i>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    );
  }

  const handleLogin = (role) => {
    login(role);
    setOpen(false);
  };

  return (
    <div className="position-relative" ref={wrapperRef}>
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-brand-outline btn-sm"
          onClick={() => setOpen((v) => !v)}
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          className="btn btn-brand btn-sm"
          onClick={() => setOpen((v) => !v)}
        >
          Registrarse
        </button>
      </div>

      {/* TODO backend: reemplazar este selector por el formulario real de login/registro */}
      {open && (
        <div className="session-popover">
          <p className="small text-muted mb-2">Acceso de demostración</p>
          <div className="d-grid gap-2">
            <button
              className="btn btn-brand btn-sm"
              type="button"
              onClick={() => handleLogin("vecino")}
            >
              Entrar como Vecino
            </button>
            <button
              className="btn btn-brand-dark btn-sm"
              type="button"
              onClick={() => handleLogin("municipio")}
            >
              Entrar como Municipio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppNavbar;
