// Integrace formulářů s aplikací
(function() {
    'use strict';
    
    // Přepíšeme handler pro tlačítko "Přidat záznam"
    document.addEventListener('DOMContentLoaded', function() {
        const btnAdd = document.getElementById('btnAdd');
        if (btnAdd) {
            btnAdd.addEventListener('click', () => {
                const currentModule = AppState.get('currentModule');
                
                switch(currentModule) {
                    case 'pronajimatel':
                        // Zeptej se na typ
                        Modal.open('Vyberte typ pronajímatele', `
                            <div class="type-selector">
                                <button class="type-option" onclick="FormsExtended.openPronajimatelForm('osoba')">
                                    <span class="type-icon">👤</span>
                                    <span class="type-name">Fyzická osoba</span>
                                </button>
                                <button class="type-option" onclick="FormsExtended.openPronajimatelForm('firma')">
                                    <span class="type-icon">🏢</span>
                                    <span class="type-name">Firma</span>
                                </button>
                            </div>
                        `);
                        break;
                        
                    case 'najemnici':
                        FormsExtended.openNajemnikForm();
                        break;
                        
                    case 'nemovitosti':
                        FormsExtended.openNemovitostForm();
                        break;
                        
                    default:
                        Modal.open('Přidat nový záznam', '<p>Formulář pro tento modul ještě není implementován.</p>');
                }
            });
        }
    });
})();
