// Inicializační data pro aplikaci
window.initData = (function() {
    'use strict';
    
    // Kontrola, zda již byla data inicializována
    function isInitialized() {
        return localStorage.getItem('data_initialized') === 'true';
    }
    
    // Inicializace dat
    function init() {
        if (isInitialized()) {
            console.log('Data již byla inicializována');
            return;
        }
        
        console.log('Inicializuji ukázková data...');
        
        // Data nemovitostí
        const nemovitostiData = [
            {
                id: "N0001",
                typ: "bytovy_dum",
                nazev: "Bytový dům Centrum",
                pronajimatel_id: "5",  // ABC Development s.r.o.
                ulice: "Václavské náměstí",
                cisloPopisne: "832/21",
                mesto: "Praha",
                psc: "110 00",
                stat: "Česká republika",
                pocetJednotek: 48,
                pocetNadzemnichPodlazi: 8,
                pocetPodzemnichPodlazi: 2,
                rokVystavby: 2015,
                vybaveni: ["vytah", "parkovani", "kolarna", "kocarkarna"],
                spravce: "Správa nemovitostí Praha s.r.o.",
                poznamka: "Moderní bytový dům v centru Prahy",
                created_at: new Date().toISOString()
            },
            {
                id: "N0002",
                typ: "admin_budova",
                nazev: "Office Park Brno",
                pronajimatel_id: "6",  // Reality Partner a.s.
                ulice: "Technologická",
                cisloPopisne: "1001/5",
                mesto: "Brno",
                psc: "612 00",
                stat: "Česká republika",
                pocetJednotek: 25,
                pocetNadzemnichPodlazi: 5,
                pocetPodzemnichPodlazi: 1,
                rokVystavby: 2018,
                vybaveni: ["vytah", "parkovani"],
                spravce: "Facility Management Brno",
                created_at: new Date().toISOString()
            },
            {
                id: "N0003",
                typ: "rodinny_dum",
                nazev: "Rodinný dům Vinohrady",
                pronajimatel_id: "7",  // Bytové družstvo Vinohrady
                ulice: "Vinohradská",
                cisloPopisne: "456",
                mesto: "Praha",
                psc: "120 00",
                stat: "Česká republika",
                pocetJednotek: 2,
                pocetNadzemnichPodlazi: 2,
                pocetPodzemnichPodlazi: 1,
                rokVystavby: 1935,
                rokRekonstrukce: 2020,
                vybaveni: ["zahrada", "parkovani"],
                created_at: new Date().toISOString()
            },
            {
                id: "N0004",
                typ: "prumyslovy",
                nazev: "Skladový areál Ostrava",
                pronajimatel_id: "8",  // Společenství vlastníků Zelená 42
                ulice: "Průmyslová",
                cisloPopisne: "1500",
                mesto: "Ostrava",
                psc: "702 00",
                stat: "Česká republika",
                pocetJednotek: 10,
                pocetNadzemnichPodlazi: 1,
                rokVystavby: 2008,
                vybaveni: ["parkovani"],
                spravce: "Industrial Property Management",
                created_at: new Date().toISOString()
            }
        ];
        
        // Data jednotek
        const jednotkyData = [
            // Jednotky pro N0001 - Bytový dům Centrum
            {
                id: "J0001",
                nemovitost_id: "N0001",
                oznaceni: "1A",
                typ: "byt",
                podlazi: "1",
                plocha: 65,
                dispozice: "2+kk",
                pocetMistnosti: 2,
                stav: "obsazena",
                najemce_id: "1",  // Jan Novák
                mesicniNajem: 25000,
                datumZacatkuNajmu: "2024-01-01",
                created_at: new Date().toISOString()
            },
            {
                id: "J0002",
                nemovitost_id: "N0001",
                oznaceni: "2B",
                typ: "byt",
                podlazi: "2",
                plocha: 85,
                dispozice: "3+1",
                pocetMistnosti: 3,
                stav: "volna",
                mesicniNajem: 32000,
                created_at: new Date().toISOString()
            },
            {
                id: "J0003",
                nemovitost_id: "N0001",
                oznaceni: "3C",
                typ: "byt",
                podlazi: "3",
                plocha: 120,
                dispozice: "4+kk",
                pocetMistnosti: 4,
                stav: "obsazena",
                najemce: "Rodina Dvořákových",
                mesicniNajem: 45000,
                datumZacatkuNajmu: "2023-06-01",
                created_at: new Date().toISOString()
            },
            // Jednotky pro N0002 - Office Park Brno
            {
                id: "J0004",
                nemovitost_id: "N0002",
                oznaceni: "101",
                typ: "kancelar",
                podlazi: "1",
                plocha: 250,
                stav: "obsazena",
                najemce_id: "3",  // Petr Dvořák (OSVČ)
                mesicniNajem: 50000,
                datumZacatkuNajmu: "2023-01-01",
                created_at: new Date().toISOString()
            },
            {
                id: "J0005",
                nemovitost_id: "N0002",
                oznaceni: "201",
                typ: "kancelar",
                podlazi: "2",
                plocha: 180,
                stav: "volna",
                mesicniNajem: 36000,
                created_at: new Date().toISOString()
            },
            {
                id: "J0006",
                nemovitost_id: "N0002",
                oznaceni: "301",
                typ: "kancelar",
                podlazi: "3",
                plocha: 150,
                stav: "rezervovana",
                najemce: "Tech Startup s.r.o.",
                mesicniNajem: 30000,
                created_at: new Date().toISOString()
            },
            // Jednotky pro N0003 - Rodinný dům Vinohrady
            {
                id: "J0007",
                nemovitost_id: "N0003",
                oznaceni: "Přízemí",
                typ: "byt",
                podlazi: "přízemí",
                plocha: 95,
                dispozice: "3+1",
                pocetMistnosti: 3,
                stav: "obsazena",
                najemce_id: "2",  // Marie Svobodová
                mesicniNajem: 35000,
                datumZacatkuNajmu: "2023-03-01",
                created_at: new Date().toISOString()
            },
            {
                id: "J0008",
                nemovitost_id: "N0003",
                oznaceni: "1. patro",
                typ: "byt",
                podlazi: "1",
                plocha: 95,
                dispozice: "3+1",
                pocetMistnosti: 3,
                stav: "volna",
                mesicniNajem: 35000,
                created_at: new Date().toISOString()
            },
            // Jednotky pro N0004 - Skladový areál Ostrava
            {
                id: "J0009",
                nemovitost_id: "N0004",
                oznaceni: "Sklad A1",
                typ: "sklad",
                podlazi: "přízemí",
                plocha: 500,
                stav: "obsazena",
                najemce: "Logistika CZ s.r.o.",
                mesicniNajem: 40000,
                datumZacatkuNajmu: "2022-01-01",
                created_at: new Date().toISOString()
            },
            {
                id: "J0010",
                nemovitost_id: "N0004",
                oznaceni: "Sklad A2",
                typ: "sklad",
                podlazi: "přízemí",
                plocha: 300,
                stav: "volna",
                mesicniNajem: 24000,
                created_at: new Date().toISOString()
            }
        ];
        
        // Uložit data do localStorage
        localStorage.setItem('nemovitosti_data', JSON.stringify(nemovitostiData));
        localStorage.setItem('jednotky_data', JSON.stringify(jednotkyData));
        
        // Označit, že data byla inicializována
        localStorage.setItem('data_initialized', 'true');
        
        console.log('Ukázková data byla úspěšně inicializována');
        console.log(`- Nemovitosti: ${nemovitostiData.length}`);
        console.log(`- Jednotky: ${jednotkyData.length}`);
    }
    
    // Reset dat
    function reset() {
        if (confirm('Opravdu chcete resetovat všechna data? Tato akce je nevratná!')) {
            // Smazat data nemovitostí
            localStorage.removeItem('nemovitosti_data');
            localStorage.removeItem('jednotky_data');
            
            // Smazat příznak inicializace
            localStorage.removeItem('data_initialized');
            
            console.log('Data byla resetována');
            
            // Znovu inicializovat
            init();
            
            // Obnovit stránku
            location.reload();
        }
    }
    
    // Public API
    return {
        init: init,
        reset: reset,
        isInitialized: isInitialized
    };
})();

// Automatická inicializace při načtení
document.addEventListener('DOMContentLoaded', function() {
    window.initData.init();
});
