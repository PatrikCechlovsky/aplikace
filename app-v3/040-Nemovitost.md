> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

# Modul: Nemovitost

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Přehled nemovitostí | Hlavní dlaždice s přehledem všech nemovitostí |
|      | ├── 👁️ Přehled nemovitostí | Tabulka, filtrace, vyhledávání |
|      | ├── 📝 Přidat nemovitost | Formulář pro přidání nové nemovitosti |
|      | ├── 📝 Editace nemovitosti | Formulář pro editaci nemovitosti |
|      | └── 👁️ Detail nemovitosti | Detailní pohled na nemovitost |
| ✅   | 🟦 Přehled jednotek | Dlaždice/seznam všech jednotek v nemovitostech |
|      | ├── 👁️ Přehled jednotek | Tabulka všech jednotek/bytu |
|      | ├── 📝 Přidat jednotku | Formulář pro přidání jednotky |
|      | ├── 📝 Editace jednotky | Formulář pro editaci jednotky |
|      | └── 👁️ Detail jednotky | Detailní pohled na jednotku |
| ✅   | 🟦 Import/Export | Import/export nemovitostí a jednotek |
| ✅   | 🟦 Auditní log / historie změn | Auditní záznamy a historie změn |
| ✅   | 🟦 Statistiky a reporting | Statistiky využití, obsazenost, rozloha |
| ✅   | 🟦 Přehled dokumentů | Správa a přehled dokumentů/příloh |
| ✅   | 🟦 Nastavení modulu | Nastavení a konfigurace modulu |
| ✅   | 🟦 Notifikace a upozornění | Přehled a správa notifikací |
| ✅   | 🟦 Průvodce založením | Průvodce pro založení nemovitosti/jednotky |
| ⏳   | 🟦 Vazby na další entity | Přehled vazeb na pronajímatele, nájemníky, platby, služby |
| 🚫   | ~~Staré sekce nebo neaktuální~~ | ~~Případné původní struktury, pokud existovaly~~ |

---

## 🟦 Přehled nemovitostí

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
- [x] Stavové pole (aktivní, archivovaná, blokovaná, neaktivní), kdo je může měnit
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
Evidence a správa všech spravovaných nemovitostí (domů, areálů, budov) a jejich jednotek.

### Kdo má přístup/viditelnost
| Role                  | Přístup      |
|-----------------------|--------------|
| Administrátor         | Plný         |
| Správce nemovitostí   | Plný         |
| Účetní                | Čtení        |
| Prohlížející          | Čtení        |

### Pole (přehled i detail)
| Pole             | Povinné | Typ           | Popis                                  |
|------------------|:-------:|--------------|----------------------------------------|
| Název            |   Ano   | text         |                                        |
| Typ nemovitosti  |   Ano   | enum         | bytový dům, areál, komerční objekt, ...|
| Adresa           |   Ano   | objekt       | Ulice, číslo popisné, město, PSČ       |
| Rozloha          |   Ano   | číslo        | Rozloha celé nemovitosti               |
| Počet jednotek   |   Ano   | číslo        |                                        |
| Vlastník         |   Ano   | vazba        | Vazba na pronajímatele                 |
| Stav             |   Ano   | enum         | aktivní, archivovaná, blokovaná, neaktivní |
| Popis            |   Ne    | text         |                                        |
| Přílohy          |   Ne    | seznam       | Dokumenty, přílohy                     |

### Filtrování, řazení, akce
- Filtrování: podle typu, adresy, vlastníka, stavu
- Řazení: podle názvu, typu, rozlohy, počtu jednotek, stavu
- Hromadné akce: změna stavu, export, hromadné přiřazení správce/uživatele, generování dokumentů

### Ukázka tabulky
| Název          | Typ         | Adresa        | Vlastník   | Počet jednotek | Rozloha | Stav     | Akce |
|----------------|-------------|---------------|------------|----------------|---------|----------|------|
| Dům Křižíkova  | bytový dům  | Křižíkova 10  | Novák      | 30             | 1500    | aktivní  | [Zobrazit] [Edit] [Archivovat] [Export] |

