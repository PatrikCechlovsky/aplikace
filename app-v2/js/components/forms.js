// Rozšíření pro propojení formulářů
window.FormLinking = (function() {
    'use strict';
    
    // Uložení rozpracovaného formuláře
    const saveFormState = (formId, data) => {
        localStorage.setItem(`form_draft_${formId}`, JSON.stringify({
            data: data,
            timestamp: new Date().toISOString(),
            user: 'PatrikCechlovsky'
        }));
    };
    
    // Načtení rozpracovaného formuláře
    const loadFormState = (formId) => {
        const saved = localStorage.getItem(`form_draft_${formId}`);
        return saved ? JSON.parse(saved) : null;
    };
    
    // Validace formuláře (kromě specifikovaných polí)
    const validateFormExcept = (form, excludeFields = []) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        let firstInvalidField = null;
        
        requiredFields.forEach(field => {
            // Přeskočit vyloučená pole
            if (excludeFields.includes(field.name) || excludeFields.includes(field.id)) {
                return;
            }
            
            if (!field.value || field.value.trim() === '') {
                isValid = false;
                field.classList.add('error');
                if (!firstInvalidField) firstInvalidField = field;
                
                // Přidat error message
                let errorMsg = field.parentElement.querySelector('.form-error');
                if (!errorMsg) {
                    errorMsg = document.createElement('span');
                    errorMsg.className = 'form-error';
                    errorMsg.textContent = 'Toto pole je povinné';
                    field.parentElement.appendChild(errorMsg);
                }
            } else {
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.form-error');
                if (errorMsg) errorMsg.remove();
            }
        });
        
        if (firstInvalidField) {
            firstInvalidField.focus();
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        return isValid;
    };
    
    // Přidat tlačítko "Přidat zástupce" vedle pole
    const addAgentButton = (field, options = {}) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-with-action';
        
        // Zabalit původní pole
        field.parentNode.insertBefore(wrapper, field);
        wrapper.appendChild(field);
        
        // Přidat tlačítko
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-sm btn-secondary';
        button.innerHTML = '<span>➕</span> Přidat';
        button.title = 'Přidat nového zástupce';
        
        wrapper.appendChild(button);
        
        // Handler pro kliknutí
        button.addEventListener('click', () => {
            handleAddAgent(field, options);
        });
        
        return button;
    };
    
    // Handler pro přidání zástupce
    const handleAddAgent = (field, options) => {
        const currentForm = field.closest('form');
        const currentFormId = options.formId || currentForm.id;
        
        // Validovat všechna povinná pole kromě pole zástupce
        if (!validateFormExcept(currentForm, [field.name, field.id, 'agent', 'zastupce'])) {
            Modal.show({
                title: 'Vyplňte povinná pole',
                content: `
                    <div class="alert alert-warning">
                        <p>Před přidáním zástupce je nutné vyplnit všechna povinná pole.</p>
                        <p>Zkontrolujte prosím červeně označená pole.</p>
                    </div>
                `,
                buttons: [
                    {
                        text: 'Rozumím',
                        class: 'btn-primary',
                        onClick: () => Modal.hide()
                    }
                ]
            });
            return;
        }
        
        // Uložit aktuální stav formuláře
        const formData = new FormData(currentForm);
        const dataObject = {};
        formData.forEach((value, key) => {
            dataObject[key] = value;
        });
        saveFormState(currentFormId, dataObject);
        
        // Otevřít formulář pro nového zástupce
        Modal.show({
            title: 'Nový zástupce',
            size: 'large',
            content: `
                <form id="new-agent-form" class="form">
                    <div class="form-section">
                        <h3 class="form-group-header">Údaje zástupce</h3>
                        
                        <div class="form-row">
                            <div class="form-col-2">
                                <div class="form-field">
                                    <label class="form-label">Titul před</label>
                                    <input type="text" class="form-control" name="titleBefore">
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label required">Jméno</label>
                                    <input type="text" class="form-control" name="firstName" required>
                                </div>
                            </div>
                            <div class="form-col-4">
                                <div class="form-field">
                                    <label class="form-label required">Příjmení</label>
                                    <input type="text" class="form-control" name="lastName" required>
                                </div>
                            </div>
                            <div class="form-col-2">
                                <div class="form-field">
                                    <label class="form-label">Titul za</label>
                                    <input type="text" class="form-control" name="titleAfter">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label required">Email</label>
                                    <input type="email" class="form-control" name="email" required>
                                </div>
                            </div>
                            <div class="form-col-6">
                                <div class="form-field">
                                    <label class="form-label required">Telefon</label>
                                    <input type="tel" class="form-control" name="phone" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-col-12">
                                <div class="form-field">
                                    <label class="form-label">Poznámka</label>
                                    <textarea class="form-control" name="note" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            `,
            buttons: [
                {
                    text: 'Zrušit',
                    class: 'btn-secondary',
                    onClick: () => Modal.hide()
                },
                {
                    text: 'Uložit zástupce',
                    class: 'btn-primary',
                    onClick: () => {
                        const agentForm = document.getElementById('new-agent-form');
                        if (validateFormExcept(agentForm, [])) {
                            // Simulace uložení zástupce
                            const agentData = new FormData(agentForm);
                            const agent = {
                                id: Date.now(),
                                name: `${agentData.get('firstName')} ${agentData.get('lastName')}`,
                                email: agentData.get('email'),
                                phone: agentData.get('phone')
                            };
                            
                            // Aktualizovat původní pole
                            field.value = agent.name;
                            field.dataset.agentId = agent.id;
                            
                            // Zobrazit potvrzení
                            Modal.hide();
                            setTimeout(() => {
                                Modal.show({
                                    title: 'Zástupce přidán',
                                    content: `
                                        <div class="alert alert-success">
                                            <p>Zástupce <strong>${agent.name}</strong> byl úspěšně přidán.</p>
                                            <p>Nyní můžete pokračovat ve vyplňování formuláře.</p>
                                        </div>
                                    `,
                                    buttons: [
                                        {
                                            text: 'OK',
                                            class: 'btn-primary',
                                            onClick: () => Modal.hide()
                                        }
                                    ]
                                });
                            }, 100);
                        }
                    }
                }
            ]
        });
    };
    
    // Inicializace pro konkrétní formulář
    const initFormLinking = (formSelector, agentFieldSelector) => {
        const form = document.querySelector(formSelector);
        if (!form) return;
        
        const agentField = form.querySelector(agentFieldSelector);
        if (!agentField) return;
        
        // Přidat tlačítko vedle pole
        addAgentButton(agentField, {
            formId: form.id || formSelector
        });
        
        // Načíst uložený stav formuláře pokud existuje
        const savedState = loadFormState(form.id || formSelector);
        if (savedState && savedState.data) {
            // Zeptat se, zda chce obnovit rozpracovaný formulář
            if (confirm('Byl nalezen rozpracovaný formulář. Chcete ho obnovit?')) {
                Object.keys(savedState.data).forEach(key => {
                    const field = form.querySelector(`[name="${key}"]`);
                    if (field) field.value = savedState.data[key];
                });
            }
        }
    };
    
    return {
        init: initFormLinking,
        saveState: saveFormState,
        loadState: loadFormState,
        validateExcept: validateFormExcept,
        addAgentButton: addAgentButton
    };
})();
