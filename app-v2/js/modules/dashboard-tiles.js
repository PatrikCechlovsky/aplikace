window.Dashboard = (function() {
    'use strict';

    // Dlaždice pro hlavní panel
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

    function render() {
        const container = document.getElementById('main-content');
        if (!container) return;

        let html = `
            <div class="dashboard-header">
                <h1>Hlavní panel</h1>
                <p class="dashboard-subtitle">Rychlý přístup k důležitým funkcím</p>
            </div>
            <div class="dashboard-tiles">
        `;

        dashboardTiles.forEach((tile, index) => {
            html += `
                <div class="tile" data-index="${index}">
                    <div class="tile-title">
                        <span class="tile-icon">${tile.icon}</span>
                        ${tile.title}
                    </div>
                    <div class="tile-tags">
                        ${tile.tags.map(tag => `<span class="tile-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="tile-desc">${tile.desc}</div>
                    <button class="pin-button" title="Přidat do oblíbených">
                        <span class="pin-icon">★</span>
                    </button>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        // Event listenery
        container.querySelectorAll('.pin-button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                App.showToast(this.classList.contains('active') ? 'Přidáno do oblíbených' : 'Odebráno z oblíbených', 'info');
            });
        });

        container.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('click', function(e) {
                if (!e.target.closest('.pin-button')) {
                    const index = this.dataset.index;
                    const tileData = dashboardTiles[index];
                    console.log('Kliknuto na dlaždici:', tileData.title);
                }
            });
        });

        // Nastavit stav
        if (window.AppState) {
            AppState.set('currentModule', 'dashboard');
        }
    }

    return {
        render
    };
})();
