# Modul: Nájemník

## 📋 Přehled
**Účel:** Správa nájemníků jednotek (osoby, firmy, instituce) a jejich zástupců.  
**Databázová tabulka:** `Subjekt`  
**Stav:** 🟡 Návrh / vývoj

---

## 🏗️ Základní struktura modulu

- **Typy nájemníků:**  
  - 👤 Fyzická osoba
  - 🧑‍💼 OSVČ
  - 🏢 Firma (s.r.o., a.s., apod.)
  - 🫂 Spolek/skupina
  - 🏛️ Státní instituce
  - 🤝 Zastupující osoba

## 🧑‍💼 Průvodce založením
V každém formuláři (např. **Jednotka**, **Pronajímatel**, **Smlouva**) bude tlačítko  
🌸 **„Spustit průvodce“**  
Uživatel může:  
- ✅ Pokračovat v průvodci a uložit rozpracovaná data.  
- 🏁 Přeskočit kroky, které nezná nebo nechce řešit hned.  
- 💾 Uložit stav a vrátit se později.

- **Vazba na jiné moduly:**
  - **Jednotka** = **Smlouva** = **Platby** = **Služby** = **Uživatelé**
  - **Jednotka:** Nájemník je přiřazen k jednotce/bytu.
  - **Smlouvy:** Nájemník je smluvní stranou.
  - **Služby:** Nájemník má přiřazen rozpis záloh, kauce a datumy plateb.
  - **Platby:** Nájemník je plátcem plateb.
  - **Uživatelé:** Správce/administrátor modulu.

---

## 🗃️ Datový model
> Nájemníci se ukládají do tabulky **Subjekt**.  
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
- ➕ Přidat nového nájemníka
- 📜 Auditní log / historie změn
- 📊 Statistiky nájemníků (např. počet jednotek)
---

## 🔘 Hlavní funkce / tlačítka

- ✅ **Přidat nájemníka**
- ✏️ **Upravit nájemníka**
- 👁️ **Zobrazit detail**
- 📁 **Archivovat**
- 🗑️ **Smazat** půjde jen záznam, který nemá vazby, historii
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
- **Správce nemovitostí:** správa nájemníků a jejich zástupců
- **Účetní:** přístup k údajům pro fakturaci, exporty
- **Prohlížející:** pouze nahlížení

---

## 🟢 Stavy a workflow subjektu

Každý nájemník v systému může mít jeden z následujících stavů (shodné s modulem Pronajímatel):

| Stav            | Popis                                                      | Kdo může změnit | Kdy/proč změnit                              |
|-----------------|------------------------------------------------------------|-----------------|----------------------------------------------|
| **Aktivní**     | Nájemník je běžně používán, napojen na další entity.       | Správce/Admin   | Po schválení, dokončení registrace, automaticky při založení. |
| **Archivovaný** | Data jsou pouze ke čtení, nelze měnit ani navazovat vazby. | Správce/Admin   | Když již není využíván, ukončení spolupráce. |
| **Zablokovaný** | Dočasně zamezeno použití, čeká na schválení nebo má problém| Správce/Admin   | Např. při zjištění chyby, duplicitě, neuhrazené platbě apod. |
| **Pozváno**     | Nedokončená registrace, čeká na potvrzení údajů            | Systém/Správce  | Po odeslání pozvánky (před aktivací).        |
| **Čeká na doplnění** | Některé povinné údaje chybí nebo jsou nevalidní.      | Systém/Admin    | Při nedokončeném založení, nedostatečné údaje. |
| **Neaktivní**   | Subjekt není aktuálně využíván, ale zůstává v systému.     | Správce/Admin   | Po ručním nastavení, např. dočasná nečinnost.|

### Přechody mezi stavy viz Pronajímatel, s úpravou pro vazby na jednotku/smlouvu/platby.

---

## 🗄️ Podmínky mazání a archivace subjektu

