/**
 * Dynamické zobrazení polí ve formuláři podle typu a modulu.
 * Použití: setupForm({module: 'pronajimatel', type: 'firma'})
 */

function setupForm({ module = 'pronajimatel', type = 'firma' }) {
  // Nastav nadpis
  const titleMap = {
    pronajimatel: 'Nový pronajímatel',
    najemnik: 'Nový nájemník',
  };
  const typeLabels = {
    firma: 'Firma',
    'statni-instituce': 'Státní instituce',
    osoba: 'Osoba',
    osvc: 'OSVČ',
    spolek: 'Spolek/skupina',
  };
  document.getElementById('formTitle').textContent = `${titleMap[module] || 'Nový záznam'} – ${typeLabels[type] || type}`;

  // Zobraz jen relevantní pole
  document.querySelectorAll('.form-row').forEach(row => {
    const allowed = (row.dataset.types || '').split(' ');
    if (allowed.includes(type)) {
      row.style.display = '';
      // Povinná pole mají hvězdičku
      row.querySelectorAll('input').forEach(input => {
        if (input.hasAttribute('required')) {
          row.querySelector('.star')?.classList.add('visible');
        }
      });
    } else {
      row.style.display = 'none';
    }
  });

  // Zrušítko
  const cancel = document.getElementById('formCancel');
  if (cancel) {
    cancel.onclick = () => {
      document.getElementById('mainForm').reset();
      if (typeof closeFormModal === 'function') closeFormModal();
    };
  }

  // Submit
  document.getElementById('mainForm').onsubmit = function(e) {
    e.preventDefault();
    // Tady dej logiku pro uložení dat
    alert('Formulář odeslán!');
    if (typeof closeFormModal === 'function') closeFormModal();
  };
}
