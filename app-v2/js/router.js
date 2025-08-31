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

        const moduleName = routes[module];
        if (moduleName && window[moduleName]) {
            const mainContent = document.getElementById('main-content'); // <-- TADY ZMĚNA
            if (mainContent) {
                // Kontrola jestli modul má render metodu
                if (window[moduleName].render) {
                    window[moduleName].render(action);
                } else {
                    mainContent.innerHTML = `<div class="empty-state">Modul ${moduleName} ještě není implementován</div>`;
                }
            }
        } else {
            console.error(`Modul ${module} nenalezen`);
        }
        
        // Aktualizovat breadcrumb
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
