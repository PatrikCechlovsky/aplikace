# Skeleton layout pro Aplikace pronajímatel

Toto je základní vzhled layoutu nové generace aplikace (PC verze):

- **Sidebar** vlevo – logo, název, základní navigace (zatím jen Přehled)
- **Topbar** – breadcrumbs (osnova), akční ikonky vpravo (help, notifikace, profil)
- **Akční lišta** nad obsahem – připravená tlačítka pro akce dle common-actions.md (Přidat, Editovat, Smazat, Exportovat, Tisk…)
- **Hlavní pracovní plocha** – připravena na dashboard, přehled, formuláře i dlaždice

## Ikony

Použito základní řešení pomocí CSS tříd (`icon-home`, `icon-help` atd.), snadno lze nahradit SVG nebo ikonfontem.

## Další postup

- Moduly a konkrétní workflow přidávej až podle skutečné potřeby/rozhodnutí.
- Akční lištu i topbar můžeš upravovat dle obsahu a inspirace z `common-actions.md`.
- Stylování můžeš rozšiřovat nebo použít pluginy/frameworky (Tailwind, Material, ...).

---