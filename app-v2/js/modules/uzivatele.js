// Modul Uživatelé & Role
window.Uzivatele = (function() {
    'use strict';
    
    const moduleName = 'uzivatele';
    const moduleTitle = 'Uživatelé & Role';
    
    function renderOverview() {
        return `
            <div class="module-header">
                <h2>👨‍💼 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">5</div>
                        <div class="stat-label">Aktivní uživatelé</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">3</div>
                        <div class="stat-label">Role</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="users-list">
                    <h3>Uživatelé systému</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Jméno</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Poslední přihlášení</th>
                                <th>Stav</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Patrik Cechlovský</td>
                                <td>patrik@example.com</td>
                                <td><span class="role admin">Admin</span></td>
                                <td>Dnes 15:30</td>
                                <td><span class="status active">Aktivní</span></td>
                                <td>
                                    <button class="btn btn-ghost">✏️</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Jana Nováková</td>
                                <td>jana@example.com</td>
                                <td><span class="role manager">Správce</span></td>
                                <td>Včera 10:15</td>
                                <td><span class="status active">Aktivní</span></td>
                                <td>
                                    <button class="btn btn-ghost">✏️</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="roles-overview">
                    <h3>Role a oprávnění</h3>
                    <div class="role-cards">
                        <div class="role-card">
                            <h4>🔴 Admin</h4>
                            <p>Plný přístup ke všem modulům</p>
                            <p>Uživatelů: 1</p>
                        </div>
                        <div class="role-card">
                            <h4>🟡 Správce</h4>
                            <p>Správa nemovitostí a nájemníků</p>
                            <p>Uživatelů: 2</p>
                        </div>
                        <div class="role-card">
                            <h4>🟢 Prohlížeč</h4>
                            <p>Pouze čtení</p>
                            <p>Uživatelů: 2</p>
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
