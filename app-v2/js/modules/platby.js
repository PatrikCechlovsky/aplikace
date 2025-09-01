// Modul Platby
window.Platby = (function() {
    'use strict';
    
    const moduleName = 'platby';
    const moduleTitle = 'Platby';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>💰 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box stat-success">
                        <div class="stat-value">125,000 Kč</div>
                        <div class="stat-label">Přijaté tento měsíc</div>
                    </div>
                    <div class="stat-box stat-danger">
                        <div class="stat-value">15,000 Kč</div>
                        <div class="stat-label">Po splatnosti</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">140,000 Kč</div>
                        <div class="stat-label">Očekávané</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="payments-chart">
                    <h3>Graf příjmů za posledních 6 měsíců</h3>
                    <div class="chart-placeholder">
                        📊 Graf bude zde
                    </div>
                </div>
                
                <div class="recent-payments">
                    <h3>Poslední platby</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Datum</th>
                                <th>Nájemník</th>
                                <th>Částka</th>
                                <th>Stav</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>15.1.2025</td>
                                <td>Jan Novák</td>
                                <td>12,000 Kč</td>
                                <td><span class="status active">Zaplaceno</span></td>
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
