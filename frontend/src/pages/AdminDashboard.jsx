import { useState } from "react";
import { barrios } from "../data/mockData.js";
import { useApp } from "../context/AppContext.jsx";

const emptyEventForm = {
  actividad: "Fumigación",
  barrio: barrios[0],
  fecha: "",
  franjaHoraria: "",
  recomendaciones: "",
};

const reportStatusMeta = {
  publicado: { label: "Publicado", className: "badge-state-pending" },
  en_revision: { label: "En revisión", className: "badge-brand" },
  resuelto: { label: "Resuelto", className: "badge-state-approved" },
};

// Panel Municipio: gestión de reportes ciudadanos, creación de avisos
// territoriales y moderación del foro. Todo se lee/escribe desde el
// contexto compartido, así lo que se publica acá aparece al instante
// para los vecinos en /avisos y /foro.
function AdminDashboard() {
  const { reports, setReportStatus, addEvent, posts, removePost } = useApp();
  const [eventForm, setEventForm] = useState(emptyEventForm);
  const [feedback, setFeedback] = useState(null);

  const handleEventChange = (field) => (event) => {
    setEventForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleEventSubmit = (event) => {
    event.preventDefault();
    if (!eventForm.fecha || !eventForm.franjaHoraria) return;

    addEvent(eventForm);
    setFeedback(
      `Aviso de ${eventForm.actividad.toLowerCase()} publicado para ${eventForm.barrio}.`,
    );
    setEventForm(emptyEventForm);
  };

  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Panel Municipio</h1>
        <p className="text-muted mb-0">
          Gestión de reportes, avisos territoriales y moderación del foro
        </p>
      </header>

      <div className="row g-4">
        <section className="col-12 col-lg-6" aria-labelledby="reports-heading">
          <h2 id="reports-heading" className="h5 fw-bold mb-3">
            Reportes ciudadanos
          </h2>

          {reports.length === 0 ? (
            <div className="empty-state">
              <i
                className="bi bi-file-earmark-text fs-1 text-primary"
                aria-hidden="true"
              ></i>
              <p className="mb-0">No hay reportes cargados todavía.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onChangeStatus={setReportStatus}
                />
              ))}
            </div>
          )}
        </section>

        <section className="col-12 col-lg-6" aria-labelledby="schedule-heading">
          <h2 id="schedule-heading" className="h5 fw-bold mb-3">
            Programar aviso territorial
          </h2>

          <div className="card">
            <div className="card-body">
              {feedback && (
                <div className="alert-brand p-2 small mb-3">
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
                <button type="submit" className="btn btn-brand">
                  <i className="bi bi-megaphone me-1" aria-hidden="true"></i>
                  Publicar aviso
                </button>
              </form>
            </div>
          </div>

          <h2 className="h5 fw-bold mb-3 mt-4">Moderación del foro</h2>
          {posts.length === 0 ? (
            <div className="empty-state">
              <i
                className="bi bi-people fs-1 text-primary"
                aria-hidden="true"
              ></i>
              <p className="mb-0">No hay publicaciones en el foro todavía.</p>
            </div>
          ) : (
            <ul className="list-group">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="list-group-item bg-transparent d-flex justify-content-between align-items-center gap-2"
                >
                  <span className="small">
                    <strong>{post.autor}:</strong> {post.titulo}
                  </span>
                  <button
                    type="button"
                    className="btn btn-brand-dark btn-sm flex-shrink-0"
                    onClick={() => removePost(post.id)}
                  >
                    <i className="bi bi-trash3 me-1" aria-hidden="true"></i>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function ReportCard({ report, onChangeStatus }) {
  const meta = reportStatusMeta[report.estado] ?? reportStatusMeta.publicado;

  return (
    <div className="card">
      {report.fotoPreview && (
        <img
          src={report.fotoPreview}
          alt={`Foto del reporte: ${report.titulo}`}
          style={{ height: "140px", objectFit: "cover" }}
          className="rounded-top"
        />
      )}
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge badge-brand">{report.tipo}</span>
          <span className={`badge ${meta.className}`}>{meta.label}</span>
        </div>
        <h3 className="h6 fw-semibold mb-1">{report.titulo}</h3>
        <p className="small text-muted mb-2">
          {report.barrio} · {report.autor} · {report.fecha}
        </p>
        <p className="small mb-3">{report.descripcion}</p>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-brand-outline btn-sm flex-grow-1"
            onClick={() => onChangeStatus(report.id, "en_revision")}
          >
            En revisión
          </button>
          <button
            type="button"
            className="btn btn-brand btn-sm flex-grow-1"
            onClick={() => onChangeStatus(report.id, "resuelto")}
          >
            Marcar resuelto
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
