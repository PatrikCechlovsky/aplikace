// Modul Můj účet
window.MujUcet = (function() {
    'use strict';
    
    const moduleName = 'muj-ucet';
    const moduleTitle = 'Můj účet';
    
    function renderProfile() {
        return `
            <div class="module-header">
                <h2>👤 ${moduleTitle} - Profil</h2>
            </div>
            
            <div class="module-content">
                <div class="profile-container">
                    <div class="profile-header">
                        <div class="profile-avatar">PC</div>
                        <div class="profile-info">
                            <h3>Patrik Cechlovský</h3>
                            <p>patrik@example.com</p>
                            <p class="role">Role: Administrator</p>
                        </div>
                    </div>
                    
                    <div class="profile-sections">
                        <div class="profile-section">
                            <h3>Osobní údaje</h3>
                            <div class="form-group">
                                <label>Jméno a příjmení</label>
                                <input type="text" value="Patrik Cechlovský" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value="patrik@example.com" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Telefon</label>
                                <input type="tel" value="+420 777 123 456" class="form-control">
                            </div>
                            <button class="btn btn-primary">Uložit změny</button>
                        </div>
                        
                        <div class="profile-section">
                            <h3>Bezpečnost</h3>
                            <button class="btn btn-secondary">🔐 Změnit heslo</button>
                            <button class="btn btn-secondary">🔑 Dvoufaktorové ověření</button>
                        </div>
                        
                        <div class="profile-section">
                            <h3>Notifikace</h3>
                            <label class="checkbox-label">
                                <input type="checkbox" checked>
                                <span>Emailové notifikace</span>
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox">
                                <span>SMS notifikace</span>
                            </label>
                        </div>
                        
                        <div class="profile-section">
                            <h3>Aktivita</h3>
                            <p>Poslední přihlášení: Dnes 15:30</p>
                            <p>Celkem přihlášení: 234</p>
                            <p>Účet vytvořen: 1.1.2024</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    return {
        render(type = 'profil') {
            const container = document.getElementById('mainContent');
            if (!container) return;
            
            container.innerHTML = renderProfile();
        }
    };
})();