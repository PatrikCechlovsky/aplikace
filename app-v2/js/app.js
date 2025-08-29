window.App = (function() {
    'use strict';
    
    console.log('Inicializace aplikace...');
    
    // Inicializace aplikace
    function initApp() {
        try {
            // 1. Inicializace AppState
            AppState.init();
            
            // 2. Inicializace komponent - OPRAVENO
            // Sidebar.init(); // <- TOTO SMAŽ nebo zakomentuj
            
            // 3. Vykreslení navigace
            Sidebar.render();
            
            // 4. Zobrazit hlavní panel
            Dashboard.render();
            
            // 5. Nastavení aktivní položky v menu
            setActiveMenuItem();
            
        } catch (error) {
            console.error('❌ Chyba při inicializaci komponent:', error);
        }
    }
    
    // ... zbytek kódu zůstává stejný
