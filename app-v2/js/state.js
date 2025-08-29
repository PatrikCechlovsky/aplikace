// Správa stavu aplikace
window.AppState = (function() {
    'use strict';
    
    // Privátní proměnné
    let state = {
        // Aktuální pozice v aplikaci
        currentModule: null,
        currentType: null,
        currentFilter: null,
        
        // Data
        data: {
            pronajimatele: [],
            najemnici: [],
            nemovitosti: [],
            licence: []
        },
        
        // UI stav
        ui: {
            sidebarOpen: false,
            modalOpen: false,
            loading: false
        },
        
        // Uživatel
        user: {
            name: 'Patrik Cechlovský',
            role: 'admin',
            lastLogin: new Date().toISOString()
        }
    };
    
    // Posluchači změn
    const listeners = new Set();
    
    // Pomocná funkce pro hluboké klonování
    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    
    // Pomocná funkce pro notifikaci posluchačů
    function notifyListeners(changedProperty) {
        listeners.forEach(listener => {
            try {
                listener({
                    property: changedProperty,
                    newState: deepClone(state)
                });
            } catch (error) {
                console.error('Chyba při volání listeneru:', error);
            }
        });
    }
    
    // Veřejné API
    return {
        // Získání aktuálního stavu
        getState() {
            return deepClone(state);
        },
        
        // Získání konkrétní hodnoty
        get(path) {
            const keys = path.split('.');
            let value = state;
            
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    return undefined;
                }
            }
            
            return typeof value === 'object' ? deepClone(value) : value;
        },
        
        // Nastavení hodnoty
        set(path, value) {
            const keys = path.split('.');
            const lastKey = keys.pop();
            let target = state;
            
            // Navigace k cílovému objektu
            for (const key of keys) {
                if (!(key in target) || typeof target[key] !== 'object') {
                    target[key] = {};
                }
                target = target[key];
            }
            
            // Nastavení hodnoty
            target[lastKey] = value;
            
            // Notifikace posluchačů
            notifyListeners(path);
            
            // Uložení do localStorage
            this.saveToLocalStorage();
        },
        
        // Nastavení aktuálního modulu
        setModule(moduleId, type = 'all') {
            state.currentModule = moduleId;
            state.currentType = type;
            notifyListeners('navigation');
        },
        
        // Získání dat podle typu
        getData(dataType) {
            return deepClone(state.data[dataType] || []);
        },
        
        // Přidání položky do dat
        addItem(dataType, item) {
            if (!state.data[dataType]) {
                state.data[dataType] = [];
            }
            
            // Přidání ID pokud chybí
            if (!item.id) {
                item.id = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            }
            
            // Přidání časových razítek
            item.createdAt = new Date().toISOString();
            item.updatedAt = item.createdAt;
            
            state.data[dataType].push(item);
            notifyListeners(`data.${dataType}`);
            this.saveToLocalStorage();
            
            return item;
        },
        
        // Aktualizace položky
        updateItem(dataType, id, updates) {
            if (!state.data[dataType]) return false;
            
            const index = state.data[dataType].findIndex(item => item.id === id);
            if (index === -1) return false;
            
            // Aktualizace položky
            state.data[dataType][index] = {
                ...state.data[dataType][index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            
            notifyListeners(`data.${dataType}`);
            this.saveToLocalStorage();
            
            return true;
        },
        
        // Smazání položky
        deleteItem(dataType, id) {
            if (!state.data[dataType]) return false;
            
            const index = state.data[dataType].findIndex(item => item.id === id);
            if (index === -1) return false;
            
            state.data[dataType].splice(index, 1);
            notifyListeners(`data.${dataType}`);
            this.saveToLocalStorage();
            
            return true;
        },
        
        // Filtrování dat
        getFilteredData(dataType, filter) {
            const data = state.data[dataType] || [];
            
            if (!filter || filter === 'all') {
                return deepClone(data);
            }
            
            return deepClone(data.filter(item => {
                // Filtrování podle typu
                if (filter.type && item.typ !== filter.type) {
                    return false;
                }
                
                // Textové vyhledávání
                if (filter.search) {
                    const searchLower = filter.search.toLowerCase();
                    const searchableFields = ['jmeno', 'email', 'adresa', 'nazev'];
                    
                    return searchableFields.some(field => {
                        const value = item[field];
                        return value && value.toLowerCase().includes(searchLower);
                    });
                }
                
                return true;
            }));
        },
        
        // Registrace posluchače
        subscribe(callback) {
            if (typeof callback !== 'function') {
                throw new Error('Callback musí být funkce');
            }
            
            listeners.add(callback);
            
            // Vrácení funkce pro odregistraci
            return () => {
                listeners.delete(callback);
            };
        },
        
        // UI operace
        toggleSidebar() {
            state.ui.sidebarOpen = !state.ui.sidebarOpen;
            notifyListeners('ui.sidebarOpen');
        },
        
        openModal() {
            state.ui.modalOpen = true;
            notifyListeners('ui.modalOpen');
        },
        
        closeModal() {
            state.ui.modalOpen = false;
            notifyListeners('ui.modalOpen');
        },
        
        setLoading(isLoading) {
            state.ui.loading = isLoading;
            notifyListeners('ui.loading');
        },
        
        // Uložení do localStorage
        saveToLocalStorage() {
            try {
                localStorage.setItem('appState', JSON.stringify({
                    data: state.data,
                    lastSaved: new Date().toISOString()
                }));
            } catch (error) {
                console.error('Chyba při ukládání do localStorage:', error);
            }
        },
        
        // Načtení z localStorage
        loadFromLocalStorage() {
            try {
                const saved = localStorage.getItem('appState');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    state.data = parsed.data || state.data;
                    console.log('Data načtena z localStorage');
                    notifyListeners('data');
                }
            } catch (error) {
                console.error('Chyba při načítání z localStorage:', error);
            }
        },
        
        // Reset stavu
        reset() {
            state = {
                currentModule: null,
                currentType: null,
                currentFilter: null,
                data: {
                    pronajimatele: [],
                    najemnici: [],
                    nemovitosti: [],
                    licence: []
                },
                ui: {
                    sidebarOpen: false,
                    modalOpen: false,
                    loading: false
                },
                user: state.user // Zachovat info o uživateli
            };
            
            localStorage.removeItem('appState');
            notifyListeners('reset');
        },
        
        // Inicializace s testovacími daty
        initWithMockData() {
            // Pronajímatelé
            state.data.pronajimatele = [
                { id: '1', typ: 'osoba', jmeno: 'Jan Novák', email: 'jan.novak@email.cz', telefon: '+420 777 123 456' },
                { id: '2', typ: 'osoba', jmeno: 'Marie Svobodová', email: 'marie.svobodova@email.cz', telefon: '+420 777 234 567' },
                { id: '3', typ: 'firma', jmeno: 'ABC Reality s.r.o.', email: 'info@abcreality.cz', ico: '12345678', zastupce: 'Petr Dvořák' },
                { id: '4', typ: 'osvc', jmeno: 'Pavel Černý', email: 'pavel.cerny@email.cz', ico: '87654321' }
            ];
            
            // Nájemníci
            state.data.najemnici = [
                { id: '1', typ: 'osoba', jmeno: 'Tomáš Procházka', email: 'tomas.prochazka@email.cz', telefon: '+420 777 345 678' },
                { id: '2', typ: 'firma', jmeno: 'XYZ Services s.r.o.', email: 'info@xyzservices.cz', ico: '23456789' }
            ];
            
            // Nemovitosti
            state.data.nemovitosti = [
                { id: '1', typ: 'byt', adresa: 'Praha 2, Vinohrady, Korunní 10', velikost: '2+1', plocha: 65, volny: true },
                { id: '2', typ: 'byt', adresa: 'Praha 1, Nové Město, Vodičkova 20', velikost: '3+kk', plocha: 82, volny: false },
                { id: '3', typ: 'budova', adresa: 'Praha 5, Smíchov, Plzeňská 100', pocetJednotek: 24, volnychJednotek: 3 }
            ];
            
            notifyListeners('data');
        }
    };
})();

// Načtení dat při startu
document.addEventListener('DOMContentLoaded', () => {
    AppState.loadFromLocalStorage();
    
    // Pokud nejsou žádná data, načti testovací
    if (AppState.getData('pronajimatele').length === 0) {
        console.log('Inicializace s testovacími daty');
        AppState.initWithMockData();
    }
});
