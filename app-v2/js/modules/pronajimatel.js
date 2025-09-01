window.Pronajimatel = (function() {
    'use strict';

    // Simulovaná data - později nahradíme skutečnou databází
    let data = {
        pronajimatel: JSON.parse(localStorage.getItem('pronajimatel_data') || '[]'),
        zastupce: JSON.parse(localStorage.getItem('zastupce_data') || '[]')
    };

    function saveData() {
        localStorage.setItem('pronajimatel_data', JSON.stringify(data.pronajimatel));
        localStorage.setItem('zastupce_data', JSON.stringify(data.zastupce));
    }

    function getNextId() {
        const allData = [...data.pronajimatel, ...data.zastupce];
        const maxId = allData.reduce((max, item) => Math.max(max, parseInt(item.id) || 0), 0);
        return (maxId + 1).toString();
    }

    function render(type = 'all') {
        const mainContent = document.getElementById('main-content');
        
        // Filtrovat data podle typu
        let filteredData = [];
        if (type === 'zastupce') {
            filteredData = data.zastupce.filter(z => z.typ_zastoupeni === 'pronajimatel');
        } else if (type === 'all') {
            filteredData = data.pronajimatel;
        } else {
            filteredData = data.pronajimatel.filter(p => p.typ_subjektu === type);
        }

        // Získat název a ikonu typu pro zobrazení
        const moduleConfig = APP_CONFIG.modules.find(m => m.id === 'pronajimatel');
        const typeConfig = moduleConfig.types.find(t => t.id === type);
        const typeName = typeConfig ? typeConfig.name : 'Přehled';
        const typeIcon = typeConfig ? typeConfig.icon : '📊';

        mainContent.innerHTML = `
            <div class="page-header">
                <div class="page-title-wrapper">
                    <h1 class="page-title">
                        <span class="module-icon">${moduleConfig.icon}</span>
                        Pronajímatel - 
                        <span class="type-icon">${typeIcon}</span>
                        ${typeName}
                    </h1>
                </div>
                <div class="page-actions">
                    <button class="btn btn-primary" onclick="Pronajimatel.showAddDialog('${type}')">
                        <span class="btn-icon">+</span>
                        <span class="btn-text">Přidat ${type === 'zastupce' ? 'zástupce' : 'pronajímatele'}</span>
                    </button>
                </div>
            </div>

            <div class="card">
                ${filteredData.length === 0 ? 
                    `<div class="empty-state">
                        <div class="empty-state-icon">📁</div>
                        <p class="empty-state-text">Zatím nejsou žádní ${type === 'zastupce' ? 'zástupci' : 'pronajímatelé'} typu "${typeName}"</p>
                        <button class="btn btn-primary" onclick="Pronajimatel.showAddDialog('${type}')">
                            Přidat prvního ${type === 'zastupce' ? 'zástupce' : 'pronajímatele'}
                        </button>
                    </div>` :
                    `<div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width: 60px;">ID</th>
                                    <th style="width: 200px;">Název/Jméno</th>
                                    <th style="width: 100px;">Typ</th>
                                    <th style="width: 100px;">IČO</th>
                                    <th style="width: 150px;">Telefon</th>
                                    <th style="width: 250px;">Email</th>
                                    <th style="width: 150px;">Město</th>
                                    <th style="width: 100px;">Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(item => `
                                    <tr>
                                        <td>${item.id}</td>
                                        <td class="text-truncate">${item.nazev || `${item.jmeno || ''} ${item.prijmeni || ''}`}</td>
                                        <td><span class="badge badge-${item.typ_subjektu}">${getTypeName(item.typ_subjektu)}</span></td>
                                        <td>${item.ico || '-'}</td>
                                        <td class="text-truncate">${item.telefon || '-'}</td>
                                        <td class="text-truncate">${item.email || '-'}</td>
                                        <td class="text-truncate">${item.mesto || '-'}</td>
                                        <td>
                                            <div class="btn-group">
                                              <button class="btn-icon btn-view" onclick="Pronajimatel.view('${item.id}')" title="Zobrazit">
                                                        👁️
                                                </button>
                                                <button class="btn-icon btn-edit" onclick="Pronajimatel.edit('${item.id}')" title="Upravit">
                                                        ✏️
                                                </button>
                                                <button class="btn-icon btn-archive" onclick="Pronajimatel.archive('${item.id}')" title="Archivovat">
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
        const types = {
            'osoba': 'Osoba',
            'osvc': 'OSVČ',
            'firma': 'Firma',
            'spolek': 'Spolek',
            'stat': 'Stát'
        };
        return types[type] || type;
    }

    function view(id) {
        const item = getItemById(id);
        if (!item) return;
        
        // Zobrazit formulář v režimu prohlížení
        showForm(item.typ_subjektu || 'zastupce', id, true);
    }

    function edit(id) {
        const item = getItemById(id);
        if (!item) return;
        
        // Zobrazit formulář v režimu editace
        showForm(item.typ_subjektu || 'zastupce', id, false);
    }

    function showForm(type, id = null, viewOnly = false) {
        const mainContent = document.getElementById('main-content');
        const isEdit = id !== null && !viewOnly;
        const isView = viewOnly;
        const data = id ? getItemById(id) : {};
        
        let formHtml = '';
        
        if (type === 'zastupce' || data.role === 'zastupce') {
            formHtml = getZastupceForm(data, isEdit, isView);
        } else {
            formHtml = getPronajimatelForm(type, data, isEdit, isView);
        }
        
        mainContent.innerHTML = formHtml;
        
        // Přidat event listener pro formulář pouze pokud není v režimu prohlížení
        if (!isView) {
            const form = document.getElementById('pronajimatel-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                saveForm(type, id);
            });
        }
    }

    function getPronajimatelForm(type, data, isEdit, isView = false) {
        let title = 'Nový pronajímatel';
        if (isView) {
            title = 'Detail pronajímatele';
        } else if (isEdit) {
            title = 'Upravit pronajímatele';
        }
        
        // Společná pole pro všechny typy
        let commonFields = `
            <input type="hidden" name="id" value="${data.id || ''}">
            <input type="hidden" name="typ_subjektu" value="${type}">
            <input type="hidden" name="role" value="pronajimatel">
        `;
        
        // Specifická pole podle typu
        let specificFields = '';
        
        switch(type) {
            case 'osoba':
                specificFields = getOsobaFields(data, isView);
                break;
            case 'osvc':
                specificFields = getOsvcFields(data, isView);
                break;
            case 'firma':
            case 'stat':
                specificFields = getFirmaFields(data, isView);
                break;
            case 'spolek':
                specificFields = getSpolekFields(data, isView);
                break;
        }
        
        return `
            <div class="page-header">
                <h1 class="page-title">${title} - ${getTypeName(type)}</h1>
            </div>
            
            <div class="card">
                <form id="pronajimatel-form" class="form">
                    <div class="form-body">
                        ${commonFields}
                        ${specificFields}
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
                            <button type="button" class="btn btn-primary" onclick="Pronajimatel.edit('${data.id}')">
                                Upravit
                            </button>
                        `}
                    </div>
                </form>
            </div>
        `;
    }

    function showAddDialog(preselectedType = 'all') {
        const mainContent = document.getElementById('main-content');
        
        if (preselectedType === 'zastupce') {
            // Přímo zobrazit formulář pro zástupce
            showForm('zastupce', null);
            return;
        }
        
        if (preselectedType !== 'all') {
            // Přímo zobrazit formulář pro konkrétní typ
            showForm(preselectedType, null);
            return;
        }
    
        // Zobrazit výběr typu
        mainContent.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">
                    <span class="module-icon">🏠</span>
                    Vyberte typ pronajímatele
                </h1>
            </div>
            
            <div class="type-selector">
                <div class="type-cards">
                    <div class="type-card" onclick="Pronajimatel.showForm('osoba')">
                        <div class="type-card-icon">👤</div>
                        <h3 class="type-card-title">Fyzická osoba</h3>
                        <p class="type-card-description">Jednotlivec jako pronajímatel</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('osvc')">
                        <div class="type-card-icon">🧑‍💼</div>
                        <h3 class="type-card-title">OSVČ</h3>
                        <p class="type-card-description">Osoba samostatně výdělečně činná</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('firma')">
                        <div class="type-card-icon">🏢</div>
                        <h3 class="type-card-title">Firma</h3>
                        <p class="type-card-description">Společnost s ručením omezeným, a.s., atd.</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('spolek')">
                        <div class="type-card-icon">🫂</div>
                        <h3 class="type-card-title">Spolek/Skupina</h3>
                        <p class="type-card-description">Nezisková organizace, spolek</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('stat')">
                        <div class="type-card-icon">🏛️</div>
                        <h3 class="type-card-title">Státní instituce</h3>
                        <p class="type-card-description">Státní nebo městská organizace</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('zastupce')">
                        <div class="type-card-icon">🤝</div>
                        <h3 class="type-card-title">Zastupující osoba</h3>
                        <p class="type-card-description">Osoba zastupující pronajímatele</p>
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

    // Pole pro osobu
    function getOsobaFields(data, isView = false) {
        const disabled = isView ? 'disabled' : '';
        const required = isView ? '' : 'required';
        
        return `
            <div class="form-group-header">Osobní údaje</div>
            
            <div class="form-row">
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label">Titul před</label>
                        <input type="text" name="titul_pred" class="form-control" value="${data.titul_pred || ''}" ${disabled}>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Jméno</label>
                        <input type="text" name="jmeno" class="form-control" value="${data.jmeno || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Příjmení</label>
                        <input type="text" name="prijmeni" class="form-control" value="${data.prijmeni || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label">Titul za</label>
                        <input type="text" name="titul_za" class="form-control" value="${data.titul_za || ''}" ${disabled}>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Datum narození</label>
                        <input type="date" name="datum_narozeni" class="form-control" value="${data.datum_narozeni || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Typ dokladu totožnosti</label>
                        <div class="form-control-wrapper">
                            <select name="typ_dokladu" class="form-control" ${required} ${disabled}>
                                <option value="">Vyberte...</option>
                                <option value="op" ${data.typ_dokladu === 'op' ? 'selected' : ''}>Občanský průkaz</option>
                                <option value="pas" ${data.typ_dokladu === 'pas' ? 'selected' : ''}>Pas</option>
                                <option value="rp" ${data.typ_dokladu === 'rp' ? 'selected' : ''}>Řidičský průkaz</option>
                            </select>
                            <span class="form-icon">▼</span>
                        </div>
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Číslo dokladu totožnosti</label>
                        <input type="text" name="cislo_dokladu" class="form-control" value="${data.cislo_dokladu || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
            
            ${getContactFields(data, isView)}
            ${getBankFields(data, isView)}
            ${getLoginFields(data, isView)}
            ${getZastupceSelect(data, false, isView)}
        `;
    }

    // Pole pro OSVČ
    function getOsvcFields(data, isView = false) {
        const disabled = isView ? 'disabled' : '';
        const required = isView ? '' : 'required';
        
        return `
            <div class="form-group-header">Osobní údaje</div>
            
            <div class="form-row">
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label">Titul před</label>
                        <input type="text" name="titul_pred" class="form-control" value="${data.titul_pred || ''}" ${disabled}>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Jméno</label>
                        <input type="text" name="jmeno" class="form-control" value="${data.jmeno || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Příjmení</label>
                        <input type="text" name="prijmeni" class="form-control" value="${data.prijmeni || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label">Titul za</label>
                        <input type="text" name="titul_za" class="form-control" value="${data.titul_za || ''}" ${disabled}>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">IČO</label>
                        <input type="text" name="ico" class="form-control" value="${data.ico || ''}" pattern="[0-9]{8}" ${required} ${disabled}>
                        <span class="form-help">Doplnit z ARES</span>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">DIČ</label>
                        <input type="text" name="dic" class="form-control" value="${data.dic || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Datum narození</label>
                        <input type="date" name="datum_narozeni" class="form-control" value="${data.datum_narozeni || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Typ dokladu totožnosti</label>
                        <div class="form-control-wrapper">
                            <select name="typ_dokladu" class="form-control" ${required} ${disabled}>
                                <option value="">Vyberte...</option>
                                <option value="op" ${data.typ_dokladu === 'op' ? 'selected' : ''}>Občanský průkaz</option>
                                <option value="pas" ${data.typ_dokladu === 'pas' ? 'selected' : ''}>Pas</option>
                                <option value="rp" ${data.typ_dokladu === 'rp' ? 'selected' : ''}>Řidičský průkaz</option>
                            </select>
                            <span class="form-icon">▼</span>
                        </div>
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Číslo dokladu totožnosti</label>
                        <input type="text" name="cislo_dokladu" class="form-control" value="${data.cislo_dokladu || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
            
            ${getContactFields(data, isView)}
            ${getBankFields(data, isView)}
            ${getLoginFields(data, isView)}
            ${getZastupceSelect(data, false, isView)}
        `;
    }

    // Pole pro firmu
    function getFirmaFields(data, isView = false) {
        const disabled = isView ? 'disabled' : '';
        const required = isView ? '' : 'required';
        
        return `
            <div class="form-group-header">Údaje o firmě</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Název společnosti</label>
                        <input type="text" name="nazev" class="form-control" value="${data.nazev || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">IČO</label>
                        <input type="text" name="ico" class="form-control" value="${data.ico || ''}" pattern="[0-9]{8}" ${required} ${disabled}>
                        <span class="form-help">Doplnit z ARES</span>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label">DIČ</label>
                        <input type="text" name="dic" class="form-control" value="${data.dic || ''}" ${disabled}>
                    </div>
                </div>
            </div>
            
            ${getContactFields(data, isView)}
            ${getBankFields(data, isView)}
            ${getZastupceSelect(data, true, isView)}
        `;
    }

    // Pole pro spolek
    function getSpolekFields(data, isView = false) {
        const disabled = isView ? 'disabled' : '';
        const required = isView ? '' : 'required';
        
        return `
            <div class="form-group-header">Údaje o spolku/skupině</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Název spolku/skupiny</label>
                        <input type="text" name="nazev" class="form-control" value="${data.nazev || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label">IČO</label>
                        <input type="text" name="ico" class="form-control" value="${data.ico || ''}" pattern="[0-9]{8}" ${disabled}>
                        <span class="form-help">Je možné ostatní doplnit z ARES?</span>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label">DIČ</label>
                        <input type="text" name="dic" class="form-control" value="${data.dic || ''}" ${disabled}>
                    </div>
                </div>
            </div>
            
            ${getContactFields(data, isView)}
            ${getBankFields(data, isView)}
            ${getZastupceSelect(data, true, isView)}
        `;
    }

    // Kontaktní pole
    function getContactFields(data, isView = false) {
        const disabled = isView ? 'disabled' : '';
        const required = isView ? '' : 'required';
        
        return `
            <div class="form-group-header">Kontaktní údaje</div>
            
            <div class="form-row">
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Stát</label>
                        <div class="form-control-wrapper">
                            <select name="stat" class="form-control" ${required} ${disabled}>
                                <option value="CZ" ${data.stat === 'CZ' ? 'selected' : ''}>Česká republika</option>
                                <option value="SK" ${data.stat === 'SK' ? 'selected' : ''}>Slovensko</option>
                                <option value="AT" ${data.stat === 'AT' ? 'selected' : ''}>Rakousko</option>
                                <option value="DE" ${data.stat === 'DE' ? 'selected' : ''}>Německo</option>
                                <option value="PL" ${data.stat === 'PL' ? 'selected' : ''}>Polsko</option>
                            </select>
                            <span class="form-icon">▼</span>
                        </div>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">PSČ</label>
                        <input type="text" name="psc" class="form-control" value="${data.psc || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Město</label>
                        <input type="text" name="mesto" class="form-control" value="${data.mesto || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-8">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Ulice</label>
                        <input type="text" name="ulice" class="form-control" value="${data.ulice || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Číslo popisné</label>
                        <input type="text" name="cislo_popisne" class="form-control" value="${data.cislo_popisne || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Telefon</label>
                        <input type="tel" name="telefon" class="form-control" value="${data.telefon || ''}" ${required} ${disabled}>
                        <span class="form-help">Předvolba podle státu s možností změny</span>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Email</label>
                        <input type="email" name="email" class="form-control" value="${data.email || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
        `;
    }

    // Bankovní pole
    function getBankFields(data, isView = false) {
        const disabled = isView ? 'disabled' : '';
        const required = isView ? '' : 'required';
        
        return `
            <div class="form-group-header">Bankovní údaje</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Číslo účtu / kód banky</label>
                        <input type="text" name="bankovni_ucet" class="form-control" value="${data.bankovni_ucet || ''}" 
                               placeholder="123456789/0800" ${required} ${disabled}>
                        <span class="form-help">Bude obsahovat čísla, pomlčky a lomítka</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Přihlašovací pole
    function getLoginFields(data, isView = false) {
        const disabled = isView ? 'disabled' : '';
        const required = isView ? '' : 'required';
        
        return `
            <div class="form-group-header">Přihlašovací údaje</div>
            
            <div class="form-row">
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Přihlašovací jméno</label>
                        <input type="text" name="login" class="form-control" value="${data.login || ''}" ${required} ${disabled}>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label ${!isView ? 'required' : ''}">Heslo</label>
                        <input type="${isView ? 'text' : 'password'}" name="heslo" class="form-control" value="${data.heslo || ''}" ${required} ${disabled}>
                    </div>
                </div>
            </div>
        `;
    }

    // Výběr zástupce
    function getZastupceSelect(data, required = false, isView = false) {
        const zastupci = getZastupciList();
        const disabled = isView ? 'disabled' : '';
        const req = isView ? '' : (required ? 'required' : '');
        
        return `
            <div class="form-group-header">Zástupce</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label ${!isView && required ? 'required' : ''}">Zástupce</label>
                        <div class="form-control-wrapper">
                            <select name="zastupce_id" class="form-control" ${req} ${disabled}>
                                <option value="">Bez zástupce</option>
                                ${zastupci.map(z => `
                                    <option value="${z.id}" ${data.zastupce_id === z.id ? 'selected' : ''}>
                                        ${z.jmeno} ${z.prijmeni}
                                    </option>
                                `).join('')}
                            </select>
                            <span class="form-icon">▼</span>
                        </div>
                        <span class="form-help">Seznam z osob zastupujících</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Formulář pro zástupce
    function getZastupceForm(data, isEdit, isView = false) {
        let title = 'Nový zástupce';
        if (isView) {
            title = 'Detail zástupce';
        } else if (isEdit) {
            title = 'Upravit zástupce';
        }
        
        const disabled = isView ? 'disabled' : '';
        const required = isView ? '' : 'required';
        
        return `
            <div class="page-header">
                <h1 class="page-title">${title}</h1>
            </div>
            
            <div class="card">
                <form id="pronajimatel-form" class="form">
                    <div class="form-body">
                        <input type="hidden" name="id" value="${data.id || ''}">
                        <input type="hidden" name="typ_subjektu" value="osoba">
                        <input type="hidden" name="role" value="zastupce">
                        <input type="hidden" name="typ_zastoupeni" value="pronajimatel">
                        
                        <div class="form-group-header">Oprávnění a zastoupení</div>
                        
                        <div class="form-row">
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Typ oprávnění</label>
                                    <div class="form-control-wrapper">
                                        <select name="typ_opravneni" class="form-control" ${required} ${disabled}>
                                            <option value="cteni_vybranych" ${data.typ_opravneni === 'cteni_vybranych' ? 'selected' : ''}>
                                                Čtení vybraných informací
                                            </option>
                                            <option value="cteni_vsech" ${data.typ_opravneni === 'cteni_vsech' ? 'selected' : ''}>
                                                Čtení všech informací
                                            </option>
                                            <option value="uprava_vsech" ${data.typ_opravneni === 'uprava_vsech' ? 'selected' : ''}>
                                                Úprava všech informací
                                            </option>
                                        </select>
                                        <span class="form-icon">▼</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Koho zastupuje</label>
                                    <div class="form-control-wrapper">
                                        <select name="zastupuje_id" class="form-control" ${required} ${disabled}>
                                            <option value="">Vyberte...</option>
                                            ${getPronajimatelList().map(p => `
                                                <option value="${p.id}" ${data.zastupuje_id === p.id ? 'selected' : ''}>
                                                    ${p.nazev || `${p.jmeno} ${p.prijmeni}`}
                                                </option>
                                            `).join('')}
                                        </select>
                                        <span class="form-icon">▼</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group-header">Osobní údaje</div>
                        
                        <div class="form-row">
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label">Titul</label>
                                    <input type="text" name="titul" class="form-control" value="${data.titul || ''}" ${disabled}>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Jméno</label>
                                    <input type="text" name="jmeno" class="form-control" value="${data.jmeno || ''}" ${required} ${disabled}>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Příjmení</label>
                                    <input type="text" name="prijmeni" class="form-control" value="${data.prijmeni || ''}" ${required} ${disabled}>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Datum narození</label>
                                    <input type="date" name="datum_narozeni" class="form-control" value="${data.datum_narozeni || ''}" ${required} ${disabled}>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Typ dokladu totožnosti</label>
                                    <div class="form-control-wrapper">
                                        <select name="typ_dokladu" class="form-control" ${required} ${disabled}>
                                            <option value="">Vyberte...</option>
                                            <option value="op" ${data.typ_dokladu === 'op' ? 'selected' : ''}>Občanský průkaz</option>
                                            <option value="pas" ${data.typ_dokladu === 'pas' ? 'selected' : ''}>Pas</option>
                                            <option value="rp" ${data.typ_dokladu === 'rp' ? 'selected' : ''}>Řidičský průkaz</option>
                                        </select>
                                        <span class="form-icon">▼</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label ${!isView ? 'required' : ''}">Číslo dokladu totožnosti</label>
                                    <input type="text" name="cislo_dokladu" class="form-control" value="${data.cislo_dokladu || ''}" ${required} ${disabled}>
                                </div>
                            </div>
                        </div>
                        
                        ${getContactFields(data, isView)}
                        ${getBankFields(data, isView)}
                        ${getLoginFields(data, isView)}
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
                            <button type="button" class="btn btn-primary" onclick="Pronajimatel.edit('${data.id}')">
                                Upravit
                            </button>
                        `}
                    </div>
                </form>
            </div>
        `;
    }

    // Uložení formuláře
    function saveForm(type, id) {
        const form = document.getElementById('pronajimatel-form');
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
        
        // Uložit do správného pole
        if (type === 'zastupce') {
            if (id) {
                const index = data.zastupce.findIndex(z => z.id === id);
                if (index !== -1) {
                    data.zastupce[index] = item;
                }
            } else {
                data.zastupce.push(item);
            }
        } else {
            if (id) {
                const index = data.pronajimatel.findIndex(p => p.id === id);
                if (index !== -1) {
                    data.pronajimatel[index] = item;
                }
            } else {
                data.pronajimatel.push(item);
            }
        }
        
        // Uložit do localStorage
        saveData();
        
        // Zpět na seznam
        window.history.back();
    }

    // Pomocné funkce
    function getItemById(id) {
        return data.pronajimatel.find(p => p.id === id) || 
               data.zastupce.find(z => z.id === id) || 
               {};
    }

    function getPronajimatelList() {
        return data.pronajimatel;
    }

    function getZastupciList() {
        return data.zastupce.filter(z => z.typ_zastoupeni === 'pronajimatel');
    }

    function archive(id) {
        if (confirm('Opravdu chcete archivovat tento záznam?')) {
            // TODO: Implementovat archivaci
            alert(`Archivace záznamu ID: ${id}`);
        }
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
