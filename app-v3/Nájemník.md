> ℹ️ **PRAVIDLA:** [pravidla-rychly-prehled.md](./pravidla-rychly-prehled.md) | [pravidla.md](./pravidla.md) | [návod pro Copilot](./pravidla-pro-copilot.md)
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

## 🟦 Přidat / Editovat nájemníka

### Účel sekce/dlaždice
Formulář pro založení/editaci subjektu, validace, možnost uložit rozpracovaná data.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole (formulář)
Viz tabulka v sekci Přehled (včetně validací).

### Filtrování, řazení, akce
N/A – jednorázová akce.

### Validace, tlačítka, workflow
- Povinná pole zvýraznit, validovat unikátnost
- Tlačítka: Uložit, Pokračovat v průvodci, Zrušit
- Workflow: Možnost uložit „rozpracováno“, pokračovat později

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

## 🟦 Detail nájemníka

### Účel sekce/dlaždice
Zobrazení všech údajů, historie změn, napojení na další entity.

### Kdo má přístup/viditelnost
Správce, administrátor, účetní (čtení)

### Pole (přehled i detail)
Všechny údaje včetně auditní historie, napojení na jednotky, smlouvy, platby, dokumenty

### Filtrování, řazení, akce
- Akce: Editace, Archivace, Přidání zástupce, Export dat, Připojení dokumentu

### Validace, tlačítka, workflow
- Validace pouze při editaci
- Tlačítka: Upravit, Archivovat, Exportovat, Přidat zástupce

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

### Účel sekce/dlaždice
Správa vztahů zástupců k nájemníkům, možnost přidání, editace, odebrání.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole
- Název zástupce, vazba na nájemníka, typ zástupce, kontakty

### Filtrování, řazení, akce
- Filtrování podle nájemníka, typu zástupce
- Akce: Přidat, Editovat, Odebrat

### Validace, tlačítka, workflow
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

### Účel sekce/dlaždice
Evidence všech změn údajů nájemníka (včetně importů, exportů, změn stavu).

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

## 🟦 Statistiky a využití

### Účel sekce/dlaždice
Statistika počtů nájemníků, obsazenost, změny.

### Kdo má přístup/viditelnost
Správce, administrátor

### Pole
- Počet nájemníků, obsazenost jednotek, historie změn

### Akce
- Export grafů a reportů

---

## 🟦 Import/Export nájemníků

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

### Účel sekce/dlaždice
Evidence a správa dokumentů/příloh k subjektu.

### Kdo má přístup/viditelnost
Správce, administrátor

### Akce
- Přidat dokument, export, historie příloh

---

## 🟦 Nastavení modulu

### Účel sekce/dlaždice
Nastavení povinných polí, práv, workflow, typů subjektů a šablon.

### Kdo má přístup/viditelnost
Administrátor

---

## 🟦 Notifikace a upozornění

### Účel sekce/dlaždice
Evidence, nastavení a správa notifikací k událostem (expirace smlouvy, změna účtu, nové dokumenty).

### Kdo má přístup/viditelnost
Správce, administrátor

---

## 🟦 Průvodce založením nájemníka

### Účel sekce/dlaždice
Wizard pro snadné zadání nájemníka, možnost uložit rozpracovaná data, přeskočit kroky, vrátit se později.

### Kdo má přístup/viditelnost
Správce, administrátor

---

## 🟦 Vazby na další entity

### Účel sekce/dlaždice
Přehled napojení na jednotky, smlouvy, platby, dokumenty, služby, uživatele.

---

## 🟦 GDPR & anonymizace

### Účel sekce/dlaždice
Export dat, anonymizace, auditní log mazání/změn, workflow pro GDPR požadavky.

---

## 🗒️ Poznámky, nápady a úkoly

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
