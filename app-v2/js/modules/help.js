window.Help = (function() {
    'use strict';
    
    // Kompletní dokumentace modulů
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
        },
        nemovitosti: {
            title: 'Nemovitosti',
            icon: '🏘️',
            quickHelp: `
                <h3>Rychlá nápověda - Nemovitosti</h3>
                <p><strong>Co tento modul dělá:</strong> Evidence všech nemovitostí a jejich částí.</p>
                
                <h4>Typy nemovitostí:</h4>
                <ul>
                    <li>🏢 <strong>Budova</strong> - celý objekt</li>
                    <li>🏠 <strong>Dům</strong> - rodinný dům</li>
                    <li>🏬 <strong>Byt</strong> - bytová jednotka</li>
                    <li>🏪 <strong>Nebytový prostor</strong> - kancelář, obchod</li>
                    <li>🚗 <strong>Garáž</strong> - garážové stání</li>
                    <li>🌳 <strong>Pozemek</strong> - zahrada, pole</li>
                </ul>
                
                <h4>Důležité informace:</h4>
                <ul>
                    <li>Každá nemovitost musí mít vlastníka (pronajímatele)</li>
                    <li>Lze přidat fotografie a dokumenty</li>
                    <li>Měřiče energií se zadávají zvlášť</li>
                </ul>
            `
        },
        smlouvy: {
            title: 'Smlouvy',
            icon: '📄',
            quickHelp: `
                <h3>Rychlá nápověda - Smlouvy</h3>
                <p><strong>Co tento modul dělá:</strong> Správa nájemních smluv.</p>
                
                <h4>Vytvoření smlouvy:</h4>
                <ol>
                    <li>Vyberte pronajímatele</li>
                    <li>Vyberte nemovitost</li>
                    <li>Vyberte nájemníka</li>
                    <li>Nastavte datum od-do</li>
                    <li>Zadejte výši nájmu</li>
                    <li>Definujte služby</li>
                </ol>
                
                <h4>Stavy smlouvy:</h4>
                <ul>
                    <li>📝 <strong>Návrh</strong> - připravuje se</li>
                    <li>✅ <strong>Aktivní</strong> - platná smlouva</li>
                    <li>⏰ <strong>Končící</strong> - blíží se konec</li>
                    <li>🔴 <strong>Ukončená</strong> - již neplatná</li>
                </ul>
            `
        }
    };
    
    // Hlavní dokumentace
    const mainDocumentation = {
        quickStart: `
            <div class="doc-section">
                <h2>🚀 Rychlý start</h2>
                <p>Vítejte v aplikaci pro správu nemovitostí! Zde je návod, jak začít:</p>
                
                <div class="quick-start-steps">
                    <div class="step">
                        <span class="step-number">1</span>
                        <div class="step-content">
                            <h4>Vytvořte pronajímatele</h4>
                            <p>Začněte v modulu <strong>Pronajímatel</strong> a přidejte vlastníky nemovitostí.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <span class="step-number">2</span>
                        <div class="step-content">
                            <h4>Přidejte nemovitosti</h4>
                            <p>V modulu <strong>Nemovitosti</strong> evidujte všechny objekty k pronájmu.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <span class="step-number">3</span>
                        <div class="step-content">
                            <h4>Zadejte nájemníky</h4>
                            <p>Modul <strong>Nájemníci</strong> slouží pro evidenci všech nájemců.</p>
                        </div>
                    </div>
                    
                    <div class="step">
                        <span class="step-number">4</span>
                        <div class="step-content">
                            <h4>Vytvořte smlouvy</h4>
                            <p>V modulu <strong>Smlouvy</strong> propojte vše dohromady.</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        overview: `
            <div class="doc-section">
                <h2>📋 Přehled aplikace</h2>
                <p>Aplikace pro správu nemovitostí je komplexní systém pro pronajímatele.</p>
                
                <h3>Hlavní funkce:</h3>
                <ul>
                    <li>✅ Evidence pronajímatelů a nájemníků</li>
                    <li>✅ Správa nemovitostí a jejich částí</li>
                    <li>✅ Tvorba a správa nájemních smluv</li>
                    <li>✅ Platební kalendář a sledování plateb</li>
                    <li>✅ Vyúčtování služeb</li>
                    <li>✅ Komunikace s nájemníky</li>
                    <li>✅ Přehledy a reporty</li>
                </ul>
                
                <h3>Struktura modulů:</h3>
                <div class="module-structure">
                    <div class="structure-level">
                        <strong>Základní data</strong>
                        <ul>
                            <li>🏠 Pronajímatel</li>
                            <li>👥 Nájemníci</li>
                            <li>🏘️ Nemovitosti</li>
                        </ul>
                    </div>
                    <div class="structure-level">
                        <strong>Smlouvy a platby</strong>
                        <ul>
                            <li>📄 Smlouvy</li>
                            <li>💰 Platby</li>
                            <li>📊 Vyúčtování</li>
                        </ul>
                    </div>
                    <div class="structure-level">
                        <strong>Správa a komunikace</strong>
                        <ul>
                            <li>🔧 Údržba</li>
                            <li>📨 Komunikace</li>
                            <li>📁 Dokumenty</li>
                        </ul>
                    </div>
                </div>
            </div>
        `,
        
        tips: `
            <div class="doc-section">
                <h2>💡 Tipy a triky</h2>
                
                <div class="tips-grid">
                    <div class="tip-card">
                        <h4>🔍 Vyhledávání</h4>
                        <p>Použijte vyhledávací pole v každém modulu pro rychlé nalezení záznamů.</p>
                    </div>
                    
                    <div class="tip-card">
                        <h4>📎 Přílohy</h4>
                        <p>Ke každému záznamu můžete přidat dokumenty a fotografie.</p>
                    </div>
                    
                    <div class="tip-card">
                        <h4>🔗 Propojení</h4>
                        <p>Při vytváření záznamu můžete rovnou vytvořit související záznamy.</p>
                    </div>
                    
                    <div class="tip-card">
                        <h4>💾 Automatické ukládání</h4>
                        <p>Rozpracované formuláře se automaticky ukládají, neztratíte data.</p>
                    </div>
                    
                    <div class="tip-card">
                        <h4>🎨 Přizpůsobení</h4>
                        <p>V nastavení si můžete změnit vzhled aplikace podle svých preferencí.</p>
                    </div>
                    
                    <div class="tip-card">
                        <h4>📱 Mobilní verze</h4>
                        <p>Aplikace je plně responzivní a funguje i na mobilních zařízeních.</p>
                    </div>
                </div>
            </div>
        `
    };
    
    function showHelp(moduleId) {
        const help = modules[moduleId];
        if (!help) return;
        
        if (window.Modal && typeof window.Modal.open === 'function') {
            window.Modal.open({
                title: `Nápověda - ${help.title}`,
                content: help.quickHelp,
                buttons: [
                    {
                        text: 'Zavřít',
                        class: 'btn-primary',
                        onClick: () => window.Modal.close()
                    }
                ]
            });
        }
    }
    
    function showFullDocumentation() {
        const content = `
            <div class="help-menu">
                <div class="help-navigation">
                    <button class="help-nav-btn active" onclick="Help.showDocSection('overview')">
                        📋 Přehled
                    </button>
                    <button class="help-nav-btn" onclick="Help.showDocSection('quickStart')">
                        🚀 Rychlý start
                    </button>
                    <button class="help-nav-btn" onclick="Help.showDocSection('modules')">
                        📦 Moduly
                    </button>
                    <button class="help-nav-btn" onclick="Help.showDocSection('tips')">
                        💡 Tipy
                    </button>
                </div>
                
                <div id="help-content" class="help-content">
                    ${mainDocumentation.overview}
                </div>
            </div>
        `;
        
        if (window.Modal && typeof window.Modal.open === 'function') {
            window.Modal.open({
                title: '❓ Nápověda aplikace',
                content: content,
                size: 'large',
                buttons: [
                    {
                        text: 'Zavřít',
                        class: 'btn-secondary',
                        onClick: () => window.Modal.close()
                    }
                ]
            });
        }
    }
    
    function showDocSection(section) {
        // Aktualizace navigace
        document.querySelectorAll('.help-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Zobrazení sekce
        const contentEl = document.getElementById('help-content');
        if (!contentEl) return;
        
        switch(section) {
            case 'quickStart':
                contentEl.innerHTML = mainDocumentation.quickStart;
                break;
            case 'modules':
                contentEl.innerHTML = `
                    <div class="doc-section">
                        <h2>📦 Dokumentace modulů</h2>
                        <p>Klikněte na modul pro zobrazení podrobné nápovědy:</p>
                        <div class="help-modules">
                            ${Object.entries(modules).map(([id, module]) => `
                                <div class="help-module-card" onclick="Help.showHelp('${id}')">
                                    <span class="help-module-icon">${module.icon}</span>
                                    <span class="help-module-title">${module.title}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
            case 'tips':
                contentEl.innerHTML = mainDocumentation.tips;
                break;
            case 'overview':
            default:
                contentEl.innerHTML = mainDocumentation.overview;
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
                    <tr>
                        <td><kbd>Ctrl</kbd> + <kbd>F</kbd></td>
                        <td>Vyhledávání</td>
                    </tr>
                    <tr>
                        <td><kbd>Alt</kbd> + <kbd>←</kbd></td>
                        <td>Zpět</td>
                    </tr>
                </table>
            </div>
        `;
        
        if (window.Modal && typeof window.Modal.open === 'function') {
            window.Modal.open({
                title: 'Klávesové zkratky',
                content: content,
                size: 'small'
            });
        }
    }
    
    return {
        showHelp,
        showFullDocumentation,
        showDocSection,
        showKeyboardShortcuts
    };
})();
