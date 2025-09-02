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
        
        // Filtrovat data podle typu
        let filteredData = [];
        if (type === 'all') {
            filteredData = data.nemovitosti;
        } else {
            filteredData = data.nemovitosti.filter(n => n.typ === type);
        }

        // Získat název a ikonu typu pro zobrazení
        const moduleConfig = { icon: '🏘️', name: 'Nemovitosti' };
        const typeConfig = typyNemovitosti[type];
        const typeName = typeConfig ? typeConfig.name : 'Přehled';
        const typeIcon = typeConfig ? typeConfig.icon : '📊';

        // Spočítat jednotky pro každou nemovitost
        const jednotkyCount = {};
        data.jednotky.forEach(j => {
            jednotkyCount[j.nemovitost_id] = (jednotkyCount[j.nemovitost_id] || 0) + 1;
        });

        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">
                        <span class="module-icon">${moduleConfig.icon}</span>
                        Nemovitosti - 
                        <span class="type-icon">${typeIcon}</span>
                        ${typeName}
                    </h1>
                </div>
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="Nemovitosti.showAddDialog('${type}')">
                        <span class="btn-icon">+</span>
                        <span class="btn-text">Přidat nemovitost</span>
                    </button>
                </div>
            </div>

            <div class="card">
                ${filteredData.length === 0 ? 
                    `<div class="empty-state">
                        <div class="empty-state-icon">📁</div>
                        <p class="empty-state-text">Zatím nejsou žádné nemovitosti typu "${typeName}"</p>
                        <button class="btn btn-primary" onclick="Nemovitosti.showAddDialog('${type}')">
                            Přidat první nemovitost
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
                <button class="btn btn-secondary" onclick="Nemovitosti.render()">
                    Zpět na seznam nemovitostí
                </button>
            </div>
        `;
    }

    function showUnitForm(nemovitostId, jednotkaId = null) {
        const nemovitost = getItemById(nemovitostId);
        const jednotka = jednotkaId ? data.jednotky.find(j => j.id === jednotkaId) : {};
        const isEdit = !!jednotkaId;
        
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
                                        <select name="stav" class="form-control">
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
        return data.nemovitosti.find(n => n.id === id) || {};
    }

    function getPronajimatelList() {
        return JSON.parse(localStorage.getItem('pronajimatel_data') || '[]');
    }

    function getPronajimatelById(id) {
        const list = getPronajimatelList();
        return list.find(p => p.id === id);
    }

    function showAddDialog(preselectedType = 'all') {
        const mainContent = document.getElementById('main-content');
        
        if (preselectedType !== 'all' && typyNemovitosti[preselectedType]) {
            showForm(preselectedType, null);
            return;
        }
    
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

    function editUnit(jednotkaId) {
        const jednotka = data.jednotky.find(j => j.id === jednotkaId);
        if (jednotka) {
            showUnitForm(jednotka.nemovitost_id, jednotkaId);
        }
    }

    function deleteUnit(jednotkaId) {
        if (confirm('Opravdu chcete smazat tuto jednotku?')) {
            data.jednotky = data.jednotky.filter(j => j.id !== jednotkaId);
            saveData();
            // Refresh current view
            const jednotka = data.jednotky.find(j => j.id === jednotkaId);
            if (jednotka) {
                showUnits(jednotka.nemovitost_id);
            }
        }
    }

    function archive(id) {
        if (confirm('Opravdu chcete archivovat tuto nemovitost?')) {
            // TODO: Implementovat archivaci
            alert(`Archivace nemovitosti ID: ${id}`);
        }
    }

    // Public API
    return {
        render,
        showAddDialog,
        showForm,
        view,
        edit,
        archive,
        showUnits,
        showUnitForm,
        editUnit,
        deleteUnit,
        updateJednotkyInfo
    };
})();
