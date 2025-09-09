# Modul: Pronajímatel

## 📋 Přehled
**Účel:** Správa pronajímatelů nemovitostí (osoby, firmy, instituce) a jejich zástupců.  
**Databázová tabulka:** `Subjekt`  
**Stav:** 🟡 Návrh / vývoj

---

## 🏗️ Základní struktura modulu

- **Typy pronajímatelů:**  
  - 👤 Fyzická osoba
  - 🧑‍💼 OSVČ
  - 🏢 Firma (s.r.o., a.s., apod.)
  - 🫂 Spolek/skupina
  - 🏛️ Státní instituce
  - 🤝 Zastupující osoba

## 🧑‍💼 Průvodce založením
V každém formuláři (např. **Jednotka**, **Nájemník**, **Smlouva**) bude tlačítko  
🌸 **„Spustit průvodce“**  
Uživatel může:  
- ✅ Pokračovat v průvodci a uložit rozpracovaná data.  
- 🏁 Přeskočit kroky, které nezná nebo nechce řešit hned.  
- 💾 Uložit stav a vrátit se později.

- **Vazba na jiné moduly:**
  - **Nemovitost** = **Jednotka** = **Nájemník** = **Smlouva** = **Služby** = **Platby** = **Uživatelé**
  - **Nemovitosti:** Pronajímatel je vlastníkem/uživatelem nemovitosti.
  - **Jednotka/byt:** Nemovitosti mají jednotky/byty
  - **Smlouvy:** Pronajímatel je smluvní stranou.
  - **Služby:** Pronajímatel definuje rozpis záloh, kauce a datumy plateb 
  - **Platby:** Pronajímatel je příjemcem plateb.
  - **Uživatelé:** Správce/administrátor modulu.

---

## 🗃️ Datový model
> Pronajímatelé se ukládají do tabulky **Subjekt**.  
Základní pole (návrh):

```javascript
{
  id: string,
  typ_subjektu: 'osoba' | 'osvc' | 'firma' | 'spolek' | 'stat',
  nazev: string,         // název firmy/spolku/organizace
  jmeno: string,         // pro osoby/osvč
  prijmeni: string,      // pro osoby/osvč
  ico: string,
  dic: string,
  // kontakty, adresy, bankovní účet, atd.
  // další pole dle potřeb
}
```
## 📋 Funkce v přehledu
- 🔍 Filtrace podle typu subjektu
- 🔄 Změna stavu (aktivní / archivovaný)
- 📑 Zobrazení dokumentů
- 🏢 Zobrazení připojených jednotek
- ✳️ Správa rolí
- 📤 Export seznamu
- ➕ Přidat nového pronajímatele
- 📜 Auditní log / historie změn
- 📊 Statistiky pronajímatelů (např. počet jednotek)
---

## 🔘 Hlavní funkce / tlačítka

- spustit průvodce pro založení nebo pokračovat v dokončení zakládání přes průvodce

- ✅ **Přidat pronajímatele**
- ✏️ **Upravit pronajímatele**
- 👁️ **Zobrazit detail**
- 📁 **Archivovat**
- 🗑️ **Smazat** půjde jen záznam který nemá vazby, historii 
- 🔁 **Obnovit přístup / zneplatnit**
- ➕ **Přidat zástupce**
- 📤 **Exportovat seznam**
- 📥 **Importovat (hromadně)**
- 🔍 **Vyhledávání / filtrování**
- 📑 **Zobrazit dokumenty**
- 📊 **Statistiky využití**
- 🧑‍💼 **Přiřadit správce / uživatele**
- ⚙️ **Nastavení modulu**
- ✅ Uložit
- 📑 Přidat dokument
- 🏢 Připojit jednotku
- 🔒 Přiřadit oprávnění
- 📨 Vygenerovat přístup / pozvánku
- ✳️ Přiřadit roli
- 🗄️ Archivovat subjekt
- ⛔ Zablokovat subjekt
- 📤 Export dat subjektu
- 📜 Zobrazit historii změn

---
## Povinnost a viditelnost polí podle typu subjektu

| Pole                    | Osoba      | OSVČ        | Firma       | Spolek/skupina | Státní organizace | Zástupce   |
|-------------------------|------------|-------------|-------------|----------------|-------------------|------------|
| Titul před jménem       | Nepovinné  | Nepovinné   | Nezobrazovat| Nezobrazovat   | Nezobrazovat      | Nepovinné  |
| Jméno                   | Povinné    | Povinné     | Nezobrazovat| Nezobrazovat   | Nezobrazovat      | Povinné    |
| Příjmení                | Povinné    | Povinné     | Nezobrazovat| Nezobrazovat   | Nezobrazovat      | Povinné    |
| Název společnosti       | Nezobrazovat| Nezobrazovat| Povinné     | Povinné        | Povinné           | Nezobrazovat|
| IČ                      | Povinné    | Povinné     | Povinné     | Povinné        | Povinné           | Nezobrazovat|
| DIČ                     | Nepovinné  | Povinné     | Povinné     | Nepovinné      | Nepovinné         | Nezobrazovat|
| Typ dokladu totožnosti  | Povinné    | Povinné     | Nezobrazovat| Nezobrazovat   | Nezobrazovat      | Povinné    |
| ...                     | ...        | ...         | ...         | ...            | ...               | ...        |

