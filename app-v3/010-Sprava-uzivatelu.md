> ℹ️ Viz [pravidla.md](./pravidla.md)  
> ℹ️ Viz [common-actions.md](./common-actions.md)  
> ℹ️ Viz [permissions-catalog.md](./permissions-catalog.md)  
> - Nikdy nic nemaž, pouze přeškrtávej!  
> - Každá nová ikona patří do [common-actions.md](./common-actions.md)  
> - Na začátku každé sekce/dlaždice vlož checklist (níže) a označ stavovou ikonou:  
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
Uživatelé mohou být osoby (fyzické) nebo firmy (právnické osoby) – viz pole IČO/ARES.  
**Nově: Zobrazit i SSO účty, delegace, API klíče a preference (viz detail uživatele).**

---

### 2️⃣ Stromová struktura / navigace  
Viz výše. Dlaždice je hlavní vstup do správy uživatelů.

---

### 3️⃣ Přehledová tabulka / seznam

| Sloupec            | Popis                                   | Povinný | Filtrovat/Řadit |
|--------------------|-----------------------------------------|:-------:|:--------------:|
| Jméno              | Jméno a příjmení uživatele              |  Ano    | Ano            |
| E-mail             | Kontaktní e-mail                        |  Ano    | Ano            |
| Telefon            | Telefonní číslo                         |  Ne     | Ano            |
| IČO                | Identifikační číslo organizace           |  Ne     | Ano            |
| Firma              | Název firmy (z ARES)                    |  Ne     | Ano            |
| SSO                | Propojené účty (Google/MS/Apple, ikona) |  Ne     | Ano            | <!-- NOVÉ -->
| Role               | Hlavní role (popř. více rolí zkráceno)  |  Ano    | Ano            |
| Stav účtu          | Aktivní / Pozván / Blokován / Archiv    |  Ano    | Ano            |
| Poslední přihlášení| Datum a čas posledního přístupu         |  Ne     | Ano (řadit)    |
| Jednotky           | ID/počet přiřazených jednotek           |  Ne     | Ano            |
| Delegace           | Počet zástupců / sdílení účtu           |  Ne     | Ano            | <!-- NOVÉ -->
| Akce               | Ikony pro detail, edit, blok, reset...  |  Ano    | Ne             |

Filtrování: fulltext, role, stav, jednotka, firma/IČO, SSO, delegace, datum.  
Hromadné akce: Přidat, export, import, archivace/blokace, reset hesla, správa oprávnění, statistiky.

Ukázka tabulky:
| Jméno      | E-mail             | Firma     | IČO      | Role     | SSO      | Delegace | Stav     | Posl. přihlášení | Akce             |
|------------|--------------------|-----------|----------|----------|----------|----------|----------|------------------|------------------|
| Patrik     | patrik@abc.cz      | ABC s.r.o.| 12345678 | Admin    | G, M     | 2        | Aktivní  | 2025-09-10       | 👁️ ✏️ 🗄️ ⛔ 🔁   |
| Jan Novák  | jan@xyz.cz         |           |          | Uživatel |          | 0        | Pozván   |                  | 👁️ ✏️ 🗄️        |

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
Slouží k přidání nového uživatele (osoby nebo firmy) nebo odeslání pozvánky.  
**Pokud je uživatel firma, zadává se i IČO a načítají se údaje z ARES.**  
**Nově: možnost přiřadit SSO účet, API přístup, zástupce, nastavit jazyk, metadata.**

