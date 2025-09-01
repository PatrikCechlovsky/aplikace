// Komponenta Modal - modální okna
window.Modal = (function() {
    'use strict';
    
    let modal = null;
    let modalContent = null;
    let modalBody = null;
    let isOpen = false;
    
    // Inicializace
    function init() {
        modal = document.getElementById('modal');
        modalContent = document.getElementById('modalContent');
        modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalContent || !modalBody) {
            console.error('Modal elementy nebyly nalezeny');
            return false;
        }
        
        // Event listenery
        const closeBtn = document.getElementById('modalClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', close);
        }
        
        // Zavření po kliknutí na backdrop
        const backdrop = modal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', close);
        }
        
        // Zavření na ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                close();
            }
        });
        
        return true;
    }
    
    // Otevření modalu - UPRAVENÁ FUNKCE
    function open(options) {
        if (!modal) {
            if (!init()) return;
        }
        
        // Podpora pro staré volání (title, content) i nové (options)
        let title, content, buttons, size;
        
        if (typeof options === 'string') {
            // Staré volání: open(title, content)
            title = options;
            content = arguments[1] || '';
            buttons = [];
            size = 'medium';
        } else {
            // Nové volání: open({title, content, buttons, size})
            title = options.title || '';
            content = options.content || '';
            buttons = options.buttons || [];
            size = options.size || 'medium';
        }
        
        // Nastavení velikosti
        modalContent.className = 'modal-content';
        if (size === 'large') {
            modalContent.classList.add('modal-large');
        } else if (size === 'small') {
            modalContent.classList.add('modal-small');
        }
        
        // Vytvoření tlačítek
        let buttonsHtml = '';
        if (buttons.length > 0) {
            buttonsHtml = '<div class="modal-footer">';
            buttons.forEach((btn, index) => {
                const btnClass = btn.class || 'btn-secondary';
                const btnId = `modalBtn${index}`;
                buttonsHtml += `<button class="btn ${btnClass}" id="${btnId}">${btn.text}</button>`;
            });
            buttonsHtml += '</div>';
        }
        
        // Nastavení obsahu
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${title}</h2>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            ${buttonsHtml}
        `;
        
        // Přidat event handlery pro tlačítka
        if (buttons.length > 0) {
            setTimeout(() => {
                buttons.forEach((btn, index) => {
                    const btnEl = document.getElementById(`modalBtn${index}`);
                    if (btnEl && btn.onClick) {
                        btnEl.addEventListener('click', btn.onClick);
                    }
                });
            }, 10);
        }
        
        // Zobrazení
        modal.classList.add('active');
        isOpen = true;
        
        // Zakázat scrollování na pozadí
        document.body.style.overflow = 'hidden';
        
        // Nastavit stav
        if (window.AppState) {
            AppState.set('modalOpen', true);
        }
    }
    
    // Zavření modalu
    function close() {
        if (!modal) return;
        
        modal.classList.remove('active');
        isOpen = false;
        
        // Povolit scrollování
        document.body.style.overflow = '';
        
        // Vyčistit obsah
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 300);
        
        // Nastavit stav
        if (window.AppState) {
            AppState.set('modalOpen', false);
        }
    }
    
    // Veřejné API
    return {
        init,
        open,
        close,
        
        // Pomocné metody pro různé typy modalů
        confirm(title, message, onConfirm) {
            const content = `
                <p>${message}</p>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="Modal.close()">Zrušit</button>
                    <button class="btn btn-primary" id="modalConfirmBtn">Potvrdit</button>
                </div>
            `;
            
            open({
                title: title,
                content: content
            });
            
            // Přidat listener na potvrzení
            setTimeout(() => {
                const confirmBtn = document.getElementById('modalConfirmBtn');
                if (confirmBtn) {
                    confirmBtn.addEventListener('click', () => {
                        close();
                        if (onConfirm) onConfirm();
                    });
                }
            }, 100);
        }
    };
})();
