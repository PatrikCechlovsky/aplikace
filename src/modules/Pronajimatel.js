import React, { useState } from "react";
import { pronajimatelFields } from "../schema/fields";

export default function PronajimatelModule() {
  const [form, setForm] = useState({});
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setList([...list, { ...form, id: Date.now() }]);
    setForm({});
    setShowForm(false);
  };

  return (
    <div>
      <div className="card">
        <h2>Seznam pronajímatelů</h2>
        <button className="btn primary" onClick={() => setShowForm(true)}>+ Přidat pronajímatele</button>
        <table style={{ width: "100%", marginTop: "16px" }}>
          <thead>
            <tr>
              <th>Typ</th>
              <th>Jméno / Název</th>
              <th>E-mail</th>
              <th>IČ</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.typMajitele}</td>
                <td>{item.jmeno || item.nazevSpolecnosti || item.nazevSpolku}</td>
                <td>{item.email}</td>
                <td>{item.ic}</td>
                <td>
                  {/* Akce: Edit/Smazat */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="card">
          <h2>Přidat pronajímatele</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label>Typ pronajímatele</label>
                <select name="typMajitele" value={form.typMajitele || ""} onChange={handleChange} required>
                  <option value="">Vyberte</option>
                  <option value="Osoba">Osoba</option>
                  <option value="OSVČ">OSVČ</option>
                  <option value="Firma">Firma</option>
                  <option value="Spolek / Skupina">Spolek / Skupina</option>
                </select>
              </div>
              <div>
                <label>ARES</label>
                <button className="btn ghost" type="button">Vyhledat v ARES</button>
              </div>
            </div>
            {pronajimatelFields(form.typMajitele).map((field) => (
              <div key={field.name}>
                <label>
                  {field.label}
                  {field.required && " *"}
                </label>
                {field.type === "select" ? (
                  <select name={field.name} value={form[field.name] || ""} onChange={handleChange} required={field.required}>
                    <option value="">Vyberte</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input name={field.name} type={field.inputType} value={form[field.name] || ""} onChange={handleChange} required={field.required} />
                )}
              </div>
            ))}
            <button className="btn primary" type="submit">Uložit</button>
            <button className="btn ghost" type="button" onClick={() => setShowForm(false)}>Zrušit</button>
          </form>
        </div>
      )}
    </div>
  );
}