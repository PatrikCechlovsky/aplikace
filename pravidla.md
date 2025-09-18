## Dohoda s Copilotem

Copilot i další spolupracovníci vždy automaticky dodržují workflow, checklisty a pravidla uvedená v tomto souboru.  
Není třeba pravidla a workflow v zadáních opakovat – platí pro všechny změny, moduly, sekce, assety i dokumentaci.

Pokud je třeba udělat výjimku (mazání, přeskočení pravidla…), musí být výslovně uvedena v zadání nebo schválena vlastníkem projektu.

---

<!-- NOVÉ PRAVIDLO: Propojitelnost, společná databáze, nemazat -->

## 🆕 Zásadní pravidla pro propojitelnost a správu historie
> Tato pravidla platí NADŘAZENĚ ke všem ostatním.
> 
> - Všechny subjekty (osoba, OSVČ, firma, spolek/skupina, státní organizace, zástupce atd.) jsou vedeny ve společné databázi/tabulce (entita `subjekt`). Typ určuje pole `typ_subjektu`.
> - Všechny vazby mezi moduly/entitami (pronajímatel-nemovitost, nájemník-jednotka, smlouva-nájemník atd.) jsou realizovány přes unikátní ID (např. `pronajimatel_id`, `jednotka_id`), nikdy ne pouze přes text/název.
> - Formuláře, tabulky i importy/exporty musí pole s vazbou řešit vždy přes výběr z existující entity (číselník), nikoliv volným textem.
> - Každý formulář i tabulka musí dynamicky zobrazovat pole podle zvoleného typu subjektu (např. IČO/DIČ pro firmy, datum narození pro osobu atd.).
> - Importy, exporty, datové modely a API vždy obsahují pole `typ_subjektu` a ID všech vazeb (např. `jednotka_id`, `pronajimatel_id`). Ukázkové JSONy vždy ukazují vazby přes ID.
> - **Žádný obsah v dokumentaci ani datech se nesmí mazat!**  
>   Používej pouze přeškrtnutí (strikethrough, `~~text~~`), přesuny, komentáře a rozšiřování. Historii a kontext je nutné zachovat!
> - Každý návrh změny, rozšíření či refaktoringu musí zachovat historii (přeškrtni staré, přidej nové, nikdy neodstraňuj).
> - Každý modul musí na začátku obsahovat reference na ostatní související moduly.
> - Checklist každé sekce musí obsahovat bod „Vazby na ostatní entity přes ID“.
> - Všechny nové ikony a akce musí být zapsány do centrálního katalogu ([common-actions.md](./common-actions.md)).
> - Každý JSON příklad (včetně v dokumentaci) musí ukazovat vazby mezi entitami pomocí ID.
> - Každou změnu stromové struktury modulu vždy zapiš také do centrálního souboru [struktura-app.md](./struktura-app.md).

---

# Pravidla dokumentace, struktury a propojitelnosti modulů

---

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

---

<!-- Další pravidla a checklisty dle verze 4 -->

## Struktura dokumentace a checklisty

Každý modul a každá jeho sekce (dlaždice, formulář) musí obsahovat na začátku checklist (viz níže), tabulku se stromovou strukturou a odkazy na související moduly.

### Checklist pro dokumentaci sekce/dlaždice a formuláře

#### 1️⃣ Popis a účel
- [ ] Účel sekce/dlaždice (proč existuje, kdo ji používá)
- [ ] Kdo má přístup/viditelnost podle oprávnění/rolí

#### 2️⃣ Stromová struktura / navigace
- [ ] Zařazení v hlavní stromové struktuře
- [ ] Podsekce a vazby na další části (např. detail, editace, přidání...)

