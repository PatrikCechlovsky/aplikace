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
    
    // Otevření modalu
    function open(title, content) {
        if (!modal) {
            if (!init()) return;
        }
        
        // Nastavení obsahu
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${title}</h2>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        `;
        
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
            
            open(title, content);
            
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
