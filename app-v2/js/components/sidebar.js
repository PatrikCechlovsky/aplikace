window.Sidebar = (function() {
    'use strict';
    
    let activeModule = null;
    
    // Přidáme funkci pro otevření konkrétní sekce
    function openOnlySection(moduleId) {
        // Zavřít všechny sekce
        const allSections = document.querySelectorAll('.nav-section');
        allSections.forEach(section => {
            section.classList.remove('expanded');
        });
        
        // Najít a otevřít konkrétní sekci
        const targetSection = document.querySelector(`[data-module="${moduleId}"]`);
        if (targetSection) {
            const parentSection = targetSection.closest('.nav-section');
            if (parentSection) {
                parentSection.classList.add('expanded');
                activeModule = moduleId;
            }
        }
    }
    
    // Existující render funkce upravíme
    function render() {
        const nav = document.getElementById('navigation');
        if (!nav) return;
        
        const menuItems = [
            {
                id: 'dashboard',
                label: 'Hlavní panel',
                icon: '🏠',
                action: () => {
                    window.Dashboard.render();
                    activeModule = 'dashboard';
                }
            },
            {
                id: 'pronajimatel',
                label: 'Pronajímatel',
                icon: '👤',
                children: [
                    { label: 'Přehled', action: () => window.Pronajimatel.render() },
                    { label: 'Osoba', action: () => window.Pronajimatel.edit('osoba') },
                    { label: 'OSVČ', action: () => window.Pronajimatel.edit('osvc') },
                    { label: 'Firma', action: () => window.Pronajimatel.edit('firma') },
                    { label: 'Spolek/skupina', action: () => window.Pronajimatel.edit('spolek') },
                    { label: 'Státní instituce', action: () => window.Pronajimatel.edit('statni') }
                ]
            },
            // ... další položky menu
        ];
        
        let html = '';
        menuItems.forEach(item => {
            if (item.children) {
                html += `
                    <div class="nav-section ${activeModule === item.id ? 'expanded' : ''}" data-module="${item.id}">
                        <button class="nav-item nav-parent">
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                            <span class="nav-arrow">›</span>
                        </button>
                        <div class="nav-children">
                            ${item.children.map(child => `
                                <button class="nav-item nav-child" data-action="${child.label}">
                                    <span class="nav-label">${child.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <button class="nav-item" data-module="${item.id}">
                        <span class="nav-icon">${item.icon}</span>
                        <span class="nav-label">${item.label}</span>
                    </button>
                `;
            }
        });
        
        nav.innerHTML = html;
        attachEventListeners();
    }
    
    return {
        render: render,
        openOnlySection: openOnlySection
    };
})();
