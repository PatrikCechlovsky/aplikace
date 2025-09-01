// Modul Energie
window.Energie = (function() {
    'use strict';
    
    const moduleName = 'energie';
    const moduleTitle = 'Energie';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>⚡ ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">45</div>
                        <div class="stat-label">Měřáků celkem</div>
                    </div>
                    <div class="stat-box stat-warning">
                        <div class="stat-value">8</div>
                        <div class="stat-label">Čeká na odečet</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="energy-types">
                    <div class="energy-card electricity">
                        <h3>💡 Elektřina</h3>
                        <p>Spotřeba tento měsíc: 2,450 kWh</p>
                        <p>Náklady: 13,475 Kč</p>
                        <div class="meter-count">15 měřáků</div>
                    </div>
                    
                    <div class="energy-card gas">
                        <h3>🔥 Plyn</h3>
                        <p>Spotřeba tento měsíc: 890 m³</p>
                        <p>Náklady: 22,250 Kč</p>
                        <div class="meter-count">10 měřáků</div>
                    </div>
                    
                    <div class="energy-card water">
                        <h3>💧 Voda</h3>
                        <p>Spotřeba tento měsíc: 125 m³</p>
                        <p>Náklady: 11,125 Kč</p>
                        <div class="meter-count">20 měřáků</div>
                    </div>
                </div>
                
                <div class="recent-readings">
                    <h3>Poslední odečty</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Měřák</th>
                                <th>Typ</th>
                                <th>Hodnota</th>
                                <th>Jednotka</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>25.1.2025</td>
                                <td>EL-001</td>
                                <td>💡 Elektřina</td>
                                <td>15,234</td>
                                <td>Byt 2A</td>
                            </tr>
                        </tbody>
                    </table>
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
