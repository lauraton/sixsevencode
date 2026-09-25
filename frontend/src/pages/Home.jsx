import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

// Vista Inicio: Hero (CTA + mapa + panel gamificado) + Acciones Rápidas.
function Home() {
  const { auth } = useApp();

  return (
    <div className="container py-4 py-lg-5">
      <section className="glass-panel p-4 p-lg-5 mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-5">
            <h1 className="text-uppercase fw-bold display-6 mb-3">
              ¡Forma parte de Formosa! Gana recompensas. Transforma tu ciudad
            </h1>
            <p className="text-muted mb-4">
              Participá en foros locales, presentá reportes y completá tareas
              cívicas para ganar puntos y participar en sorteos de premios
              grandes.
            </p>
            <Link to="/retos" className="btn btn-brand-ghost btn-lg px-5">
              Empezar
            </Link>
          </div>

          <div className="col-12 col-lg-4 text-center">
            <FormosaMapIllustration />
          </div>

          <div className="col-12 col-lg-3">
            <GamifiedPanel auth={auth} />
          </div>
        </div>
      </section>

      <section aria-labelledby="quick-heading">
        <h2 id="quick-heading" className="h5 fw-bold mb-3">
          Acciones Rápidas
        </h2>
        <div className="row g-3">
          <QuickAction
            to="/reportes"
            icon="bi-file-earmark-text"
            label="Nuevo Reporte Ciudadano"
          />
          <QuickAction
            to="/alertas"
            icon="bi-bell"
            label="Ver Alertas de Barrio"
          />
          <QuickAction
            to="/foro"
            icon="bi-people"
            label="Unirse al Foro Vecinal"
          />
          <QuickAction
            to="/retos"
            icon="bi-check2-square"
            label="Mis Tareas Cívicas"
          />
        </div>
      </section>
    </div>
  );
}

function FormosaMapIllustration() {
  return (
    <svg
      viewBox="0 0 220 220"
      width="100%"
      height="220"
      role="img"
      aria-label="Mapa ilustrativo de la provincia de Formosa"
    >
      <path
        d="M40 30 L150 20 L190 60 L180 140 L120 190 L50 175 L20 110 Z"
        fill="#2f9e63"
        opacity="0.85"
      />
      <circle cx="95" cy="95" r="7" fill="#f3922b" />
      <circle cx="130" cy="70" r="7" fill="#3b7bd8" />
      <circle cx="80" cy="145" r="7" fill="#6b7280" />
      <text x="20" y="205" fontSize="12" fill="#1e293b" fontWeight="700">
        Provincia Formosa
      </text>
      <text x="100" y="90" fontSize="11" fill="#ffffff" fontWeight="600">
        Ciudad
      </text>
    </svg>
  );
}

function GamifiedPanel({ auth }) {
  if (!auth.isAuthenticated) {
    return (
      <div className="glass-panel-strong rounded-4 p-4 text-center h-100 d-flex flex-column justify-content-center">
        <i
          className="bi bi-award fs-1 text-primary mb-2"
          aria-hidden="true"
        ></i>
        <p className="small fw-semibold mb-0">
          Iniciá sesión para ver tu progreso y tus puntos.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel-strong rounded-4 p-4 h-100">
      <div className="d-flex align-items-center gap-2 mb-3">
        <i
          className="bi bi-person-circle fs-2 text-primary"
          aria-hidden="true"
        ></i>
        <div>
          <p className="mb-0 fw-semibold small">{auth.nombre}</p>
          <p className="mb-0 text-muted" style={{ fontSize: "0.75rem" }}>
            Nivel Cívico 1
          </p>
        </div>
      </div>
      <p className="small text-muted mb-1">Puntos acumulados</p>
      <p className="h3 fw-bold text-primary mb-3">0 pts</p>
      <div className="progress" style={{ height: "10px" }}>
        <div className="progress-bar" style={{ width: "0%" }} />
      </div>
      <p className="small text-muted mt-2 mb-0">
        Sumá puntos completando reportes y tareas cívicas.
      </p>
    </div>
  );
}

function QuickAction({ to, icon, label }) {
  return (
    <div className="col-6 col-lg-3">
      <Link to={to} className="text-decoration-none">
        <div className="glass-panel h-100 p-3 text-center">
          <i
            className={`bi ${icon} fs-2 text-primary d-block mb-2`}
            aria-hidden="true"
          ></i>
          <p className="small fw-semibold text-dark mb-0">{label}</p>
        </div>
      </Link>
    </div>
  );
}

export default Home;
