// Mock ModuleTiles objekt – uprav dle skutečné logiky!
window.ModuleTiles = window.ModuleTiles || {
    getFavoriteTiles: function() {
        // Vrací ukázková data – nahraď vlastní logikou!
        return [
            {
                module: 'najemnici',
                action: 'detail',
                icon: '👥',
                title: 'Nájemníci',
                description: 'Správa nájemníků',
                color: 'tile-primary',
                parentTitle: 'Nájemníci'
            },
            {
                module: 'platby',
                action: '',
                icon: '💸',
                title: 'Platby',
                description: 'Přehled plateb',
                color: 'tile-success',
                parentTitle: 'Platby'
            }
            // ...další oblíbené moduly
        ];
    },
    handleTileClick: function(module, action) {
        window.Router.navigate(module + (action ? '/' + action : ''));
    }
};

window.Dashboard = (function() {
    'use strict';
    
    function render() {
        const container = document.getElementById('main-content'); // sjednoceno ID!
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
