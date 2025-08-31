/* Dashboard a dlaždice - tmavý design */

/* Header dashboardu */
.dashboard-header {
    padding: 20px;
}

.dashboard-header h1 {
    font-size: 24px;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.dashboard-subtitle {
    color: var(--text-secondary);
    font-size: 14px;
}

/* Grid pro dlaždice */
.dashboard-tiles, .tiles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    padding: 0 20px 20px;
}

/* Hlavní styl dlaždice */
.tile {
    position: relative;
    background: var(--surface-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
}

/* Hover efekt */
.tile:hover {
    background: var(--surface-secondary);
    border-color: var(--border-secondary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Hlavička dlaždice */
.tile-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
}

.tile-icon {
    font-size: 24px;
}

/* Popis */
.tile-desc {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 12px;
}

/* Tagy */
.tile-tags {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.tile-tag {
    font-size: 11px;
    color: var(--brand-primary);
    background: rgba(88, 166, 255, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
}

/* Hvězdička pro oblíbené */
.favorite-button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
    padding: 4px;
    border-radius: var(--radius-sm);
    z-index: 10;
}

.tile:hover .favorite-button {
    opacity: 0.6;
}

.favorite-button:hover {
    opacity: 1 !important;
    background: rgba(255, 255, 255, 0.1);
}

.favorite-icon {
    font-size: 16px;
    color: var(--text-muted);
    transition: all 0.2s ease;
}

.favorite-button:hover .favorite-icon,
.favorite-button.active .favorite-icon {
    color: #fbbf24;
    text-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}

.tile.is-favorite .favorite-button {
    opacity: 1;
}

.tile.is-favorite .favorite-icon {
    color: #fbbf24;
}

/* Drag & Drop styly */
.tile.dragging {
    opacity: 0.5;
    cursor: grabbing;
    z-index: 1000;
}

.tile.drag-over {
    border-color: var(--brand-primary);
    background: rgba(88, 166, 255, 0.1);
}

/* Sekce oblíbených */
.favorites-section {
    margin-bottom: 32px;
}

.favorites-section h2 {
    font-size: 18px;
    color: var(--text-primary);
    margin: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.favorites-section .empty-state {
    background: var(--surface-primary);
    border: 1px dashed var(--border-secondary);
    border-radius: var(--radius-md);
    padding: 32px;
    text-align: center;
    color: var(--text-muted);
    font-size: 14px;
    margin: 0 20px;
}

/* Pořadí dlaždic je uložitelné */
.tile[data-order] {
    order: attr(data-order);
}
