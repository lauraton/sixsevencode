import { useMemo, useState } from "react";
import { barrios, municipalEvents } from "../data/mockData.js";

const activityMeta = {
  Fumigación: { icon: "bi-wind", className: "text-bg-primary" },
  Descacharreo: { icon: "bi-trash3", className: "text-bg-success" },
};

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

// Vista 3: Calendario de Avisos Municipales.
// Próximas fumigaciones y descacharreos, filtrables por barrio.
function MunicipalSchedule() {
  const [barrioFiltro, setBarrioFiltro] = useState("todos");

  const eventosFiltrados = useMemo(() => {
    const eventos =
      barrioFiltro === "todos"
        ? municipalEvents
        : municipalEvents.filter((e) => e.barrio === barrioFiltro);

    return [...eventos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }, [barrioFiltro]);

  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Avisos Municipales</h1>
        <p className="text-muted mb-0">
          Fumigaciones y descacharreos programados en tu ciudad
        </p>
      </header>

      <div className="mb-4" style={{ maxWidth: "320px" }}>
        <label htmlFor="filtro-barrio" className="form-label small fw-semibold">
          Filtrar por barrio
        </label>
        <select
          id="filtro-barrio"
          className="form-select"
          value={barrioFiltro}
          onChange={(event) => setBarrioFiltro(event.target.value)}
        >
          <option value="todos">Todos los barrios</option>
          {barrios.map((barrio) => (
            <option key={barrio} value={barrio}>
              {barrio}
            </option>
          ))}
        </select>
      </div>

      {eventosFiltrados.length === 0 ? (
        <div className="empty-state">
          <i
            className="bi bi-calendar-x fs-1 text-primary"
            aria-hidden="true"
          ></i>
          <p className="mb-0">
            No hay avisos programados para este barrio todavía.
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {eventosFiltrados.map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ evento }) {
  const meta = activityMeta[evento.actividad] ?? {
    icon: "bi-calendar-event",
    className: "text-bg-secondary",
  };
  const fecha = new Date(`${evento.fecha}T00:00:00`);

  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex gap-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
          style={{
            width: "52px",
            height: "52px",
            background: "var(--color-bg-light)",
          }}
        >
          <i
            className={`bi ${meta.icon} fs-4 text-primary`}
            aria-hidden="true"
          ></i>
        </div>
        <div className="flex-grow-1">
          <div className="d-flex flex-wrap gap-2 align-items-center mb-1">
            <span className={`badge ${meta.className}`}>
              {evento.actividad}
            </span>
            <span className="fw-semibold">{evento.barrio}</span>
          </div>
          <p className="mb-1 text-capitalize">
            <i
              className="bi bi-calendar3 me-1 text-muted"
              aria-hidden="true"
            ></i>
            {dateFormatter.format(fecha)}
          </p>
          <p className="mb-2">
            <i className="bi bi-clock me-1 text-muted" aria-hidden="true"></i>
            {evento.franjaHoraria}
          </p>
          <p className="small text-muted mb-0">
            <i className="bi bi-info-circle me-1" aria-hidden="true"></i>
            {evento.recomendaciones}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MunicipalSchedule;