Viz sekce v Pronajímatel – upravit logiku na:
- Nesmí mít aktivní smlouvy, platby, napojení na jednotky.
- Pokud existují historická data, pouze archivace.

---

## 🕓 Historie a auditní log změn

Každá významná změna údajů je zaznamenána do auditního logu (viz příklad v Pronajímatel).

---

## 🔔 Notifikace a upozornění – Nájemník

| Událost / spouštěč                       | Komu přijde notifikace       | Forma (e-mail, systém, SMS) | Poznámka                                   |
|-------------------------------------------|------------------------------|-----------------------------|---------------------------------------------|
| Změna bankovního účtu                     | Správce, účetní              | E-mail, systém              | Bezpečnostní upozornění, audit              |
| Přidání nového nájemníka                  | Správce, admin               | Systém                      |                                             |
| Změna stavu (aktivní/archivace/blokace)   | Správce, admin, audit log    | Systém                      | Včetně důvodu změny                         |
| Blížící se expirace smlouvy               | Správce, nájemník            | E-mail, systém              | X dní před expirací, nastavitelný interval  |
| Nový dokument připojen k nájemníkovi      | Správce, nájemník            | Systém                      | Např. přidání potvrzení, smlouvy, revize    |
| Propojení s novou jednotkou               | Správce, nájemník            | Systém                      |                                             |
| Přidání zástupce                          | Správce, nájemník, zástupce  | E-mail, systém              |                                             |
| Zrušení nebo blokace subjektu             | Správce, nájemník            | E-mail, systém              | Včetně důvodu                               |
| Doplnění údajů po výzvě                   | Správce, nájemník            | E-mail, systém              | Pokud subjekt čeká na doplnění údajů        |
| Automatické systémové události (import, dávkové změny) | Audit log          | Systém                      | Pro účely evidence změn                     |

---

## 🛡️ GDPR, export a smazání dat subjektu

- Export a smazání viz sekce v Pronajímatel – stejný mechanismus, pouze pro typ Nájemník.
- Povinnost anonymizace údajů pokud nejsou splněny podmínky pro smazání.

---

## 🔑 Přístupová práva k funkcím modulu Nájemník

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

## 🌐 Plánované integrace na externí služby

- **ARES, ISZR, banky:** Ověření údajů nájemníka (IČ, DIČ, bankovní účet).
- **E-mailové a SMS brány:** Notifikace, ověření kontaktů, dvoufaktorová autentizace.
- **Externí registry (např. insolvenční rejstřík):** Kontrola solventnosti.

---

## 🔗 Přehled závislostí na dalších modulech

| Modul           | Závisí na Nájemníkovi | Nájemník závisí na | Popis vazby                                                     |
|-----------------|:---------------------:|:------------------:|-----------------------------------------------------------------|
| Jednotka        |         ✅            |        ✅          | Nájemník je přiřazen k jednotce; jednotka odkazuje na nájemníka |
| Smlouva         |         ✅            |        ✅          | Nájemník je smluvní stranou, smlouva je vázána na nájemníka     |
| Platby          |         ✅            |        ✅          | Platby jsou přiřazeny k nájemníkovi (plátci)                    |
| Služby          |         ✅            |        ✅          | Služby nastavené pro jednotku/smlouvu nájemníka                 |
| Dokumenty       |         ✅            |        ❌          | Dokumenty přiřazené k nájemníkovi                               |
| Uživatelé       |         ✅            |        ✅*         | Správci a účetní mají přístupová práva k nájemníkům             |
| Auditní log     |         ✅            |        ❌          | Všechny akce nad nájemníkem se logují                           |

*Poznámka: Nájemník může být spravován konkrétním uživatelem, tj. přístupová práva jsou vázána na uživatele.*

---

### 🗺️ Diagram vztahů (textová verze)

