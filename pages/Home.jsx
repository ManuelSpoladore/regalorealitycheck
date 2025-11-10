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
          realismo con un pizzico di ironia.
        </p>
        <Link to="/play" className="cta-button">
          Inizia il test 🎁
        </Link>
      </div>
    </section>
  );
}
