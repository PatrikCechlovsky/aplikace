window.Help = (function() {
    'use strict';
    
    const modules = {
        pronajimatel: {
            title: 'Pronajímatel',
            icon: '🏠',
            quickHelp: `
                <h3>Rychlá nápověda - Pronajímatel</h3>
                <p><strong>Co tento modul dělá:</strong> Spravuje databázi pronajímatelů a jejich zástupců.</p>
                
                <h4>Základní postupy:</h4>
                <ul>
                    <li><strong>Nový pronajímatel:</strong> Tlačítko "+" → Vyberte typ → Vyplňte formulář</li>
                    <li><strong>Přidat zástupce:</strong> Záložka "Zastupující osoby" → Přidat zástupce</li>
                    <li><strong>Upravit údaje:</strong> Klikněte na ✏️ u záznamu</li>
                </ul>
                
                <h4>Důležité vazby:</h4>
                <ul>
                    <li>🏘️ <strong>Nemovitosti</strong> - každá nemovitost musí mít vlastníka</li>
                    <li>📄 <strong>Smlouvy</strong> - pronajímatel je stranou smlouvy</li>
                    <li>💰 <strong>Platby</strong> - platby jdou na účet pronajímatele</li>
                </ul>
                
                <h4>Tipy:</h4>
                <ul>
                    <li>💡 Můžete vytvořit zástupce přímo při vytváření pronajímatele</li>
                    <li>💡 IČO lze v budoucnu doplnit automaticky z ARES</li>
                    <li>💡 Hesla jsou zatím viditelná, později budou šifrovaná</li>
                </ul>
            `
        },
        najemnici: {
            title: 'Nájemníci',
            icon: '👥',
            quickHelp: `
                <h3>Rychlá nápověda - Nájemníci</h3>
                <p><strong>Co tento modul dělá:</strong> Spravuje databázi nájemníků a jejich zástupců.</p>
                
                <h4>Základní postupy:</h4>
                <ul>
                    <li><strong>Nový nájemník:</strong> Tlačítko "+" → Vyberte typ → Vyplňte formulář</li>
                    <li><strong>Nastavit oprávnění:</strong> Vyberte co může nájemník v systému vidět</li>
                    <li><strong>Historie:</strong> Klikněte na 👁️ pro zobrazení detailů a historie</li>
                </ul>
                
                <h4>Důležité vazby:</h4>
                <ul>
                    <li>📄 <strong>Smlouvy</strong> - nájemník je stranou smlouvy</li>
                    <li>💰 <strong>Platby</strong> - nájemník platí nájem</li>
                    <li>📋 <strong>Žádosti</strong> - nájemník podává žádosti o opravy</li>
                </ul>
            `
        }
    };
    
    function showHelp(moduleId) {
        const help = modules[moduleId];
        if (!help) return;
        
        // Kontrola zda Modal existuje
        if (window.Modal && typeof window.Modal.show === 'function') {
            window.Modal.show({
                title: `Nápověda - ${help.title}`,
                content: help.quickHelp,
                buttons: [
                    {
                        text: 'Zavřít',
                        class: 'btn-primary',
                        onClick: () => window.Modal.hide()
                    }
                ]
            });
        } else {
            // Fallback - použít alert
            alert('Nápověda není momentálně dostupná');
        }
    }
    
    function showFullDocumentation() {
        const content = `
            <div class="help-menu">
                <h3>📚 Kompletní dokumentace</h3>
                <div class="help-modules">
                    ${Object.entries(modules).map(([id, module]) => `
                        <div class="help-module-card" onclick="Help.showHelp('${id}')">
                            <span class="help-module-icon">${module.icon}</span>
                            <span class="help-module-title">${module.title}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="help-links">
                    <h4>Další zdroje:</h4>
                    <ul>
                        <li><a href="docs/README.md" target="_blank">📖 Hlavní dokumentace</a></li>
                        <li><a href="docs/DEPENDENCIES.md" target="_blank">🔗 Závislosti modulů</a></li>
                        <li><a href="#" onclick="Help.showKeyboardShortcuts(); return false;">⌨️ Klávesové zkratky</a></li>
                    </ul>
                </div>
            </div>
        `;
        
        // Kontrola zda Modal existuje
        if (window.Modal && typeof window.Modal.show === 'function') {
            window.Modal.show({
                title: 'Nápověda aplikace',
                content: content,
                size: 'large'
            });
        } else {
            alert('Nápověda není momentálně dostupná');
        }
    }
    
    function showKeyboardShortcuts() {
        const content = `
            <div class="keyboard-shortcuts">
                <h3>⌨️ Klávesové zkratky</h3>
                <table class="shortcuts-table">
                    <tr>
                        <td><kbd>Alt</kbd> + <kbd>N</kbd></td>
                        <td>Nový záznam</td>
                    </tr>
                    <tr>
                        <td><kbd>Esc</kbd></td>
                        <td>Zavřít dialog</td>
                    </tr>
                    <tr>
                        <td><kbd>Ctrl</kbd> + <kbd>S</kbd></td>
                        <td>Uložit formulář</td>
                    </tr>
                </table>
            </div>
        `;
        
        if (window.Modal && typeof window.Modal.show === 'function') {
            window.Modal.show({
                title: 'Klávesové zkratky',
                content: content
            });
        }
    }
    
    return {
        showHelp,
        showFullDocumentation,
        showKeyboardShortcuts
    };
})();
