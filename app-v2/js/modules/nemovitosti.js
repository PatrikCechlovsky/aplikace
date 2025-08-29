// Modul Nemovitosti
window.Nemovitosti = (function() {
    'use strict';
    
    const moduleName = 'nemovitosti';
    const moduleTitle = 'Nemovitosti';
    
    function getData(type = 'all') {
        const data = AppState.getData('nemovitosti');
        if (type === 'all') return data;
        if (type === 'volne') return data.filter(item => item.volny === true);
        if (type === 'obsazene') return data.filter(item => item.volny === false);
        return data.filter(item => item.typ === type);
    }
    
    function renderOverview() {
        const data = getData();
        const volne = data.filter(d => d.volny === true).length;
        const obsazene = data.filter(d => d.volny === false).length;
        
        return `
            <div class="module-header">
                <h2>🏘️ ${moduleTitle} - Přehled</h2>
                <div class="module-stats">
                    <div class="stat-box">
                        <div class="stat-value">${data.length}</div>
                        <div class="stat-label">Celkem nemovitostí</div>
                    </div>
                    <div class="stat-box stat-success">
                        <div class="stat-value">${volne}</div>
                        <div class="stat-label">Volné</div>
                    </div>
                    <div class="stat-box stat-danger">
                        <div class="stat-value">${obsazene}</div>
                        <div class="stat-label">Obsazené</div>
                    </div>
                </div>
            </div>
            
            <div class="module-content">
                <div class="property-grid">
                    ${data.map(item => `
                        <div class="property-card ${item.volny ? 'available' : 'occupied'}">
                            <div class="property-status">${item.volny ? '🟢 Volné' : '🔴 Obsazené'}</div>
                            <h3>${item.typ === 'byt' ? '🏠' : '🏢'} ${item.adresa}</h3>
                            <div class="property-details">
                                ${item.velikost ? `<p>Velikost: ${item.velikost}</p>` : ''}
                                ${item.plocha ? `<p>Plocha: ${item.plocha} m²</p>` : ''}
                                ${item.pocetJednotek ? `<p>Počet jednotek: ${item.pocetJednotek}</p>` : ''}
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-primary" onclick="Nemovitosti.detail('${item.id}')">Detail</button>
                                <button class="btn btn-ghost" onclick="Nemovitosti.edit('${item.id}')">Upravit</button>
                            </div>
                        </div>
                    `).join('')}
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
            console.log(`Detail nemovitosti ${id}`);
        },
        
        edit(id) {
            console.log(`Editace nemovitosti ${id}`);
        }
    };
})();