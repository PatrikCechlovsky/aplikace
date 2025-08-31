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
            const isExpanded = activeModule === item.id;
            
            if (item.types && item.types.length > 0) {
                html += `
                    <div class="nav-section${isExpanded ? ' expanded' : ''}" data-module="${item.id}">
                        <button class="nav-parent" data-action="${item.id}">
                            <span class="chevron">▶</span>
                            <span class="nav-icon">${item.icon}</span>
                            <span class="nav-label">${item.name}</span>
                        </button>
                        <div class="nav-children" style="display:${isExpanded ? 'block' : 'none'};">
                            ${item.types.map(type => `
                                <button class="nav-item nav-child" data-action="${item.id}/${type.id}">
                                    <span class="nav-label">
                                        ${type.name}
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
                        <button class="nav-item${item.id === 'dashboard' ? ' active' : ''}" data-action="${item.id}">
                            <span class="nav-icon">${item.icon}</span>
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
