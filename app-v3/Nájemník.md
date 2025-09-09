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

> Tento dokument bude rozšiřován podle vývoje a potřeb projektu.