### Validace, tlačítka, workflow
- Validace unikátnosti adresy, povinného vlastníka, formát PSČ/rozlohy
- Povinná pole zvýraznit, zamezit uložení
- Tlačítka: Přidat, Upravit, Archivovat, Export, Hromadná akce
- Workflow: Aktivní → Archivovaná → (Blokovaná/Neaktivní)

### Chybové stavy
- Duplicitní adresa
- Chybějící vlastník
- Neplatný formát PSČ, rozlohy
- Smazání při existujících jednotkách/platbách/smlouvách

### Oprávnění a viditelnost
Viz tabulka Role a oprávnění níže.

### Vazby na další moduly a reference
- Pronajímatel, Jednotka, Nájemník, Smlouva, Platby, Služby, Dokumenty, Uživatelé, Auditní log

### Specifika, rozšíření
- Podpora pro různé typy nemovitostí
- GDPR – anonymizace, export všech údajů včetně příloh
- Hromadné operace (import/export, změny stavů, audit)

---

## 🟦 Přehled jednotek

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře

- [x] Účel sekce/dlaždice
- [x] Kdo má přístup/viditelnost
- [x] Zařazení v hlavní stromové struktuře
- [x] Výčet všech polí, filtrů, akcí, chybových stavů, vazeb atd.

### Účel sekce/dlaždice
Správa a evidence všech jednotek/bytu v rámci nemovitostí.

### Kdo má přístup/viditelnost
Stejné role jako přehled nemovitostí.

### Pole (přehled i detail)
| Pole             | Povinné | Typ           | Popis                        |
|------------------|:-------:|--------------|------------------------------|
| Typ jednotky     |   Ano   | enum         | byt, nebytový prostor, ...   |
| Číslo jednotky   |   Ano   | text         | Unikátní v rámci nemovitosti |
| Patro            |   Ne    | číslo        |                              |
| Rozloha          |   Ano   | číslo        |                              |
| Nemovitost       |   Ano   | vazba        |                              |
| Stav             |   Ano   | enum         | volná, obsazena, opravovaná, archivovaná |
| Popis            |   Ne    | text         |                              |
| Nájemník         |   Ne    | vazba        |                              |
| Smlouva          |   Ne    | vazba        |                              |
| Přílohy          |   Ne    | seznam       |                              |

### Filtrování, řazení, akce
- Filtrování podle typu jednotky, stavu, nájemníka, vlastníka, patra
- Hromadné akce: změna stavu, export, přiřazení nájemníka/správce, generování dokumentů

### Chybové stavy
- Duplicita čísla jednotky v nemovitosti
- Pokus o přesun jednotky s aktivní smlouvou
- Chybějící povinná příloha (např. kolaudace)

---

## 📝 Přidat / editovat nemovitost a jednotku (formuláře)

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře

- [x] Účel
- [x] Výčet polí
- [x] Tlačítka, validace, workflow
- [x] Chybové stavy
- [x] Oprávnění

### Účel
Formuláře slouží pro zadání/editaci údajů o nemovitosti i jednotce včetně validací a povinných polí.

### Pole
Viz tabulky výše.

### Tlačítka
- Uložit
- Pokračovat v průvodci
- Zrušit

### Validace
- Unikátní adresa/číslo jednotky v rámci nemovitosti
- Povinná pole
- Formát adresy, rozlohy, PSČ

### Chybové stavy
Viz sekce Chybové stavy.

---

## 👁️ Detail nemovitosti a jednotky

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře

- [x] Účel
- [x] Zobrazení všech údajů, historie změn, audit, připojené jednotky, smlouvy, platby
- [x] Akce: editace, archivace, přidání přílohy, export, audit log

---

## 🛡️ Role a oprávnění

