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

        // Získat název typu pro zobrazení
        const moduleConfig = APP_CONFIG.modules.find(m => m.id === 'pronajimatel');
        const typeConfig = moduleConfig.types.find(t => t.id === type);
        const typeName = typeConfig ? typeConfig.name : 'Přehled';

        mainContent.innerHTML = `
            <div class="module-header">
                <h1>Pronajímatel - ${typeName}</h1>
                <button class="btn btn-primary" onclick="Pronajimatel.showAddDialog('${type}')">
                    <span class="icon">+</span> Přidat ${type === 'zastupce' ? 'zástupce' : 'pronajímatele'}
                </button>
            </div>

            <div class="data-table-container">
                ${filteredData.length === 0 ? 
                    `<div class="empty-state">
                        <p>Zatím nejsou žádní ${type === 'zastupce' ? 'zástupci' : 'pronajímatelé'} typu "${typeName}"</p>
                        <button class="btn btn-primary" onclick="Pronajimatel.showAddDialog('${type}')">
                            Přidat prvního ${type === 'zastupce' ? 'zástupce' : 'pronajímatele'}
                        </button>
                    </div>` :
                    `<table class="data-table">
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
                                    <td class="actions">
                                        <button class="btn btn-sm btn-info" onclick="Pronajimatel.view('${item.id}')" title="Zobrazit">
                                            <span class="icon">👁️</span>
                                        </button>
                                        <button class="btn btn-sm btn-warning" onclick="Pronajimatel.archive('${item.id}')" title="Archivovat">
                                            <span class="icon">📁</span>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>`
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
            <div class="type-selector">
                <h2>Vyberte typ pronajímatele</h2>
                <div class="type-cards">
                    <div class="type-card" onclick="Pronajimatel.showForm('osoba')">
                        <span class="icon">👤</span>
                        <h3>Fyzická osoba</h3>
                        <p>Jednotlivec jako pronajímatel</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('osvc')">
                        <span class="icon">🧑‍💼</span>
                        <h3>OSVČ</h3>
                        <p>Osoba samostatně výdělečně činná</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('firma')">
                        <span class="icon">🏢</span>
                        <h3>Firma</h3>
                        <p>Společnost s ručením omezeným, a.s., atd.</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('spolek')">
                        <span class="icon">🫂</span>
                        <h3>Spolek/Skupina</h3>
                        <p>Nezisková organizace, spolek</p>
                    </div>
                    <div class="type-card" onclick="Pronajimatel.showForm('stat')">
                        <span class="icon">🏛️</span>
                        <h3>Státní instituce</h3>
                        <p>Státní nebo městská organizace</p>
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="window.history.back()">Zpět</button>
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
            formHtml = getPronajimatelForm(type, data, isEdit);
        }
        
        mainContent.innerHTML = formHtml;
        
        // Přidat event listener pro formulář
        const form = document.getElementById('pronajimatel-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            saveForm(type, id);
        });
    }

    function getPronajimatelForm(type, data, isEdit) {
        const title = isEdit ? 'Upravit pronajímatele' : 'Nový pronajímatel';
        
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
            <div class="form-container">
                <div class="form-header">
                    <h2>${title} - ${getTypeName(type)}</h2>
                    <button type="button" class="btn-close" onclick="window.history.back()">×</button>
                </div>
                
                <form id="pronajimatel-form" class="modern-form">
                    ${commonFields}
                    ${specificFields}
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            ${isEdit ? 'Uložit změny' : 'Vytvořit'}
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="window.history.back()">
                            Zrušit
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    function getOsobaFields(data) {
        return `
            <div class="form-section">
                <h3>Osobní údaje</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Titul před</label>
                        <input type="text" name="titul_pred" value="${data.titul_pred || ''}">
                    </div>
                    <div class="form-group">
                        <label>Jméno *</label>
                        <input type="text" name="jmeno" value="${data.jmeno || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Příjmení *</label>
                        <input type="text" name="prijmeni" value="${data.prijmeni || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Titul za</label>
                        <input type="text" name="titul_za" value="${data.titul_za || ''}">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Datum narození *</label>
                        <input type="date" name="datum_narozeni" value="${data.datum_narozeni || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Typ dokladu totožnosti *</label>
                        <select name="typ_dokladu" required>
                            <option value="">Vyberte...</option>
                            <option value="op" ${data.typ_dokladu === 'op' ? 'selected' : ''}>Občanský průkaz</option>
                            <option value="pas" ${data.typ_dokladu === 'pas' ? 'selected' : ''}>Pas</option>
                            <option value="rp" ${data.typ_dokladu === 'rp' ? 'selected' : ''}>Řidičský průkaz</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Číslo dokladu totožnosti *</label>
                        <input type="text" name="cislo_dokladu" value="${data.cislo_dokladu || ''}" required>
                    </div>
                </div>
            </div>
            
            ${getContactFields(data)}
            ${getBankFields(data)}
            ${getLoginFields(data)}
            ${getZastupceSelect(data)}
        `;
    }

    function getOsvcFields(data) {
        return `
            <div class="form-section">
                <h3>Osobní údaje</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Titul před</label>
                        <input type="text" name="titul_pred" value="${data.titul_pred || ''}">
                    </div>
                    <div class="form-group">
                        <label>Jméno *</label>
                        <input type="text" name="jmeno" value="${data.jmeno || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Příjmení *</label>
                        <input type="text" name="prijmeni" value="${data.prijmeni || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Titul za</label>
                        <input type="text" name="titul_za" value="${data.titul_za || ''}">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>IČO *</label>
                        <input type="text" name="ico" value="${data.ico || ''}" pattern="[0-9]{8}" required>
                    </div>
                    <div class="form-group">
                        <label>DIČ</label>
                        <input type="text" name="dic" value="${data.dic || ''}">
                    </div>
                    <div class="form-group">
                        <label>Datum narození *</label>
                        <input type="date" name="datum_narozeni" value="${data.datum_narozeni || ''}" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Typ dokladu totožnosti *</label>
                        <select name="typ_dokladu" required>
                            <option value="">Vyberte...</option>
                            <option value="op" ${data.typ_dokladu === 'op' ? 'selected' : ''}>Občanský průkaz</option>
                            <option value="pas" ${data.typ_dokladu === 'pas' ? 'selected' : ''}>Pas</option>
                            <option value="rp" ${data.typ_dokladu === 'rp' ? 'selected' : ''}>Řidičský průkaz</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Číslo dokladu totožnosti *</label>
                        <input type="text" name="cislo_dokladu" value="${data.cislo_dokladu || ''}" required>
                    </div>
                </div>
            </div>
            
            ${getContactFields(data)}
            ${getBankFields(data)}
            ${getLoginFields(data)}
            ${getZastupceSelect(data)}
        `;
    }

    function getFirmaFields(data) {
        return `
            <div class="form-section">
                <h3>Údaje o firmě</h3>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label>Název společnosti *</label>
                        <input type="text" name="nazev" value="${data.nazev || ''}" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>IČO *</label>
                        <input type="text" name="ico" value="${data.ico || ''}" pattern="[0-9]{8}" required>
                    </div>
                    <div class="form-group">
                        <label>DIČ</label>
                        <input type="text" name="dic" value="${data.dic || ''}">
                    </div>
                </div>
            </div>
            
            ${getContactFields(data)}
            ${getBankFields(data)}
            ${getZastupceSelect(data, true)}
        `;
    }

    function getSpolekFields(data) {
        return `
            <div class="form-section">
                <h3>Údaje o spolku/skupině</h3>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label>Název spolku/skupiny *</label>
                        <input type="text" name="nazev" value="${data.nazev || ''}" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>IČO</label>
                        <input type="text" name="ico" value="${data.ico || ''}" pattern="[0-9]{8}">
                    </div>
                    <div class="form-group">
                        <label>DIČ</label>
                        <input type="text" name="dic" value="${data.dic || ''}">
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
            <div class="form-section">
                <h3>Kontaktní údaje</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Stát *</label>
                        <select name="stat" required>
                            <option value="CZ" ${data.stat === 'CZ' ? 'selected' : ''}>Česká republika</option>
                            <option value="SK" ${data.stat === 'SK' ? 'selected' : ''}>Slovensko</option>
                            <option value="AT" ${data.stat === 'AT' ? 'selected' : ''}>Rakousko</option>
                            <option value="DE" ${data.stat === 'DE' ? 'selected' : ''}>Německo</option>
                            <option value="PL" ${data.stat === 'PL' ? 'selected' : ''}>Polsko</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>PSČ *</label>
                        <input type="text" name="psc" value="${data.psc || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Město *</label>
                        <input type="text" name="mesto" value="${data.mesto || ''}" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Ulice *</label>
                        <input type="text" name="ulice" value="${data.ulice || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Číslo popisné *</label>
                        <input type="text" name="cislo_popisne" value="${data.cislo_popisne || ''}" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Telefon *</label>
                        <input type="tel" name="telefon" value="${data.telefon || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value="${data.email || ''}" required>
                    </div>
                </div>
            </div>
        `;
    }

    function getBankFields(data) {
        return `
            <div class="form-section">
                <h3>Bankovní údaje</h3>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label>Číslo účtu / kód banky *</label>
                        <input type="text" name="bankovni_ucet" value="${data.bankovni_ucet || ''}" 
                               placeholder="123456789/0800" required>
                    </div>
                </div>
            </div>
        `;
    }

    function getLoginFields(data) {
        return `
            <div class="form-section">
                <h3>Přihlašovací údaje</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label>Přihlašovací jméno *</label>
                        <input type="text" name="login" value="${data.login || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Heslo *</label>
                        <input type="password" name="heslo" value="${data.heslo || ''}" required>
                    </div>
                </div>
            </div>
        `;
    }

    function getZastupceSelect(data, required = false) {
        const zastupci = getZastupciList();
        
        return `
            <div class="form-section">
                <h3>Zástupce</h3>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label>Zástupce ${required ? '*' : ''}</label>
                        <select name="zastupce_id" ${required ? 'required' : ''}>
                            <option value="">Bez zástupce</option>
                            ${zastupci.map(z => `
                                <option value="${z.id}" ${data.zastupce_id === z.id ? 'selected' : ''}>
                                    ${z.jmeno} ${z.prijmeni}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    function getZastupceForm(data, isEdit) {
        const title = isEdit ? 'Upravit zástupce' : 'Nový zástupce';
        
        return `
            <div class="form-container">
                <div class="form-header">
                    <h2>${title}</h2>
                    <button type="button" class="btn-close" onclick="window.history.back()">×</button>
                </div>
                
                <form id="pronajimatel-form" class="modern-form">
                    <input type="hidden" name="id" value="${data.id || ''}">
                    <input type="hidden" name="typ_subjektu" value="osoba">
                    <input type="hidden" name="role" value="zastupce">
                    <input type="hidden" name="typ_zastoupeni" value="pronajimatel">
                    
                    <div class="form-section">
                        <h3>Oprávnění a zastoupení</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Typ oprávnění *</label>
                                <select name="typ_opravneni" required>
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
                            </div>
                            <div class="form-group">
                                <label>Koho zastupuje *</label>
                                <select name="zastupuje_id" required>
                                    <option value="">Vyberte...</option>
                                    ${getPronajimatelList().map(p => `
                                        <option value="${p.id}" ${data.zastupuje_id === p.id ? 'selected' : ''}>
                                            ${p.nazev || `${p.jmeno} ${p.prijmeni}`}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>Osobní údaje</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Titul</label>
                                <input type="text" name="titul" value="${data.titul || ''}">
                            </div>
                            <div class="form-group">
                                <label>Jméno *</label>
                                <input type="text" name="jmeno" value="${data.jmeno || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Příjmení *</label>
                                <input type="text" name="prijmeni" value="${data.prijmeni || ''}" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Datum narození *</label>
                                <input type="date" name="datum_narozeni" value="${data.datum_narozeni || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Typ dokladu totožnosti *</label>
                                <select name="typ_dokladu" required>
                                    <option value="">Vyberte...</option>
                                    <option value="op" ${data.typ_dokladu === 'op' ? 'selected' : ''}>Občanský průkaz</option>
                                    <option value="pas" ${data.typ_dokladu === 'pas' ? 'selected' : ''}>Pas</option>
                                    <option value="rp" ${data.typ_dokladu === 'rp' ? 'selected' : ''}>Řidičský průkaz</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Číslo dokladu totožnosti *</label>
                                <input type="text" name="cislo_dokladu" value="${data.cislo_dokladu || ''}" required>
                            </div>
                        </div>
                    </div>
                    
                    ${getContactFields(data)}
                    ${getBankFields(data)}
                    ${getLoginFields(data)}
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            ${isEdit ? 'Uložit změny' : 'Vytvořit'}
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="window.history.back()">
                            Zrušit
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

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
