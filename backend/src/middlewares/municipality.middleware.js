// Deja pasar solo a MUNICIPIO o ADMIN (los que gestionan las tareas)
export const municipalityMiddleware = (req, res, next) => {
    try {
        if (!req.userData) {
            return res.status(401).json({ message: "usuario no autenticado" })
        }

        if (req.userData.role !== 'MUNICIPIO' && req.userData.role !== 'ADMIN') {
            return res.status(403).json({ message: "usuario no autorizado, se necesitan permisos de municipio" })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor", error })
    }
}
