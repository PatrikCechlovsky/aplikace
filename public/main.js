// Hlavní JS modul aplikace pronajímatel
// Accordion menu functionality for sidebar

document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplikace pronajímatel spuštěna.');
    
    // Initialize accordion menu
    initializeAccordionMenu();
});

function initializeAccordionMenu() {
    const sidebarSections = document.querySelectorAll('.sidebar-section');
    
    // Ensure only the first section is expanded by default
    sidebarSections.forEach((section, index) => {
        const header = section.querySelector('.sidebar-section-header');
        const expandIcon = section.querySelector('.sidebar-expand');
        
        if (index === 0) {
            // First section should be expanded
            section.classList.add('expanded');
            if (expandIcon) expandIcon.textContent = '▼';
        } else {
            // All other sections should be collapsed
            section.classList.remove('expanded');
            if (expandIcon) expandIcon.textContent = '▶';
        }
        
        // Add click event listener to header
        if (header) {
            header.addEventListener('click', function() {
                toggleSection(section);
            });
        }
    });
}

function toggleSection(clickedSection) {
    const allSections = document.querySelectorAll('.sidebar-section');
    const isCurrentlyExpanded = clickedSection.classList.contains('expanded');
    const clickedExpandIcon = clickedSection.querySelector('.sidebar-expand');
    
    // Close all sections first
    allSections.forEach(section => {
        const expandIcon = section.querySelector('.sidebar-expand');
        section.classList.remove('expanded');
        if (expandIcon) expandIcon.textContent = '▶';
    });
    
    // If the clicked section was not expanded, expand it
    if (!isCurrentlyExpanded) {
        clickedSection.classList.add('expanded');
        if (clickedExpandIcon) clickedExpandIcon.textContent = '▼';
    }
}