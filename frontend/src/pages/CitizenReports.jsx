import { useState } from 'react'
import { barrios, reportTypes } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'

const emptyForm = { titulo: '', tipo: reportTypes[0], barrio: barrios[0], descripcion: '', foto: null }

// Mi Ciudad > Reportes Formosa (Módulo A).
// Al publicar, el reporte queda visible acá y en el panel de gestión del Municipio.
function CitizenReports() {
  const { auth, reports, addReport } = useApp()
  const [form, setForm] = useState(emptyForm)
  const [preview, setPreview] = useState(null)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handlePhoto = (file) => {
    if (!file) return
    setForm((prev) => ({ ...prev, foto: file }))
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.titulo.trim() || !form.descripcion.trim()) return

    addReport({
      titulo: form.titulo.trim(),
      tipo: form.tipo,
      barrio: form.barrio,
      descripcion: form.descripcion.trim(),
      fotoPreview: preview,
      autor: auth.nombre ?? 'Vecino/a',
    })

    setForm(emptyForm)
    setPreview(null)
  }

  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="h3 fw-bold mb-1">Reportes Formosa</h1>
        <p className="text-muted mb-0">Registrá incidentes o zonas de riesgo de dengue en tu barrio</p>
      </header>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card">
            <div className="card-body">
              <h2 className="h6 fw-bold mb-3">Nuevo reporte</h2>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label htmlFor="report-titulo" className="form-label small fw-semibold">
                    Título
                  </label>
                  <input
                    id="report-titulo"
                    type="text"
                    className="form-control"
                    value={form.titulo}
                    onChange={handleChange('titulo')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="report-tipo" className="form-label small fw-semibold">
                    Tipo de incidente
                  </label>
                  <select id="report-tipo" className="form-select" value={form.tipo} onChange={handleChange('tipo')}>
                    {reportTypes.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="report-barrio" className="form-label small fw-semibold">
                    Barrio
                  </label>
                  <select
                    id="report-barrio"
                    className="form-select"
                    value={form.barrio}
                    onChange={handleChange('barrio')}
                  >
                    {barrios.map((barrio) => (
                      <option key={barrio} value={barrio}>
                        {barrio}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="report-desc" className="form-label small fw-semibold">
                    Descripción
                  </label>
                  <textarea
                    id="report-desc"
                    className="form-control"
                    rows="3"
                    value={form.descripcion}
                    onChange={handleChange('descripcion')}
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="report-foto" className="btn btn-brand-outline btn-sm mb-0">
                    <i className="bi bi-camera me-1" aria-hidden="true"></i>
                    {preview ? 'Reemplazar foto' : 'Adjuntar foto (opcional)'}
                  </label>
                  <input
                    id="report-foto"
                    type="file"
                    accept="image/*"
                    className="visually-hidden"
                    onChange={(event) => handlePhoto(event.target.files?.[0])}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Vista previa del reporte"
                      className="img-fluid rounded mt-2"
                      style={{ maxHeight: '160px', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <button type="submit" className="btn btn-brand">
                  <i className="bi bi-send me-1" aria-hidden="true"></i>
                  Publicar reporte
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <h2 className="h6 fw-bold mb-3">Reportes publicados</h2>
          {reports.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-file-earmark-text fs-1 text-primary" aria-hidden="true"></i>
              <p className="mb-0">Todavía no hay reportes publicados en esta sesión.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {reports.map((report) => (
                <article className="card" key={report.id}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge badge-brand">{report.tipo}</span>
                      <span className="badge badge-state-approved">Publicado</span>
                    </div>
                    <h3 className="h6 fw-semibold mb-1">{report.titulo}</h3>
                    <p className="small text-muted mb-2">
                      {report.barrio} · {report.fecha}
                    </p>
                    <p className="small mb-0">{report.descripcion}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CitizenReports