| Funkce / Akce            | Administrátor | Správce nemovitostí | Účetní      | Pouze čtení |
|--------------------------|:-------------:|:-------------------:|:-----------:|:-----------:|
| Zobrazit seznam          |      ✅       |         ✅          |     ✅      |     ✅      |
| Zobrazit detail          |      ✅       |         ✅          |     ✅      |     ✅      |
| Přidat nemovitost/jednotku|     ✅       |         ✅          |     ❌      |     ❌      |
| Upravit nemovitost/jednotku|   ✅       |         ✅          |     ❌      |     ❌      |
| Smazat nemovitost/jednotku|   ✅        |         ❌          |     ❌      |     ❌      |
| Archivovat               |      ✅       |         ✅          |     ❌      |     ❌      |
| Exportovat data          |      ✅       |         ✅          |     ✅      |     ❌      |
| Importovat data          |      ✅       |         ✅          |     ❌      |     ❌      |
| Přiřadit správce/roli    |      ✅       |         ✅*         |     ❌      |     ❌      |
| Změna stavu              |      ✅       |         ✅          |     ❌      |     ❌      |
| Zobrazení historie změn  |      ✅       |         ✅          |     ✅      |     ❌      |
| Připojit dokument        |      ✅       |         ✅          |     ❌      |     ❌      |
| Vyhledávání, filtrování  |      ✅       |         ✅          |     ✅      |     ✅      |
| Zobrazit napojené jednotky|     ✅       |         ✅          |     ✅      |     ✅      |
| Statistiky využití       |      ✅       |         ✅          |     ✅      |     ❌      |

---

## 🟡 Stavy a workflow nemovitosti/jednotky

| Stav            | Popis                                                      | Kdo může změnit | Kdy/proč změnit                              |
|-----------------|------------------------------------------------------------|-----------------|----------------------------------------------|
| **Aktivní**     | Běžně využívaná, napojena na další entity                  | Správce/Admin   | Po schválení, dokončení registrace, automaticky při založení. |
| **Archivovaná** | Data pouze ke čtení, nelze měnit ani navazovat vazby       | Správce/Admin   | Když již není využívána, po prodeji, demolici apod. |
| **Blokovaná**   | Dočasně zamezeno použití, čeká na schválení nebo má problém| Správce/Admin   | Např. při sporu, nevyjasněném vlastnictví   |
| **Neaktivní**   | Není aktuálně využívána, ale zůstává v systému             | Správce/Admin   | Po ručním nastavení, např. dočasná nečinnost|

---

## 🗄️ Podmínky mazání a archivace

- Nelze smazat nemovitost/jednotku s aktivními vazbami (jednotky, nájemník, smlouvy, platby).
- Pokud existují historická data, pouze archivace.
- Smazání je možné pouze pro záznamy bez návazností a historie.

---

## 🕓 Historie a auditní log změn

Každá významná změna údajů je zaznamenána do auditního logu – kdo, kdy, co změnil v nemovitosti/jednotce, včetně hromadných operací, importů a exportů.

---

## 🔔 Notifikace a upozornění – Nemovitost

| Událost / spouštěč                       | Komu přijde notifikace       | Forma (e-mail, systém, SMS) | Poznámka                                   |
|-------------------------------------------|------------------------------|-----------------------------|---------------------------------------------|
| Změna vlastníka nebo správce              | Správce, admin               | Systém, e-mail              | Audit, bezpečnostní upozornění              |
| Přidání nové nemovitosti                  | Správce, admin               | Systém                      |                                             |
| Změna stavu (aktivní/archiv/blokace)      | Správce, admin, audit log    | Systém                      | Včetně důvodu změny                         |
| Nový dokument připojen k nemovitosti      | Správce                      | Systém                      | Např. přidání výpisu, revize, kolaudace     |
| Nová jednotka přidána do nemovitosti      | Správce                      | Systém                      |                                             |
| Hromadný import/export                    | Admin                        | Systém                      | Auditováno                                  |
| Automatická archivace/čištění             | Admin                        | Systém                      | Podle nastavení systému                     |

---

## 🛡️ GDPR, export a smazání dat

- Export všech údajů o nemovitosti/jednotce včetně příloh (pro audit, GDPR).
- Smazání/anonymizace údajů dle pravidel (pouze pokud nejsou vazby).
- Kompletní auditní log všech operací.

---

## 🔗 Vazby na další moduly

