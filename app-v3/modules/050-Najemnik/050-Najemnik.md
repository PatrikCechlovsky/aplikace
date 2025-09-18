> ℹ️ Viz [pravidla.md](./pravidla.md)  
> ℹ️ Viz [common-actions.md](./common-actions.md)  
> ℹ️ Viz [permissions-catalog.md](./permissions-catalog.md)  
> - Nikdy nic nemaž, pouze přeškrtávej!  
> - Každá nová ikona patří do [common-actions.md](./common-actions.md)  
> - Na začátku každé sekce/dlaždice vlož checklist a označ stavovou ikonou:  
>   - ✅ hotovo  ⏳ rozpracováno  🌐 hotovo v HTML  🚫 odstraněno  …


---

# Modul: Nájemník

---

## Stromová struktura modulu

| Stav | Sekce                       | Popis                                             |
|------|-----------------------------|---------------------------------------------------|
| ✅   | 🟦 Přehled nájemníků         | Hlavní dlaždice s přehledem subjektů/nájemníků    |
|      | ├── 👁️ Přehled nájemníků    | Tabulka všech nájemníků                           |
|      | ├── 📝 Přidat nájemníka      | Formulář pro přidání subjektu                     |
|      | ├── 📝 Editace nájemníka     | Formulář pro editaci subjektu                     |
|      | └── 👁️ Detail nájemníka     | Detailní pohled na nájemníka                      |
| ✅   | 🟦 Správa zástupců           | Správa zástupců nájemníků                         |
|      | ├── 👁️ Přehled zástupců     | Seznam všech zástupců                             |
|      | ├── 📝 Přidat/editovat zástupce | Formulář pro správu zástupců                  |
| ✅   | 🟦 Auditní log / historie změn | Auditní záznamy a historie změn                  |
| ✅   | 🟦 Statistiky a využití      | Statistiky využití a přehled dat                  |
| ✅   | 🟦 Import/Export nájemníků   | Import a export subjektů                          |
| ✅   | 🟦 Přehled dokumentů         | Správa a přehled dokumentů/příloh                 |
| ✅   | 🟦 Nastavení modulu          | Nastavení a konfigurace modulu                    |
| ✅   | 🟦 Notifikace a upozornění   | Přehled a správa notifikací                       |
| ✅   | 🟦 Průvodce založením        | Průvodce pro založení subjektu                    |
| ⏳   | 🟦 Vazby na další entity     | Přehled vazeb na jednotky, smlouvy, platby, uživatele |

---

<!-- NOVÁ SEKCE: Typy subjektů a sjednocená databáze -->
## 🆕 Typy subjektů a sjednocená databáze

> **Poznámka:**  
> Modul Nájemník pracuje s více typy subjektů v jedné databázi (osoba, OSVČ, firma, státní organizace, spolek/skupina, zástupce).  
> Formuláře i tabulky se dynamicky mění podle zvoleného typu subjektu.

| Typ subjektu      | Povinná pole                                       | Specifika/formulářová pole navíc              |
|-------------------|----------------------------------------------------|-----------------------------------------------|
| Osoba             | Jméno, Příjmení, E-mail                            | Datum narození, OP, Telefon                   |
| OSVČ              | Jméno, Příjmení, IČO, E-mail                       | DIČ, Bankovní účet, napojení na ARES          |
| Firma             | Název, IČO, DIČ, E-mail                            | Statutár, zápis v OR, napojení na ARES        |
| Státní org.       | Název, IČO, E-mail                                 | Typ instituce, napojení na ARES               |
| Spolek/Skupina    | Název, IČO, E-mail                                 | Zápis v rejstříku, napojení na ARES           |
| Zástupce          | Jméno, Příjmení, E-mail, Typ pověření, Vazba       | Platnost pověření, kontakty                   |

---

## 🟦 Přehled nájemníků

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (dynamické podle typu subjektu)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Evidence všech osob, firem nebo institucí, které užívají byt/jednotku/prostor v portfoliu, základní hledání, filtrování, export, rychlé akce.

### Kdo má přístup/viditelnost
| Role                  | Přístup |
|-----------------------|---------|
| Administrátor         | Plný    |
| Správce nemovitostí   | Plný    |
| Účetní                | Čtení   |
| Prohlížející          | Čtení   |

