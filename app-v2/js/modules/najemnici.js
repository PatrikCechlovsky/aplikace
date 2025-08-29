window.Najemnici = (function() {
    'use strict';
    
    function render(type = 'tiles') {
        const container = document.getElementById('mainContent');
        if (!container) return;
        
        // Pokud chceme dlaždice
        if (type === 'tiles' || type === '') {
            // Zobraz dlaždice
            if (window.ModuleTiles) {
                window.ModuleTiles.renderTiles({
                    module: 'Najemnici',
                    title: 'Nájemníci',
                    icon: '👥',
                    tiles: [
                        {
                            id: 'vsichni-najemnici',
                            title: 'Všichni nájemníci',
                            description: 'Seznam všech osob a kontaktů',
                            icon: '👥',
                            color: 'tile-primary',
                            module: 'Najemnici',
                            action: 'all'
                        },
                        {
                            id: 'fyzicke-osoby',
                            title: 'Fyzické osoby',
                            description: 'Soukromí jednotlivci, občané',
                            icon: '👤',
                            color: 'tile-blue',
                            module: 'Najemnici',
                            action: 'fyzicke'
                        },
                        {
                            id: 'pravnicke-osoby',
                            title: 'Právnické osoby',
                            description: 'Firmy, společnosti, organizace',
                            icon: '🏢',
                            color: 'tile-purple',
                            module: 'Najemnici',
                            action: 'pravnicke'
                        }
                    ]
                });
                return;
            }
        }
        
        // Původní kód pro zobrazení dat
        let content = `
            <div class="module-header">
                <h2>👥 Nájemníci</h2>
            </div>
        `;
        
        switch(type) {
            case 'fyzicke':
                content += renderFyzickeOsoby();
                break;
            case 'pravnicke':
                content += renderPravnickeOsoby();
                break;
            case 'all':
            default:
                content += renderVsichniNajemnici();
                break;
        }
        
        container.innerHTML = content;
    }
    
    function renderVsichniNajemnici() {
        return `<p>Seznam všech nájemníků</p>`;
    }
    
    function renderFyzickeOsoby() {
        return `<p>Seznam fyzických osob</p>`;
    }
    
    function renderPravnickeOsoby() {
        return `<p>Seznam právnických osob</p>`;
    }
    
    return {
        render: render
    };
})();
