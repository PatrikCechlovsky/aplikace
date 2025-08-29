// Modul Služby
window.Sluzby = (function() {
    'use strict';
    
    const moduleName = 'sluzby';
    const moduleTitle = 'Služby';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>🛠️ ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">8</div>
                        <div class="stat-label">Definovaných služeb</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">24</div>
                        <div class="stat-label">Aktivních předpisů</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="services-grid">
                    <div class="service-card">
                        <h3>💡 Elektřina</h3>
                        <p>Společné prostory</p>
                        <p>Tarif: 5.50 Kč/kWh</p>
                    </div>
                    <div class="service-card">
                        <h3>💧 Voda</h3>
                        <p>Studená + teplá</p>
                        <p>Tarif: 89 Kč/m³</p>
                    </div>
                    <div class="service-card">
                        <h3>🔥 Vytápění</h3>
                        <p>Centrální vytápění</p>
                        <p>Paušál: 25 Kč/m²</p>
                    </div>
                    <div class="service-card">
                        <h3>🗑️ Odpad</h3>
                        <p>Komunální odpad</p>
                        <p>Paušál: 150 Kč/os./měs.</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    return {
        render(type = 'all') {
            const container = document.getElementById('mainContent');
            if (!container) return;
            
            container.innerHTML = renderOverview();
        }
    };
})();