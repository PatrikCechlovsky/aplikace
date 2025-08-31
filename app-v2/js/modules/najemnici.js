window.Najemnici = (function() {
    'use strict';

    // Simulovaná data - později nahradíme skutečnou databází
    let data = {
        najemnici: JSON.parse(localStorage.getItem('najemnici_data') || '[]'),
        zastupce: JSON.parse(localStorage.getItem('zastupce_data') || '[]')
    };

    function saveData() {
        localStorage.setItem('najemnici_data', JSON.stringify(data.najemnici));
        localStorage.setItem('zastupce_data', JSON.stringify(data.zastupce));
    }

    function getNextId() {
        const allData = [...data.najemnici, ...data.zastupce];
        const maxId = allData.reduce((max, item) => Math.max(max, parseInt(item.id) || 0), 0);
        return (maxId + 1).toString();
    }

    function render(type = 'all') {
        const mainContent = document.getElementById('main-content');
        
        // Filtrovat data podle typu
        let filteredData = [];
        if (type === 'zastupce') {
            filteredData = data.zastupce.filter(z => z.typ_zastoupeni === 'najemnik');
        } else if (type === 'all') {
            filteredData = data.najemnici;
        } else {
            filteredData = data.najemnici.filter(n => n.typ_subjektu === type);
        }

        // Získat název typu pro zobrazení
        const moduleConfig = APP_CONFIG.modules.find(m => m.id === 'najemnici');
        const typeConfig = moduleConfig.types.find(t => t.id === type);
        const typeName = typeConfig ? typeConfig.name : 'Přehled';

        mainContent.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Nájemníci - ${typeName}</h1>
                <button class="btn btn-primary" onclick="Najemnici.showAddDialog('${type}')">
                    <span class="btn-icon">+</span>
                    <span class="btn-text">Přidat ${type === 'zastupce' ? 'zástupce' : 'nájemníka'}</span>
                </button>
            </div>

            <div class="card">
                ${filteredData.length === 0 ? 
                    `<div class="empty-state">
                        <div class="empty-state-icon">📁</div>
                        <p class="empty-state-text">Zatím nejsou žádní ${type === 'zastupce' ? 'zástupci' : 'nájemníci'} typu "${typeName}"</p>
                        <button class="btn btn-primary" onclick="Najemnici.showAddDialog('${type}')">
                            Přidat prvního ${type === 'zastupce' ? 'zástupce' : 'nájemníka'}
                        </button>
                    </div>` :
                    `<div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Název/Jméno</th>
                                    <th>Typ</th>
                                    <th>IČO</th>
                                    <th>Telefon</th>
                                    <th>Email</th>
                                    <th>Město</th>
                                    <th>Akce</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredData.map(item => `
                                    <tr>
                                        <td>${item.id}</td>
                                        <td>${item.nazev || `${item.jmeno || ''} ${item.prijmeni || ''}`}</td>
                                        <td><span class="badge badge-${item.typ_subjektu}">${getTypeName(item.typ_subjektu)}</span></td>
                                        <td>${item.ico || '-'}</td>
                                        <td>${item.telefon || '-'}</td>
                                        <td>${item.email || '-'}</td>
                                        <td>${item.mesto || '-'}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn btn-sm btn-icon" onclick="Najemnici.view('${item.id}')" title="Zobrazit">
                                                    👁️
                                                </button>
                                                <button class="btn btn-sm btn-icon" onclick="Najemnici.archive('${item.id}')" title="Archivovat">
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
                <h1 class="page-title">Vyberte typ nájemníka</h1>
            </div>
            
            <div class="type-selector">
                <div class="type-cards">
                    <div class="type-card" onclick="Najemnici.showForm('osoba')">
                        <div class="type-card-icon">👤</div>
                        <h3 class="type-card-title">Fyzická osoba</h3>
                        <p class="type-card-description">Jednotlivec jako nájemník</p>
                    </div>
                    <div class="type-card" onclick="Najemnici.showForm('osvc')">
                        <div class="type-card-icon">🧑‍💼</div>
                        <h3 class="type-card-title">OSVČ</h3>
                        <p class="type-card-description">Osoba samostatně výdělečně činná</p>
                    </div>
                    <div class="type-card" onclick="Najemnici.showForm('firma')">
                        <div class="type-card-icon">🏢</div>
                        <h3 class="type-card-title">Firma</h3>
                        <p class="type-card-description">Společnost s ručením omezeným, a.s., atd.</p>
                    </div>
                    <div class="type-card" onclick="Najemnici.showForm('spolek')">
                        <div class="type-card-icon">🫂</div>
                        <h3 class="type-card-title">Spolek/Skupina</h3>
                        <p class="type-card-description">Nezisková organizace, spolek</p>
                    </div>
                    <div class="type-card" onclick="Najemnici.showForm('stat')">
                        <div class="type-card-icon">🏛️</div>
                        <h3 class="type-card-title">Státní instituce</h3>
                        <p class="type-card-description">Státní nebo městská organizace</p>
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn btn-secondary" onclick="window.history.back()">Zpět</button>
                </div>
            </div>
        `;
    }

    function showForm(type, id = null) {
        const mainContent = document.getElementById('main-content');
        const isEdit = id !== null;
        const data = isEdit ? getItemById(id) : {};
        
        let formHtml = '';
        
        if (type === 'zastupce') {
            formHtml = getZastupceForm(data, isEdit);
        } else {
            formHtml = getNajemnikForm(type, data, isEdit);
        }
        
        mainContent.innerHTML = formHtml;
        
        // Přidat event listener pro formulář
        const form = document.getElementById('najemnik-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveForm(type, id);
        });
    }

    function getNajemnikForm(type, data, isEdit) {
        const title = isEdit ? 'Upravit nájemníka' : 'Nový nájemník';
        
        // Společná pole pro všechny typy
        let commonFields = `
            <input type="hidden" name="id" value="${data.id || ''}">
            <input type="hidden" name="typ_subjektu" value="${type}">
            <input type="hidden" name="role" value="najemnik">
        `;
        
        // Specifická pole podle typu
        let specificFields = '';
        
        switch(type) {
            case 'osoba':
                specificFields = getOsobaFields(data);
                break;
            case 'osvc':
                specificFields = getOsvcFields(data);
                break;
            case 'firma':
            case 'stat':
                specificFields = getFirmaFields(data);
                break;
            case 'spolek':
                specificFields = getSpolekFields(data);
                break;
        }
        
        return `
            <div class="page-header">
                <h1 class="page-title">${title} - ${getTypeName(type)}</h1>
            </div>
            
            <div class="card">
                <form id="najemnik-form" class="form">
                    <div class="form-body">
                        ${commonFields}
                        ${specificFields}
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="window.history.back()">
                            Zrušit
                        </button>
                        <button type="submit" class="btn btn-primary">
                            ${isEdit ? 'Uložit změny' : 'Vytvořit'}
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    // Pole pro osobu (podle Sešit3)
    function getOsobaFields(data) {
        return `
            <div class="form-group-header">Oprávnění</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label required">Typ oprávnění</label>
                        <div class="form-control-wrapper">
                            <select name="typ_opravneni" class="form-control" required>
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
            </div>
            
            <div class="form-group-header">Osobní údaje</div>
            
            <div class="form-row">
                <div class="form-col-2">
                    <div class="form-field">
                        <label class="form-label">Titul</label>
                        <input type="text" name="titul" class="form-control" value="${data.titul || ''}">
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label required">Jméno</label>
                        <input type="text" name="jmeno" class="form-control" value="${data.jmeno || ''}" required>
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label required">Příjmení</label>
                        <input type="text" name="prijmeni" class="form-control" value="${data.prijmeni || ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label required">Datum narození</label>
                        <input type="date" name="datum_narozeni" class="form-control" value="${data.datum_narozeni || ''}" required>
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label required">Typ dokladu totožnosti</label>
                        <div class="form-control-wrapper">
                            <select name="typ_dokladu" class="form-control" required>
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
                        <label class="form-label required">Číslo dokladu totožnosti</label>
                        <input type="text" name="cislo_dokladu" class="form-control" value="${data.cislo_dokladu || ''}" required>
                    </div>
                </div>
            </div>
            
            ${getContactFields(data)}
            ${getBankFields(data)}
            ${getLoginFields(data)}
            ${getZastupenyField(data)}
        `;
    }

    // Pole pro OSVČ (podle Sešit3)
    function getOsvcFields(data) {
        return `
            <div class="form-group-header">Oprávnění</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label required">Typ oprávnění</label>
                        <div class="form-control-wrapper">
                            <select name="typ_opravneni" class="form-control" required>
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
            </div>
            
            <div class="form-group-header">Osobní údaje</div>
            
            <div class="form-row">
                <div class="form-col-2">
                    <div class="form-field">
                        <label class="form-label">Titul</label>
                        <input type="text" name="titul" class="form-control" value="${data.titul || ''}">
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label required">Jméno</label>
                        <input type="text" name="jmeno" class="form-control" value="${data.jmeno || ''}" required>
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label required">Příjmení</label>
                        <input type="text" name="prijmeni" class="form-control" value="${data.prijmeni || ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label required">IČO</label>
                        <input type="text" name="ico" class="form-control" value="${data.ico || ''}" pattern="[0-9]{8}" required>
                        <span class="form-help">Doplnit z ARES</span>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label required">DIČ</label>
                        <input type="text" name="dic" class="form-control" value="${data.dic || ''}" required>
                    </div>
                </div>
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label required">Datum narození</label>
                        <input type="date" name="datum_narozeni" class="form-control" value="${data.datum_narozeni || ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label required">Typ dokladu totožnosti</label>
                        <div class="form-control-wrapper">
                            <select name="typ_dokladu" class="form-control" required>
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
                        <label class="form-label required">Číslo dokladu totožnosti</label>
                        <input type="text" name="cislo_dokladu" class="form-control" value="${data.cislo_dokladu || ''}" required>
                    </div>
                </div>
            </div>
            
            ${getContactFields(data)}
            ${getBankFields(data)}
            ${getLoginFields(data)}
        `;
    }

    // Pole pro firmu a stát (podle Sešit3)
    function getFirmaFields(data) {
        return `
            <div class="form-group-header">Údaje o firmě</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label required">Název společnosti</label>
                        <input type="text" name="nazev" class="form-control" value="${data.nazev || ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label required">IČO</label>
                        <input type="text" name="ico" class="form-control" value="${data.ico || ''}" pattern="[0-9]{8}" required>
                        <span class="form-help">Doplnit z ARES</span>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label">DIČ</label>
                        <input type="text" name="dic" class="form-control" value="${data.dic || ''}">
                    </div>
                </div>
            </div>
            
            ${getContactFields(data)}
            ${getBankFields(data)}
            ${getZastupceSelect(data, true)}
        `;
    }

    // Pole pro spolek (podle Sešit3)
    function getSpolekFields(data) {
        return `
            <div class="form-group-header">Údaje o spolku/skupině</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label required">Název spolku/skupiny</label>
                        <input type="text" name="nazev" class="form-control" value="${data.nazev || ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label">IČO</label>
                        <input type="text" name="ico" class="form-control" value="${data.ico || ''}" pattern="[0-9]{8}">
                        <span class="form-help">Doplnit z ARES</span>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label">DIČ</label>
                        <input type="text" name="dic" class="form-control" value="${data.dic || ''}">
                    </div>
                </div>
            </div>
            
            ${getContactFields(data)}
            ${getBankFields(data)}
            ${getZastupceSelect(data, true)}
        `;
    }

    function getContactFields(data) {
        return `
            <div class="form-group-header">Kontaktní údaje</div>
            
            <div class="form-row">
                <div class="form-col-3">
                    <div class="form-field">
                        <label class="form-label required">Stát</label>
                        <div class="form-control-wrapper">
                            <select name="stat" class="form-control" required>
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
                        <label class="form-label required">PSČ</label>
                        <input type="text" name="psc" class="form-control" value="${data.psc || ''}" required>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label required">Město</label>
                        <input type="text" name="mesto" class="form-control" value="${data.mesto || ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-8">
                    <div class="form-field">
                        <label class="form-label required">Ulice</label>
                        <input type="text" name="ulice" class="form-control" value="${data.ulice || ''}" required>
                    </div>
                </div>
                <div class="form-col-4">
                    <div class="form-field">
                        <label class="form-label required">Číslo popisné</label>
                        <input type="text" name="cislo_popisne" class="form-control" value="${data.cislo_popisne || ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label required">Telefon</label>
                        <input type="tel" name="telefon" class="form-control" value="${data.telefon || ''}" required>
                        <span class="form-help">Předvolba podle státu s možností změny</span>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label required">Email</label>
                        <input type="email" name="email" class="form-control" value="${data.email || ''}" required>
                    </div>
                </div>
            </div>
        `;
    }

    function getBankFields(data) {
        return `
            <div class="form-group-header">Bankovní údaje</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label required">Číslo účtu / kód banky</label>
                        <input type="text" name="bankovni_ucet" class="form-control" value="${data.bankovni_ucet || ''}" 
                               placeholder="123456789/0800" required>
                        <span class="form-help">Bude obsahovat čísla, pomlčky a lomítka</span>
                    </div>
                </div>
            </div>
        `;
    }

    function getLoginFields(data) {
        return `
            <div class="form-group-header">Přihlašovací údaje</div>
            
            <div class="form-row">
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label required">Přihlašovací jméno</label>
                        <input type="text" name="login" class="form-control" value="${data.login || ''}" required>
                    </div>
                </div>
                <div class="form-col-6">
                    <div class="form-field">
                        <label class="form-label required">Heslo</label>
                        <input type="password" name="heslo" class="form-control" value="${data.heslo || ''}" required>
                    </div>
                </div>
            </div>
        `;
    }

    function getZastupenyField(data) {
        return `
            <div class="form-group-header">Zastoupení</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label">Zastoupený</label>
                        <div class="form-control-wrapper">
                            <select name="zastupce_id" class="form-control">
                                <option value="">Není zastoupený</option>
                                ${getZastupciList().map(z => `
                                    <option value="${z.id}" ${data.zastupce_id === z.id ? 'selected' : ''}>
                                        ${z.jmeno} ${z.prijmeni}
                                    </option>
                                `).join('')}
                            </select>
                            <span class="form-icon">▼</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function getZastupceSelect(data, required = false) {
        const zastupci = getZastupciList();
        
        return `
            <div class="form-group-header">Zástupce</div>
            
            <div class="form-row">
                <div class="form-col-12">
                    <div class="form-field">
                        <label class="form-label ${required ? 'required' : ''}">Zástupce</label>
                        <div class="form-control-wrapper">
                            <select name="zastupce_id" class="form-control" ${required ? 'required' : ''}>
                                <option value="">Bez zástupce</option>
                                ${zastupci.map(z => `
                                    <option value="${z.id}" ${data.zastupce_id === z.id ? 'selected' : ''}>
                                        ${z.jmeno} ${z.prijmeni}
                                    </option>
                                `).join('')}
                            </select>
                            <span class="form-icon">▼</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function getZastupceForm(data, isEdit) {
        const title = isEdit ? 'Upravit zástupce' : 'Nový zástupce';
        
        return `
            <div class="page-header">
                <h1 class="page-title">${title}</h1>
            </div>
            
            <div class="card">
                <form id="najemnik-form" class="form">
                    <div class="form-body">
                        <input type="hidden" name="id" value="${data.id || ''}">
                        <input type="hidden" name="typ_subjektu" value="osoba">
                        <input type="hidden" name="role" value="zastupce">
                        <input type="hidden" name="typ_zastoupeni" value="najemnik">
                        
                        <div class="form-group-header">Oprávnění a zastoupení</div>
                        
                        <div class="form-row">
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label required">Typ oprávnění</label>
                                    <div class="form-control-wrapper">
                                        <select name="typ_opravneni" class="form-control" required>
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
                                    <label class="form-label required">Koho zastupuje</label>
                                    <div class="form-control-wrapper">
                                        <select name="zastupuje_id" class="form-control" required>
                                            <option value="">Vyberte...</option>
                                            ${getNajemniciList().map(n => `
                                                <option value="${n.id}" ${data.zastupuje_id === n.id ? 'selected' : ''}>
                                                    ${n.nazev || `${n.jmeno} ${n.prijmeni}`}
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
                                    <input type="text" name="titul" class="form-control" value="${data.titul || ''}">
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label required">Jméno</label>
                                    <input type="text" name="jmeno" class="form-control" value="${data.jmeno || ''}" required>
                                </div>
                            </div>
                            <div class="form-col-3">
                                <div class="form-field">
                                    <label class="form-label required">Příjmení</label>
                                    <input type="text" name="prijmeni" class="form-control" value="${data.prijmeni || ''}" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label required">Datum narození</label>
                                    <input type="date" name="datum_narozeni" class="form-control" value="${data.datum_narozeni || ''}" required>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label required">Typ dokladu totožnosti</label>
                                    <div class="form-control-wrapper">
                                        <select name="typ_dokladu" class="form-control" required>
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
                                    <label class="form-label required">Číslo dokladu totožnosti</label>
                                    <input type="text" name="cislo_dokladu" class="form-control" value="${data.cislo_dokladu || ''}" required>
                                </div>
                            </div>
                        </div>
                        
                        ${getContactFields(data)}
                        ${getBankFields(data)}
                        ${getLoginFields(data)}
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="window.history.back()">
                            Zrušit
                        </button>
                        <button type="submit" class="btn btn-primary">
                            ${isEdit ? 'Uložit změny' : 'Vytvořit'}
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    // Zbytek funkcí je stejný jako u pronajímatele
    function saveForm(type, id) {
        const form = document.getElementById('najemnik-form');
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
                const index = data.najemnici.findIndex(n => n.id === id);
                if (index !== -1) {
                    data.najemnici[index] = item;
                }
            } else {
                data.najemnici.push(item);
            }
        }
        
        // Uložit do localStorage
        saveData();
        
        // Zpět na seznam
        window.history.back();
    }

    function getItemById(id) {
        return data.najemnici.find(n => n.id === id) || 
               data.zastupce.find(z => z.id === id) || 
               {};
    }

    function getNajemniciList() {
        return data.najemnici;
    }

    function getZastupciList() {
        return data.zastupce.filter(z => z.typ_zastoupeni === 'najemnik');
    }

    function view(id) {
        const item = getItemById(id);
        if (!item) return;
        
        // TODO: Implementovat detailní zobrazení
        alert(`Zobrazení detailu pro ID: ${id}\n${JSON.stringify(item, null, 2)}`);
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
        archive
    };
})();
