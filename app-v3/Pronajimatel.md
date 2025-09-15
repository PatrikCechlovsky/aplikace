> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

# Modul: Pronajímatel

---

## Stromová struktura modulu

| Stav | Sekce                        | Popis                                              |
|------|------------------------------|----------------------------------------------------|
| ✅   | 🟦 Přehled pronajímatelů      | Hlavní dlaždice s přehledem všech pronajímatelů    |
|      | ├── 👁️ Přehled pronajímatelů | Tabulka všech pronajímatelů                        |
|      | ├── 📝 Přidat pronajímatele   | Formulář pro přidání nového pronajímatele          |
|      | ├── 📝 Editace pronajímatele  | Formulář pro editaci pronajímatele                 |
|      | └── 👁️ Detail pronajímatele  | Detailní pohled na pronajímatele                   |
| ✅   | 🟦 Správa pověření a sdílení  | Evidence a správa pověřených osob                  |
| ✅   | 🟦 Auditní log / historie změn| Auditní záznamy a historie změn                    |
| ✅   | 🟦 Statistiky a reporting     | Statistiky a reporting aktivit                     |
| ✅   | 🟦 Import/Export pronajímatelů| Import a export subjektů                           |
| ✅   | 🟦 Přehled dokumentů          | Evidence a správa dokumentů/příloh                 |
| ✅   | 🟦 Nastavení modulu           | Nastavení a konfigurace modulu                     |
| ✅   | 🟦 Notifikace a upozornění    | Přehled a správa notifikací                        |
| ✅   | 🟦 Vazby na další entity      | Přehled vazeb na nemovitosti, jednotky, smlouvy    |
| 🗒️   | 🗒️ Poznámky, nápady a úkoly  | Vše ostatní, nejasné body, rozpracované úkoly      |

---

## 🟦 Přehled pronajímatelů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Evidence všech vlastníků nemovitostí (osoby, firmy, spolky, instituce), jejich kontaktů, historie a vazeb na nemovitosti/jednotky.

### Kdo má přístup/viditelnost
| Role                  | Přístup |
|-----------------------|---------|
| Administrátor         | Plný    |
| Správce nemovitostí   | Plný    |
| Účetní                | Čtení   |
| Prohlížející          | Čtení   |

### Pole (přehled i detail)
| Pole             | Povinné | Typ           | Popis                                  |
|------------------|:-------:|--------------|----------------------------------------|
| Název/jméno      |   Ano   | text         |                                        |
| Typ subjektu     |   Ano   | enum         | osoba/firma/spolek/instituce           |
| Stav             |   Ano   | enum         | aktivní/archiv/pozváno/čeká/zablok.    |
| IČO              |   Ne    | text         | Firmy/spolky/instituce                 |
| DIČ              |   Ne    | text         | Firmy                                  |
| E-mail           |   Ano   | e-mail       | Unikátní, validace duplicity           |
| Telefon          |   Ne    | tel          |                                        |
| Adresa           |   Ne    | text         |                                        |
| Bankovní účet    |   Ne    | text         |                                        |
| ...              |         |              |                                        |

### Filtrování, řazení, akce
- Filtrování: podle typu, stavu, IČO, jména, datumu
- Řazení: jméno, stav, datum přidání
- Hromadné akce: změna stavu, export, přiřazení správce

### Ukázka tabulky
| Název          | Typ    | Stav    | IČO     | E-mail             | Akce       |
|----------------|--------|---------|---------|--------------------|------------|
| Jan Novák      | osoba  | aktivní |         | jan.novak@...      | [Zobrazit] |

### Validace, tlačítka, workflow
- Validace unikátnosti e-mailu, IČO
- Povinná pole zvýraznit, zamezit uložení
- Tlačítka: Přidat, Upravit, Archivovat, Export, Hromadná akce
- Workflow: Nový → Pozváno → Aktivní → (Archiv/Blokace)

### Chybové stavy
- Duplicitní e-mail, IČO
- Neplatný formát e-mailu/telefonu
- Chybějící povinné pole

