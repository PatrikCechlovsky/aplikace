> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

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
|      | ├── 📝 Přidat/editovat zástupce | Formulář pro správu zástupců                   |
| ✅   | 🟦 Auditní log / historie změn | Auditní záznamy a historie změn                  |
| ✅   | 🟦 Statistiky a využití      | Statistiky využití a přehled dat                  |
| ✅   | 🟦 Import/Export nájemníků   | Import a export subjektů                          |
| ✅   | 🟦 Přehled dokumentů         | Správa a přehled dokumentů/příloh                 |
| ✅   | 🟦 Nastavení modulu          | Nastavení a konfigurace modulu                    |
| ✅   | 🟦 Notifikace a upozornění   | Přehled a správa notifikací                       |
| ✅   | 🟦 Průvodce založením        | Průvodce pro založení subjektu                    |
| ⏳   | 🟦 Vazby na další entity     | Přehled vazeb na jednotky, smlouvy, platby, uživatele |
| 🚫   | ~~Staré sekce nebo neaktuální~~ | ~~Případné původní struktury~~                 |

---

## 🟦 Přehled nájemníků

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře

- [x] Účel sekce/dlaždice (proč existuje, kdo ji používá)
- [x] Kdo má přístup/viditelnost podle oprávnění/rolí
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce a vazby na další části (např. detail, editace, přidání...)
- [x] Výčet a popis všech sloupců (název, význam, povinný/volitelný, filtr/řazení)
- [x] Filtrování a řazení (jaké možnosti, kde jsou dostupné)
- [x] Akce v řádku (ikony/tlačítka, popis co dělají, u jakého stavu jsou viditelné)
- [x] Hromadné akce nad tabulkou (výčet, kdo může spustit)
- [x] Ukázka tabulky s příklady
- [x] Výčet a popis všech polí (povinné x nepovinné, typ pole, validace)
- [x] Stavové pole (aktivní, zablokován, ...), kdo je může měnit
- [x] Tlačítka ve formuláři (uložit, zrušit, další speciální akce)
- [x] Jaké validace probíhají (na úrovni pole, na úrovni formuláře)
- [x] Co vše se zobrazuje v detailu (všechna pole, historie, audit, navazující akce)
- [x] Akce dostupné v detailu (editace, deaktivace, atd.)
- [x] Přehled všech možných akcí (kdy, kdo, s jakým oprávněním)
- [x] Stavové přechody (jaké jsou povolené přechody mezi stavy, kdo je může provádět)
- [x] Napojení na další workflow (notifikace, audit, schvalování, ...)
- [x] Přehled rolí, které mají přístup (tabulka rolí x akce)
- [x] Specifika pro různé role (např. admin může vždy, běžný uživatel nikdy)
- [x] Výčet typických chybových stavů (duplicitní záznam, neplatný formát, ...)
- [x] Uživatelské hlášky (co přesně se zobrazí)
- [x] Možnosti exportu/importu (jaký formát, kdo může)
- [x] Logování a audit (kdo, kdy, co změnil)
- [x] GDPR požadavky (export osobních údajů, anonymizace, ...)
- [x] Na jaké další moduly sekce/formulář navazuje
- [x] Reference na související workflow, entity, dokumentaci
- [x] Speciální workflow (SSO, API účet, 2FA, ...), bezpečnostní poznámky
- [x] Možné rozšíření do budoucna, TODO, poznámky

### Účel sekce/dlaždice
Evidence všech osob, firem nebo institucí, které užívají byt/jednotku/prostor v portfoliu, základní hledání, filtrování, export, rychlé akce.

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
| Jméno            |   Ano   | text         |                                        |
| Příjmení         |   Ano   | text         |                                        |
| Typ subjektu     |   Ano   | enum         | osoba/osvc/firma/spolek/stat/zástupce  |
| Stav             |   Ano   | enum         | aktivní/archiv/pozváno/čeká/zablok.    |
| Jednotka         |   Ne    | vazba        |                                        |
| E-mail           |   Ano   | e-mail       | Unikátní, validace duplicity           |
| Telefon          |   Ne    | tel          |                                        |
| Bankovní účet    |   Ne    | text         |                                        |
| Login            |   Ne    | text         |                                        |
| Zástupce         |   Ne    | vazba        |                                        |
| ...              |         |              |                                        |

### Filtrování, řazení, akce
- Filtrování: podle typu, stavu, jednotky, jména, datumu
- Řazení: podle jména, stavu, data přidání
- Hromadné akce: změna stavu, export, generování výzev, přiřazení správce/jednotky

