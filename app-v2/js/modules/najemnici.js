// Modul Nájemníci
window.Najemnici = (function() {
    'use strict';
    
    const moduleName = 'najemnici';
    const moduleTitle = 'Nájemníci';
    
    function getData(type = 'all') {
        const data = AppState.getData('najemnici');
        if (type === 'all') return data;
        return data.filter(item => item.typ === type);
    }
    
    function renderOverview() {
        const data = getData();
        
        return `
            <div class="module-header">
                <h2>👥 ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">${data.length}</div>
                        <div class="stat-label">Celkem nájemníků</div>
                    </div>
                    <div class="stat-box stat-success">
                        <div class="stat-value">${data.filter(d => d.aktivni !== false).length}</div>
                        <div class="stat-label">Aktivních</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="filters">
                    <input type="search" placeholder="Vyhledat nájemníka..." class="search-input">
                </div>
                
                <div class="data-table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Typ</th>
                                <th>Jméno/Název</th>
                                <th>Email</th>
                                <th>Telefon</th>
                                <th>Nemovitost</th>
                                <th>Stav</th>
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
                                    <td>${item.nemovitost || '-'}</td>
                                    <td><span class="status ${item.aktivni !== false ? 'active' : 'inactive'}">
                                        ${item.aktivni !== false ? 'Aktivní' : 'Neaktivní'}
                                    </span></td>
                                    <td>
                                        <button class="btn btn-ghost" onclick="Najemnici.detail('${item.id}')">👁️</button>
                                        <button class="btn btn-ghost" onclick="Najemnici.edit('${item.id}')">✏️</button>
                                    </td>
                                </tr>
                            `).join('') : '<tr><td colspan="7" class="text-center">Žádní nájemníci</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    return {
        render(type = 'all') {
            const container = document.getElementById('mainContent');
            if (!container) return;
            
            container.innerHTML = renderOverview();
        },
        
        detail(id) {
            console.log(`Detail nájemníka ${id}`);
        },
        
        edit(id) {
            console.log(`Editace nájemníka ${id}`);
        }
    };
})();