### Oprávnění a viditelnost
Viz výše tabulka Kdo má přístup. Práva lze dále upřesnit v detailu.

### Vazby na další moduly a reference
- Nemovitost, Jednotka, Smlouva, Platby, Dokumenty, Uživatelé, Auditní log

### Specifika, rozšíření
- Možnost více vlastníků jedné nemovitosti (podíly)
- GDPR – anonymizace, export

---

## 🟦 Přidat / Editovat pronajímatele

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Formulář pro založení/editaci pronajímatele, validace, možnost uložit rozpracovaná data.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole (formulář)
Viz tabulka v sekci Přehled (včetně validací).

### Validace, tlačítka, workflow
- Povinná pole zvýraznit, validovat unikátnost
- Tlačítka: Uložit, Pokračovat v průvodci, Zrušit
- Workflow: Možnost uložit „rozpracováno“, pokračovat později

### Chybové stavy
- Duplicitní e-mail, IČO
- Neplatný formát
- Chybějící povinné pole

### Oprávnění a viditelnost
Správce, administrátor

### Vazby na další moduly a reference
- Automatické vytvoření vazby na Nemovitost, Jednotku

### Specifika, rozšíření
- Průvodce založením, možnost přiřadit pověřené osoby

---

## 🟦 Detail pronajímatele

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Zobrazení všech údajů, historie změn, napojení na nemovitosti, jednotky, auditní log.

### Kdo má přístup/viditelnost
Správce, administrátor, účetní (čtení)

### Pole (přehled i detail)
Všechny údaje včetně auditní historie, napojení na nemovitosti, jednotky, dokumenty

### Akce
- Editace, Archivace, Přidání pověřené osoby, Export dat, Připojení dokumentu

### Validace, tlačítka, workflow
- Validace pouze při editaci
- Tlačítka: Upravit, Archivovat, Exportovat, Přidat pověřenou osobu

### Chybové stavy
- Pokus o změnu neaktivního/archivovaného subjektu
- Neoprávněný přístup

### Oprávnění a viditelnost
Dle role, viz tabulka v Oprávnění

### Vazby na další moduly a reference
Nemovitost, Jednotka, Dokumenty

### Specifika, rozšíření
- Historie všech nemovitostí, kde byl veden
- GDPR export, anonymizace

---

## 🟦 Správa pověření a sdílení

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Správa vztahů pověřených osob k pronajímateli, možnost přidání, editace, odebrání.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole
- Název pověřené osoby, typ vztahu, kontakty

### Filtrování, řazení, akce
- Filtrování podle pronajímatele, typu pověření
- Akce: Přidat, Editovat, Odebrat

### Validace, tlačítka, workflow
- Unikátnost pověření pro pronajímatele
- Zápis změn do auditního logu

### Chybové stavy
- Duplicitní pověření
- Neplatné kontakty

### Oprávnění a viditelnost
Správce, administrátor

### Vazby na další moduly a reference
- Detail pronajímatele, Auditní log

### Specifika, rozšíření
- Možnost více pověření na jednoho pronajímatele

---

## 🟦 Auditní log a historie změn

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Evidence všech změn údajů pronajímatele (včetně importů, exportů, změn stavu).

### Kdo má přístup/viditelnost
Správce, administrátor, účetní (čtení)

### Pole
- Typ změny, kdo provedl, kdy, původní/nová hodnota

### Filtrování, řazení, akce
- Filtrování podle typu změny, data, subjektu

### Akce
- Export auditního logu, zobrazení detailu změny

### Specifika, rozšíření
- Možnost auditovat i hromadné operace

---

## 🟦 Statistiky a reporting

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Statistika počtů pronajímatelů, typů, nemovitostí, historie změn.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole
- Počet pronajímatelů, rozpad podle typů, obsazenost nemovitostí

### Akce
- Export grafů a reportů

---

## 🟦 Import/Export pronajímatelů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Hromadný import/export subjektů (CSV, XLSX, JSON), včetně validací a kontroly duplicit.