### Pole (přehled i detail – dynamické podle typu)
| Pole             | Osoba | OSVČ | Firma | Org. | Spolek | Zástupce | Popis                                  |
|------------------|:-----:|:----:|:-----:|:----:|:------:|:--------:|----------------------------------------|
| Typ subjektu     |   x   |  x   |   x   |  x   |   x    |    x     | enum                                  |
| Jméno            |   x   |  x   |       |      |        |    x     |                                      |
| Příjmení         |   x   |  x   |       |      |        |    x     |                                      |
| Název            |       |      |   x   |  x   |   x    |          |                                      |
| IČO              |       |  x   |   x   |  x   |   x    |          | (ARES)                               |
| DIČ              |       |  x   |   x   |      |        |          | (ARES)                               |
| E-mail           |   x   |  x   |   x   |  x   |   x    |    x     | Unikátní, validace duplicity         |
| Telefon          |   x   |  x   |   x   |  x   |   x    |    x     |                                      |
| Adresa           |   x   |  x   |   x   |  x   |   x    |    x     |                                      |
| Bankovní účet    |   x   |  x   |   x   |      |   x    |          |                                      |
| Statutár         |       |      |   x   |      |   x    |          | Firma, spolek/rejstřík (ARES)        |
| Zápis v rejstříku|       |      |   x   |      |   x    |          | Firma, spolek/rejstřík (ARES)        |
| Typ pověření     |       |      |       |      |        |    x     | (plná moc, zastoupení, správa…)      |
| Vazba na subjekt |       |      |       |      |        |    x     | ID subjektu, ke kterému je vázán     |
| Stav             |   x   |  x   |   x   |  x   |   x    |    x     | enum (aktivní/archiv/čeká/pozváno…)  |
| Jednotka         |   x   |  x   |   x   |  x   |   x    |    x     | vazba                                |
| ...              |       |      |       |      |        |          |                                      |

### Filtrování, řazení, akce
- Filtrování: podle typu, stavu, jednotky, jména/názvu, datumu
- Řazení: podle jména/názvu, stavu, data přidání
- Hromadné akce: změna stavu, export, generování výzev, přiřazení správce/jednotky

### Ukázka tabulky
| Jméno         | Příjmení   | Typ    | Stav    | Jednotka | E-mail              | Akce       |
|---------------|------------|--------|---------|----------|---------------------|------------|
| Jan           | Novák      | osoba  | aktivní | Byt 101  | jan.novak@...       | [Zobrazit] |
| IT Solutions  |            | firma  | aktivní | Kancelář 1 | info@itsolutions... | [Zobrazit] |

### Validace, tlačítka, workflow
- Validace unikátnosti e-mailu, čísla dokladu, loginu, IČO (podle typu)
- Povinná pole zvýraznit, zamezit uložení
- Tlačítka: Přidat, Upravit, Archivovat, Export, Hromadná akce, **Ověřit v ARES** (pro IČO)
- Workflow: Nový → Pozváno → Aktivní → (Archiv/Blokace)

---

<!-- NOVÉ: Workflow ARES -->
## 🆕 Workflow ověření ARES

- Zadání IČO (pro OSVČ, firmy, instituce, spolky) umožní tlačítko **Ověřit v ARES**.
- Při ověření se automaticky předvyplní název, adresa, DIČ, statutár, zápis v OR.
- Pokud subjekt v ARES není, zobrazit chybovou hlášku a neumožnit uložení.
- Každý zásah do údajů z ARES logovat do auditního logu.

---

## 🟦 Přidat / Editovat nájemníka

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby
- ✅ Výčet a popis všech polí (viz rozpad podle typu subjektu výše)
- ✅ Tlačítka ve formuláři
- ✅ Validace
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Formulář pro založení/editaci subjektu, validace, možnost uložit rozpracovaná data.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole (formulář)
Viz rozpad podle typu subjektu výše.  
ARES workflow pouze pro typy s IČO.

### Akce / Tlačítka
- Uložit
- Pokračovat v průvodci
- Zrušit
- Ověřit v ARES (pro IČO)

### Validace
- Povinná pole zvýraznit, validovat unikátnost
- Validace e-mailu, čísla dokladu, IČO atd.

### Chybové stavy
- Duplicitní e-mail, doklad, login, IČO
- Neplatný formát, ARES nedostupný
- Chybějící povinné pole

### Oprávnění a viditelnost
Správce, administrátor

