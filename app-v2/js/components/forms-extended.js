// Rozšířený formulářový systém
window.FormsExtended = (function() {
    'use strict';
    
    // Typy formulářových polí
    const fieldTypes = {
        // Základní pole
        text: {
            render: (config) => renderInput('text', config)
        },
        email: {
            render: (config) => renderInput('email', config),
            validate: (value) => Forms.validateEmail(value) || 'Neplatný email'
        },
        tel: {
            render: (config) => renderInput('tel', config),
            validate: (value) => Forms.validatePhone(value) || 'Neplatný telefon'
        },
        number: {
            render: (config) => renderInput('number', config)
        },
        date: {
            render: (config) => renderInput('date', config)
        },
        select: {
            render: (config) => renderSelect(config)
        },
        textarea: {
            render: (config) => renderTextarea(config)
        },
        checkbox: {
            render: (config) => renderCheckbox(config)
        },
        radio: {
            render: (config) => renderRadioGroup(config)
        },
        
        // Kompozitní pole
        address: {
            render: (config) => renderAddress(config)
        },
        person: {
            render: (config) => renderPersonField(config)
        },
        company: {
            render: (config) => renderCompanyField(config)
        },
        dateRange: {
            render: (config) => renderDateRange(config)
        },
        price: {
            render: (config) => renderPriceField(config)
        }
    };
    
    // Základní input
    function renderInput(type, config) {
        const { name, label, value = '', placeholder = '', required = false, readonly = false, helpText = '' } = config;
        
        return `
            <div class="form-field">
                ${label ? `<label for="${name}" class="form-label ${required ? 'required' : ''}">${label}</label>` : ''}
                <div class="form-control-wrapper">
                    <input 
                        type="${type}" 
                        id="${name}" 
                        name="${name}" 
                        class="form-control" 
                        value="${value}"
                        placeholder="${placeholder}"
                        ${required ? 'required' : ''}
                        ${readonly ? 'readonly' : ''}
                    >
                    ${config.icon ? `<span class="form-icon">${config.icon}</span>` : ''}
                </div>
                ${helpText ? `<div class="form-help">${helpText}</div>` : ''}
                <div class="form-error" data-error-for="${name}"></div>
            </div>
        `;
    }
    
    // Select
    function renderSelect(config) {
        const { name, label, value = '', options = [], required = false, placeholder = 'Vyberte...', helpText = '' } = config;
        
        return `
            <div class="form-field">
                ${label ? `<label for="${name}" class="form-label ${required ? 'required' : ''}">${label}</label>` : ''}
                <div class="form-control-wrapper">
                    <select id="${name}" name="${name}" class="form-control" ${required ? 'required' : ''}>
                        <option value="">${placeholder}</option>
                        ${options.map(opt => {
                            const optValue = typeof opt === 'object' ? opt.value : opt;
                            const optLabel = typeof opt === 'object' ? opt.label : opt;
                            return `<option value="${optValue}" ${value === optValue ? 'selected' : ''}>${optLabel}</option>`;
                        }).join('')}
                    </select>
                    <span class="form-icon">▼</span>
                </div>
                ${helpText ? `<div class="form-help">${helpText}</div>` : ''}
                <div class="form-error" data-error-for="${name}"></div>
            </div>
        `;
    }
    
    // Textarea
    function renderTextarea(config) {
        const { name, label, value = '', placeholder = '', required = false, rows = 4, helpText = '' } = config;
        
        return `
            <div class="form-field">
                ${label ? `<label for="${name}" class="form-label ${required ? 'required' : ''}">${label}</label>` : ''}
                <textarea 
                    id="${name}" 
                    name="${name}" 
                    class="form-control" 
                    rows="${rows}"
                    placeholder="${placeholder}"
                    ${required ? 'required' : ''}
                >${value}</textarea>
                ${helpText ? `<div class="form-help">${helpText}</div>` : ''}
                <div class="form-error" data-error-for="${name}"></div>
            </div>
        `;
    }
    
    // Checkbox
    function renderCheckbox(config) {
        const { name, label, checked = false, helpText = '' } = config;
        
        return `
            <div class="form-field form-field-checkbox">
                <label class="checkbox-wrapper">
                    <input 
                        type="checkbox" 
                        id="${name}" 
                        name="${name}" 
                        ${checked ? 'checked' : ''}
                    >
                    <span class="checkbox-label">${label}</span>
                </label>
                ${helpText ? `<div class="form-help">${helpText}</div>` : ''}
            </div>
        `;
    }
    
    // Radio skupina
    function renderRadioGroup(config) {
        const { name, label, options = [], value = '', required = false } = config;
        
        return `
            <div class="form-field">
                ${label ? `<div class="form-label ${required ? 'required' : ''}">${label}</div>` : ''}
                <div class="radio-group">
                    ${options.map((opt, idx) => {
                        const optValue = typeof opt === 'object' ? opt.value : opt;
                        const optLabel = typeof opt === 'object' ? opt.label : opt;
                        return `
                            <label class="radio-wrapper">
                                <input 
                                    type="radio" 
                                    name="${name}" 
                                    value="${optValue}"
                                    ${value === optValue ? 'checked' : ''}
                                >
                                <span class="radio-label">${optLabel}</span>
                            </label>
                        `;
                    }).join('')}
                </div>
                <div class="form-error" data-error-for="${name}"></div>
            </div>
        `;
    }
    
    // Kompozitní pole - Adresa
    function renderAddress(config) {
        const { name = 'address', label = 'Adresa', required = false, value = {} } = config;
        
        return `
            <div class="form-group-header">${label}</div>
            <div class="form-row">
                <div class="form-col-8">
                    ${renderInput('text', {
                        name: `${name}.ulice`,
                        label: 'Ulice a číslo popisné',
                        value: value.ulice || '',
                        required
                    })}
                </div>
                <div class="form-col-4">
                    ${renderInput('text', {
                        name: `${name}.mesto`,
                        label: 'Město',
                        value: value.mesto || '',
                        required
                    })}
                </div>
            </div>
            <div class="form-row">
                <div class="form-col-3">
                    ${renderInput('text', {
                        name: `${name}.psc`,
                        label: 'PSČ',
                        value: value.psc || '',
                        placeholder: '000 00',
                        required
                    })}
                </div>
                <div class="form-col-9">
                    ${renderSelect({
                        name: `${name}.kraj`,
                        label: 'Kraj',
                        value: value.kraj || '',
                        options: [
                            'Hlavní město Praha',
                            'Středočeský kraj',
                            'Jihočeský kraj',
                            'Plzeňský kraj',
                            'Karlovarský kraj',
                            'Ústecký kraj',
                            'Liberecký kraj',
                            'Královéhradecký kraj',
                            'Pardubický kraj',
                            'Kraj Vysočina',
                            'Jihomoravský kraj',
                            'Olomoucký kraj',
                            'Zlínský kraj',
                            'Moravskoslezský kraj'
                        ]
                    })}
                </div>
            </div>
        `;
    }
    
    // Kompozitní pole - Osoba
    function renderPersonField(config) {
        const { name = 'person', required = false, value = {} } = config;
        
        return `
            <div class="form-row">
                <div class="form-col-6">
                    ${renderInput('text', {
                        name: `${name}.jmeno`,
                        label: 'Jméno',
                        value: value.jmeno || '',
                        required
                    })}
                </div>
                <div class="form-col-6">
                    ${renderInput('text', {
                        name: `${name}.prijmeni`,
                        label: 'Příjmení',
                        value: value.prijmeni || '',
                        required
                    })}
                </div>
            </div>
        `;
    }
    
    // Kompozitní pole - Firma
    function renderCompanyField(config) {
        const { name = 'company', required = false, value = {} } = config;
        
        return `
            <div class="form-row">
                <div class="form-col-8">
                    ${renderInput('text', {
                        name: `${name}.nazev`,
                        label: 'Název firmy',
                        value: value.nazev || '',
                        required
                    })}
                </div>
                <div class="form-col-4">
                    ${renderInput('text', {
                        name: `${name}.ico`,
                        label: 'IČO',
                        value: value.ico || '',
                        placeholder: '00000000'
                    })}
                </div>
            </div>
        `;
    }
    
    // Kompozitní pole - Rozsah datumů
    function renderDateRange(config) {
        const { name = 'dateRange', label = 'Období', required = false, value = {} } = config;
        
        return `
            <div class="form-group-header">${label}</div>
            <div class="form-row">
                <div class="form-col-6">
                    ${renderInput('date', {
                        name: `${name}.od`,
                        label: 'Od',
                        value: value.od || '',
                        required
                    })}
                </div>
                <div class="form-col-6">
                    ${renderInput('date', {
                        name: `${name}.do`,
                        label: 'Do',
                        value: value.do || ''
                    })}
                </div>
            </div>
        `;
    }
    
    // Kompozitní pole - Cena
    function renderPriceField(config) {
        const { name = 'price', label = 'Cena', required = false, value = {} } = config;
        
        return `
            <div class="form-row">
                <div class="form-col-8">
                    ${renderInput('number', {
                        name: `${name}.castka`,
                        label: label,
                        value: value.castka || '',
                        required,
                        icon: 'Kč'
                    })}
                </div>
                <div class="form-col-4">
                    ${renderSelect({
                        name: `${name}.obdobi`,
                        label: 'Období',
                        value: value.obdobi || 'mesic',
                        options: [
                            { value: 'mesic', label: 'měsíčně' },
                            { value: 'rok', label: 'ročně' }
                        ]
                    })}
                </div>
            </div>
        `;
    }
    
    // Vytvoření celého formuláře
    function createForm(config) {
        const { fields = [], layout = 'single', title = '', actions = true, onSubmit } = config;
        
        const formId = `form-${Date.now()}`;
        
        let formHTML = `
            <form id="${formId}" class="form form-layout-${layout}">
                ${title ? `<h3 class="form-title">${title}</h3>` : ''}
                <div class="form-body">
        `;
        
        // Vykreslení polí
        fields.forEach(field => {
            const fieldType = fieldTypes[field.type];
            if (fieldType) {
                formHTML += fieldType.render(field);
            } else {
                console.warn(`Neznámý typ pole: ${field.type}`);
            }
        });
        
        formHTML += `
                </div>
                ${actions ? `
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="Modal.close()">Zrušit</button>
                        <button type="submit" class="btn btn-primary">Uložit</button>
                    </div>
                ` : ''}
            </form>
        `;
        
        // Po vykreslení přidat event listenery
        setTimeout(() => {
            const form = document.getElementById(formId);
            if (form && onSubmit) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const data = Forms.serializeForm(form);
                    onSubmit(data);
                });
            }
        }, 100);
        
        return formHTML;
    }
    
    // Příklady použití pro různé moduly
    const formTemplates = {
        // Formulář pro pronajímatele - fyzická osoba
        pronajimatelOsoba: {
            title: 'Nový pronajímatel - fyzická osoba',
            fields: [
                { type: 'person', name: 'osoba', required: true },
                { type: 'date', name: 'datumNarozeni', label: 'Datum narození' },
                { type: 'text', name: 'rodneCislo', label: 'Rodné číslo', placeholder: '000000/0000' },
                { type: 'address', name: 'adresa', label: 'Trvalá adresa', required: true },
                { type: 'email', name: 'email', label: 'Email', required: true },
                { type: 'tel', name: 'telefon', label: 'Telefon', required: true },
                { type: 'text', name: 'bankovniUcet', label: 'Bankovní účet', placeholder: '000000-0000000000/0000' },
                { type: 'textarea', name: 'poznamka', label: 'Poznámka', rows: 3 }
            ]
        },
        
        // Formulář pro pronajímatele - firma
        pronajimatelFirma: {
            title: 'Nový pronajímatel - firma',
            fields: [
                { type: 'company', name: 'firma', required: true },
                { type: 'text', name: 'dic', label: 'DIČ', placeholder: 'CZ00000000' },
                { type: 'address', name: 'sidlo', label: 'Sídlo firmy', required: true },
                { type: 'person', name: 'kontaktniOsoba', label: 'Kontaktní osoba' },
                { type: 'email', name: 'email', label: 'Email', required: true },
                { type: 'tel', name: 'telefon', label: 'Telefon', required: true },
                { type: 'text', name: 'bankovniUcet', label: 'Bankovní účet' },
                { type: 'textarea', name: 'poznamka', label: 'Poznámka', rows: 3 }
            ]
        },
        
        // Formulář pro nájemníka
        najemnik: {
            title: 'Nový nájemník',
            fields: [
                { type: 'radio', name: 'typ', label: 'Typ nájemníka', options: ['Fyzická osoba', 'Firma'], required: true },
                { type: 'person', name: 'osoba', required: true },
                { type: 'company', name: 'firma' },
                { type: 'address', name: 'adresa', label: 'Adresa', required: true },
                { type: 'email', name: 'email', label: 'Email', required: true },
                { type: 'tel', name: 'telefon', label: 'Telefon', required: true },
                { type: 'number', name: 'pocetOsob', label: 'Počet osob v domácnosti', value: 1 },
                { type: 'checkbox', name: 'maZvirata', label: 'Má domácí zvířata' }
            ]
        },
        
        // Formulář pro nemovitost
        nemovitost: {
            title: 'Nová nemovitost',
            fields: [
                { type: 'select', name: 'typ', label: 'Typ nemovitosti', options: ['Byt', 'Rodinný dům', 'Nebytový prostor', 'Garáž'], required: true },
                { type: 'text', name: 'nazev', label: 'Název/označení', placeholder: 'např. Byt 2+1 Praha', required: true },
                { type: 'address', name: 'adresa', label: 'Adresa nemovitosti', required: true },
                { type: 'number', name: 'plocha', label: 'Plocha (m²)', required: true },
                { type: 'text', name: 'dispozice', label: 'Dispozice', placeholder: 'např. 2+1' },
                { type: 'select', name: 'stav', label: 'Stav', options: ['Volná', 'Obsazená', 'V rekonstrukci'], required: true },
                { type: 'price', name: 'najemne', label: 'Nájemné', required: true },
                { type: 'textarea', name: 'vybaveni', label: 'Vybavení', rows: 4 }
            ]
        },
        
        // Formulář pro smlouvu
        smlouva: {
            title: 'Nová nájemní smlouva',
            layout: 'wizard',
            fields: [
                { type: 'select', name: 'najemnik', label: 'Nájemník', options: [], required: true },
                { type: 'select', name: 'nemovitost', label: 'Nemovitost', options: [], required: true },
                { type: 'dateRange', name: 'obdobi', label: 'Doba nájmu', required: true },
                { type: 'price', name: 'najemne', label: 'Měsíční nájemné', required: true },
                { type: 'price', name: 'kauce', label: 'Kauce' },
                { type: 'select', name: 'splatnost', label: 'Splatnost nájemného', options: [
                    { value: '1', label: '1. den v měsíci' },
                    { value: '15', label: '15. den v měsíci' },
                    { value: 'last', label: 'Poslední den v měsíci' }
                ], required: true },
                { type: 'checkbox', name: 'sluzbyVNajmu', label: 'Služby jsou součástí nájemného' },
                { type: 'textarea', name: 'zvlastniUjednani', label: 'Zvláštní ujednání' }
            ]
        }
    };
    
    // Veřejné API
    return {
        createForm,
        formTemplates,
        fieldTypes,
        
        // Pomocné metody pro otevření konkrétních formulářů
        openPronajimatelForm(type = 'osoba') {
            const template = type === 'firma' ? formTemplates.pronajimatelFirma : formTemplates.pronajimatelOsoba;
            const formHTML = createForm({
                ...template,
                onSubmit: (data) => {
                    console.log('Uložení pronajímatele:', data);
                    // TODO: Uložit do AppState
                    Modal.close();
                    App.showToast('Pronajímatel byl přidán', 'success');
                }
            });
            Modal.open(template.title, formHTML);
        },
        
        openNajemnikForm() {
            const formHTML = createForm({
                ...formTemplates.najemnik,
                onSubmit: (data) => {
                    console.log('Uložení nájemníka:', data);
                    Modal.close();
                    App.showToast('Nájemník byl přidán', 'success');
                }
            });
            Modal.open(formTemplates.najemnik.title, formHTML);
        },
        
        openNemovitostForm() {
            const formHTML = createForm({
                ...formTemplates.nemovitost,
                onSubmit: (data) => {
                    console.log('Uložení nemovitosti:', data);
                    Modal.close();
                    App.showToast('Nemovitost byla přidána', 'success');
                }
            });
            Modal.open(formTemplates.nemovitost.title, formHTML);
        }
    };
})();
