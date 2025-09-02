// Modul pro zobrazení dlaždic
window.ModuleTiles = (function() {
    'use strict';

    // Vrátí oblíbené dlaždice (mock nebo načtení z localStorage, API atd.)
    function getFavoriteTiles() {
        // Ukázková statická data; uprav podle své logiky
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
    }
    
    {
        id: 'help',
        title: 'Nápověda',
        icon: 'fa-question-circle',
        color: '#6c757d',
        size: 'small',
        action: () => {
            if (window.Help && window.Help.showFullDocumentation) {
                window.Help.showFullDocumentation();
            } else {
                console.error('Help modul není načten');
            }
        }
    },

    // Funkce handleTileClick
    function handleTileClick(module, action) {
        if (window.Router && window.Router.navigate) {
            window.Router.navigate(module + (action ? '/' + action : ''));
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
        handleTileClick: handleTileClick,
        getFavoriteTiles: getFavoriteTiles // ← přidáno!
    };
})();
