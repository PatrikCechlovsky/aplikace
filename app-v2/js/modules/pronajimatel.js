// Modul Pronajímatel
window.Pronajimatel = (function() {
    'use strict';
    
    const moduleName = 'pronajimatel';
    const moduleTitle = 'Pronajímatel';
    
    function getData(type = 'all') {
        const data = AppState.getData('pronajimatele');
        if (type === 'all') return data;
        return data.filter(item => item.typ === type);
    }
    
    function renderOverview() {
        const data = getData();
        const osoby = data.filter(d => d.typ === 'osoba').length;
        const firmy = data.filter(d => d.typ === 'firma').length;
        const osvc = data.filter(d => d.typ === 'osvc').length;
        
        return `
            <div class="module-header">
                <h2>🏠 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">${data.length}</div>
                        <div class="stat-label">Celkem pronajímatelů</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${osoby}</div>
                        <div class="stat-label">Fyzické osoby</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${firmy}</div>
                        <div class="stat-label">Firmy</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${osvc}</div>
                        <div class="stat-label">OSVČ</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="data-table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Typ</th>
                                <th>Jméno/Název</th>
                                <th>Email</th>
                                <th>Telefon</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.length ? data.map(item => `
                                <tr>
                                    <td><span class="badge">${item.typ}</span></td>
                                    <td>${item.jmeno}</td>
                                    <td>${item.email || '-'}</td>
                                    <td>${item.telefon || '-'}</td>
                                    <td>
                                        <button class="btn btn-ghost" onclick="Pronajimatel.edit('${item.id}')">✏️</button>
                                        <button class="btn btn-ghost" onclick="Pronajimatel.delete('${item.id}')">🗑️</button>
                                    </td>
                                </tr>
                            `).join('') : '<tr><td colspan="5" class="text-center">Žádné záznamy</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    function renderByType(type) {
        const data = getData(type);
        const typeLabels = {
            osoba: 'Fyzické osoby',
            osvc: 'OSVČ',
            firma: 'Firmy',
            spolek: 'Spolky/skupiny',
            stat: 'Státní instituce'
        };
        
        return `
            <div class="module-header">
                <h2>👤 ${moduleTitle} - ${typeLabels[type] || type}</h2>
            </div>
            <div class="module-content">
                <div class="data-grid">
                    ${data.length ? data.map(item => `
                        <div class="data-card">
                            <h3>${item.jmeno}</h3>
                            <p>📧 ${item.email || 'Bez emailu'}</p>
                            <p>📱 ${item.telefon || 'Bez telefonu'}</p>
                            ${item.ico ? `<p>🏢 IČO: ${item.ico}</p>` : ''}
                            <div class="card-actions">
                                <button class="btn btn-primary" onclick="Pronajimatel.edit('${item.id}')">Upravit</button>
                                <button class="btn btn-ghost" onclick="Pronajimatel.delete('${item.id}')">Smazat</button>
                            </div>
                        </div>
                    `).join('') : '<p class="empty-state">Žádné záznamy typu ' + typeLabels[type] + '</p>'}
                </div>
            </div>
        `;
    }
    
    return {
        render(type = 'all') {
            const container = document.getElementById('mainContent');
            if (!container) return;
            
            if (type === 'all') {
                container.innerHTML = renderOverview();
            } else {
                container.innerHTML = renderByType(type);
            }
        },
        
        edit(id) {
            console.log(`Editace pronajímatele ${id}`);
            Modal.open('Upravit pronajímatele', '<p>Formulář pro úpravu...</p>');
        },
        
        delete(id) {
            if (confirm('Opravdu chcete smazat tohoto pronajímatele?')) {
                AppState.deleteItem('pronajimatele', id);
                this.render();
            }
        }
    };
})();