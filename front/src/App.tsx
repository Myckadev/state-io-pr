import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogoutButton } from "./features/players/components/LogoutButton";
import { Register } from "./features/players/components/Register";
import { Login } from "./features/players/components/Login";
import {WorldMap} from "./features/worlds/components/WorldPage";
import {Level} from "./features/levels/components/Level";

export default function App() {

  return (
    <Router>
      <nav style={{ marginBottom: '1rem' }}>
        <LogoutButton />
      </nav>
      <Routes>
        <Route path="/" element={<WorldMap />} />
        <Route path="/level/:levelCode" element={<Level />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
