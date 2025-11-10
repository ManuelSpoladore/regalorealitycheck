import React, { useState } from "react";

const API_URL = "https://manuesse.netsons.org/gift-api/evaluate_gifts.php"; // adatta il path in base a dove metti i file PHP

export default function GiftForm() {
  const [name, setName] = useState("");
  const [gift1, setGift1] = useState("");
  const [gift2, setGift2] = useState("");
  const [gift3, setGift3] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResults(null);

    if (!gift1 || !gift2 || !gift3) {
      setError("Inserisci tutti e tre i regali.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gift1, gift2, gift3 }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Errore sconosciuto");
      }

      setResults(data);
    } catch (err) {
      setError(err.message || "Errore di connessione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-section">
      <div className="form-card">
        <h2>Scrivi i tuoi tre regali</h2>
        <p className="subtitle">Promesso: non giudichiamo (troppo).</p>

        <form onSubmit={handleSubmit} className="gift-form">
          <div className="field">
            <label>Nome (opzionale)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Regalo 1</label>
            <input
              type="text"
              value={gift1}
              onChange={(e) => setGift1(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Regalo 2</label>
            <input
              type="text"
              value={gift2}
              onChange={(e) => setGift2(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Regalo 3</label>
            <input
              type="text"
              value={gift3}
              onChange={(e) => setGift3(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert error">{error}</div>}

          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? "Calcolo in corso..." : "Valuta i miei desideri 🎲"}
          </button>
        </form>
      </div>

      {results && (
        <div className="results-card">
          <h3>
            {results.name
              ? `Okay ${results.name}, ecco il verdetto:`
              : "Ecco il verdetto dei tuoi desideri:"}
          </h3>
          <ul className="results-list">
            {results.results.map((r, i) => (
              <li key={i} className="result-item">
                <div className="gift-label">🎁 {r.gift}</div>
                <div className="gift-message">{r.message}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
