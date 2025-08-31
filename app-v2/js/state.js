// Správa stavu aplikace
window.AppState = (function() {
    'use strict';
    
    // Privátní stav aplikace
    const _state = {
        currentUser: null,
        currentView: 'dashboard',
        currentModule: null,
        favorites: [],  // Oblíbené dlaždice
        tilesOrder: {}, // Pořadí dlaždic
        data: {
            najemnici: [],
            platby: [],
            jednotky: [],
            pronajimatele: [],
            nemovitosti: []
        }
    };
    
    // Posluchači změn
    const _listeners = [];
    
    // Získat hodnotu ze stavu
    function get(path) {
        const keys = path.split('.');
        let result = _state;
        
        for (const key of keys) {
            result = result[key];
            if (result === undefined) return undefined;
        }
        
        return result;
    }
    
    // Nastavit hodnotu ve stavu
    function set(path, value) {
        const keys = path.split('.');
        let target = _state;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!target[keys[i]]) {
                target[keys[i]] = {};
            }
            target = target[keys[i]];
        }
        
        target[keys[keys.length - 1]] = value;
        
        // Notifikovat posluchače
        _listeners.forEach(listener => listener(path, value));
        
        // Uložit do localStorage
        localStorage.setItem('appState', JSON.stringify(_state));
    }
    
    // Přidat posluchače změn
    function subscribe(callback) {
        _listeners.push(callback);
        
        // Vrátit funkci pro odhlášení
        return () => {
            const index = _listeners.indexOf(callback);
            if (index > -1) {
                _listeners.splice(index, 1);
            }
        };
    }
    
    // Získat data
    function getData(type) {
        return _state.data[type] || [];
    }
    
    // Smazat položku
    function deleteItem(type, id) {
        if (_state.data[type]) {
            _state.data[type] = _state.data[type].filter(item => item.id !== id);
            set(`data.${type}`, _state.data[type]);
        }
    }
    
    // Správa oblíbených
    function toggleFavorite(tileId) {
        const favorites = get('favorites') || [];
        const index = favorites.indexOf(tileId);
        
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(tileId);
        }
        
        set('favorites', favorites);
        return favorites.includes(tileId);
    }
    
    function isFavorite(tileId) {
        const favorites = get('favorites') || [];
        return favorites.includes(tileId);
    }
    
    // Správa pořadí dlaždic
    function saveTilesOrder(order) {
        set('tilesOrder', order);
    }
    
    function getTilesOrder() {
        return get('tilesOrder') || {};
    }
    
    // Získat celý stav
    function getAll() {
        return JSON.parse(JSON.stringify(_state));
    }
    
    // Inicializace defaultních oblíbených
    function initializeDefaultFavorites() {
        const defaultFavorites = [
            'byty-prehled', 'najemnici', 'smlouvy', 'cashflow', 
            'udrzba', 'revize', 'integrace', 'volne-byty', 
            'pozadavky', 'vyuctovani', 'dluznici', 'meridla', 
            'spotreby', 'dokumenty', 'reporty', 'komunikace', 'ukonceni'
        ];
        
        // Pokud ještě nemáme žádné oblíbené, nastavíme všechny jako oblíbené
        if (!_state.favorites || _state.favorites.length === 0) {
            set('favorites', defaultFavorites);
        }
    }
    
    // Inicializace
    function init() {
        console.log('AppState inicializován');
        // Načíst data z localStorage pokud existují
        const saved = localStorage.getItem('appState');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                Object.assign(_state, data);
            } catch (e) {
                console.error('Chyba při načítání stavu:', e);
            }
        }
        
        // Inicializovat defaultní oblíbené
        initializeDefaultFavorites();
    }
    
    // Veřejné API
    return {
        init,
        get,
        set,
        subscribe,
        getAll,
        getData,
        deleteItem,
        toggleFavorite,
        isFavorite,
        saveTilesOrder,
        getTilesOrder
    };
})();