---

## 🛡️ Role a oprávnění

- **Administrátor:** plné oprávnění
- **Správce nemovitostí:** správa pronajímatelů a jejich zástupců
- **Účetní:** přístup k údajům pro fakturaci, exporty
- **Prohlížející:** pouze nahlížení

---

## 🔄 Typické workflow

1. **Vytvoření nového pronajímatele** (ručně / importem)
2. **Přiřazení zástupce** (volitelně)
3. **Propojení s nemovitostí a smlouvou**
4. **Správa údajů, archivace, exporty**

---

## 📝 Poznámky pro vývojáře

- Pronajímatelé budou uloženi v tabulce **Subjekt** (společné pro další entity)
- Modul využívá komponenty: FormLinking, AttachmentSystem, FormGuard (viz uživatelé)
- Pro typy subjektů používej konzistentní kódování (`osoba`, `firma`, ...)
- Ošetři validace (IČO, DIČ, e-mail, bankovní účet)
- V budoucnu plánována integrace s ARES a dalšími registry

---

## 🐛 Známé problémy / TODO

- [ ] Ošetřit duplicity (stejný IČO, e-mail)
- [ ] Ověření dat proti ARES/CZ registry
- [ ] Přehled napojení na další entity
- [ ] Detailní logování akcí

---

## 🎨 Poznámky k UI/UX (návrhy tlačítek)

- Hlavní barva tlačítek: #4cc9f0  
- Ikony viz výše, jednotné rozměry (24x24px)
- Akční tlačítka v tabulce: [👁️][✏️][📁][🗑️]
- Hromadné akce nad tabulkou: [➕][📥][📤][🔍]

---

## 💡 Poznámky, nápady, úkoly

Sem si piš vše, co tě napadne k modulu Pronajímatel...
1. vytvořit průvodce pro založení **Nemovitost** = **Jednotka** = **Nájemník** = **Smlouva** = **Služby** = **Platby**
  bude mít několik záložek, na každé záložce bude formulář jednotlivých modulů, bude možné uložit rozpracované a později dokončit
  záložky se budou například zabarvovat podle toho zda jsou dokončené
  ✅ Pokračovat v průvodci a uložit rozpracovaná data.
  🏁 Přeskočit kroky, které uživatel nezná/nechce řešit.
  💾 Uložit stav a vrátit se později.

2. potřebuju vidět propojení (vazby) jaké má nemovitosti, jaké smlouvy a jaké trable
  chtěl bych si mít možnost nastavit ve svém profilu vybrané pronajímatele a mít možnost přepnout a vidět všechny na které mám přístup

další potřebné poznámky

1. Seznam možností pro výběrová pole ve formuláři
Přidej sekci, kde budou vypsány všechny hodnoty používané ve selectech (typ subjektu, role, typ oprávnění, stát, stav apod.)
Výhoda: Přehled pro vývojáře i správce, snadná údržba.
## Možnosti výběrových polí ve formuláři

### Typ oprávnění
- Čtení vybraných informací
- Čtení všech informací
- Úprava všech informací

### Typ dokladu totožnosti
- Občanský průkaz
- Pas
- Řidičský průkaz

### Stát
- Česká republika (CZ)
- Slovensko (SK)
- Rakousko (AT)
- Německo (DE)
- Polsko (PL)
- (další podle potřeby)

### Zástupce
- Seznam osob zastupujících (dynamicky dle databáze)

2. Stavy a workflow subjektu
Vysvětli (nejlépe tabulkou), jaké může mít pronajímatel stavy (aktivní, archivovaný, zablokovaný, čeká na doplnění, atd.) a jak může přecházet mezi stavy.
Přidej krátký popis, kdo a kdy může změnit stav.## 🟢 Stavy a workflow subjektu

Každý pronajímatel v systému může mít jeden z následujících stavů. Stav určuje, jak je s daty dále pracováno (zda je možnost úprav, viditelnost v nabídkách, možnost vazeb atd.).