```
           +---------------------+
           |     Uživatelé       |
           +---------------------+
                     ^
                     |
+----------+  +-----------+  +---------+  +---------+
| Platby   |  | Jednotka  |  | Smlouva |  | Služby  |
+----------+  +-----------+  +---------+  +---------+
     \           |               |            /
      \          |               |           /
       \         v               v          /
             +--------------------------+
             |        Nájemník          |
             +--------------------------+
       /          ^               ^         \
      /           |               |          \
+---------+  +---------+    +---------+  +--------------+
| Dokumenty|            |              | Auditní log   |
+---------+             |              +--------------+
```

---

## ⚠️ Chybové stavy a výjimky – Nájemník

(Sekce obdobná jako v Pronajímatel, upravit podle nájemnických scénářů: duplicita, chyba ARES, platba, blokace, povinná pole apod.)

---

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

---
Ukázka uloženého JSON objektu pro nájemníka
  (pro vývojáře/testery je ukázka konkrétní datové věty velmi užitečná, viz bod 9 v pronajímatelovi)
    ## 🗂️ Ukázka uloženého JSON objektu nájemníka (osoba)
    
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
      "zastoupeni": "",             // nebo id zástupce, pokud je zastoupený
      "stav": "aktivni",
      "created_at": "2025-09-09T09:00:00Z",
      "updated_at": "2025-09-09T09:10:00Z"
    }
    ```
    
    - Všechna pole odpovídají položkám ve formuláři (viz screenshot ![image2](image2)).
    - Pole `typ_opravneni` může nabývat hodnot např. `cteni_vybranych`, `cteni_vsech`, `uprava_vsech`.
    - Pokud je nájemník zastoupen, pole `zastoupeni` obsahuje ID zástupce.
    - Heslo ukládat bezpečně (v praxi hash, zde jen pro ilustraci).
    - Pole `stav` určuje workflow v systému.
    - Doplň podle potřeby další pole (např. jednotka_id, smlouva_id, ...).
    
    ---
    
    ### 🗂️ Ukázka pro nájemníka – firma
    
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
      "zastoupeni": "11",           // id osoby, která firmu zastupuje
      "stav": "aktivni",
      "created_at": "2025-09-09T08:00:00Z",
      "updated_at": "2025-09-09T09:05:00Z"
    }
    ```
    
    - Pro firmy/spolky je místo jména a příjmení pouze `nazev`.
    - Pro osoby/OSVČ je vždy jméno, příjmení a případně titul.
    
    ---
    
    > Ukázka slouží i jako vzor pro export dat nájemníka v rámci GDPR.


