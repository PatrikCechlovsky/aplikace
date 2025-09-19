## ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře

### 1️⃣ Popis a účel
- [x] Účel sekce/dlaždice (proč existuje, kdo ji používá)
- [x] Kdo má přístup/viditelnost podle oprávnění/rolí

### 2️⃣ Stromová struktura / navigace
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce a vazby na další části (např. detail, editace, přidání...)

### 3️⃣ Přehledová tabulka / seznam (pokud existuje)
- [x] Výčet a popis všech sloupců (název, význam, povinný/volitelný, filtr/řazení)
- [x] Filtrování a řazení (jaké možnosti, kde jsou dostupné)
- [x] Akce v řádku (ikony/tlačítka, popis co dělají, u jakého stavu jsou viditelné)
- [x] Hromadné akce nad tabulkou (výčet, kdo může spustit)
- [x] Ukázka tabulky s příklady

### 4️⃣ Formulář (přidání/editace)
- [x] Výčet a popis všech polí (povinné x nepovinné, typ pole, validace)
- [x] Výchozí hodnoty, předvyplnění, skryté pole
- [x] Stavové pole (aktivní, zablokován, ...), kdo je může měnit
- [x] Tlačítka ve formuláři (uložit, zrušit, další speciální akce)
- [x] Jaké validace probíhají (na úrovni pole, na úrovni formuláře)
- [x] Chování po odeslání (co se stane, jaké akce, notifikace)

### 5️⃣ Detail záznamu
- [x] Co vše se zobrazuje v detailu (všechna pole, historie, audit, navazující akce)
- [x] Akce dostupné v detailu (editace, deaktivace, atd.)

### 6️⃣ Akce a workflow
- [x] Přehled všech možných akcí (kdy, kdo, s jakým oprávněním)
- [x] Stavové přechody (jaké jsou povolené přechody mezi stavy, kdo je může provádět)
- [x] Napojení na další workflow (notifikace, audit, schvalování, ...)

### 7️⃣ Oprávnění a viditelnost
- [x] Přehled rolí, které mají přístup (tabulka rolí x akce)
- [x] Specifika pro různé role (např. admin může vždy, běžný uživatel nikdy)

### 8️⃣ Chybové stavy a validace
- [x] Výčet typických chybových stavů (duplicitní záznam, neplatný formát, ...)
- [x] Uživatelské hlášky (co přesně se zobrazí)
- [x] Specifika pro import/export (chyby při importu, validace dat)

### 9️⃣ Exporty, importy, audit, GDPR
- [x] Možnosti exportu/importu (jaký formát, kdo může)
- [x] Logování a audit (kdo, kdy, co změnil)
- [x] GDPR požadavky (export osobních údajů, anonymizace, ...)

### 🔟 Vazby na další moduly a reference
- [x] Na jaké další moduly sekce/formulář navazuje
- [x] Reference na související workflow, entity, dokumentaci

### 1️⃣1️⃣ Specifika a rozšíření
- [x] Speciální workflow (SSO, API účet, 2FA, ...), bezpečnostní poznámky
- [x] Možné rozšíření do budoucna, TODO, poznámky

---

# 🟦 Seznam uživatelů

## 1️⃣ Popis a účel

Přehled všech uživatelů v systému s možností rychlého vyhledání, filtrování, editace, správy oprávnění a exportu/importu.  
Uživatelé mohou být osoby (fyzické) nebo firmy (právnické osoby) – viz pole IČO/ARES.  
**Nově: Zobrazit i SSO účty, delegace, API klíče a preference (viz detail uživatele).**

### Kdo má přístup
- **Administrátor**: plný přístup ke všem funkcím
- **Správce nemovitostí**: přístup k zobrazení a správě uživatelů
- **Účetní**: pouze zobrazení seznamu a export dat
- **Běžný uživatel**: bez přístupu

---

## 2️⃣ Stromová struktura / navigace

Dlaždice je hlavní vstup do správy uživatelů. Zařazení v struktuře:

