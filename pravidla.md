# Pravidla psaní dokumentace a centrální katalogy

---

## 1. Struktura modulů a souborů

- Každý modul začíná hlavním nadpisem `# Modul: Název`.
- Hlavní sekce modulu (dlaždice) označuj jako `## 🟦 Dlaždice: NázevDlaždice`.
- Každý formulář označuj jako `### 📝 Formulář: NázevFormuláře`.
- Pokud se formulář opakuje v různých modulech, přidej poznámku „Tento formulář je použit také v: ...“.
- Na začátek každého modulu vlož jen tento odkaz na pravidla:
  > ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)
- Další odkazy (katalog tlačítek, oprávnění atd.) budou jen zde v tomto souboru a tady se budou rozšiřovat.

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

## 5. Přehled dlaždic a formulářů (volitelně)

Můžeš zde vést globální tabulku všech dlaždic a opakovaných formulářů v aplikaci:

| Modul       | Dlaždice           | Formulář            | Opakuje se v modulech         |
|-------------|--------------------|---------------------|-------------------------------|
| Služby      | Stavy měřidel      | Zadání odečtu       | Energie                       |
| Energie     | Odečty             | Zadání odečtu       | Služby                        |
| Služby      | Vyúčtování služeb  | Zadání vyúčtování   | Energie                       |
| Energie     | Podklady pro vyúčtování | Zadání vyúčtování| Služby                        |
| ...         | ...                | ...                 | ...                           |

Tuto tabulku můžeš rozšiřovat podle potřeby nebo vést i v samostatném souboru.

---

## 6. Rozšiřování pravidel

- Pokud přidáš nové pravidlo, přidej ho pouze sem.
- Katalogy (tlačítka, oprávnění, stavy, workflow) rozšiřuj pouze v jednom centrálním místě.
- Všechny moduly mají pouze odkaz na pravidla, nemusíš aktualizovat každé zvlášť.

---

> Tento soubor je jediný zdroj pravdy pro pravidla dokumentace v projektu. Všechny změny, přehledy a rozšiřování prováděj zde.