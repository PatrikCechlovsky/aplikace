// Komponenta Forms - pomocné funkce pro formuláře
window.Forms = (function() {
    'use strict';
    
    // Validace emailu
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validace telefonu
    function validatePhone(phone) {
        const re = /^(\+420)?\s*\d{3}\s*\d{3}\s*\d{3}$/;
        return re.test(phone.replace(/\s/g, ''));
    }
    
    // Serializace formuláře do objektu
    function serializeForm(form) {
        const data = {};
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.name) {
                if (input.type === 'checkbox') {
                    data[input.name] = input.checked;
                } else if (input.type === 'radio') {
                    if (input.checked) {
                        data[input.name] = input.value;
                    }
                } else {
                    data[input.name] = input.value;
                }
            }
        });
        
        return data;
    }
    
    // Vyplnění formuláře daty
    function fillForm(form, data) {
        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = !!data[key];
                } else if (input.type === 'radio') {
                    const radio = form.querySelector(`[name="${key}"][value="${data[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    input.value = data[key] || '';
                }
            }
        });
    }
    
    // Vyčištění formuláře
    function clearForm(form) {
        form.reset();
        // Odstranit chybové zprávy
        form.querySelectorAll('.error-message').forEach(el => el.remove());
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }
    
    // Zobrazení chyby u inputu
    function showError(input, message) {
        input.classList.add('error');
        
        // Odstranit existující chybovou zprávu
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Přidat novou
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        input.parentElement.appendChild(errorEl);
    }
    
    // Odstranění chyby
    function clearError(input) {
        input.classList.remove('error');
        const errorEl = input.parentElement.querySelector('.error-message');
        if (errorEl) errorEl.remove();
    }
    
    // Vytvoření formulářového pole
    function createFormField(config) {
        const { type = 'text', name, label, value = '', required = false, options = [] } = config;
        
        let html = `<div class="form-group">`;
        
        if (label) {
            html += `<label for="${name}">${label}${required ? ' *' : ''}</label>`;
        }
        
        switch (type) {
            case 'select':
                html += `<select name="${name}" id="${name}" ${required ? 'required' : ''}>`;
                options.forEach(opt => {
                    const optValue = typeof opt === 'object' ? opt.value : opt;
                    const optLabel = typeof opt === 'object' ? opt.label : opt;
                    html += `<option value="${optValue}" ${value === optValue ? 'selected' : ''}>${optLabel}</option>`;
                });
                html += `</select>`;
                break;
                
            case 'textarea':
                html += `<textarea name="${name}" id="${name}" ${required ? 'required' : ''}>${value}</textarea>`;
                break;
                
            default:
                html += `<input type="${type}" name="${name}" id="${name}" value="${value}" ${required ? 'required' : ''}>`;
        }
        
        html += `</div>`;
        
        return html;
    }
    
    // Veřejné API
    return {
        validateEmail,
        validatePhone,
        serializeForm,
        fillForm,
        clearForm,
        showError,
        clearError,
        createFormField
    };
})();