| Stav            | Popis                                                      | Kdo může změnit | Kdy/proč změnit                              |
|-----------------|------------------------------------------------------------|-----------------|----------------------------------------------|
| **Aktivní**     | Pronajímatel je běžně používán, napojen na další entity.   | Správce/Admin   | Po schválení, dokončení registrace, automaticky při založení. |
| **Archivovaný** | Data jsou pouze ke čtení, nelze měnit ani navazovat vazby. | Správce/Admin   | Když již není využíván, ukončení spolupráce. |
| **Zablokovaný** | Dočasně zamezeno použití, čeká na schválení nebo má problém (např. neuhrazené závazky, podezření na duplicitu). | Správce/Admin | Např. při zjištění chyby, na žádost účetního, automaticky při zjištění duplicit nebo problému. |
| **Pozváno**     | Zatím nedokončená registrace, čeká na potvrzení údajů.     | Systém/Správce  | Po odeslání pozvánky (před aktivací).        |
| **Čeká na doplnění** | Některé povinné údaje chybí nebo jsou nevalidní.      | Systém/Admin    | Při nedokončeném založení, nedostatečné údaje. |
| **Neaktivní**   | Subjekt není aktuálně využíván, ale zůstává v systému.     | Správce/Admin   | Po ručním nastavení, např. po dočasné nečinnosti. |

---

### Přechody mezi stavy (workflow)

| Ze stavu         | Do stavu           | Kdo může přepnout      | Podmínka / Poznámka                       |
|------------------|--------------------|------------------------|-------------------------------------------|
| Pozváno          | Aktivní            | Systém nebo správce    | Po potvrzení údajů uživatelem             |
| Čeká na doplnění | Aktivní            | Správce/Uživatel       | Po doplnění údajů                         |
| Aktivní          | Archivovaný        | Správce/Admin          | Po ukončení spolupráce                    |
| Aktivní          | Zablokovaný        | Správce/Admin/Systém   | Např. při neuhrazených platbách           |
| Zablokovaný      | Aktivní            | Správce/Admin          | Po vyřešení důvodu blokace                |
| Archivovaný      | Aktivní            | Admin (výjimečně)      | Po obnovení spolupráce, pokud je možné    |
| Aktivní          | Neaktivní          | Správce/Admin          | Pokud už není využíván, ale není důvod archivovat |
| Neaktivní        | Aktivní            | Správce/Admin          | Po opětovném využití                      |

---

**Poznámky:**
- **Systém** může měnit stavy automaticky na základě workflow (např. po potvrzení pozvánky, automatická blokace při chybě).
- **Správce/Admin** mají právo měnit všechny stavy, většinou s odůvodněním (loguje se).
- Historie změn stavů je evidována v auditním logu.

3. Podmínky mazání a archivace
Definuj, za jakých okolností lze subjekt smazat/archivovat (např. nesmí mít aktivní smlouvy, vazby na platby atd.)
Přidej varování pro správce.
    ## 🗄️ Podmínky mazání a archivace subjektu
    
    Správné nastavení podmínek mazání a archivace pomáhá chránit data a udržovat integritu systému. Následující pravidla platí pro subjekt typu „Pronajímatel“:
    
    ### 🗑️ Mazání subjektu
    
    | Podmínka                               | Je možné smazat? | Poznámka / Varování pro správce                                      |
    |-----------------------------------------|------------------|---------------------------------------------------------------------|
    | Nemá žádné napojené nemovitosti         | ✅ Ano           |                                                                     |
    | Nemá žádné aktivní smlouvy              | ✅ Ano           |                                                                     |
    | Nemá žádné historické smlouvy           | ✅ Ano           | Jinak pouze archivace, ne mazání                                    |
    | Nemá žádné platby v systému             | ✅ Ano           | Pokud existují platby, umožnit pouze archivaci                      |
    | Nemá žádné napojené jednotky/uživatele  | ✅ Ano           |                                                                     |
    | Je v neaktivním nebo „čeká na doplnění“ stavu | ✅ Ano      | Lepší vždy archivovat, mazat jen při chybně založených subjektech   |
    | Má aktivní smlouvy, platby či jednotky  | ❌ Ne            | **Varování:** Nelze smazat – nejprve je nutné zrušit vazby!         |
    
    **Varování:**  
    > Mazání subjektu je nevratná operace. Před smazáním je potřeba zkontrolovat, že nejsou žádné navázané datové entity (smlouvy, platby, nemovitosti, uživatelé, jednotky). Pokud existují historická data, doporučujeme využít pouze archivaci.
    
    ---
    
    ### 🗄️ Archivace subjektu
    
    | Podmínka                                  | Je možné archivovat? | Poznámka / Varování pro správce                  |
    |--------------------------------------------|---------------------|-------------------------------------------------|
    | Subjekt není aktuálně používán             | ✅ Ano              | Archivovat místo mazání, pokud má historii       |
    | Má aktivní smlouvy, platby nebo jednotky   | ✅ Ano*             | Archivovaný subjekt bude pouze ke čtení, nelze přidávat nové vazby; *doporučení je nejprve ukončit smlouvy a platby |
    | Je pouze v roli „pozván“ nebo „čeká na doplnění“ | ✅ Ano        |                                                   |
    
    **Poznámka:**  
    > Archivace neodstraňuje data, pouze znemožní další editaci a vytváření vazeb. Archivovaný subjekt je pouze ke čtení a zůstává v systému pro účely auditů a historie.
    
    ---
    
    ### 💡 Doporučení pro správce
    
    - Vždy před mazáním ověřte, zda subjekt není napojen na jiné entity.
    - Pokud není možné subjekt smazat, využijte archivaci.
    - Veškeré mazání a archivace by měly být logovány do auditní historie.
    - Pro GDPR požadavky (právo být zapomenut) je nutné ověřit, že mazání neovlivní historii účetních záznamů.
    
    ---

