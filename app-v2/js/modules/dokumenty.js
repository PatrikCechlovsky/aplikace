// Modul Dokumenty
window.Dokumenty = (function() {
    'use strict';
    
    const moduleName = 'dokumenty';
    const moduleTitle = 'Dokumenty';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>📁 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">247</div>
                        <div class="stat-label">Celkem dokumentů</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">1.2 GB</div>
                        <div class="stat-label">Využité místo</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="document-folders">
                    <div class="folder-card">
                        <div class="folder-icon">📄</div>
                        <h3>Smlouvy</h3>
                        <p>45 dokumentů</p>
                    </div>
                    
                    <div class="folder-card">
                        <div class="folder-icon">🧾</div>
                        <h3>Faktury</h3>
                        <p>128 dokumentů</p>
                    </div>
                    
                    <div class="folder-card">
                        <div class="folder-icon">📸</div>
                        <h3>Fotografie</h3>
                        <p>67 souborů</p>
                    </div>
                    
                    <div class="folder-card">
                        <div class="folder-icon">📎</div>
                        <h3>Ostatní</h3>
                        <p>7 dokumentů</p>
                    </div>
                </div>
                
                <div class="recent-documents">
                    <h3>Nedávno přidané</h3>
                    <div class="doc-list">
                        <div class="doc-item">
                            <span class="doc-icon">📄</span>
                            <span class="doc-name">Smlouva_Novak_2025.pdf</span>
                            <span class="doc-date">Dnes</span>
                        </div>
                        <div class="doc-item">
                            <span class="doc-icon">🧾</span>
                            <span class="doc-name">Faktura_elektrina_01_2025.pdf</span>
                            <span class="doc-date">Včera</span>
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
