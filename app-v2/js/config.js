// Globální konfigurace aplikace
window.APP_CONFIG = {
    // Název aplikace
    appName: 'Aplikace pronajímatel',
    version: '2.0.0',
    
    // Ikony pro různé typy
    icons: {
        osoba: '👤',
        osvc: '🧑‍💼',
        firma: '🏢',
        spolek: '🫂',
        stat: '🏛️',
        vzory: '📄',
        licence: '🎫',
        budovy: '🏢',
        jednotky: '🏘️',
        volne: '🟢',
        obsazene: '🔴',
        uzivatele: '👥',
        prehledy: '📊',
        home: '🏠',
        settings: '⚙️',
        search: '🔍',
        filter: '🔽',
        add: '+',
        edit: '✏️',
        delete: '🗑️',
        view: '👁️',
        close: '×',
        menu: '☰',
        back: '←'
    },
    
    // Seznam všech modulů v pořadí jak mají být v sidebaru
    modules: [
        // 0. Dashboard - přidáno
        {
            id: 'dashboard',
            name: 'Hlavní panel',
            icon: '🏠',
            description: 'Hlavní přehled aplikace'
        },
        
        // 1. Pronajímatel
        {
            id: 'pronajimatel',
            name: 'Pronajímatel',
            icon: '🏠',
            description: 'Správa pronajímatelů',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'osoba', name: 'Osoba', icon: '👤' },
                { id: 'osvc', name: 'OSVČ', icon: '🧑‍💼' },
                { id: 'firma', name: 'Firma', icon: '🏢' },
                { id: 'spolek', name: 'Spolek/skupina', icon: '🫂' },
                { id: 'stat', name: 'Státní instituce', icon: '🏛️' }
            ]
        },
        
        // Zbytek konfigurace zůstává stejný...
    ]
};