#### 3️⃣ Přehledová tabulka / seznam (pokud existuje)
- [ ] Výčet a popis všech sloupců (název, význam, povinný/volitelný, filtr/řazení)
- [ ] Filtrování a řazení (jaké možnosti, kde jsou dostupné)
- [ ] Akce v řádku (ikony/tlačítka, popis co dělají, u jakého stavu jsou viditelné)
- [ ] Hromadné akce nad tabulkou (výčet, kdo může spustit)
- [ ] Ukázka tabulky s příklady

#### 4️⃣ Formulář (přidání/editace)
- [ ] Výčet a popis všech polí (povinné x nepovinné, typ pole, validace)
- [ ] Výchozí hodnoty, předvyplnění, skryté pole
- [ ] Stavové pole (aktivní, zablokován, ...), kdo je může měnit
- [ ] Tlačítka ve formuláři (uložit, zrušit, další speciální akce)
- [ ] Jaké validace probíhají (na úrovni pole, na úrovni formuláře)
- [ ] Chování po odeslání (co se stane, jaké akce, notifikace)

#### 5️⃣ Detail záznamu
- [ ] Co vše se zobrazuje v detailu (všechna pole, historie, audit, navazující akce)
- [ ] Akce dostupné v detailu (editace, deaktivace, atd.)

#### 6️⃣ Akce a workflow
- [ ] Přehled všech možných akcí (kdy, kdo, s jakým oprávněním)
- [ ] Stavové přechody (jaké jsou povolené přechody mezi stavy, kdo je může provádět)
- [ ] Napojení na další workflow (notifikace, audit, schvalování, ...)

#### 7️⃣ Oprávnění a viditelnost
- [ ] Přehled rolí, které mají přístup (tabulka rolí x akce)
- [ ] Specifika pro různé role (např. admin může vždy, běžný uživatel nikdy)

#### 8️⃣ Chybové stavy a validace
- [ ] Výčet typických chybových stavů (duplicitní záznam, neplatný formát, ...)
- [ ] Uživatelské hlášky (co přesně se zobrazí)
- [ ] Specifika pro import/export (chyby při importu, validace dat)

#### 9️⃣ Exporty, importy, audit, GDPR
- [ ] Možnosti exportu/importu (jaký formát, kdo může)
- [ ] Logování a audit (kdo, kdy, co změnil)
- [ ] GDPR požadavky (export osobních údajů, anonymizace, ...)

#### 🔟 Vazby na další moduly a reference
- [ ] Na jaké další moduly sekce/formulář navazuje
- [ ] Reference na související workflow, entity, dokumentaci

#### 1️⃣1️⃣ Specifika a rozšíření
- [ ] Speciální workflow (SSO, API účet, 2FA, ...), bezpečnostní poznámky
- [ ] Možné rozšíření do budoucna, TODO, poznámky

---

> **Použití:**  
> - Vždy zkopíruj tento checklist na začátek každé sekce/dlaždice/formuláře.
> - Postupně si odškrtávej (nebo zvýrazni), co máš zpracováno.
> - Pokud něco chybí, doplň do dokumentace, nebo napiš, a já ti pomohu konkrétní část rozpracovat.

---

## Centrální katalogy a odkazy

- [Centrální katalog tlačítek a ikon](./common-actions.md)
- [Centrální katalog oprávnění](./permissions-catalog.md)
- (můžeš přidat další: workflow, vzory notifikací, role, stavy, apod.)

---

## Jak označovat sekce a formuláře

```markdown
## 🟦 Dlaždice: Stavy měřidel

### 📝 Formulář: Zadání odečtu měřidla
> Tento formulář je použit také v: Energie / Odečty

Popis formuláře, pole, validace atd.
```

---

## Doporučené workflow pro údržbu

- Nové tlačítko vždy přidej do katalogu tlačítek.
- Nové oprávnění vždy přidej do katalogu oprávnění.
- Novou opakovanou sekci nebo formulář popiš a uveď odkazy, kde všude se používá.
- Pravidla dokumentace rozšiřuj pouze zde, ostatní soubory pouze odkazují sem.

---

## Přehled dlaždic a formulářů

