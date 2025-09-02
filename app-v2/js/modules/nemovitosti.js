window.Nemovitosti = (function() {
    'use strict';

    // Simulovaná data - později nahradíme skutečnou databází
    let data = {
        nemovitosti: JSON.parse(localStorage.getItem('nemovitosti_data') || '[]')
    };

    function saveData() {
        localStorage.setItem('nemovitosti_data', JSON.stringify(data.nemovitosti));
    }

    function getNextId() {
        const maxId = data.nemovitosti.reduce((max, item) => Math.max(max, parseInt(item.id) || 0), 0);
        return (maxId + 1).toString();
    }

    // Typy nemovitostí pro konfiguraci
    const typyNemovitosti = {
        'bytovy_dum': { name: 'Bytový dům', icon: '🏢' },
        'rodinny_dum': { name: 'Rodinný dům', icon: '🏠' },
        'byt': { name: 'Byt', icon: '🏬' },
        'komercni': { name: 'Komerční objekt', icon: '🏪' },
        'pozemek': { name: 'Pozemek', icon: '🌳' },
        'garaz': { name: 'Garáž', icon: '🚗' }
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
                                    <th style="width: 60px;">ID</th>
                                    <th style="width: 250px;">Název</th>
                                    <th style="width: 100px;">Typ</th>
                                    <th style="width: 200px;">Adresa</th>
                                    <th style="width: 100px;">Město</th>
                                    <th style="width: 100px;">Jednotek</th>
                                    <th style="width: 100px;">Stav</th>
                                    <th style="width: 100px;">Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(item => `
                                    <tr>
                                        <td>${item.id}</td>
                                        <td class="text-truncate">${item.nazev}</td>
                                        <td><span class="badge badge-${item.typ}">${getTypeName(item.typ)}</span></td>
                                        <td class="text-truncate">${item.ulice} ${item.cisloPopisne || ''}</td>
                                        <td class="text-truncate">${item.mesto || '-'}</td>
                                        <td>${item.pocetJednotek || '0'}</td>
                                        <td>${getStavBadge(item.stav)}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn-icon btn-view" onclick="Nemovitosti.view('${item.id}')" title="Zobrazit">
                                                    👁️
                                                </button>
                                                <button class="btn-icon btn-edit" onclick="Nemovitosti.edit('${item.id}')" title="Upravit">
                                                    ✏️
                                                </button>
                                                <button class="btn-icon btn-archive" onclick="Nemovitosti.archive('${item.id}')" title="Archivovat">
                                                    📁
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
        `;
    }

    function getTypeName(type) {
        return typyNemovitosti[type]?.name || type;
    }

    function getStavBadge(stav) {
        const stavy = {
            'nova': '<span class="badge badge-success">Nová</span>',
            'dobry': '<span class="badge badge-info">Dobrý stav</span>',
            'renovace': '<span class="badge badge-warning">K renovaci</span>',
            'rekonstrukce': '<span class="badge badge-danger">V rekonstrukci</span>'
        };
        return stavy[stav] || '<span class="badge badge-secondary">Neznámý</span>';
    }

    function showAddDialog(preselectedType = 'all') {
        const mainContent = document.getElementById('main-content');
        
        if (preselectedType !== 'all' && typyNemovitosti[preselectedType]) {
            // Přímo zobrazit formulář pro konkrétní typ
            showForm(preselectedType, null);
            return;
        }
    
        // Zobrazit výběr typu
        mainContent.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <span class="module-icon">🏘️</span>
                    Vyberte typ nemovitosti
                </h1>
            </div>
            
            <div class="type-selector">
                <div class="type-cards">
                    <div class="type-card" onclick="Nemovitosti.showForm('bytovy_dum')">
                        <div class="type-card-icon">🏢</div>
                        <h3 class="type-card-title">Bytový dům</h3>
                        <p class="type-card-description">Vícepodlažní budova s byty</p>
                    </div>
                    <div class="type-card" onclick="Nemovitosti.showForm('rodinny_dum')">
                        <div class="type-card-icon">🏠</div>
                        <h3 class="type-card-title">Rodinný dům</h3>
                        <p class="type-card-description">Samostatný dům pro jednu rodinu</p>
                    </div>
                    <div class="type-card" onclick="Nemovitosti.showForm('byt')">
                        <div class="type-card-icon">🏬</div>
                        <h3 class="type-card-title">Byt</h3>
                        <p class="type-card-description">Jednotka v bytovém domě</p>
                    </div>
                    <div class="type-card" onclick="Nemovitosti.showForm('komercni')">
                        <div class="type-card-icon">🏪</div>
                        <h3 class="type-card-title">Komerční objekt</h3>
                        <p class="type-card-description">Kancelář, obchod, sklad</p>
                    </div>
                    <div class="type-card" onclick="Nemovitosti.showForm('pozemek')">
                        <div class="type-card-icon">🌳</div>
                        <h3 class="type-card-title">Pozemek</h3>
                        <p class="type-card-description">Stavební nebo zemědělský pozemek</p>
                    </div>
                    <div class="type-card" onclick="Nemovitosti.showForm('garaz')">
                        <div class="type-card-icon">🚗</div>
                        <h3 class="type-card-title">Garáž</h3>
                        <p class="type-card-description">Garážové stání nebo box</p>
                    </div>
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

    function showForm(type, id = null, viewOnly = false) {
        const mainContent = document.getElementById('main-content');
        const isEdit = id !== null && !viewOnly;
        const isView = viewOnly;
        const item = id ? getItemById(id) : {};
        
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
                            <div class="form-col-12">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Název nemovitosti</label>
                                    <input type="text" name="nazev" class="form-control" value="${item.nazev || ''}" 
                                           ${!isView ? 'required' : ''} ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label">Vlastník (pronajímatel)</label>
                                    <div class="form-control-wrapper">
                                        <select name="pronajimatel_id" class="form-control" ${isView ? 'disabled' : ''}>
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
                                    <label class="form-label">Stav nemovitosti</label>
                                    <div class="form-control-wrapper">
                                        <select name="stav" class="form-control" ${isView ? 'disabled' : ''}>
                                            <option value="">Vyberte stav</option>
                                            <option value="nova" ${item.stav === 'nova' ? 'selected' : ''}>Novostavba</option>
                                            <option value="dobry" ${item.stav === 'dobry' ? 'selected' : ''}>Dobrý stav</option>
                                            <option value="renovace" ${item.stav === 'renovace' ? 'selected' : ''}>K renovaci</option>
                                            <option value="rekonstrukce" ${item.stav === 'rekonstrukce' ? 'selected' : ''}>V rekonstrukci</option>
                                        </select>
                                        <span class="form-icon">▼</span>
                                    </div>
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
                                    <label class="form-label">Číslo popisné</label>
                                    <input type="text" name="cisloPopisne" class="form-control" value="${item.cisloPopisne || ''}" 
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
                        
                        <div class="form-group-header">Detaily</div>
                        
                        <div class="form-row">
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label">Počet jednotek</label>
                                    <input type="number" name="pocetJednotek" class="form-control" value="${item.pocetJednotek || ''}" 
                                           min="0" ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label">Počet pater</label>
                                    <input type="number" name="pocetPater" class="form-control" value="${item.pocetPater || ''}" 
                                           min="0" ${isView ? 'disabled' : ''}>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label">Rok výstavby</label>
                                    <input type="number" name="rokVystavby" class="form-control" value="${item.rokVystavby || ''}" 
                                           min="1800" max="${new Date().getFullYear()}" ${isView ? 'disabled' : ''}>
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
                                ${isEdit ? 'Uložit změny' : 'Vytvořit'}
                            </button>
                        ` : `
                            <button type="button" class="btn btn-primary" onclick="Nemovitosti.edit('${item.id}')">
                                Upravit
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
        }
    }

    function saveForm(type, id) {
        const form = document.getElementById('nemovitost-form');
        const formData = new FormData(form);
        const item = {};
        
        // Převést FormData na objekt
        for (let [key, value] of formData.entries()) {
            item[key] = value;
        }
        
        // Přidat ID
        if (!item.id) {
            item.id = getNextId();
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
        
        // Zpět na seznam
        window.history.back();
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

    function archive(id) {
        if (confirm('Opravdu chcete archivovat tuto nemovitost?')) {
            // TODO: Implementovat archivaci
            alert(`Archivace nemovitosti ID: ${id}`);
        }
    }

    function getItemById(id) {
        return data.nemovitosti.find(n => n.id === id) || {};
    }

    function getPronajimatelList() {
        // Získat seznam pronajímatelů z localStorage
        const pronajimatelData = JSON.parse(localStorage.getItem('pronajimatel_data') || '[]');
        return pronajimatelData;
    }

    // Public API
    return {
        render,
        showAddDialog,
        showForm,
        view,
        edit,
        archive
    };
})();
