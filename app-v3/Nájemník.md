> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)

# Modul: Nájemník

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Přehled nájemníků | Hlavní dlaždice s přehledem všech subjektů/nájemníků |
| ✅   | 🟦 Přidání/editace nájemníka | Formulář pro přidání a úpravu subjektu |
| ✅   | 🟦 Detail nájemníka | Detailní pohled na nájemníka, napojení na další entity |
| ✅   | 🟦 Správa zástupců | Evidence a změny zástupců subjektu |
| ✅   | 🟦 Auditní log a historie změn | Záznamy všech změn dat subjektů |
| ✅   | 🟦 Statistiky a využití | Obsazenost, historie změn, grafy |
| ✅   | 🟦 Import/Export nájemníků | Hromadný import/export, validace, duplicit |
| ✅   | 🟦 Přehled dokumentů | Evidence smluv, příloh a dalších dokumentů k subjektu |
| ✅   | 🟦 Nastavení modulu | Nastavení povinných polí, práv, workflow |
| ✅   | 🟦 Notifikace a upozornění | Přehled odeslaných notifikací, šablony, nastavení |
| ✅   | 🟦 Průvodce založením nájemníka | Wizard pro zakládání subjektu, možnost návratu |
| ✅   | 🟦 Vazby na další entity | Přehled vazeb na jednotky, smlouvy, platby, služby, uživatele |
| ✅   | 🟦 GDPR & anonymizace | Export, anonymizace a auditní logy |
| 🗒️   | 🗒️ Poznámky, nápady, úkoly | Vše ostatní, nejasné body, rozpracované úkoly |

---

## 🟦 Přehled nájemníků

### ✅ Checklist pro dokumentaci sekce
- ✅ Účel a základní možnosti (seznam, hledání, filtrování, export, import)
- ✅ Kdo má přístup/viditelnost
- ✅ Výčet a popis polí (v přehledu i detailu)
- ✅ Hromadné akce (změna stavu, export, generování výzev)
- ✅ Chybové stavy (duplicitní e-mail, rodné číslo apod.)
- ✅ Oprávnění a workflow

#### Popis  
Seznam všech nájemníků (osoby i firmy), možnost filtrování (stav, typ, jednotka), rychlé akce, export do CSV/XLSX.

#### Pole  
| Pole            | Povinné | Typ    | Popis                          |
|-----------------|:-------:|--------|--------------------------------|
| Jméno           |   Ano   | text   |                               |
| Příjmení        |   Ano   | text   |                               |
| Typ subjektu    |   Ano   | enum   | osoba/firma                   |
| Stav            |   Ano   | enum   | aktivní/archiv                |
| Jednotka        |   Ne    | vazba  |                               |
| E-mail          |   Ano   | e-mail | Unikátní, validace duplicity  |
| Telefon         |   Ne    | tel    |                               |
| ...             |         |        |                               |

#### Hromadné akce  
- Export vybraných
- Hromadná změna stavu
- Hromadné generování výzev/oznámení

#### Filtrování  
- Podle jména, stavu, typu, jednotky, datumu přidání, atd.

---

## 🟦 Přidání/editace nájemníka

### ✅ Checklist pro dokumentaci sekce
- ✅ Formulář pro přidání/editaci (validace, duplicitní údaje, povinná pole)
- ✅ Workflow při založení/editaci
- ✅ Napojení na další entity (jednotka, platby, smlouvy)
- ✅ Možnost přiřazení zástupce, správce

#### Povinná pole  
- Jméno, příjmení, e-mail, typ subjektu, stav, jednotka (pokud existuje), případně rodné číslo, číslo dokladu, firma: název, IČO

#### Validace  
- Unikátnost e-mailu, čísla dokladu, rodného čísla, loginu
- Formát e-mailu, telefonu
- Chybějící povinné pole = zvýraznit, zamezit uložení

#### Workflow  
- Uložení → možnost pokračovat v průvodci (wizard)
- Notifikace správci/nájemníkovi

---

## 🟦 Detail nájemníka

### ✅ Checklist pro dokumentaci sekce
- ✅ Všechny údaje, historie změn, napojení na další entity (jednotky, platby, smlouvy)
- ✅ Akce: editace, archivace, přidání zástupce, export dat, připojení dokumentu

---

## 🟦 Správa zástupců

### ✅ Checklist pro dokumentaci sekce
- ✅ Přidání, editace, odebrání zástupce
- ✅ Filtrování podle nájemníka, typu zástupce
- ✅ Zápis změn do auditního logu

---

## 🟦 Auditní log a historie změn

### ✅ Checklist pro dokumentaci sekce
- ✅ Evidence změn údajů, historie akcí, export logu
- ✅ Detail změny, kdo provedl, kdy

---

## 🟦 Statistiky a využití

### ✅ Checklist pro dokumentaci sekce
- ✅ Přehled počtů nájemníků, obsazenost, historie změn
- ✅ Export přehledů, grafy

---

## 🟦 Import/Export nájemníků

### ✅ Checklist pro dokumentaci sekce
- ✅ Hromadný import/export (CSV/XLSX/JSON)
- ✅ Validace duplicit, detailní report chyb
- ✅ Auditní log importu/exportu

---

## 🟦 Přehled dokumentů

