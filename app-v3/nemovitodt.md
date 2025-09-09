# Modul: Nemovitost

## 🏢 Co je modul Nemovitost a kdy ho použít

**Modul Nemovitost** slouží k evidenci a správě všech spravovaných nemovitostí (domů, areálů, budov) a jejich jednotlivých jednotek (bytů, kanceláří, garáží apod.).  
Umožňuje přehlednou správu jak celků, tak konkrétních jednotek a jejich vazeb na nájemníky, smlouvy, služby, platby i uživatele.

### Kdy modul použít?

- Pokud potřebuješ evidovat všechny nemovitosti a rozdělit je na konkrétní jednotky/byty.
- Pro správu informací o vlastnících, pronajímatelích, technických údajích a dokumentech nemovitosti.
- Při správě obsazenosti a přehledném přiřazení jednotek k nájemníkům, správci či službám.
- Pro hromadné operace (import/export, změny stavů, archivace, audit).
- Při potřebě udržet historii změn, dokumentaci a auditní stopu k jakékoliv nemovitosti či jednotce.

### Typické využití

- Bytová družstva, SVJ, správci nemovitostí, realitní kanceláře.
- Správa bytových, nebytových i komerčních objektů.
- Evidence obsazenosti a technického stavu jednotek, napojení na služby, platby, nájemníky.
- Hromadné operace (importy/exporty, statistiky, audit, reporting).

> Modul Nemovitost je základním stavebním kamenem systému – doporučujeme začít správou nemovitostí a jednotek, teprve poté navazovat další workflow (nájemníci, smlouvy atd.).

---

## 🏗️ Základní struktura modulu

- **Typy nemovitostí:**  
  - 🏢 Bytový dům
  - 🏭 Areál / blok
  - 🏬 Komerční objekt
  - 🏠 Rodinný dům
  - 🏗️ Jiný objekt

- **Jednotky:**  
  - Byt, nebytový prostor, garáž, sklep, kancelář, komerční prostor, atd.

- **Vazby na jiné moduly:**
  - **Pronajímatel:** Vlastník nemovitosti/jednotky
  - **Jednotka:** Prostor v rámci nemovitosti
  - **Nájemník:** Obsazenost jednotky, smlouva, platby, služby
  - **Smlouva, Platby, Služby, Uživatelé, Dokumenty**

---

## 🧑‍💼 Průvodce založením

V každém formuláři (Nemovitost, Jednotka, Smlouva) je možné spustit  
🌸 **„Průvodce“**  
Uživatel může:
- ✅ Pokračovat v průvodci a uložit rozpracovaná data.
- 🏁 Přeskočit kroky, které nezná nebo nechce řešit hned.
- 💾 Uložit stav a vrátit se později.

### Průvodce typicky vede přes kroky:
1. Založení nemovitosti
2. Přidání jednotek
3. Přiřazení vlastníka, nájemníka
4. Vytvoření smluv, nastavení služeb, plateb
5. Přidání příloh
6. Nastavení správců, rolí a přístupových práv

---

## 🗃️ Datový model

### Základní pole – Nemovitost

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
    }
  ],
  "created_at": "2025-09-09T08:00:00Z",
  "updated_at": "2025-09-09T09:10:00Z"
}
```

### Základní pole – Jednotka

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
  "prilohy": [],
  "najemnik_id": "6",
  "smlouva_id": "201",
  "created_at": "2025-09-09T08:10:00Z",
  "updated_at": "2025-09-09T09:15:00Z"
}
```

---

## Povinnost a viditelnost polí podle typu nemovitosti/jednotky

| Pole             | Bytový dům | Komerční objekt | Garáž | Sklep | Kancelář | Jiný |
|------------------|:----------:|:---------------:|:-----:|:-----:|:--------:|:----:|
| Název            |   Povinné  |    Povinné      |  Ano  |  Ano  |   Ano    | Ano  |
| Typ nemovitosti  |   Povinné  |    Povinné      |  Ano  |  Ano  |   Ano    | Ano  |
| Adresa           |   Povinné  |    Povinné      |  Ano  |  Ano  |   Ano    | Ano  |
| Rozloha          |   Povinné  |    Povinné      |  Ano  |  Ano  |   Ano    | Ano  |
| Počet jednotek   |   Povinné  |    Nepovinné    |  Ne   |  Ne   |   Ne     | Ne   |
| Vlastník         |   Povinné  |    Povinné      |  Ano  |  Ano  |   Ano    | Ano  |
| Popis            |   Nepovin. |    Nepovin.     |  Ne   |  Ne   |   Ne     | Ne   |
| Přílohy          |   Nepovin. |    Nepovin.     |  Ne   |  Ne   |   Ne     | Ne   |

