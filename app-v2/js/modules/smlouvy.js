// Modul Smlouvy
window.Smlouvy = (function() {
    'use strict';
    
    const moduleName = 'smlouvy';
    const moduleTitle = 'Smlouvy';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>📄 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box stat-success">
                        <div class="stat-value">12</div>
                        <div class="stat-label">Aktivní smlouvy</div>
                    </div>
                    <div class="stat-box stat-warning">
                        <div class="stat-value">3</div>
                        <div class="stat-label">Končí do 30 dnů</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">5</div>
                        <div class="stat-label">Ukončené</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="contracts-list">
                    <div class="contract-card active">
                        <div class="contract-header">
                            <h3>Smlouva č. 2024/001</h3>
                            <span class="status active">Aktivní</span>
                        </div>
                        <p>Nájemník: Jan Novák</p>
                        <p>Nemovitost: Praha 2, Vinohrady</p>
                        <p>Platnost: 1.1.2024 - 31.12.2024</p>
                    </div>
                    
                    <div class="empty-state">
                        <p>📄 Zde budou zobrazeny všechny smlouvy</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    return {
        render(type = 'all') {
            const container = document.getElementById('main-content');
            if (!container) return;
            
            container.innerHTML = renderOverview();
        }
    };
})();
