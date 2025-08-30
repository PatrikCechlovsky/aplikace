window.Sidebar = (function() {
    'use strict';

    let activeModule = null;

    // Seznam modulů
    const menuItems = [
        {
            id: 'pronajimatel',
            label: 'Pronajímatel',
            icon: '👤',
            children: [
                { label: 'Přehled', icon: '', },
                { label: 'Osoba', icon: '', },
                { label: 'OSVČ', icon: '🧑‍💼', },
                { label: 'Firma', icon: '🏢', },
                { label: 'Spolek/skupina', icon: '👥', },
                { label: 'Státní instituce', icon: '🏛️', }
            ]
        },
        {
            id: 'najemnici',
            label: 'Nájemníci',
            icon: '👥',
            children: [
                { label: 'Přehled', icon: '', },
                { label: 'Osoba', icon: '', },
                { label: 'OSVČ', icon: '🧑‍💼', },
                { label: 'Firma', icon: '🏢', },
                { label: 'Spolek/skupina', icon: '👥', },
                { label: 'Státní instituce', icon: '🏛️', }
            ]
        },
        { id: 'nemovitosti', label: 'Nemovitosti', icon: '🏘️' },
        { id: 'smlouvy', label: 'Smlouvy', icon: '📄' },
        { id: 'platby', label: 'Platby', icon: '💸' },
        { id: 'sluzby', label: 'Služby', icon: '⚡' },
        { id: 'reporty', label: 'Reporty & Grafy', icon: '📊' },
        { id: 'finance', label: 'Finance', icon: '💰' },
        { id: 'energie', label: 'Energie', icon: '🔋' },
        { id: 'udrzba', label: 'Údržba', icon: '🔧' },
        { id: 'dokumenty', label: 'Dokumenty', icon: '📁' },
        { id: 'komunikace', label: 'Komunikace', icon: '✉️' },
        { id: 'uzivatele', label: 'Uživatelé & Role', icon: '🧑‍🤝‍🧑' },
        { id: 'nastaveni', label: 'Nastavení', icon: '⚙️' },
        { id: 'muj-ucet', label: 'Můj účet', icon: '👤' }
    ];

    // Přehled dlaždic pro hlavní panel
    const dashboardTiles = [
        { icon: '🏘️', title: 'Byty – přehled', tags: ['#byty', '#nemovitosti'], desc: 'Souhrn jednotek, obsazenost, nájemné' },
        { icon: '👥', title: 'Nájemníci', tags: ['#najemnici'], desc: 'Seznam osob + kontakty' },
        { icon: '📄', title: 'Smlouvy', tags: ['#smlouvy'], desc: 'Aktivní / končící smlouvy' },
        { icon: '💰', title: 'Cashflow', tags: ['#finance'], desc: 'Nájemné, zálohy, nedoplatky' },
        { icon: '🔧', title: 'Údržba', tags: ['#udrzba'], desc: 'Opravy, požadavky, SLA' },
        { icon: '🛠️', title: 'Revize', tags: ['#revize'], desc: 'Plynové, elektro, komíny…' },
        { icon: '🔗', title: 'Integrace', tags: ['#integrace', '#nastaveni'], desc: 'ARES, e-maily, exporty' },
        { icon: '🏢', title: 'Volné byty', tags: ['#volne', '#byty'], desc: 'Marketing a inzerce' },
        { icon: '📝', title: 'Požadavky nájemníků', tags: ['#pozadavky', '#udrzba'], desc: 'Příchozí hlášení závad' },
        { icon: '🧾', title: 'Vyúčtování služeb', tags: ['#vyuctovani', '#finance'], desc: 'Voda, teplo, teplá voda…' },
        { icon: '💸', title: 'Dlužníci', tags: ['#dluhy', '#finance'], desc: 'Přehled nedoplatků' },
        { icon: '🔋', title: 'Měřidla a odečty', tags: ['#energie'], desc: 'Evidence měřidel, odečty' },
        { icon: '📊', title: 'Spotřeby a grafy', tags: ['#spotreby', '#energie'], desc: 'Vizualizace energií' },
        { icon: '📁', title: 'Dokumenty', tags: ['#dokumenty'], desc: 'Složky, šablony, archiv' },
        { icon: '📑', title: 'Reporty a exporty', tags: ['#reporty'], desc: 'CSV, PDF, účetnictví' },
        { icon: '✉️', title: 'E-maily & SMS', tags: ['#komunikace'], desc: 'Hromadná i cílená komunikace' },
        { icon: '🔚', title: 'Ukončení nájmů', tags: ['#ukonceni', '#smlouvy'], desc: 'Výpovědi, převzetí, předávací protokoly' }
    ];

    function renderSidebar() {
        const nav = document.getElementById('navigation');
        if (!nav) return;

        let html = `<div class="brand"><span class="nav-icon">🏠</span> Aplikace pronajímatel</div>`;
        menuItems.forEach(item => {
            const isExpanded = activeModule === item.id;
            if (item.children) {
                html += `
                    <div class="nav-section${isExpanded ? ' expanded' : ''}" data-module="${item.id}">
                        <button class="nav-parent" data-action="${item.id}">
                            <span class="chevron">▶</span>
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                        </button>
                        <div class="nav-children" style="display:${isExpanded ? 'block' : 'none'};">
                            ${item.children.map(child => `
                                <button class="nav-item nav-child" data-action="${item.id}-${child.label}">
                                    ${child.icon ? `<span class="nav-icon">${child.icon}</span>` : ''}
                                    <span class="nav-label">${child.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="nav-section" data-module="${item.id}">
                        <button class="nav-item" data-action="${item.id}">
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                        </button>
                    </div>
                `;
            }
        });

        nav.innerHTML = html;

        // Kliknutí na nav-parent (modul)
        nav.querySelectorAll('.nav-parent').forEach(btn => {
            btn.onclick = function(e) {
                const section = btn.closest('.nav-section');
                const moduleId = section.getAttribute('data-module');
                // Pokud klikneš podruhé na stejný modul, sbal ho a zobraz hlavní panel
                if (activeModule === moduleId) {
                    activeModule = null;
                    renderSidebar();
                    renderDashboard();
                } else {
                    activeModule = moduleId;
                    renderSidebar();
                    renderModuleTiles(moduleId);
                }
            };
        });

        // Kliknutí na nav-child (podmodul)
        nav.querySelectorAll('.nav-child').forEach(btn => {
            btn.onclick = function(e) {
                // Můžeš zde doplnit logiku pro podmoduly
            };
        });
    }

    // Hlavní panel – dashboard dlaždice
    function renderDashboard() {
        const main = document.getElementById('main-content');
        if (!main) return;
        let html = `<div class="dashboard-header"><h1>Hlavní panel</h1></div>`;
        html += `<div class="dashboard-tiles">`;
        dashboardTiles.forEach(tile => {
            html += `
                <div class="tile">
                    <div class="tile-title">
                        <span class="tile-icon">${tile.icon}</span>
                        ${tile.title}
                    </div>
                    <div class="tile-tags">
                        ${tile.tags.map(tag => `<span class="tile-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="tile-desc">${tile.desc}</div>
                    <button class="pin-button" title="Přidat do hlavního panelu">
                        <span class="pin-icon">★</span>
                    </button>
                </div>
            `;
        });
        html += `</div>`;
        main.innerHTML = html;

        // Funkce připínání (zatím pouze vizuální)
        main.querySelectorAll('.pin-button').forEach(btn => {
            btn.onclick = function() {
                btn.classList.toggle('active');
                // Sem můžeš doplnit logiku pro připínání dlaždic
            };
        });
    }

    // Dlaždice pro konkrétní modul (zatím jen placeholder)
    function renderModuleTiles(moduleId) {
        const main = document.getElementById('main-content');
        if (!main) return;
        const item = menuItems.find(mi => mi.id === moduleId);
        let html = `<div class="dashboard-header"><h1>${item.label}</h1></div>`;
        html += `<div class="dashboard-tiles">`;
        // Zde můžeš generovat dlaždice pro daný modul, zatím placeholder
        html += `<div class="tile">
            <div class="tile-title"><span class="tile-icon">${item.icon}</span> ${item.label}</div>
            <div class="tile-desc">Dlaždice modulu <b>${item.label}</b></div>
            <button class="pin-button">
                <span class="pin-icon">★</span>
            </button>
        </div>`;
        html += `</div>`;
        main.innerHTML = html;
    }

    // Inicializace při načtení stránky
    function init() {
        renderSidebar();
        renderDashboard();
    }

    return {
        render: init,
        renderSidebar,
        renderDashboard
    };
})();

// Při načtení stránky
window.addEventListener('DOMContentLoaded', () => {
    Sidebar.render();
});
