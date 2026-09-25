import { useEffect, useRef, useState } from "react";
import { challengeTasks, neighborhoodChallenge } from "../data/mockData.js";

const statusMeta = {
  sin_enviar: { label: "Sin enviar", className: "text-bg-secondary" },
  pendiente: { label: "Pendiente de validación", className: "badge-pendiente" },
  aprobado: { label: "Aprobado", className: "badge-aprobado" },
  rechazado: { label: "Rechazado", className: "badge-rechazado" },
};

// Vista 2: Desafío Barrial.
// Progreso comunitario del barrio + checklist de tareas con evidencia fotográfica.
function CommunityChallenge() {
  const [tasks, setTasks] = useState(challengeTasks);
  const [progress, setProgress] = useState(neighborhoodChallenge.progreso);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const previousProgress = useRef(progress);

  useEffect(() => {
    if (previousProgress.current < 100 && progress >= 100) {
      setShowGoalModal(true);
    }
    previousProgress.current = progress;
  }, [progress]);

  const handlePhotoUpload = (taskId, file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              estado: "pendiente",
              foto: previewUrl,
              motivoRechazo: undefined,
            }
          : task,
      ),
    );

    // Simula el aporte del vecino al porcentaje grupal del barrio.
    setProgress((prev) => Math.min(100, prev + 5));
  };

  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Desafío Barrial</h1>
        <p className="text-muted mb-0">
          Barrio {neighborhoodChallenge.barrio} ·{" "}
          {neighborhoodChallenge.vecinosParticipando} de{" "}
          {neighborhoodChallenge.metaVecinos} vecinos participando
        </p>
      </header>

      <section
        className="card shadow-sm mb-4"
        aria-labelledby="progress-heading"
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 id="progress-heading" className="h6 fw-semibold mb-0">
              Progreso acumulado del barrio
            </h2>
            <span className="fw-bold text-primary">{progress}%</span>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ height: "14px" }}
          >
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="small text-muted mt-2 mb-0">
            Al llegar al 100% del barrio, la Municipalidad habilita un evento o
            recompensa comunitaria.
          </p>
        </div>
      </section>

      <section aria-labelledby="tasks-heading">
        <h2 id="tasks-heading" className="h5 fw-semibold mb-3">
          Tus tareas de prevención
        </h2>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <i
              className="bi bi-clipboard-check fs-1 text-primary"
              aria-hidden="true"
            ></i>
            <p className="mb-0">Todavía no tenés tareas asignadas.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpload={handlePhotoUpload}
              />
            ))}
          </div>
        )}
      </section>

      {showGoalModal && (
        <GoalReachedModal onClose={() => setShowGoalModal(false)} />
      )}
    </div>
  );
}

function TaskCard({ task, onUpload }) {
  const inputId = `foto-tarea-${task.id}`;
  const meta = statusMeta[task.estado];

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div>
            <h3 className="h6 fw-semibold mb-1">{task.titulo}</h3>
            <p className="small text-muted mb-0">{task.descripcion}</p>
          </div>
          <span className={`badge ${meta.className}`}>{meta.label}</span>
        </div>

        {task.estado === "rechazado" && task.motivoRechazo && (
          <div className="alert alert-danger py-2 small mb-3" role="alert">
            <i
              className="bi bi-exclamation-triangle me-1"
              aria-hidden="true"
            ></i>
            {task.motivoRechazo}
          </div>
        )}

        {task.foto && (
          <img
            src={task.foto}
            alt={`Evidencia de la tarea: ${task.titulo}`}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "220px", objectFit: "cover" }}
          />
        )}

        <label
          htmlFor={inputId}
          className="btn btn-outline-primary btn-sm mb-0"
        >
          <i className="bi bi-camera me-1" aria-hidden="true"></i>
          {task.foto ? "Reemplazar foto" : "Tomar o adjuntar foto"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          capture="environment"
          className="visually-hidden"
          onChange={(event) => onUpload(task.id, event.target.files?.[0])}
        />
      </div>
    </div>
  );
}

function GoalReachedModal({ onClose }) {
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="goal-modal-title"
      style={{ background: "rgba(30, 41, 59, 0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-body py-5">
            <i
              className="bi bi-emoji-laughing display-3 text-primary"
              aria-hidden="true"
            ></i>
            <h2 id="goal-modal-title" className="h4 fw-bold mt-3">
              ¡Felicitaciones, {neighborhoodChallenge.barrio}!
            </h2>
            <p className="text-muted">
              Tu barrio alcanzó el 100% del desafío. La Municipalidad se pondrá
              en contacto para coordinar el evento/recompensa comunitaria.
            </p>
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={onClose}
            >
              Genial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityChallenge;
