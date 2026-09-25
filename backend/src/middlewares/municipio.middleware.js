export const municipioMiddleware = (req, res, next) => {
  if (!req.userData) {
    return res.status(401).json({ message: "usuario no autenticado" });
  }

  if (!["MUNICIPIO", "ADMIN"].includes(req.userData.rol)) {
    return res.status(403).json({ message: "Se necesitan permisos de municipio o administrador" });
  }

  next();
};