**010-Sprava-uzivatelu** > **🟦 Seznam uživatelů**
- ├── 👁️ Přehled uživatelů (základní tabulka všech uživatelů)
- ├── 📝 Přidat/pozvat uživatele (formulář pro přidání nebo pozvání uživatele)
- ├── ✏️ Editace uživatele (formulář pro editaci uživatele)
- └── 👁️ Detail uživatele (detailní pohled na uživatele)

---

## 3️⃣ Přehledová tabulka / seznam

### Sloupce tabulky

| Sloupec            | Popis                                   | Povinný | Filtrovat/Řadit |
|--------------------|-----------------------------------------|:-------:|:--------------:|
| Jméno              | Jméno a příjmení uživatele              |  Ano    | Ano            |
| E-mail             | Kontaktní e-mail                        |  Ano    | Ano            |
| Telefon            | Telefonní číslo                         |  Ne     | Ano            |
| IČO                | Identifikační číslo organizace           |  Ne     | Ano            |
| Firma              | Název firmy (z ARES)                    |  Ne     | Ano            |
| SSO                | Propojené účty (Google/MS/Apple, ikona) |  Ne     | Ano            |
| Role               | Hlavní role (popř. více rolí zkráceno)  |  Ano    | Ano            |
| Stav účtu          | Aktivní / Pozván / Blokován / Archiv    |  Ano    | Ano            |
| Poslední přihlášení| Datum a čas posledního přístupu         |  Ne     | Ano (řadit)    |
| Jednotky           | ID/počet přiřazených jednotek           |  Ne     | Ano            |
| Delegace           | Počet zástupců / sdílení účtu           |  Ne     | Ano            |
| Akce               | Ikony pro detail, edit, blok, reset...  |  Ano    | Ne             |

### Filtrování a řazení
- **Filtrování**: fulltext, role, stav, jednotka, firma/IČO, SSO, delegace, datum
- **Řazení**: podle jména, e-mailu, role, stavu, posledního přihlášení, počtu jednotek

### Akce v řádku
| Ikona | Akce | Popis | Viditelné kdy |
|-------|------|-------|---------------|
| 👁️ | Detail | Zobrazí detail uživatele | Vždy |
| ✏️ | Editace | Otevře formulář pro editaci | Pro aktivní a pozvaného |
| 🗄️ | Archiv | Archivuje uživatele | Pro aktivní uživatele |
| ⛔ | Blokace | Zablokuje uživatele | Pro aktivní uživatele |
| 🔁 | Reset hesla | Resetuje heslo uživatele | Pro aktivní a blokované |

### Hromadné akce
- **📝 Přidat** - přidání nového uživatele (Admin, Správce)
- **📊 Export** - export seznamu uživatelů (Admin, Správce, Účetní)
- **📥 Import** - hromadný import uživatelů (Admin, Správce)
- **🗄️ Archivace** - hromadná archivace vybraných uživatelů (Admin, Správce)
- **⛔ Blokace** - hromadná blokace vybraných uživatelů (Admin, Správce)
- **🔁 Reset hesel** - hromadný reset hesel (Admin, Správce)
- **✳️ Správa oprávnění** - hromadná změna rolí a oprávnění (Admin, Správce)
- **📈 Statistiky** - zobrazení statistik využití (Admin, Správce, Účetní)

### Ukázka tabulky

| Jméno      | E-mail             | Firma     | IČO      | Role     | SSO      | Delegace | Stav     | Posl. přihlášení | Akce             |
|------------|--------------------|-----------|----------|----------|----------|----------|----------|------------------|------------------|
| Patrik     | patrik@abc.cz      | ABC s.r.o.| 12345678 | Admin    | G, M     | 2        | Aktivní  | 2025-09-10       | 👁️ ✏️ 🗄️ ⛔ 🔁   |
| Jan Novák  | jan@xyz.cz         |           |          | Uživatel |          | 0        | Pozván   |                  | 👁️ ✏️ 🗄️        |

---

## 4️⃣ Formulář (přidání/editace)

### Formulářová pole pro přidání uživatele

