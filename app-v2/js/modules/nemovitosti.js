window.Nemovitosti = (function() {
    'use strict';

    // Simulovaná data
    let data = {
        nemovitosti: JSON.parse(localStorage.getItem('nemovitosti_data') || '[]'),
        jednotky: JSON.parse(localStorage.getItem('jednotky_data') || '[]')
    };

    function saveData() {
        localStorage.setItem('nemovitosti_data', JSON.stringify(data.nemovitosti));
        localStorage.setItem('jednotky_data', JSON.stringify(data.jednotky));
    }

    function getNextId(type = 'nemovitost') {
        const prefix = type === 'nemovitost' ? 'N' : 'J';
        const items = type === 'nemovitost' ? data.nemovitosti : data.jednotky;
        const maxNum = items.reduce((max, item) => {
            const num = parseInt(item.id.substring(1)) || 0;
            return Math.max(max, num);
        }, 0);
        return `${prefix}${(maxNum + 1).toString().padStart(4, '0')}`;
    }

    // Typy nemovitostí (budovy/objekty)
    const typyNemovitosti = {
        'bytovy_dum': { name: 'Bytový dům', icon: '🏢', jednotka: 'byt' },
        'rodinny_dum': { name: 'Rodinný dům', icon: '🏠', jednotka: 'byt' },
        'admin_budova': { name: 'Administrativní budova', icon: '🏬', jednotka: 'kancelar' },
        'prumyslovy': { name: 'Průmyslový objekt', icon: '🏭', jednotka: 'sklad' },
        'pozemek': { name: 'Pozemek', icon: '🌳', jednotka: null },
        'jiny': { name: 'Jiný objekt', icon: '🏘️', jednotka: 'jina' }
    };

    // Typy jednotek
    const typyJednotek = {
        'byt': { name: 'Byt', icon: '🏠' },
        'kancelar': { name: 'Kancelář', icon: '💼' },
        'obchod': { name: 'Obchodní prostor', icon: '🛍️' },
        'sklad': { name: 'Sklad', icon: '📦' },
        'garaz': { name: 'Garáž/Parking', icon: '🚗' },
        'sklep': { name: 'Sklep', icon: '📦' },
        'puda': { name: 'Půda', icon: '🏠' },
        'jina': { name: 'Jiná jednotka', icon: '🔑' }
    };

    function render(type = 'all') {
        const mainContent = document.getElementById('main-content');
        
        switch(type) {
            case 'all':
                renderPrehled();
                break;
            case 'budovy':
                renderBudovy();
                break;
            case 'jednotky':
                renderJednotky();
                break;
            case 'volne':
                renderJednotky('volna');
                break;
            case 'obsazene':
                renderJednotky('obsazena');
                break;
            default:
                renderBudovy(type);
        }
    }

    function renderPrehled() {
        const mainContent = document.getElementById('main-content');
        
        // Statistiky
        const pocetNemovitosti = data.nemovitosti.length;
        const pocetJednotek = data.jednotky.length;
        const volneJednotky = data.jednotky.filter(j => j.stav === 'volna').length;
        const obsazeneJednotky = data.jednotky.filter(j => j.stav === 'obsazena').length;
        const rezervovaneJednotky = data.jednotky.filter(j => j.stav === 'rezervovana').length;
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">
                        <span class="module-icon">🏘️</span>
                        Nemovitosti - 
                        <span class="type-icon">📊</span>
                        Přehled
                    </h1>
                </div>
            </div>
            
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-icon">🏢</div>
                    <div class="stat-content">
                        <div class="stat-value">${pocetNemovitosti}</div>
                        <div class="stat-label">Celkem budov</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏠</div>
                    <div class="stat-content">
                        <div class="stat-value">${pocetJednotek}</div>
                        <div class="stat-label">Celkem jednotek</div>
                    </div>
                </div>
                <div class="stat-card success">
                    <div class="stat-icon">🟢</div>
                    <div class="stat-content">
                        <div class="stat-value">${volneJednotky}</div>
                        <div class="stat-label">Volné jednotky</div>
                    </div>
                </div>
                <div class="stat-card danger">
                    <div class="stat-icon">🔴</div>
                    <div class="stat-content">
                        <div class="stat-value">${obsazeneJednotky}</div>
                        <div class="stat-label">Obsazené jednotky</div>
                    </div>
                </div>
                <div class="stat-card warning">
                    <div class="stat-icon">🟠</div>
                    <div class="stat-content">
                        <div class="stat-value">${rezervovaneJednotky}</div>
                        <div class="stat-label">Rezervované</div>
                    </div>
                </div>
            </div>
            
            <div class="section-grid">
                <div class="card">
                    <h3>Nejnovější budovy</h3>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Název</th>
                                    <th>Typ</th>
                                    <th>Město</th>
                                    <th>Jednotek</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.nemovitosti.slice(0, 5).map(nem => {
                                    const jednotkyCount = data.jednotky.filter(j => j.nemovitost_id === nem.id).length;
                                    return `
                                        <tr onclick="Nemovitosti.view('${nem.id}')" style="cursor: pointer;">
                                            <td>${nem.nazev}</td>
                                            <td>${typyNemovitosti[nem.typ]?.name || nem.typ}</td>
                                            <td>${nem.mesto}</td>
                                            <td>${jednotkyCount}/${nem.pocetJednotek || 0}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Poslední změny v jednotkách</h3>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Jednotka</th>
                                    <th>Budova</th>
                                    <th>Stav</th>
                                    <th>Nájemce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.jednotky.slice(0, 5).map(jed => {
                                    const nemovitost = data.nemovitosti.find(n => n.id === jed.nemovitost_id);
                                    return `
                                        <tr onclick="Nemovitosti.viewJednotka('${jed.id}')" style="cursor: pointer;">
                                            <td>${jed.oznaceni}</td>
                                            <td>${nemovitost?.nazev || '-'}</td>
                                            <td>${getStavBadge(jed.stav)}</td>
                                            <td>${jed.najemce || '-'}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        // Přidat styly pro statistiky
        addStatsStyles();
    }

    function renderBudovy(filterType = null) {
        const mainContent = document.getElementById('main-content');
        
        // Filtrovat data
        let filteredData = data.nemovitosti;
        if (filterType && typyNemovitosti[filterType]) {
            filteredData = data.nemovitosti.filter(n => n.typ === filterType);
        }

        // Spočítat jednotky pro každou nemovitost
        const jednotkyCount = {};
        data.jednotky.forEach(j => {
            jednotkyCount[j.nemovitost_id] = (jednotkyCount[j.nemovitost_id] || 0) + 1;
        });

        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">
                        <span class="module-icon">🏘️</span>
                        Nemovitosti - 
                        <span class="type-icon">🏢</span>
                        Budovy
                    </h1>
                </div>
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="Nemovitosti.showAddDialog()">
                        <span class="btn-icon">+</span>
                        <span class="btn-text">Přidat budovu</span>
                    </button>
                </div>
            </div>

            <div class="card">
                ${filteredData.length === 0 ? 
                    `<div class="empty-state">
                        <div class="empty-state-icon">📁</div>
                        <p class="empty-state-text">Zatím nejsou žádné budovy</p>
                        <button class="btn btn-primary" onclick="Nemovitosti.showAddDialog()">
                            Přidat první budovu
                        </button>
                    </div>` :
                    `<div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width: 80px;">ID</th>
                                    <th style="width: 250px;">Název</th>
                                    <th style="width: 120px;">Typ</th>
                                    <th style="width: 250px;">Adresa</th>
                                    <th style="width: 100px;">Město</th>
                                    <th style="width: 80px;">Jednotek</th>
                                    <th style="width: 120px;">Vlastník</th>
                                    <th style="width: 120px;">Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(item => {
                                    const vlastnik = getPronajimatelById(item.pronajimatel_id);
                                    const pocetJednotek = jednotkyCount[item.id] || 0;
                                    return `
                                        <tr>
                                            <td>${item.id}</td>
                                            <td class="text-truncate">${item.nazev}</td>
                                            <td><span class="badge badge-${item.typ}">${getTypeName(item.typ)}</span></td>
                                            <td class="text-truncate">${item.ulice} ${item.cisloPopisne || ''}</td>
                                            <td class="text-truncate">${item.mesto || '-'}</td>
                                            <td>
                                                <span class="badge ${pocetJednotek > 0 ? 'badge-success' : 'badge-secondary'}">
                                                    ${pocetJednotek}/${item.pocetJednotek || 0}
                                                </span>
                                            </td>
                                            <td class="text-truncate">${vlastnik?.nazev || vlastnik?.prijmeni || '-'}</td>
                                            <td>
                                                <div class="btn-group">
                                                    <button class="btn-icon btn-view" onclick="Nemovitosti.view('${item.id}')" title="Zobrazit">
                                                        👁️
                                                    </button>
                                                    <button class="btn-icon btn-edit" onclick="Nemovitosti.edit('${item.id}')" title="Upravit">
                                                        ✏️
                                                    </button>
                                                    <button class="btn-icon btn-units" onclick="Nemovitosti.showUnits('${item.id}')" title="Jednotky">
                                                        🔑
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>`
                }
            </div>
        `;
    }

    function renderJednotky(filterStav = null) {
        const mainContent = document.getElementById('main-content');
        
        // Filtrovat data
        let filteredData = data.jednotky;
        if (filterStav) {
            filteredData = data.jednotky.filter(j => j.stav === filterStav);
        }
        
        // Získat data nájemců
        const najemciData = JSON.parse(localStorage.getItem('najemnici_data') || '[]');
        
        const title = filterStav === 'volna' ? 'Volné jednotky' : 
                     filterStav === 'obsazena' ? 'Obsazené jednotky' : 'Všechny jednotky';
        const icon = filterStav === 'volna' ? '🟢' : 
                    filterStav === 'obsazena' ? '🔴' : '🏠';

        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">
                        <span class="module-icon">🏘️</span>
                        Nemovitosti - 
                        <span class="type-icon">${icon}</span>
                        ${title}
                    </h1>
                </div>
            </div>

            <div class="card">
                ${filteredData.length === 0 ? 
                    `<div class="empty-state">
                        <div class="empty-state-icon">📁</div>
                        <p class="empty-state-text">Žádné ${title.toLowerCase()}</p>
                    </div>` :
                    `<div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width: 80px;">ID</th>
                                    <th style="width: 100px;">Označení</th>
                                    <th style="width: 200px;">Budova</th>
                                    <th style="width: 100px;">Typ</th>
                                    <th style="width: 80px;">Plocha</th>
                                    <th style="width: 100px;">Dispozice</th>
                                    <th style="width: 100px;">Stav</th>
                                    <th style="width: 150px;">Nájemce</th>
                                    <th style="width: 100px;">Měsíční nájem</th>
                                    <th style="width: 100px;">Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(jed => {
                                    const nemovitost = data.nemovitosti.find(n => n.id === jed.nemovitost_id);
                                    const najemce = jed.najemce_id ? najemciData.find(n => n.id === jed.najemce_id) : null;
                                    return `
                                        <tr>
                                            <td>${jed.id}</td>
                                            <td><strong>${jed.oznaceni}</strong></td>
                                            <td class="text-truncate">
                                                <a href="#" onclick="Nemovitosti.view('${nemovitost?.id}'); return false;">
                                                    ${nemovitost?.nazev || '-'}
                                                </a>
                                            </td>
                                            <td>${typyJednotek[jed.typ]?.name || jed.typ}</td>
                                            <td>${jed.plocha} m²</td>
                                            <td>${jed.dispozice || '-'}</td>
                                            <td>${getStavBadge(jed.stav)}</td>
                                            <td>
                                                ${najemce ? `
                                                    <a href="#" onclick="window.Router.navigate('najemnici'); Najemnici.view('${najemce.id}'); return false;">
                                                        ${najemce.jmeno} ${najemce.prijmeni}
                                                    </a>
                                                ` : jed.najemce || '-'}
                                            </td>
                                            <td>${jed.mesicniNajem ? `${jed.mesicniNajem} Kč` : '-'}</td>
                                            <td>
                                                <div class="btn-group">
                                                    <button class="btn-icon btn-view" onclick="Nemovitosti.viewJednotka('${jed.id}')" title="Zobrazit">
                                                        👁️
                                                    </button>
                                                    <button class="btn-icon btn-edit" onclick="Nemovitosti.editUnit('${jed.id}')" title="Upravit">
                                                        ✏️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>`
                }
            </div>
        `;
    }

    function viewJednotka(jednotkaId) {
        const jednotka = data.jednotky.find(j => j.id === jednotkaId);
        if (!jednotka) return;
        
        const nemovitost = data.nemovitosti.find(n => n.id === jednotka.nemovitost_id);
        const najemciData = JSON.parse(localStorage.getItem('najemnici_data') || '[]');
        const najemce = jednotka.najemce_id ? najemciData.find(n => n.id === jednotka.najemce_id) : null;
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Detail jednotky - ${jednotka.oznaceni}</h1>
            </div>
            
            <div class="card">
                <div class="detail-grid">
                    <div class="detail-section">
                        <h3>Základní informace</h3>
                        <dl>
                            <dt>ID:</dt>
                            <dd>${jednotka.id}</dd>
                            
                            <dt>Označení:</dt>
                            <dd>${jednotka.oznaceni}</dd>
                            
                            <dt>Typ:</dt>
                            <dd>${typyJednotek[jednotka.typ]?.name || jednotka.typ}</dd>
                            
                            <dt>Plocha:</dt>
                            <dd>${jednotka.plocha} m²</dd>
                            
                            <dt>Dispozice:</dt>
                            <dd>${jednotka.dispozice || '-'}</dd>
                            
                            <dt>Podlaží:</dt>
                            <dd>${jednotka.podlazi || '-'}</dd>
                            
                            <dt>Stav:</dt>
                            <dd>${getStavBadge(jednotka.stav)}</dd>
                        </dl>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Budova</h3>
                        <dl>
                            <dt>Název:</dt>
                            <dd>
                                <a href="#" onclick="Nemovitosti.view('${nemovitost?.id}'); return false;">
                                    ${nemovitost?.nazev || '-'}
                                </a>
                            </dd>
                            
                            <dt>Adresa:</dt>
                            <dd>${nemovitost ? `${nemovitost.ulice} ${nemovitost.cisloPopisne}, ${nemovitost.mesto}` : '-'}</dd>
                        </dl>
                        
                        ${jednotka.stav === 'obsazena' ? `
                            <h3>Nájemce</h3>
                            <dl>
                                <dt>Jméno:</dt>
                                <dd>
                                    ${najemce ? `
                                        <a href="#" onclick="window.Router.navigate('najemnici'); Najemnici.view('${najemce.id}'); return false;">
                                            ${najemce.jmeno} ${najemce.prijmeni}
                                        </a>
                                    ` : jednotka.najemce || '-'}
                                </dd>
                                
                                ${najemce ? `
                                    <dt>Telefon:</dt>
                                    <dd>${najemce.telefon || '-'}</dd>
                                    
                                    <dt>Email:</dt>
                                    <dd>${najemce.email || '-'}</dd>
                                ` : ''}
                                
                                <dt>Měsíční nájem:</dt>
                                <dd>${jednotka.mesicniNajem ? `${jednotka.mesicniNajem} Kč` : '-'}</dd>
                            </dl>
                        ` : ''}
                    </div>
                </div>
                
                ${jednotka.poznamka ? `
                    <div class="detail-section full-width">
                        <h3>Poznámka</h3>
                        <p>${jednotka.poznamka}</p>
                    </div>
                ` : ''}
                
                <div class="form-actions">
                    <button class="btn btn-secondary" onclick="window.history.back()">Zpět</button>
                    <button class="btn btn-primary" onclick="Nemovitosti.editUnit('${jednotka.id}')">Upravit</button>
                </div>
            </div>
        `;
    }

    function showUnitForm(nemovitostId, jednotkaId = null) {
        const nemovitost = getItemById(nemovitostId);
        const jednotka = jednotkaId ? data.jednotky.find(j => j.id === jednotkaId) : {};
        const isEdit = !!jednotkaId;
        
        // Získat seznam nájemců
        const najemciData = JSON.parse(localStorage.getItem('najemnici_data') || '[]');
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">${isEdit ? 'Upravit' : 'Nová'} jednotka - ${nemovitost.nazev}</h1>
            </div>
            
            <div class="card">
                <form id="jednotka-form" class="form">
                    <div class="form-body">
                        <input type="hidden" name="id" value="${jednotka.id || ''}">
                        <input type="hidden" name="nemovitost_id" value="${nemovitostId}">
                        
                        <div class="form-group-header">Základní údaje</div>
                        
                        <div class="form-row">
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label required">Označení jednotky</label>
                                    <input type="text" name="oznaceni" class="form-control" 
                                           value="${jednotka.oznaceni || ''}" 
                                           placeholder="např. 1A, 101, P1"
                                           required>
                                    <span class="form-help">Číslo bytu, kanceláře apod.</span>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label required">Typ jednotky</label>
                                    <div class="form-control-wrapper">
                                        <select name="typ" class="form-control" required>
                                            ${Object.entries(typyJednotek).map(([key, typ]) => `
                                                <option value="${key}" ${jednotka.typ === key ? 'selected' : ''}>
                                                    ${typ.icon} ${typ.name}
                                                </option>
                                            `).join('')}
                                        </select>
                                        <span class="form-icon">▼</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label">Podlaží</label>
                                    <input type="text" name="podlazi" class="form-control" 
                                           value="${jednotka.podlazi || ''}" 
                                           placeholder="např. 1, přízemí, -1">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label required">Plocha (m²)</label>
                                    <input type="number" name="plocha" class="form-control" 
                                           value="${jednotka.plocha || ''}" 
                                           min="1" step="0.1" required>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Dispozice</label>
                                    <input type="text" name="dispozice" class="form-control" 
                                           value="${jednotka.dispozice || ''}" 
                                           placeholder="např. 2+1, 3+kk">
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Počet místností</label>
                                    <input type="number" name="pocetMistnosti" class="form-control" 
                                           value="${jednotka.pocetMistnosti || ''}" 
                                           min="1">
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Stav</label>
                                    <div class="form-control-wrapper">
                                        <select name="stav" class="form-control" onchange="Nemovitosti.toggleNajemceField(this.value)">
                                            <option value="volna" ${jednotka.stav === 'volna' ? 'selected' : ''}>Volná</option>
                                            <option value="obsazena" ${jednotka.stav === 'obsazena' ? 'selected' : ''}>Obsazená</option>
                                            <option value="rezervovana" ${jednotka.stav === 'rezervovana' ? 'selected' : ''}>Rezervovaná</option>
                                            <option value="rekonstrukce" ${jednotka.stav === 'rekonstrukce' ? 'selected' : ''}>V rekonstrukci</option>
                                        </select>
                                        <span class="form-icon">▼</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group-header">Nájemní vztah</div>
                        
                        <div class="form-row" id="najemce-fields" style="${jednotka.stav !== 'obsazena' && jednotka.stav !== 'rezervovana' ? 'display: none;' : ''}">
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label">Nájemce</label>
                                    <div class="form-control-wrapper">
                                        <select name="najemce_id" class="form-control">
                                            <option value="">Vyberte nájemce</option>
                                            ${najemciData.map(n => `
                                                <option value="${n.id}" ${jednotka.najemce_id === n.id ? 'selected' : ''}>
                                                    ${n.jmeno} ${n.prijmeni} ${n.ico ? `(IČO: ${n.ico})` : ''}
                                                </option>
                                            `).join('')}
                                        </select>
                                        <span class="form-icon">▼</span>
                                    </div>
                                    <span class="form-help">Nebo zadejte jméno ručně níže</span>
                                </div>
                            </div>
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label">Jméno nájemce (ruční zadání)</label>
                                    <input type="text" name="najemce" class="form-control" 
                                           value="${jednotka.najemce || ''}" 
                                           placeholder="Pokud nájemce není v seznamu">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row" id="najem-fields" style="${jednotka.stav !== 'obsazena' ? 'display: none;' : ''}">
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label">Měsíční nájem (Kč)</label>
                                    <input type="number" name="mesicniNajem" class="form-control" 
                                           value="${jednotka.mesicniNajem || ''}" 
                                           min="0" step="100">
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label">Datum začátku nájmu</label>
                                    <input type="date" name="datumZacatkuNajmu" class="form-control" 
                                           value="${jednotka.datumZacatkuNajmu || ''}">
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label">Datum konce nájmu</label>
                                    <input type="date" name="datumKonceNajmu" class="form-control" 
                                           value="${jednotka.datumKonceNajmu || ''}">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-12">
                                <div class="form-field">
                                    <label class="form-label">Poznámka</label>
                                    <textarea name="poznamka" class="form-control" rows="3">${jednotka.poznamka || ''}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Nemovitosti.showUnits('${nemovitostId}')">
                            Zpět
                        </button>
                        <button type="submit" class="btn btn-primary">
                            ${isEdit ? 'Uložit změny' : 'Vytvořit jednotku'}
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        const form = document.getElementById('jednotka-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUnit(nemovitostId, jednotkaId);
        });
    }

    function toggleNajemceField(stav) {
        const najemceFields = document.getElementById('najemce-fields');
        const najemFields = document.getElementById('najem-fields');
        
        if (stav === 'obsazena' || stav === 'rezervovana') {
            najemceFields.style.display = '';
        } else {
            najemceFields.style.display = 'none';
        }
        
        if (stav === 'obsazena') {
            najemFields.style.display = '';
        } else {
            najemFields.style.display = 'none';
        }
    }

    function addStatsStyles() {
        if (document.getElementById('nemovitosti-stats-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'nemovitosti-stats-styles';
        styles.textContent = `
            .stats-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .stat-card {
                background: white;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 15px;
                border-left: 4px solid #007bff;
            }
            
            .stat-card.success {
                border-left-color: #28a745;
            }
            
            .stat-card.danger {
                border-left-color: #dc3545;
            }
            
            .stat-card.warning {
                border-left-color: #ffc107;
            }
            
            .stat-icon {
                font-size: 32px;
            }
            
            .stat-content {
                flex: 1;
            }
            
            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #333;
            }
            
            .stat-label {
                color: #666;
                font-size: 14px;
            }
            
            .section-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 20px;
            }
            
            .detail-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                padding: 20px;
            }
            
            .detail-section {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
            }
            
            .detail-section h3 {
                margin: 0 0 15px 0;
                color: #333;
            }
            
            .detail-section dl {
                margin: 0;
            }
            
            .detail-section dt {
                font-weight: 500;
                color: #666;
                margin-bottom: 5px;
            }
            
            .detail-section dd {
                margin: 0 0 15px 0;
                color: #333;
            }
            
            .detail-section.full-width {
                grid-column: 1 / -1;
            }
        `;
        document.head.appendChild(styles);
    }

    // Všechny ostatní funkce zůstávají stejné...
    function showForm(type, id = null, viewOnly = false) {
        const mainContent = document.getElementById('main-content');
        const isEdit = id !== null && !viewOnly;
        const isView = viewOnly;
        const item = id ? getItemById(id) : { typ: type };
        
        let title = 'Nová nemovitost';
        if (isView) {
            title = 'Detail nemovitosti';
        } else if (isEdit) {
            title = 'Upravit nemovitost';
        }
        
        mainContent.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">${title} - ${getTypeName(type)}</h1>
            </div>
            
            <div class="card">
                <form id="nemovitost-form" class="form">
                    <div class="form-body">
                        <input type="hidden" name="id" value="${item.id || ''}">
                        <input type="hidden" name="typ" value="${type}">
                        
                        <div class="form-group-header">Základní údaje</div>
                        
                        <div class="form-row">
                            <div class="form-col-8">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Název nemovitosti</label>
                                    <input type="text" name="nazev" class="form-control" value="${item.nazev || ''}" 
                                           placeholder="např. Bytový dům Centrum" 
                                           ${!isView ? 'required' : ''} ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Počet jednotek</label>
                                    <input type="number" name="pocetJednotek" class="form-control" 
                                           value="${item.pocetJednotek || (type === 'pozemek' ? '0' : '1')}" 
                                           min="${type === 'pozemek' ? '0' : '1'}"
                                           onchange="Nemovitosti.updateJednotkyInfo(this.value)"
                                           ${!isView ? 'required' : ''} ${isView ? 'disabled' : ''}>
                                    <span class="form-help">Celkový počet jednotek v objektu</span>
                                </div>
                            </div>
                        </div>
                        
                        <div id="jednotky-info" class="alert alert-info" style="display: none;">
                            <strong>Poznámka:</strong> <span id="jednotky-message"></span>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Vlastník (pronajímatel)</label>
                                    <div class="form-control-wrapper">
                                        <select name="pronajimatel_id" class="form-control" ${!isView ? 'required' : ''} ${isView ? 'disabled' : ''}>
                                            <option value="">Vyberte vlastníka</option>
                                            ${getPronajimatelList().map(p => `
                                                <option value="${p.id}" ${item.pronajimatel_id === p.id ? 'selected' : ''}>
                                                    ${p.nazev || `${p.jmeno} ${p.prijmeni}`}
                                                </option>
                                            `).join('')}
                                        </select>
                                        <span class="form-icon">▼</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label">Správce nemovitosti</label>
                                    <input type="text" name="spravce" class="form-control" value="${item.spravce || ''}" 
                                           placeholder="Jméno správce nebo správcovské firmy"
                                           ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group-header">Adresa</div>
                        
                        <div class="form-row">
                            <div class="form-col-8">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Ulice</label>
                                    <input type="text" name="ulice" class="form-control" value="${item.ulice || ''}" 
                                           ${!isView ? 'required' : ''} ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label">Číslo popisné/orientační</label>
                                    <input type="text" name="cisloPopisne" class="form-control" value="${item.cisloPopisne || ''}" 
                                           placeholder="např. 123/4"
                                           ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Město</label>
                                    <input type="text" name="mesto" class="form-control" value="${item.mesto || ''}" 
                                           ${!isView ? 'required' : ''} ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">PSČ</label>
                                    <input type="text" name="psc" class="form-control" value="${item.psc || ''}" 
                                           pattern="[0-9]{3} ?[0-9]{2}"
                                           ${!isView ? 'required' : ''} ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Stát</label>
                                    <input type="text" name="stat" class="form-control" value="${item.stat || 'Česká republika'}" 
                                           ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group-header">Detaily objektu</div>
                        
                        <div class="form-row">
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Počet nadzemních podlaží</label>
                                    <input type="number" name="pocetNadzemnichPodlazi" class="form-control" 
                                           value="${item.pocetNadzemnichPodlazi || ''}" 
                                           min="0" ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Počet podzemních podlaží</label>
                                    <input type="number" name="pocetPodzemnichPodlazi" class="form-control" 
                                           value="${item.pocetPodzemnichPodlazi || ''}" 
                                           min="0" ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Rok výstavby</label>
                                    <input type="number" name="rokVystavby" class="form-control" 
                                           value="${item.rokVystavby || ''}" 
                                           min="1800" max="${new Date().getFullYear()}" 
                                           ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Rok rekonstrukce</label>
                                    <input type="number" name="rokRekonstrukce" class="form-control" 
                                           value="${item.rokRekonstrukce || ''}" 
                                           min="1800" max="${new Date().getFullYear()}" 
                                           ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-12">
                                <div class="form-field">
                                    <label class="form-label">Vybavení objektu</label>
                                    <div class="checkbox-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="vybaveni" value="vytah" 
                                                   ${item.vybaveni?.includes('vytah') ? 'checked' : ''}
                                                   ${isView ? 'disabled' : ''}>
                                            <span>Výtah</span>
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="vybaveni" value="parkovani" 
                                                   ${item.vybaveni?.includes('parkovani') ? 'checked' : ''}
                                                   ${isView ? 'disabled' : ''}>
                                            <span>Parkování</span>
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="vybaveni" value="kolarna" 
                                                   ${item.vybaveni?.includes('kolarna') ? 'checked' : ''}
                                                   ${isView ? 'disabled' : ''}>
                                            <span>Kolárna</span>
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="vybaveni" value="kocarkarna" 
                                                   ${item.vybaveni?.includes('kocarkarna') ? 'checked' : ''}
                                                   ${isView ? 'disabled' : ''}>
                                            <span>Kočárkárna</span>
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="vybaveni" value="zahrada" 
                                                   ${item.vybaveni?.includes('zahrada') ? 'checked' : ''}
                                                   ${isView ? 'disabled' : ''}>
                                            <span>Zahrada</span>
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="vybaveni" value="susarna" 
                                                   ${item.vybaveni?.includes('susarna') ? 'checked' : ''}
                                                   ${isView ? 'disabled' : ''}>
                                            <span>Sušárna</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-12">
                                <div class="form-field">
                                    <label class="form-label">Poznámka</label>
                                    <textarea name="poznamka" class="form-control" rows="3" 
                                              ${isView ? 'disabled' : ''}>${item.poznamka || ''}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="window.history.back()">
                            Zpět
                        </button>
                        ${!isView ? `
                            <button type="submit" class="btn btn-primary">
                                ${isEdit ? 'Uložit změny' : 'Vytvořit nemovitost'}
                            </button>
                        ` : `
                            <button type="button" class="btn btn-primary" onclick="Nemovitosti.edit('${item.id}')">
                                Upravit
                            </button>
                            <button type="button" class="btn btn-success" onclick="Nemovitosti.showUnits('${item.id}')">
                                <span class="btn-icon">🔑</span>
                                Správa jednotek
                            </button>
                        `}
                    </div>
                </form>
            </div>
        `;
        
        // Přidat event listener pro formulář pouze pokud není v režimu prohlížení
        if (!isView) {
            const form = document.getElementById('nemovitost-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                saveForm(type, id);
            });
            
            // Zobrazit info o jednotkách
            const pocetJednotek = item.pocetJednotek || (type === 'pozemek' ? 0 : 1);
            updateJednotkyInfo(pocetJednotek);
        }
    }

    function updateJednotkyInfo(pocet) {
        const infoDiv = document.getElementById('jednotky-info');
        const messageSpan = document.getElementById('jednotky-message');
        
        if (!infoDiv || !messageSpan) return;
        
        pocet = parseInt(pocet) || 0;
        
        if (pocet === 0) {
            infoDiv.style.display = 'none';
        } else if (pocet === 1) {
            messageSpan.textContent = 'Po uložení budete přesměrováni na vytvoření jednotky.';
            infoDiv.style.display = 'block';
        } else {
            messageSpan.textContent = `Po uložení budete moci vytvořit ${pocet} jednotek.`;
            infoDiv.style.display = 'block';
        }
    }

    function saveForm(type, id) {
        const form = document.getElementById('nemovitost-form');
        const formData = new FormData(form);
        const item = {};
        
        // Převést FormData na objekt
        for (let [key, value] of formData.entries()) {
            if (key === 'vybaveni') {
                if (!item.vybaveni) item.vybaveni = [];
                item.vybaveni.push(value);
            } else {
                item[key] = value;
            }
        }
        
        // Přidat ID
        if (!item.id) {
            item.id = getNextId('nemovitost');
        }
        
        // Přidat časové razítko
        if (!id) {
            item.created_at = new Date().toISOString();
        }
        item.updated_at = new Date().toISOString();
        
        // Uložit
        if (id) {
            const index = data.nemovitosti.findIndex(n => n.id === id);
            if (index !== -1) {
                data.nemovitosti[index] = item;
            }
        } else {
            data.nemovitosti.push(item);
        }
        
        // Uložit do localStorage
        saveData();
        
        // Pokud má nemovitost jednotky, přesměrovat na jejich správu
        const pocetJednotek = parseInt(item.pocetJednotek) || 0;
        if (!id && pocetJednotek > 0) {
            // Nová nemovitost s jednotkami - přesměrovat na vytvoření jednotek
            showUnits(item.id, true);
        } else {
            // Jinak zpět na seznam
            window.history.back();
        }
    }

    function showUnits(nemovitostId, isNew = false) {
        const nemovitost = getItemById(nemovitostId);
        if (!nemovitost) return;
        
        const jednotky = data.jednotky.filter(j => j.nemovitost_id === nemovitostId);
        const typNemovitosti = typyNemovitosti[nemovitost.typ];
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">
                        <span class="module-icon">🔑</span>
                        Jednotky - ${nemovitost.nazev}
                    </h1>
                </div>
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="Nemovitosti.showUnitForm('${nemovitostId}')">
                        <span class="btn-icon">+</span>
                        <span class="btn-text">Přidat jednotku</span>
                    </button>
                </div>
            </div>
            
            ${isNew ? `
                <div class="alert alert-success">
                    <strong>Nemovitost byla úspěšně vytvořena!</strong> 
                    Nyní můžete přidat jednotky. Celkem jednotek: ${nemovitost.pocetJednotek}
                </div>
            ` : ''}
            
            <div class="info-box">
                <p><strong>Adresa:</strong> ${nemovitost.ulice} ${nemovitost.cisloPopisne}, ${nemovitost.mesto}</p>
                <p><strong>Počet jednotek:</strong> ${jednotky.length} / ${nemovitost.pocetJednotek}</p>
            </div>
            
            <div class="card">
                ${jednotky.length === 0 ? 
                    `<div class="empty-state">
                        <div class="empty-state-icon">🔑</div>
                        <p class="empty-state-text">Zatím nejsou vytvořeny žádné jednotky</p>
                        <button class="btn btn-primary" onclick="Nemovitosti.showUnitForm('${nemovitostId}')">
                            Vytvořit první jednotku
                        </button>
                    </div>` :
                    `<div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Označení</th>
                                    <th>Typ</th>
                                    <th>Plocha</th>
                                    <th>Dispozice</th>
                                    <th>Stav</th>
                                    <th>Nájemce</th>
                                    <th>Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${jednotky.map(j => `
                                    <tr>
                                        <td>${j.id}</td>
                                        <td>${j.oznaceni}</td>
                                        <td>${typyJednotek[j.typ]?.name || j.typ}</td>
                                        <td>${j.plocha} m²</td>
                                        <td>${j.dispozice || '-'}</td>
                                        <td>${getStavBadge(j.stav)}</td>
                                        <td>${j.najemce || '-'}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn-icon btn-edit" onclick="Nemovitosti.editUnit('${j.id}')" title="Upravit">
                                                    ✏️
                                                </button>
                                                <button class="btn-icon btn-delete" onclick="Nemovitosti.deleteUnit('${j.id}')" title="Smazat">
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>`
                }
            </div>
            
            <div class="form-actions">
                <button class="btn btn-secondary" onclick="Nemovitosti.render('budovy')">
                    Zpět na seznam budov
                </button>
            </div>
        `;
    }

    function saveUnit(nemovitostId, jednotkaId) {
        const form = document.getElementById('jednotka-form');
        const formData = new FormData(form);
        const item = {};
        
        for (let [key, value] of formData.entries()) {
            item[key] = value;
        }
        
        if (!item.id) {
            item.id = getNextId('jednotka');
        }
        
        if (!jednotkaId) {
            item.created_at = new Date().toISOString();
            data.jednotky.push(item);
        } else {
            const index = data.jednotky.findIndex(j => j.id === jednotkaId);
            if (index !== -1) {
                item.updated_at = new Date().toISOString();
                data.jednotky[index] = { ...data.jednotky[index], ...item };
            }
        }
        
        saveData();
        showUnits(nemovitostId);
    }

    // Další pomocné funkce...
    function getTypeName(type) {
        return typyNemovitosti[type]?.name || type;
    }

    function getStavBadge(stav) {
        const stavy = {
            'volna': '<span class="badge badge-success">Volná</span>',
            'obsazena': '<span class="badge badge-danger">Obsazená</span>',
            'rezervovana': '<span class="badge badge-warning">Rezervovaná</span>',
            'rekonstrukce': '<span class="badge badge-info">V rekonstrukci</span>'
        };
        return stavy[stav] || '<span class="badge badge-secondary">Neznámý</span>';
    }

    function getItemById(id) {
        return data.nemovit
