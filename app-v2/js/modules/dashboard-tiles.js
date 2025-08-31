// Dashboard modul - hlavní panel s dlaždicemi
window.Dashboard = (function() {
    'use strict';

    let draggedElement = null;

    // Dlaždice pro hlavní panel
    const dashboardTiles = [
        { id: 'byty-prehled', icon: '🏘️', title: 'Byty – přehled', tags: ['#byty', '#nemovitosti'], desc: 'Souhrn jednotek, obsazenost, nájemné' },
        { id: 'najemnici', icon: '👥', title: 'Nájemníci', tags: ['#najemnici'], desc: 'Seznam osob + kontakty' },
        { id: 'smlouvy', icon: '📄', title: 'Smlouvy', tags: ['#smlouvy'], desc: 'Aktivní / končící smlouvy' },
        { id: 'cashflow', icon: '💰', title: 'Cashflow', tags: ['#finance'], desc: 'Nájemné, zálohy, nedoplatky' },
        { id: 'udrzba', icon: '🔧', title: 'Údržba', tags: ['#udrzba'], desc: 'Opravy, požadavky, SLA' },
        { id: 'revize', icon: '🛠️', title: 'Revize', tags: ['#revize'], desc: 'Plynové, elektro, komíny…' },
        { id: 'integrace', icon: '🔗', title: 'Integrace', tags: ['#integrace', '#nastaveni'], desc: 'ARES, e-maily, exporty' },
        { id: 'volne-byty', icon: '🏢', title: 'Volné byty', tags: ['#volne', '#byty'], desc: 'Marketing a inzerce' },
        { id: 'pozadavky', icon: '📝', title: 'Požadavky nájemníků', tags: ['#pozadavky', '#udrzba'], desc: 'Příchozí hlášení závad' },
        { id: 'vyuctovani', icon: '🧾', title: 'Vyúčtování služeb', tags: ['#vyuctovani', '#finance'], desc: 'Voda, teplo, teplá voda…' },
        { id: 'dluznici', icon: '💸', title: 'Dlužníci', tags: ['#dluhy', '#finance'], desc: 'Přehled nedoplatků' },
        { id: 'meridla', icon: '🔋', title: 'Měřidla a odečty', tags: ['#energie'], desc: 'Evidence měřidel, odečty' },
        { id: 'spotreby', icon: '📊', title: 'Spotřeby a grafy', tags: ['#spotreby', '#energie'], desc: 'Vizualizace energií' },
        { id: 'dokumenty', icon: '📁', title: 'Dokumenty', tags: ['#dokumenty'], desc: 'Složky, šablony, archiv' },
        { id: 'reporty', icon: '📑', title: 'Reporty a exporty', tags: ['#reporty'], desc: 'CSV, PDF, účetnictví' },
        { id: 'komunikace', icon: '✉️', title: 'E-maily & SMS', tags: ['#komunikace'], desc: 'Hromadná i cílená komunikace' },
        { id: 'ukonceni', icon: '🔚', title: 'Ukončení nájmů', tags: ['#ukonceni', '#smlouvy'], desc: 'Výpovědi, převzetí, předávací protokoly' }
    ];

    // Render hlavního dashboardu
    function render() {
        const container = document.getElementById('main-content');
        if (!container) return;

        let html = `
            <div class="dashboard-header">
                <h1>Hlavní panel</h1>
                <p class="dashboard-subtitle">Rychlý přístup k důležitým funkcím</p>
            </div>
            <div class="dashboard-tiles">
                ${renderTiles(dashboardTiles)}
            </div>
        `;

        container.innerHTML = html;

        // Inicializace event handlerů
        initializeEventHandlers();
        initializeDragAndDrop();

        // Nastavit stav
        if (window.AppState) {
            AppState.set('currentModule', 'dashboard');
        }
    }

    // Render dlaždic
    function renderTiles(tiles) {
        const tilesOrder = AppState.getTilesOrder();
        
        // Seřadit podle uloženého pořadí
        const sortedTiles = [...tiles].sort((a, b) => {
            const orderA = tilesOrder[a.id] || 999;
            const orderB = tilesOrder[b.id] || 999;
            return orderA - orderB;
        });

        return sortedTiles.map((tile, index) => `
            <div class="tile${AppState.isFavorite(tile.id) ? ' is-favorite' : ''}" 
                 data-tile-id="${tile.id}" 
                 data-order="${tilesOrder[tile.id] || index}"
                 draggable="true">
                <button class="favorite-button${AppState.isFavorite(tile.id) ? ' active' : ''}" 
                        data-tile-id="${tile.id}"
                        title="${AppState.isFavorite(tile.id) ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}">
                    <span class="favorite-icon">⭐</span>
                </button>
                <div class="tile-title">
                    <span class="tile-icon">${tile.icon}</span>
                    ${tile.title}
                </div>
                <div class="tile-tags">
                    ${tile.tags.map(tag => `<span class="tile-tag">${tag}</span>`).join('')}
                </div>
                <div class="tile-desc">${tile.desc}</div>
            </div>
        `).join('');
    }

    // Inicializace event handlerů
    function initializeEventHandlers() {
        // Oblíbené tlačítka
        document.querySelectorAll('.favorite-button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const tileId = this.dataset.tileId;
                const isFavorite = AppState.toggleFavorite(tileId);
                
                // Aktualizuj vzhled tlačítka
                this.classList.toggle('active', isFavorite);
                this.closest('.tile').classList.toggle('is-favorite', isFavorite);
                this.title = isFavorite ? 'Odebrat z oblíbených' : 'Přidat do oblíbených';
                
                App.showToast(
                    isFavorite ? 'Přidáno do oblíbených' : 'Odebráno z oblíbených', 
                    'info'
                );
            });
        });

        // Kliknutí na dlaždice
        document.querySelectorAll('.tile').forEach(tile => {
            tile.addEventListener('click', function(e) {
                if (!e.target.closest('.favorite-button')) {
                    const tileId = this.dataset.tileId;
                    const tileData = dashboardTiles.find(t => t.id === tileId);
                    console.log('Kliknuto na dlaždici:', tileData.title);
                    // TODO: Navigace na příslušný modul
                }
            });
        });
    }

    // Inicializace drag & drop
    function initializeDragAndDrop() {
        const tiles = document.querySelectorAll('.tile');
        
        tiles.forEach(tile => {
            tile.addEventListener('dragstart', handleDragStart);
            tile.addEventListener('dragend', handleDragEnd);
            tile.addEventListener('dragover', handleDragOver);
            tile.addEventListener('drop', handleDrop);
            tile.addEventListener('dragenter', handleDragEnter);
            tile.addEventListener('dragleave', handleDragLeave);
        });
    }

    // Drag & drop handlery
    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        
        // Uložit nové pořadí
        saveTilesOrder();
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('drag-over');
    }

    function handleDragLeave(e) {
        this.classList.remove('drag-over');
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        
        this.classList.remove('drag-over');
        
        if (draggedElement !== this) {
            // Prohoď dlaždice
            const container = this.parentNode;
            const allTiles = [...container.children];
            const draggedIndex = allTiles.indexOf(draggedElement);
            const targetIndex = allTiles.indexOf(this);
            
            if (draggedIndex < targetIndex) {
                container.insertBefore(draggedElement, this.nextSibling);
            } else {
                container.insertBefore(draggedElement, this);
            }
        }
        
        return false;
    }

    // Uložení pořadí dlaždic
    function saveTilesOrder() {
        const order = {};
        document.querySelectorAll('.tile').forEach((tile, index) => {
            order[tile.dataset.tileId] = index;
        });
        AppState.saveTilesOrder(order);
    }

    // Veřejné API
    return {
        render
    };
})();
