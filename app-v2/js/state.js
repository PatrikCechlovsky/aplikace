// Správa stavu aplikace
window.AppState = (function() {
    'use strict';
    
    // Privátní stav aplikace
    const _state = {
        currentUser: null,
        currentView: 'dashboard',
        data: {
            najemnici: [],
            platby: [],
            jednotky: []
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
    
    // Získat celý stav
    function getAll() {
        return JSON.parse(JSON.stringify(_state));
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
    }
    
    // Veřejné API
    return {
        init: init,
        get: get,
        set: set,
        subscribe: subscribe,
        getAll: getAll
    };
})();
