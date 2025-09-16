# ARCHITEKTURA A WORKFLOW MODULU SMLOUVA (doplněno Copilotem)

---

## 1. Formulář pro tvorbu a editaci smlouvy

### a) Dynamika a načítání dat z ostatních modulů
- Výběrová pole (dropdown/autocomplete) pro:
  - Pronajímatele (`pronajimatel_id`) – tahá se z modulu Pronajímatel (případně umožní vytvořit nového).
  - Nájemníka (`najemnik_id`) – tahá se z modulu Nájemník.
  - Nemovitost (`nemovitost_id`) – tahá se z modulu Nemovitost.
  - Jednotku (`jednotka_id`) – tahá se podle nemovitosti (filtrovaný výběr).
- Dynamické načtení: Po výběru jednotky se automaticky předvyplní rozloha, adresa, případně další technické údaje (patro, podíl, vybavení).
- Načítání vzorů smluv – uživatel vybírá z katalogu vzorů (modul Vzor Smlouvy); každý vzor má vlastní sadu povinných polí.

### b) Podpora více vzorů smluv
- V databázi je tabulka `vzor_smlouvy`.  
- V každém formuláři je výběrové pole „Vzor smlouvy“ a podle něj se zobrazuje/skrývá sada polí.
- Každý vzor má definováno, které proměnné je nutno doplnit (např. pro garáž, pro byt, pro komerční prostor…).
- Při změně vzoru se načtou výchozí hodnoty (např. z šablony nebo z údajů jednotky/nemovitosti).

### c) Sekce pro přílohy a další dokumenty
- V každém formuláři je sekce „Připojit dokument/přílohu“ (upload, výběr z šablon).
- Povinné přílohy (např. předávací protokol, kolaudace, revizní zpráva) lze vynucovat podle typu jednotky/vzoru.
- Podporuj možnost připojit více dokumentů (např. dodatky, foto, skeny, revizní protokoly).

---

## 2. Vazba na modul Dokumenty (app-v3/120-Dokumenty.md)

### a) Propojení Smlouva × Dokumenty
- Modul Smlouva slouží k tvorbě, generování a správě smluv/dokumentů.
- Modul Dokumenty je „globální knihovna“ – evidence, vyhledávání, filtrace, správa všech dokumentů napříč systémem.
- Každý dokument vytvořený v modulu Smlouva (smlouva, předávací protokol, dodatek, splátkový kalendář…) se zapíše také jako záznam do modulu Dokumenty, s referencí na původní entitu (`smlouva_id`, `protokol_id` atd.).
- V modulu Dokumenty se dokument pouze zobrazuje, lze ho stáhnout, verzovat, případně exportovat, ale nevytváří se zde – tvorba probíhá v modulu Smlouva.

### b) Výhody tohoto dělení
- Jasné workflow: Smlouvy a návazné dokumenty vznikají pouze v modulu Smlouva, nejsou „rozeseté“.
- Modul Dokumenty funguje jako auditní knihovna a centrální úložiště – možno filtrovat podle typu, entity, stavu apod.
- Dokument lze z Dokumentů i smazat/anonymizovat (pokud to dovolí práva a pravidla).

---

## 3. Co nesmí chybět v modulu Smlouva

- Podpora více vzorů smluv (možnost rozšiřovat vzory bez zásahu do UI).
- Vazby na všechny klíčové entity přes ID (pronajímatel, nájemník, jednotka, nemovitost, protokol, dodatky…).
- Možnost elektronického podpisu (i více stran).
- Povinné přílohy podle typu smlouvy/jednotky.
- Historie změn, audit, workflow podpisů a schvalování.
- Automatické generování platebních předpisů (podle parametrů smlouvy).
- Možnost hromadných operací (import, export, archivace, generování).
- Vazba na externí registry (např. ARES pro validaci firem, KN pro validaci nemovitosti).

---

## 4. Konkrétní doporučení pro implementaci

- **Formulář Smlouvy**:
  - Pole pro výběr vzoru smlouvy, pronajímatele, nájemníka, nemovitosti, jednotky (vše ID).
  - Automatické načtení údajů o jednotce/nemovitosti po výběru.
  - Povinné přílohy dynamicky podle vzoru/typu.
  - Pole pro podpisové strany, nutnost elektronického podpisu.
  - Možnost přidat poznámku, označit dokument jako „přílohu“ (předsmluvní dokument).

