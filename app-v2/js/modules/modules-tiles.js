// Modul pro zobrazení dlaždic
window.ModuleTiles = (function() {
    'use strict';
    
    // Funkce handleTileClick přidáme:
    function handleTileClick(module, action) {
        if (module && window[module]) {
            window[module].render(action);
            
            // Otevřít správnou sekci v sidebaru
            if (window.Sidebar && window.Sidebar.openOnlySection) {
                window.Sidebar.openOnlySection(module.toLowerCase());
            }
        }
    }
    
    // Vykreslení dlaždic
    function render(tiles, moduleId) {
        if (!tiles || tiles.length === 0) {
            return '<p class="no-data">Žádné položky k zobrazení</p>';
        }
        
        return `
            <div class="tiles-grid">
                ${tiles.map(tile => `
                    <div class="tile" onclick="ModuleTiles.handleTileClick('${moduleId}', '${tile.action}')">
                        ${tile.icon ? `<div class="tile-icon">${tile.icon}</div>` : ''}
                        <div class="tile-content">
                            <h3 class="tile-title">${tile.title}</h3>
                            ${tile.count !== undefined ? `<div class="tile-count">${tile.count}</div>` : ''}
                            ${tile.description ? `<p class="tile-description">${tile.description}</p>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Veřejné API
    return {
        render: render,
        handleTileClick: handleTileClick
    };
})();
