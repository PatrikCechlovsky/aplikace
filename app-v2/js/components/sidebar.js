window.Sidebar = (function() {
    'use strict';

    let activeModule = null;

    function render() {
        const nav = document.getElementById('navigation');
        if (!nav) return;

        // Použít moduly z konfigurace
        const menuItems = APP_CONFIG.modules;

        let html = '';
        menuItems.forEach(item => {
            // Přeskočit dashboard v menu
            if (item.id === 'dashboard') return;
            
            const isExpanded = activeModule === item.id;
            
            if (item.types && item.types.length > 0) {
                html += `
                    <div class="nav-section${isExpanded ? ' expanded' : ''}" data-module="${item.id}">
                        <button class="nav-parent" data-action="${item.id}">
                            <span class="chevron">▶</span>
                            <span class="nav-icon">${item.icon || '📄'}</span>
                            <span class="nav-label">${item.name}</span>
                        </button>
                        <div class="nav-children" style="display:${isExpanded ? 'block' : 'none'};">
                            ${item.types.map(type => `
                                <button class="nav-item nav-child" data-action="${item.id}/${type.id}">
                                    ${type.icon ? `<span class="nav-icon nav-child-icon">${type.icon}</span>` : ''}
                                    <span class="nav-label">
                                        <span>${type.name}</span>
                                        ${type.id !== 'all' ? `<span class="nav-hashtag">#${type.id}</span>` : ''}
                                    </span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="nav-section" data-module="${item.id}">
                        <button class="nav-item" data-action="${item.id}">
                            <span class="nav-icon">${item.icon || '📄'}</span>
                            <span class="nav-label">${item.name}</span>
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
                    if (sec !== section) {
                        sec.classList.remove('expanded');
                        const children = sec.querySelector('.nav-children');
                        if (children) children.style.display = 'none';
                    }
                });
                
                const children = section.querySelector('.nav-children');
                if (section.classList.contains('expanded')) {
                    section.classList.remove('expanded');
                    if (children) children.style.display = 'none';
                    activeModule = null;
                } else {
                    section.classList.add('expanded');
                    if (children) children.style.display = 'block';
                    activeModule = moduleId;
                }
                
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
    }

    return {
        render
    };
})();
