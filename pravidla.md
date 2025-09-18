## Pravidla pro složky, datové uložiště a rozšiřitelnost modulů

> Tato pravidla rozšiřují a upřesňují základní workflow a strukturu aplikace.  
> **Platí pro všechny moduly, sekce, dlaždice i práci s daty v celé aplikaci.**

### 1. Centrální datové uložiště (store)
- Veškerá sdílená aplikační data (například seznam subjektů, uživatelů, jednotek, atd.) jsou uložena ve společném souboru:
    - **Cesta:** `app-v3/shared/dataStore.js`
- Tento soubor obsahuje export všech datových struktur, entit, vazeb a funkcí pro jejich správu.
- Každý modul nebo sekce, která potřebuje pracovat s těmito daty, importuje přímo z tohoto souboru.
- Nové pole nebo entitu přidávej vždy pouze do `dataStore.js` – nikdy ne samostatně v modulu!

### 2. Struktura složek pro moduly a dlaždice
- Každý samostatný modul má svou vlastní složku ve tvaru:  
  `app-v3/modules/XXX-nazev/`  
  kde `XXX` je číselné označení modulu dle pořadí (např. `010-users`, `020-account`).
- V každé složce modulu musí být minimálně:
    - `index.html` – hlavní stránka/šablona modulu
    - `index.js` – logika a obsluha modulu
    - `index.css` – styly pouze pro tento modul (volitelné)
- Každá dlaždice na hlavním panelu (dashboardu) reprezentuje jeden modul a odkazuje na jeho `index.html`.
- Všechny odkazy na moduly a jejich dlaždice musí být vždy aktuální a vedené centrálně v přehledu (`struktura-app.md`).

### 3. Pravidla pro rozšiřování a vkládání nových sekcí
- Novou sekci, modul nebo entitu vždy zakládej jako novou složku dle výše uvedené struktury.
- Změnu nebo rozšíření datového modelu prováděj pouze v `shared/dataStore.js` – nikdy ne přímo ve specifickém modulu.
- Pokud rozšiřuješ datovou strukturu (například přidáváš pole), uprav `dataStore.js` a aktualizuj všechny moduly, které tato data používají.
- Vždy zachovej zpětnou kompatibilitu a historii změn (používej přeškrtnutí, komentáře, nikoliv mazání).

### 4. Propojování modulů a sdílení dat
- Moduly nikdy neuchovávají vlastní kopie společných dat – vždy používají import ze společného uložiště.
- Všechny vazby mezi entitami (například uživatel–role, nemovitost–pronajímatel) jsou realizovány přes unikátní ID a jejich pole jsou vždy přítomna v centrálním datovém modelu.
- Každý modul na začátku obsahuje reference na ostatní související moduly dle potřeby.

### 5. Checklist pro nové moduly a sekce
- [ ] Složka modulu dle konvence `XXX-nazev`
- [ ] `index.html`, `index.js` (+ volitelně `index.css`) ve složce modulu
- [ ] Odkaz z dashboardové dlaždice na `index.html` modulu
- [ ] Import a práce s daty pouze ze `shared/dataStore.js`
- [ ] Všechny vazby realizovány přes ID
- [ ] Reference na související moduly na začátku
- [ ] Zápis změn do `struktura-app.md` a případně do katalogu ikon/akcí

---

Tato pravidla jsou **závazná pro všechny změny, nové moduly i rozšiřování aplikace**.  
Pokud je třeba udělat výjimku, je nutná výslovná poznámka v zadání nebo schválení vlastníkem projektu.

<!-- Konec nové sekce, další původní obsah zůstává beze změny -->