---

## 📋 Funkce v přehledu

Každý přehled (Nemovitosti, Jednotky) obsahuje základní funkce a možnost filtrovat, exportovat, upravovat i archivovat záznamy.

### 🏢 Dlaždice: Nemovitosti

- 📋 Přehled všech nemovitostí  
- 🔍 Filtrace podle typu nemovitosti, adresy, vlastníka, stavu
- 🔄 Změna stavu (aktivní / archivovaný)
- 📑 Zobrazení a správa dokumentů a příloh
- 🏢 Zobrazení připojených jednotek  
- ✳️ Správa rolí a oprávnění
- 📤 Export seznamu (XLSX/CSV/JSON)
- ➕ Přidat novou nemovitost
- 📜 Auditní log / historie změn
- 📊 Statistiky nemovitostí (počet jednotek, obsazenost, rozloha)
- 🔘 Spustit průvodce pro založení nebo pokračovat v dokončení průvodce
- ✏️ Upravit nemovitost
- 👁️ Zobrazit detail
- 📁 Archivovat
- 🗑️ Smazat (pouze pokud nemá vazby/historii)
- 🧑‍💼 Přiřadit správce / uživatele
- 📑 Přidat dokument (příloha)
- ⚙️ Nastavení modulu

### 🏠 Dlaždice: Jednotky a byty

- 📋 Přehled všech jednotek/bytu  
- 🔍 Filtrace podle typu jednotky, stavu, nájemníka, vlastníka, patra
- 🔄 Změna stavu (volná, obsazená, opravovaná, archivovaná)
- 📑 Zobrazení a správa dokumentů a příloh
- 🏢 Zobrazení mateřské nemovitosti
- 🧑‍💼 Přiřazení nájemníka/správce
- 📤 Export seznamu (XLSX/CSV/JSON)
- ➕ Přidat novou jednotku
- 📜 Auditní log / historie změn
- 📊 Statistiky jednotek (obsazenost, rozloha, počet nájemníků)
- 🔘 Spustit průvodce pro založení nebo pokračovat v dokončení průvodce
- ✏️ Upravit jednotku
- 👁️ Zobrazit detail
- 📁 Archivovat
- 🗑️ Smazat (pouze pokud nemá vazby/historii)
- 📑 Přidat dokument (příloha)
- 🏢 Připojit jednotku k nemovitosti
- 🔒 Přiřadit oprávnění
- 📤 Export dat jednotky
- 📜 Zobrazit historii změn

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

## 🟢 Stavy a workflow nemovitosti/jednotky

| Stav            | Popis                                                      | Kdo může změnit | Kdy/proč změnit                              |
|-----------------|------------------------------------------------------------|-----------------|----------------------------------------------|
| **Aktivní**     | Běžně využívaná, napojena na další entity                  | Správce/Admin   | Po schválení, dokončení registrace, automaticky při založení. |
| **Archivovaná** | Data pouze ke čtení, nelze měnit ani navazovat vazby       | Správce/Admin   | Když již není využívána, po prodeji, demolici apod. |
| **Blokovaná**   | Dočasně zamezeno použití, čeká na schválení nebo má problém| Správce/Admin   | Např. při sporu, nevyjasněném vlastnictví   |
| **Neaktivní**   | Není aktuálně využívána, ale zůstává v systému             | Správce/Admin   | Po ručním nastavení, např. dočasná nečinnost|

### Přechody mezi stavy viz workflow v Nájemník/Pronajímatel.

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

---

## 📦 Hromadné operace s nemovitostmi a jednotkami

- **Hromadný import/export nemovitostí a jednotek** (CSV, XLSX, JSON)
- **Hromadná změna stavu** (archivace, aktivace, blokace)
- **Hromadné přiřazení správce/uživatele**
- **Hromadné generování dokumentů nebo výzev** (např. revizní zprávy, výzvy k úhradě)
- **Hromadné přiřazení jednotek do nemovitosti či změna vlastníka**

> Každá hromadná akce je auditována a dostupná pouze dle oprávnění.

---

## 📚 Reference na související dokumentaci

Pro komplexní pochopení workflow doporučujeme prostudovat také:

