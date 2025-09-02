window.Nemovitosti = (function() {
    'use strict';

    // Simulovaná data
    let data = {
        nemovitosti: JSON.parse(localStorage.getItem('nemovitosti_data') || '[]'),
        jednotky: JSON.parse(localStorage.getItem('jednotky_data') || '[]')
    };
    
    // Přidat proměnnou pro zobrazení archivovaných záznamů
    let showArchived = false;

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

    function renderBudovy(filterType = null) {
        const mainContent = document.getElementById('main-content');
        
        // Filtrovat data - přidat filtr pro archivované
        let filteredData = data.nemovitosti;
        if (!showArchived) {
            filteredData = filteredData.filter(n => !n.archived);
        }
        if (filterType && typyNemovitosti[filterType]) {
            filteredData = filteredData.filter(n => n.typ === filterType);
        }

        // Spočítat jednotky pro každou nemovitost
        const jednotkyCount = {};
        data.jednotky.forEach(j => {
            if (!j.archived) {
                jednotkyCount[j.nemovitost_id] = (jednotkyCount[j.nemovitost_id] || 0) + 1;
            }
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
                    <button class="btn ${showArchived ? 'btn-warning' : 'btn-secondary'}" 
                            onclick="Nemovitosti.toggleArchived()">
                        <span class="btn-icon">📁</span>
                        <span class="btn-text">${showArchived ? 'Skrýt archiv' : 'Zobrazit archiv'}</span>
                    </button>
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
                                    <th style="width: 150px;">Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(item => {
                                    const vlastnik = getPronajimatelById(item.pronajimatel_id);
                                    const pocetJednotek = jednotkyCount[item.id] || 0;
                                    return `
                                        <tr class="${item.archived ? 'archived-row' : ''}">
                                            <td>${item.id}</td>
                                            <td class="text-truncate">
                                                ${item.nazev}
                                                ${item.archived ? '<span class="badge badge-secondary">Archiv</span>' : ''}
                                            </td>
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
                                                    ${!item.archived ? `
                                                        <button class="btn-icon btn-edit" onclick="Nemovitosti.edit('${item.id}')" title="Upravit">
                                                            ✏️
                                                        </button>
                                                        <button class="btn-icon btn-units" onclick="Nemovitosti.showUnits('${item.id}')" title="Jednotky">
                                                            🔑
                                                        </button>
                                                        <button class="btn-icon btn-archive" onclick="Nemovitosti.archive('${item.id}')" title="Archivovat">
                                                            📁
                                                        </button>
                                                    ` : `
                                                        <button class="btn-icon btn-restore" onclick="Nemovitosti.restore('${item.id}')" title="Obnovit">
                                                            ♻️
                                                        </button>
                                                    `}
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
        
        // Přidat styly pro archivované řádky
        addArchiveStyles();
    }

    function renderJednotky(filterStav = null) {
        const mainContent = document.getElementById('main-content');
        
        // Filtrovat data
        let filteredData = data.jednotky;
        if (!showArchived) {
            filteredData = filteredData.filter(j => !j.archived);
        }
        if (filterStav) {
            filteredData = filteredData.filter(j => j.stav === filterStav);
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
                <div class="page-actions">
                    <button class="btn ${showArchived ? 'btn-warning' : 'btn-secondary'}" 
                            onclick="Nemovitosti.toggleArchived()">
                        <span class="btn-icon">📁</span>
                        <span class="btn-text">${showArchived ? 'Skrýt archiv' : 'Zobrazit archiv'}</span>
                    </button>
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
                                    <th style="width: 120px;">Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(jed => {
                                    const nemovitost = data.nemovitosti.find(n => n.id === jed.nemovitost_id);
                                    const najemce = jed.najemce_id ? najemciData.find(n => n.id === jed.najemce_id) : null;
                                    return `
                                        <tr class="${jed.archived ? 'archived-row' : ''}">
                                            <td>${jed.id}</td>
                                            <td>
                                                <strong>${jed.oznaceni}</strong>
                                                ${jed.archived ? '<span class="badge badge-secondary">Archiv</span>' : ''}
                                            </td>
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
                                                    ${!jed.archived ? `
                                                        <button class="btn-icon btn-edit" onclick="Nemovitosti.editUnit('${jed.id}')" title="Upravit">
                                                            ✏️
                                                        </button>
                                                        <button class="btn-icon btn-archive" onclick="Nemovitosti.archiveUnit('${jed.id}')" title="Archivovat">
                                                            📁
                                                        </button>
                                                    ` : `
                                                        <button class="btn-icon btn-restore" onclick="Nemovitosti.restoreUnit('${jed.id}')" title="Obnovit">
                                                            ♻️
                                                        </button>
                                                    `}
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
        
        // Přidat tlačítko příloh do headeru
        const attachmentButton = !isView ? `
            <div class="form-attachments">
                <button type="button" class="btn-icon btn-attachment" title="Přílohy" onclick="window.AttachmentSystem.show()">
                    📎
                </button>
            </div>
        ` : '';
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">${title} - ${getTypeName(type)}</h1>
                </div>
                ${attachmentButton}
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
                            ${!item.archived ? `
                                <button type="button" class="btn btn-warning" onclick="Nemovitosti.archive('${item.id}')">
                                    <span class="btn-icon">📁</span>
                                    Archivovat
                                </button>
                            ` : ''}
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
            
            // Inicializovat systém příloh
            setTimeout(() => {
                if (window.AttachmentSystem) {
                    const entityType = 'nemovitost';
                    const entityId = item.id || 'new_' + Date.now();
                    AttachmentSystem.init('#nemovitost-form', entityType, entityId);
                }
            }, 100);
            
            // Zobrazit info o jednotkách
            const pocetJednotek = item.pocetJednotek || (type === 'pozemek' ? 0 : 1);
            updateJednotkyInfo(pocetJednotek);
        }
    }

    function showUnitForm(nemovitostId, jednotkaId = null) {
        const nemovitost = getItemById(nemovitostId);
        const jednotka = jednotkaId ? data.jednotky.find(j => j.id === jednotkaId) : {};
        const isEdit = !!jednotkaId;
        const isView = false; // Pro jednotky zatím nemáme view mode
        
        // Získat seznam nájemců
        const najemciData = JSON.parse(localStorage.getItem('najemnici_data') || '[]');
        
        // Přidat tlačítko příloh do headeru
        const attachmentButton = `
            <div class="form-attachments">
                <button type="button" class="btn-icon btn-attachment" title="Přílohy" onclick="window.AttachmentSystem.show()">
                    📎
                </button>
            </div>
        `;
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">${isEdit ? 'Upravit' : 'Nová'} jednotka - ${nemovitost.nazev}</h1>
                </div>
                ${attachmentButton}
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
        
        // Inicializovat systém příloh
        setTimeout(() => {
            if (window.AttachmentSystem) {
                const entityType = 'jednotka';
                const entityId = jednotka.id || 'new_' + Date.now();
                AttachmentSystem.init('#jednotka-form', entityType, entityId);
            }
        }, 100);
    }

    function archive(id) {
        const nemovitost = getItemById(id);
        if (!nemovitost) return;
        
        // Zkontrolovat jednotky
        const aktivniJednotky = data.jednotky.filter(j => j.nemovitost_id === id && !j.archived);
        
        let confirmMessage = `Opravdu chcete archivovat nemovitost "${nemovitost.nazev}"?`;
        
        if (aktivniJednotky.length > 0) {
            confirmMessage += `\n\nNemovitost obsahuje ${aktivniJednotky.length} aktivních jednotek. Chcete archivovat i všechny jednotky?`;
            
            if (confirm(confirmMessage)) {
                // Archivovat nemovitost
                nemovitost.archived = true;
                nemovitost.archivedAt = new Date().toISOString();
                
                // Zeptat se na jednotky
                if (confirm('Archivovat i všechny jednotky?')) {
                    aktivniJednotky.forEach(jednotka => {
                        jednotka.archived = true;
                        jednotka.archivedAt = new Date().toISOString();
                    });
                }
                
                saveData();
                render('budovy');
            }
        } else {
            if (confirm(confirmMessage)) {
                nemovitost.archived = true;
                nemovitost.archivedAt = new Date().toISOString();
                saveData();
                render('budovy');
            }
        }
    }

    function archiveUnit(id) {
        const jednotka = data.jednotky.find(j => j.id === id);
        if (!jednotka) return;
        
        const nemovitost = getItemById(jednotka.nemovitost_id);
        let confirmMessage = `Opravdu chcete archivovat jednotku "${jednotka.oznaceni}"?`;
        
        // Zkontrolovat, zda je to poslední aktivní jednotka
        const aktivniJednotky = data.jednotky.filter(j => 
            j.nemovitost_id === jednotka.nemovitost_id && 
            !j.archived && 
            j.id !== id
        );
        
        if (aktivniJednotky.length === 0 && nemovitost && !nemovitost.archived) {
            confirmMessage += '\n\nToto je poslední aktivní jednotka v budově. Chcete archivovat i celou budovu?';
        }
        
        if (confirm(confirmMessage)) {
            jednotka.archived = true;
            jednotka.archivedAt = new Date().toISOString();
            
            // Pokud je to poslední jednotka, zeptat se na budovu
            if (aktivniJednotky.length === 0 && nemovitost && !nemovitost.archived) {
                if (confirm('Archivovat i budovu?')) {
                    nemovitost.archived = true;
                    nemovitost.archivedAt = new Date().toISOString();
                }
            }
            
            saveData();
            render('jednotky');
        }
    }

    function restore(id) {
        const nemovitost = getItemById(id);
        if (!nemovitost) return;
        
        if (confirm(`Opravdu chcete obnovit nemovitost "${nemovitost.nazev}" z archivu?`)) {
            delete nemovitost.archived;
            delete nemovitost.archivedAt;
            saveData();
            render('budovy');
        }
    }

    function restoreUnit(id) {
        const jednotka = data.jednotky.find(j => j.id === id);
        if (!jednotka) return;
        
        if (confirm(`Opravdu chcete obnovit jednotku "${jednotka.oznaceni}" z archivu?`)) {
            delete jednotka.archived;
            delete jednotka.archivedAt;
            
            // Zkontrolovat, zda není budova archivovaná
            const nemovitost = getItemById(jednotka.nemovitost_id);
            if (nemovitost && nemovitost.archived) {
                if (confirm('Budova je archivovaná. Chcete ji také obnovit?')) {
                    delete nemovitost.archived;
                    delete nemovitost.archivedAt;
                }
            }
            
            saveData();
            render('jednotky');
        }
    }

    function toggleArchived() {
        showArchived = !showArchived;
        // Znovu vykreslit aktuální pohled
        const currentView = getCurrentView();
        render(currentView);
    }

    function getCurrentView() {
        // Zkusit zjistit aktuální pohled z URL nebo jinak
        // Pro teď vraťme 'budovy' jako default
        return 'budovy';
    }

    function addArchiveStyles() {
        if (document.getElementById('archive-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'archive-styles';
        styles.textContent = `
            .archived-row {
                opacity: 0.6;
                background-color: #f8f9fa;
            }
            
            .archived-row td {
                color: #6c757d;
            }
            
            .btn-archive {
                color: #ffc107;
            }
            
            .btn-archive:hover {
                color: #e0a800;
            }
            
            .btn-restore {
                color: #28a745;
            }
            
            .btn-restore:hover {
                color: #218838;
            }
            
            .form-attachments {
                position: absolute;
                top: 10px;
                right: 20px;
            }
            
            .btn-attachment {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .btn-attachment:hover {
                background: #e9ecef;
                transform: scale(1.1);
            }
            
            .page-header {
                position: relative;
            }
        `;
        document.head.appendChild(styles);
    }

    // ... všechny ostatní funkce zůstávají stejné ...
    // Přidejte tyto funkce PŘED "return" statement:
    
    function renderPrehled() {
        const mainContent = document.getElementById('main-content');
        
        // Statistiky
        const pocetNemovitosti = data.nemovitosti.filter(n => !n.archived).length;
        const pocetJednotek = data.jednotky.filter(j => !j.archived).length;
        const volneJednotky = data.jednotky.filter(j => j.stav === 'volna' && !j.archived).length;
        const obsazeneJednotky = data.jednotky.filter(j => j.stav === 'obsazena' && !j.archived).length;
        
        // Načíst data pronajímatelů pro zobrazení
        const pronajimatelData = JSON.parse(localStorage.getItem('pronajimatel_data') || '[]');
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">
                        <span class="module-icon">🏘️</span>
                        Nemovitosti - Přehled
                    </h1>
                </div>
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="Nemovitosti.showAddDialog()">
                        <span class="btn-icon">+</span>
                        <span class="btn-text">Přidat nemovitost</span>
                    </button>
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
            </div>
            
            <div class="content-grid">
                <div class="card">
                    <div class="card-header">
                        <h3>Poslední nemovitosti</h3>
                        <button class="btn btn-sm btn-link" onclick="Nemovitosti.render('budovy')">
                            Zobrazit vše →
                        </button>
                    </div>
                    <div class="list-container">
                        ${data.nemovitosti.slice(0, 5).map(item => {
                            const vlastnik = pronajimatelData.find(p => p.id === item.pronajimatel_id);
                            const pocetJednotek = data.jednotky.filter(j => j.nemovitost_id === item.id && !j.archived).length;
                            return `
                                <div class="list-item" onclick="Nemovitosti.view('${item.id}')">
                                    <div class="list-item-icon">${typyNemovitosti[item.typ]?.icon || '🏘️'}</div>
                                    <div class="list-item-content">
                                        <div class="list-item-title">${item.nazev}</div>
                                        <div class="list-item-subtitle">
                                            ${item.ulice} ${item.cisloPopisne || ''}, ${item.mesto || ''} • 
                                            ${pocetJednotek}/${item.pocetJednotek || 0} jednotek
                                        </div>
                                        <div class="list-item-meta">
                                            Vlastník: ${vlastnik?.nazev || vlastnik?.prijmeni || '-'}
                                        </div>
                                    </div>
                                    <div class="list-item-actions">
                                        <button class="btn-icon btn-sm" onclick="event.stopPropagation(); Nemovitosti.showUnits('${item.id}')" title="Jednotky">
                                            🔑
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('') || '<div class="empty-state-small">Zatím žádné nemovitosti</div>'}
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3>Volné jednotky</h3>
                        <button class="btn btn-sm btn-link" onclick="Nemovitosti.render('volne')">
                            Zobrazit vše →
                        </button>
                    </div>
                    <div class="list-container">
                        ${data.jednotky.filter(j => j.stav === 'volna' && !j.archived).slice(0, 5).map(jednotka => {
                            const nemovitost = data.nemovitosti.find(n => n.id === jednotka.nemovitost_id);
                            return `
                                <div class="list-item" onclick="Nemovitosti.viewJednotka('${jednotka.id}')">
                                    <div class="list-item-icon">${typyJednotek[jednotka.typ]?.icon || '🔑'}</div>
                                    <div class="list-item-content">
                                        <div class="list-item-title">${jednotka.oznaceni}</div>
                                        <div class="list-item-subtitle">
                                            ${nemovitost?.nazev || '-'} • ${jednotka.plocha} m² • ${jednotka.dispozice || '-'}
                                        </div>
                                        <div class="list-item-meta">
                                            ${typyJednotek[jednotka.typ]?.name || jednotka.typ}
                                        </div>
                                    </div>
                                    <div class="list-item-status">
                                        <span class="badge badge-success">Volná</span>
                                    </div>
                                </div>
                            `;
                        }).join('') || '<div class="empty-state-small">Žádné volné jednotky</div>'}
                    </div>
                </div>
            </div>
        `;
        
        addStatsStyles();
        addListStyles();
    }
    
    function showAddDialog() {
        const mainContent = document.getElementById('main-content');
        
        mainContent.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <span class="module-icon">🏘️</span>
                    Vyberte typ nemovitosti
                </h1>
            </div>
            
            <div class="type-selector">
                <div class="type-cards">
                    ${Object.entries(typyNemovitosti).map(([key, typ]) => `
                        <div class="type-card" onclick="Nemovitosti.showForm('${key}')">
                            <div class="type-card-icon">${typ.icon}</div>
                            <h3 class="type-card-title">${typ.name}</h3>
                            <p class="type-card-description">
                                ${key === 'bytovy_dum' ? 'Vícepodlažní budova s byty' :
                                  key === 'rodinny_dum' ? 'Samostatný dům' :
                                  key === 'admin_budova' ? 'Kancelářská budova' :
                                  key === 'prumyslovy' ? 'Skladové a výrobní prostory' :
                                  key === 'pozemek' ? 'Stavební nebo zemědělský pozemek' :
                                  'Jiný typ objektu'}
                            </p>
                        </div>
                    `).join('')}
                </div>
                <div class="form-actions">
                    <button class="btn btn-secondary" onclick="window.history.back()">
                        <span class="btn-icon">←</span>
                        <span class="btn-text">Zpět</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    function view(id) {
        const item = getItemById(id);
        if (!item) return;
        showForm(item.typ, id, true);
    }
    
    function edit(id) {
        const item = getItemById(id);
        if (!item) return;
        showForm(item.typ, id, false);
    }
    
    function showUnits(nemovitostId, isNew = false) {
        const nemovitost = getItemById(nemovitostId);
        if (!nemovitost) return;
        
        const jednotky = data.jednotky.filter(j => j.nemovitost_id === nemovitostId && !j.archived);
        
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
                <p><strong>Adresa:</strong> ${nemovitost.ulice} ${nemovitost.cisloPopisne || ''}, ${nemovitost.mesto}</p>
                <p><strong>Počet jednotek:</strong> ${jednotky.length} / ${nemovitost.pocetJednotek || 0}</p>
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
    
    function editUnit(jednotkaId) {
        const jednotka = data.jednotky.find(j => j.id === jednotkaId);
        if (jednotka) {
            showUnitForm(jednotka.nemovitost_id, jednotkaId);
        }
    }
    
    function deleteUnit(jednotkaId) {
        if (confirm('Opravdu chcete smazat tuto jednotku?')) {
            const jednotka = data.jednotky.find(j => j.id === jednotkaId);
            if (jednotka) {
                const nemovitostId = jednotka.nemovitost_id;
                data.jednotky = data.jednotky.filter(j => j.id !== jednotkaId);
                saveData();
                showUnits(nemovitostId);
            }
        }
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
                            <dd>${nemovitost ? `${nemovitost.ulice} ${nemovitost.cisloPopisne || ''}, ${nemovitost.mesto}` : '-'}</dd>
                        </dl>
                        
                        ${jednotka.stav === 'obsazena' && najemce ? `
                            <h3>Nájemce</h3>
                            <dl>
                                <dt>Jméno:</dt>
                                <dd>
                                    <a href="#" onclick="window.Router.navigate('najemnici'); Najemnici.view('${najemce.id}'); return false;">
                                        ${najemce.jmeno} ${najemce.prijmeni}
                                    </a>
                                </dd>
                                
                                <dt>Telefon:</dt>
                                <dd>${najemce.telefon || '-'}</dd>
                                
                                <dt>Email:</dt>
                                <dd>${najemce.email || '-'}</dd>
                            </dl>
                        ` : ''}
                    </div>
                </div>
                
                <div class="form-actions">
                    <button class="btn btn-secondary" onclick="window.history.back()">Zpět</button>
                    <button class="btn btn-primary" onclick="Nemovitosti.editUnit('${jednotka.id}')">Upravit</button>
                </div>
            </div>
        `;
    }
    
    function saveForm(type, id) {
        const form = document.getElementById('nemovitost-form');
        const formData = new FormData(form);
        const item = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'vybaveni') {
                if (!item.vybaveni) item.vybaveni = [];
                item.vybaveni.push(value);
            } else {
                item[key] = value;
            }
        }
        
        if (!item.id) {
            item.id = getNextId('nemovitost');
        }
        
        if (!id) {
            item.created_at = new Date().toISOString();
        }
        item.updated_at = new Date().toISOString();
        
        if (id) {
            const index = data.nemovitosti.findIndex(n => n.id === id);
            if (index !== -1) {
                data.nemovitosti[index] = item;
            }
        } else {
            data.nemovitosti.push(item);
        }
        
        saveData();
        
        const pocetJednotek = parseInt(item.pocetJednotek) || 0;
        if (!id && pocetJednotek > 0) {
            showUnits(item.id, true);
        } else {
            window.history.back();
        }
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
    
    function toggleNajemceField(stav) {
        const najemceFields = document.getElementById('najemce-fields');
        const najemFields = document.getElementById('najem-fields');
        
        if (najemceFields) {
            if (stav === 'obsazena' || stav === 'rezervovana') {
                najemceFields.style.display = '';
            } else {
                najemceFields.style.display = 'none';
            }
        }
        
        if (najemFields) {
            if (stav === 'obsazena') {
                najemFields.style.display = '';
            } else {
                najemFields.style.display = 'none';
            }
        }
    }
    
    // Pomocné funkce
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
        return data.nemovitosti.find(n => n.id === id) || {};
    }
    
    function getPronajimatelList() {
        return JSON.parse(localStorage.getItem('pronajimatel_data') || '[]');
    }
    
    function getPronajimatelById(id) {
        const list = getPronajimatelList();
        return list.find(p => p.id === id);
    }
    
    function addListStyles() {
        if (document.getElementById('nemovitosti-list-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'nemovitosti-list-styles';
        styles.textContent = `
            .content-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            
            .list-container {
                max-height: 400px;
                overflow-y: auto;
            }
            
            .list-item {
                display: flex;
                align-items: center;
                padding: 12px;
                border-bottom: 1px solid #e9ecef;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            
            .list-item:hover {
                background-color: #f8f9fa;
            }
            
            .list-item-icon {
                font-size: 24px;
                margin-right: 12px;
            }
            
            .list-item-content {
                flex: 1;
                min-width: 0;
            }
            
            .list-item-title {
                font-weight: 500;
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .list-item-subtitle {
                font-size: 13px;
                color: #666;
                margin-top: 2px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .list-item-meta {
                font-size: 12px;
                color: #999;
                margin-top: 2px;
            }
            
            .list-item-actions {
                margin-left: 12px;
            }
            
            .list-item-status {
                margin-left: 12px;
            }
            
            .empty-state-small {
                padding: 40px 20px;
                text-align: center;
                color: #666;
            }
        `;
        document.head.appendChild(styles);
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
            
            .type-selector {
                padding: 20px;
            }
            
            .type-cards {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .type-card {
                background: white;
                border: 2px solid #e9ecef;
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .type-card:hover {
                border-color: #007bff;
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .type-card-icon {
                font-size: 48px;
                margin-bottom: 15px;
            }
            
            .type-card-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
                color: #333;
            }
            
            .type-card-description {
                font-size: 14px;
                color: #666;
                margin: 0;
            }
            
            .info-box {
                background: #f8f9fa;
                border-left: 4px solid #007bff;
                padding: 15px 20px;
                margin-bottom: 20px;
            }
            
            .info-box p {
                margin: 5px 0;
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
        `;
        document.head.appendChild(styles);
    }
    // Public API
    return {
        render,
        showAddDialog,
        showForm,
        view,
        edit,
        archive,
        archiveUnit,
        restore,
        restoreUnit,
        toggleArchived,
        showUnits,
        showUnitForm,
        editUnit,
        deleteUnit,
        viewJednotka,
        updateJednotkyInfo,
        toggleNajemceField,
        // Přidat funkce, které v kódu chyběly
        renderPrehled,
        saveForm,
        saveUnit
    };
})();