Specifika pro workflow nájemníka
  (například: výpověď smlouvy, přestěhování, změna jednotky, přidání spolubydlícího apod.)
    ## 🔄 Specifika workflow pro modul Nájemník
    
    Modul Nájemník má několik specifických scénářů, které je nutné zohlednit při návrhu workflow a správy dat:
    
    ---
    
    ### 1. Výpověď smlouvy nájemníka
    
    - **Krok 1:** Uživatel (správce/moderátor) zahájí proces výpovědi v detailu nájemníka nebo smlouvy.
    - **Krok 2:** Systém ověří, zda má nájemník aktivní smlouvy.
    - **Krok 3:** Zadá se datum výpovědi a případně důvod.
    - **Krok 4:** Smlouva se označí jako „vypovězená“ s nastavením data ukončení.
    - **Krok 5:** Nájemník přechází do stavu „neaktivní“ nebo „ukončený“, není-li navázána žádná další aktivní smlouva/jednotka.
    - **Krok 6:** Všechny napojené služby a platby se ukončí k datu výpovědi.  
    - **Notifikace:** Správce, účetní i nájemník obdrží upozornění.
    
    ---
    
    ### 2. Přestěhování / změna jednotky
    
    - **Krok 1:** Správce v detailu nájemníka vybere novou jednotku (nebo zadá odhlášení z původní a přihlášení do nové).
    - **Krok 2:** Vytvoří se nebo upraví vazba na novou jednotku, případně nová smlouva.
    - **Krok 3:** Původní jednotka se označí jako „uvolněná“ k datu vystěhování.
    - **Krok 4:** Historie jednotek je evidována (nájemník má seznam všech jednotek, kde byl veden).
    - **Krok 5:** Služby a platby se převedou na novou jednotku od data změny.
    - **Notifikace:** Správce a nájemník dostanou zprávu o změně.
    
    ---
    
    ### 3. Přidání/odebrání spolubydlícího
    
    - **Krok 1:** Správce v detailu nájemníka nebo jednotky zvolí „Přidat spolubydlícího“.
    - **Krok 2:** Zadá nového nájemníka (nebo vybere ze seznamu), nastaví období spolubydlení.
    - **Krok 3:** Vytvoří se vazba mezi hlavním nájemníkem, spolubydlícím a jednotkou.
    - **Krok 4:** Platby a služby lze rozdělit dle počtu osob.
    - **Krok 5:** Při odchodu spolubydlícího se vztah archivuje, hlavní nájemník zůstává.
    - **Notifikace:** Správce, hlavní nájemník i spolubydlící jsou informováni.
    
    ---
    
    ### 4. Dočasné přerušení nájmu / dlouhodobá nepřítomnost
    
    - **Krok 1:** Správce označí nájemníka jako „dočasně nepřítomen“ (např. na dobu určitou).
    - **Krok 2:** Systém upraví stav a případně rozpis služeb/plateb.
    - **Krok 3:** Po uplynutí období se nájemník vrací do původního stavu, případně přechází do jiného stavu dle situace.
    - **Notifikace:** Správce a účetní dostanou upozornění.
    
    ---
    
    ### 5. Změna kontaktních údajů / bankovního účtu
    
    - **Krok 1:** Nájemník nebo správce aktualizuje kontaktní údaje (telefon, email, adresa, bankovní účet).
    - **Krok 2:** Změna se loguje do historie změn (auditní log).
    - **Krok 3:** U změny bankovního účtu je vyžadováno potvrzení (např. e-mailem).
    - **Notifikace:** Účetní i správce jsou informováni o změně.
    
    ---
    
    ### 6. Automatické workflow
    
    - **Automatické archivace:** Pokud není nájemník navázán na žádnou aktivní jednotku/smlouvu, systém může nabídnout automatickou archivaci.
    - **GDPR workflow:** Při žádosti o smazání provést kontrolu všech vazeb, případně anonymizaci údajů.
    
    ---
    
    ### 💡 Poznámky
    
    - **Historie změn:** Každý krok workflow je zaznamenán do auditního logu.
    - **Stavy:** Stav nájemníka se mění podle navázaných entit (aktivní, neaktivní, archivovaný, vypovězený, spolubydlící, atd.).
    - **Uživatelské role:** Některé akce může provádět pouze správce/admin.
    - **Notifikace:** Každý důležitý krok vyvolává systémovou i e-mailovou notifikaci dle nastavení.
    
    ---

