// Modul Finance
window.Finance = (function() {
    'use strict';
    
    const moduleName = 'finance';
    const moduleTitle = 'Finance';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>💳 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box stat-success">
                        <div class="stat-value">2,450,000 Kč</div>
                        <div class="stat-label">Celkový zůstatek</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">180,000 Kč</div>
                        <div class="stat-label">Měsíční příjmy</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">45,000 Kč</div>
                        <div class="stat-label">Měsíční výdaje</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="accounts-overview">
                    <h3>Bankovní účty</h3>
                    <div class="account-cards">
                        <div class="account-card">
                            <h4>🏦 Hlavní účet - ČSOB</h4>
                            <p>Číslo účtu: 123456789/0300</p>
                            <p class="balance">Zůstatek: 1,850,000 Kč</p>
                        </div>
                        <div class="account-card">
                            <h4>🏦 Spořící účet - KB</h4>
                            <p>Číslo účtu: 987654321/0100</p>
                            <p class="balance">Zůstatek: 600,000 Kč</p>
                        </div>
                    </div>
                </div>
                
                <div class="cash-flow">
                    <h3>Cash flow - Tento měsíc</h3>
                    <div class="flow-summary">
                        <div class="flow-in">
                            <h4>➕ Příjmy</h4>
                            <p>Nájemné: 165,000 Kč</p>
                            <p>Služby: 15,000 Kč</p>
                        </div>
                        <div class="flow-out">
                            <h4>➖ Výdaje</h4>
                            <p>Údržba: 25,000 Kč</p>
                            <p>Energie: 12,000 Kč</p>
                            <p>Správa: 8,000 Kč</p>
                        </div>
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
