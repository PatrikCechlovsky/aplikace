window.App = (function() {
    'use strict';

    console.log('Inicializace aplikace...');

    // Inicializace aplikace
    function initApp() {
        try {
            // Načti uložené téma
            const savedTheme = localStorage.getItem('appTheme') || 'dark';
            document.body.className = `theme-${savedTheme}`;
            
            // 1. Inicializace AppState
            if (window.AppState && AppState.init) AppState.init();

            // 2. Vykreslení navigace
            if (window.Sidebar && Sidebar.render) Sidebar.render();

            // 3. Zobrazit hlavní panel při startu
            if (window.Dashboard && Dashboard.render) {
                Dashboard.render();
            }

            // 4. Nastavení aktivní položky v menu
            setActiveMenuItem();

            // 5. Inicializace routeru
            if (window.Router && Router.handleRoute) {
                // Pokud není hash, nastav dashboard
                if (!window.location.hash) {
                    window.location.hash = '#dashboard';
                } else {
                    Router.handleRoute();
                }
            }

        } catch (error) {
            console.error('❌ Chyba při inicializaci komponent:', error);
        }
    }

    // Kontrola dostupnosti všech komponent
    function checkComponents() {
        console.log('🔍 Kontrola komponent:');
        const components = ['AppState', 'Sidebar', 'Router', 'Dashboard', 'Modal', 'Forms'];
        components.forEach(comp => {
            if (window[comp]) {
                console.log(`✓ ${comp} dostupný`);
            } else {
                console.error(`✗ ${comp} chybí!`);
            }
        });
    }

    // Nastavení aktivní položky menu podle URL
    function setActiveMenuItem() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const menuItems = document.querySelectorAll('.nav-item');

        menuItems.forEach(item => {
            const action = item.getAttribute('data-action');
            if (action === hash) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Zobrazení toast notifikace
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        // Zobrazit toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Skrýt a odstranit po 3s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Responzivní chování
    function handleResponsive() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        if (window.innerWidth <= 768) {
            sidebar?.classList.add('mobile');
            mainContent?.classList.add('mobile');
        } else {
            sidebar?.classList.remove('mobile');
            mainContent?.classList.remove('mobile');
        }
    }

    // Event listenery
    window.addEventListener('resize', () => {
        handleResponsive();
    });

    window.addEventListener('hashchange', () => {
        setActiveMenuItem();
        if (window.Router && Router.handleRoute) Router.handleRoute();
    });

    // Veřejné API
    return {
        init: initApp,
        checkComponents,
        showToast,
        handleResponsive
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    App.init();
    App.checkComponents();
    console.log('✅ Aplikace připravena! 🚀');
});
