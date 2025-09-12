> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)

# Modul: Správa uživatelů

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Seznam uživatelů | Hlavní dlaždice s přehledem uživatelů |
|      | ├── 👁️ Přehled uživatelů |   Základní tabulka všech uživatelů |
|      | ├── 📝 Přidat/pozvat uživatele |   Formulář pro přidání nebo pozvání uživatele |
|      | ├── 📝 Editace uživatele |   Formulář pro editaci uživatele |
|      | └── 👁️ Detail uživatele |   Detailní pohled na uživatele |
| ✅   | 🟦 Správa rolí a oprávnění | Správa uživatelských rolí a práv |
|      | ├── 👁️ Přehled rolí a oprávnění |   Seznam všech rolí a práv |
|      | ├── 📝 Přidat/editovat roli |   Formulář pro správu rolí |
|      | ├── 📝 Přidat/editovat funkci |   Formulář pro správu funkcí/oprávnění |
|      | ├── – Přehled rolí |   Seznam dostupných rolí |
|      | ├── – Přehled stavů |   Seznam možných stavů uživatele |
|      | ├── – Práva k jednotce |   Přehled práv k jednotce |
|      | └── – Funkce (oprávnění) |   Seznam funkcí/oprávnění |
| ✅   | 🟦 Přehled pozvánek | Přehled a správa pozvánek |
|      | └── 👁️ Seznam pozvánek a ověřovacích kódů |   Tabulka pozvánek a kódů |
| ✅   | 🟦 Správa licencí | Správa a přehled licencí |
|      | └── 👁️ Přehled licencí |   Tabulka licencí |
| ✅   | 🟦 Import/Export uživatelů | Import a export uživatelů |
| ✅   | 🟦 Auditní log / historie změn | Auditní záznamy a historie změn |
| ✅   | 🟦 Statistiky a využití | Statistiky používání modulu |
| 🚫   | ~~Staré struktury (textová a tabulková)~~ | ~~Původní strom a tabulka struktury – nahrazeno výše~~ |

---

🚫  
~~# Struktura modulu Správa uživatelů~~

~~📁 sprava-uzivatelu.md~~  
~~ 🟦 Seznam uživatelů~~  
~~  👁️ Přehled uživatelů~~  
~~  📝 Přidat/pozvat uživatele~~  
~~  📝 Editace uživatele~~  
~~  👁️ Detail uživatele~~  
~~ 🟦 Správa rolí a oprávnění~~  
~~  👁️ Přehled rolí a oprávnění~~  
~~  📝 Přidat/editovat roli~~  
~~  📝 Přidat/editovat funkci~~  
~~  - Přehled rolí~~  
~~  - Přehled stavů~~  
~~  - Práva k jednotce~~  
~~  - Funkce (oprávnění)~~  
~~ 🟦 Přehled pozvánek~~  
~~  👁️ Seznam pozvánek a ověřovacích kódů~~  
~~ 🟦 Správa licencí~~  
~~  👁️ Přehled licencí~~  
~~ 🟦 Import/Export uživatelů~~  
~~ 🟦 Auditní log / historie změn~~  

~~# Struktura modulu Správa uživatelů (tabulka)~~

~~|  |  |  |  |  |~~  
~~|---|---|---|---|---|~~  
~~| 📁 **sprava-uzivatelu.md** | 🟦 **Seznam uživatelů** | 👁️ Přehled uživatelů | 📝 Přidat/pozvat uživatele | 📝 Editace uživatele |~~  
~~|  |  | 👁️ Detail uživatele |  |  |~~  
~~|  | 🟦 **Správa rolí a oprávnění** | 👁️ Přehled rolí a oprávnění | 📝 Přidat/editovat roli | 📝 Přidat/editovat funkci |~~  
~~|  |  | – Přehled rolí | – Přehled stavů | – Práva k jednotce |~~  
~~|  |  | – Funkce (oprávnění) |  |  |~~  
~~|  | 🟦 **Přehled pozvánek** | 👁️ Seznam pozvánek a ověřovacích kódů |  |  |~~  
~~|  | 🟦 **Správa licencí** | 👁️ Přehled licencí |  |  |~~  
~~|  | 🟦 **Import/Export uživatelů** |  |  |  |~~  
~~|  | 🟦 **Auditní log / historie změn** |  |  |  |~~  

~~> Při každé změně obsahu tohoto modulu **aktualizuj tuto strukturu** zde i v souboru struktura-app.md!~~
---

## 🟦 Dlaždice: Seznam uživatelů

Přehled všech uživatelů v systému s možností rychlého vyhledání, filtrování, editace, správy oprávnění a exportu/importu.

### 👁️ Přehled uživatelů

| ID | Jméno      | Email               | Telefon        | Role           | Stav      | Pozvánka      | Datum vytvoření | Jednotky (ID) | Práva k jednotce    | Funkce              |
|----|------------|---------------------|----------------|----------------|-----------|---------------|-----------------|---------------|---------------------|---------------------|
| 1  | Patrik     | patrik@example.cz   | +420123456789  | Pronajímatel   | Aktivní   | —             | 08.09.2025      | 101           | Čtení, Platby       | Potvrzení o platbě  |
| 2  | Manželka   | manzelka@example.cz |                | Nájemník       | Pozváno   | invite_abc123 | 08.09.2025      | 101           | Čtení               | —                   |
| 3  | Syn        | syn@example.cz      |                | Nájemník       | Aktivní   | —             | 08.09.2025      | 101           | Platby              | —                   |
| 4  | Igor Šebek | igor@example.cz     |                | Správce        | Pozváno   | invite_def456 | 08.09.2025      |               |                     | —                   |

