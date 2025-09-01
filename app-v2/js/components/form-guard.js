// Systém pro ochranu rozpracovaných formulářů
window.FormGuard = (function() {
    'use strict';
    
    let isDirty = false;
    let currentForm = null;
    let isNavigatingAway = false;
    
    // Sledovat změny ve formuláři
    function trackChanges(formSelector) {
        currentForm = document.querySelector(formSelector);
        if (!currentForm) return;
        
        // Resetovat stav
        isDirty = false;
        
        // Sledovat všechny inputy, selecty a textarey
        const inputs = currentForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            // Přeskočit hidden inputy
            if (input.type === 'hidden') return;
            
            input.addEventListener('change', () => {
                isDirty = true;
            });
            
            // Pro textové inputy sledovat i keyup
            if (input.type === 'text' || input.type === 'email' || input.type === 'tel' || input.tagName === 'TEXTAREA') {
                input.addEventListener('keyup', () => {
                    isDirty = true;
                });
            }
        });
    }
    
    // Resetovat stav (např. po uložení)
    function reset() {
        isDirty = false;
    }
    
    // Zkontrolovat před opuštěním
    function checkBeforeLeave(callback) {
        if (!isDirty || isNavigatingAway) {
            callback();
            return;
        }
        
        showLeaveDialog(callback);
    }
    
    // Zobrazit moderní dialog
    function showLeaveDialog(callback) {
        const dialog = document.createElement('div');
        dialog.className = 'form-guard-overlay';
        dialog.innerHTML = `
            <div class="form-guard-dialog">
                <div class="form-guard-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#f59e0b"/>
                    </svg>
                </div>
                <h3 class="form-guard-title">Máte rozpracovaný formulář</h3>
                <p class="form-guard-message">
                    Pokud nyní odejdete, ztratíte všechny neuložené změny.<br>
                    Co chcete udělat?
                </p>
                <div class="form-guard-actions">
                    <button class="form-guard-btn form-guard-btn-stay">
                        <span class="form-guard-btn-icon">💾</span>
                        Zůstat a dokončit
                    </button>
                    <button class="form-guard-btn form-guard-btn-leave">
                        <span class="form-guard-btn-icon">🚪</span>
                        Odejít bez uložení
                    </button>
                </div>
                <div class="form-guard-tip">
                    💡 Tip: Můžete také použít tlačítko "Uložit rozpracované" pro pozdější dokončení
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // Animace zobrazení
        requestAnimationFrame(() => {
            dialog.classList.add('show');
        });
        
        // Event handlery
        const stayBtn = dialog.querySelector('.form-guard-btn-stay');
        const leaveBtn = dialog.querySelector('.form-guard-btn-leave');
        
        stayBtn.addEventListener('click', () => {
            closeDialog(dialog);
        });
        
        leaveBtn.addEventListener('click', () => {
            isNavigatingAway = true;
            closeDialog(dialog, () => {
                isDirty = false;
                callback();
            });
        });
        
        // Zavřít po kliknutí na overlay
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                closeDialog(dialog);
            }
        });
    }
    
    // Zavřít dialog
    function closeDialog(dialog, callback) {
        dialog.classList.remove('show');
        setTimeout(() => {
            dialog.remove();
            if (callback) callback();
        }, 300);
    }
    
    // Přidat globální handler pro navigaci
    function interceptNavigation() {
        // Zachytit kliknutí na odkazy
        document.addEventListener('click', (e) => {
            // Najít nejbližší odkaz
            const link = e.target.closest('a, button[onclick]');
            if (!link) return;
            
            // Přeskočit odkazy vedoucí na stejnou stránku nebo modální okna
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('#')) return;
            
            // Přeskočit tlačítka pro uložení
            if (link.classList.contains('btn-primary') && link.textContent.includes('Uložit')) return;
            
            // Zkontrolovat dirty stav
            if (isDirty && !isNavigatingAway) {
                e.preventDefault();
                e.stopPropagation();
                
                checkBeforeLeave(() => {
                    // Pokračovat v navigaci
                    if (link.onclick) {
                        link.onclick();
                    } else if (href) {
                        window.location.href = href;
                    }
                });
            }
        }, true);
        
        // Browser back/forward tlačítka
        window.addEventListener('beforeunload', (e) => {
            if (isDirty && !isNavigatingAway) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }
    
    // Inicializace
    interceptNavigation();
    
    return {
        track: trackChanges,
        reset: reset,
        check: checkBeforeLeave,
        isDirty: () => isDirty
    };
})();
