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
        // 0. Dashboard
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
                { id: 'stat', name: 'Státní instituce', icon: '🏛️' },
                { id: 'zastupce', name: 'Zastupující osoba', icon: '🤝' }
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
                { id: 'stat', name: 'Státní instituce', icon: '🏛️' },
                { id: 'zastupce', name: 'Zastupující osoba', icon: '🤝' }
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
                { id: 'aktivni', name: 'Aktivní' },
                { id: 'ukoncene', name: 'Ukončené' },
                { id: 'navrhy', name: 'Návrhy' },
                { id: 'sablony', name: 'Šablony' }
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
                { id: 'prijate', name: 'Přijaté' },
                { id: 'dluzne', name: 'Dlužné' },
                { id: 'predpisy', name: 'Předpisy' },
                { id: 'upominky', name: 'Upomínky' }
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
                { id: 'definice', name: 'Definice služeb' },
                { id: 'rozpocitani', name: 'Rozpočítání' },
                { id: 'vyuctovani', name: 'Vyúčtování' }
            ]
        },
        
        // 7. Reporty & Grafy
        {
            id: 'reporty',
            name: 'Reporty & Grafy',
            icon: '📊',
            description: 'Přehledy a statistiky',
            types: [
                { id: 'all', name: 'Dashboard' },
                { id: 'prijmy', name: 'Příjmy' },
                { id: 'obsazenost', name: 'Obsazenost' },
                { id: 'dluznici', name: 'Dlužníci' },
                { id: 'custom', name: 'Vlastní reporty' }
            ]
        },
        
        // 8. Finance
        {
            id: 'finance',
            name: 'Finance',
            icon: '💸',
            description: 'Finanční přehledy a účetnictví',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'bankovni-ucty', name: 'Bankovní účty' },
                { id: 'pokladna', name: 'Pokladna' },
                { id: 'naklady', name: 'Náklady' },
                { id: 'dane', name: 'Daně' }
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
                { id: 'elektrina', name: 'Elektřina' },
                { id: 'plyn', name: 'Plyn' },
                { id: 'voda', name: 'Voda' },
                { id: 'meraky', name: 'Měřáky' }
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
                { id: 'pozadavky', name: 'Požadavky' },
                { id: 'planovana', name: 'Plánovaná' },
                { id: 'probihajici', name: 'Probíhající' },
                { id: 'dokoncena', name: 'Dokončená' }
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
                { id: 'smlouvy', name: 'Smlouvy' },
                { id: 'faktury', name: 'Faktury' },
                { id: 'fotografie', name: 'Fotografie' },
                { id: 'ostatni', name: 'Ostatní' }
            ]
        },
        
        // 12. Komunikace
        {
            id: 'komunikace',
            name: 'Komunikace',
            icon: '📧',
            description: 'Komunikace s nájemníky',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'zpravy', name: 'Zprávy' },
                { id: 'emaily', name: 'E-maily' },
                { id: 'sms', name: 'SMS' },
                { id: 'sablony', name: 'Šablony zpráv' }
            ]
        },
        
        // 13. Uživatelé & Role
        {
            id: 'uzivatele',
            name: 'Uživatelé & Role',
            icon: '👥',
            description: 'Správa uživatelů a oprávnění',
            types: [
                { id: 'all', name: 'Přehled', icon: '📊' },
                { id: 'uzivatele', name: 'Uživatelé' },
                { id: 'role', name: 'Role' },
                { id: 'opravneni', name: 'Oprávnění' },
                { id: 'pristupovy-log', name: 'Přístupový log' }
            ]
        },
        
        // 14. Nastavení
        {
            id: 'nastaveni',
            name: 'Nastavení',
            icon: '⚙️',
            description: 'Nastavení aplikace',
            types: [
                { id: 'all', name: 'Obecné' },
                { id: 'vzhled', name: 'Vzhled' },
                { id: 'ciselniky', name: 'Číselníky' },
                { id: 'sablony', name: 'Šablony' },
                { id: 'zalohovani', name: 'Zálohování' },
                { id: 'import-export', name: 'Import/Export' }
            ]
        },
        
        // 15. Můj účet
        {
            id: 'muj-ucet',
            name: 'Můj účet',
            icon: '👤',
            description: 'Osobní nastavení',
            types: [
                { id: 'profil', name: 'Profil' },
                { id: 'nastaveni', name: 'Nastavení' },
                { id: 'zmena-hesla', name: 'Změna hesla' },
                { id: 'aktivita', name: 'Moje aktivita' }
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
