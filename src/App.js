// src/App.js
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Login from "./components/StudentPortal/login/Login.jsx";
import Layout from "./components/StudentPortal/StudentDashboard/Layout";
import Dashboard from "./components/StudentPortal/StudentDashboard/Dashboard.jsx";
import IdentityCards from "./components/StudentPortal/StudentDashboard/IdentityCards";
import RegistrationStatus from "./components/StudentPortal/StudentDashboard/RegistrationStatus";
import Notifications from "./components/StudentPortal/StudentDashboard/Notifications";
import DocumentManagement from "./components/StudentPortal/StudentDashboard/DocumentManagement";
import Help from "./components/StudentPortal/StudentDashboard/Help";
import ProfileOverview from "./components/StudentPortal/StudentDashboard/ProfileOverview";
import EditProfile from "./components/StudentPortal/StudentDashboard/EditProfile";
import QrCodeDisplay from "./components/StudentPortal/StudentDashboard/QrCodeDisplay";
// import PrintIDCard from "./components/StudentPortal/StudentDashboard/PrintIDCard";
import { useSession } from "./context/session.jsx";

export default function App() {
  const { sessionData } = useSession();
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<h2>Error 404 page not found</h2>} />

        {/* New Layout Routes */}
        <Route
          path="/"
          element={sessionData ? <Layout /> : <Navigate to={"/login"} />}
        >
          {/* Include Header and Sidebar here */}

          <Route path="/" element={<Dashboard />} />

          <Route path="/identity-cards" element={<IdentityCards />}>
            <Route path="qr-code-display" element={<QrCodeDisplay />} />
          </Route>

          <Route path="/notifications" element={<Notifications />} />
          <Route path="/registration-status" element={<RegistrationStatus />} />
          {/* <Route path="/print-id-card" element={<PrintIDCard />} /> */}
          <Route path="/document-management" element={<DocumentManagement />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile-overview" element={<ProfileOverview />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
