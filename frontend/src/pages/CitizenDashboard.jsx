import { useState } from "react";
import { Link } from "react-router-dom";
import {
  diseaseInfo,
  weatherAlert,
  notificationSettingsDefault,
} from "../data/mockData.js";

// Vista 1: Dashboard del Ciudadano.
// Muestra información educativa, alerta climática y accesos rápidos.
function CitizenDashboard() {
  const [notifications, setNotifications] = useState(
    notificationSettingsDefault,
  );
  const [activeDisease, setActiveDisease] = useState(diseaseInfo[0].id);

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentDisease = diseaseInfo.find((d) => d.id === activeDisease);

  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Hola, vecino/a 👋</h1>
        <p className="text-muted mb-0">
          Formosa Capital · Juntos prevenimos el dengue
        </p>
      </header>

      <WeatherAlertBanner alert={weatherAlert} />

      <section className="mt-4" aria-labelledby="info-heading">
        <h2 id="info-heading" className="h5 fw-semibold mb-3">
          ¿Qué es y cómo se transmite?
        </h2>

        <div className="d-flex gap-2 flex-wrap mb-3">
          {diseaseInfo.map((disease) => (
            <button
              key={disease.id}
              type="button"
              className={`btn btn-sm rounded-pill ${
                activeDisease === disease.id
                  ? "text-white"
                  : "btn-outline-secondary"
              }`}
              style={
                activeDisease === disease.id
                  ? {
                      backgroundColor: disease.color,
                      borderColor: disease.color,
                    }
                  : undefined
              }
              onClick={() => setActiveDisease(disease.id)}
            >
              <i className={`bi ${disease.icono} me-1`} aria-hidden="true"></i>
              {disease.nombre}
            </button>
          ))}
        </div>

        {currentDisease && (
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i
                  className={`bi ${currentDisease.icono} fs-3`}
                  style={{ color: currentDisease.color }}
                  aria-hidden="true"
                ></i>
                <h3 className="h5 mb-0">{currentDisease.nombre}</h3>
              </div>
              <p className="mb-3">{currentDisease.descripcion}</p>
              <h4 className="h6 fw-semibold">Síntomas frecuentes</h4>
              <ul className="mb-0">
                {currentDisease.sintomas.map((sintoma) => (
                  <li key={sintoma}>{sintoma}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      <section className="mt-4" aria-labelledby="notif-heading">
        <h2 id="notif-heading" className="h5 fw-semibold mb-3">
          Notificaciones
        </h2>
        <div className="card shadow-sm">
          <div className="list-group list-group-flush">
            <NotificationRow
              label="Alertas climáticas"
              description="Lluvias y humedad alta en tu zona"
              checked={notifications.alertasClima}
              onChange={() => toggleNotification("alertasClima")}
            />
            <NotificationRow
              label="Avisos municipales"
              description="Fumigación y descacharreo en tu barrio"
              checked={notifications.avisosMunicipales}
              onChange={() => toggleNotification("avisosMunicipales")}
            />
            <NotificationRow
              label="Recordatorios de retos"
              description="Tareas pendientes del desafío barrial"
              checked={notifications.recordatoriosRetos}
              onChange={() => toggleNotification("recordatoriosRetos")}
            />
            <NotificationRow
              label="Novedades del foro"
              description="Nuevas historias de la comunidad"
              checked={notifications.novedadesForo}
              onChange={() => toggleNotification("novedadesForo")}
            />
          </div>
        </div>
      </section>

      <section className="mt-4" aria-labelledby="quick-heading">
        <h2 id="quick-heading" className="h5 fw-semibold mb-3">
          Accesos rápidos
        </h2>
        <div className="row g-3">
          <QuickLinkCard
            to="/retos"
            icon="bi-trophy"
            title="Desafío Barrial"
            description="Sumá tareas y ayudá a tu barrio a llegar al 100%"
          />
          <QuickLinkCard
            to="/avisos"
            icon="bi-calendar-event"
            title="Avisos Municipales"
            description="Próximas fumigaciones y descacharreos"
          />
          <QuickLinkCard
            to="/foro"
            icon="bi-chat-square-heart"
            title="Foro Comunitario"
            description="Historias y experiencias de vecinos"
          />
        </div>
      </section>
    </div>
  );
}

function WeatherAlertBanner({ alert }) {
  return (
    <div
      className="card border-0 shadow-sm text-white"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))",
      }}
      role="alert"
    >
      <div className="card-body d-flex flex-column flex-sm-row gap-3 align-items-sm-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <i className="bi bi-cloud-rain-heavy fs-1" aria-hidden="true"></i>
          <div>
            <p className="mb-1 fw-semibold">
              Pronóstico de lluvia a las {alert.horaLluvia}: revisá tu patio
            </p>
            <p className="mb-0 small">
              {alert.ubicacion} · {alert.temperatura}°C · Humedad{" "}
              {alert.humedad}% · Prob. lluvia {alert.probabilidadLluvia}%
            </p>
          </div>
        </div>
        <span className="badge bg-white text-dark align-self-start align-self-sm-center">
          Riesgo {alert.nivelRiesgo}
        </span>
      </div>
      <div className="card-footer bg-transparent border-top border-white border-opacity-25">
        <small>
          <i className="bi bi-lightbulb me-1" aria-hidden="true"></i>
          {alert.recomendacion}
        </small>
      </div>
    </div>
  );
}

function NotificationRow({ label, description, checked, onChange }) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center py-3">
      <div>
        <p className="mb-0 fw-medium">{label}</p>
        <small className="text-muted">{description}</small>
      </div>
      <div className="form-check form-switch m-0">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={onChange}
          aria-label={label}
        />
      </div>
    </div>
  );
}

function QuickLinkCard({ to, icon, title, description }) {
  return (
    <div className="col-12 col-md-4">
      <Link to={to} className="text-decoration-none">
        <div className="card h-100 shadow-sm">
          <div className="card-body">
            <i
              className={`bi ${icon} text-primary fs-2 mb-2 d-block`}
              aria-hidden="true"
            ></i>
            <h3 className="h6 fw-semibold text-dark">{title}</h3>
            <p className="small text-muted mb-0">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CitizenDashboard;
