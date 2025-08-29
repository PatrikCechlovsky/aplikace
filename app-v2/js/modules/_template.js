// Šablona pro nový modul - zkopíruj a přejmenuj
window.NazevModulu = (function() {
    'use strict';
    
    // Privátní proměnné
    const moduleName = 'nazev-modulu';
    const moduleTitle = 'Název Modulu';
    
    // Získání dat z AppState
    function getData(type = 'all') {
        return AppState.getFilteredData(moduleName, { type: type === 'all' ? null : type });
    }
    
    // Vykreslení přehledu
    function renderOverview() {
        const data = getData();
        
        return `
            <div class="module-header">
                <h2>${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">${data.length}</div>
                        <div class="stat-label">Celkem záznamů</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="data-table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Název</th>
                                <th>Akce</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(item => `
                                <tr>
                                    <td>${item.id}</td>
                                    <td>${item.nazev || item.jmeno || 'N/A'}</td>
                                    <td>
                                        <button class="btn btn-ghost" onclick="${moduleName}.edit('${item.id}')">✏️</button>
                                        <button class="btn btn-ghost" onclick="${moduleName}.delete('${item.id}')">🗑️</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    // Veřejné API
    return {
        // Hlavní render funkce
        render(type = 'all') {
            const container = document.getElementById('mainContent');
            if (!container) return;
            
            // Základní struktura podle typu
            switch(type) {
                case 'all':
                    container.innerHTML = renderOverview();
                    break;
                default:
                    container.innerHTML = `
                        <div class="module-header">
                            <h2>${moduleTitle} - ${type}</h2>
                        </div>
                        <div class="module-content">
                            <p>Obsah pro typ: ${type}</p>
                        </div>
                    `;
            }
        },
        
        // Editace položky
        edit(id) {
            console.log(`Editace položky ${id}`);
            // TODO: Otevřít modal s formulářem
        },
        
        // Smazání položky
        delete(id) {
            if (confirm('Opravdu chcete smazat tuto položku?')) {
                AppState.deleteItem(moduleName, id);
                this.render();
            }
        }
    };
})();
