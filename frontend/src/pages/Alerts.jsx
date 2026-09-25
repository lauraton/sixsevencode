import { useState } from "react";
import {
  diseaseInfo,
  weatherAlert,
  notificationSettingsDefault,
} from "../data/mockData.js";

// Mi Ciudad > Alertas: alerta climática, información de enfermedades y notificaciones.
function Alerts() {
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
        <h1 className="h3 fw-bold mb-1">Alertas</h1>
        <p className="text-muted mb-0">
          Clima, prevención y notificaciones de tu zona
        </p>
      </header>

      <WeatherAlertBanner alert={weatherAlert} />

      <section className="mt-4" aria-labelledby="info-heading">
        <h2 id="info-heading" className="h5 fw-bold mb-3">
          ¿Qué es y cómo se transmite?
        </h2>

        <div className="d-flex gap-2 flex-wrap mb-3">
          {diseaseInfo.map((disease) => (
            <button
              key={disease.id}
              type="button"
              className={
                activeDisease === disease.id
                  ? "btn btn-brand btn-sm"
                  : "btn btn-brand-outline btn-sm"
              }
              onClick={() => setActiveDisease(disease.id)}
            >
              <i className={`bi ${disease.icono} me-1`} aria-hidden="true"></i>
              {disease.nombre}
            </button>
          ))}
        </div>

        {currentDisease && (
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i
                  className={`bi ${currentDisease.icono} fs-3 text-primary`}
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
        <h2 id="notif-heading" className="h5 fw-bold mb-3">
          Notificaciones
        </h2>
        <div className="card">
          <div
            className="list-group list-group-flush"
            style={{ background: "transparent" }}
          >
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
    </div>
  );
}

function WeatherAlertBanner({ alert }) {
  return (
    <div className="glass-panel-strong p-4" role="alert">
      <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <i
            className="bi bi-cloud-rain-heavy fs-1 text-primary"
            aria-hidden="true"
          ></i>
          <div>
            <p className="mb-1 fw-semibold">
              Pronóstico de lluvia a las {alert.horaLluvia}: revisá tu patio
            </p>
            <p className="mb-0 small text-muted">
              {alert.ubicacion} · {alert.temperatura}°C · Humedad{" "}
              {alert.humedad}% · Prob. lluvia {alert.probabilidadLluvia}%
            </p>
          </div>
        </div>
        <span className="badge badge-brand">Riesgo {alert.nivelRiesgo}</span>
      </div>
      <div className="alert-brand mt-3 p-2 small mb-0">
        <i className="bi bi-lightbulb me-1" aria-hidden="true"></i>
        {alert.recomendacion}
      </div>
    </div>
  );
}

function NotificationRow({ label, description, checked, onChange }) {
  return (
    <div className="list-group-item bg-transparent border-0 border-bottom d-flex justify-content-between align-items-center py-3">
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

export default Alerts;
