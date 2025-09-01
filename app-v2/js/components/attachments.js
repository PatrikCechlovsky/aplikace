// Systém pro správu příloh
window.AttachmentSystem = (function() {
    'use strict';
    
    // Uložiště příloh
    const storage = {
        attachments: JSON.parse(localStorage.getItem('attachments_data') || '{}'),
        files: JSON.parse(localStorage.getItem('attachments_files') || '{}')
    };
    
    // Uložit do localStorage
    function saveStorage() {
        localStorage.setItem('attachments_data', JSON.stringify(storage.attachments));
        localStorage.setItem('attachments_files', JSON.stringify(storage.files));
    }
    
    // Získat přílohy pro entitu
    function getAttachments(entityType, entityId) {
        const key = `${entityType}_${entityId}`;
        return storage.attachments[key] || [];
    }
    
    // Přidat přílohu
    function addAttachment(entityType, entityId, file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const attachment = {
                    id: Date.now().toString(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadedAt: new Date().toISOString(),
                    uploadedBy: 'PatrikCechlovsky'
                };
                
                // Uložit metadata
                const key = `${entityType}_${entityId}`;
                if (!storage.attachments[key]) {
                    storage.attachments[key] = [];
                }
                storage.attachments[key].push(attachment);
                
                // Uložit soubor jako base64
                storage.files[attachment.id] = e.target.result;
                
                saveStorage();
                resolve(attachment);
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    
    // Odstranit přílohu
    function removeAttachment(entityType, entityId, attachmentId) {
        const key = `${entityType}_${entityId}`;
        if (storage.attachments[key]) {
            storage.attachments[key] = storage.attachments[key].filter(a => a.id !== attachmentId);
            delete storage.files[attachmentId];
            saveStorage();
        }
    }
    
    // Stáhnout přílohu
    function downloadAttachment(attachmentId, fileName) {
        const data = storage.files[attachmentId];
        if (data) {
            const link = document.createElement('a');
            link.href = data;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    
    // Inicializovat tlačítko příloh pro formulář
    function initAttachmentButton(formId, entityType, entityId) {
        const form = document.querySelector(formId);
        if (!form) return;
        
        // Najít nebo vytvořit header formuláře
        let formHeader = form.querySelector('.form-header');
        if (!formHeader) {
            formHeader = document.createElement('div');
            formHeader.className = 'form-header';
            form.insertBefore(formHeader, form.firstChild);
        }
        
        // Vytvořit tlačítko příloh
        const attachments = getAttachments(entityType, entityId);
        const hasAttachments = attachments.length > 0;
        
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `attachment-button ${hasAttachments ? 'has-attachments' : ''}`;
        button.innerHTML = `
            <span class="attachment-icon">📎</span>
            ${hasAttachments ? `<span class="attachment-count">${attachments.length}</span>` : ''}
        `;
        button.title = hasAttachments ? `Přílohy (${attachments.length})` : 'Přidat přílohu';
        
        button.addEventListener('click', () => {
            showAttachmentDialog(entityType, entityId);
        });
        
        formHeader.appendChild(button);
    }
    
    // Zobrazit dialog pro přílohy
    function showAttachmentDialog(entityType, entityId) {
        const attachments = getAttachments(entityType, entityId);
        
        Modal.show({
            title: 'Správa příloh',
            size: 'medium',
            content: `
                <div class="attachment-dialog">
                    <div class="attachment-upload">
                        <input type="file" id="attachment-file" multiple style="display: none;">
                        <button type="button" class="btn btn-primary" onclick="document.getElementById('attachment-file').click()">
                            <span>📎</span> Přidat soubory
                        </button>
                        <p class="form-help">Maximální velikost souboru: 10 MB</p>
                    </div>
                    
                    <div class="attachment-list">
                        <h4>Přiložené soubory</h4>
                        ${attachments.length === 0 ? 
                            '<p class="empty-state-text">Zatím nejsou přiloženy žádné soubory</p>' :
                            `<table class="attachment-table">
                                <thead>
                                    <tr>
                                        <th>Název souboru</th>
                                        <th>Velikost</th>
                                        <th>Datum nahrání</th>
                                        <th>Akce</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${attachments.map(att => `
                                        <tr>
                                            <td class="attachment-name">
                                                ${getFileIcon(att.type)} ${att.name}
                                            </td>
                                            <td>${formatFileSize(att.size)}</td>
                                            <td>${formatDate(att.uploadedAt)}</td>
                                            <td>
                                                <button class="btn-icon" onclick="AttachmentSystem.downloadAttachment('${att.id}', '${att.name}')" title="Stáhnout">
                                                    ⬇️
                                                </button>
                                                <button class="btn-icon btn-danger" onclick="AttachmentSystem.removeAndRefresh('${entityType}', '${entityId}', '${att.id}')" title="Odstranit">
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>`
                        }
                    </div>
                </div>
            `,
            onOpen: () => {
                // Handler pro nahrávání souborů
                const fileInput = document.getElementById('attachment-file');
                fileInput.addEventListener('change', async (e) => {
                    const files = Array.from(e.target.files);
                    
                    for (const file of files) {
                        if (file.size > 10 * 1024 * 1024) {
                            alert(`Soubor ${file.name} je příliš velký. Maximum je 10 MB.`);
                            continue;
                        }
                        
                        try {
                            await addAttachment(entityType, entityId, file);
                        } catch (error) {
                            console.error('Chyba při nahrávání:', error);
                            alert(`Chyba při nahrávání souboru ${file.name}`);
                        }
                    }
                    
                    // Obnovit dialog
                    Modal.hide();
                    showAttachmentDialog(entityType, entityId);
                    
                    // Aktualizovat tlačítko
                    updateAttachmentButton(entityType, entityId);
                });
            }
        });
    }
    
    // Odstranit a obnovit dialog
    function removeAndRefresh(entityType, entityId, attachmentId) {
        if (confirm('Opravdu chcete odstranit tuto přílohu?')) {
            removeAttachment(entityType, entityId, attachmentId);
            Modal.hide();
            showAttachmentDialog(entityType, entityId);
            updateAttachmentButton(entityType, entityId);
        }
    }
    
    // Aktualizovat tlačítko příloh
    function updateAttachmentButton(entityType, entityId) {
        const button = document.querySelector('.attachment-button');
        if (button) {
            const attachments = getAttachments(entityType, entityId);
            const hasAttachments = attachments.length > 0;
            
            button.className = `attachment-button ${hasAttachments ? 'has-attachments' : ''}`;
            button.innerHTML = `
                <span class="attachment-icon">📎</span>
                ${hasAttachments ? `<span class="attachment-count">${attachments.length}</span>` : ''}
            `;
            button.title = hasAttachments ? `Přílohy (${attachments.length})` : 'Přidat přílohu';
        }
    }
    
    // Pomocné funkce
    function getFileIcon(mimeType) {
        if (mimeType.includes('pdf')) return '📄';
        if (mimeType.includes('image')) return '🖼️';
        if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
        if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊';
        if (mimeType.includes('zip') || mimeType.includes('rar')) return '🗜️';
        return '📎';
    }
    
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('cs-CZ') + ' ' + date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
    }
    
    return {
        init: initAttachmentButton,
        getAttachments,
        addAttachment,
        removeAttachment,
        downloadAttachment,
        removeAndRefresh,
        showAttachmentDialog
    };
})();
