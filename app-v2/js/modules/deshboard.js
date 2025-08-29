// Modul pro správu dlaždiček na dashboard
window.DashboardTiles = (function() {
    'use strict';
    
    let draggedElement = null;
    let tilesOrder = [];
    
    // Inicializace drag & drop
    function initDragAndDrop() {
        const tiles = document.querySelectorAll('.tile');
        
        tiles.forEach(tile => {
            tile.draggable = true;
            
            tile.addEventListener('dragstart', handleDragStart);
            tile.addEventListener('dragend', handleDragEnd);
            tile.addEventListener('dragover', handleDragOver);
            tile.addEventListener('drop', handleDrop);
            tile.addEventListener('dragenter', handleDragEnter);
            tile.addEventListener('dragleave', handleDragLeave);
        });
        
        // Načti uložené pořadí
        loadTilesOrder();
    }
    
    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
    
    function handleDragEnd(e) {
        this.classList.remove('dragging');
        
        // Ulož nové pořadí
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
    
    // Uložení pořadí dlaždiček
    function saveTilesOrder() {
        const container = document.getElementById('moduleTiles');
        if (!container) return;
        
        const order = [...container.children].map(tile => tile.dataset.moduleId);
        AppState.set('tilesOrder', order);
    }
    
    // Načtení uloženého pořadí
    function loadTilesOrder() {
        const savedOrder = AppState.get('tilesOrder');
        if (!savedOrder || savedOrder.length === 0) return;
        
        const container = document.getElementById('moduleTiles');
        if (!container) return;
        
        // Seřaď dlaždice podle uloženého pořadí
        savedOrder.forEach(moduleId => {
            const tile = container.querySelector(`[data-module-id="${moduleId}"]`);
            if (tile) {
                container.appendChild(tile);
            }
        });
    }
    
    // Vytvoření dlaždice
    function createTile(module, isPinned = false) {
        const tile = document.createElement('div');
        tile.className = 'tile' + (isPinned ? ' pinned' : '');
        tile.dataset.moduleId = module.id;
        tile.draggable = true;
        
        // Získej hashtagy podle modulu
        const tags = getModuleTags(module.id);
        
        tile.innerHTML = `
            <button class="pin-button" title="Připnout na hlavní panel" onclick="event.stopPropagation(); DashboardTiles.togglePin('${module.id}')">
                <span class="pin-icon">⭐</span>
            </button>
            <div class="tile-icon">${module.icon}</div>
            <div class="tile-title">${module.name}</div>
            <div class="tile-description">${module.description}</div>
            ${tags.length > 0 ? `
                <div class="tile-tags">
                    ${tags.map(tag => `<span class="tile-tag">#${tag}</span>`).join('')}
                </div>
            ` : ''}
        `;
        
        // Kliknutí na dlaždici
        tile.addEventListener('click', (e) => {
            if (e.target.closest('.pin-button')) return;
            Sidebar.openModule(module.id, module.types[0].id);
        });
        
        return tile;
    }
    
    // Získání hashtagů pro modul
    function getModuleTags(moduleId) {
        const tagMap = {
            'pronajimatel': ['byty', 'nemovitosti'],
            'najemnici': ['najemnici'],
            'nemovitosti': ['byty', 'nemovitosti'],
            'smlouvy': ['smlouvy'],
            'platby': ['finance'],
            'sluzby': ['udrzba'],
            'reporty': ['reporty'],
            'finance': ['finance'],
            'energie': ['energie'],
            'udrzba': ['udrzba'],
            'dokumenty': ['dokumenty'],
            'komunikace': ['komunikace'],
            'uzivatele': ['integrace', 'nastaveni'],
            'nastaveni': ['integrace', 'nastaveni'],
            'muj-ucet': ['nastaveni']
        };
        
        return tagMap[moduleId] || [];
    }
    
    // Připnutí/odepnutí dlaždice
    function togglePin(moduleId) {
        const pinnedItems = AppState.get('pinnedItems') || [];
        const itemIndex = pinnedItems.findIndex(item => item.id === moduleId);
        
        if (itemIndex > -1) {
            // Odepnout
            pinnedItems.splice(itemIndex, 1);
            App.showToast('Odepnuto z hlavního panelu', 'info');
        } else {
            // Připnout
            pinnedItems.push({ 
                id: moduleId, 
                type: 'module',
                pinnedAt: new Date().toISOString()
            });
            App.showToast('Připnuto na hlavní panel', 'success');
        }
        
        AppState.set('pinnedItems', pinnedItems);
        
        // Aktualizuj dashboard
        if (!AppState.get('currentModule')) {
            renderDashboard();
        }
    }
    
    // Vykreslení dashboard
    function renderDashboard() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <div class="dashboard-header">
                <h1>Hlavní panel</h1>
                <p>Rychlý přístup k důležitým funkcím</p>
            </div>
            
            <div class="pinned-section">
                <h2>⭐ Připnuté</h2>
                <div class="tiles-grid" id="pinnedTiles"></div>
            </div>
            
            <div class="modules-section">
                <h2>📦 Moduly</h2>
                <div class="tiles-grid" id="moduleTiles"></div>
            </div>
        `;
        
        // Načti připnuté položky
        const pinnedItems = AppState.get('pinnedItems') || [];
        const pinnedContainer = document.getElementById('pinnedTiles');
        
        if (pinnedItems.length === 0) {
            pinnedContainer.innerHTML = '<p class="empty-state">Zatím nemáte žádné připnuté položky. Klikněte na hvězdičku u libovolné dlaždice.</p>';
        } else {
            pinnedItems.forEach(item => {
                const module = APP_CONFIG.modules.find(m => m.id === item.id);
                if (module) {
                    pinnedContainer.appendChild(createTile(module, true));
                }
            });
        }
        
        // Zobraz všechny moduly
        const tilesContainer = document.getElementById('moduleTiles');
        const modules = APP_CONFIG.modules;
        
        modules.forEach(module => {
            tilesContainer.appendChild(createTile(module));
        });
        
        // Inicializuj drag & drop
        setTimeout(() => initDragAndDrop(), 100);
    }
    
    // Veřejné API
    return {
        init: renderDashboard,
        togglePin,
        renderDashboard
    };
})();