| Pole             | Povinné | Typ/validace      | Poznámka                      |
|------------------|:-------:|------------------|-------------------------------|
| Osoba/firma      |   Ano   | přepínač         | Osoba = fyzická, Firma = právnická |
| Jméno            |   Ano   | text             |                               |
| Příjmení         |   Ano*  | text             | Povinné jen pro osoby         |
| E-mail           |   Ano   | e-mail (unikátní)| Pozvánka je odesílána na tento e-mail |
| Telefon          |   Ne    | tel (validace)   |                               |
| IČO              |   Ne**  | číslo            | Povinné pro firmy, validace ARES  |
| Název firmy      |   Ne**  | text/readonly    | Načteno z ARES                |
| Role             |   Ano   | výběr            | Výběr z dostupných            |
| Jednotky         |   Ne    | výběr            |                               |
| Funkce/oprávnění |   Ne    | výběr/checkbox   |                               |
| Poznámka         |   Ne    | text             |                               |
| Jazyk rozhraní   |   Ne    | výběr            |                               |
| Nastavení notifikací | Ne  | multi-choice     |                               |
| SSO účet         |   Ne    | výběr            | Google, MS, Apple             |
| Delegace/zástupci|   Ne    | multi-choice     | Výběr uživatelů               |
| Uživatelská metadata | Ne  | json/yaml        | Příznaky, preference          |
| Odeslat pozvánku po uložení | Ne | checkbox | Defaultně zaškrtnuto         |

*Příjmení povinné jen pro osoby  
**IČO a Název firmy povinné jen pro firmy (právnické osoby)

### Tlačítka ve formuláři
- **💾 Uložit** - uloží změny a zavře formulář
- **❌ Zrušit** - zavře formulář bez uložení
- **📨 Odeslat pozvánku** - pošle pozvánku na e-mail
- **🔍 Ověřit v ARES** - ověří a načte údaje z ARES

### Validace
- **Povinná pole**: jméno, e-mail, role, příjmení (u osob), IČO (u firem)
- **Unikátní e-mail**: kontrola duplicitního e-mailu v systému
- **Formát e-mailu**: validace formátu e-mailové adresy
- **Validní IČO**: kontrola platnosti IČO u firem
- **Kontrola rolí**: ověření platných rolí a oprávnění

### Chování po odeslání
- Uložení nového uživatele s vygenerovaným ID
- Odeslání pozvánky (pokud je zaškrtnuto)
- Notifikace administrátorům o novém uživateli
- Návrat na přehled nebo detail uživatele
- Zápis do audit logu

---

## 5️⃣ Detail záznamu

### Zobrazované informace v detailu
- **Základní údaje**: jméno, příjmení, e-mail, telefon, role, stav účtu, jednotky
- **Firma/IČO**: název firmy, IČO, DIČ, sídlo (načtené z ARES)
- **Historie přihlášení**: přehled aktivit a posledních přístupů
- **Role a oprávnění**: detailní seznam rolí, funkcí a oprávnění
- **Přiřazené jednotky**: seznam objektů/jednotek k nimž má přístup
- **Audit změn**: historie všech změn s časovými razítky
- **Notifikace a 2FA**: stav bezpečnostních nastavení
- **API klíče**: historie použití a stav API přístupu
- **SSO účty**: propojené Google, MS, Apple účty s posledním přihlášením
- **Delegace**: seznam zástupců a udělených oprávnění
- **Preference**: jazyk rozhraní, nastavení notifikací, metadata

### Akce dostupné v detailu
| Akce | Ikona | Popis | Oprávnění |
|------|-------|-------|-----------|
| Editace | ✏️ | Otevře formulář pro editaci | Admin, Správce |
| Reset hesla | 🔁 | Resetuje heslo uživatele | Admin, Správce |
| Archivace | 🗄️ | Archivuje uživatele | Admin, Správce |
| Blokace | ⛔ | Zablokuje uživatele | Admin, Správce |
| Smazání | 🗑️ | Smaže uživatele | Admin |
| Správa oprávnění | ✳️ | Upraví role a oprávnění | Admin, Správce |
| Odeslat pozvánku | 📨 | Pošle novou pozvánku | Admin, Správce |
| Obnovit přístup | 🔒 | Obnoví zablokovaný přístup | Admin, Správce |
| Ověřit v ARES | 🔍 | Aktualizuje údaje z ARES | Admin, Správce |

---