#### Formulářová pole
| Pole             | Povinné | Typ/validace      | Poznámka                      |
|------------------|:-------:|------------------|-------------------------------|
| Osoba/firma      |   Ano   | přepínač         | Osoba = fyzická, Firma = právnická |
| Jméno            |   Ano   | text             |                               |
| Příjmení         |   Ano\* | text             | Povinné jen pro osoby         |
| E-mail           |   Ano   | e-mail (unikátní)| Pozvánka je odesílána na tento e-mail |
| Telefon          |   Ne    | tel (validace)   |                               |
| IČO              |   Ne\*\*| číslo            | Povinné pro firmy, validace ARES  |
| Název firmy      |   Ne\*\*| text/readonly    | Načteno z ARES                |
| Role             |   Ano   | výběr            | Výběr z dostupných            |
| Jednotky         |   Ne    | výběr            |                               |
| Funkce/oprávnění |   Ne    | výběr/checkbox   |                               |
| Poznámka         |   Ne    | text             |                               |
| Jazyk rozhraní   |   Ne    | výběr            |                               | <!-- NOVÉ -->
| Nastavení notifikací | Ne  | multi-choice     |                               | <!-- NOVÉ -->
| SSO účet         |   Ne    | výběr            | Google, MS, Apple             | <!-- NOVÉ -->
| Delegace/zástupci|   Ne    | multi-choice     | Výběr uživatelů               | <!-- NOVÉ -->
| Uživatelská metadata | Ne  | json/yaml        | Příznaky, preference          | <!-- NOVÉ -->
| [ ] Odeslat pozvánku po uložení | Ne | checkbox | Defaultně zaškrtnuto         |

\* Příjmení povinné jen pro osoby  
\*\* IČO a Název firmy povinné jen pro firmy (právnické osoby); Název je možné načíst z registru ARES.

Tlačítka: 💾 Uložit, ❌ Zrušit, 📨 Odeslat pozvánku, 🔍 Ověřit v ARES  
Validace: povinná pole, unikátní e-mail, formát, role, validní IČO (u firem)  
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
Umožňuje úpravu údajů existujícího uživatele (osoby i firmy).  
Možnost aktualizovat IČO/Název firmy dle ARES, spravovat SSO účty, delegace, preference, metadata.

#### Formulářová pole  
Stejná jako u přidání + pole „stav účtu“ (mění jen admin/správce)  
Nově:  
- Nastavit/odpojit SSO účet  
- Nastavit zástupce/delegaci  
- Upravit preference/notifikace  
- Upravit metadata

Tlačítka: 💾 Uložit, ❌ Zrušit, 🔁 Reset hesla, 🗄️ Archivovat, ⛔ Blokovat, 🔍 Ověřit v ARES  
Validace: povinná pole, unikátní e-mail, role, IČO (u firem)  
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
Detailní zobrazení všech informací o uživateli (osobě i firmě).  
Nově:  
- SSO účty (seznam, poslední přístup, možnost odpojit)
- Delegace/zástupci (kdo může spravovat účet, komu byl udělen přístup)
- Nastavení notifikací, jazyk rozhraní, metadata
- Historie použití API klíče

#### Přehled polí  
- Základní údaje (jméno, e-mail, role, telefon, jednotky, stav…)
- Firma/IČO (je-li uživatel právnická osoba, zobrazen název, IČO, příp. DIČ, sídlo z ARES)
- Přehled historie přihlášení/aktivit
- Přehled rolí, oprávnění, funkcí
- Seznam přiřazených jednotek/objektů
- Poslední změny (audit)
- Notifikace, stav 2FA, API klíč, **historie použití API klíče** <!-- NOVÉ -->
- **Propojené SSO účty:** Google, MS, Apple, datum posledního přihlášení, možnost odpojit <!-- NOVÉ -->
- **Delegace/zástupci:** Seznam zástupců, možnost zrušit oprávnění, historie delegace <!-- NOVÉ -->
- **Jazyk rozhraní, nastavení notifikací, metadata** <!-- NOVÉ -->

Akce: ✏️ Editace, 🔁 Reset hesla, 🗄️ Archivace, ⛔ Blokace, 🗑️ Smazání, ✳️ Správa oprávnění, 📨 Odeslat pozvánku, 🔒 Obnovit přístup, 🔍 Ověřit v ARES

---

## 🟦 Správa rolí a oprávnění
... *(beze změny, viz předchozí verze, platí i pro uživatele typu firma, delegace, SSO)*

---

## 🟦 Přehled pozvánek
... *(beze změny)*

---

## 🟦 Správa licencí
... *(beze změny)*

---

## 🟦 Import/Export uživatelů
... *(beze změny, doporučuji zahrnout pole IČO/Firma/SSO/Delegace/Preference/Metadata do šablony importu!)*

