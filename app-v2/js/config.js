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
        
        // 2. Nájemníci
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
                { id: 'stat', name: 'Státní instituce', icon: '🏛️' }
            ]
        },
        
        // 3. Nemovitosti
        {
            id: 'nemovitosti',
            name: 'Nemovitosti',
            icon: '🏘️',
            description: 'Správa nemovitostí',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'budovy', name: 'Budovy', icon: '🏢' },
                { id: 'jednotky', name: 'Jednotky/byty', icon: '🏘️' },
                { id: 'volne', name: 'Volné', icon: '🟢' },
                { id: 'obsazene', name: 'Obsazené', icon: '🔴' }
            ]
        },
        
        // 4. Smlouvy
        {
            id: 'smlouvy',
            name: 'Smlouvy',
            icon: '📄',
            description: 'Správa nájemních smluv',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'aktivni', name: 'Aktivní', icon: '✅' },
                { id: 'ukoncene', name: 'Ukončené', icon: '❌' },
                { id: 'navrhy', name: 'Návrhy', icon: '📝' },
                { id: 'sablony', name: 'Šablony', icon: '📋' }
            ]
        },
        
        // 5. Platby
        {
            id: 'platby',
            name: 'Platby',
            icon: '💰',
            description: 'Evidence plateb a pohledávek',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'prijate', name: 'Přijaté', icon: '💵' },
                { id: 'dluzne', name: 'Dlužné', icon: '🔴' },
                { id: 'predpisy', name: 'Předpisy', icon: '📋' },
                { id: 'upominky', name: 'Upomínky', icon: '⚠️' }
            ]
        },
        
        // 6. Služby
        {
            id: 'sluzby',
            name: 'Služby',
            icon: '🛠️',
            description: 'Evidence služeb spojených s nájmem',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'definice', name: 'Definice služeb', icon: '📝' },
                { id: 'rozpocitani', name: 'Rozpočítání', icon: '🧮' },
                { id: 'vyuctovani', name: 'Vyúčtování', icon: '📑' }
            ]
        },
        
        // 7. Reporty & Grafy
        {
            id: 'reporty',
            name: 'Reporty & Grafy',
            icon: '📊',
            description: 'Přehledy a statistiky',
            types: [
                { id: 'all', name: 'Dashboard', icon: '📊' },
                { id: 'prijmy', name: 'Příjmy', icon: '📈' },
                { id: 'obsazenost', name: 'Obsazenost', icon: '🏘️' },
                { id: 'dluznici', name: 'Dlužníci', icon: '⚠️' },
                { id: 'custom', name: 'Vlastní reporty', icon: '📋' }
            ]
        },
        
        // 8. Finance
        {
            id: 'finance',
            name: 'Finance',
            icon: '💳',
            description: 'Finanční přehledy a účetnictví',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'bankovni-ucty', name: 'Bankovní účty', icon: '🏦' },
                { id: 'pokladna', name: 'Pokladna', icon: '💵' },
                { id: 'naklady', name: 'Náklady', icon: '📉' },
                { id: 'dane', name: 'Daně', icon: '📋' }
            ]
        },
        
        // 9. Energie
        {
            id: 'energie',
            name: 'Energie',
            icon: '⚡',
            description: 'Evidence spotřeby energií',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'elektrina', name: 'Elektřina', icon: '💡' },
                { id: 'plyn', name: 'Plyn', icon: '🔥' },
                { id: 'voda', name: 'Voda', icon: '💧' },
                { id: 'meraky', name: 'Měřáky', icon: '📏' }
            ]
        },
        
        // 10. Údržba
        {
            id: 'udrzba',
            name: 'Údržba',
            icon: '🔧',
            description: 'Evidence údržby a oprav',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'pozadavky', name: 'Požadavky', icon: '📝' },
                { id: 'planovana', name: 'Plánovaná', icon: '📅' },
                { id: 'probihajici', name: 'Probíhající', icon: '🚧' },
                { id: 'dokoncena', name: 'Dokončená', icon: '✅' }
            ]
        },
        
        // 11. Dokumenty
        {
            id: 'dokumenty',
            name: 'Dokumenty',
            icon: '📁',
            description: 'Správa dokumentů',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'smlouvy', name: 'Smlouvy', icon: '📄' },
                { id: 'faktury', name: 'Faktury', icon: '🧾' },
                { id: 'fotografie', name: 'Fotografie', icon: '📸' },
                { id: 'ostatni', name: 'Ostatní', icon: '📎' }
            ]
        },
        
        // 12. Komunikace
        {
            id: 'komunikace',
            name: 'Komunikace',
            icon: '💬',
            description: 'Komunikace s nájemníky',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'zpravy', name: 'Zprávy', icon: '✉️' },
                { id: 'emaily', name: 'E-maily', icon: '📧' },
                { id: 'sms', name: 'SMS', icon: '📱' },
                { id: 'sablony', name: 'Šablony zpráv', icon: '📋' }
            ]
        },
        
        // 13. Uživatelé & Role
        {
            id: 'uzivatele',
            name: 'Uživatelé & Role',
            icon: '👨‍💼',
            description: 'Správa uživatelů a oprávnění',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'uzivatele', name: 'Uživatelé', icon: '👥' },
                { id: 'role', name: 'Role', icon: '🎭' },
                { id: 'opravneni', name: 'Oprávnění', icon: '🔐' },
                { id: 'pristupovy-log', name: 'Přístupový log', icon: '📋' }
            ]
        },
        
        // 14. Nastavení
        {
            id: 'nastaveni',
            name: 'Nastavení',
            icon: '⚙️',
            description: 'Nastavení aplikace',
            types: [
                { id: 'all', name: 'Obecné', icon: '⚙️' },
                { id: 'vzhled', name: 'Vzhled', icon: '🎨' },
                { id: 'ciselniky', name: 'Číselníky', icon: '📋' },
                { id: 'sablony', name: 'Šablony', icon: '📄' },
                { id: 'zalohovani', name: 'Zálohování', icon: '💾' },
                { id: 'import-export', name: 'Import/Export', icon: '🔄' }
            ]
        },
        
        // 15. Můj účet
        {
            id: 'muj-ucet',
            name: 'Můj účet',
            icon: '👤',
            description: 'Osobní nastavení',
            types: [
                { id: 'profil', name: 'Profil', icon: '👤' },
                { id: 'nastaveni', name: 'Nastavení', icon: '⚙️' },
                { id: 'zmena-hesla', name: 'Změna hesla', icon: '🔐' },
                { id: 'aktivita', name: 'Moje aktivita', icon: '📊' }
            ]
        }
    ],
    
    // API endpoints
    api: {
        baseUrl: '/api/v1',
        endpoints: {
            pronajimatel: '/pronajimatel',
            najemnici: '/najemnici',
            nemovitosti: '/nemovitosti',
            smlouvy: '/smlouvy',
            platby: '/platby',
            sluzby: '/sluzby',
            reporty: '/reporty',
            finance: '/finance',
            energie: '/energie',
            udrzba: '/udrzba',
            dokumenty: '/dokumenty',
            komunikace: '/komunikace',
            uzivatele: '/uzivatele',
            nastaveni: '/nastaveni',
            mujUcet: '/muj-ucet'
        }
    }
};
