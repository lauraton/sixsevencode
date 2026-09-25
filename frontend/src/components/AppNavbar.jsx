import { NavLink } from "react-router-dom";

const citizenLinks = [
  { to: "/", label: "Inicio", icon: "bi-house-door" },
  { to: "/retos", label: "Retos", icon: "bi-trophy" },
  { to: "/avisos", label: "Avisos", icon: "bi-calendar-event" },
  { to: "/foro", label: "Foro", icon: "bi-chat-square-heart" },
];

const adminLinks = [
  { to: "/admin", label: "Panel Admin", icon: "bi-clipboard-check" },
];

function AppNavbar({ role, onRoleChange }) {
  const links = role === "admin" ? adminLinks : citizenLinks;

  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{ background: "var(--color-primary)" }}
      >
        <div className="container">
          <span className="navbar-brand text-white fw-semibold d-flex align-items-center gap-2">
            <i className="bi bi-shield-plus" aria-hidden="true"></i>
            Formosa Sin Dengue
          </span>

          <div className="d-none d-lg-flex align-items-center gap-3 ms-auto">
            <ul className="navbar-nav gap-2">
              {links.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `nav-link text-white ${isActive ? "fw-semibold text-decoration-underline" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <RoleSwitch role={role} onRoleChange={onRoleChange} />
          </div>

          <div className="d-lg-none ms-auto">
            <RoleSwitch role={role} onRoleChange={onRoleChange} compact />
          </div>
        </div>
      </nav>

      <nav className="bottom-nav d-lg-none" aria-label="Navegación principal">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <i className={`bi ${link.icon}`} aria-hidden="true"></i>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

function RoleSwitch({ role, onRoleChange, compact }) {
  return (
    <div
      className="btn-group role-switch"
      role="group"
      aria-label="Selector de rol"
    >
      <button
        type="button"
        className={`btn btn-sm ${role === "citizen" ? "btn-light" : "btn-outline-light"}`}
        onClick={() => onRoleChange("citizen")}
      >
        <i className="bi bi-person" aria-hidden="true"></i>
        {!compact && " Vecino"}
      </button>
      <button
        type="button"
        className={`btn btn-sm ${role === "admin" ? "btn-light" : "btn-outline-light"}`}
        onClick={() => onRoleChange("admin")}
      >
        <i className="bi bi-building" aria-hidden="true"></i>
        {!compact && " Municipio"}
      </button>
    </div>
  );
}

export default AppNavbar;