- **Propojení na Dokumenty**:
  - Po uložení/vygenerování smlouvy/přílohy se vloží záznam do modulu Dokumenty s odkazem na zdroj (např. `typ_dokumentu: „nájemní smlouva“, entity: {smlouva_id: 501}`)
  - V Dokumentech je možné dokument jen zobrazit či stáhnout.

---

## Jak bych to udělal já?
- Všechny generované dokumenty (smlouvy, protokoly, dodatky) vznikají výhradně přes modul Smlouva.
- Všechny dokumenty, které mají být v systému uchovány, se po vytvoření automaticky zapisují i do modulu Dokumenty.
- V modulu Dokumenty se pouze zobrazují, stahují, exportují a archivují – nikdy se zde už nová smlouva „netvoří“.
- Formulář Smlouvy je dynamický – načítá data z ostatních modulů podle výběru uživatele a vzoru.

---
# Modul: Smlouva

> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 📄 Nájemní smlouvy | Evidence všech uzavřených smluv |
| ✅   | 📑 Vzor smlouvy | Editace a správa šablon |
| ✅   | 📃 Předávací protokol | Evidence a generování protokolů |
| ✅   | 📚 Archiv vzorů a protokolů | Archivace dokumentů |
| ✅   | 📋 Dohoda o splátkách | Evidence dohod, generování splátkových kalendářů |
| ⏳   | ... | Další sekce dle potřeby |

---

## 📎 Krátký úvod – Co je modul Smlouva a kdy ho použít

**Modul Smlouva** slouží k evidenci, správě a generování všech typů smluv souvisejících s nájmem nemovitostí a jednotek.  
Podporuje práci s nájemními smlouvami, předávacími protokoly a vzory dokumentů, které lze generovat automaticky na základě údajů o pronajímateli, nájemníkovi, nemovitosti a jednotce.

### Kdy modul použít?
- K evidenci a správě všech smluvních vztahů v rámci nemovitostí (nájemní smlouvy, dodatky, předávací protokoly atd.).
- Pro automatizované generování smluv a protokolů z údajů v systému.
- Pokud potřebuješ sledovat historii smluv, jejich platnost, expirace, dodatky a archiv.
- Při potřebě tisknout, exportovat či podepisovat smlouvy elektronicky.
- Pro monitoring a audit změn smluv a jejich verzí.

### Typické využití
- Správa nájemních smluv mezi pronajímatelem a nájemníkem pro konkrétní jednotku.
- Generování a archivace předávacích protokolů při nastěhování/vystěhování.
- Práce s vzorovými dokumenty, které se automaticky plní daty z ostatních modulů.
- Evidence dodatků, výpovědí, ukončení nájmu.
- Automatizace výpočtů (nájem, služby, zálohy) a generování platebních předpisů.

---

