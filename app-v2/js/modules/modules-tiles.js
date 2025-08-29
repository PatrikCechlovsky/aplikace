window.ModuleTiles = (function() {
    'use strict';
    
    // Získat oblíbené z localStorage
    function getFavorites() {
        const saved = localStorage.getItem('favoriteTiles');
        return saved ? JSON.parse(saved) : ['pronajimatel']; // Default s pronajímatelem
    }
    
    // Uložit oblíbené
    function saveFavorites(favorites) {
        localStorage.setItem('favoriteTiles', JSON.stringify(favorites));
    }
    
    // Toggle oblíbené
    function toggleFavorite(tileId) {
        let favorites = getFavorites();
        const index = favorites.indexOf(tileId);
        
        if (index === -1) {
            favorites.push(tileId);
        } else {
            favorites.splice(index, 1);
        }
        
        saveFavorites(favorites);
        
        // Aktualizovat hvězdičku
        const star = document.querySelector(`[data-tile-id="${tileId}"] .tile-favorite`);
        if (star) {
            star.classList.toggle('active');
        }
        
        // Pokud jsme na hlavním panelu, překreslit
        if (window.location.hash === '#dashboard' || window.location.hash === '') {
            window.Dashboard.render();
        }
    }
    
    function renderTiles(config, targetId = 'mainContent') {
        const container = document.getElementById(targetId);
        if (!container) return;
        
        const favorites = getFavorites();
        
        // Header s názvem modulu
        let html = `
            <div class="module-header">
                <h2>${config.icon} ${config.title}</h2>
            </div>
            <div class="tiles-grid">
        `;
        
        // Vykreslit jednotlivé dlaždice
        config.tiles.forEach(tile => {
            const isFavorite = favorites.includes(tile.id);
            
            html += `
                <div class="module-tile ${tile.color || 'tile-primary'}" 
                     data-tile-id="${tile.id}"
                     onclick="ModuleTiles.handleTileClick('${tile.module}', '${tile.action || ''}')">
                    <span class="tile-favorite ${isFavorite ? 'active' : ''}" 
                          onclick="event.stopPropagation(); ModuleTiles.toggleFavorite('${tile.id}')">
                        ⭐
                    </span>
                    <div class="tile-icon">${tile.icon}</div>
                    <h3>${tile.title}</h3>
                    <p>${tile.description}</p>
                    ${tile.stats ? `
                        <div class="tile-stats">
                            ${Object.entries(tile.stats).map(([key, value]) => 
                                `<span class="stat-item">${key}: <strong>${value}</strong></span>`
                            ).join(' • ')}
                        </div>
                    ` : ''}
                    ${tile.tags ? `
                        <div class="tile-tags">
                            ${tile.tags.map(tag => 
                                `<span class="tile-tag">#${tag}</span>`
                            ).join(' ')}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    function handleTileClick(module, action) {
        if (module && window[module]) {
            window[module].render(action);
        }
    }
    
    // Získat všechny oblíbené dlaždice
    function getFavoriteTiles() {
        const favorites = getFavorites();
        const allTiles = [];
        
        // Projít všechny moduly a najít oblíbené dlaždice
        Object.values(tilesConfig).forEach(config => {
            config.tiles.forEach(tile => {
                if (favorites.includes(tile.id)) {
                    allTiles.push({
                        ...tile,
                        parentModule: config.module,
                        parentTitle: config.title
                    });
                }
            });
        });
        
        return allTiles;
    }
    
    // Konfigurace pro jednotlivé moduly
    const tilesConfig = {
        najemnici: {
            module: 'Najemnici',
            title: 'Nájemníci',
            icon: '👥',
            tiles: [
                {
                    id: 'vsichni-najemnici',
                    title: 'Všichni nájemníci',
                    description: 'Seznam všech osob a kontaktů',
                    icon: '👥',
                    color: 'tile-primary',
                    module: 'Najemnici',
                    action: 'all'
                },
                {
                    id: 'fyzicke-osoby',
                    title: 'Fyzické osoby',
                    description: 'Soukromí jednotlivci, občané',
                    icon: '👤',
                    color: 'tile-blue',
                    module: 'Najemnici',
                    action: 'fyzicke'
                },
                {
                    id: 'pravnicke-osoby',
                    title: 'Právnické osoby',
                    description: 'Firmy, společnosti, organizace',
                    icon: '🏢',
                    color: 'tile-purple',
                    module: 'Najemnici',
                    action: 'pravnicke'
                }
            ]
        },
        // Zde přidej další moduly podle potřeby...
    };
    
    return {
        renderTiles: renderTiles,
        handleTileClick: handleTileClick,
        toggleFavorite: toggleFavorite,
        getFavoriteTiles: getFavoriteTiles,
        tilesConfig: tilesConfig
    };
})();
