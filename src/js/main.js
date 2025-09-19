/*
 * APLIKACE PRONAJÍMATEL - MAIN.JS
 * 
 * POPIS ZMĚN (v rámci úkolu na modernizaci dashboard):
 * =====================================================
 * 
 * 1. NOVÁ FUNKCIONALITA:
 *    - Speciální zpracování dlaždice "Správa uživatelů" (data-module="010")
 *    - Po kliknutí na tuto dlaždici se místo standardního modulu zobrazí moderní tabulka uživatelů
 *    - Nová funkce showUserManagementView() pro zobrazení tabulky uživatelů
 *    - Zachování původní logiky pro ostatní dlaždice/moduly
 * 
 * 2. ROZŠÍŘENÉ FUNKCE:
 *    - showDashboard(): rozšířena o skrytí uživatelské tabulky při návratu na dashboard
 *    - openModule(): rozšířena o skrytí uživatelské tabulky při přechodu na jiný modul
 * 
 * 3. ZACHOVANÁ FUNKCIONALITA:
 *    - Sidebar accordion logika zůstává beze změny
 *    - Breadcrumbs logika zůstává beze změny  
 *    - Kliknutí na název aplikace zobrazí dashboard (beze změny)
 *    - Dynamické načítání markdown souborů zůstává funkční
 * 
 * 4. KOMENTÁŘE:
 *    - Všechny nové části jsou označeny komentáři "NOVÉ:"
 *    - Zachována původní struktura a názvy funkcí
 *    - Žádný původní kód nebyl smazán, pouze rozšířen
 */

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
// NOVÉ: Speciální zpracování pro dlaždici "Správa uživatelů" (data-module="010")
document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', function () {
    const moduleId = this.getAttribute('data-module');
    
    // Speciální zpracování pro modul Správa uživatelů (010)
    if (moduleId === '010') {
      showUserManagementView();
    } else {
      // Pro ostatní moduly zachováváme původní chování
      openModule(moduleId);
    }
  });
});

// NOVÉ: Funkce pro zobrazení moderní tabulky uživatelů
function showUserManagementView() {
  // Skryj dashboard a ostatní obsahy
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('tile-content').style.display = 'none';
  document.querySelectorAll('.module-content').forEach(mc => mc.style.display = 'none');
  
  // Zobraz moderní tabulku uživatelů
  const userManagementView = document.getElementById('user-management-view');
  if (userManagementView) {
    userManagementView.style.display = 'block';
  }

  // Rozbal sidebar sekci pro modul 010 (Správa uživatelů)
  document.querySelectorAll('.sidebar-section').forEach(section => {
    if (section.getAttribute('data-module') === '010') {
      section.classList.add('expanded');
    } else {
      section.classList.remove('expanded');
    }
  });
}

// Funkce pro zobrazení dashboardu (hlavního panelu)
function showDashboard() {
  // Zobraz dashboard
  document.getElementById('dashboard').style.display = 'block';
  
  // Skryj všechny moduly a speciální pohledy
  document.querySelectorAll('.module-content').forEach(mc => mc.style.display = 'none');
  document.getElementById('tile-content').style.display = 'block'; // Zachovej tile-content pro markdown loading
  
  // NOVÉ: Skryj moderní tabulku uživatelů při návratu na dashboard
  const userManagementView = document.getElementById('user-management-view');
  if (userManagementView) {
    userManagementView.style.display = 'none';
  }
  
  // Breadcrumbs na dashboardu nesmí být vidět
  const breadcrumbs = document.querySelector('.breadcrumbs');
  if (breadcrumbs) breadcrumbs.style.display = 'none';
}

// Funkce pro otevření modulu (skryje dashboard, ukáže obsah, rozbalí sidebar)
function openModule(moduleId) {
  // Skryj dashboard a speciální pohledy
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('tile-content').style.display = 'block';
  
  // NOVÉ: Skryj moderní tabulku uživatelů při přechodu na jiný modul
  const userManagementView = document.getElementById('user-management-view');
  if (userManagementView) {
    userManagementView.style.display = 'none';
  }
  
  // Skryj všechny moduly a zobraz pouze vybraný
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
