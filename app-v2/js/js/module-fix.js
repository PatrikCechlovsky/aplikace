// Dočasná oprava pro sjednocení ID napříč moduly
(function() {
    'use strict';
    
    // Seznam všech modulů které potřebují opravu
    const modules = [
        'Pronajimatel', 'Najemnici', 'Nemovitosti', 'Smlouvy',
        'Platby', 'Sluzby', 'Reporty', 'Finance', 'Energie',
        'Udrzba', 'Dokumenty', 'Komunikace', 'Uzivatele',
        'Nastaveni', 'MujUcet'
    ];
    
    // Pro každý modul přepíšeme render metodu
    modules.forEach(moduleName => {
        if (window[moduleName] && window[moduleName].render) {
            const originalRender = window[moduleName].render;
            window[moduleName].render = function() {
                // Volej původní render
                const result = originalRender.apply(this, arguments);
                
                // Pokud se pokusil použít špatné ID, zkopíruj obsah
                const wrongContainer = document.getElementById('mainContent');
                const rightContainer = document.getElementById('main-content');
                
                if (wrongContainer && rightContainer && wrongContainer.innerHTML) {
                    rightContainer.innerHTML = wrongContainer.innerHTML;
                    wrongContainer.innerHTML = '';
                }
                
                return result;
            };
        }
    });
})();
