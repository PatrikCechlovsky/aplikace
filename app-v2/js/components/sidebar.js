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

        // Kompletní menu - rozbalovací sekce + moduly
        const menuItems = [
            {
                id: 'pronajimatel',
                label: 'Pronajímatel',
                icon: '👤',
                action: () => window.Pronajimatel && window.Pronajimatel.render('tiles'),
                children: [
                    { label: 'Přehled', icon: '', action: () => window.Pronajimatel.render() },
                    { label: 'Osoba', icon: '', action: () => window.Pronajimatel.edit('osoba') },
                    { label: 'OSVČ', icon: '🧑‍💼', action: () => window.Pronajimatel.edit('osvc') },
                    { label: 'Firma', icon: '🏢', action: () => window.Pronajimatel.edit('firma') },
                    { label: 'Spolek/skupina', icon: '👥', action: () => window.Pronajimatel.edit('spolek') },
                    { label: 'Státní instituce', icon: '🏛️', action: () => window.Pronajimatel.edit('statni') }
                ]
            },
            {
                id: 'najemnici',
                label: 'Nájemníci',
                icon: '👥',
                action: () => window.Najemnici && window.Najemnici.render('tiles'),
                children: [
                    { label: 'Přehled', icon: '', action: () => window.Najemnici.render('all') },
                    { label: 'Osoba', icon: '', action: () => window.Najemnici.render('fyzicke') },
                    { label: 'OSVČ', icon: '🧑‍💼', action: () => window.Najemnici.render('osvc') },
                    { label: 'Firma', icon: '🏢', action: () => window.Najemnici.render('pravnicke') },
                    { label: 'Spolek/skupina', icon: '👥', action: () => window.Najemnici.render('spolek') },
                    { label: 'Státní instituce', icon: '🏛️', action: () => window.Najemnici.render('statni') }
                ]
            },
            {
                id: 'nemovitosti',
                label: 'Nemovitosti',
                icon: '🏘️',
                action: () => window.Nemovitosti && window.Nemovitosti.render()
            },
            {
                id: 'smlouvy',
                label: 'Smlouvy',
                icon: '📄',
                action: () => window.Smlouvy && window.Smlouvy.render()
            },
            {
                id: 'platby',
                label: 'Platby',
                icon: '💸',
                action: () => window.Platby && window.Platby.render()
            },
            {
                id: 'sluzby',
                label: 'Služby',
                icon: '⚡',
                action: () => window.Sluzby && window.Sluzby.render()
            },
            {
                id: 'reporty',
                label: 'Reporty & Grafy',
                icon: '📊',
                action: () => window.Reporty && window.Reporty.render()
            },
            {
                id: 'finance',
                label: 'Finance',
                icon: '💰',
                action: () => window.Finance && window.Finance.render()
            },
            {
                id: 'energie',
                label: 'Energie',
                icon: '🔋',
                action: () => window.Energie && window.Energie.render()
            },
            {
                id: 'udrzba',
                label: 'Údržba',
                icon: '🔧',
                action: () => window.Udrzba && window.Udrzba.render()
            },
            {
                id: 'dokumenty',
                label: 'Dokumenty',
                icon: '📁',
                action: () => window.Dokumenty && window.Dokumenty.render()
            },
            {
                id: 'komunikace',
                label: 'Komunikace',
                icon: '✉️',
                action: () => window.Komunikace && window.Komunikace.render()
            },
            {
                id: 'uzivatele',
                label: 'Uživatelé & Role',
                icon: '🧑‍🤝‍🧑',
                action: () => window.Uzivatele && window.Uzivatele.render()
            },
            {
                id: 'nastaveni',
                label: 'Nastavení',
                icon: '⚙️',
                action: () => window.Nastaveni && window.Nastaveni.render()
            },
            {
                id: 'muj-ucet',
                label: 'Můj účet',
                icon: '👤',
                action: () => window.MujUcet && window.MujUcet.render()
            }
        ];

        let html = '';
        menuItems.forEach(item => {
            if (item.children) {
                html += `
                    <div class="nav-section ${activeModule === item.id ? 'expanded' : ''}" data-module="${item.id}">
                        <button class="nav-item nav-parent" data-action="${item.id}">
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                        </button>
                        <div class="nav-children">
                            ${item.children.map(child => `
                                <button class="nav-item nav-child" data-action="${item.id}-${child.label}">
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
                        <button class="nav-item" data-action="${item.id}">
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.label}</span>
                        </button>
                    </div>
                `;
            }
        });

        nav.innerHTML = html;

        // Eventy pro klikání
        nav.querySelectorAll('button[data-action]').forEach(btn => {
            btn.onclick = function(e) {
                const actionId = btn.getAttribute('data-action');
                const mainId = btn.closest('.nav-section').getAttribute('data-module');
                const menuItem = menuItems.find(mi => mi.id === mainId);

                if (btn.classList.contains('nav-parent')) {
                    openOnlySection(mainId);
                    if (menuItem && menuItem.action) menuItem.action();
                } else if (btn.classList.contains('nav-child')) {
                    const child = menuItem && menuItem.children &&
                        menuItem.children.find(c => `${mainId}-${c.label}` === actionId);
                    if (child && child.action) child.action();
                } else if (menuItem && menuItem.action) {
                    menuItem.action();
                }
            };
        });
    }

    return {
        render,
        openOnlySection
    };
})();
