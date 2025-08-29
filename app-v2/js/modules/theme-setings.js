// Modul pro nastavení vzhledu
window.ThemeSettings = (function() {
    'use strict';
    
    const themes = [
        { id: 'dark', name: 'Tmavý', icon: '🌙', primary: '#1e293b' },
        { id: 'light', name: 'Světlý', icon: '☀️', primary: '#ffffff' },
        { id: 'blue', name: 'Modrý akcent', icon: '💙', primary: '#5292f7' },
        { id: 'green', name: 'Zelený akcent', icon: '💚', primary: '#22c55e' }
    ];
    
    function render() {
        return `
            <div class="theme-settings">
                <h3>🎨 Vzhled aplikace</h3>
                <p>Vyberte si barevné téma, které vám vyhovuje</p>
                
                <div class="theme-grid">
                    ${themes.map(theme => `
                        <div class="theme-option ${getCurrentTheme() === theme.id ? 'active' : ''}" 
                             onclick="ThemeSettings.setTheme('${theme.id}')">
                            <div class="theme-preview" style="background: ${theme.primary}">
                                <span class="theme-icon">${theme.icon}</span>
                            </div>
                            <span class="theme-name">${theme.name}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="theme-options">
                    <h4>Další možnosti</h4>
                    <label class="checkbox-label">
                        <input type="checkbox" id="compactMode" ${isCompactMode() ? 'checked' : ''} 
                               onchange="ThemeSettings.toggleCompactMode()">
                        <span>Kompaktní režim</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" id="animations" ${areAnimationsEnabled() ? 'checked' : ''} 
                               onchange="ThemeSettings.toggleAnimations()">
                        <span>Animace</span>
                    </label>
                </div>
            </div>
        `;
    }
    
    function getCurrentTheme() {
        return AppState.get('theme') || 'dark';
    }
    
    function isCompactMode() {
        return AppState.get('compactMode') || false;
    }
    
    function areAnimationsEnabled() {
        return AppState.get('animations') !== false;
    }
    
    function setTheme(themeId) {
        document.body.className = `theme-${themeId}`;
        AppState.set('theme', themeId);
        
        // Aktualizuj vzhled
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        
        App.showToast('Téma změněno', 'success');
    }
    
    function toggleCompactMode() {
        const isCompact = !isCompactMode();
        AppState.set('compactMode', isCompact);
        document.body.classList.toggle('compact-mode', isCompact);
    }
    
    function toggleAnimations() {
        const enabled = !areAnimationsEnabled();
        AppState.set('animations', enabled);
        document.body.classList.toggle('no-animations', !enabled);
    }
    
    return {
        render,
        setTheme,
        toggleCompactMode,
        toggleAnimations
    };
})();