## 📄 Dlaždice: Nájemní smlouvy

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce/dlaždice (evidence smluv mezi pronajímatelem a nájemníkem)
- [x] Kdo má přístup/viditelnost podle oprávnění/rolí (viz tabulka níže)
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce: detail, editace, archivace
- [x] Výčet a popis všech sloupců (číslo smlouvy, typ, stav, pronajímatel, nájemník, jednotka, platnost, přílohy)
- [x] Filtrování a řazení (stav, typ, datum, strany, jednotka)
- [x] Akce v řádku (ikony/tlačítka: detail, editace, export, podpis, archivace)
- [x] Hromadné akce nad tabulkou (export, import, archivace)
- [x] Ukázka tabulky s příklady (viz "Datový model" níže)
- [x] Výčet a popis všech polí formuláře (viz "Datový model" níže)
- [x] Výchozí hodnoty, předvyplnění, skryté pole (automatické načítání údajů)
- [x] Stavové pole (stav smlouvy, podpis, archivace)
- [x] Tlačítka ve formuláři (uložit, zrušit, podepsat, exportovat, přidat přílohu)
- [x] Validace (duplicita čísla, povinná pole, neplatné datum)
- [x] Chování po odeslání (notifikace, audit log, změna stavu)
- [x] Co vše se zobrazuje v detailu (všechna pole, historie, audit, navazující akce)
- [x] Akce dostupné v detailu (editace, archivace, export, podpis)
- [x] Přehled všech možných akcí (viz tabulka "Funkce v přehledu")
- [x] Stavové přechody (návrh → platná → ukončená → archivní/nezobrazovatelná)
- [x] Napojení na další workflow (notifikace, audit, schvalování)
- [x] Přehled rolí, které mají přístup (viz tabulka "Role a oprávnění")
- [x] Specifika pro různé role (admin může vždy, běžný uživatel nikdy)
- [x] Výčet typických chybových stavů (duplicitní záznam, neplatný formát, ... viz tabulka níže)
- [x] Uživatelské hlášky (viz tabulka níže)
- [x] Specifika pro import/export (viz sekce "Hromadné operace")
- [x] Možnosti exportu/importu (PDF, CSV, XLSX)
- [x] Logování a audit (viz sekce "Historie a auditní log")
- [x] GDPR požadavky (export osobních údajů, anonymizace)
- [x] Na jaké další moduly sekce/formulář navazuje (Pronajímatel, Nájemník, Jednotka, Platby, Služby, Dokumenty)
- [x] Reference na workflow, entity, dokumentaci (viz sekce "Reference")
- [x] Speciální workflow (elektronický podpis, audit, SSO)
- [x] Možné rozšíření do budoucna, TODO, poznámky (viz sekce "Známé problémy / TODO")

---

## 📑 Dlaždice: Vzor smlouvy

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce/dlaždice
- [x] Kdo má přístup/viditelnost
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce: detail, editace, archivace
- [x] Výčet a popis všech polí
- [x] Validace a workflow
- [x] Akce a oprávnění
- [x] TODO: Doplnit ukázky šablon, rozšíření

---

## 📃 Dlaždice: Předávací protokol

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce/dlaždice
- [x] Kdo má přístup/viditelnost
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce: detail, editace, archivace
- [x] Výčet a popis všech polí
- [x] Validace a workflow
- [x] Akce a oprávnění
- [x] TODO: Doplnit ukázky workflow předání

---

## 📚 Dlaždice: Archiv vzorů a protokolů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce/dlaždice
- [x] Kdo má přístup/viditelnost
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce a workflow
- [x] Akce a oprávnění
- [x] TODO: Doplnit typické workflow archivace

---

## 📋 Dlaždice: Dohoda o splátkách

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce/dlaždice
- [x] Kdo má přístup/viditelnost
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce: detail, editace, archivace
- [x] Výčet a popis všech polí a workflow
- [x] Akce a oprávnění
- [x] TODO: Doplnit ukázky workflow splátek

---

## 🧑‍💼 Průvodce založením

### Checklist
- [x] Účel sekce (průvodce vytvořením smlouvy, automatické předvyplnění)
- [x] Kdo má přístup (všichni s právem "vytvářet")
- [x] Stromová struktura (viz tabulka výše)
- [x] Podsekce (výběr vzoru, předvyplnění údajů, editace, přílohy, uložení, export)
- [x] Akce (uložit, tisk, export, podpis)
- [x] Validace (chybějící povinné údaje, duplicita)
- [x] TODO: Doplnit detailní workflow kroků a validace

---

## 🗄️ Datový model

### Základní pole – Nájemní smlouva
```json
{
  "id": "501",
  "cislo_smlouvy": "NS-2025/001",
  "typ_smlouvy": "najemni",
  "stav": "platna",
  "pronajimatel_id": "4",
  "najemnik_id": "6",
  "nemovitost_id": "12",
  "jednotka_id": "101",
  "datum_od": "2025-09-15",
  "datum_do": "2026-09-14",
  "vzor_id": "vz1",
  "cena_najem": 12000,
  "zalohy_sluzby": 2500,
  "prilohy": [
    {
      "nazev": "Nájemní smlouva",
      "typ": "pdf",
      "url": "prilohy/ns_2025-001.pdf"
    }
  ],
  "protokol_id": "pp101",
  "stav_podpisu": "podepsano",
  "created_at": "2025-09-09T10:20:00Z",
  "updated_at": "2025-09-09T10:40:00Z"
}
```
*Pole: povinná/nepovinná viz tabulka povinnosti výše.*