Více příkladů typických chybových stavů
  (např. změna trvalé adresy, duplicita e-mailu, neplatná platba – pokud existují specifika pro nájemníka)
    ## ⚠️ Typické chybové stavy a výjimky – specifika pro nájemníka
    
    Některé chybové situace jsou pro nájemníky specifické nebo častější. Je důležité je správně zachytit, zobrazit srozumitelnou hlášku uživateli a logovat do auditu:
    
    ---
    
    | Chyba / výjimka                              | Doporučené řešení / reakce systému                                  | Uživatelská hláška                                   | Logování/Audit      |
    |----------------------------------------------|---------------------------------------------------------------------|------------------------------------------------------|---------------------|
    | **Duplicita e-mailu**                        | Zamezit uložení, zvýraznit pole, nabídnout hledání existujícího     | „Tento e-mail je již použit u jiného nájemníka.“      | Povinně logovat     |
    | **Duplicita čísla dokladu**                  | Zamezit uložení, zvýraznit pole                                     | „Číslo dokladu je již evidováno u jiného nájemníka.“  | Povinně logovat     |
    | **Změna trvalé adresy**                      | Vyžádat potvrzení (např. e-mailem nebo správce schválí změnu)       | „Byla změněna adresa, vyčkejte na potvrzení.“         | Logovat změnu + audit|
    | **Neplatná platba**                          | Upozornit správce/účetní, označit platbu jako neplatnou, nabídnout opravu | „Platba je neplatná – kontaktujte správce.“      | Logovat pokus i řešení|
    | **Nepovolená změna jednotky**                | Nepovolit změnu, pokud existují neukončené platby/smlouvy           | „Nejprve ukončete platby/smlouvy k původní jednotce.“ | Logovat pokus       |
    | **Chybějící povinné pole (např. doklad, kontakt)** | Zvýraznit pole, zamezit uložení                                | „Vyplňte prosím všechna povinná pole.“                | Není nutné logovat  |
    | **Duplicitní rodné číslo / datum narození**  | Zamezit uložení, zvýraznit pole                                     | „Zadané rodné číslo/datum narození je již evidováno.“ | Povinně logovat     |
    | **Neautorizovaná změna bankovního účtu**     | Vyžadovat schválení správce nebo dvoufaktorové potvrzení            | „Změna bankovního účtu čeká na schválení správce.“    | Povinně logovat     |
    | **Neplatný formát e-mailu/telefonu**         | Zvýraznit pole, zamezit uložení                                     | „Zadaný e-mail/telefon není v platném formátu.“       | Není nutné logovat  |
    | **Neoprávněný přístup k údajům nájemníka**   | Zamezit akci, přesměrovat/odmítnout                                 | „Nemáte oprávnění k této akci.“                       | Povinně logovat     |
    | **Nájemník je stále přiřazen k aktivní jednotce** | Zamezit odstranění/archivaci                                  | „Nájemníka nelze odstranit – je stále přiřazen k jednotce.“ | Povinně logovat     |
    | **Chyba při importu dat (např. duplicitní nájemník)** | Zobrazit detail chyby, umožnit částečný import               | „Import obsahuje chyby – zkontrolujte detaily.“       | Logovat výskyt      |
    | **Chyba při exportu dat**                    | Zobrazit chybovou hlášku, nabídnout opakování                       | „Export selhal, zkuste to prosím znovu.“              | Logovat detail      |
    
    ---
    
    ### 💡 Poznámky
    
    - Každá změna citlivých údajů (adresa, kontakt, účet) je auditována.
    - Duplicitní údaje (e-mail, doklad, RČ) musí být unikátní v rámci systému.
    - U neplatné platby je možné nabídnout opravný proces (přirazení platby, důvod zamítnutí).
    - Změny s dopadem na smlouvy/jednotky/platby musí být kontrolovány na návaznosti.
    
    ---