## 6️⃣ Akce a workflow

### Přehled akcí a oprávnění

| Akce | Kdy dostupná | Kdo může spustit | Podmínky |
|------|-------------|------------------|----------|
| Přidat uživatele | Vždy | Admin, Správce | - |
| Editovat | Pro existující | Admin, Správce | Uživatel existuje |
| Archivovat | Pro aktivní | Admin, Správce | Stav = Aktivní |
| Blokovat | Pro aktivní | Admin, Správce | Stav = Aktivní |
| Reset hesla | Pro aktivní/blokované | Admin, Správce | Stav ≠ Archiv |
| Smazat | Pro archivované | Admin | Stav = Archiv |
| Export | Vždy | Admin, Správce, Účetní | - |
| Import | Vždy | Admin, Správce | - |

### Stavové přechody
```
Pozván → Aktivní (po prvním přihlášení)
Aktivní → Blokován (blokace administrátorem)
Aktivní → Archiv (archivace administrátorem)
Blokován → Aktivní (obnovení přístupu)
Blokován → Archiv (archivace)
Archiv → Smazáno (trvalé smazání)
```

### Workflow procesy
1. **Přidání uživatele** → Odeslání pozvánky → Aktivace účtu → První přihlášení
2. **Přidání firmy** → Zadání IČO → Ověření v ARES → Automatické doplnění údajů
3. **Editace** → Uložení změn → Historie změn v audit logu
4. **Hromadný import** → Validace → Zápis → Hlášení chyb
5. **Export** → Kontrola práv → Stažení souboru
6. **Správa rolí** → Přiřazení rolí → Změna práv
7. **Napojení SSO** → Ověření → Zobrazení v detailu → Možnost odpojit
8. **Delegace** → Udělení práv → Evidence v detailu → Možnost odebrání
9. **Nastavení preferencí** → Uložení → Zpětná vazba → Audit změn

---

## 7️⃣ Oprávnění a viditelnost

### Tabulka oprávnění podle rolí

| Akce                  | Admin | Správce | Účetní | Běžný uživatel |
|-----------------------|:-----:|:-------:|:------:|:--------------:|
| Zobrazit seznam       |  ✅   |   ✅    |   ✅   |       🚫       |
| Přidat/editovat       |  ✅   |   ✅    |   🚫   |       🚫       |
| Archivovat/blokovat   |  ✅   |   ✅    |   🚫   |       🚫       |
| Reset hesla           |  ✅   |   ✅    |   🚫   |       🚫       |
| Export/import         |  ✅   |   ✅    |   ✅   |       🚫       |
| Správa oprávnění      |  ✅   |   ✅    |   🚫   |       🚫       |
| Hromadné akce         |  ✅   |   ✅    |   🚫   |       🚫       |
| Správa SSO účtů       |  ✅   |   ✅    |   🚫   |       🚫       |
| Správa delegace       |  ✅   |   ✅    |   🚫   |       🚫       |
| Správa preferencí     |  ✅   |   ✅    |   ✅   |       🚫       |

### Specifika pro role
- **Administrátor**: plný přístup ke všem funkcím, může spravovat ostatní administrátory
- **Správce nemovitostí**: může spravovat uživatele, ale nemůže měnit administrátory
- **Účetní**: pouze čtení a export dat pro účetní účely
- **Běžný uživatel**: bez přístupu k seznamu uživatelů

---

## 8️⃣ Chybové stavy a validace

### Typické chybové stavy

| Chyba                   | Řešení                         | Uživatelská hláška                           |
|-------------------------|-------------------------------|---------------------------------------------|
| Duplicitní e-mail       | Ověřit zadání a unikátnost    | "Uživatel se stejným e-mailem již existuje." |
| Povinné pole chybí      | Doplnit povinný údaj          | "Vyplňte prosím všechna povinná pole." |
| Neplatný formát e-mailu | Opravit zadání                | "E-mail nemá platný formát." |
| Neplatné IČO            | Ověřit v ARES, opravit        | "IČO není platné nebo nebylo nalezeno." |
| Nelze odstranit admina  | Musí zůstat min. 1 admin      | "Nelze odebrat posledního administrátora." |
| Chyba při napojení SSO  | Kontaktovat podporu           | "Nepodařilo se propojit SSO účet." |
| Chyba při odebrání delegace | Zkusit znovu              | "Delegace se nepodařilo odebrat." |
| Chyba v metadatech      | Opravit formát                | "Metadata nejsou ve správném formátu." |
| Chyba při změně preferencí | Zkusit znovu               | "Nepodařilo se uložit preference." |

