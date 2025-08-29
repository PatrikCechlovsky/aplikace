// Pomocná funkce pro vytvoření dlaždice s hvězdičkou v každém modulu
window.ModuleTiles = (function() {
    'use strict';
    
    // Vytvoření dlaždice s možností připnutí
    function createTileWithPin(config) {
        const { id, icon, title, description, onClick, type = 'custom' } = config;
        const isPinned = isPinnedItem(id, type);
        
        const tileHTML = `
            <div class="module-tile" data-tile-id="${id}" data-tile-type="${type}">
                <button class="pin-button ${isPinned ? 'active' : ''}" 
                        title="${isPinned ? 'Odepnout z hlavního panelu' : 'Připnout na hlavní panel'}" 
                        onclick="event.stopPropagation(); ModuleTiles.togglePin('${id}', '${type}')">
                    <span class="pin-icon">⭐</span>
                </button>
                <div class="tile-content">
                    <div class="tile-icon">${icon}</div>
                    <div class="tile-title">${title}</div>
                    ${description ? `<div class="tile-description">${description}</div>` : ''}
                </div>
            </div>
        `;
        
        // Pokud máme onClick, přidáme ho po vykreslení
        if (onClick) {
            setTimeout(() => {
                const tile = document.querySelector(`[data-tile-id="${id}"] .tile-content`);
                if (tile) {
                    tile.onclick = onClick;
                    tile.style.cursor = 'pointer';
                }
            }, 10);
        }
        
        return tileHTML;
    }
    
    // Vytvoření gridu dlaždiček
    function createTilesGrid(tiles) {
        return `
            <div class="tiles-grid">
                ${tiles.map(tile => createTileWithPin(tile)).join('')}
            </div>
        `;
    }
    
    // Kontrola zda je položka připnutá
    function isPinnedItem(id, type = 'custom') {
        const pinnedItems = AppState.get('pinnedItems') || [];
        return pinnedItems.some(item => item.id === id && (item.type === type || (!item.type && type === 'module')));
    }
    
    // Připnutí/odepnutí položky
    function togglePin(itemId, itemType = 'custom') {
        const pinnedItems = AppState.get('pinnedItems') || [];
        const itemIndex = pinnedItems.findIndex(item => 
            item.id === itemId && (item.type === itemType || (!item.type && itemType === 'module'))
        );
        
        if (itemIndex > -1) {
            // Odepnout
            pinnedItems.splice(itemIndex, 1);
            App.showToast('Odepnuto z hlavního panelu', 'info');
            
            // Aktualizuj hvězdičku
            updatePinButton(itemId, false);
        } else {
            // Připnout - najdi informace o položce
            const tileElement = document.querySelector(`[data-tile-id="${itemId}"]`);
            if (tileElement) {
                const title = tileElement.querySelector('.tile-title')?.textContent || '';
                const icon = tileElement.querySelector('.tile-icon')?.textContent || '📌';
                const description = tileElement.querySelector('.tile-description')?.textContent || '';
                
                const pinnedItem = { 
                    id: itemId,
                    type: itemType,
                    title,
                    icon,
                    description,
                    pinnedAt: new Date().toISOString()
                };
                
                // Pro moduly přidáme dodatečné info
                if (itemType === 'module') {
                    const module = APP_CONFIG.modules.find(m => m.id === itemId);
                    if (module) {
                        pinnedItem.moduleId = itemId;
                        pinnedItem.firstTypeId = module.types[0]?.id || 'all';
                    }
                }
                
                pinnedItems.push(pinnedItem);
                
                App.showToast('Připnuto na hlavní panel', 'success');
                updatePinButton(itemId, true);
            }
        }
        
        AppState.set('pinnedItems', pinnedItems);
        
        // Pokud jsme na hlavním panelu, aktualizuj ho
        if (!AppState.get('currentModule')) {
            Sidebar.showDashboard();
        }
    }
    
    // Aktualizace stavu tlačítka
    function updatePinButton(itemId, isPinned) {
        const button = document.querySelector(`[data-tile-id="${itemId}"] .pin-button`);
        if (button) {
            button.classList.toggle('active', isPinned);
            button.title = isPinned ? 'Odepnout z hlavního panelu' : 'Připnout na hlavní panel';
        }
    }
    
    // Příklady použití v modulech
    function createModuleOverview(moduleId, sections) {
        const module = APP_CONFIG.modules.find(m => m.id === moduleId);
        if (!module) return '';
        
        let html = `
            <div class="module-overview">
                <h2>${module.icon} ${module.name}</h2>
                <p class="module-description">${module.description}</p>
        `;
        
        // Přidej sekce s dlaždicemi
        sections.forEach(section => {
            html += `
                <div class="module-section">
                    <h3>${section.title}</h3>
                    ${createTilesGrid(section.tiles)}
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // Pomocná funkce pro vytvoření rychlých akcí
    function createQuickActions(actions) {
        const tiles = actions.map(action => ({
            id: `action-${action.id}`,
            icon: action.icon,
            title: action.title,
            description: action.description,
            onClick: action.onClick,
            type: 'action'
        }));
        
        return createTilesGrid(tiles);
    }
    
    // Pomocná funkce pro vytvoření statistik jako dlaždiček
    function createStatTiles(stats) {
        const tiles = stats.map(stat => ({
            id: `stat-${stat.id}`,
            icon: stat.icon || '📊',
            title: stat.value,
            description: stat.label,
            onClick: stat.onClick,
            type: 'stat'
        }));
        
        return createTilesGrid(tiles);
    }
    
    // Příklad použití pro modul Pronajímatel
    function examplePronajimatelOverview() {
        return createModuleOverview('pronajimatel', [
            {
                title: 'Rychlé akce',
                tiles: [
                    {
                        id: 'pronajimatel-pridat-osobu',
                        icon: '👤',
                        title: 'Přidat osobu',
                        description: 'Nový pronajímatel - fyzická osoba',
                        onClick: () => FormsExtended.openPronajimatelForm('osoba'),
                        type: 'action'
                    },
                    {
                        id: 'pronajimatel-pridat-firmu',
                        icon: '🏢',
                        title: 'Přidat firmu',
                        description: 'Nový pronajímatel - právnická osoba',
                        onClick: () => FormsExtended.openPronajimatelForm('firma'),
                        type: 'action'
                    },
                    {
                        id: 'pronajimatel-import',
                        icon: '📥',
                        title: 'Import',
                        description: 'Importovat ze souboru',
                        onClick: () => console.log('Import pronajímatelů'),
                        type: 'action'
                    }
                ]
            },
            {
                title: 'Statistiky',
                tiles: [
                    {
                        id: 'pronajimatel-stat-celkem',
                        icon: '📊',
                        title: '15',
                        description: 'Celkem pronajímatelů',
                        type: 'stat'
                    },
                    {
                        id: 'pronajimatel-stat-osoby',
                        icon: '👤',
                        title: '12',
                        description: 'Fyzické osoby',
                        type: 'stat'
                    },
                    {
                        id: 'pronajimatel-stat-firmy',
                        icon: '🏢',
                        title: '3',
                        description: 'Právnické osoby',
                        type: 'stat'
                    }
                ]
            }
        ]);
    }
    
    // Veřejné API
    return {
        createTileWithPin,
        createTilesGrid,
        createQuickActions,
        createStatTiles,
        createModuleOverview,
        togglePin,
        isPinnedItem,
        updatePinButton,
        
        // Příklady použití
        examples: {
            pronajimatelOverview: examplePronajimatelOverview
        }
    };
})();
