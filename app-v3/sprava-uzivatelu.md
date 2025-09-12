> ℹ️ Pravidla viz [pravidla.md](./pravidla.md)  
> - Nikdy nic nemaž, pouze přeškrtávej!  
> - Každá nová ikona patří do [common-actions.md](./common-actions.md)  
> - Na začátku každé sekce/dlaždice vlož checklist (níže) a označuj stavovou ikonou:  
>   - ✅ hotovo  ⏳ rozpracováno  🌐 hotovo v HTML  🚫 odstraněno  …  

---

# Modul: Správa uživatelů

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Seznam uživatelů | Hlavní dlaždice s přehledem uživatelů |
|      | ├── 👁️ Přehled uživatelů |   Základní tabulka všech uživatelů |
|      | ├── 📝 Přidat/pozvat uživatele |   Formulář pro přidání nebo pozvání uživatele |
|      | ├── ✏️ Editace uživatele |   Formulář pro editaci uživatele |
|      | └── 👁️ Detail uživatele |   Detailní pohled na uživatele |
| ✅   | 🟦 Správa rolí a oprávnění | Správa uživatelských rolí a práv |
|      | ├── 👁️ Přehled rolí a oprávnění |   Seznam všech rolí a práv |
|      | ├── 📝 Přidat/editovat roli |   Formulář pro správu rolí |
|      | └── 📝 Přidat/editovat funkci |   Formulář pro správu funkcí/oprávnění |
| ✅   | 🟦 Přehled pozvánek | Přehled a správa pozvánek |
|      | └── 👁️ Seznam pozvánek a ověřovacích kódů |   Tabulka pozvánek a kódů |
| ✅   | 🟦 Správa licencí | Správa a přehled licencí |
|      | └── 👁️ Přehled licencí |   Tabulka licencí |
| ✅   | 🟦 Import/Export uživatelů | Import a export uživatelů |
| ✅   | 🟦 Auditní log / historie změn | Auditní záznamy a historie změn |
| ✅   | 🟦 Statistiky a využití | Statistiky používání modulu |

---

## 🟦 Seznam uživatelů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech sloupců (tabulka)
- ✅ Filtrování a řazení
- ✅ Akce v řádku (ikony)
- ✅ Hromadné akce nad tabulkou
- ✅ Ukázka tabulky
- ✅ Výčet polí, validací a stavů
- ✅ Detaily záznamu, akce v detailu
- ✅ Akce a workflow
- ✅ Oprávnění a viditelnost (tabulka)
- ✅ Chybové stavy, validace a uživatelské hlášky
- ✅ Export, import, audit, GDPR
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

### 1️⃣ Popis a účel  
Přehled všech uživatelů v systému s možností rychlého vyhledání, filtrování, editace, správy oprávnění a exportu/importu.

### 2️⃣ Stromová struktura / navigace  
Viz výše. Dlaždice je hlavní vstup do správy uživatelů.

### 3️⃣ Přehledová tabulka / seznam

| Sloupec            | Popis                                   | Povinný | Filtrovat/Řadit |
|--------------------|-----------------------------------------|:-------:|:--------------:|
| Jméno              | Jméno a příjmení uživatele              |  Ano    | Ano            |
| E-mail             | Kontaktní e-mail                        |  Ano    | Ano            |
| Telefon            | Telefonní číslo                         |  Ne     | Ano            |
| Role               | Hlavní role (popř. více rolí zkráceno)  |  Ano    | Ano            |
| Stav účtu          | Aktivní / Pozván / Blokován / Archiv    |  Ano    | Ano            |
| Poslední přihlášení| Datum a čas posledního přístupu         |  Ne     | Ano (řadit)    |
| Jednotky           | ID nebo počet přiřazených jednotek      |  Ne     | Ano            |
| Akce               | Ikony pro detail, edit, blok, reset...  |  Ano    | Ne             |

Filtrování: fulltext, role, stav, jednotka, datum.  
Hromadné akce: Přidat, export, import, archivace/blokace, reset hesla, správa oprávnění, statistiky.

Ukázka tabulky:
| Jméno      | E-mail             | Role         | Stav     | Posl. přihlášení | Akce             |
|------------|--------------------|--------------|----------|------------------|------------------|
| Patrik     | patrik@abc.cz      | Admin        | Aktivní  | 2025-09-10       | 👁️ ✏️ 🗄️ ⛔ 🔁   |

---

## 📝 Přidat/pozvat uživatele

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (tabulka)
- ✅ Výchozí hodnoty, předvyplnění, skryté pole
- ✅ Stavové pole, kdo je může měnit
- ✅ Tlačítka (uložit, zrušit, pozvánka)
- ✅ Validace
- ✅ Chování po odeslání (workflow, notifikace)
- ✅ Akce po uložení
- ✅ Oprávnění a viditelnost
- ✅ Chybové stavy a validace
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

