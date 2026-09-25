import { useState } from "react";
import { diseaseInfo, forumPosts } from "../data/mockData.js";

const tagById = Object.fromEntries(diseaseInfo.map((d) => [d.id, d]));

const emptyForm = { titulo: "", historia: "", tag: diseaseInfo[0].id };

// Vista 4: Foro de Experiencias y Relatos Comunitarios.
function CommunityForum() {
  const [posts, setPosts] = useState(forumPosts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.titulo.trim() || !form.historia.trim()) return;

    const nuevoPost = {
      id: Date.now(),
      autor: "Vos",
      barrio: "Tu barrio",
      tag: form.tag,
      titulo: form.titulo.trim(),
      historia: form.historia.trim(),
      fecha: new Date().toISOString().slice(0, 10),
    };

    setPosts((prev) => [nuevoPost, ...prev]);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="container py-4 py-lg-5">
      <header className="d-flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Foro Comunitario</h1>
          <p className="text-muted mb-0">
            Historias y experiencias de vecinos de Formosa
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary flex-shrink-0"
          onClick={() => setShowForm(true)}
        >
          <i className="bi bi-plus-lg me-1" aria-hidden="true"></i>
          Compartir
        </button>
      </header>

      {posts.length === 0 ? (
        <div className="empty-state">
          <i
            className="bi bi-chat-square-heart fs-1 text-primary"
            aria-hidden="true"
          ></i>
          <p className="mb-0">
            Todavía no hay historias publicadas. ¡Sé el primero en compartir!
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {posts.map((post) => (
            <div className="col-12 col-md-6" key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <NewStoryModal
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

function PostCard({ post }) {
  const tag = tagById[post.tag];

  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span
            className="badge rounded-pill"
            style={{ backgroundColor: tag?.color ?? "#64748b", color: "#fff" }}
          >
            {tag?.nombre ?? post.tag}
          </span>
          <small className="text-muted">{post.fecha}</small>
        </div>
        <h2 className="h6 fw-semibold">{post.titulo}</h2>
        <p className="text-muted small flex-grow-1">{post.historia}</p>
        <p className="mb-0 small fw-medium">
          <i className="bi bi-person-circle me-1" aria-hidden="true"></i>
          {post.autor} · {post.barrio}
        </p>
      </div>
    </article>
  );
}

function NewStoryModal({ form, onChange, onSubmit, onClose }) {
  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-story-title"
      style={{ background: "rgba(30, 41, 59, 0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h2 id="new-story-title" className="h5 modal-title mb-0">
                Compartir mi historia
              </h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body d-flex flex-column gap-3">
              <div>
                <label
                  htmlFor="story-title"
                  className="form-label small fw-semibold"
                >
                  Título
                </label>
                <input
                  id="story-title"
                  type="text"
                  className="form-control"
                  value={form.titulo}
                  onChange={onChange("titulo")}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="story-tag"
                  className="form-label small fw-semibold"
                >
                  Enfermedad relacionada
                </label>
                <select
                  id="story-tag"
                  className="form-select"
                  value={form.tag}
                  onChange={onChange("tag")}
                >
                  {diseaseInfo.map((disease) => (
                    <option key={disease.id} value={disease.id}>
                      {disease.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="story-text"
                  className="form-label small fw-semibold"
                >
                  Tu historia
                </label>
                <textarea
                  id="story-text"
                  className="form-control"
                  rows="4"
                  value={form.historia}
                  onChange={onChange("historia")}
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommunityForum;
