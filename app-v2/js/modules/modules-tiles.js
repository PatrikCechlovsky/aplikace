// V funkci handleTileClick přidáme:
function handleTileClick(module, action) {
    if (module && window[module]) {
        window[module].render(action);
        
        // Otevřít správnou sekci v sidebaru
        if (window.Sidebar && window.Sidebar.openOnlySection) {
            // Mapování modulů na sekce sidebaru
            const moduleMap = {
                'Pronajimatel': 'pronajimatel',
                'Najemnici': 'najemnici',
                'Nemovitosti': 'nemovitosti',
                'Smlouvy': 'smlouvy',
                'Platby': 'platby',
                // ... další mapování
            };
            
            const sidebarSection = moduleMap[module];
            if (sidebarSection) {
                window.Sidebar.openOnlySection(sidebarSection);
            }
        }
    }
}