- [Modul Pronajímatel](./pronajimatel.md)  
- [Modul Nájemník](./najemnik.md)  
- [Modul Smlouva](./smlouva.md)  
- [Modul Platby](./platby.md)  
- [Modul Služby](./sluzby.md)  
- [Modul Dokumenty](./dokumenty.md)  

---

## 🐛 Známé problémy / TODO

- [ ] **Rozšířit validace údajů** (adresy, čísla jednotek, duplicitní zápisy)
- [ ] **Hromadné operace** – zdokonalit importy, validace a chybové hlášky
- [ ] **Detailní auditní log** – rozšířit o všechny změny a hromadné akce
- [ ] **Napojení na externí registry** (KN, RÚIAN apod.)
- [ ] **Automatizace notifikací** (např. expirace revizí, změny stavu)
- [ ] **Přehled vazeb na ostatní entity v detailu nemovitosti/jednotky**
- [ ] **Statistiky a reporting** – rozšířená analytika obsazenosti, výnosů apod.
- [ ] **Rozšířená správa příloh** – verzování, sdílení, viditelnost podle rolí
- [ ] **Podpora pro více typů jednotek** (nebytové, komerční prostory…)
- [ ] **Optimalizace UI/UX** – jednodušší workflow pro hromadné úpravy
- [ ] **Testování workflow a chybových stavů**
- [ ] **Přístupová práva** – detailní nastavení rolí a oprávnění
- [ ] **GDPR – anonymizace a export**  
- [ ] **UI/UX vylepšení**  
- [ ] **Automatizace reportingu a dashboardy**

---
## 🗂️ Ukázka uloženého JSON objektu (nemovitost a jednotka)

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

## 🔄 Specifika workflow pro modul Nemovitost/Jednotka

### 1. Rozdělení jednotky
- Správce v detailu jednotky zvolí „Rozdělit jednotku“.
- Zadá nové parametry pro vzniklé jednotky (čísla, rozloha, typ).
- Systém automaticky propojí nové jednotky s mateřskou nemovitostí a případně převede smlouvy/nájemníky.

### 2. Sloučení jednotek
- V přehledu jednotek správce vybere více jednotek a zvolí „Sloučit“.
- Zadané údaje se agregují do nové jednotky, staré se archivují.
- Historie je zachována.

### 3. Změna vlastníka nemovitosti (převod)
- Správce zadá nového vlastníka/pronajímatele.
- Systém upozorní na nutnost revize stávajících smluv/jednotek.

### 4. Převod jednotky mezi nemovitostmi
- Jednotka může být přesunuta z jedné nemovitosti do jiné (například při změně parcelace).

---

## ⚠️ Více chybových stavů (specifika pro nemovitost/jednotku)

| Chyba / výjimka                        | Doporučené řešení / reakce systému                | Uživatelská hláška                                 | Logování |
|----------------------------------------|---------------------------------------------------|----------------------------------------------------|----------|
| **Duplicita čísla jednotky v nemovitosti** | Zamezit uložení                                   | „Toto číslo jednotky je již použito v této nemovitosti.“ | Povinné  |
| **Pokus o přesun jednotky s aktivní smlouvou** | Zamezit akci, informovat správce                  | „Jednotku nelze přesunout, má aktivní smlouvu.“    | Povinné  |
| **Pokus o sloučení jednotek s různými nájemníky** | Vyžádat rozhodnutí správce, nabídnout archivaci   | „Jednotky mají různé nájemníky – sloučení není možné.“ | Povinné  |
| **Chyba při napojení na neexistující nemovitost** | Upozornit na neplatný odkaz, nabídnout opravu     | „Zadaná nemovitost neexistuje.“                    | Povinné  |
| **Chybějící povinná příloha (např. kolaudace)** | Zvýraznit pole, zamezit uložení                   | „Přidejte prosím povinný dokument (kolaudace).“    | Povinné  |

---

## 📦 Hromadné operace s nemovitostmi a jednotkami

- **Hromadný import/export nemovitostí a jednotek** (CSV, XLSX, JSON)
- **Hromadná změna stavu** (archivace, aktivace, blokace)
- **Hromadné přiřazení správce/uživatele**
- **Hromadný přesun jednotek mezi nemovitostmi**
- **Hromadné přidání/odebrání příloh**
- **Hromadné generování dokumentů** (např. revizní protokoly)

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

> Pokud budeš chtít rozpracovat některý scénář ještě detailněji (včetně pseudokódu, workflow, uživatelských hlášek nebo návrhu UI), napiš konkrétní požadavek!
> Tento dokument bude průběžně aktualizován podle vývoje a potřeb projektu.