Globální tabulka všech dlaždic a opakovaných formulářů v aplikaci je udržována pouze v samostatném souboru [struktura-app.md](./struktura-app.md).

Pokud přidáváš nový modul, dlaždici nebo formulář, vždy aktualizuj i tuto tabulku!

---

## Rozšiřování pravidel

- Pokud přidáš nové pravidlo, přidej ho pouze sem.
- Katalogy (tlačítka, oprávnění, stavy, workflow) rozšiřuj pouze v jednom centrálním místě.
- Všechny moduly mají pouze odkaz na pravidla, nemusíš aktualizovat každé zvlášť.

---

## Povinná závěrečná struktura každého modulu

Na konci každého modulu (každého `.md` souboru modulu) vždy zařaď následující sekce — a to i tehdy, pokud budou zatím prázdné nebo stručné (pro jednotnost a snadné rozšiřování):

> **Pozor:** Pokud chceš nějakou sekci odstranit, pouze ji přeškrtni (nikdy nemaž), případně doplň poznámku proč.

- 🗃️ **Datové modely (ukázka)**
  - (např. JSON struktura uživatele, pozvánky, transakce…)
  - **Forma:** kódový blok (např. JSON, YAML, tabulka polí) + krátký popis.
- ⚠️ **Chybové stavy a výjimky**
  - (tabulka nebo seznam možných chyb a jejich řešení)
  - **Forma:** tabulka s popisem chyby, řešení a textem hlášky.
- 🛡️ **Role a oprávnění**
  - (tabulka přehledu, kdo má práva na jaké akce)
  - **Forma:** tabulka (Akce × Role).
- 📑 **Doporučené workflow**
  - (stručný seznam typických uživatelských scénářů)
  - **Forma:** číslovaný nebo bodový seznam.
- 📚 **Reference**
  - (odkazy na související moduly, katalogy, případně externí zdroje)
  - **Forma:** seznam odkazů.

**Vzorová struktura na konci každého modulu:**

```markdown
## 🗃️ Datové modely (ukázka)
```json
{
  "id": 1,
  "nazev": "Modul 1"
}
```
Pole:
- `id`: unikátní identifikátor
- `nazev`: název modulu

## ⚠️ Chybové stavy a výjimky
| Chyba           | Řešení        | Hláska            |
|-----------------|--------------|-------------------|
| Chyba připojení | Zkontrolovat síť | "Nelze se připojit" |
| ~~Chyba X~~     | ~~X~~        | ~~"X"~~           |

## 🛡️ Role a oprávnění
| Akce         | Uživatel | Admin |
|--------------|:--------:|:-----:|
| Přidat       | ✅       | ✅    |
| Smazat       | ❌       | ✅    |
| ~~Exportovat~~| ❌      | ❌    |

## 📑 Doporučené workflow
1. Vyplň formulář.
2. Ulož změny.
3. ~~Tiskni sestavu.~~ (nahrazeno exportem)
4. > TODO: Doplnit exportní scénář.

## 📚 Reference
- [Katalog tlačítek](./common-actions.md)
- [Oprávnění](./permissions-catalog.md)
```

---

# 📜 Historie a archiv starších pravidel

> **Poznámka:**  
> Veškeré dřívější verze pravidel (verze 1–3) jsou archivovány v Git historii tohoto souboru.  
> Všechny body, které nejsou výslovně uvedeny výše nebo byly změněny, jsou považovány za nahrazené nebo přeškrtnuté touto verzí.  
>  
> Pokud potřebujete referenci ke starším pravidlům, podívejte se do historie změn v Gitu nebo v předchozích commitech.

~~Původní pravidla pro workflow, strukturu dat a dokumentace byla nahrazena výše uvedenými body.~~  
~~Historie je zachována pouze pro audit a referenci.~~

---

> Tento dokument vznikl sloučením všech dosavadních pravidel, checklistů a workflow.  
> **Nic se nesmí mazat, pouze přeškrtávat!**