4. Historie a auditní log
Zvaž sekci popisující, jak a kde se zaznamenávají změny údajů (kdo, kdy, co upravil)
Možnost zobrazit historii změn v detailu subjektu.
    ## 🕓 Historie a auditní log změn
    
    Každá významná změna údajů u subjektu typu „Pronajímatel“ je zaznamenána do auditního logu. To zajišťuje možnost zpětné kontroly, vyšší bezpečnost i splnění požadavků na auditovatelnost a GDPR.
    
    ### 🔍 Co se loguje
    
    - **Kdo** změnu provedl (uživatel, systém, API)
    - **Kdy** změna nastala (datum a čas)
    - **Co bylo změněno** (konkrétní pole, původní a nová hodnota)
    - **Jaký typ akce** (vytvoření, úprava, mazání, změna stavu, přidání/odebrání vazby)
    - **Důvod změny** (volitelné, např. zadaný uživatelem při blokaci/archivaci)
    - **Zdroj změny** (aplikace, API, import)
    
    ### 📋 Příklad záznamu v auditním logu
    
    ```json
    {
      "timestamp": "2025-09-09T06:00:00Z",
      "user": "admin@example.cz",
      "action": "update",
      "entity": "pronajimatel",
      "entity_id": "123",
      "fields_changed": {
        "bankovni_ucet": {
          "old": "11111111/0800",
          "new": "22222222/2010"
        },
        "stav": {
          "old": "aktivní",
          "new": "zablokovaný"
        }
      },
      "reason": "Změna bankovního účtu na základě žádosti",
      "source": "web aplikace"
    }
    ```
    
    ---
    
    ### 🖥️ Zobrazení historie změn
    
    - V detailu subjektu (Pronajímatel) je možné zobrazit kompletní **historii změn**.
    - Pro každou změnu je zobrazen:
      - datum a čas,
      - kdo provedl změnu,
      - popis změny (pole, stará a nová hodnota),
      - případně důvod.
    - Lze filtrovat podle typu akce (vytvoření, editace, mazání, změna stavu).
    
    ---
    
    ### 💡 Poznámky / doporučení
    
    - Auditní log je **neměnitelný** (nelze zpětně upravit ani smazat).
    - Auditní log je uložen centrálně (např. v tabulce `audit_log` nebo v rámci příslušného dokumentu).
    - Lze využít i pro zpětnou obnovu dat (rollback), pokud to systém podporuje.
    - Přístup k historii změn může být omezen dle role (admin, účetní).
    - Každá změna stavu subjektu (např. aktivní → archivovaný) je povinně logována.
    
    ---

5. Notifikace a upozornění
Popiš, jaká upozornění/pravidla mají být v systému (např. při změně účtu, blížící se expirační datum smlouvy, apod.)
Jaké akce vyvolají notifikaci a komu.
     ## 🔔 Notifikace a upozornění – Pronajímatel
    
    Systém obsahuje notifikace a automatická upozornění, která usnadňují správu pronajímatelů a zvyšují bezpečnost i uživatelský komfort. Tato sekce popisuje typy notifikací, akce které je vyvolávají a komu jsou určeny.
    
    ---
    
    ### Typy notifikací pro modul Pronajímatel
    
    | Událost / spouštěč                       | Komu přijde notifikace       | Forma (e-mail, systém, SMS) | Poznámka                                   |
    |-------------------------------------------|------------------------------|-----------------------------|---------------------------------------------|
    | Změna bankovního účtu                     | Správce, účetní              | E-mail, systém              | Bezpečnostní upozornění, audit              |
    | Přidání nového pronajímatele              | Správce, admin               | Systém                      |                                             |
    | Změna stavu (aktivní/archivace/blokace)   | Správce, admin, audit log    | Systém                      | Včetně důvodu změny                         |
    | Blížící se expirace smlouvy               | Správce, pronajímatel        | E-mail, systém              | X dní před expirací, nastavitelný interval  |
    | Nový dokument připojen k pronajímateli    | Správce, pronajímatel        | Systém                      | Např. přidání potvrzení, smlouvy, revize    |
    | Propojení s novou jednotkou/nemovitostí   | Správce, pronajímatel        | Systém                      |                                             |
    | Přidání zástupce                          | Správce, pronajímatel, zástupce | E-mail, systém           |                                             |
    | Zrušení nebo blokace subjektu             | Správce, pronajímatel        | E-mail, systém              | Včetně důvodu                               |
    | Doplnění údajů po výzvě                   | Správce, pronajímatel        | E-mail, systém              | Pokud subjekt čeká na doplnění údajů        |
    | Automatické systémové události (např. import, dávkové změny) | Audit log                | Systém                      | Pro účely evidence změn                     |

