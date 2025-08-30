// Moderní rozbalovací sidebar s šipkou & tmavým stylem
window.Sidebar = (function() {
    'use strict';

    let activeModule = null;

    // Seznam modulů (úprava dle potřeby)
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
        { id: 'nemovitosti', label: 'Nemovitosti', icon: '🏘️', action: () => window.Nemovitosti && window.Nemovitosti.render() },
        { id: 'smlouvy', label: 'Smlouvy', icon: '📄', action: () => window.Smlouvy && window.Smlouvy.render() },
        { id: 'platby', label: 'Platby', icon: '💸', action: () => window.Platby && window.Platby.render() },
        { id: 'sluzby', label: 'Služby', icon: '⚡', action: () => window.Sluzby && window.Sluzby.render() },
        { id: 'reporty', label: 'Reporty & Grafy', icon: '📊', action: () => window.Reporty && window.Reporty.render() },
        { id: 'finance', label: 'Finance', icon: '💰', action: () => window.Finance && window.Finance.render() },
        { id: 'energie', label: 'Energie', icon: '🔋', action: () => window.Energie && window.Energie.render() },
        { id: 'udrzba', label: 'Údržba', icon: '🔧', action: () => window.Udrzba && window.Udrzba.render() },
        { id: 'dokumenty', label: 'Dokumenty', icon: '📁', action: () => window.Dokumenty && window.Dokumenty.render() },
        { id: 'komunikace', label: 'Komunikace', icon: '✉️', action: () => window.Komunikace && window.Komunikace.render() },
        { id: 'uzivatele', label: 'Uživatelé & Role', icon: '🧑‍🤝‍🧑', action: () => window.Uzivatele && window.Uzivatele.render() },
        { id: 'nastaveni', label: 'Nastavení', icon: '⚙️', action: () => window.Nastaveni && window.Nastaveni.render() },
        { id: 'muj-ucet', label: 'Můj účet', icon: '👤', action: () => window.MujUcet && window.MujUcet.render() }
    ];

    function render() {
        const nav = document.getElementById('navigation');
        if (!nav) return;

        let html = `<div class="brand"><span class="nav-icon">🏠</span> Aplikace pronajímatel</div>`;
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
        nav.querySelectorAll('.nav-parent').forEach(btn => {
            btn.onclick = function(e) {
                const section = btn.closest('.nav-section');
                document.querySelectorAll('.nav-section').forEach(sec => sec.classList.remove('expanded'));
                section.classList.add('expanded');
                activeModule = section.getAttribute('data-module');
                render(); // re-render pro aktualizaci view
                // Zobraz dlaždice v hlavní části aplikace
                const menuItem = menuItems.find(mi => mi.id === activeModule);
                if (menuItem && menuItem.action) menuItem.action();
            };
        });

        nav.querySelectorAll('.nav-child').forEach(btn => {
            btn.onclick = function(e) {
                // Zde můžeš doplnit specifické akce pro podmoduly
            };
        });

        nav.querySelectorAll('.nav-item').forEach(btn => {
            btn.onkeydown = function(e) {
                if (e.key === 'Enter' || e.key === ' ') btn.click();
            }
        });
    }

    return {
        render
    };
})();