### Kdo má přístup/viditelnost
Správce, administrátor

### Akce
- Import, Export, Report chyb, Audit importu

### Validace
- Kontrola duplicit, povinných polí, správný formát

---

## 🟦 Přehled dokumentů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
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
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
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
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Evidence, nastavení a správa notifikací k událostem (změna vlastnictví, nové dokumenty, blokace, atd.).

### Kdo má přístup/viditelnost
Správce, administrátor

---

## 🟦 Vazby na další entity

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

### Účel sekce/dlaždice
Přehled napojení na nemovitosti, jednotky, smlouvy, dokumenty, uživatele.

---

## 🗒️ Poznámky, nápady a úkoly

> Sem si piš vše, co tě napadne, co je potřeba doplnit, změnit nebo vyřešit.
> Pokud je úkol hotový, přeškrtni ho a označ stavovou ikonou.  
> Pokud je rozpracovaný, přidej ⏳, pokud čeká na rozhodnutí, přidej > TODO: …

- ⏳ Ošetřit duplicity (e-mail, IČO)
- ⏳ Validace a ověřování údajů z ARES/ISZR
- ⏳ Podpora více vlastníků jedné nemovitosti (podíly)
- ⏳ Automatizace notifikací (změna stavu, nové dokumenty)
- ⏳ GDPR – anonymizace a export, auditní log
- ⏳ Hromadné operace – import/export, změna stavu
- ⏳ Workflow při změně vlastnické struktury
- ⏳ Možnost archivace vs. smazání (pravidla pro mazání)
- ⏳ Rozšířit auditní log o hromadné změny
- ⏳ Napojení na externí registry (katastr, ISZR)
- ⏳ Potřebujeme možnost sdíleného vlastnictví (více osob/firem)?
- ⏳ Umožnit pověření správce více nemovitostí najednou?
- ⏳ Chceme automatickou kontrolu insolvenčního rejstříku?
- ⏳ Jaké notifikace mají být povinné?

---

