# Pravidla psaní dokumentace a centrální katalogy

---

## Pravidla pro úpravy a historii

- **Nic se nemaže, pouze se přeškrtává:**  
  Pokud je třeba cokoliv odstranit ze souboru (sekce, řádek, tabulka apod.), nikdy to nemaž!  
  Přeškrtni to pomocí Markdown syntaxe `~~text~~` a případně přidej důvod (např. `~~Nepoužívaný formulář~~ – nahrazen novým postupem`).  
  Tím zůstává historie zachována a je jasné, proč došlo ke změně. Pokud je některá sekce rozpracovaná nebo čeká na doplnění, označ ji jako > TODO: … nebo ⏳ rozpracováno.

- **Každá nová ikona se zapisuje do seznamu common-actions.md:**  
  Přidáš-li novou ikonu (pro tlačítko, akci…), vždy ji ihned zapiš do souboru [common-actions.md](./common-actions.md) v centrálním katalogu, včetně jejího významu a použití.  
  Pokud ikona přestane být používána, přeškrtni její řádek (nikdy nemaž).

---

## 1. Struktura modulů a souborů

- Každý modul začíná hlavním nadpisem `# Modul: Název`.
- Na začátek každého `.md` souboru modulu vlož vždy tabulku se stromovou strukturou celého modulu v tomto formátu:
  | Stav | Sekce | Popis |
  |------|-------|-------|
  | ✅   | 🟦 Seznam uživatelů | Hlavní dlaždice s přehledem uživatelů |
  |      | ├── 👁️ Přehled uživatelů |   Základní tabulka všech uživatelů |
  |      | ├── 📝 Přidat/pozvat uživatele |   Formulář pro přidání nebo pozvání |
  |      | └── 👁️ Detail uživatele |   Detailní pohled na uživatele |
  | ⏳   | ... | ... |
- Hlavní dlaždice mají stavovou ikonku, podúrovně jsou vizuálně odsazené pomocí stromových znaků a mezer.
- Struktura musí být vždy přehledná a aktuální.

## 1.1 Pravidlo pro správu stromové struktury modulů

- Stromovou tabulku struktury modulu musíš aktualizovat pokaždé, když přidáš, odebereš nebo upravíš jakoukoliv sekci, dlaždici, formulář nebo pohled.
- **Každou změnu této struktury ihned zapiš také do centrálního souboru [struktura-app.md](./struktura-app.md) – tento soubor obsahuje globální stromovou strukturu všech modulů.**
- Pokud sekci v aplikaci odstraníš, označ ji ve stromu ikonou stavu (např. 🚫) a přeškrtni její řádek.
- Stav položky označuj ikonou:  
  - ✅ hotovo, ⏳ rozpracováno, 🌐 hotovo v HTML, 🚫 odstraněno, …
- Každý vývojář/tester je povinen změnu stromu zahrnout do commitu/PR s úpravou funkcionality, včetně aktualizace `struktura-app.md`.

---

## 2. Centrální katalogy a odkazy

- [Centrální katalog tlačítek a ikon](./common-actions.md)
- [Centrální katalog oprávnění](./permissions-catalog.md)
- (můžeš přidat další: workflow, vzory notifikací, role, stavy, apod.)

---

## 3. Jak označovat sekce a formuláře

```markdown
## 🟦 Dlaždice: Stavy měřidel

### 📝 Formulář: Zadání odečtu měřidla
> Tento formulář je použit také v: Energie / Odečty

Popis formuláře, pole, validace atd.
```

---

## 4. Doporučené workflow pro údržbu

- Nové tlačítko vždy přidej do katalogu tlačítek.
- Nové oprávnění vždy přidej do katalogu oprávnění.
- Novou opakovanou sekci nebo formulář popiš a uveď odkazy, kde všude se používá.
- Pravidla dokumentace rozšiřuj pouze zde, ostatní soubory pouze odkazují sem.

---

## 5. Přehled dlaždic a formulářů

Globální tabulka všech dlaždic a opakovaných formulářů v aplikaci je udržována pouze v samostatném souboru [struktura-app.md](./struktura-app.md).

Pokud přidáváš nový modul, dlaždici nebo formulář, vždy aktualizuj i tuto tabulku!

---

## 6. Rozšiřování pravidel

- Pokud přidáš nové pravidlo, přidej ho pouze sem.
- Katalogy (tlačítka, oprávnění, stavy, workflow) rozšiřuj pouze v jednom centrálním místě.
- Všechny moduly mají pouze odkaz na pravidla, nemusíš aktualizovat každé zvlášť.

---

## 7. Povinná závěrečná struktura každého modulu

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

````markdown
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