### ✅ Checklist pro dokumentaci sekce
- ✅ Evidence smluv, příloh a dalších dokumentů
- ✅ Možnost připojit nový dokument, export, historie příloh

---

## 🟦 Nastavení modulu

### ✅ Checklist pro dokumentaci sekce
- ✅ Nastavení povinných polí, práv, workflow
- ✅ Možnost definovat vlastní typy subjektů, role, šablony

---

## 🟦 Notifikace a upozornění

### ✅ Checklist pro dokumentaci sekce
- ✅ Evidence notifikací, šablony, nastavení typů notifikací (expirace smlouvy, změna účtu, atd.)

---

## 🟦 Průvodce založením nájemníka

### ✅ Checklist pro dokumentaci sekce
- ✅ Wizard s možností návratu, uložení rozpracovaných dat, načtení údajů (jednotka, smlouva, platby)

---

## 🟦 Vazby na další entity

### ✅ Checklist pro dokumentaci sekce
- ✅ Přehled napojení na jednotky, smlouvy, platby, dokumenty, služby, uživatele

---

## 🟦 GDPR & anonymizace

### ✅ Checklist pro dokumentaci sekce
- ✅ Export dat, anonymizace, auditní log mazání/změn

---

## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Vše, co je nutné doplnit, rozpracováno, nejasné body (nic nemažu, vše zde):

- Ošetřit duplicity (e-mail, číslo dokladu, rodné číslo, login)
- Validace a ověřování údajů z ARES, ISZR, banky
- Přehled vazeb na další entity v detailu nájemníka
- Hromadné operace – import/export, změna stavu, generování výzev
- Automatizace notifikací a workflow pro výpovědi, přestěhování
- GDPR – anonymizace a export, auditní log
- UI/UX vylepšení, testování chybových stavů a workflow
- Rozšířit auditní log o hromadné změny
- Nastavit možnost role „pověřenec pro ochranu osobních údajů“
- Potřebujeme víceúrovňová práva pro editaci údajů nájemníka?
- Má být možné přiřadit více správců k jednomu nájemníkovi?
- Budeme evidovat i krátkodobé nájemníky (např. Airbnb)?
- Chceme automatickou kontrolu insolvenčního rejstříku?
- Má být možné povinné ověření kontaktu (e-mail, telefon)?
- Jaké notifikace mají být povinné (expirace smlouvy, změna účtu...)?

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

| Chyba / výjimka                              | Doporučené řešení / reakce systému                                  | Uživatelská hláška                                   | Logování/Audit      |
|----------------------------------------------|---------------------------------------------------------------------|------------------------------------------------------|---------------------|
| Duplicita e-mailu                            | Zamezit uložení, zvýraznit pole, nabídnout hledání existujícího     | „Tento e-mail je již použit u jiného nájemníka.“      | Povinně logovat     |
| Duplicita čísla dokladu                      | Zamezit uložení, zvýraznit pole                                     | „Číslo dokladu je již evidováno u jiného nájemníka.“  | Povinně logovat     |
| Změna trvalé adresy                          | Vyžádat potvrzení (e-mailem, schválení správcem)                    | „Byla změněna adresa, vyčkejte na potvrzení.“         | Logovat změnu + audit|
| Neplatná platba                              | Upozornit správce/účetní, označit platbu, nabídnout opravu           | „Platba je neplatná – kontaktujte správce.“           | Logovat pokus i řešení|
| Nepovolená změna jednotky                    | Nepovolit změnu, pokud existují neukončené platby/smlouvy           | „Nejprve ukončete platby/smlouvy k původní jednotce.“ | Logovat pokus       |
| Chybějící povinné pole                       | Zvýraznit pole, zamezit uložení                                     | „Vyplňte prosím všechna povinná pole.“                | Není nutné logovat  |
| Duplicitní rodné číslo / datum narození      | Zamezit uložení, zvýraznit pole                                     | „Zadané rodné číslo/datum narození je již evidováno.“ | Povinně logovat     |
| Neautorizovaná změna bankovního účtu         | Vyžadovat schválení správce nebo 2FA                                 | „Změna bankovního účtu čeká na schválení správce.“    | Povinně logovat     |
| Neplatný formát e-mailu/telefonu             | Zvýraznit pole, zamezit uložení                                     | „Zadaný e-mail/telefon není v platném formátu.“       | Není nutné logovat  |
| Neoprávněný přístup k údajům nájemníka       | Zamezit akci, přesměrovat/odmítnout                                 | „Nemáte oprávnění k této akci.“                       | Povinně logovat     |
| Nájemník je stále přiřazen k aktivní jednotce| Zamezit odstranění/archivaci                                        | „Nájemníka nelze odstranit – je stále přiřazen k jednotce.“ | Povinně logovat|
| Chyba při importu dat                        | Zobrazit detail chyby, umožnit částečný import                      | „Import obsahuje chyby – zkontrolujte detaily.“       | Logovat výskyt      |
| Chyba při exportu dat                        | Zobrazit chybovou hlášku, nabídnout opakování                       | „Export selhal, zkuste to prosím znovu.“              | Logovat detail      |

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

> Modul Nájemník je klíčovou součástí systému – tvoří základ pro správné fungování dalších navázaných modulů (smlouvy, platby, služby, jednotky atd.). Dokumentace bude rozšiřována podle vývoje a potřeb projektu.
