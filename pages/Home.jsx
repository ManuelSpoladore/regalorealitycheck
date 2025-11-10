import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Quanto sono <span>realistici</span> i tuoi regali dei sogni?
        </h1>
        <p>
          Scrivi tre regali che vorresti ricevere e lascia che il nostro
          oracolo spietato ti dica la verità. Niente frasi motivazionali, solo
          onestà con un pizzico di ironia.
        </p>
        <Link to="/play" className="cta-button">
          Inizia il test 🎁
        </Link>
      </div>
      <div className="hero-card">
        <p className="hero-label">Esempio</p>
        <ul>
          <li>🏎️ Ferrari</li>
          <li>📱 iPhone 16 Pro Max</li>
          <li>☕ Colazione a letto</li>
        </ul>
        <p className="hero-note">
          Spoiler: uno solo è davvero probabile.
        </p>
      </div>
    </section>
  );
}