### Ukázka tabulky
| Jméno         | Příjmení   | Typ    | Stav    | Jednotka | E-mail              | Akce       |
|---------------|------------|--------|---------|----------|---------------------|------------|
| Jan           | Novák      | osoba  | aktivní | Byt 101  | jan.novak@...       | [Zobrazit] |

### Validace, tlačítka, workflow
- Validace unikátnosti e-mailu, čísla dokladu, loginu
- Povinné pole zvýraznit, zamezit uložení
- Tlačítka: Přidat, Upravit, Archivovat, Export, Hromadná akce
- Workflow: Nový → Pozváno → Aktivní → (Archiv/Blokace)

### Chybové stavy
- Duplicitní e-mail, číslo dokladu, RČ
- Neplatný formát e-mailu/telefonu
- Chybějící povinné pole

### Oprávnění a viditelnost
Viz výše tabulka Kdo má přístup. Práva lze dále upřesnit v detailu.

### Vazby na další moduly a reference
- Jednotka, Smlouva, Platby, Služby, Dokumenty, Uživatelé, Auditní log

### Specifika, rozšíření
- Podpora pro více typů subjektů, možnost filtrování dle stavu
- GDPR – anonymizace, export

---

## 📝 Přidat / Editovat nájemníka

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře

- [x] Účel sekce/dlaždice 
- [x] Kdo má přístup/viditelnost 
- [x] Zařazení v hlavní stromové struktuře 
- [x] Podsekce a vazby 
- [x] Výčet a popis všech polí
- [x] Tlačítka ve formuláři
- [x] Validace
- [x] Chybové stavy
- [x] Oprávnění a viditelnost
- [x] Vazby na další moduly
- [x] Specifika, rozšíření

### Účel sekce/dlaždice
Formulář pro založení/editaci subjektu, validace, možnost uložit rozpracovaná data.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole (formulář)
Viz tabulka v sekci Přehled (včetně validací).

### Akce / Tlačítka
- Uložit
- Pokračovat v průvodci
- Zrušit

### Validace
- Povinná pole zvýraznit, validovat unikátnost
- Validace e-mailu, čísla dokladu atd.

### Chybové stavy
- Duplicitní e-mail, doklad, login
- Neplatný formát
- Chybějící povinné pole

### Oprávnění a viditelnost
Správce, administrátor

### Vazby na další moduly a reference
- Automatické vytvoření vazby na Jednotku, Smlouvu, Platby

### Specifika, rozšíření
- Průvodce založením, možnost přiřadit správce, zástupce

---

## 👁️ Detail nájemníka

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře

- [x] Účel sekce/dlaždice
- [x] Kdo má přístup/viditelnost
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce a vazby
- [x] Výčet a popis všech polí
- [x] Akce dostupné v detailu
- [x] Validace
- [x] Chybové stavy
- [x] Oprávnění a viditelnost
- [x] Vazby na další moduly
- [x] Specifika, rozšíření

### Účel sekce/dlaždice
Zobrazení všech údajů, historie změn, napojení na další entity.

### Kdo má přístup/viditelnost
Správce, administrátor, účetní (čtení)

### Pole (přehled i detail)
Všechny údaje včetně auditní historie, napojení na jednotky, smlouvy, platby, dokumenty

### Akce
- Editace
- Archivace
- Přidání zástupce
- Export dat
- Připojení dokumentu

### Validace
- Validace pouze při editaci

### Chybové stavy
- Pokus o změnu neaktivního/archivovaného subjektu
- Neoprávněný přístup

### Oprávnění a viditelnost
Dle role, viz tabulka v Oprávnění

### Vazby na další moduly a reference
- Jednotka, Smlouva, Platby, Služby, Dokumenty

### Specifika, rozšíření
- Historie všech jednotek, kde byl veden
- GDPR export, anonymizace

---

## 🟦 Správa zástupců

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře

- [x] Účel sekce/dlaždice 
- [x] Kdo má přístup/viditelnost 
- [x] Zařazení v hlavní stromové struktuře 
- [x] Podsekce a vazby 
- [x] Výčet a popis všech polí
- [x] Akce dostupné v sekci
- [x] Validace
- [x] Chybové stavy
- [x] Oprávnění a viditelnost
- [x] Vazby na další moduly
- [x] Specifika, rozšíření

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
- [x] Účel sekce
- [x] Kdo má přístup/viditelnost
- [x] Výčet a popis polí
- [x] Akce
- [x] Specifika, rozšíření