### Základní pole – Vzor smlouvy
```json
{
  "id": "vz1",
  "nazev": "Vzor nájemní smlouvy - byt",
  "obsah_html": "<h1>Nájemní smlouva</h1>...{{pronajimatel}}...{{najemnik}}...",
  "verze": 3,
  "aktivni": true,
  "popis": "Standardní vzor pro byty",
  "created_at": "2025-09-01T08:00:00Z",
  "updated_at": "2025-09-09T09:10:00Z"
}
```

### Základní pole – Předávací protokol
```json
{
  "id": "pp101",
  "cislo_protokolu": "PP-2025/001",
  "smlouva_id": "501",
  "jednotka_id": "101",
  "datum_predani": "2025-09-15",
  "stav_mericich_pristroju": {
    "elektrina": 10250,
    "voda": 1850,
    "plyn": 800
  },
  "stav_bytu": "V pořádku",
  "vybaveni": ["lednice", "sporák", "pračka"],
  "prilohy": [
    {
      "nazev": "Foto předání",
      "typ": "jpg",
      "url": "prilohy/predani_101_20250915.jpg"
    }
  ],
  "vytvoril": "admin",
  "created_at": "2025-09-09T10:30:00Z"
}
```

### Základní pole – Dohoda o splátkách
```json
{
  "id": "8001",
  "cislo_dohody": "DS-2025/005",
  "smlouva_id": "501",
  "najemnik_id": "6",
  "jednotka_id": "101",
  "celkova_castka": 30000,
  "pocet_splatek": 6,
  "datum_uzavreni": "2025-09-10",
  "splatkove_polozky": [
    {
      "cislo": 1,
      "castka": 5000,
      "splatnost": "2025-10-10",
      "uhrazeno": false,
      "datum_uhrady": null
    },
    {
      "cislo": 2,
      "castka": 5000,
      "splatnost": "2025-11-10",
      "uhrazeno": false,
      "datum_uhrady": null
    }
    // ... další splátky
  ],
  "stav": "aktivni",
  "prilohy": [
    {
      "nazev": "Podepsaná dohoda",
      "typ": "pdf",
      "url": "prilohy/dohoda_ds-2025-005.pdf"
    }
  ],
  "created_at": "2025-09-09T11:00:00Z"
}
```

---

## Povinnost a viditelnost polí podle typu smlouvy/protokolu

| Pole                   | Nájemní smlouva | Dodatek  | Předávací protokol | Vzor smlouvy |
|------------------------|:--------------:|:--------:|:------------------:|:------------:|
| Číslo smlouvy/protokolu|   Povinné      | Povinné  | Povinné            | Nepovinné    |
| Pronajímatel           |   Povinné      | Povinné  | Nepovinné (odkaz)  | Proměnná     |
| Nájemník               |   Povinné      | Povinné  | Nepovinné (odkaz)  | Proměnná     |
| Jednotka/Nemovitost    |   Povinné      | Povinné  | Povinné            | Proměnná     |
| Data platnosti         |   Povinné      | Povinné  | Nepovinné          | Proměnná     |
| Cena nájmu/služeb      |   Povinné      | Povinné  | Nepovinné          | Proměnná     |
| Stav podpisu           |   Povinné      | Povinné  | Nepovinné          | Nezobrazovat |
| Přílohy                |   Nepovinné    | Nepovinné| Povinné (např. fotky) | Nepovinné |
| Vzor (šablona)         |   Povinné      | Nepovinné| Nepovinné          | Povinné      |

---

## 📋 Funkce v přehledu

- 📄 Přehled všech smluv (vyhledávání, filtrace podle stavu, typu, data, stran, jednotky…)
- 📑 Správa vzorů smluv (vytváření, editace, verzování, archivace)
- 📃 Evidence předávacích protokolů (vazba na smlouvu/jednotku, export, tisk)
- 📤 Export smluv a protokolů (PDF, DOCX, ZIP s přílohami)
- 📝 Elektronický podpis (možnost podepsat smlouvu online)
- 📜 Auditní log / historie verzí smlouvy a protokolu
- 🔗 Propojení smlouvy s platbami, službami, zálohami, dodatky
- 🔔 Notifikace expirací, podpisů, změn
- 📥 Import smluvních dat (hromadný import starších smluv)
- ⚙️ Nastavení modulu (automatizace, šablony, workflow)
- 🏷️ Generování platebních předpisů z parametrů smlouvy