Sekce pro „hromadné operace“
  (např. hromadný import, export více nájemníků najednou, hromadné změny stavů – pokud to aplikace umožňuje)
    ## 📦 Hromadné operace s nájemníky
    
    Pokročilé správě nájemníků napomáhají hromadné operace, které šetří čas při větších změnách nebo správě velkého počtu záznamů. Níže jsou popsány klíčové možnosti hromadných akcí:
    
    ---
    
    ### 1. Hromadný import nájemníků
    
    - **K čemu slouží:** Rychlé založení většího počtu nájemníků najednou (např. při převodu agendy, migraci dat, onboarding nových nájemníků).
    - **Formát:** CSV, XLSX nebo JSON dle šablony – povinná pole jsou stejná jako ve formuláři.
    - **Validace:** Systém ověří duplicitní údaje (e-mail, IČO, číslo dokladu), povinná pole a správnost formátů.
    - **Chybové řádky:** Záznamy s chybami budou vypsány s popisem chyby, ostatní se uloží.
    - **Možnost aktualizace:** Lze použít i pro hromadnou aktualizaci údajů (pokud existuje ID nebo unikátní identifikátor).
    
    ---
    
    ### 2. Hromadný export nájemníků
    
    - **K čemu slouží:** Export aktuálního seznamu nájemníků pro analýzu, reporting, zálohu nebo splnění GDPR požadavků.
    - **Výběr dat:** Možnost filtrovat a exportovat pouze vybrané nájemníky dle stavu, typu, jednotky, období atd.
    - **Formát:** CSV, XLSX, JSON, případně ZIP včetně příloh.
    - **Audit:** Každý export je logován v auditní historii.
    
    ---
    
    ### 3. Hromadná změna stavu nájemníků
    
    - **Typické scénáře:**  
      - Archivace více neaktivních nájemníků najednou  
      - Aktivace skupiny nájemníků (např. po importu)
      - Blokace skupiny nájemníků z důvodu neuhrazených závazků
    - **Možnost filtrace:** Vyber si nájemníky podle kritérií a proveď změnu stavu jedním krokem.
    - **Notifikace:** Podle nastavení obdrží vybraní nájemníci/správci informaci o změně.
    
    ---
    
    ### 4. Hromadné přiřazení jednotky, služby nebo správce
    
    - **Přiřazení jednotky:** Vybraným nájemníkům lze přiřadit jednotku/bydlení jedním krokem (např. při stěhování skupiny).
    - **Přiřazení správce:** Umožňuje změnit správce/odpovědnou osobu u více nájemníků současně.
    - **Nastavení služeb:** Hromadné nastavení služeb nebo záloh pro více nájemníků (např. po změně ceny služeb).
    
    ---
    
    ### 5. Hromadné generování dokumentů nebo výzev
    
    - **Smlouvy, výzvy k úhradě, informační dopisy:** Možnost vygenerovat a rozeslat dokument více nájemníkům najednou.
    - **Automatické připojení dokumentu:** Vložený dokument se automaticky zařadí ke všem vybraným nájemníkům.
    
    ---
    
    ### 💡 Poznámky
    
    - Hromadné operace jsou dostupné dle oprávnění (většinou pouze správce nebo administrátor).
    - Každá hromadná akce je auditována (kdo, kdy, co změnil/importoval/exportoval).
    - Při hromadných akcích je vždy zobrazen přehled úspěšných a chybných řádků/operací.
    - Doporučujeme před hromadnými úpravami provést zálohu nebo export stávajících dat.
    
    ---

Reference na další dokumentaci
  Pokud existují samostatné dokumenty pro „smlouva“, „jednotka“, můžeš přidat odkaz na jejich popis.

    ## 📚 Reference na související dokumentaci
    
    Pro komplexní pochopení vazeb a workflow doporučujeme prostudovat také dokumentaci k dalším souvisejícím modulům:
    
    - [Modul Smlouva](./smlouva.md)  
      Podrobnosti o evidenci, workflow a správě smluv v systému.
    
    - [Modul Jednotka](./jednotka.md)  
      Popis struktury a správy jednotek (bytů, prostor), na které může být nájemník navázán.
    
    - [Modul Pronajímatel](./pronajimatel.md)  
      Kompletní specifikace práce s pronajímateli a jejich vazby na nájemníky.
    
    - [Modul Platby](./platby.md)  
      Evidence, párování a správa plateb nájemníků.
    
    - [Modul Služby](./sluzby.md)  
      Nastavení záloh, služeb a jejich rozúčtování pro jednotlivé nájemníky.
    
    - [Modul Dokumenty](./dokumenty.md)  
      Práce s přílohami a dokumenty přiřazenými k nájemníkovi.
    
    > Odkazy vedou na další soubory v adresáři `aplikace/app-v3/` (pokud existují). Pokud některý dokument chybí, doplň jej nebo kontaktuj správce projektu.
    
    ---