#### Popis a účel  
Slouží k přidání nového uživatele nebo odeslání pozvánky.

#### Formulářová pole
| Pole             | Povinné | Typ/validace      | Poznámka                      |
|------------------|:-------:|------------------|-------------------------------|
| Jméno            |   Ano   | text             |                               |
| Příjmení         |   Ano   | text             |                               |
| E-mail           |   Ano   | e-mail (unikátní)| Pozvánka je odesílána na tento e-mail |
| Telefon          |   Ne    | tel (validace)   |                               |
| Role             |   Ano   | výběr            | Výběr z dostupných            |
| Jednotky         |   Ne    | výběr            |                               |
| Funkce/oprávnění |   Ne    | výběr/checkbox   |                               |
| Poznámka         |   Ne    | text             |                               |
| [ ] Odeslat pozvánku po uložení | Ne | checkbox | Defaultně zaškrtnuto         |

Tlačítka: 💾 Uložit, ❌ Zrušit, 📨 Odeslat pozvánku  
Validace: povinná pole, unikátní e-mail, formát, role  
Chování po odeslání: nové ID, pozvánka, notifikace, návrat na přehled/detail

---

## ✏️ Editace uživatele

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (tabulka)
- ✅ Výchozí hodnoty, předvyplnění, skryté pole
- ✅ Stavové pole, kdo je může měnit
- ✅ Tlačítka (uložit, zrušit, reset hesla)
- ✅ Validace
- ✅ Chování po odeslání (workflow, notifikace)
- ✅ Akce po uložení
- ✅ Oprávnění a viditelnost
- ✅ Chybové stavy a validace
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

#### Popis a účel  
Umožňuje úpravu údajů existujícího uživatele.

#### Formulářová pole  
Stejná jako u přidání + pole „stav účtu“ (mění jen admin/správce).

Tlačítka: 💾 Uložit, ❌ Zrušit, 🔁 Reset hesla, 🗄️ Archivovat, ⛔ Blokovat  
Validace: povinná pole, unikátní e-mail, role  
Chování po odeslání: notifikace, návrat na detail

---

## 👁️ Detail uživatele
### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí v detailu
- ✅ Akce v detailu
- ✅ Oprávnění a viditelnost
- ✅ Chybové stavy a validace
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

#### Popis a účel  
Detailní zobrazení všech informací o uživateli.

#### Přehled polí
- Základní údaje (jméno, e-mail, role, telefon, jednotky, stav…)
- Přehled historie přihlášení/aktivit
- Přehled rolí, oprávnění, funkcí
- Seznam přiřazených jednotek/objektů
- Poslední změny (audit)
- Notifikace, stav 2FA, API klíč

Akce: ✏️ Editace, 🔁 Reset hesla, 🗄️ Archivace, ⛔ Blokace, 🗑️ Smazání, ✳️ Správa oprávnění, 📨 Odeslat pozvánku, 🔒 Obnovit přístup

---

## 🟦 Správa rolí a oprávnění
### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (tabulka)
- ✅ Filtrování/řazení
- ✅ Akce v řádku a hromadné akce
- ✅ Formulář přidání/editace role/funkce
- ✅ Oprávnění a viditelnost
- ✅ Chybové stavy a validace
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

#### Hlavní tabulka a formuláře viz [předchozí vzor].

---

## 🟦 Přehled pozvánek
### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (tabulka)
- ✅ Filtrování/řazení
- ✅ Akce v řádku a hromadné akce
- ✅ Oprávnění a viditelnost
- ✅ Chybové stavy a validace
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

#### Přehled pozvánek  
Tabulka: uživatel, e-mail, stav, kódy, poznámka, akce (znovu poslat, zrušit)

---

## 🟦 Správa licencí
### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (tabulka)
- ✅ Filtrování/řazení
- ✅ Akce v řádku a hromadné akce
- ✅ Oprávnění a viditelnost
- ✅ Chybové stavy a validace
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

## 🟦 Import/Export uživatelů
### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (tabulka/importní šablona)
- ✅ Validace, chybové stavy, uživatelské hlášky
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

## 🟦 Auditní log / historie změn
### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (tabulka)
- ✅ Filtrování/řazení
- ✅ Chybové stavy, uživatelské hlášky
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

## 🟦 Statistiky a využití
### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Výčet statistik, popis polí/ukazatelů
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

