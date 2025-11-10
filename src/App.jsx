import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import GiftForm from "../pages/GiftForm";

export default function App() {
  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="logo">
          🎁 Gift Reality Check
        </Link>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/play" className="nav-link primary">Prova ora</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<GiftForm />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>Made with ❤️ & sarcasmo</p>
      </footer>
    </div>
  );
}