Sekce „Známé problémy / TODO“
  (viz pronajímatel – můžeš zde vést úkoly, které nejsou ještě řešeny/implementovány)
    ## 🐛 Známé problémy / TODO
    
    Tato sekce slouží k evidenci aktuálních nedostatků, otevřených otázek a plánovaných vylepšení v modulu Nájemník.
    
    ---
    
    - [ ] **Ošetřit duplicity** (e-mail, číslo dokladu, RČ, login)  
        Zabránit vytvoření dvou nájemníků se stejnými klíčovými údaji.
    
    - [ ] **Validace a ověřování údajů**  
        Ověřovat formáty telefonů a e-mailů, doplnit online kontrolu bankovního účtu.
    
    - [ ] **Přehled vazeb na další entity**  
        V detailu nájemníka zobrazit vazby na jednotky, smlouvy, platby, dokumenty.
    
    - [ ] **Napojení na externí registry**  
        Ověřovat IČO a údaje z registrů (ARES, ISZR), kontrolovat solventnost.
    
    - [ ] **Hromadné operace – import/export**  
        Doladit šablony a validace pro hromadný import, vylepšit chybová hlášení.
    
    - [ ] **Workflow pro výpovědi a změny jednotek**  
        Implementovat scénáře pro stěhování, výpověď, změnu spolubydlení.
    
    - [ ] **Automatizace notifikací**  
        Nastavit upozornění na blížící se expiraci smluv, změnu údajů, nové dokumenty.
    
    - [ ] **Auditní log**  
        Zajistit kompletní logování všech změn, akcí a hromadných operací.
    
    - [ ] **GDPR – anonymizace a export**  
        Implementovat anonymizaci údajů při požadavku na smazání, vylepšit export dat.
    
    - [ ] **Přístupová práva**  
        Doprogramovat detailní nastavení rolí a oprávnění pro správce, účetní, nájemníky.
    
    - [ ] **UI/UX vylepšení**  
        Optimalizovat formuláře, doplnit chytré našeptávače (např. na města, ulice), lepší validace.
    
    - [ ] **Testování workflow a chybových stavů**  
        Připravit testovací scénáře pro typické chyby, duplicity a změny stavu.
    
    ---
    
    > Seznam je průběžně aktualizován dle vývoje a zpětné vazby od uživatelů i správců.

Krátký úvod pro uživatele
  Pokud dokument bude číst i business uživatel, můžeš na začátek přidat stručné „Co je modul Nájemník a kdy ho použít“.
  ## 🏠 Co je modul Nájemník a kdy ho použít
  
  **Modul Nájemník** slouží k evidenci a správě všech osob, firem nebo institucí, které užívají byt, jednotku nebo jiný prostor v rámci spravovaného portfolia.  
  Umožňuje přehledně sledovat nájemníky, jejich kontaktní a smluvní údaje, historii bydlení, platby, služby i další související informace.
  
  ### Kdy modul použít?
  
  - Pokud potřebuješ evidovat, kdo konkrétně bydlí nebo užívá danou jednotku/bydlení.
  - Pro správu kontaktů a údajů nájemníků (telefon, email, adresa, bankovní účet apod.).
  - Při uzavírání, evidenci a ukončování nájemních smluv.
  - Pro rozdělení a kontrolu plateb, služeb a záloh jednotlivých nájemníků.
  - Při potřebě hromadně spravovat více nájemníků najednou (import, export, změny stavů).
  - Pro zajištění souladu s legislativou (auditní log, GDPR, záznam historie změn).
  - Pro automatizaci notifikací a upozornění nájemníkům i správcům.
  
  ### Typické využití:
  
  - Bytová družstva, SVJ, správci nemovitostí, pronajímatelé, facility management, ale i firmy poskytující ubytování zaměstnancům.
  - Evidence jak dlouhodobých, tak krátkodobých nájemníků.
  - Správa spolubydlících, zástupců a přenastavování jednotek či smluv.
  
  > Modul Nájemník je klíčovou součástí systému a tvoří základ pro správné fungování dalších navázaných modulů (smlouvy, platby, služby, jednotky atd.).
  
  ---

> Tento dokument bude rozšiřován podle vývoje a potřeb projektu.
