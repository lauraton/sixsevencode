import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import AppNavbar from "./components/AppNavbar.jsx";
import Home from "./pages/Home.jsx";
import Alerts from "./pages/Alerts.jsx";
import CitizenReports from "./pages/CitizenReports.jsx";
import CommunityChallenge from "./pages/CommunityChallenge.jsx";
import MunicipalSchedule from "./pages/MunicipalSchedule.jsx";
import CommunityForum from "./pages/CommunityForum.jsx";
import News from "./pages/News.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <AppProvider>
      <AppNavbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alertas" element={<Alerts />} />
          <Route path="/reportes" element={<CitizenReports />} />
          <Route path="/retos" element={<CommunityChallenge />} />
          <Route path="/avisos" element={<MunicipalSchedule />} />
          <Route path="/foro" element={<CommunityForum />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </AppProvider>
  );
}

export default App;