### Účel sekce/dlaždice
Evidence všech změn údajů nájemníka (včetně importů, exportů, změn stavu).

### Kdo má přístup/viditelnost
Správce, administrátor, účetní (čtení)

### Pole
- Typ změny, kdo provedl, kdy, původní/nová hodnota

### Akce
- Filtrování podle typu změny, data, subjektu
- Export auditního logu, zobrazení detailu změny

### Specifika, rozšíření
- Možnost auditovat i hromadné operace

---

~~## Staré sekce nebo neaktuální~~  
~~(Případné původní struktury, které byly nahrazeny nebo již nejsou používány)~~

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

| Chyba / výjimka                              | Doporučené řešení / reakce systému                                  | Uživatelská hláška                                   | Logování |
|----------------------------------------------|---------------------------------------------------------------------|------------------------------------------------------|----------|
| Duplicita e-mailu                            | Zamezit uložení, zvýraznit pole, nabídnout hledání existujícího     | „Tento e-mail je již použit u jiného nájemníka.“      | Povinné  |
| Duplicita čísla dokladu                      | Zamezit uložení, zvýraznit pole                                     | „Číslo dokladu je již evidováno u jiného nájemníka.“  | Povinné  |
| Změna trvalé adresy                          | Vyžádat potvrzení (e-mailem, schválení správcem)                    | „Byla změněna adresa, vyčkejte na potvrzení.“         | Logovat  |
| Neplatná platba                              | Upozornit správce/účetní, označit platbu, nabídnout opravu           | „Platba je neplatná – kontaktujte správce.“           | Logovat  |
| Nepovolená změna jednotky                    | Nepovolit změnu, pokud existují neukončené platby/smlouvy           | „Nejprve ukončete platby/smlouvy k původní jednotce.“ | Logovat  |
| Chybějící povinné pole                       | Zvýraznit pole, zamezit uložení                                     | „Vyplňte prosím všechna povinná pole.“                | Není     |
| Duplicitní rodné číslo / datum narození      | Zamezit uložení, zvýraznit pole                                     | „Zadané rodné číslo/datum narození je již evidováno.“ | Povinné  |
| Neautorizovaná změna bankovního účtu         | Vyžadovat schválení správce nebo 2FA                                 | „Změna bankovního účtu čeká na schválení správce.“   | Logovat  |
| Neplatný formát e-mailu/telefonu             | Zvýraznit pole, zamezit uložení                                     | „Zadaný e-mail/telefon není v platném formátu.“       | Není     |
| Neoprávněný přístup k údajům nájemníka       | Zamezit akci, přesměrovat/odmítnout                                 | „Nemáte oprávnění k této akci.“                       | Povinné  |
| Nájemník je stále přiřazen k aktivní jednotce| Zamezit odstranění/archivaci                                        | „Nájemníka nelze odstranit – je stále přiřazen k jednotce.“ | Povinné  |
| Chyba při importu dat                        | Zobrazit detail chyby, umožnit částečný import                      | „Import obsahuje chyby – zkontrolujte detaily.“       | Logovat  |
| Chyba při exportu dat                        | Zobrazit chybovou hlášku, nabídnout opakování                       | „Export selhal, zkuste to prosím znovu.“              | Logovat  |

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
| Statistiky využití           |      ✅       |         ✅          |     ✅      |     ❌      |

---

## 📑 Doporučené workflow

1. Založení nového nájemníka → přiřazení jednotky/smlouvy → evidence dokumentů a plateb → notifikace
2. Přidání/odebrání zástupce → notifikace správci, nájemníkovi, zástupci
3. Ukončení smlouvy/výpověď → automatická změna stavu, evidence změn, notifikace
4. Hromadné importy/exporty → validace, kontrola duplicit, audit
5. Automatizované notifikace (expirace smlouvy, změna údajů, nové dokumenty)

---

## 📚 Reference

- [Modul Smlouva](./smlouva.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Pronajímatel](./pronajimatel.md)
- [Modul Platby](./platby.md)
- [Modul Služby](./sluzby.md)
- [Modul Dokumenty](./dokumenty.md)

---

> Modul Nájemník je klíčovou součástí systému – tvoří základ pro správné fungování dalších navázaných modulů (smlouvy, platby, služby, jednotky atd.). Dokumentace bude rozšiřována dle potřeb a specifikací projektu.