### Vazby na další moduly a reference
- Automatické vytvoření vazby na Jednotku, Smlouvu, Platby

### Specifika, rozšíření
- Průvodce založením, možnost přiřadit správce, zástupce
- Dynamická pole podle typu subjektu

---

## 🟦 Detail nájemníka

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby
- ✅ Výčet a popis všech polí (dle typu subjektu)
- ✅ Akce dostupné v detailu
- ✅ Validace
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Zobrazení všech údajů, historie změn, napojení na další entity.

### Kdo má přístup/viditelnost
Správce, administrátor, účetní (čtení)

### Pole (přehled i detail)
Všechny údaje včetně auditní historie, napojení na jednotky, smlouvy, platby, dokumenty

### Akce
- Editace, Archivace, Přidání zástupce, Export dat, Připojení dokumentu

### Validace
- Validace pouze při editaci

### Chybové stavy
- Pokus o změnu neaktivního/archivovaného subjektu
- Neoprávněný přístup

### Oprávnění a viditelnost
Dle role, viz tabulka v Oprávnění

### Vazby na další moduly a reference
Jednotka, Smlouva, Platby, Služby, Dokumenty

### Specifika, rozšíření
- Historie všech jednotek, kde byl veden
- GDPR export, anonymizace

---

## 🟦 Správa zástupců

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby
- ✅ Výčet a popis všech polí
- ✅ Akce dostupné v sekci
- ✅ Validace
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Správa vztahů zástupců k nájemníkům, možnost přidání, editace, odebrání.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole
- Název zástupce
- Vazba na nájemníka
- Typ zástupce
- Kontakty

### Akce
- Přidat
- Editovat
- Odebrat

### Validace
- Unikátnost zástupce pro nájemníka
- Zápis změn do auditního logu

### Chybové stavy
- Duplicitní zástupce
- Neplatné kontakty

### Oprávnění a viditelnost
Správce, administrátor

### Vazby na další moduly a reference
- Detail nájemníka, Auditní log

### Specifika, rozšíření
- Možnost více zástupců na jednoho nájemníka

---

## 🟦 Auditní log a historie změn

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Výčet a popis polí
- ✅ Akce
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Evidence všech změn údajů nájemníka (včetně importů, exportů, změn stavu, ARES ověření).

### Kdo má přístup/viditelnost
Správce, administrátor, účetní (čtení)

### Pole
- Typ změny, kdo provedl, kdy, původní/nová hodnota

### Akce
- Filtrování podle typu změny, data, subjektu
- Export auditního logu, zobrazení detailu změny

### Specifika, rozšíření
- Možnost auditovat i hromadné operace, ARES workflow

---

## 🟦 Statistiky a využití

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Výčet a popis všech polí
- ✅ Akce
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Statistika počtů nájemníků, rozpad podle typů subjektů, jednotek, historie změn.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole
- Počet nájemníků, rozpad podle typů, obsazenost jednotek

### Akce
- Export grafů a reportů

---

## 🟦 Import/Export nájemníků

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Výčet a popis všech polí
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Hromadný import/export subjektů (CSV, XLSX, JSON), včetně validací a kontroly duplicit.  
**Obsahuje typ_subjektu a dynamická pole podle typu!**

### Kdo má přístup/viditelnost
Správce, administrátor

### Akce
- Import, Export, Report chyb, Audit importu

### Validace
- Kontrola duplicit, povinných polí, správný formát

---

## 🟦 Přehled dokumentů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Výčet a popis všech polí
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Evidence a správa dokumentů/příloh k subjektu.

### Kdo má přístup/viditelnost
Správce, administrátor

### Akce
- Přidat dokument, export, historie příloh

---

## 🟦 Nastavení modulu

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Výčet a popis všech polí
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Nastavení povinných polí, práv, workflow, typů subjektů a šablon.

### Kdo má přístup/viditelnost
Administrátor

---

## 🟦 Notifikace a upozornění

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Výčet a popis všech polí
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Evidence, nastavení a správa notifikací k událostem (změna jednotky, nová smlouva, blokace, atd.).

### Kdo má přístup/viditelnost
Správce, administrátor

---

## 🟦 Vazby na další entity

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice
- ✅ Kdo má přístup/viditelnost
- ✅ Výčet a popis všech polí
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Přehled napojení na jednotky, smlouvy, platby, služby, uživatele.

---