## 🗃️ Datové modely (ukázka)
```json
{
  "id": "1",
  "jmeno": "Patrik",
  "email": "patrik@abc.cz",
  "telefon": "+420123456789",
  "role": "admin",
  "stav": "aktivni",
  "posledni_prihlaseni": "2025-09-10T11:12:00Z",
  "jednotky": [101, 102],
  "funkce": ["Správa smluv", "Potvrzení o platbě"]
}
```
- `id`: unikátní identifikátor uživatele
- `jmeno`, `email`, `telefon`: kontaktní údaje
- `role`: hlavní role uživatele
- `stav`: stav účtu
- `posledni_prihlaseni`: datum a čas
- `jednotky`: seznam jednotek
- `funkce`: seznam funkcí/oprávnění

---

## ⚠️ Chybové stavy a výjimky
| Chyba                   | Řešení                         | Hláska                           |
|-------------------------|-------------------------------|----------------------------------|
| Duplicitní e-mail       | Ověřit zadání a unikátnost    | "Uživatel se stejným e-mailem již existuje." |
| Povinné pole chybí      | Doplnit povinný údaj          | "Vyplňte prosím všechna povinná pole." |
| Neplatný formát e-mailu | Opravit zadání                | "E-mail nemá platný formát."     |
| Nelze odstranit admina  | Musí zůstat min. 1 admin      | "Nelze odebrat posledního administrátora." |
| ~~Chyba X~~             | ~~X~~                         | ~~"X"~~                          |

---

## 🛡️ Role a oprávnění
| Akce                  | Admin | Správce | Účetní | Běžný uživatel |
|-----------------------|:-----:|:-------:|:------:|:--------------:|
| Zobrazit seznam       |  ✅   |   ✅    |   ✅   |       🚫       |
| Přidat/editovat       |  ✅   |   ✅    |   🚫   |       🚫       |
| Archivovat/blokovat   |  ✅   |   ✅    |   🚫   |       🚫       |
| Reset hesla           |  ✅   |   ✅    |   🚫   |       🚫       |
| Export/import         |  ✅   |   ✅    |   ✅   |       🚫       |
| Správa oprávnění      |  ✅   |   ✅    |   🚫   |       🚫       |
| Hromadné akce         |  ✅   |   ✅    |   🚫   |       🚫       |

---

## 📑 Doporučené workflow
1. Přidání uživatele → Odeslání pozvánky → Aktivace účtu → První přihlášení.
2. Editace uživatele → Uložení změn → Historie změn v audit logu.
3. Hromadný import → Validace → Zápis → Chyby hlášeny uživateli.
4. Export uživatelů → Kontrola práv → Stažení souboru.
5. Správa rolí → Přiřazení rolí uživatelům → Změna práv.

---

## 📚 Reference
- [Katalog tlačítek a ikon](./common-actions.md)
- [Katalog oprávnění](./permissions-catalog.md)
- [Pravidla psaní dokumentace](./pravidla.md)
- [struktura-app.md](./struktura-app.md)
- 
## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Sem si piš vše, co tě napadne, co je potřeba doplnit, změnit nebo vyřešit.
>  
> Pokud je úkol hotový, přeškrtni ho a označ stavovou ikonou.  
> Pokud je rozpracovaný, přidej ⏳, pokud čeká na rozhodnutí, přidej > TODO: …

- ⏳ **Historie změn / auditní log** – sleduje kdo, kdy a co v uživatelských datech změnil (užitečné pro administrátory a při řešení reklamací).
- ⏳ **Zabezpečení** – nastavení síly hesla, expirace hesla, 2FA, blokace po více neúspěšných pokusech, případně logy přístupů.
- ⏳ **Správa skupin / týmů** – pokud budeš mít více jednotek/rolí, někdy se hodí přiřazovat práva/skupiny hromadně.
- ⏳ **Oprávnění nad více objekty** – máš práva k jednotce – chceš časem i práva např. ke konkrétním smlouvám, dokumentům, akcím (jemnější řízení oprávnění)?
- ⏳ **Možné workflow pro schvalování** – např. žádosti o změnu údajů, schvalování přijetí nájemníka, atd.
- ⏳ **Notifikace** – jaké události mají spouštět informování uživatelů (email, sms, interní oznámení)?
- ⏳ **Export a import dat** – procesy pro hromadný export/import uživatelů, audit, zálohování.
- ⏳ **Uživatelské preference** – např. jazyk rozhraní, nastavení notifikací, vlastní profilové údaje.
- ⏳ **Přehled o vazbách mezi uživateli** – kdo je např. odpovědný za jednotku, kdo je „hlavní nájemník“, kdo patří pod koho (hierarchie).

---

> **Dále sem přidávej nové nápady, otázky a poznámky!**  
> Pokud je něco hotové, přeškrtni nebo přidej stavovou ikonku dle pravidel.