---

### Pravidla a doporučení

- Notifikace mohou být zobrazeny jako dlaždice/notifikační centrum v hlavním dashboardu.
- Pro důležité události (změna účtu, blokace) doporučujeme i e-mailové upozornění.
- Notifikace by měly být auditovatelné (logováno, kdo a kdy ji viděl).
- Uživatel (např. správce) si může v profilu nastavit, jaké typy notifikací chce přijímat a jakou formou (e-mail, systémová zpráva, SMS – plánováno).
- Zpráva vždy obsahuje stručný popis události, případně odkaz na detail daného pronajímatele.

---

### 💡 Poznámka do budoucna

- Notifikační systém je vhodné řešit jako samostatný modul/komponentu s možností napojení i na další entity (Nájemník, Smlouva, Platby aj.).
- Přehled všech notifikací bude dostupný na vlastní dlaždici (Notifikace/Upozornění) v aplikaci.

---

6. GDPR a export/smazání dat
Sekce s poznámkou, jak je možné exportovat veškerá data subjektu a jak řešit žádost o „právo být zapomenut“ (mazání všech osobních údajů).
## 🛡️ GDPR, export a smazání dat subjektu

    Správa údajů o pronajímatelích podléhá pravidlům ochrany osobních údajů (GDPR). Systém musí umožnit správný export i kompletní odstranění údajů na žádost subjektu („právo být zapomenut“).
    
    ---
    
    ### 📤 Export dat subjektu
    
    - **Kdo může exportovat:** Správce, administrátor (dle oprávnění a role).
    - **Co se exportuje:** Veškerá data evidovaná o subjektu v daném modulu, včetně vazeb (smlouvy, platby, dokumenty, logy změn, připojené jednotky apod.).
    - **Formát exportu:** Preferovaně PDF, CSV nebo JSON (pro strojové zpracování); možnost exportu i všech příloh (dokumentů) v ZIP archivu.
    - **Kde exportovat:** V detailu subjektu tlačítko „Exportovat data subjektu“.
    - **Auditovatelnost:** Každý export je zaznamenán do auditního logu.
    
    ---
    
    ### 🗑️ „Právo být zapomenut“ – smazání osobních údajů
    
    - **Kdo může smazat:** Správce, administrátor (po ověření žádosti, povinně logováno).
    - **Co se smaže:**  
      - Osobní a identifikační údaje subjektu (jméno, příjmení, kontakt, apod.).
      - Vazby a reference jsou anonymizovány (zůstává např. pouze ID bez osobních údajů, pokud je to potřeba pro účetnictví/historii).
      - Historie změn je buď anonymizována, nebo zůstává pouze s ID.
    - **Podmínky:** Mazání je možné pouze pokud nejsou vázány zákonné povinnosti (např. účetnictví, archivace smluv).
    - **Postup:**  
      1. Ověření žádosti uživatele.
      2. Kontrola návazností (smlouvy, platby, audit).
      3. Provede se anonymizace nebo kompletní smazání osobních údajů.
      4. Změna je zaznamenána do auditního logu s důvodem „GDPR – právo být zapomenut“.
    
    ---
    
    ### 📝 Poznámka
    
    - Export a mazání dat by měly být implementovány **v každém modulu zvlášť** (Pronajímatel, Nájemník, Smlouva, Platby atd.), protože každý modul spravuje jinou sadu údajů a vazeb.
    - Pokud není možné data zcela smazat z důvodu zákonných povinností (účetnictví), údaje jsou **anonymizovány** (odstraněny všechny osobní informace, zachováno pouze ID/pseudonymizace).
    - Uživatel je informován o výsledku žádosti (provedeno/neprovedeno, důvod).

