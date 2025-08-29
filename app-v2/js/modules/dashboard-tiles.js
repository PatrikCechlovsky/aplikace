window.Dashboard = (function() {
    'use strict';
    
    function render() {
        const container = document.getElementById('mainContent');
        if (!container) return;
        
        // Získat oblíbené dlaždice
        const favoriteTiles = ModuleTiles.getFavoriteTiles();
        
        let html = `
            <div class="dashboard-header">
                <h1>🏠 Hlavní panel</h1>
                <p>Vaše oblíbené moduly a rychlý přístup</p>
            </div>
        `;
        
        if (favoriteTiles.length > 0) {
            html += '<div class="tiles-grid">';
            
            // Vykreslit oblíbené dlaždice
            favoriteTiles.forEach(tile => {
                html += `
                    <div class="module-tile ${tile.color || 'tile-primary'}" 
                         onclick="ModuleTiles.handleTileClick('${tile.module}', '${tile.action || ''}')">
                        <div class="tile-icon">${tile.icon}</div>
                        <h3>${tile.title}</h3>
                        <p>${tile.description}</p>
                        <div class="tile-meta">Z modulu: ${tile.parentTitle}</div>
                    </div>
                `;
            });
            
            html += '</div>';
        } else {
            html += `
                <div class="empty-dashboard">
                    <div class="empty-icon">⭐</div>
                    <h2>Zatím nemáte žádné oblíbené moduly</h2>
                    <p>Klikněte na hvězdičku u dlaždice v jakémkoliv modulu a přidejte ji sem</p>
                </div>
            `;
        }
        
        container.innerHTML = html;
    }
    
    return {
        render: render
    };
})();