---

## 🛡️ Role a oprávnění

| Funkce / Akce             | Administrátor | Správce nemovitostí | Účetní      | Právník      | Pouze čtení |
|---------------------------|:-------------:|:-------------------:|:-----------:|:------------:|:-----------:|
| Vytvořit smlouvu/vzor     |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Editovat smlouvu/protokol |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Smazat smlouvu            |      ✅       |         ❌          |     ❌      |    ✅        |     ❌      |
| Archivovat                |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Exportovat smlouvy        |      ✅       |         ✅          |     ✅      |    ✅        |     ❌      |
| Importovat data           |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Elektr. podepisování      |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Změna stavu               |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Auditní log               |      ✅       |         ✅          |     ✅      |    ✅        |     ❌      |
| Připojit dokument         |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Vyhledávání, filtrování   |      ✅       |         ✅          |     ✅      |    ✅        |     ✅      |

---

## 🟩 Stavy a workflow smlouvy/protokolu

| Stav           | Popis                                                    | Kdo může změnit  | Kdy/proč změnit                         |
|----------------|----------------------------------------------------------|------------------|------------------------------------------|
| **Návrh**      | Rozpracovaná, není podepsaná                             | Správce/Admin    | Při zakládání nebo editaci před podpisem |
| **Platná**     | Podepsaná, v platnosti                                   | Správce/Admin    | Po podepsání oběma stranami             |
| **Ukončená**   | Po uplynutí, výpovědi, odstoupení                        | Správce/Admin    | Po vystěhování, ukončení nájmu apod.     |
| **Archivní**   | Smlouva je pouze ke čtení, již není vázána na jednotku   | Správce/Admin    | Po uplynutí doby archivace               |
| **Neplatná**   | Smlouva byla zrušena, nikdy nevstoupila v platnost       | Správce/Admin    | Zrušení před podpisem                    |

---

## 🗑️ Podmínky mazání a archivace

- Nelze mazat smlouvy, které jsou v platnosti nebo mají navázané platby/služby.
- Archivace je možná pro smlouvy/protokoly po ukončení všech návazností.
- Smazání je možné pouze pro rozpracované, neplatné nebo archivní záznamy.

---

## 🔍 Historie a auditní log změn

- Každá změna (návrh, podpis, editace, prodloužení, dodatek) je auditovaná.
- Přehled verzí vzorů i konečných smluv/protokolů.

---

## 🔔 Notifikace a upozornění

| Událost / spouštěč                  | Komu přijde notifikace       | Forma (e-mail, systém, SMS) | Poznámka                                    |
|--------------------------------------|------------------------------|-----------------------------|----------------------------------------------|
| Expirace smlouvy                     | Správce, nájemník            | E-mail, systém              | X dnů před koncem platnosti                  |
| Nový návrh smlouvy                   | Pronajímatel, nájemník       | E-mail, systém              | Po vygenerování návrhu                       |
| Podepsání smlouvy                    | Pronajímatel, nájemník       | E-mail, systém              | Obě strany, log audit                        |
| Přidání přílohy                      | Správce, právník             | Systém                      | Např. revize, kolaudace                      |
| Změna stavu (ukončení, výpověď)      | Správce, nájemník, audit log | Systém                      | Včetně důvodu změny                          |
| Nový předávací protokol              | Správce, nájemník            | Systém                      | Po vygenerování protokolu                    |
| Hromadný import/export               | Admin                        | Systém                      | Auditováno                                   |

---

## 🛡️ GDPR, export a anonymizace dat

- Export smlouvy i s přílohami a protokolem (pro audit, GDPR).
- Anonymizace údajů možná až po ukončení všech návazností.
- Kompletní audit všech operací.

---

## 🔗 Vazby na další moduly

