import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import CitizenDashboard from "./pages/CitizenDashboard.jsx";
import CommunityChallenge from "./pages/CommunityChallenge.jsx";
import MunicipalSchedule from "./pages/MunicipalSchedule.jsx";
import CommunityForum from "./pages/CommunityForum.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  const [role, setRole] = useState("citizen");
  const navigate = useNavigate();

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    navigate(nextRole === "admin" ? "/admin" : "/");
  };

  return (
    <>
      <AppNavbar role={role} onRoleChange={handleRoleChange} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<CitizenDashboard />} />
          <Route path="/retos" element={<CommunityChallenge />} />
          <Route path="/avisos" element={<MunicipalSchedule />} />
          <Route path="/foro" element={<CommunityForum />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
