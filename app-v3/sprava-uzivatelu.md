# Správa uživatelů a modulů aplikace Pronajímatel

Tento dokument slouží jako hlavní poznámkový blok pro návrh správy uživatelů, rolí, práv, jednotek, funkcí, pozvánek, licencí a celkové struktury modulů aplikace Pronajímatel.

---

## 1. Uživatelé

| ID | Jméno      | Email               | Telefon        | Role           | Stav      | Pozvánka      | Datum vytvoření | Jednotky (ID) | Práva k jednotce    | Funkce              |
|----|------------|---------------------|----------------|----------------|-----------|---------------|-----------------|---------------|---------------------|---------------------|
| 1  | Patrik     | patrik@example.cz   | +420123456789  | Pronajímatel   | Aktivní   | —             | 08.09.2025      | 101           | Čtení, Platby       | Potvrzení o platbě  |
| 2  | Manželka   | manzelka@example.cz |                | Nájemník       | Pozváno   | invite_abc123 | 08.09.2025      | 101           | Čtení               | —                   |
| 3  | Syn        | syn@example.cz      |                | Nájemník       | Aktivní   | —             | 08.09.2025      | 101           | Platby              | —                   |
| 4  | Igor Šebek | igor@example.cz     |                | Správce        | Pozváno   | invite_def456 | 08.09.2025      |               |                     | —                   |

---

## 2. Role

- Pronajímatel
- Nájemník
- Zástupce
- Údržbář
- Administrátor
- Kontakt
- Správce nemovitostí
- Revizní technik
- Účetní

---

## 3. Stav

- aktivní
- archivováno
- pozváno
- zablokovan
- neaktivní

---

## 4. Práva k jednotce

- Čtení (náhled)
- Platby (možnost platit)
- Plný přístup (všechny funkce)

---

## 5. Funkce (oprávnění)

- Potvrzení o platbě
- Správa smluv
- Revize
- Archivace
- Zablokování

---

## 6. Pozvánky a ověřovací kódy

| Uživatelské ID | Stav pozvánky | Kód pro email   | Kód pro SMS | Poznámka        |
|----------------|---------------|-----------------|-------------|-----------------|
| 2              | Pozváno       | invite_abc123   | 123456      | Manželka        |
| 4              | Pozváno       | invite_def456   | 789456      | Igor Šebek      |

---

## 7. Licence

| ID licence | Typ licence | Uživatel (ID) | Platnost od  | Platnost do  | Aktivní |
|------------|-------------|---------------|--------------|--------------|---------|
| 1          | Standard    | 1             | 01.09.2025   | 01.09.2026   | Ano     |
| 2          | Premium     | 2             | 01.09.2025   | 01.09.2026   | Ne      |

---

## 8. Moduly a dlaždice aplikace

| Modul     | Dlaždice           | Propojení/dlaždice | Formulář                 |
|-----------|--------------------|--------------------|--------------------------|
| Uživatelé | založení uživatele | přehled            | Založení uživatele       |
|           | přehled            |                    |                          |
|           | Oprávnění          | založení uživatele | Seznam Oprávnění         |
|           | Funkce             | založení uživatele | Seznam Funkcí            |
|           | Role               | založení uživatele | Seznam rolí              |

---

## 9. Funkce (tlačítka/akce v aplikaci)

- ✅ Vytvořit uživatele
- 📨 Vygenerovat ověřovací kód (email + SMS)
- ✉️ Odeslat pozvánku
- 📑 Přidat dokument (např. nájemní smlouva, ověření identity)
- 🗄️ Archivovat uživatele
- ⛔ Zablokovat uživatele
- 🔒 Obnovit přístup
- 🧑‍💻 Zobrazit historii přihlášení / aktivit
- 🔁 Resetovat heslo
- ✳️ Přiřadit další roli / jednotku

---

## 10. Funkce (nad tabulkou nebo v řádku seznamu uživatelů)

- 🔍 Vyhledávání / filtrování (podle role, stavu, jednotky...)
- ➕ Přidat nového uživatele
- 📤 Export seznamu (např. do Excelu)
- 📥 Import uživatelů (např. z CSV)
- 📑 Zobrazit dokumenty
- ⛔ Zablokovat / Archivovat
- 🔁 Reset hesla
- ✳️ Správa oprávnění
- 📊 Statistiky přístupu / využití funkcí
---

## 11. Poznámky, nápady a úkoly

Sem si piš vše, co tě napadne, co je potřeba doplnit, změnit nebo vyřešit.

---
1. Historie změn / auditní log
  Sleduje kdo, kdy a co v uživatelských datech změnil (užitečné pro administrátory a při řešení reklamací).
2. Zabezpečení
  Nastavení síly hesla, expirace hesla, 2FA, blokace po více neúspěšných pokusech, případně logy přístupů.
3. Správa skupin / týmů
  Pokud budeš mít více jednotek/rolí, někdy se hodí přiřazovat práva/skupiny hromadně.
4. Oprávnění nad více objekty
  Máš práva k jednotce – chceš časem i práva např. ke konkrétním smlouvám, dokumentům, akcím (jemnější řízení oprávnění)?
5. Možné workflow pro schvalování
  Například: žádosti o změnu údajů, schvalování přijetí nájemníka, atd.
6. Notifikace
  Jaké události mají spouštět informování uživatelů (email, sms, interní oznámení)?
7. Export a import dat
  Procesy pro hromadný export/import uživatelů, audit, zálohování.
8. Uživatelské preference
  Např. jazyk rozhraní, nastavení notifikací, vlastní profilové údaje.
9. Přehled o vazbách mezi uživateli
  Kdo je např. odpovědný za jednotku, kdo je „hlavní nájemník“, kdo patří pod koho (hierarchie).


> Tento soubor slouží jako živý dokument a bude se rozšiřovat podle potřeb projektu.
