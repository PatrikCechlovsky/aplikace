// Přepínání témat (barevných schémat)
function setTheme(theme) {
  document.body.className = 'theme-' + theme;
}

// Logika pro home-button (část 1)
document.addEventListener('DOMContentLoaded', function () {
  const homeButton = document.getElementById('home-button');
  if (homeButton) {
    homeButton.addEventListener('click', function () {
      if (window.unsavedWork) {
        if (!confirm('Chcete odejít bez uložení rozdělané práce?')) return;
      }
      // Reset obsahu do původního stavu
      const breadcrumbs = document.getElementById('breadcrumbs');
      const sectionTitle = document.getElementById('section-title');
      const mainActionBtn = document.getElementById('main-action-btn');
      const content = document.getElementById('content');
      if (breadcrumbs) breadcrumbs.textContent = 'Hlavní panel';
      if (sectionTitle) sectionTitle.textContent = '';
      if (mainActionBtn) mainActionBtn.innerHTML = '';
      if (content) content.innerHTML = '<p>Vítejte na hlavním panelu.</p>';
      // window.unsavedWork = false; // pokud použiješ detekci neuložené práce
    });
  }

  // Přepínač témat – umožní změnit styl kliknutím na tlačítko
  document.querySelectorAll('.theme-switcher button').forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(btn.dataset.theme);
    });
  });
});

// Zde můžeš postupně přidávat další logiku pro ostatní části UI...
