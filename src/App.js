import React, { useState } from "react";
import PronajimatelModule from "./modules/Pronajimatel";
import NajemnikModule from "./modules/Najemnik";
import ZastupujiciModule from "./modules/Zastupujici";
import "./App.css";

const modules = [
  { id: "pronajimatel", label: "Pronajímatelé", component: <PronajimatelModule /> },
  { id: "najemnik", label: "Nájemníci", component: <NajemnikModule /> },
  { id: "zastupujici", label: "Zastupující osoby", component: <ZastupujiciModule /> },
];

export default function App() {
  const [active, setActive] = useState("pronajimatel");

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span role="img" aria-label="home">🏠</span>
          <strong>Aplikace pronajímatel</strong>
        </div>
        <nav>
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`nav-item${active === mod.id ? " active" : ""}`}
              onClick={() => setActive(mod.id)}
            >
              {mod.label}
            </div>
          ))}
        </nav>
        <div className="mini">Klikni na modul pro zobrazení.</div>
      </aside>
      <main>
        {modules.find((m) => m.id === active)?.component}
      </main>
    </div>
  );
}