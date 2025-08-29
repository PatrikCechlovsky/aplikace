// Modul Nastavení
window.Nastaveni = (function() {
    'use strict';
    
    const moduleName = 'nastaveni';
    const moduleTitle = 'Nastavení';
    
    // Témata aplikace
    const themes = [
        { id: 'dark', name: 'Tmavý', icon: '🌙', primary: '#1e293b' },
        { id: 'light', name: 'Světlý', icon: '☀️', primary: '#ffffff' },
        { id: 'blue', name: 'Modrý akcent', icon: '💙', primary: '#5292f7' },
        { id: 'green', name: 'Zelený akcent', icon: '💚', primary: '#22c55e' },
        { id: 'purple', name: 'Fialový akcent', icon: '💜', primary: '#a855f7' }
    ];
    
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
    
    function renderVzhled() {
        const currentTheme = AppState.get('theme') || 'dark';
        const compactMode = AppState.get('compactMode') || false;
        const animations = AppState.get('animations') !== false;
        
        return `
            <div class="module-header">
                <h2>🎨 Nastavení - Vzhled</h2>
            </div>
            
            <div class="module-content">
                <div class="appearance-settings">
                    <div class="settings-card">
                        <h3>🎨 Barevné téma</h3>
                        <p>Vyberte si barevné schéma, které vám vyhovuje</p>
                        
                        <div class="theme-grid">
                            ${themes.map(theme => `
                                <div class="theme-option ${currentTheme === theme.id ? 'active' : ''}" 
                                     onclick="Nastaveni.setTheme('${theme.id}')">
                                    <div class="theme-preview" style="background: ${theme.primary}">
                                        <span class="theme-icon">${theme.icon}</span>
                                    </div>
                                    <span class="theme-name">${theme.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>⚙️ Možnosti zobrazení</h3>
                        
                        <div class="settings-options">
                            <label class="checkbox-label">
                                <input type="checkbox" id="compactMode" ${compactMode ? 'checked' : ''} 
                                       onchange="Nastaveni.toggleCompactMode()">
                                <span>Kompaktní režim</span>
                                <small>Zmenší mezery mezi prvky pro zobrazení více obsahu</small>
                            </label>
                            
                            <label class="checkbox-label">
                                <input type="checkbox" id="animations" ${animations ? 'checked' : ''} 
                                       onchange="Nastaveni.toggleAnimations()">
                                <span>Animace</span>
                                <small>Plynulé přechody a efekty při interakci</small>
                            </label>
                            
                            <label class="checkbox-label">
                                <input type="checkbox" id="showTags" ${AppState.get('showTags') !== false ? 'checked' : ''} 
                                       onchange="Nastaveni.toggleTags()">
                                <span>Zobrazit hashtagy</span>
                                <small>Zobrazí kategorie u dlaždiček na hlavním panelu</small>
                            </label>
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>📏 Velikost písma</h3>
                        <div class="font-size-selector">
                            <button class="btn btn-ghost" onclick="Nastaveni.setFontSize('small')">Malé</button>
                            <button class="btn btn-ghost active" onclick="Nastaveni.setFontSize('normal')">Normální</button>
                            <button class="btn btn-ghost" onclick="Nastaveni.setFontSize('large')">Velké</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Nastavení tématu
    function setTheme(themeId) {
        // Odstraň všechny theme třídy
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        
        // Přidej novou
        document.body.classList.add(`theme-${themeId}`);
        
        // Ulož do state
        AppState.set('theme', themeId);
        
        // Aktualizuj UI
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        
        App.showToast('Téma změněno', 'success');
    }
    
    // Přepnutí kompaktního režimu
    function toggleCompactMode() {
        const isCompact = !AppState.get('compactMode');
        AppState.set('compactMode', isCompact);
        document.body.classList.toggle('compact-mode', isCompact);
        App.showToast(isCompact ? 'Kompaktní režim zapnut' : 'Kompaktní režim vypnut', 'info');
    }
    
    // Přepnutí animací
    function toggleAnimations() {
        const enabled = !AppState.get('animations');
        AppState.set('animations', enabled);
        document.body.classList.toggle('no-animations', !enabled);
        App.showToast(enabled ? 'Animace zapnuty' : 'Animace vypnuty', 'info');
    }
    
    // Přepnutí hashtagů
    function toggleTags() {
        const show = !AppState.get('showTags');
        AppState.set('showTags', show);
        App.showToast(show ? 'Hashtagy zobrazeny' : 'Hashtagy skryty', 'info');
        
        // Pokud jsme na hlavním panelu, aktualizuj ho
        if (!AppState.get('currentModule')) {
            DashboardTiles.renderDashboard();
        }
    }
    
    // Nastavení velikosti písma
    function setFontSize(size) {
        document.body.classList.remove('font-small', 'font-normal', 'font-large');
        document.body.classList.add(`font-${size}`);
        AppState.set('fontSize', size);
        
        // Aktualizuj tlačítka
        document.querySelectorAll('.font-size-selector button').forEach(btn => {
            btn.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }
    
    return {
        render(type = 'all') {
            const container = document.getElementById('mainContent');
            if (!container) return;
            
            switch(type) {
                case 'vzhled':
                    container.innerHTML = renderVzhled();
                    break;
                case 'all':
                default:
                    container.innerHTML = renderOverview();
            }
        },
        
        setTheme,
        toggleCompactMode,
        toggleAnimations,
        toggleTags,
        setFontSize
    };
})();
