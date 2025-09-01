// Router pro navigaci v aplikaci
window.Router = (function() {
    'use strict';

    // Mapování rout na moduly
    const routes = {
        'dashboard': 'Dashboard',
        'pronajimatel': 'Pronajimatel',
        'najemnici': 'Najemnici',
        'nemovitosti': 'Nemovitosti',
        'smlouvy': 'Smlouvy',
        'platby': 'Platby',
        'sluzby': 'Sluzby',
        'reporty': 'Reporty',
        'finance': 'Finance',
        'energie': 'Energie',
        'udrzba': 'Udrzba',
        'dokumenty': 'Dokumenty',
        'komunikace': 'Komunikace',
        'uzivatele': 'Uzivatele',
        'nastaveni': 'Nastaveni',
        'muj-ucet': 'MujUcet'
    };

    // Zpracování routy
    function handleRoute() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const [module, action] = hash.split('/');

        console.log(`Navigace: ${module}${action ? '/' + action : ''}`);
        
        // DEBUG - vypsat všechny dostupné moduly
        console.log('Hledám modul:', module);
        console.log('Má být název objektu:', routes[module]);
        console.log('Existuje window.' + routes[module] + '?', window[routes[module]]);
        console.log('Typ:', typeof window[routes[module]]);

        const moduleName = routes[module];
        if (moduleName && window[moduleName]) {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                if (window[moduleName].render) {
                    window[moduleName].render(action);
                    
                    if (window.AppState) {
                        AppState.set('currentModule', module);
                    }
                } else {
                    mainContent.innerHTML = `<div class="empty-state">Modul ${moduleName} ještě není implementován</div>`;
                }
            }
        } else {
            console.error(`❌ Modul ${module} nenalezen`);
            console.error(`Hledal jsem: window.${moduleName}`);
            
            // Vypsat všechny dostupné moduly
            console.log('📋 Dostupné moduly:');
            Object.keys(window).forEach(key => {
                if (key.match(/^[A-Z]/) && typeof window[key] === 'object' && window[key].render) {
                    console.log(`  ✓ ${key}`);
                }
            });
        }
        
        updateBreadcrumb(module, action);
    }
    
    // Aktualizace breadcrumb
    function updateBreadcrumb(module, action) {
        const breadcrumb = document.getElementById('breadcrumb');
        if (breadcrumb) {
            let text = 'Hlavní panel';
            if (module && module !== 'dashboard') {
                const moduleConfig = APP_CONFIG.modules.find(m => m.id === module);
                if (moduleConfig) {
                    text = moduleConfig.name;
                    if (action && moduleConfig.types) {
                        const type = moduleConfig.types.find(t => t.id === action);
                        if (type) {
                            text += ` / ${type.name}`;
                        }
                    }
                }
            }
            breadcrumb.innerHTML = `<span>${text}</span>`;
        }
    }

    // Navigace na konkrétní routu
    function navigate(path) {
        window.location.hash = path;
    }

    return {
        handleRoute: handleRoute,
        navigate: navigate
    };
})();
