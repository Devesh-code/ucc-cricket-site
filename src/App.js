import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Papa from "papaparse";

function loadCSV(path, setData) {
  fetch(path)
    .then((res) => res.text())
    .then((text) => {
      Papa.parse(text, {
        header: true,
        complete: (results) => setData(results.data),
      });
    });
}

function Home() {
  return (
    <div className="text-center">
      {/* BANNER SECTION */}
      <div
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1623936079413-191d3a5bb5f2?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 20px",
          color: "#fff",
        }}
      >
        <img
          src="/ucc-logo.png"
          alt="UCC Logo"
          style={{ maxWidth: "150px", marginBottom: "20px" }}
        />
        <h1 className="text-4xl font-bold mb-2">Welcome to United Cricket Club</h1>
        <p className="text-xl">Since 2008 — Unity. Passion. Cricket.</p>
      </div>

      {/* PLAYER SPOTLIGHT SECTION */}
      <div className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">🌟 Player Spotlight</h2>
        <p className="text-lg">🏏 <strong>Dev Singh</strong> – All-Rounder</p>
        <p>🔥 12 Matches | MVP in 4 Games | Balanced Bat & Ball</p>
      </div>
    </div>
  );
}

function Players() {
  const [players, setPlayers] = useState([]);
  useEffect(() => loadCSV("/players.csv", setPlayers), []);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">UCC Players</h2>
      <ul className="space-y-2">
        {players.map((p, idx) => (
          <li key={idx} className="border p-2 rounded shadow">
            <strong>{p.Name}</strong> – {p.Role} – Matches: {p.Matches}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Schedule() {
  const [games, setGames] = useState([]);
  useEffect(() => loadCSV("/schedule.csv", setGames), []);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Match Schedule</h2>
      <ul className="space-y-2">
        {games.map((g, idx) => (
          <li key={idx} className="border p-2 rounded">
            {g.Date} – {g.Opponent} at {g.Location}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Standings() {
  const [table, setTable] = useState([]);
  useEffect(() => loadCSV("/standings.csv", setTable), []);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">League Standings</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-2">Team</th>
            <th className="border px-2">Points</th>
            <th className="border px-2">Wins</th>
            <th className="border px-2">Losses</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2">{row.Team}</td>
              <td className="border px-2">{row.Points}</td>
              <td className="border px-2">{row.Wins}</td>
              <td className="border px-2">{row.Losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="bg-blue-600 p-4 text-white space-x-4">
        <Link to="/">Home</Link>
        <Link to="/players">Players</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/standings">Standings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </Router>
  );
}