| Modul           | Závisí na Smlouvě | Smlouva závisí na | Popis vazby                       |
|-----------------|:-----------------:|:-----------------:|-----------------------------------|
| Pronajímatel    |        ✅         |        ✅         | Pronajímatel je smluvní stranou   |
| Nájemník        |        ✅         |        ✅         | Nájemník je smluvní stranou       |
| Jednotka/Nemovitost|      ✅         |        ✅         | Smlouva je pro konkrétní jednotku |
| Platby          |        ✅         |        ✅         | Platby se řídí smlouvou           |
| Služby          |        ✅         |        ✅         | Služby a zálohy ze smlouvy        |
| Dokumenty       |        ✅         |        ❌         | Přílohy ke smlouvě/protokolu      |
| Auditní log     |        ✅         |        ❌         | Všechny změny se logují           |

---

## 📋 Dlaždice: Dohoda o splátkách

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce/dlaždice
- [x] Kdo má přístup/viditelnost
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce: detail, editace, archivace
- [x] Výčet a popis všech polí a workflow
- [x] Akce a oprávnění
- [x] TODO: Doplnit ukázky workflow splátek

---

## ⚠️ Typické chybové stavy a výjimky

| Chyba / výjimka                            | Doporučené řešení / reakce systému    | Uživatelská hláška                                    | Logování |
|--------------------------------------------|---------------------------------------|-------------------------------------------------------|----------|
| **Duplicitní číslo smlouvy**               | Zamezit uložení, zvýraznit pole       | „Toto číslo smlouvy již existuje.“                    | Povinné  |
| **Neexistující navázaná entita**           | Upozornit, zamezit uložení            | „Zadaný nájemník/jednotka/pronajímatel neexistuje.“   | Povinné  |
| **Neplatné datum platnosti**               | Zamezit uložení                       | „Datum ukončení musí být později než začátek.“        | Povinné  |
| **Chybí povinný údaj (např. jednotka)**    | Zvýraznit pole, zamezit uložení       | „Vyplňte všechny povinné údaje.“                      | Povinné  |
| **Smazání platné smlouvy**                 | Zamezit akci                          | „Nelze smazat platnou smlouvu.“                       | Povinné  |
| **Podepisování bez oprávnění**             | Zamezit akci                          | „Nemáte práva k podpisu této smlouvy.“                | Povinné  |
| **Chyba při importu/exportu**              | Zobrazit detail chyby                 | „Import/export selhal – zkontrolujte formát/datovou větu.“ | Povinné  |

---

## 📦 Hromadné operace se smlouvami a protokoly

- **Hromadný import/export smluv** (CSV, XLSX, PDF)
- **Hromadné generování smluv/protokolů z hromadných údajů**
- **Hromadný tisk/podpis více smluv najednou**
- **Hromadné notifikace (expirace, nové smlouvy atd.)**
- **Hromadné archivace ukončených smluv**

---

## 📚 Reference na další dokumentaci

- [Modul Smlouva](./smlouva.md)
- [Modul Platby](./platby.md)
- [Modul Nájemník](./najemnik.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Pronajímatel](./pronajimatel.md)
- [Modul Nemovitost](./nemovitost.md)
- [Modul Služby](./sluzby.md)
- [Modul Dokumenty](./dokumenty.md)
- [Pravidla dokumentace](./pravidla.md)
- [Katalog tlačítek a ikon](./common-actions.md)
- [Katalog oprávnění](./permissions-catalog.md)

---

## 🐞 Známé problémy / TODO

- [ ] Rozšířit validace (datumy, duplicity, povinné údaje)
- [ ] Workflow pro dodatky, výpovědi a prodloužení smluv
- [ ] Automatizace generování a tisku protokolů (včetně fotodokumentace)
- [ ] Elektronický podpis a integrace s BankID/MojeID
- [ ] Hromadné operace – import, export, notifikace
- [ ] Historie a auditní log pro každou verzi vzoru
- [ ] Napojení na externí registry pro validaci stran
- [ ] Automatizované generování platebních předpisů
- [ ] UI/UX vylepšení průvodce generováním smlouvy
- [ ] GDPR a anonymizace údajů po ukončení smluv
- [ ] Testování workflow a chybových stavů

---

> Dokument bude průběžně aktualizován podle vývoje a potřeb projektu.