#### Akce v řádku:

- 👁️ Detail
- ✏️ Upravit
- 📨 Odeslat pozvánku
- 🗄️ Archivovat
- ⛔ Zablokovat
- 🔁 Reset hesla
- 🔒 Obnovit přístup
- 📑 Dokumenty uživatele
- ✳️ Správa oprávnění
- 🧑‍💻 Historie aktivit

#### Hromadné akce nad tabulkou

- ➕ Přidat uživatele
- 📤 Export
- 📥 Import
- ⛔ Hromadná archivace
- 🔁 Hromadný reset hesla
- ✳️ Hromadná správa oprávnění
- 📊 Statistiky
- 🔍 Filtrování

#### Poznámky k workflow

- Akce na řádku otevřou odpovídající modální dialog nebo stránku (detail, edit, potvrzení akce).
- Hromadné akce vyžadují označení více uživatelů.
- Filtrování/řízené vyhledávání podle role, stavu, jednotky, data apod.

#### Ukázka JSON struktury uživatele

```json
{
  "id": "1",
  "jmeno": "Patrik",
  "email": "patrik@example.cz",
  "telefon": "+420123456789",
  "role": "Pronajímatel",
  "stav": "aktivní",
  "datum_vytvoreni": "2025-09-08",
  "jednotky": ["101", "102"],
  "funkce": ["Platby", "Správa smluv"]
}
```

### 📝 Formulář: Přidat/pozvat uživatele

Popis polí, validací a chování formuláře pro přidání/pozvání uživatele.

### 📝 Formulář: Editace uživatele

Popis polí, validací a chování formuláře pro editaci uživatele.

### 👁️ Detail uživatele

Popis detailního zobrazení uživatele.

---

## 🟦 Dlaždice: Správa rolí a oprávnění

Možné jako samostatná sekce nebo součást detailu uživatele.

### 👁️ Přehled rolí a oprávnění

Seznam všech rolí a funkcí s možností editace.

### 📝 Formulář: Přidat/editovat roli

Formulář pro přidání nebo editaci role (pro administrátora).

### 📝 Formulář: Přidat/editovat funkci

Formulář pro přidání nebo editaci funkce/oprávnění (pro administrátora).

#### Přehled rolí

- Pronajímatel
- Nájemník
- Zástupce
- Údržbář
- Administrátor
- Kontakt
- Správce nemovitostí
- Revizní technik
- Účetní

#### Přehled stavů

- aktivní
- archivováno
- pozváno
- zablokován
- neaktivní

#### Práva k jednotce

- Čtení (náhled)
- Platby (možnost platit)
- Plný přístup (všechny funkce)

#### Funkce (oprávnění)

- Potvrzení o platbě
- Správa smluv
- Revize
- Archivace
- Zablokování

---

## 🟦 Dlaždice: Přehled pozvánek

Odeslané, čekající pozvánky.

### 👁️ Seznam pozvánek a ověřovacích kódů

| Uživatelské ID | Stav pozvánky | Kód pro email   | Kód pro SMS | Poznámka        |
|----------------|---------------|-----------------|-------------|-----------------|
| 2              | Pozváno       | invite_abc123   | 123456      | Manželka        |
| 4              | Pozváno       | invite_def456   | 789456      | Igor Šebek      |

---

## 🟦 Dlaždice: Správa licencí

Přiřazení a platnost licencí.

### 👁️ Přehled licencí

| ID licence | Typ licence | Uživatel (ID) | Platnost od  | Platnost do  | Aktivní |
|------------|-------------|---------------|--------------|--------------|---------|
| 1          | Standard    | 1             | 01.09.2025   | 01.09.2026   | Ano     |
| 2          | Premium     | 2             | 01.09.2025   | 01.09.2026   | Ne      |

---

## 🟦 Dlaždice: Import/Export uživatelů

Popis procesu importu/exportu uživatelů.

---

## 🟦 Dlaždice: Auditní log / historie změn

Sleduje, kdo, kdy a co v uživatelských datech změnil (užitečné pro administrátory a při řešení reklamací).

---

## 🟦 Dlaždice: Statistiky a využití

Přehled využití funkcí a aktivit uživatelů.

---

Poznámky, nápady a úkoly k modulu i dlaždicím

Sem si piš vše, co tě napadne, co je potřeba doplnit, změnit nebo vyřešit.

1. Historie změn / auditní log – sleduje kdo, kdy a co v uživatelských datech změnil (užitečné pro administrátory a při řešení reklamací).
2. Zabezpečení – nastavení síly hesla, expirace hesla, 2FA, blokace po více neúspěšných pokusech, případně logy přístupů.
3. Správa skupin / týmů – pokud budeš mít více jednotek/rolí, někdy se hodí přiřazovat práva/skupiny hromadně.
4. Oprávnění nad více objekty – máš práva k jednotce – chceš časem i práva např. ke konkrétním smlouvám, dokumentům, akcím (jemnější řízení oprávnění)?
5. Možné workflow pro schvalování – např. žádosti o změnu údajů, schvalování přijetí nájemníka, atd.
6. Notifikace – jaké události mají spouštět informování uživatelů (email, sms, interní oznámení)?
7. Export a import dat – procesy pro hromadný export/import uživatelů, audit, zálohování.
8. Uživatelské preference – např. jazyk rozhraní, nastavení notifikací, vlastní profilové údaje.
9. Přehled o vazbách mezi uživateli – kdo je např. odpovědný za jednotku, kdo je „hlavní nájemník“, kdo patří pod koho (hierarchie).

---

> Tento soubor slouží jako živý dokument a bude se rozšiřovat podle potřeb projektu.
