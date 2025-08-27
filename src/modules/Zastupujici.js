import React, { useState } from "react";
import { zastupujiciFields } from "../schema/fields";

export default function ZastupujiciModule() {
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
        <h2>Seznam zastupujících osob</h2>
        <button className="btn primary" onClick={() => setShowForm(true)}>+ Přidat zastupující osobu</button>
        <table style={{ width: "100%", marginTop: "16px" }}>
          <thead>
            <tr>
              <th>Jméno</th>
              <th>Příjmení</th>
              <th>Typ zastoupení</th>
              <th>Koho zastupuje</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.jmeno}</td>
                <td>{item.prijmeni}</td>
                <td>{item.typZastoupeni}</td>
                <td>{item.kohoZastupuje}</td>
                <td>{/* Akce: Edit/Smazat */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="card">
          <h2>Přidat zastupující osobu</h2>
          <form onSubmit={handleSubmit}>
            {zastupujiciFields().map((field) => (
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