## 🗒️ Poznámky, nápady a úkoly

> Sem si piš vše, co tě napadne, co je potřeba doplnit, změnit nebo vyřešit.  
> Pokud je úkol hotový, přeškrtni ho a označ stavovou ikonou.  
> Pokud je rozpracovaný, přidej ⏳, pokud čeká na rozhodnutí, přidej > TODO: …

- ⏳ Ošetřit duplicity (e-mail, IČO, číslo dokladu)
- ⏳ Validace a ověřování údajů z ARES/ISZR
- ⏳ **Podpora všech typů subjektů a rozdílných formulářů (viz výše)**
- ⏳ Automatizace notifikací (změna stavu, nové dokumenty)
- ⏳ GDPR – anonymizace a export, auditní log
- ⏳ Hromadné operace – import/export, změna stavu
- ⏳ Workflow při ukončení smlouvy/přesunu jednotky
- ⏳ Možnost archivace vs. smazání (pravidla pro mazání)
- ⏳ Rozšířit auditní log o hromadné změny
- ⏳ Napojení na externí registry (katastr, ISZR)
- ⏳ Sdílené nájemnictví (více osob/firem)
- ⏳ Automatická kontrola insolvenčního rejstříku
- ⏳ Povinné notifikace – definovat které jsou nutné
- > TODO: Důsledně škrtat hotové úkoly a označovat stav.

---