| Modul           | Závisí na Nemovitosti | Nemovitost závisí na | Popis vazby                                                      |
|-----------------|:---------------------:|:--------------------:|------------------------------------------------------------------|
| Jednotka        |         ✅            |        ✅            | Jednotka je vždy přiřazena k nemovitosti                         |
| Pronajímatel    |         ✅            |        ✅            | Nemovitost/vlastník/pronajímatel – evidence vlastnictví           |
| Nájemník        |         ✅            |        ❌            | Přes jednotku – nájemník je obsazením jednotky                    |
| Smlouva         |         ✅            |        ❌            | Smlouva vždy odkazuje na jednotku v nemovitosti                   |
| Platby          |         ✅            |        ❌            | Platby navázané na jednotku/nemovitost                            |
| Služby          |         ✅            |        ❌            | Služby nastavené pro jednotky a nemovitosti                       |
| Dokumenty       |         ✅            |        ❌            | Přílohy/dokumenty přiřazené k nemovitosti/jednotce                |
| Uživatelé       |         ✅            |        ✅*           | Správci mají práva ke konkrétní nemovitosti/jednotce              |
| Auditní log     |         ✅            |        ❌            | Všechny akce nad nemovitostí/jednotkou se logují                  |

---

## 🗺️ Diagram vztahů (textová verze)

```
          +----------------------+
          |    Pronajímatel      |
          +----------------------+
                    ^
                    |
+---------+   +--------------+   +----------+
| Platby  |   |   Jednotka   |   | Smlouva  |
+---------+   +--------------+   +----------+
     \             |                /
      \            v               /
           +----------------+
           |  Nemovitost    |
           +----------------+
             |           ^
             v           |
          +------+   +------------------+
          | Služby|   |  Dokumenty      |
          +------+   +------------------+
```

---

## ⚠️ Typické chybové stavy a výjimky

| Chyba / výjimka                             | Doporučené řešení / reakce systému                  | Uživatelská hláška                                | Logování |
|---------------------------------------------|-----------------------------------------------------|---------------------------------------------------|----------|
| **Duplicita adresy**                        | Zamezit uložení, zvýraznit pole                     | „Tato adresa je již použita u jiné nemovitosti.“  | Povinné  |
| **Chybějící vlastník**                      | Zamezit uložení                                     | „Zadejte prosím vlastníka/pronajímatele.“         | Povinné  |
| **Neplatný formát PSČ, rozlohy**            | Zvýraznit pole, zamezit uložení                     | „Zadané PSČ/rozloha není v platném formátu.“      | Povinné  |
| **Smazání při existujících jednotkách**     | Zamezit smazání                                     | „Nemovitost obsahuje jednotky – nejprve je odstraňte.“ | Povinné  |
| **Smazání při navázaných platbách/smlouvách**| Zamezit smazání                                     | „Nelze smazat – existují navázané smlouvy/platby.“| Povinné  |
| **Chyba při importu dat**                   | Zobrazit detail chyby, umožnit částečný import      | „Import obsahuje chyby – zkontrolujte detaily.“   | Povinné  |
| **Chyba při exportu dat**                   | Zobrazit chybovou hlášku, nabídnout opakování       | „Export selhal, zkuste to prosím znovu.“          | Povinné  |
| **Neoprávněný přístup**                     | Zamezit akci, přesměrovat/odmítnout                 | „Nemáte oprávnění k této akci.“                   | Povinné  |
| **Duplicita čísla jednotky v nemovitosti**  | Zamezit uložení                                     | „Toto číslo jednotky je již použito v této nemovitosti.“ | Povinné  |
| **Pokus o přesun jednotky s aktivní smlouvou** | Zamezit akci, informovat správce                  | „Jednotku nelze přesunout, má aktivní smlouvu.“    | Povinné  |
| **Pokus o sloučení jednotek s různými nájemníky** | Vyžádat rozhodnutí správce, nabídnout archivaci   | „Jednotky mají různé nájemníky – sloučení není možné.“ | Povinné  |
| **Chyba při napojení na neexistující nemovitost** | Upozornit na neplatný odkaz, nabídnout opravu     | „Zadaná nemovitost neexistuje.“                    | Povinné  |
| **Chybějící povinná příloha (např. kolaudace)** | Zvýraznit pole, zamezit uložení                   | „Přidejte prosím povinný dokument (kolaudace).“    | Povinné  |