---

7. Přístupová práva k jednotlivým funkcím
Tabulka „Kdo na co má právo“ – pro různé role (admin, správce, účetní, jen čtení) – co může vidět, upravovat, exportovat, mazat.
    ## 🔑 Přístupová práva k funkcím modulu Pronajímatel
    
    Níže je přehled oprávnění k jednotlivým funkcím modulu Pronajímatel podle typických rolí v systému. Každá role má jasně vymezený rozsah činností pro zajištění bezpečnosti a odpovědnosti.
    
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
    | Přidat / upravit zástupce    |      ✅       |         ✅          |     ❌      |     ❌      |
    | Přiřadit správce/roli        |      ✅       |         ✅*         |     ❌      |     ❌      |
    | Změna stavu (aktivní/archiv) |      ✅       |         ✅          |     ❌      |     ❌      |
    | Zobrazení historie změn      |      ✅       |         ✅          |     ✅      |     ❌      |
    | Připojit dokument            |      ✅       |         ✅          |     ❌      |     ❌      |
    | Vyhledávání, filtrování      |      ✅       |         ✅          |     ✅      |     ✅      |
    | Zobrazit napojené jednotky   |      ✅       |         ✅          |     ✅      |     ✅      |
    | Statistiky využití           |      ✅       |         ✅          |     ✅      |     ❌      |
    
    *Poznámka:*  
    - ✅ = Má plné oprávnění k funkci  
    - ❌ = Nemá oprávnění k funkci  
    - Správce může přiřazovat roli pouze v rámci svých svěřených entit (např. vybraných pronajímatelů).
    
    ---
    
    ### Další pravidla
    
    - **Audit log**: Veškeré změny oprávnění a přístupů jsou logovány.
    - **Rozšiřitelnost**: Role lze přidávat dle potřeby (např. externí konzultant, technik…).
    - **Přístup pouze ke svěřeným datům**: Správce a účetní vidí pouze subjekty, ke kterým mají explicitní oprávnění.
    - **Možnost nastavit výjimky**: Ve výjimečných případech může admin udělit specifická oprávnění na konkrétní subjekt/funkci.
    
    ---

8. Integrace na externí služby
Je-li v plánu napojení na ARES, ISZR, banky apod., napiš sekci „Plánované integrace“.
    ## 🌐 Plánované integrace na externí služby

    Pro modul Pronajímatel jsou plánovány následující integrace na externí služby, které zjednoduší správu údajů, zvýší přesnost dat a automatizují ověřovací procesy.
    
    ---
    
    ### 🏢 ARES (Administrativní registr ekonomických subjektů)
    - **Účel:** Automatické dohledání a ověření údajů firem, OSVČ a institucí podle IČ.
    - **Funkce:**
      - Vyplnění a ověření základních údajů subjektu (název, adresa, DIČ, právní forma, stav).
      - Kontrola platnosti IČ/DIČ.
      - Automatické doplnění údajů při zadání IČ v průvodci.
    - **Poznámka:**  
      Možnost napojení přes veřejné API ARES, případně přes proxy server kvůli limitům dostupnosti.
    
    ---
    
    ### 🏦 Bankovní služby
    - **Účel:** Ověření vlastnictví bankovního účtu, párování plateb, automatické načítání výpisů.
    - **Funkce:**
      - Ověření IBAN a názvu majitele účtu.
      - Online párování příchozích plateb s evidovanými pronajímateli.
      - Možnost automatického zpracování hromadných výpisů.
    - **Poznámka:**  
      Zvážit využití PSD2 API (bankovní agregátory) pro napojení na více bank.
    
    ---
    
    ### 🏛️ ISZR (Informační systém základních registrů)
    - **Účel:** Ověření a doplnění údajů o osobách a státních organizacích.
    - **Funkce:**
      - Kontrola údajů o osobách (např. rodné číslo, adresa, platnost dokladu).
      - Ověření státních organizací, spolků, veřejných subjektů.
    - **Poznámka:**  
      Přístup dle legislativy a možností napojení (např. přes CzechPOINT, NIA apod.).
    
    ---
    
    ### 📄 Další plánované integrace
    - **E-mailové služby:** Automatické odesílání pozvánek, notifikací, výzev k doplnění údajů.
    - **SMS brány:** Dvoufaktorová autentizace, upozornění na změny.
    - **Externí registry (např. insolvenční rejstřík, rejstřík spolků):** Kontrola solventnosti, validace subjektů.
    
    ---
    
    ### 💡 Poznámka pro vývojáře
    
    - Integrace budou implementovány modulárně, aby šly snadno zapnout/vypnout dle potřeby a legislativy.
    - Každá akce přes externí službu je auditována (záznam o dotazu, odpovědi, chybách).

