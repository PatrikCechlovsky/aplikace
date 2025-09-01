// Modul Komunikace
window.Komunikace = (function() {
    'use strict';
    
    const moduleName = 'komunikace';
    const moduleTitle = 'Komunikace';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>💬 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">12</div>
                        <div class="stat-label">Nové zprávy</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">156</div>
                        <div class="stat-label">Celkem konverzací</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="communication-channels">
                    <button class="channel-btn active">
                        <span class="icon">✉️</span>
                        <span class="label">Zprávy</span>
                        <span class="badge">5</span>
                    </button>
                    <button class="channel-btn">
                        <span class="icon">📧</span>
                        <span class="label">E-maily</span>
                        <span class="badge">7</span>
                    </button>
                    <button class="channel-btn">
                        <span class="icon">📱</span>
                        <span class="label">SMS</span>
                    </button>
                </div>
                
                <div class="messages-list">
                    <h3>Poslední zprávy</h3>
                    
                    <div class="message-item unread">
                        <div class="message-avatar">JN</div>
                        <div class="message-content">
                            <h4>Jan Novák</h4>
                            <p>Dobrý den, chtěl bych se zeptat ohledně...</p>
                            <span class="time">před 2 hodinami</span>
                        </div>
                    </div>
                    
                    <div class="message-item">
                        <div class="message-avatar">MS</div>
                        <div class="message-content">
                            <h4>Marie Svobodová</h4>
                            <p>Děkuji za rychlé vyřešení problému s...</p>
                            <span class="time">včera</span>
                        </div>
                    </div>
                </div>
                
                <div class="quick-actions">
                    <button class="btn btn-primary">📤 Hromadná zpráva</button>
                    <button class="btn btn-secondary">📋 Šablony zpráv</button>
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
