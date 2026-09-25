import { Link } from "react-router-dom";
import { taskCatalog } from "../data/mockData.js";
import { useApp } from "../context/AppContext.jsx";

// Vista Inicio: Hero (CTA + panel de misiones ciudadanas) + Acciones Rápidas.
function Home() {
  const { auth } = useApp();
  const previewTasks = taskCatalog.slice(0, 2);

  return (
    <div className="container py-4 py-lg-5">
      <section className="mb-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-7 d-flex flex-column justify-content-center">
            <span className="eyebrow-badge align-self-start mb-3">
              <i className="bi bi-shield-check" aria-hidden="true"></i>
              Campaña de Prevención Municipal
            </span>
            <h1 className="fw-bold display-5 mb-3">
              Juntos contra el dengue y los vectores en tu comunidad
            </h1>
            <p className="text-muted mb-4" style={{ maxWidth: "520px" }}>
              Informate, reportá posibles criaderos, participá en las campañas
              de fumigación y sumá puntos para obtener recompensas municipales.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/reportes" className="btn btn-brand btn-lg px-4">
                <i
                  className="bi bi-exclamation-triangle me-2"
                  aria-hidden="true"
                ></i>
                Reportar Criadero o Foco
              </Link>
              <Link to="/alertas" className="btn btn-neutral btn-lg px-4">
                Guía de Prevención
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <MissionsWidget auth={auth} tasks={previewTasks} />
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

function MissionsWidget({ auth, tasks }) {
  return (
    <Link to="/retos" className="text-decoration-none">
      <div className="glass-panel p-4 h-100 position-relative">
        <span
          className="badge-highlight position-absolute"
          style={{ top: "-10px", right: "18px" }}
        >
          Recompensas activas
        </span>
        <h2 className="h6 fw-bold mb-1 text-dark">Misiones Ciudadanas</h2>
        <p className="small text-muted mb-3">
          Completá tareas preventivas en tu hogar o barrio para sumar puntos y
          beneficios municipales.
        </p>

        <div className="d-flex flex-column gap-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="d-flex align-items-center gap-3 p-2 rounded-3"
              style={{ background: "var(--color-primary-soft)" }}
            >
              <span
                className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                style={{ width: "38px", height: "38px", background: "#ffffff" }}
              >
                <i
                  className="bi bi-check2-circle text-primary"
                  aria-hidden="true"
                ></i>
              </span>
              <div className="flex-grow-1">
                <p className="mb-0 small fw-semibold text-dark">
                  {task.titulo}
                </p>
                <p className="mb-0 text-muted" style={{ fontSize: "0.72rem" }}>
                  {task.descripcion}
                </p>
              </div>
              {auth.isAuthenticated ? (
                <span className="badge badge-brand flex-shrink-0">
                  Sumá puntos
                </span>
              ) : (
                <span className="badge badge-state-draft flex-shrink-0">
                  <i className="bi bi-lock me-1" aria-hidden="true"></i>
                  Iniciá sesión
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Link>
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
