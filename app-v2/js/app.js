// Hlavní aplikační soubor
(function() {
    'use strict';
    
    // Inicializace aplikace
    function initApp() {
        console.log('Inicializace aplikace...');
        
        // 1. Inicializace komponent
        try {
            // Sidebar
            if (window.Sidebar) {
                Sidebar.init();
                console.log('✓ Sidebar inicializován');
            } else {
                console.error('✗ Sidebar komponenta nenalezena');
            }
            
            // Modal
            if (window.Modal) {
                Modal.init();
                console.log('✓ Modal inicializován');
            } else {
                console.error('✗ Modal komponenta nenalezena');
            }
            
        } catch (error) {
            console.error('Chyba při inicializaci komponent:', error);
        }
        
        // 2. Nastavení event handlerů
        setupEventHandlers();
        
        // 3. Načtení dat ze state
        if (window.AppState) {
            console.log('✓ AppState dostupný');
            // Pokud nejsou data, inicializuj s testovacími daty
            if (AppState.getData('pronajimatele').length === 0) {
                console.log('Inicializace s testovacími daty...');
                AppState.initWithMockData();
            }
        } else {
            console.error('✗ AppState nenalezen');
        }
        
        console.log('Aplikace připravena! 🚀');
    }
    
    // Nastavení globálních event handlerů
    function setupEventHandlers() {
        // Tlačítko "Přidat záznam"
        const btnAdd = document.getElementById('btnAdd');
        if (btnAdd) {
            btnAdd.addEventListener('click', () => {
                const currentModule = AppState.get('currentModule');
                if (currentModule) {
                    Modal.open('Přidat nový záznam', '<p>Formulář pro přidání záznamu...</p>');
                } else {
                    alert('Nejdříve vyberte modul z menu');
                }
            });
        }
        
        // Tlačítko "Zrušit filtr"
        const btnReset = document.getElementById('btnReset');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                console.log('Reset filtru');
                // TODO: Implementovat reset filtru
            });
        }
        
        // Tlačítko zpět
        const btnBack = document.getElementById('btnBack');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                window.history.back();
            });
        }
        
        // Reakce na změny velikosti okna
        window.addEventListener('resize', debounce(() => {
            console.log('Změna velikosti okna');
        }, 250));
    }
    
    // Pomocná funkce pro debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Čekání na načtení DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        // DOM už je načtený
        initApp();
    }
    
    // Export globálních funkcí
    window.App = {
        version: '2.0.0',
        
        // Pomocná funkce pro zobrazení toast notifikací
        showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
                <span class="toast-message">${message}</span>
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    };
    
})();