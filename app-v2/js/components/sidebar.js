window.Sidebar = (function() {
    'use strict';

    let activeModule = null;

    // Seznam modulů
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Hlavní panel',
            icon: '🏠',
            module: 'Dashboard'
        },
        {
            id: 'pronajimatel',
            label: 'Pronajímatel',
            icon: '👤',
            module: 'Pronajimatel',
            children: [
                { label: 'Přehled', action: 'all' },
                { label: 'Osoba', action: 'osoba' },
                { label: 'OSVČ', icon: '🧑‍💼', action: 'osvc' },
                { label: 'Firma', icon: '🏢', action: 'firma' },
                { label: 'Spolek/skupina', icon: '👥', action: 'spolek' },
                { label: 'Státní instituce', icon: '🏛️', action: 'stat' }
            ]
        },
        {
            id: 'najemnici',
            label: 'Nájemníci',
            icon: '👥',
            module: 'Najemnici',
            children: [
                { label: 'Přehled', action: 'all' },
                { label: 'Osoba', action: 'osoba' },
                { label: 'OSVČ', icon: '🧑‍💼', action: 'osvc' },
                { label: 'Firma', icon: '🏢', action: 'firma' },
                { label: 'Spolek/skupina', icon: '👥', action: 'spolek' },
                { label: 'Státní instituce', icon: '🏛️', action: 'stat' }
            ]
        },
        { id: 'nemovitosti', label: 'Nemovitosti', icon: '🏘️', module: 'Nemovitosti' },
        { id: 'smlouvy', label: 'Smlouvy', icon: '📄', module: 'Smlouvy' },
        { id: 'platby', label: 'Platby', icon: '💸', module: 'Platby' },
        { id: 'sluzby', label: 'Služby', icon: '⚡', module: 'Sluzby' },
        { id: 'reporty', label: 'Reporty & Grafy', icon: '📊', module: 'Reporty' },
        { id: 'finance', label: 'Finance', icon: '💰', module: 'Finance' },
        { id: 'energie', label: 'Energie', icon: '🔋', module: 'Energie' },
        { id: 'udrzba', label: 'Údržba', icon: '🔧', module: 'Udrzba' },
        { id: 'dokumenty', label: 'Dokumenty', icon: '📁', module: 'Dokumenty' },
        { id: 'komunikace', label: 'Komunikace', icon: '✉️', module: 'Komunikace' },
        { id: 'uzivatele', label: 'Uživatelé & Role', icon: '🧑‍🤝‍🧑', module: 'Uzivatele' },
        { id: 'nastaveni', label: 'Nastavení', icon: '⚙️', module: 'Nastaveni' },
        { id: 'muj-ucet', label: 'Můj účet', icon: '👤', module: 'MujUcet' }
    ];

    function render() {
        const nav = document.getElementById('navigation');
        if (!nav) return;

        let html = '';
        menuItems.forEach(item => {
            const isExpanded = activeModule === item.id;
            
            if (item.children) {
                html += `
                    <div class="nav-section${isExpanded ? ' expanded' : ''}" data-module="${item.id}">
                        <button class="nav-parent" data-action="${item.id}">
                            <span class="chevron">▶</span>
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                        </button>
                        <div class="nav-children" style="display:${isExpanded ? 'block' : 'none'};">
                            ${item.children.map(child => `
                                <button class="nav-item nav-child" data-action="${item.id}/${child.action}">
                                    ${child.icon ? `<span class="nav-icon">${child.icon}</span>` : ''}
                                    <span class="nav-label">${child.label}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="nav-section" data-module="${item.id}">
                        <button class="nav-item${item.id === 'dashboard' ? ' active' : ''}" data-action="${item.id}">
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                        </button>
                    </div>
                `;
            }
        });

        nav.innerHTML = html;

        // Event handlery
        nav.querySelectorAll('.nav-parent').forEach(btn => {
            btn.onclick = function(e) {
                const section = btn.closest('.nav-section');
                const moduleId = section.getAttribute('data-module');
                
                // Toggle expand/collapse
                document.querySelectorAll('.nav-section').forEach(sec => {
                    if (sec !== section) sec.classList.remove('expanded');
                });
                section.classList.toggle('expanded');
                
                activeModule = section.classList.contains('expanded') ? moduleId : null;
                render();
                
                // Navigate to module
                window.location.hash = moduleId;
            };
        });

        nav.querySelectorAll('.nav-item:not(.nav-parent)').forEach(btn => {
            btn.onclick = function(e) {
                const action = btn.getAttribute('data-action');
                window.location.hash = action;
            };
        });

        nav.querySelectorAll('.nav-child').forEach(btn => {
            btn.onclick = function(e) {
                const action = btn.getAttribute('data-action');
                window.location.hash = action;
            };
        });
    }

    return {
        render
    };
})();
