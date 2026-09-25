import { useMemo, useState } from "react";
import { adminSubmissions, barrios } from "../data/mockData.js";

const emptyEventForm = {
  actividad: "Fumigación",
  barrio: barrios[0],
  fecha: "",
  franjaHoraria: "",
  recomendaciones: "",
};

// Vista 5: Panel de Administración Municipal.
// Validación fotográfica de tareas + creador de avisos territoriales.
function AdminDashboard() {
  const [submissions, setSubmissions] = useState(adminSubmissions);
  const [barrioFiltro, setBarrioFiltro] = useState("todos");
  const [eventForm, setEventForm] = useState(emptyEventForm);
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const submissionsFiltradas = useMemo(() => {
    if (barrioFiltro === "todos") return submissions;
    return submissions.filter((s) => s.barrio === barrioFiltro);
  }, [submissions, barrioFiltro]);

  const pendientes = submissions.filter((s) => s.estado === "pendiente").length;

  const resolverSubmission = (id, estado) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado } : s)),
    );
  };

  const handleEventChange = (field) => (event) => {
    setEventForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleEventSubmit = (event) => {
    event.preventDefault();
    if (!eventForm.fecha || !eventForm.franjaHoraria) return;

    setPublishedEvents((prev) => [{ ...eventForm, id: Date.now() }, ...prev]);
    setFeedback(
      `Aviso de ${eventForm.actividad.toLowerCase()} publicado para ${eventForm.barrio}.`,
    );
    setEventForm(emptyEventForm);
  };

  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Panel de Administración Municipal</h1>
        <p className="text-muted mb-0">
          {pendientes} tareas esperando validación
        </p>
      </header>

      <div className="row g-4">
        <section
          className="col-12 col-lg-7"
          aria-labelledby="validation-heading"
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h2 id="validation-heading" className="h5 fw-semibold mb-0">
              Validación de fotos
            </h2>
            <select
              className="form-select form-select-sm"
              style={{ width: "auto" }}
              value={barrioFiltro}
              onChange={(event) => setBarrioFiltro(event.target.value)}
              aria-label="Filtrar por barrio"
            >
              <option value="todos">Todos los barrios</option>
              {barrios.map((barrio) => (
                <option key={barrio} value={barrio}>
                  {barrio}
                </option>
              ))}
            </select>
          </div>

          {submissionsFiltradas.length === 0 ? (
            <div className="empty-state">
              <i
                className="bi bi-check2-circle fs-1 text-primary"
                aria-hidden="true"
              ></i>
              <p className="mb-0">No hay envíos para este barrio.</p>
            </div>
          ) : (
            <div className="row g-3">
              {submissionsFiltradas.map((submission) => (
                <div className="col-12 col-sm-6" key={submission.id}>
                  <SubmissionCard
                    submission={submission}
                    onResolve={resolverSubmission}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="col-12 col-lg-5" aria-labelledby="schedule-heading">
          <h2 id="schedule-heading" className="h5 fw-semibold mb-3">
            Programar aviso territorial
          </h2>

          <div className="card shadow-sm">
            <div className="card-body">
              {feedback && (
                <div className="alert alert-success py-2 small" role="status">
                  <i className="bi bi-check-circle me-1" aria-hidden="true"></i>
                  {feedback}
                </div>
              )}
              <form
                onSubmit={handleEventSubmit}
                className="d-flex flex-column gap-3"
              >
                <div>
                  <label
                    htmlFor="event-activity"
                    className="form-label small fw-semibold"
                  >
                    Actividad
                  </label>
                  <select
                    id="event-activity"
                    className="form-select"
                    value={eventForm.actividad}
                    onChange={handleEventChange("actividad")}
                  >
                    <option value="Fumigación">Fumigación</option>
                    <option value="Descacharreo">Descacharreo</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="event-barrio"
                    className="form-label small fw-semibold"
                  >
                    Barrio
                  </label>
                  <select
                    id="event-barrio"
                    className="form-select"
                    value={eventForm.barrio}
                    onChange={handleEventChange("barrio")}
                  >
                    {barrios.map((barrio) => (
                      <option key={barrio} value={barrio}>
                        {barrio}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label
                      htmlFor="event-date"
                      className="form-label small fw-semibold"
                    >
                      Fecha
                    </label>
                    <input
                      id="event-date"
                      type="date"
                      className="form-control"
                      value={eventForm.fecha}
                      onChange={handleEventChange("fecha")}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label
                      htmlFor="event-time"
                      className="form-label small fw-semibold"
                    >
                      Franja horaria
                    </label>
                    <input
                      id="event-time"
                      type="text"
                      className="form-control"
                      placeholder="08:00 - 12:00 hs"
                      value={eventForm.franjaHoraria}
                      onChange={handleEventChange("franjaHoraria")}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="event-recs"
                    className="form-label small fw-semibold"
                  >
                    Recomendaciones previas para vecinos
                  </label>
                  <textarea
                    id="event-recs"
                    className="form-control"
                    rows="3"
                    value={eventForm.recomendaciones}
                    onChange={handleEventChange("recomendaciones")}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-megaphone me-1" aria-hidden="true"></i>
                  Publicar aviso
                </button>
              </form>
            </div>
          </div>

          {publishedEvents.length > 0 && (
            <div className="mt-3">
              <h3 className="h6 fw-semibold">
                Avisos publicados en esta sesión
              </h3>
              <ul className="list-group">
                {publishedEvents.map((evento) => (
                  <li className="list-group-item small" key={evento.id}>
                    <strong>{evento.actividad}</strong> · {evento.barrio} ·{" "}
                    {evento.fecha} · {evento.franjaHoraria}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const submissionStatusMeta = {
  pendiente: { label: "Pendiente", className: "badge-pendiente" },
  aprobado: { label: "Aprobado", className: "badge-aprobado" },
  rechazado: { label: "Rechazado", className: "badge-rechazado" },
};

function SubmissionCard({ submission, onResolve }) {
  const meta = submissionStatusMeta[submission.estado];

  return (
    <div className="card h-100 shadow-sm">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "140px", background: "var(--color-bg-light)" }}
      >
        <i className="bi bi-image fs-1 text-primary" aria-hidden="true"></i>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="fw-semibold small">{submission.barrio}</span>
          <span className={`badge ${meta.className}`}>{meta.label}</span>
        </div>
        <p className="small mb-1">{submission.tarea}</p>
        <p className="small text-muted mb-2">
          {submission.vecino} · {submission.fecha}
        </p>
        <p className="small text-muted fst-italic mb-3">
          {submission.fotoDescripcion}
        </p>

        {submission.estado === "pendiente" && (
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-success flex-grow-1"
              onClick={() => onResolve(submission.id, "aprobado")}
            >
              <i className="bi bi-check-lg me-1" aria-hidden="true"></i>
              Aprobar
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger flex-grow-1"
              onClick={() => onResolve(submission.id, "rechazado")}
            >
              <i className="bi bi-x-lg me-1" aria-hidden="true"></i>
              Rechazar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