---

9. Ukázka datové věty / JSON objektu
Přidej konkrétní příklad, jak bude vypadat uložený objekt pronajímatele v DB (vzorový JSON).


10. Přehled závislostí na dalších modulech
Přidej diagram nebo tabulku, které další moduly závisí na pronajímateli a naopak.
    
    ## 🔗 Přehled závislostí na dalších modulech
    
    Modul Pronajímatel je ústředním bodem systému a má vazby na několik dalších klíčových modulů. Níže najdeš tabulku i diagram, které znázorňují vzájemné závislosti – tedy na které moduly je Pronajímatel napojen a které moduly naopak závisí na něm.
    
    ---
    
    ### 📋 Tabulka závislostí
    
    | Modul           | Závisí na Pronajímateli | Pronajímatel závisí na | Popis vazby                                                     |
    |-----------------|:-----------------------:|:----------------------:|-----------------------------------------------------------------|
    | Nemovitost      |         ✅              |         ❌             | Pronajímatel je vlastníkem/nájemcem nemovitosti                 |
    | Jednotka        |         ✅              |         ❌             | Jednotky jsou součástí nemovitosti vlastněné pronajímatelem     |
    | Nájemník        |         ✅              |         ❌             | Nájemník je přiřazen k jednotce, kterou spravuje pronajímatel   |
    | Smlouva         |         ✅              |         ❌             | Pronajímatel je smluvní stranou                                 |
    | Služby          |         ✅              |         ❌             | Služby jsou nastaveny pronajímatelem pro dané jednotky/smlouvy  |
    | Platby          |         ✅              |         ❌             | Platby směřují pronajímateli a jsou s ním párovány              |
    | Uživatelé       |         ✅              |         ✅*            | Správci a účetní mají přístupová práva k pronajímatelům         |
    | Dokumenty       |         ✅              |         ❌             | Dokumenty jsou přiřazeny ke konkrétnímu pronajímateli           |
    | Auditní log     |         ✅              |         ❌             | Všechny akce nad pronajímatelem se logují                       |
    
    *Poznámka: Pronajímatel může být spravován konkrétním uživatelem, tj. přístupová práva jsou vázána na uživatele.*
    
    ---
    
    ### 🗺️ Diagram vztahů (textová verze)
    
    ```
               +---------------------+
               |     Uživatelé       |
               +---------------------+
                         ^
                         |
    +----------+  +------------+  +---------+  +---------+
    | Platby   |  | Nemovitost |  | Jednotka|  | Smlouvy |
    +----------+  +------------+  +---------+  +---------+
         \           |                |           /
          \          |                |          /
           \         v                v         /
                 +--------------------------+
                 |      Pronajímatel        |
                 +--------------------------+
           /          ^                ^         \
          /           |                |          \
    +---------+  +---------+    +---------+  +--------------+
    | Služby  |  | Nájemník|    | Dokumenty|  | Auditní log |
    +---------+  +---------+    +---------+  +--------------+
    ```
    
    ---
    
    ### 💡 Poznámky
    
    - Pokud je Pronajímatel odstraněn/archivován, je třeba řešit i navázané entity (vazby se ruší/archivují, případně jsou jen ke čtení).
    - Veškeré vazby jsou evidovány v databázi a změny jsou zaznamenány v auditním logu.
    - Závislosti se mohou dále rozšiřovat s novými moduly (např. integrace, notifikace).

