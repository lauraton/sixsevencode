import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
    try {
        // Obtener el token de la cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No autenticado" });
        }

        // Verificar y decodificar el token
        const decoded = verifyToken(token);

        req.userData = decoded; // Guardamos los datos del usuario para usarlos despues
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalido o expirado" });
    }
};