---

## 🟦 Auditní log / historie změn
... *(beze změny, rozšířit o změny SSO, delegace, preference, metadata, API klíče)*

---

## 🟦 Statistiky a využití
... *(beze změny, lze doplnit statistiky dle typu uživatele – osoba/firma, role, SSO, delegace, preference apod.)*

---

## 🗃️ Datové modely (ukázka)
```json
{
  "id": "1",
  "typ": "firma",
  "jmeno": "Patrik",
  "prijmeni": "Cechlovsky",
  "email": "patrik@abc.cz",
  "telefon": "+420123456789",
  "role": "admin",
  "ic": "12345678",
  "firma": "ABC s.r.o.",
  "stav": "aktivni",
  "posledni_prihlaseni": "2025-09-10T11:12:00Z",
  "jednotky": [101, 102],
  "funkce": ["Správa smluv", "Potvrzení o platbě"],
  "api_klic": "abcdef123456",
  "api_klic_historie": [
    {"datum": "2025-09-01", "akce": "použito"},
    {"datum": "2025-08-20", "akce": "revokováno"}
  ],
  "zdroj_ares": true,
  "sso": [
    {"provider": "Google", "stav": "aktivní", "posledni_pristup": "2025-09-15T10:00:00"}
  ],
  "delegace": [
    {"uzivatel": "uzivatel_zastupce", "opravneni": ["čtení", "správa"], "stav": "aktivní"}
  ],
  "jazyk": "cs",
  "notifikace": ["email", "sms"],
  "metadata": {"preferovane_kanaly": ["sms"], "stitek": "VIP"}
}
```
- `sso`: pole napojených SSO účtů (provider, stav, datum posledního přístupu)
- `delegace`: uživatelé se zástupným právem
- `api_klic_historie`: historie použití a revokace API klíče
- `metadata`: uživatelská metadata, preference
- `notifikace`, `jazyk`: preference uživatele

---

## ⚠️ Chybové stavy a výjimky
| Chyba                   | Řešení                         | Hláska                           |
|-------------------------|-------------------------------|----------------------------------|
| Duplicitní e-mail       | Ověřit zadání a unikátnost    | "Uživatel se stejným e-mailem již existuje." |
| Povinné pole chybí      | Doplnit povinný údaj          | "Vyplňte prosím všechna povinná pole." |
| Neplatný formát e-mailu | Opravit zadání                | "E-mail nemá platný formát."     |
| Neplatné IČO            | Ověřit v ARES, opravit        | "IČO není platné nebo nebylo nalezeno." |
| Nelze odstranit admina  | Musí zůstat min. 1 admin      | "Nelze odebrat posledního administrátora." |
| Chyba při napojení SSO  | Upozornit                     | "Nepodařilo se propojit SSO účet."| <!-- NOVÉ -->
| Chyba při odebrání delegace | Upozornit                  | "Delegace se nepodařilo odebrat."| <!-- NOVÉ -->
| Chyba v metadatech      | Upozornit                     | "Metadata nejsou ve správném formátu."| <!-- NOVÉ -->
| Chyba při změně preferencí | Upozornit                   | "Nepodařilo se uložit preference."| <!-- NOVÉ -->
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
| Správa SSO účtů       |  ✅   |   ✅    |   🚫   |       🚫       | <!-- NOVÉ -->
| Správa delegace       |  ✅   |   ✅    |   🚫   |       🚫       | <!-- NOVÉ -->
| Správa preferencí     |  ✅   |   ✅    |   ✅   |       🚫       | <!-- NOVÉ -->

---

## 📑 Doporučené workflow
1. Přidání uživatele → Odeslání pozvánky → Aktivace účtu → První přihlášení.
2. Přidání uživatele-firmy → Zadání IČO → Ověření v ARES → Automatické doplnění údajů.
3. Editace uživatele → Uložení změn → Historie změn v audit logu.
4. Hromadný import → Validace → Zápis → Chyby hlášeny uživateli.
5. Export uživatelů → Kontrola práv → Stažení souboru.
6. Správa rolí → Přiřazení rolí uživatelům → Změna práv.
7. **Napojení SSO účtu → Ověření → Zobrazení v detailu uživatele → Možnost odpojit** <!-- NOVÉ -->
8. **Přidání zástupce/delegace → Udělení práv → Evidence v detailu uživatele → Možnost odebrání** <!-- NOVÉ -->
9. **Nastavení preferencí/notifikací → Uložení → Zpětná vazba uživateli → Audit změn** <!-- NOVÉ -->

