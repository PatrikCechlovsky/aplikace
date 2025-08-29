// Modul Nastavení
window.Nastaveni = (function() {
    'use strict';
    
    const moduleName = 'nastaveni';
    const moduleTitle = 'Nastavení';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>⚙️ ${moduleTitle}</h2>
            </div>
            
            <div class="module-content">
                <div class="settings-sections">
                    <div class="settings-card">
                        <h3>🏢 Informace o firmě</h3>
                        <div class="settings-form">
                            <div class="form-group">
                                <label>Název firmy</label>
                                <input type="text" value="Moje pronájmy s.r.o." class="form-control">
                            </div>
                            <div class="form-group">
                                <label>IČO</label>
                                <input type="text" value="12345678" class="form-control">
                            </div>
                            <button class="btn btn-primary">Uložit změny</button>
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>📋 Číselníky</h3>
                        <div class="settings-links">
                            <a href="#" class="settings-link">Typy nemovitostí</a>
                            <a href="#" class="settings-link">Typy služeb</a>
                            <a href="#" class="settings-link">Sazby DPH</a>
                            <a href="#" class="settings-link">Měny</a>
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>📄 Šablony dokumentů</h3>
                        <div class="settings-links">
                            <a href="#" class="settings-link">Nájemní smlouva</a>
                            <a href="#" class="settings-link">Předávací protokol</a>
                            <a href="#" class="settings-link">Upomínka</a>
                            <a href="#" class="settings-link">Vyúčtování služeb</a>
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>💾 Zálohování</h3>
                        <p>Poslední záloha: Dnes 03:00</p>
                        <div class="backup-actions">
                            <button class="btn btn-primary">Vytvořit zálohu</button>
                            <button class="btn btn-secondary">Obnovit ze zálohy</button>
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>🔄 Import/Export</h3>
                        <div class="import-export-actions">
                            <button class="btn btn-secondary">📥 Import dat</button>
                            <button class="btn btn-secondary">📤 Export dat</button>
                        </div>
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