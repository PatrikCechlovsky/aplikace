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
    
    // Definice modulů
    modules: [
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
                { id: 'stat', name: 'Státní instituce', icon: '🏛️' },
                { id: 'vzory', name: 'Vzory', icon: '📄' }
            ]
        },
        {
            id: 'najemnici',
            name: 'Nájemníci',
            icon: '👥',
            description: 'Správa nájemníků',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'osoba', name: 'Osoba', icon: '👤' },
                { id: 'osvc', name: 'OSVČ', icon: '🧑‍💼' },
                { id: 'firma', name: 'Firma', icon: '🏢' },
                { id: 'spolek', name: 'Spolek/skupina', icon: '🫂' },
                { id: 'stat', name: 'Státní instituce', icon: '🏛️' },
                { id: 'vzory', name: 'Vzory', icon: '📄' }
            ]
        },
        {
            id: 'nemovitosti',
            name: 'Nemovitosti',
            icon: '🏘️',
            description: 'Správa nemovitostí',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'budovy', name: 'Budovy', icon: '🏢' },
                { id: 'jednotky', name: 'Jednotky/byty', icon: '🏘️' },
                { id: 'volne', name: 'Volné jednotky', icon: '🟢' },
                { id: 'obsazene', name: 'Obsazené jednotky', icon: '🔴' },
                { id: 'vzory', name: 'Vzory', icon: '📄' }
            ]
        },
        {
            id: 'licence',
            name: 'Licence',
            icon: '🎫',
            description: 'Správa licencí',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'aktivni', name: 'Aktivní', icon: '✅' },
                { id: 'expirujici', name: 'Expirující', icon: '⚠️' },
                { id: 'neaktivni', name: 'Neaktivní', icon: '❌' },
                { id: 'vzory', name: 'Vzory', icon: '📄' }
            ]
        },
        {
            id: 'prehledy',
            name: 'Přehledy',
            icon: '📊',
            description: 'Reporty a statistiky',
            types: [
                { id: 'uzivatele', name: 'Uživatelé', icon: '👥' },
                { id: 'volne-jednotky', name: 'Volné jednotky', icon: '🟢' },
                { id: 'platby', name: 'Platby', icon: '💰' },
                { id: 'statistiky', name: 'Statistiky', icon: '📈' }
            ]
        }
    ],
    
    // API endpoints (pro budoucnost)
    api: {
        baseUrl: '/api/v1',
        endpoints: {
            pronajimatel: '/pronajimatel',
            najemnici: '/najemnici',
            nemovitosti: '/nemovitosti',
            licence: '/licence'
        }
    }
};