## 🗃️ Datové modely (ukázka)
```json
{
  "id": "100",
  "typ_subjektu": "osoba",
  "role": "pronajimatel",
  "jmeno": "Jan",
  "prijmeni": "Novák",
  "ico": "",
  "dic": "",
  "email": "jan.novak@email.cz",
  "telefon": "+420777888999",
  "adresa": "Ulice 1, Praha",
  "bankovni_ucet": "123456789/0800",
  "stav": "aktivni",
  "vlastnictvi": [
    { "nemovitost_id": "12", "podil": 1 }
  ],
  "povjereni": [
    { "osoba_id": "200", "typ": "správce" }
  ],
  "created_at": "2025-09-10T09:00:00Z",
  "updated_at": "2025-09-10T09:10:00Z"
}
```
```json
{
  "id": "101",
  "typ_subjektu": "firma",
  "role": "pronajimatel",
  "nazev": "Property Invest s.r.o.",
  "ico": "88899977",
  "dic": "CZ88899977",
  "email": "info@propertyinvest.cz",
  "telefon": "+420543211234",
  "adresa": "Investiční 12, Brno",
  "bankovni_ucet": "987654321/0300",
  "stav": "aktivni",
  "vlastnictvi": [
    { "nemovitost_id": "13", "podil": 0.5 },
    { "nemovitost_id": "14", "podil": 1 }
  ],
  "povjereni": [],
  "created_at": "2025-09-10T08:00:00Z",
  "updated_at": "2025-09-10T09:05:00Z"
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                            | Doporučené řešení / reakce systému                        | Uživatelská hláška                                          | Logování/Audit |
|--------------------------------------------|-----------------------------------------------------------|-------------------------------------------------------------|----------------|
| Duplicita e-mailu                          | Zamezit uložení, zvýraznit pole, nabídnout hledání        | „Tento e-mail je již použit u jiného pronajímatele.“        | Povinně logovat|
| Duplicita IČO                              | Zamezit uložení, zvýraznit pole                           | „Zadané IČO je již evidováno u jiného pronajímatele.“       | Povinně logovat|
| Změna bankovního účtu                      | Vyžadovat potvrzení správce nebo dvoufaktorové potvrzení   | „Změna bankovního účtu čeká na schválení správce.“          | Povinně logovat|
| Chybějící povinné pole                     | Zvýraznit pole, zamezit uložení                            | „Vyplňte prosím všechna povinná pole.“                      | Není nutné     |
| Neplatný formát e-mailu/telefonu           | Zvýraznit pole, zamezit uložení                            | „Zadaný e-mail/telefon není v platném formátu.“             | Není nutné     |
| Neoprávněný přístup k údajům pronajímatele | Zamezit akci, přesměrovat/odmítnout                       | „Nemáte oprávnění k této akci.“                             | Povinně logovat|
| Pronajímatel je stále vlastníkem nemovitosti| Zamezit odstranění/archivaci                              | „Pronajímatele nelze odstranit – je vlastníkem nemovitosti.“| Povinně logovat|
| Chyba při importu dat                      | Zobrazit detail chyby, umožnit částečný import             | „Import obsahuje chyby – zkontrolujte detaily.“             | Logovat výskyt |
| Chyba při exportu dat                      | Zobrazit chybovou hlášku, nabídnout opakování              | „Export selhal, zkuste to prosím znovu.“                    | Logovat detail |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Administrátor | Správce nemovitostí | Účetní      | Pouze čtení |
|------------------------------|:-------------:|:-------------------:|:-----------:|:-----------:|
| Zobrazit seznam              |      ✅       |         ✅          |     ✅      |     ✅      |
| Zobrazit detail              |      ✅       |         ✅          |     ✅      |     ✅      |
| Přidat pronajímatele         |      ✅       |         ✅          |     ❌      |     ❌      |
| Upravit pronajímatele        |      ✅       |         ✅          |     ❌      |     ❌      |
| Smazat pronajímatele         |      ✅       |         ❌          |     ❌      |     ❌      |
| Archivovat pronajímatele     |      ✅       |         ✅          |     ❌      |     ❌      |
| Exportovat data subjektu     |      ✅       |         ✅          |     ✅      |     ❌      |
| Importovat data (hromadně)   |      ✅       |         ✅          |     ❌      |     ❌      |
| Přidat / upravit pověření    |      ✅       |         ✅          |     ❌      |     ❌      |
| Přiřadit správce/roli        |      ✅       |         ✅*         |     ❌      |     ❌      |
| Změna stavu (aktivní/archiv) |      ✅       |         ✅          |     ❌      |     ❌      |
| Zobrazení historie změn      |      ✅       |         ✅          |     ✅      |     ❌      |
| Připojit dokument            |      ✅       |         ✅          |     ❌      |     ❌      |
| Vyhledávání, filtrování      |      ✅       |         ✅          |     ✅      |     ✅      |
| Zobrazit napojené nemovitosti|      ✅       |         ✅          |     ✅      |     ✅      |
| Statistiky a reporting       |      ✅       |         ✅          |     ✅      |     ❌      |

---

## 📑 Doporučené workflow

1. Založení nového pronajímatele → přiřazení nemovitosti → evidence dokumentů → notifikace
2. Přidání/odebrání pověřené osoby → notifikace správci/pronajímateli
3. Změna vlastnické struktury → automatická změna stavu, evidence změn, notifikace
4. Hromadné importy/exporty → validace, kontrola duplicit, audit
5. Automatizované notifikace (změna stavu, nové dokumenty, blokace)

---

## 📚 Reference

- [Modul Nemovitost](./nemovitost.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Nájemník](./najemnik.md)
- [Modul Platby](./platby.md)
- [Modul Dokumenty](./dokumenty.md)

---

> Modul Pronajímatel je základním kamenem správy portfolia – umožňuje správnou evidenci vlastníků, sdílení práv, auditní dohledatelnost a napojení na klíčové entity systému. Důsledná validace a workflow zajišťují správnost a bezpečnost dat.
