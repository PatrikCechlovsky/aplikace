// Inicializační data pro aplikaci
window.InitData = (function() {
    'use strict';
    
    const nemovitostiData = [
        {
            id: "N0001",
            typ: "bytovy_dum",
            nazev: "Bytový dům Centrum",
            pronajimatel_id: "5",
            ulice: "Václavské náměstí",
            cisloPopisne: "832/21",
            mesto: "Praha",
            psc: "110 00",
            stat: "Česká republika",
            pocetJednotek: 48,
            pocetNadzemnichPodlazi: 8,
            pocetPodzemnichPodlazi: 2,
            rokVystavby: 1998,
            rokRekonstrukce: 2020,
            vybaveni: ["vytah", "parkovani", "kolarna", "kocarkarna"],
            spravce: "Správa nemovitostí Praha s.r.o.",
            poznamka: "Kompletní rekonstrukce v roce 2020",
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0002",
            typ: "rodinny_dum",
            nazev: "Rodinný dům Vinohrady",
            pronajimatel_id: "1",
            ulice: "Korunní",
            cisloPopisne: "2456/88",
            mesto: "Praha",
            psc: "120 00",
            stat: "Česká republika",
            pocetJednotek: 8,
            pocetNadzemnichPodlazi: 3,
            pocetPodzemnichPodlazi: 1,
            rokVystavby: 1935,
            rokRekonstrukce: 2018,
            vybaveni: ["zahrada", "parkovani", "sklep"],
            spravce: "",
            poznamka: "Historický dům rozdělený na 8 bytových jednotek",
            created_at: "2024-02-20T14:30:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0003",
            typ: "rodinny_dum",
            nazev: "Vila Barrandov",
            pronajimatel_id: "2",
            ulice: "Filmařská",
            cisloPopisne: "415/12",
            mesto: "Praha",
            psc: "152 00",
            stat: "Česká republika",
            pocetJednotek: 1,
            pocetNadzemnichPodlazi: 2,
            pocetPodzemnichPodlazi: 1,
            rokVystavby: 2015,
            vybaveni: ["zahrada", "parkovani", "bazen"],
            spravce: "",
            poznamka: "Luxusní vila s bazénem",
            created_at: "2024-03-10T09:15:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0004",
            typ: "admin_budova",
            nazev: "Office Park Karlín",
            pronajimatel_id: "6",
            ulice: "Pernerova",
            cisloPopisne: "691/42",
            mesto: "Praha",
            psc: "186 00",
            stat: "Česká republika",
            pocetJednotek: 24,
            pocetNadzemnichPodlazi: 6,
            pocetPodzemnichPodlazi: 3,
            rokVystavby: 2019,
            vybaveni: ["vytah", "parkovani", "klimatizace", "recepce"],
            spravce: "Facility Management CZ s.r.o.",
            poznamka: "Moderní kancelářská budova třídy A",
            created_at: "2024-04-05T11:20:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0005",
            typ: "bytovy_dum",
            nazev: "Rezidence Hradčany",
            pronajimatel_id: "5",
            ulice: "Loretánská",
            cisloPopisne: "176/3",
            mesto: "Praha",
            psc: "118 00",
            stat: "Česká republika",
            pocetJednotek: 12,
            pocetNadzemnichPodlazi: 4,
            pocetPodzemnichPodlazi: 1,
            rokVystavby: 2022,
            vybaveni: ["vytah", "parkovani", "kolarna", "zahrada"],
            spravce: "Premium Property Management s.r.o.",
            poznamka: "Luxusní rezidence v historickém centru",
            created_at: "2024-05-12T13:45:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0006",
            typ: "prumyslovy",
            nazev: "Skladový areál Hostivař",
            pronajimatel_id: "6",
            ulice: "Průmyslová",
            cisloPopisne: "1472",
            mesto: "Praha",
            psc: "102 00",
            stat: "Česká republika",
            pocetJednotek: 6,
            pocetNadzemnichPodlazi: 1,
            pocetPodzemnichPodlazi: 0,
            rokVystavby: 2010,
            vybaveni: ["parkovani", "nakladaci_rampa"],
            spravce: "Industrial Services s.r.o.",
            poznamka: "Skladové haly s možností rozdělení",
            created_at: "2024-06-18T08:30:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0007",
            typ: "bytovy_dum",
            nazev: "Bytový dům Vinohrady II",
            pronajimatel_id: "7",
            ulice: "Mánesova",
            cisloPopisne: "1582/24",
            mesto: "Praha",
            psc: "120 00",
            stat: "Česká republika",
            pocetJednotek: 32,
            pocetNadzemnichPodlazi: 6,
            pocetPodzemnichPodlazi: 1,
            rokVystavby: 1928,
            rokRekonstrukce: 2021,
            vybaveni: ["vytah", "kolarna", "susarna"],
            spravce: "Družstvo - samospráva",
            poznamka: "Družstevní dům, nová střecha 2021",
            created_at: "2024-07-22T15:10:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0008",
            typ: "rodinny_dum",
            nazev: "Řadové domy Zbraslav",
            pronajimatel_id: "3",
            ulice: "U Národní galerie",
            cisloPopisne: "481/7A",
            mesto: "Praha",
            psc: "156 00",
            stat: "Česká republika",
            pocetJednotek: 1,
            pocetNadzemnichPodlazi: 2,
            pocetPodzemnichPodlazi: 0,
            rokVystavby: 2020,
            vybaveni: ["zahrada", "parkovani"],
            spravce: "",
            poznamka: "Řadový dům v klidné lokalitě",
            created_at: "2024-08-30T10:25:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0009",
            typ: "pozemek",
            nazev: "Stavební pozemek Průhonice",
            pronajimatel_id: "4",
            ulice: "V Oblouku",
            cisloPopisne: "",
            mesto: "Průhonice",
            psc: "252 43",
            stat: "Česká republika",
            pocetJednotek: 0,
            pocetNadzemnichPodlazi: 0,
            pocetPodzemnichPodlazi: 0,
            rokVystavby: null,
            vybaveni: [],
            spravce: "",
            poznamka: "Stavební pozemek 1200 m2",
            created_at: "2024-09-14T12:00:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "N0010",
            typ: "admin_budova",
            nazev: "Business Center Anděl",
            pronajimatel_id: "9",
            ulice: "Stroupežnického",
            cisloPopisne: "3191/17",
            mesto: "Praha",
            psc: "150 00",
            stat: "Česká republika",
            pocetJednotek: 45,
            pocetNadzemnichPodlazi: 9,
            pocetPodzemnichPodlazi: 2,
            rokVystavby: 2008,
            rokRekonstrukce: 2023,
            vybaveni: ["vytah", "parkovani", "klimatizace", "recepce", "kantyna"],
            spravce: "CBRE Property Management",
            poznamka: "Prestižní kancelářské prostory",
            created_at: "2024-10-20T14:15:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        }
    ];
    
    const jednotkyData = [
        {
            id: "J0001",
            nemovitost_id: "N0001",
            oznaceni: "1A",
            typ: "byt",
            podlazi: "1",
            plocha: 65.5,
            dispozice: "2+kk",
            pocetMistnosti: 2,
            stav: "obsazena",
            najemce: "Pavel Černý",
            poznamka: "Byt po rekonstrukci",
            created_at: "2024-01-16T10:00:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "J0002",
            nemovitost_id: "N0001",
            oznaceni: "1B",
            typ: "byt",
            podlazi: "1",
            plocha: 48.2,
            dispozice: "1+kk",
            pocetMistnosti: 1,
            stav: "volna",
            najemce: "",
            poznamka: "K dispozici od 1.2.2025",
            created_at: "2024-01-16T10:30:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        },
        {
            id: "J0003",
            nemovitost_id: "N0001",
            oznaceni: "2A",
            typ: "byt",
            podlazi: "2",
            plocha: 85.0,
            dispozice: "3+1",
            pocetMistnosti: 3,
            stav: "obsazena",
            najemce: "Rodina Novotných",
            poznamka: "Dlouhodobý nájem",
            created_at: "2024-01-16T11:00:00Z",
            updated_at: "2025-01-02T10:58:36Z"
        }
    ];
    
    function loadInitialData() {
        // Zkontrolovat, zda už data existují
        const existingNemovitosti = localStorage.getItem('nemovitosti_data');
        const existingJednotky = localStorage.getItem('jednotky_data');
        
        if (!existingNemovitosti || existingNemovitosti === '[]') {
            localStorage.setItem('nemovitosti_data', JSON.stringify(nemovitostiData));
            console.log('✅ Načtena ukázková data nemovitostí');
        }
        
        if (!existingJednotky || existingJednotky === '[]') {
            localStorage.setItem('jednotky_data', JSON.stringify(jednotkyData));
            console.log('✅ Načtena ukázková data jednotek');
        }
    }
    
    // Public API
    return {
        loadInitialData,
        getNemovitostiData: () => nemovitostiData,
        getJednotkyData: () => jednotkyData
    };
})();

// Automaticky načíst data při načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    window.InitData.loadInitialData();
});
