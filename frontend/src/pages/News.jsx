// Noticias Formoseñas: listo para conectarse a la fuente de noticias municipales.
function News() {
  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Noticias Formoseñas</h1>
        <p className="text-muted mb-0">
          Novedades oficiales de la Municipalidad de Formosa
        </p>
      </header>

      <div className="empty-state glass-panel py-5">
        <i className="bi bi-newspaper fs-1 text-primary" aria-hidden="true"></i>
        <p className="mb-0">
          Próximamente vas a ver acá las noticias publicadas por el Municipio.
        </p>
      </div>
    </div>
  );
}

export default News;
