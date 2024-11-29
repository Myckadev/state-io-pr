import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogoutButton } from "./features/players/components/LogoutButton";
import { Register } from "./features/players/components/Register";
import { Login } from "./features/players/components/Login";

export default function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '1rem' }}>
        <LogoutButton />
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="/world" element={<World />} />*/}
      </Routes>
    </Router>
  );
}
