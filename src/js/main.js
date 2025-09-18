// Sidebar accordion logic
document.querySelectorAll('.sidebar-section-header').forEach(header => {
  header.addEventListener('click', function (e) {
    const section = this.closest('.sidebar-section');
    // Pokud má sekce submenu, umožníme rozbalování
    if (header.nextElementSibling && header.nextElementSibling.classList.contains('sidebar-sublist')) {
      // Pokud už je rozbalená, zabal ji
      if (section.classList.contains('expanded')) {
        section.classList.remove('expanded');
      } else {
        // Jinak zabal všechny ostatní a rozbal tuhle
        document.querySelectorAll('.sidebar-section').forEach(s => s.classList.remove('expanded'));
        section.classList.add('expanded');
      }
    }
    e.stopPropagation();
  });
});

// Počáteční stav: vše zabaleno a zobrazí se dashboard
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sidebar-section').forEach(s => s.classList.remove('expanded'));
  showDashboard();
});

// Kliknutí na název aplikace zavře vše a zobrazí dashboard
document.getElementById('app-title').addEventListener('click', () => {
  document.querySelectorAll('.sidebar-section').forEach(s => s.classList.remove('expanded'));
  showDashboard();
});

// Kliknutím na dlaždici se otevře modul a rozbalí sidebar
document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', function () {
    const moduleId = this.getAttribute('data-module');
    openModule(moduleId);
  });
});

// Funkce pro zobrazení dashboardu (hlavního panelu)
function showDashboard() {
  document.getElementById('dashboard').style.display = 'block';
  document.querySelectorAll('.module-content').forEach(mc => mc.style.display = 'none');
  // Breadcrumbs na dashboardu nesmí být vidět
  const breadcrumbs = document.querySelector('.breadcrumbs');
  if (breadcrumbs) breadcrumbs.style.display = 'none';
}

// Funkce pro otevření modulu (skryje dashboard, ukáže obsah, rozbalí sidebar)
function openModule(moduleId) {
  document.getElementById('dashboard').style.display = 'none';
  document.querySelectorAll('.module-content').forEach(mc => mc.style.display = 'none');
  const curr = document.getElementById('module-' + moduleId);
  if (curr) curr.style.display = 'block';

  // Rozbal sidebar sekci pro daný modul
  document.querySelectorAll('.sidebar-section').forEach(section => {
    if (section.getAttribute('data-module') === moduleId) {
      section.classList.add('expanded');
    } else {
      section.classList.remove('expanded');
    }
  });

  // Breadcrumbs na modulech zobraz a nastav správný text
  const breadcrumbs = document.querySelector('.breadcrumbs');
  if (breadcrumbs) {
    const section = document.querySelector('.sidebar-section[data-module="' + moduleId + '"] .sidebar-section-title');
    if (section) {
      breadcrumbs.textContent = 'Hlavní panel > ' + section.textContent.trim();
      breadcrumbs.style.display = 'block';
    } else {
      // Fallback: aspoň zobrazit Hlavní panel
      breadcrumbs.textContent = 'Hlavní panel';
      breadcrumbs.style.display = 'block';
    }
  }
}
