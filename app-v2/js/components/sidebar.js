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
            
            // Header sekce - hlavní řádek modulu
            const header = document.createElement('div');
            header.className = 'nav-section-header';
            header.innerHTML = `
                <span class="chevron">▶</span>
                <span class="icon">${module.icon}</span>
                <span class="title">${module.name}</span>
            `;
            
            // Seznam položek - odsazené submenu
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
    }
    
    // Rozbalení/sbalení sekce
    function toggleSection(section) {
        const isOpen = section.classList.contains('open');
        const chevron = section.querySelector('.chevron');
        
        if (isOpen) {
            section.classList.remove('open');
            chevron.textContent = '▶';
        } else {
            section.classList.add('open');
            chevron.textContent = '▼';
        }
    }
    
    // Kliknutí na položku menu
    function handleItemClick(moduleId, typeId, element) {
        // Označ jako aktivní
        setActiveItem(element);
        
        // Aktualizuj stav
        window.AppState.setModule(moduleId, typeId);
        
        // Aktualizuj breadcrumb
        updateBreadcrumb(moduleId, typeId);
        
        // Naviguj na stránku
        navigateToModule(moduleId, typeId);
        
        // Na mobilu zavři sidebar
        if (window.innerWidth <= 768) {
            window.AppState.set('ui.sidebarOpen', false);
        }
    }
    
    // Kliknutí na logo/brand - návrat na hlavní panel
    function setupBrandClick() {
        const brand = document.querySelector('.brand');
        if (brand) {
            brand.style.cursor = 'pointer';
            brand.addEventListener('click', goHome);
        }
    }
    
    // Přejít na hlavní panel
    function goHome() {
        // Odznač aktivní položky
        document.querySelectorAll('.nav-item.active').forEach(item => {
            item.classList.remove('active');
        });
        
        // Sbal všechny sekce
        document.querySelectorAll('.nav-section.open').forEach(section => {
            section.classList.remove('open');
            section.querySelector('.chevron').textContent = '▶';
        });
        
        // Aktualizuj stav
        window.AppState.setModule(null, null);
        
        // Zobraz hlavní panel
        showDashboard();
        
        // Aktualizuj breadcrumb
        updateBreadcrumb(null, null);
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
                section.querySelector('.chevron').textContent = '▼';
            }
        }
    }
    
    // Navigace na modul
    function navigateToModule(moduleId, typeId) {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        // Získej název modulu s velkým prvním písmenem
        const moduleName = moduleId.charAt(0).toUpperCase() + moduleId.slice(1);
        
        // Najdi modul
        const module = window[moduleName];
        if (module && typeof module.render === 'function') {
            mainContent.innerHTML = '';
            module.render(typeId);
        } else {
            // Dočasný obsah pokud modul ještě není implementován
            mainContent.innerHTML = `
                <div class="placeholder">
                    <h2>Modul: ${moduleId}</h2>
                    <p>Typ: ${typeId}</p>
                    <p>Tento modul ještě není plně implementován.</p>
                </div>
            `;
        }
    }
    
    // Zobrazení hlavního panelu s dlaždicemi
    function showDashboard() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <div class="dashboard-header">
                <h1>Hlavní panel</h1>
                <p>Rychlý přístup k důležitým funkcím</p>
            </div>
            
            <div class="pinned-section">
                <h2>⭐ Připnuté</h2>
                <div class="tiles-grid" id="pinnedTiles"></div>
            </div>
            
            <div class="modules-section">
                <h2>📦 Moduly</h2>
                <div class="tiles-grid" id="moduleTiles"></div>
            </div>
        `;
        
        // Načti připnuté položky
        const pinnedItems = AppState.get('pinnedItems') || [];
        const pinnedContainer = document.getElementById('pinnedTiles');
        
        if (pinnedItems.length === 0) {
            pinnedContainer.innerHTML = '<p class="empty-state">Zatím nemáte žádné připnuté položky</p>';
        } else {
            // TODO: Zobrazit připnuté položky
        }
        
        // Zobraz moduly
        const tilesContainer = document.getElementById('moduleTiles');
        const modules = window.APP_CONFIG.modules;
        
        modules.forEach(module => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.moduleId = module.id;
            tile.innerHTML = `
                <button class="pin-button" title="Připnout na hlavní panel" onclick="event.stopPropagation(); Sidebar.togglePin('${module.id}', 'module')">
                    <span class="pin-icon">⭐</span>
                </button>
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
        
        if (!moduleId) {
            // Hlavní panel
            breadcrumb.innerHTML = '<span class="breadcrumb-item">Hlavní panel</span>';
            return;
        }
        
        const module = window.APP_CONFIG.modules.find(m => m.id === moduleId);
        if (!module) return;
        
        const type = module.types.find(t => t.id === typeId);
        if (!type) return;
        
        // Vytvoř klikatelný breadcrumb
        breadcrumb.innerHTML = `
            <span class="breadcrumb-item clickable" onclick="Sidebar.goHome()">Hlavní panel</span>
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-item clickable" onclick="Sidebar.openModule('${module.id}', '${module.types[0].id}')">${module.name}</span>
            <span class="breadcrumb-separator">›</span>
            <span class="breadcrumb-item">${type.name}</span>
        `;
    }
    
    // Připnutí/odepnutí položky
    function togglePin(itemId, itemType) {
        const pinnedItems = AppState.get('pinnedItems') || [];
        const itemIndex = pinnedItems.findIndex(item => item.id === itemId && item.type === itemType);
        
        if (itemIndex > -1) {
            // Odepnout
            pinnedItems.splice(itemIndex, 1);
            App.showToast('Odepnuto z hlavního panelu', 'info');
        } else {
            // Připnout
            pinnedItems.push({ id: itemId, type: itemType });
            App.showToast('Připnuto na hlavní panel', 'success');
        }
        
        AppState.set('pinnedItems', pinnedItems);
        
        // Pokud jsme na hlavním panelu, aktualizuj ho
        if (!AppState.get('currentModule')) {
            showDashboard();
        }
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
            
            // Nastav kliknutí na brand/logo
            setupBrandClick();
            
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
        goHome,
        
        // Připnout/odepnout položku
        togglePin,
        
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
