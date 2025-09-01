// Modul Údržba
window.Udrzba = (function() {
    'use strict';
    
    const moduleName = 'udrzba';
    const moduleTitle = 'Údržba';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>🔧 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box stat-danger">
                        <div class="stat-value">3</div>
                        <div class="stat-label">Urgentní</div>
                    </div>
                    <div class="stat-box stat-warning">
                        <div class="stat-value">7</div>
                        <div class="stat-label">Probíhající</div>
                    </div>
                    <div class="stat-box stat-success">
                        <div class="stat-value">15</div>
                        <div class="stat-label">Dokončeno tento měsíc</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="maintenance-requests">
                    <h3>Aktuální požadavky</h3>
                    
                    <div class="request-card urgent">
                        <div class="request-header">
                            <span class="priority">🔴 Urgentní</span>
                            <span class="date">Dnes 14:30</span>
                        </div>
                        <h4>Prasklá voda - Byt 3B</h4>
                        <p>Nájemník: Marie Svobodová</p>
                        <p>Popis: Prasklá trubka v koupelně, vytéká voda</p>
                        <div class="request-actions">
                            <button class="btn btn-primary">Přiřadit technika</button>
                        </div>
                    </div>
                    
                    <div class="request-card in-progress">
                        <div class="request-header">
                            <span class="priority">🟡 Probíhá</span>
                            <span class="date">24.1.2025</span>
                        </div>
                        <h4>Výměna zámku - Byt 1A</h4>
                        <p>Technik: Pavel Novotný</p>
                        <p>Předpokládané dokončení: 26.1.2025</p>
                    </div>
                </div>
                
                <div class="maintenance-calendar">
                    <h3>Plánovaná údržba</h3>
                    <div class="calendar-items">
                        <div class="calendar-item">
                            <span class="date">1.2.2025</span>
                            <span class="task">Revize komínů - celá budova</span>
                        </div>
                        <div class="calendar-item">
                            <span class="date">15.2.2025</span>
                            <span class="task">Servis výtahu</span>
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
