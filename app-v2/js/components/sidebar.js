// Komponenta Sidebar - boční navigační panel
window.Sidebar = (function() {
    'use strict';
    
    // Privátní proměnné
    let container = null;
    let isInitialized = false;
    let activeItem = null;
    
    // Vytvoření HTML struktury navigace
    function createNavigation() {
        const nav = document.getElementById('navigation');
        if (!nav) return;
        
        // Vyčistit existující obsah
        nav.innerHTML = '';
        
        // Získat moduly z konfigurace
        const modules = window.APP_CONFIG.modules;
        
        modules.forEach(module => {
            // Vytvoř sekci pro modul
            const section = document.createElement('div');
            section.className = 'nav-section';
            section.dataset.moduleId = module.id;
            
            // Header sekce
            const header = document.createElement('div');
            header.className = 'nav-section-header';
            header.innerHTML = `
                <span class="chevron">▶</span>
                <span class="icon">${module.icon}</span>
                <span class="title">${module.name}</span>
            `;
            
            // Seznam položek
            const items = document.createElement('div');
            items.className = 'nav-section-items';
            
            // Vytvoř položky menu
            module.types.forEach(type => {
                const item = document.createElement('div');
                item.className = 'nav-item';
                item.dataset.moduleId = module.id;
                item.dataset.typeId = type.id;
                item.innerHTML = `
                    <span class="icon">${type.icon}</span>
                    <span class="name">${type.name}</span>
                `;
                
                // Kliknutí na položku
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleItemClick(module.id, type.id, item);
                });
                
                items.appendChild(item);
            });
            
            // Kliknutí na header - rozbalení/sbalení
            header.addEventListener('click', () => {
                toggleSection(section);
            });
            
            section.appendChild(header);
            section.appendChild(items);
            nav.appendChild(section);
        });
        
        // Přidej položku pro hlavní panel
        const homeItem = document.createElement('div');
        homeItem.className = 'nav-item nav-item-home';
        homeItem.innerHTML = `
            <span class="icon">🏠</span>
            <span class="name">Hlavní panel</span>
        `;
        homeItem.addEventListener('click', () => {
            handleHomeClick();
        });
        
        // Vlož hlavní panel na začátek
        nav.insertBefore(homeItem, nav.firstChild);
    }
    
    // Rozbalení/sbalení sekce
    function toggleSection(section) {
        const isOpen = section.classList.contains('open');
        
        // Zavři všechny ostatní sekce
        document.querySelectorAll('.nav-section.open').forEach(s => {
            if (s !== section) {
                s.classList.remove('open');
            }
        });
        
        // Přepni aktuální sekci
        section.classList.toggle('open', !isOpen);
    }
    
    // Kliknutí na položku menu
    function handleItemClick(moduleId, typeId, element) {
        // Označ jako aktivní
        setActiveItem(element);
        
        // Aktualizuj stav
        window.AppState.setModule(moduleId, typeId);
        
        // Naviguj na stránku
        navigateToModule(moduleId, typeId);
        
        // Na mobilu zavři sidebar
        if (window.innerWidth <= 768) {
            window.AppState.set('ui.sidebarOpen', false);
        }
    }
    
    // Kliknutí na hlavní panel
    function handleHomeClick() {
        // Označ jako aktivní
        const homeItem = document.querySelector('.nav-item-home');
        setActiveItem(homeItem);
        
        // Aktualizuj stav
        window.AppState.setModule(null, null);
        
        // Zobraz hlavní panel
        showDashboard();
        
        // Na mobilu zavři sidebar
        if (window.innerWidth <= 768) {
            window.AppState.set('ui.sidebarOpen', false);
        }
    }
    
    // Nastavení aktivní položky
    function setActiveItem(element) {
        // Odstraň aktivní třídu ze všech položek
        document.querySelectorAll('.nav-item.active').forEach(item => {
            item.classList.remove('active');
        });
        
        // Přidej aktivní třídu
        if (element) {
            element.classList.add('active');
            activeItem = element;
            
            // Rozbal rodičovskou sekci pokud je zavřená
            const section = element.closest('.nav-section');
            if (section && !section.classList.contains('open')) {
                section.classList.add('open');
            }
        }
    }
    
    // Navigace na modul
    function navigateToModule(moduleId, typeId) {
        // Aktualizuj breadcrumb
        updateBreadcrumb(moduleId, typeId);
        
        // Zobraz obsah modulu
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        // Načti modul
        const module = window[moduleId.charAt(0).toUpperCase() + moduleId.slice(1)];
        if (module && typeof module.render === 'function') {
            mainContent.innerHTML = '';
            module.render(typeId);
        } else {
            // Dočasný obsah pokud modul ještě není implementován
            mainContent.innerHTML = `
                <div class="placeholder">
                    <h2>Modul: ${moduleId}</h2>
                    <p>Typ: ${typeId}</p>
                    <p>Tento modul ještě není implementován.</p>
                </div>
            `;
        }
    }
    
    // Zobrazení hlavního panelu
    function showDashboard() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        // Aktualizuj breadcrumb
        document.getElementById('breadcrumb').innerHTML = '<span class="breadcrumb-item">Hlavní panel</span>';
        
        // Zobraz dlaždice modulů
        mainContent.innerHTML = '<div class="tiles-grid" id="dashboardTiles"></div>';
        
        const tilesContainer = document.getElementById('dashboardTiles');
        const modules = window.APP_CONFIG.modules;
        
        modules.forEach(module => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.innerHTML = `
                <div class="tile-icon">${module.icon}</div>
                <div class="tile-title">${module.name}</div>
                <div class="tile-description">${module.description}</div>
            `;
            
            tile.addEventListener('click', () => {
                // Otevři první položku modulu
                const firstType = module.types[0];
                handleItemClick(module.id, firstType.id, null);
                
                // Najdi a označ odpovídající položku v menu
                const menuItem = document.querySelector(`[data-module-id="${module.id}"][data-type-id="${firstType.id}"]`);
                if (menuItem) {
                    setActiveItem(menuItem);
                }
            });
            
            tilesContainer.appendChild(tile);
        });
    }
    
    // Aktualizace breadcrumb navigace
    function updateBreadcrumb(moduleId, typeId) {
        const breadcrumb = document.getElementById('breadcrumb');
        if (!breadcrumb) return;
        
        const module = window.APP_CONFIG.modules.find(m => m.id === moduleId);
        if (!module) return;
        
        const type = module.types.find(t => t.id === typeId);
        if (!type) return;
        
        breadcrumb.innerHTML = `
            <span class="breadcrumb-item clickable" onclick="Sidebar.goHome()">Hlavní panel</span>
            <span class="breadcrumb-item">${module.name}</span>
            <span class="breadcrumb-item">${type.name}</span>
        `;
    }
    
    // Mobilní menu
    function setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (!menuToggle || !sidebar) return;
        
        // Vytvoř overlay
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }
        
        // Toggle menu
        menuToggle.addEventListener('click', () => {
            const isOpen = sidebar.classList.contains('open');
            sidebar.classList.toggle('open', !isOpen);
            overlay.classList.toggle('active', !isOpen);
            window.AppState.set('ui.sidebarOpen', !isOpen);
        });
        
        // Zavři při kliknutí na overlay
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            window.AppState.set('ui.sidebarOpen', false);
        });
    }
    
    // Veřejné API
    return {
        // Inicializace
        init() {
            if (isInitialized) return;
            
            container = document.getElementById('sidebar');
            if (!container) {
                console.error('Sidebar container nebyl nalezen');
                return;
            }
            
            // Vytvoř navigaci
            createNavigation();
            
            // Nastav mobilní menu
            setupMobileMenu();
            
            // Zobraz hlavní panel
            showDashboard();
            
            // Přihlas se k odběru změn stavu
            window.AppState.subscribe((change) => {
                if (change.property === 'ui.sidebarOpen') {
                    const sidebar = document.getElementById('sidebar');
                    const overlay = document.querySelector('.sidebar-overlay');
                    const isOpen = window.AppState.get('ui.sidebarOpen');
                    
                    sidebar.classList.toggle('open', isOpen);
                    overlay.classList.toggle('active', isOpen);
                }
            });
            
            isInitialized = true;
            console.log('Sidebar inicializován');
        },
        
        // Přejít na hlavní panel
        goHome() {
            handleHomeClick();
        },
        
        // Získat aktivní položku
        getActiveItem() {
            return activeItem;
        },
        
        // Programově otevřít modul
        openModule(moduleId, typeId = 'all') {
            const menuItem = document.querySelector(`[data-module-id="${moduleId}"][data-type-id="${typeId}"]`);
            if (menuItem) {
                handleItemClick(moduleId, typeId, menuItem);
            }
        }
    };
})();
