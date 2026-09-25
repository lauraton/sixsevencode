export const adminMiddleware = (req, res, next) => {
    try {
        if (!req.userData) {
            return res.status(401).json({ message: "usuario no autenticado" })
        }

        if (req.userData.rol !== 'ADMIN') {   // ✅ coincide con la key del token
            return res.status(403).json({ message: "usuario no autorizado, se necesitan permisos de administrador" })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor", error })
    }
}