---

## 🗃️ Datový model (ukázky)

### Nemovitost (včetně všech možných polí)
```json
{
  "id": "12",
  "typ_nemovitosti": "bytovy_dum",
  "nazev": "Dům Křižíkova 10",
  "adresa": {
    "ulice": "Křižíkova",
    "cislo_popisne": "10",
    "mesto": "Praha",
    "psc": "18600"
  },
  "vlastnik_id": "4",
  "rozloha_celkem": 1500,
  "pocet_jednotek": 30,
  "stav": "aktivni",
  "popis": "Bytový dům s garážemi a sklepy",
  "prilohy": [
    {
      "nazev": "Výpis z KN",
      "typ": "pdf",
      "url": "prilohy/vypis_kn_krizikova10.pdf"
    },
    {
      "nazev": "Kolaudační rozhodnutí",
      "typ": "pdf",
      "url": "prilohy/kolaudace.pdf"
    }
  ],
  "historie_spravcu": [
    {
      "spravce_id": "99",
      "od": "2022-01-01",
      "do": "2024-12-31"
    }
  ],
  "created_at": "2025-09-09T08:00:00Z",
  "updated_at": "2025-09-09T09:10:00Z"
}
```
### Jednotka (včetně historie, více příloh)
```json
{
  "id": "101",
  "typ_jednotky": "byt",
  "cislo_jednotky": "A101",
  "patro": 1,
  "rozloha": 55,
  "nemovitost_id": "12",
  "stav": "obsazena",
  "popis": "2+kk s balkonem",
  "prilohy": [
    {
      "nazev": "Nájemní smlouva",
      "typ": "pdf",
      "url": "prilohy/najemni_smlouva_a101.pdf"
    },
    {
      "nazev": "Revizní zpráva",
      "typ": "pdf",
      "url": "prilohy/revize_a101.pdf"
    }
  ],
  "najemnik_id": "6",
  "smlouva_id": "201",
  "historie_najemniku": [
    {
      "najemnik_id": "5",
      "od": "2022-01-01",
      "do": "2024-12-31"
    }
  ],
  "created_at": "2025-09-09T08:10:00Z",
  "updated_at": "2025-09-09T09:15:00Z"
}
```

---

## 📦 Hromadné operace s nemovitostmi a jednotkami

- Hromadný import/export nemovitostí a jednotek (CSV, XLSX, JSON)
- Hromadná změna stavu (archivace, aktivace, blokace)
- Hromadné přiřazení správce/uživatele
- Hromadný přesun jednotek mezi nemovitostmi
- Hromadné přidání/odebrání příloh
- Hromadné generování dokumentů (např. revizní protokoly)

---

## 🐛 Známé problémy / TODO

- [ ] Ošetřit duplicity čísel jednotek v rámci jedné nemovitosti.
- [ ] Vylepšit workflow sloučení a rozdělení jednotek (kontrola návazností).
- [ ] Zavést kontroly povinných příloh (kolaudace, revize apod.).
- [ ] Podpora hromadných změn stavu a přesunů jednotek mezi nemovitostmi.
- [ ] Detailnější auditní log – včetně hromadných operací.
- [ ] Možnost napojení na registry KN a RÚIAN.
- [ ] Automatizace notifikací při změně vlastníka, správce, stavu jednotek.
- [ ] Vylepšení UI/UX pro práci s velkými seznamy jednotek.

---

## 📚 Reference na další dokumentaci

- [Modul Pronajímatel](./pronajimatel.md)
- [Modul Nájemník](./najemnik.md)
- [Modul Smlouva](./smlouva.md)
- [Modul Platby](./platby.md)
- [Modul Služby](./sluzby.md)
- [Modul Dokumenty](./dokumenty.md)
- [Modul Jednotka](./jednotka.md)

---

> Pokud budeš chtít rozpracovat některý scénář ještě detailněji (včetně pseudokódu, workflow, uživatelských hlášek nebo návrhu UI), napiš konkrétní požadavek!  
> Tento dokument bude průběžně aktualizován podle vývoje a potřeb projektu.
