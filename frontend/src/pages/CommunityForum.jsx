import { useState } from "react";
import { diseaseInfo } from "../data/mockData.js";
import { useApp } from "../context/AppContext.jsx";

const tagById = Object.fromEntries(diseaseInfo.map((d) => [d.id, d]));
const emptyForm = { titulo: "", historia: "", tag: diseaseInfo[0].id };

// Mi Ciudad > Foros Vecinales. Estilo feed social: Me gusta, comentarios y,
// si la sesión es de rol Municipio, moderación (eliminar publicación).
function CommunityForum() {
  const { auth, posts, addPost, toggleLike, addComment, removePost } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const isModerator = auth.isAuthenticated && auth.role === "municipio";

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.titulo.trim() || !form.historia.trim()) return;

    addPost({
      autor: auth.nombre ?? "Vecino/a",
      tag: form.tag,
      titulo: form.titulo.trim(),
      historia: form.historia.trim(),
    });
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleCompartirClick = () => {
    if (!auth.isAuthenticated) return;
    setShowForm(true);
  };

  return (
    <div className="container py-4 py-lg-5">
      <header className="d-flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1">Foros Vecinales</h1>
          <p className="text-muted mb-0">
            Historias y experiencias de vecinos de Formosa
          </p>
        </div>
        <button
          type="button"
          className="btn btn-brand flex-shrink-0"
          onClick={handleCompartirClick}
        >
          <i className="bi bi-plus-lg me-1" aria-hidden="true"></i>
          Compartir
        </button>
      </header>

      {!auth.isAuthenticated && (
        <div className="alert-brand p-3 mb-4 small">
          <i className="bi bi-info-circle me-1" aria-hidden="true"></i>
          Iniciá sesión para publicar, comentar o dar Me gusta.
        </div>
      )}

      {posts.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-people fs-1 text-primary" aria-hidden="true"></i>
          <p className="mb-0">
            Todavía no hay historias publicadas. ¡Sé el primero en compartir!
          </p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3" style={{ maxWidth: "640px" }}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              canInteract={auth.isAuthenticated}
              canModerate={isModerator}
              onToggleLike={() => toggleLike(post.id)}
              onComment={(texto) => addComment(post.id, texto)}
              onRemove={() => removePost(post.id)}
            />
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

function PostCard({
  post,
  canInteract,
  canModerate,
  onToggleLike,
  onComment,
  onRemove,
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const tag = tagById[post.tag];

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!commentText.trim()) return;
    onComment(commentText.trim());
    setCommentText("");
  };

  return (
    <article className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center gap-2">
            <i
              className="bi bi-person-circle fs-4 text-primary"
              aria-hidden="true"
            ></i>
            <div>
              <p className="mb-0 small fw-semibold">{post.autor}</p>
              <small className="text-muted">{post.fecha}</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge badge-brand">{tag?.nombre ?? post.tag}</span>
            {canModerate && (
              <button
                type="button"
                className="btn btn-brand-dark btn-sm"
                onClick={onRemove}
                aria-label="Eliminar publicación"
                title="Eliminar publicación"
              >
                <i className="bi bi-trash3" aria-hidden="true"></i>
              </button>
            )}
          </div>
        </div>

        <h2 className="h6 fw-bold">{post.titulo}</h2>
        <p className="mb-3">{post.historia}</p>

        <div
          className="d-flex align-items-center gap-3 border-top pt-2"
          style={{ borderColor: "var(--glass-border)" }}
        >
          <button
            type="button"
            className={`like-btn ${post.likedByMe ? "liked" : ""}`}
            onClick={onToggleLike}
            disabled={!canInteract}
          >
            <i
              className={`bi ${post.likedByMe ? "bi-heart-fill" : "bi-heart"}`}
              aria-hidden="true"
            ></i>
            Me gusta {post.likes > 0 && `(${post.likes})`}
          </button>
          <button
            type="button"
            className="like-btn"
            onClick={() => setShowComments((v) => !v)}
          >
            <i className="bi bi-chat-dots" aria-hidden="true"></i>
            Comentarios{" "}
            {post.comentarios.length > 0 && `(${post.comentarios.length})`}
          </button>
        </div>

        {showComments && (
          <div className="mt-3">
            {post.comentarios.map((comment) => (
              <div key={comment.id} className="small mb-2">
                <strong>{comment.autor}:</strong> {comment.texto}
              </div>
            ))}
            {canInteract && (
              <form
                onSubmit={handleCommentSubmit}
                className="d-flex gap-2 mt-2"
              >
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Escribir un comentario..."
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-brand-outline btn-sm flex-shrink-0"
                >
                  Enviar
                </button>
              </form>
            )}
          </div>
        )}
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
      style={{ background: "rgba(30, 41, 59, 0.5)" }}
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
                className="btn btn-brand-outline"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-brand">
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
