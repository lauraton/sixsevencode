import { createContext, useContext, useMemo, useState } from "react";
import { municipalEvents as seedEvents } from "../data/mockData.js";

// Estado compartido de la app en memoria (sesión del navegador).
// TODO backend: reemplazar cada acción por una llamada fetch/axios a la API
// (login real con JWT, POST /reportes, POST /foro, etc.) manteniendo la misma forma.
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    nombre: null,
  });
  const [reports, setReports] = useState([]);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState(seedEvents);

  const login = (role) => {
    // TODO backend: reemplazar por POST /auth/login y guardar el token recibido.
    setAuth({
      isAuthenticated: true,
      role,
      nombre: role === "municipio" ? "Cuenta Municipal" : "Vecino/a",
    });
  };

  const logout = () =>
    setAuth({ isAuthenticated: false, role: null, nombre: null });

  const addReport = (report) => {
    setReports((prev) => [
      {
        ...report,
        id: Date.now(),
        estado: "publicado",
        fecha: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  const setReportStatus = (id, estado) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, estado } : r)));
  };

  const addPost = (post) => {
    setPosts((prev) => [
      {
        ...post,
        id: Date.now(),
        fecha: new Date().toISOString().slice(0, 10),
        likes: 0,
        likedByMe: false,
        comentarios: [],
      },
      ...prev,
    ]);
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              likedByMe: !p.likedByMe,
              likes: p.likes + (p.likedByMe ? -1 : 1),
            }
          : p,
      ),
    );
  };

  const addComment = (postId, texto) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comentarios: [
                ...p.comentarios,
                { id: Date.now(), autor: auth.nombre ?? "Vecino/a", texto },
              ],
            }
          : p,
      ),
    );
  };

  const removePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const addEvent = (event) => {
    setEvents((prev) => [{ ...event, id: Date.now() }, ...prev]);
  };

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      reports,
      addReport,
      setReportStatus,
      posts,
      addPost,
      toggleLike,
      addComment,
      removePost,
      events,
      addEvent,
    }),
    [auth, reports, posts, events],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de <AppProvider>");
  return ctx;
}