---

## 📚 Reference
- [Katalog tlačítek a ikon](./common-actions.md)
- [Katalog oprávnění](./permissions-catalog.md)
- [Pravidla psaní dokumentace](./pravidla.md)
- [struktura-app.md](./struktura-app.md)
- [Modul Můj účet](./020-Muj-ucet.md)
- [Modul Nastavení](./130-Nastaveni.md)
- [Modul Komunikace](./110-Komunikace.md)

---

## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Sem si piš vše, co tě napadne, co je potřeba doplnit, změnit nebo vyřešit.  
> Pokud je úkol hotový, přeškrtni ho a označ stavovou ikonou.  
> Pokud je rozpracovaný, přidej ⏳, pokud čeká na rozhodnutí, přidej > TODO: …

- ⏳ ~~Historie změn / auditní log~~ – sleduje kdo, kdy a co v uživatelských datech změnil (**hotovo pro základní pole, rozšířit o SSO, delegace, metadata, preference, API**)
- ⏳ ~~ARES/validace IČO~~ – u firem ověřovat IČO, načítat název z ARES, řešit chyby při nenalezení (**hotovo**)
- ⏳ ~~Zabezpečení~~ – nastavení síly hesla, expirace hesla, 2FA, blokace po více neúspěšných pokusech, případně logy přístupů (**většina hotovo, rozšířit o SSO**)
- ⏳ Správa skupin / týmů – pokud budeš mít více jednotek/rolí, někdy se hodí přiřazovat práva/skupiny hromadně.
- ⏳ Oprávnění nad více objekty – máš práva k jednotce – chceš časem i práva např. ke konkrétním smlouvám, dokumentům, akcím (jemnější řízení oprávnění)?
- ⏳ Možné workflow pro schvalování – např. žádosti o změnu údajů, schvalování přijetí nájemníka, atd.
- ⏳ ~~Notifikace~~ – jaké události mají spouštět informování uživatelů (email, sms, interní oznámení)? (**hotovo, rozšířit o preference**)
- ⏳ ~~Export a import dat~~ – procesy pro hromadný export/import uživatelů, audit, zálohování. (doplnit pole IČO/Firma/SSO/Delegace/Preference/Metadata)
- ⏳ ~~Uživatelské preference~~ – např. jazyk rozhraní, nastavení notifikací, vlastní profilové údaje (**doplňeno**)
- ⏳ ~~Přehled o vazbách mezi uživateli~~ – kdo je např. odpovědný za jednotku, kdo je „hlavní nájemník“, kdo patří pod koho (hierarchie, delegace) (**doplňeno**)
- ⏳ ~~API přístup~~ – možnost vygenerovat API klíč pro externí systémy, audit jeho použití (**doplňeno**)
- ⏳ ~~Správa SSO účtů~~ – evidence napojených SSO účtů, možnost odpojení, audit (**doplňeno, rozšířit**)
- ⏳ ~~Delegace~~ – správa zástupců, historie delegací, možnost odebírat přístup (**doplňeno**)
- ⏳ ~~Metadata~~ – možnost přidávat štítky, preference, další údaje k uživateli (**doplňeno**)
- > TODO:  
    - Specifika pro pokročilé workflow (schvalování, preference, jemnější práva)
    - Rozšířená správa skupin/týmů nebo rozpad oprávnění na jemnější úrovně
    - Konkretizace chybových hlášek, importních šablon, detailů exportu
    - Doplňkové bezpečnostní politiky, integrace s externími systémy

---

> Dále sem přidávej nové nápady, otázky a poznámky!  
> Pokud je něco hotové, přeškrtni nebo přidej stavovou ikonku dle pravidel.