### Import/Export specifika
- **Chyby při importu**: neplatný formát souboru, duplicitní záznamy, chybějící povinná pole
- **Validace dat**: kontrola formátu všech polí před importem
- **Hlášky při exportu**: informace o počtu exportovaných záznamů, filtrech

---

## 9️⃣ Exporty, importy, audit, GDPR

### Možnosti exportu
- **Formáty**: CSV, Excel, PDF
- **Obsah**: všechna pole včetně IČO, firmy, SSO, delegace, preferencí, metadat
- **Filtry**: možnost exportu pouze vyfiltrovaných záznamů
- **Oprávnění**: Admin, Správce, Účetní

### Možnosti importu
- **Formáty**: CSV, Excel
- **Validace**: kontrola všech polí před importem
- **Šablona**: dostupná šablona s příklady
- **Oprávnění**: Admin, Správce

### Audit a logování
- **Co se loguje**: všechny změny uživatelských údajů, přihlášení, změny rolí
- **Kdo**: ID uživatele, který změnu provedl
- **Kdy**: časové razítko změny
- **Co**: detailní popis změny (staré → nové hodnoty)

### GDPR požadavky
- **Export osobních údajů**: možnost exportu všech dat uživatele
- **Anonymizace**: možnost anonymizovat uživatele místo smazání
- **Právo na zapomenutí**: možnost úplného smazání uživatele a jeho dat
- **Souhlas**: evidence souhlasů se zpracováním osobních údajů

---

## 🔟 Vazby na další moduly a reference

### Navazující moduly
- **020-Muj-ucet**: správa vlastního profilu uživatele
- **130-Nastaveni**: globální nastavení systému a rolí
- **110-Komunikace**: notifikace a komunikace s uživateli
- **040-Nemovitost**: přiřazení uživatelů k nemovitostem
- **060-Smlouva**: propojení uživatelů se smlouvami

### Reference na workflow
- **Správa oprávnění**: moduly rolí a funkcí
- **Audit log**: záznam všech změn
- **Notifikace**: automatické informování o změnách
- **ARES integrace**: ověřování firemních údajů

### Související entity
- **Role a oprávnění**: definice přístupových práv
- **Jednotky/objekty**: nemovitosti přiřazené uživatelům  
- **Smlouvy**: dokumenty spojené s uživateli
- **Platby**: finanční transakce uživatelů

---

## 1️⃣1️⃣ Specifika a rozšíření

### Bezpečnostní poznámky
- **SSO integrace**: bezpečné propojení s externími poskytovateli identity
- **2FA**: možnost aktivace dvoufaktorové autentizace
- **API přístup**: bezpečné generování a správa API klíčů
- **Audit trail**: úplné sledování všech změn pro bezpečnostní účely

### Speciální workflow
- **Delegace**: správa zástupných oprávnění mezi uživateli
- **Hromadné operace**: efektivní správa většího počtu uživatelů
- **ARES integrace**: automatické načítání a ověřování firemních údajů
- **Preference**: personalizace uživatelského rozhraní

### Možná rozšíření do budoucna
- **Skupiny/týmy**: organizace uživatelů do skupin
- **Pokročilá oprávnění**: jemnější řízení přístupů
- **Workflow schvalování**: procesy pro schvalování změn
- **Integrace s externími systémy**: propojení s dalšími aplikacemi
- **Pokročilé reporting**: detailní analýzy využití systému

### TODO poznámky
- Rozšířit SSO o další poskytovatele (LinkedIn, GitHub)
- Implementovat pokročilé filtrování a vyhledávání
- Přidat možnost bulk operací s více filtry
- Vylepšit ARES integraci o kontrolu platnosti firem
- Přidat notifikace pro expiraci účtů