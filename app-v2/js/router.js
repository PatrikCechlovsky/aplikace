// Router pro navigaci v aplikaci
window.Router = (function() {
    'use strict';

    // Mapování rout na moduly
    const routes = {
        'dashboard': 'Dashboard',
        'najemnici': 'Najemnici',
        'platby': 'Platby',
        'smlouvy': 'Smlouvy',
        'jednotky': 'Jednotky',
        'dokumenty': 'Dokumenty',
        'nastaveni': 'Nastaveni'
    };

    // Zpracování routy
    function handleRoute() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const [module, action] = hash.split('/');

        console.log(`Navigace: ${module}${action ? '/' + action : ''}`);

        const moduleName = routes[module];
        if (moduleName && window[moduleName]) {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = window[moduleName].render(action);
            }
        } else {
            console.error(`Modul ${module} nenalezen`);
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
