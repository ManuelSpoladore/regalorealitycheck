import React, { useState } from "react";

const API_URL = "https://manuesse.netsons.org/gift-api/evaluate_gifts.php";

export default function GiftForm() {
  const [name, setName] = useState("");
  const [gift1, setGift1] = useState("");
  const [gift2, setGift2] = useState("");
  const [gift3, setGift3] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { name, message }
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

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

      // Salviamo il risultato (nome incluso), poi puliamo i campi
      setResult({ name: data.name || "", message: data.message });

      setName("");
      setGift1("");
      setGift2("");
      setGift3("");
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

      {result && (
        <div className="results-card">
          <h3>
            {result.name
              ? `Okay ${result.name}, ecco la mia opinione:`
              : "Ecco la mia opinione sui tuoi regali:"}
          </h3>
          <p className="result-message">
            {result.message}
          </p>
        </div>
      )}
    </section>
  );
}
