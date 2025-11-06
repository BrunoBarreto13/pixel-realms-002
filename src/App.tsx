import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/dashboard/Home";
import CharacterSheet from "./pages/dashboard/CharacterSheet";
import Library from "./pages/dashboard/library";
import GameTable from "./pages/dashboard/GameTable";
import Settings from "./pages/dashboard/Settings";
import MasterScreen from "./pages/dashboard/MasterScreen";
import HealthCheck from "./pages/dashboard/HealthCheck";

const App = () => (
  <div className="font-pixel">
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="character-sheet" element={<CharacterSheet />} />
        <Route path="library" element={<Library />} />
        <Route path="game-table" element={<GameTable />} />
        <Route path="settings" element={<Settings />} />
        <Route path="master-screen" element={<MasterScreen />} />
        <Route path="health-check" element={<HealthCheck />} />
      </Route>

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);

export default App;