## 🗃️ Datové modely (ukázka)
```json
{
  "id": "6",
  "typ_subjektu": "osoba",
  "role": "najemnik",
  "typ_opravneni": "cteni_vybranych",
  "titul": "",
  "jmeno": "Jan",
  "prijmeni": "Novák",
  "datum_narozeni": "1975-03-15",
  "typ_dokladu": "op",
  "cislo_dokladu": "123456789",
  "stat": "CZ",
  "psc": "11000",
  "mesto": "Praha",
  "ulice": "Václavské náměstí",
  "cislo_popisne": "1",
  "telefon": "+420777888999",
  "email": "jan.novak@email.cz",
  "bankovni_ucet": "123456789/0800",
  "login": "jnovak",
  "heslo": "********",
  "zastoupeni": "",
  "stav": "aktivni",
  "created_at": "2025-09-09T09:00:00Z",
  "updated_at": "2025-09-09T09:10:00Z"
}
```
```json
{
  "id": "7",
  "typ_subjektu": "firma",
  "role": "najemnik",
  "nazev": "IT Solutions s.r.o.",
  "ico": "77889900",
  "dic": "",
  "stat": "CZ",
  "psc": "60200",
  "mesto": "Brno",
  "ulice": "Robotická 12",
  "cislo_popisne": "10",
  "telefon": "+420543211234",
  "email": "info@itsolutions.cz",
  "bankovni_ucet": "987654321/0300",
  "login": "",
  "heslo": "",
  "zastoupeni": "11",
  "stav": "aktivni",
  "created_at": "2025-09-09T08:00:00Z",
  "updated_at": "2025-09-09T09:05:00Z"
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                            | Doporučené řešení / reakce systému                | Uživatelská hláška                                   | Logování/Audit |
|--------------------------------------------|---------------------------------------------------|------------------------------------------------------|----------------|
| Duplicita e-mailu                          | Zamezit uložení, zvýraznit pole, nabídnout hledání existujícího     | „Tento e-mail je již použit u jiného nájemníka.“      | Povinně logovat|
| Duplicita čísla dokladu                    | Zamezit uložení, zvýraznit pole                   | „Číslo dokladu je již evidováno u jiného nájemníka.“  | Povinně logovat|
| Změna trvalé adresy                        | Vyžádat potvrzení (e-mailem, schválení správcem)  | „Byla změněna adresa, vyčkejte na potvrzení.“         | Logovat změnu  |
| Neplatná platba                            | Upozornit správce/účetní, označit platbu           | „Platba je neplatná – kontaktujte správce.“           | Logovat výskyt |
| Nepovolená změna jednotky                  | Nepovolit změnu, pokud existují neukončené platby/smlouvy | „Nejprve ukončete platby/smlouvy k původní jednotce.“ | Logovat změnu  |
| Chybějící povinné pole                     | Zvýraznit pole, zamezit uložení                    | „Vyplňte prosím všechna povinná pole.“                | Není nutné     |
| Duplicitní rodné číslo / datum narození     | Zamezit uložení, zvýraznit pole                   | „Zadané rodné číslo/datum narození je již evidováno.“ | Povinně logovat|
| Neautorizovaná změna bankovního účtu        | Vyžadovat schválení správce nebo 2FA               | „Změna bankovního účtu čeká na schválení správce.“    | Povinně logovat|
| Neplatný formát e-mailu/telefonu           | Zvýraznit pole, zamezit uložení                    | „Zadaný e-mail/telefon není v platném formátu.“       | Není nutné     |
| Neoprávněný přístup k údajům nájemníka      | Zamezit akci, přesměrovat/odmítnout                | „Nemáte oprávnění k této akci.“                       | Povinně logovat|
| Nájemník je stále přiřazen k aktivní jednotce| Zamezit odstranění/archivaci                       | „Nájemníka nelze odstranit – je stále přiřazen k jednotce.“| Povinně logovat|
| Chyba při importu dat                      | Zobrazit detail chyby, umožnit částečný import     | „Import obsahuje chyby – zkontrolujte detaily.“       | Logovat výskyt |
| Chyba při exportu dat                      | Zobrazit chybovou hlášku, nabídnout opakování      | „Export selhal, zkuste to prosím znovu.“              | Logovat detail |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Administrátor | Správce nemovitostí | Účetní      | Pouze čtení |
|------------------------------|:-------------:|:-------------------:|:-----------:|:-----------:|
| Zobrazit seznam              |      ✅       |         ✅          |     ✅      |     ✅      |
| Zobrazit detail              |      ✅       |         ✅          |     ✅      |     ✅      |
| Přidat nájemníka             |      ✅       |         ✅          |     ❌      |     ❌      |
| Upravit nájemníka            |      ✅       |         ✅          |     ❌      |     ❌      |
| Smazat nájemníka             |      ✅       |         ❌          |     ❌      |     ❌      |
| Archivovat nájemníka         |      ✅       |         ✅          |     ❌      |     ❌      |
| Exportovat data subjektu     |      ✅       |         ✅          |     ✅      |     ❌      |
| Importovat data (hromadně)   |      ✅       |         ✅          |     ❌      |     ❌      |
| Přidat / upravit zástupce    |      ✅       |         ✅          |     ❌      |     ❌      |
| Přiřadit správce/roli        |      ✅       |         ✅*         |     ❌      |     ❌      |
| Změna stavu (aktivní/archiv) |      ✅       |         ✅          |     ❌      |     ❌      |
| Zobrazení historie změn      |      ✅       |         ✅          |     ✅      |     ❌      |
| Připojit dokument            |      ✅       |         ✅          |     ❌      |     ❌      |
| Vyhledávání, filtrování      |      ✅       |         ✅          |     ✅      |     ✅      |
| Zobrazit napojené jednotky   |      ✅       |         ✅          |     ✅      |     ✅      |
| Statistiky a využití         |      ✅       |         ✅          |     ✅      |     ❌      |

---

## 📑 Doporučené workflow

1. Založení nového nájemníka → přiřazení jednotky/smlouvy → evidence dokumentů a plateb → notifikace
2. Přidání/odebrání zástupce → notifikace správci, nájemníkovi, zástupci
3. Ukončení smlouvy/výpověď → automatická změna stavu, evidence změn, notifikace
4. Hromadné importy/exporty → validace, kontrola duplicit, audit
5. Automatizované notifikace (expirace smlouvy, změna údajů, nové dokumenty)
6. **Ověření v ARES – automatické doplnění údajů a audit změny** (nové)

---

## 📚 Reference

- [common-actions.md](./common-actions.md)
- [permissions-catalog.md](./permissions-catalog.md)
- [pravidla.md](./pravidla.md)
- [struktura-app.md](./struktura-app.md)
- [Modul Smlouva](./smlouva.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Pronajímatel](./pronajimatel.md)
- [Modul Platby](./platby.md)
- [Modul Služby](./sluzby.md)
- [Modul Dokumenty](./dokumenty.md)

---

> Modul Nájemník je klíčovou součástí systému – tvoří základ pro správné fungování dalších navázaných modulů (smlouvy, platby, služby, jednotky atd.).  
> Všechny změny jsou prováděny v souladu s pravidly, **nic není mazáno, pouze rozšiřováno, přeškrtáváno nebo poznámkováno!**