---
11. Chybové stavy a výjimky
Co dělat, když se nepodaří uložit, napojit na ARES, při duplicitě apod.

    ## ⚠️ Chybové stavy a výjimky – Pronajímatel
    
    Správné ošetření chybových stavů je klíčové pro stabilitu systému a komfort uživatelů. Níže jsou uvedeny typické chybové situace v modulu Pronajímatel a doporučený způsob jejich řešení.
    
    ---
    
    ### Typické chybové stavy
    
    | Chyba / výjimka                             | Doporučené řešení / reakce systému                                             | Uživatelská hláška                  | Logování/Audit      |
    |---------------------------------------------|-------------------------------------------------------------------------------|--------------------------------------|---------------------|
    | Nepodaří se uložit data (DB chyba, síť)     | Zobrazit chybovou hlášku, nabídnout opakování akce, nic neukládat do DB       | „Nepodařilo se uložit změny. Zkuste to prosím znovu.“ | Zapsat detail chyby do logu |
    | Duplicitní IČ/DIČ nebo jiný unikátní údaj   | Zamezit uložení, zvýraznit duplicitní pole, nabídnout možnost najít existující záznam | „Zadané IČ/DIČ již existuje v systému.“ | Logovat pokus o duplicitní zápis |
    | Chyba napojení na ARES                      | Informovat uživatele, že ověření neproběhlo, umožnit ruční zadání údajů       | „Nepodařilo se ověřit subjekt v ARES. Zkontrolujte údaje nebo zkuste později.“ | Logovat detail chyby + odpověď ARES |
    | Chyba napojení na bankovní API              | Informovat uživatele, umožnit uložit bez ověření, nabídnout opakování         | „Ověření účtu selhalo. Data byla uložena, bankovní účet ověřte později.“ | Logovat odpověď API      |
    | Povinné pole není vyplněno                  | Zvýraznit chybějící pole, zamezit uložení                                     | „Vyplňte prosím všechna povinná pole.“ | Není třeba logovat  |
    | Nevalidní formát (např. špatný e-mail, datum)| Zvýraznit pole, zamezit uložení                                               | „Zadaný údaj není v platném formátu.“ | Není třeba logovat  |
    | Neoprávněný přístup k datům                 | Zamezit akci, přesměrovat na přihlášení/přístup zamítnut                      | „Nemáte oprávnění pro tuto akci.“    | Povinně logovat pokus |
    | Změna stavu není povolena                   | Zamezit změnu, zobrazit důvod (např. kvůli navázané smlouvě)                  | „Nelze změnit stav, dokud existují aktivní smlouvy.“ | Logovat pokus         |
    | Chyba při mazání/archivaci                  | Zamezit akci, zobrazit důvod, nabídnout archivaci místo mazání                | „Subjekt nelze smazat – existují navázané záznamy. Archivujte místo toho.“ | Logovat pokus         |
    
    ---
    
    ### Obecné pokyny pro ošetření chyb
    
    - **Srozumitelnost:** Hlášky mají být jasné, uživatelsky srozumitelné, bez technických detailů.
    - **Podpora:** U kritických chyb nabídnout kontakt na podporu nebo možnost nahlášení chyby.
    - **Logování:** Každý technický problém a pokus o neautorizovanou akci je zaznamenán v audit logu včetně detailu chyby, času a uživatele.
    - **Opakovatelnost:** Tam, kde je to možné, nabídnout možnost opakovat akci bez nutnosti znovu vyplňovat celý formulář.
    - **Bezpečnost:** Chybové hlášky nesmí obsahovat citlivé údaje (např. detail SQL dotazu).
    
    ---
    
    ### 💡 Poznámka pro vývojáře
    
    - Chybové kódy a zprávy udržujte centralizovaně – možnost překladů a úpravy wordingů.
    - Vždy validujte vstupy na klientovi i serveru.
    - Sledujte počet výskytů chyb pro včasné odhalení systémových problémů.
    
    ---
   Krátký úvod pro uživatele v modulu pronajimatel
  Pokud dokument bude číst i business uživatel, můžeš na začátek přidat stručné „Co je modul Pronajimatel a kdy ho použít
    ## 🏢 Co je modul Pronajímatel a kdy ho použít

    **Modul Pronajímatel** slouží k evidenci a správě všech osob, firem nebo institucí, které vlastní nebo pronajímají byty, jednotky či jiné prostory v rámci spravovaného portfolia.  
    Umožňuje přehledně sledovat pronajímatele, jejich kontaktní a identifikační údaje, vlastnické vztahy, historii změn i další související informace.
    
    ### Kdy modul použít?
    
    - Pokud potřebuješ evidovat, kdo je vlastníkem nebo pronajímatelem konkrétní jednotky/bytu.
    - Pro správu kontaktů a údajů pronajímatelů (telefon, email, adresa, bankovní účet apod.).
    - Při správě a přidělování jednotek a bytů jednotlivým vlastníkům/pronajímatelům.
    - Pro řešení změn vlastnických vztahů, např. při prodeji jednotky nebo změně majitele.
    - Pokud chceš mít přehled o všech vlastnících, spoluvlastnících a jejich podílech na nemovitostech.
    - Pro kontrolu a správu příjmů z nájmů, záloh a dalších plateb ve vztahu k pronajímatelům.
    - Pro napojení na další související moduly (jednotky, platby, dokumenty, nájemníky apod.).
    
    ### Typické využití:
    
    - Bytová družstva, SVJ, správci nemovitostí, realitní kanceláře.
    - Evidence dlouhodobých i krátkodobých pronajímatelů.
    - Správa spoluvlastníků, právnických osob, institucí i fyzických osob v roli vlastníka/pronajímatele.
    
    > Modul Pronajímatel je klíčovou součástí systému a tvoří základ pro správné fungování dalších navázaných modulů (jednotky, platby, smlouvy, nájemníci atd.).
    
    ---
    ---

> Tento dokument bude rozšiřován podle vývoje a potřeb projektu.
