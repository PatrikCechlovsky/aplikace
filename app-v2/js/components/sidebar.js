window.Sidebar = (function() {
    'use strict';
    
    let activeModule = null;
    
    function openOnlySection(moduleId) {
        const allSections = document.querySelectorAll('.nav-section');
        allSections.forEach(section => {
            section.classList.remove('expanded');
        });
        
        const targetSection = document.querySelector(`[data-module="${moduleId}"]`);
        if (targetSection) {
            const parentSection = targetSection.closest('.nav-section');
            if (parentSection) {
                parentSection.classList.add('expanded');
                activeModule = moduleId;
            }
        }
    }
    
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
                action: () => window.Pronajimatel && window.Pronajimatel.render('tiles'), // Přidáno 'tiles'
                children: [
                    { label: 'Přehled', action: () => window.Pronajimatel.render() },
                    { label: 'Osoba', action: () => window.Pronajimatel.edit('osoba') },
                    { label: 'OSVČ', action: () => window.Pronajimatel.edit('osvc') },
                    { label: 'Firma', action: () => window.Pronajimatel.edit('firma') },
                    { label: 'Spolek/skupina', action: () => window.Pronajimatel.edit('spolek') },
                    { label: 'Státní instituce', action: () => window.Pronajimatel.edit('statni') }
                ]
            },
            {
                id: 'najemnici',
                label: 'Nájemníci',
                icon: '👥',
                action: () => window.Najemnici && window.Najemnici.render('tiles'), // Přidáno 'tiles'
                children: [
                    { label: 'Přehled', action: () => window.Najemnici.render('all') },
                    { label: 'Osoba', action: () => window.Najemnici.render('fyzicke') },
                    { label: 'OSVČ', action: () => window.Najemnici.render('osvc') },
                    { label: 'Firma', action: () => window.Najemnici.render('pravnicke') },
                    { label: 'Spolek/skupina', action: () => window.Najemnici.render('spolek') },
                    { label: 'Státní instituce', action: () => window.Najemnici.render('statni') }
                ]
            }
            // ... další položky menu
        ];
        
        let html = '';
        menuItems.forEach(item => {
            if (item.children) {
                html += `
                    <div class="nav-section ${activeModule === item.id ? 'expanded' : ''}" data-module="${item.id}">
                        <button class="nav-item nav-parent" data-action="${item.id}">
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                            <span class="nav-arrow">›</span>
                        </button>
                        <div class="nav-children">
                            ${item.children.map(child => `
                                <button class="nav-item nav-child" data-child-action="${child.label}">
                                    <span class="nav-label">${child.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <button class="nav-item" data-action="${item.id}">
                        <span class="nav-icon">${item.icon}</span>
                        <span class="nav-label">${item.label}</span>
                    </button>
                `;
            }
        });
        
        nav.innerHTML = html;
        attachEventListeners(menuItems);
    }
    
    function attachEventListeners(menuItems) {
        // Kliknutí na hlavní položky (parent)
        document.querySelectorAll('.nav-parent').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const section = btn.closest('.nav-section');
                const wasExpanded = section.classList.contains('expanded');
                
                // Zavřít všechny
                document.querySelectorAll('.nav-section').forEach(s => {
                    s.classList.remove('expanded');
                });
                
                // Toggle aktuální
                if (!wasExpanded) {
                    section.classList.add('expanded');
                }
                
                // Spustit akci
                const actionId = btn.dataset.action;
                const menuItem = menuItems.find(item => item.id === actionId);
                if (menuItem && menuItem.action) {
                    menuItem.action();
                }
            });
        });
        
        // Kliknutí na jednotlivé položky
        document.querySelectorAll('.nav-item:not(.nav-parent)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const actionId = btn.dataset.action;
                const menuItem = menuItems.find(item => item.id === actionId);
                if (menuItem && menuItem.action) {
                    menuItem.action();
                }
            });
        });
        
        // Kliknutí na child položky
        document.querySelectorAll('.nav-child').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const parentSection = btn.closest('.nav-section');
                const parentId = parentSection.dataset.module;
                const childLabel = btn.dataset.childAction;
                
                const parentItem = menuItems.find(item => item.id === parentId);
                if (parentItem && parentItem.children) {
                    const childItem = parentItem.children.find(child => child.label === childLabel);
                    if (childItem && childItem.action) {
                        childItem.action();
                    }
                }
            });
        });
    }
    
    return {
        render: render,
        openOnlySection: openOnlySection
    };
})();
