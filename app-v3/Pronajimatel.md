> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

# Modul: Pronajímatel

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Přehled pronajímatelů | Hlavní dlaždice s přehledem subjektů/pronajímatelů |
|      | ├── 👁️ Přehled pronajímatelů | Tabulka všech pronajímatelů |
|      | ├── 📝 Přidat pronajímatele | Formulář pro přidání subjektu |
|      | ├── 📝 Editace pronajímatele | Formulář pro editaci subjektu |
|      | └── 👁️ Detail pronajímatele | Detailní pohled na pronajímatele |
| ✅   | 🟦 Správa zástupců | Správa zástupců pronajímatelů |
|      | ├── 👁️ Přehled zástupců | Seznam všech zástupců |
|      | ├── 📝 Přidat/editovat zástupce | Formulář pro správu zástupců |
| ✅   | 🟦 Auditní log / historie změn | Auditní záznamy a historie změn |
| ✅   | 🟦 Statistiky a využití | Statistiky využití a přehled dat |
| ✅   | 🟦 Import/Export pronajímatelů | Import a export subjektů |
| ✅   | 🟦 Přehled dokumentů | Správa a přehled dokumentů/príloh |
| ✅   | 🟦 Nastavení modulu | Nastavení a konfigurace modulu |
| ✅   | 🟦 Notifikace a upozornění | Přehled a správa notifikací |
| ✅   | 🟦 Průvodce založením | Průvodce pro založení subjektu |
| ⏳   | 🟦 Vazby na další entity | Přehled vazeb na nemovitosti, jednotky, smlouvy, uživatele |
| 🚫   | ~~Staré sekce nebo neaktuální~~ | ~~Případné původní struktury, pokud existovaly~~ |

---

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

---

## 📋 Přehled a základní workflow

**Účel:** Správa pronajímatelů nemovitostí (osoby, firmy, instituce) a jejich zástupců.  
**Databázová tabulka:** `Subjekt`  
**Stav:** 🟡 Návrh / vývoj

---

## 🏗️ Základní struktura dat a typy subjektů

- **Typy pronajímatelů:**  
  - 👤 Fyzická osoba
  - 🧑‍💼 OSVČ
  - 🏢 Firma (s.r.o., a.s., apod.)
  - 🫂 Spolek/skupina
  - 🏛️ Státní instituce
  - 🤝 Zastupující osoba

---

## 🧑‍💼 Průvodce založením

V každém formuláři (např. **Jednotka**, **Nájemník**, **Smlouva**) je možné spustit  
🌸 **„Spustit průvodce“**  
Uživatel může:  
- ✅ Pokračovat v průvodci a uložit rozpracovaná data.  
- 🏁 Přeskočit kroky, které nezná nebo nechce řešit hned.  
- 💾 Uložit stav a vrátit se později.

---

## 🗃️ Datové modely (ukázka)

> Pronajímatelé se ukládají do tabulky **Subjekt**.

```json
{
  "id": "1",
  "typ_subjektu": "firma",
  "nazev": "Firma ABC s.r.o.",
  "jmeno": "",
  "prijmeni": "",
  "ico": "12345678",
  "dic": "CZ12345678",
  "kontakty": {
    "telefon": "+420123456789",
    "email": "info@firma.cz"
  },
  "adresy": [
    {
      "typ": "sídlo",
      "ulice": "Kancelářská",
      "cislo_popisne": "10",
      "mesto": "Praha",
      "psc": "18600"
    }
  ],
  "bankovni_ucet": "123456789/0100",
  "stav": "aktivni",
  "created_at": "2025-09-09T08:00:00Z",
  "updated_at": "2025-09-09T09:10:00Z"
}
```

---

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

- 🌸 Spustit průvodce založením nebo pokračovat v dokončení
- ➕ Přidat pronajímatele
- ✏️ Upravit pronajímatele
- 👁️ Zobrazit detail
- 📁 Archivovat
- 🗑️ Smazat (pouze bez vazeb/historie)
- 🔁 Obnovit přístup / zneplatnit
- ➕ Přidat zástupce
- 📤 Exportovat seznam
- 📥 Importovat (hromadně)
- 🔍 Vyhledávání / filtrování
- 📑 Zobrazit dokumenty
- 📊 Statistiky využití
- 🧑‍💼 Přiřadit správce / uživatele
- ⚙️ Nastavení modulu
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

| Akce / Role                | Administrátor | Správce nemovitostí | Účetní      | Pouze čtení |
|----------------------------|:-------------:|:-------------------:|:-----------:|:-----------:|
| Zobrazit seznam            |      ✅       |         ✅          |     ✅      |     ✅      |
| Zobrazit detail            |      ✅       |         ✅          |     ✅      |     ✅      |
| Přidat pronajímatele       |      ✅       |         ✅          |     ❌      |     ❌      |
| Upravit pronajímatele      |      ✅       |         ✅          |     ❌      |     ❌      |
| Smazat pronajímatele       |      ✅       |         ❌          |     ❌      |     ❌      |
| Archivovat pronajímatele   |      ✅       |         ✅          |     ❌      |     ❌      |
| Exportovat data subjektu   |      ✅       |         ✅          |     ✅      |     ❌      |
| Importovat data            |      ✅       |         ✅          |     ❌      |     ❌      |
| Přidat / upravit zástupce  |      ✅       |         ✅          |     ❌      |     ❌      |
| Přiřadit správce/roli      |      ✅       |         ✅*         |     ❌      |     ❌      |
| Změna stavu                |      ✅       |         ✅          |     ❌      |     ❌      |
| Zobrazení historie změn    |      ✅       |         ✅          |     ✅      |     ❌      |
| Připojit dokument          |      ✅       |         ✅          |     ❌      |     ❌      |
| Vyhledávání, filtrování    |      ✅       |         ✅          |     ✅      |     ✅      |
| Zobrazit napojené jednotky |      ✅       |         ✅          |     ✅      |     ✅      |
| Statistiky využití         |      ✅       |         ✅          |     ✅      |     ❌      |

---

## 🟢 Stavy a workflow subjektu

Každý pronajímatel v systému může mít jeden z následujících stavů:

| Stav            | Popis                                                      | Kdo může změnit | Kdy/proč změnit                              |
|-----------------|------------------------------------------------------------|-----------------|----------------------------------------------|
| **Aktivní**     | Pronajímatel je běžně používán, napojen na další entity.   | Správce/Admin   | Po schválení, dokončení registrace, automaticky při založení. |
| **Archivovaný** | Data jsou pouze ke čtení, nelze měnit ani navazovat vazby. | Správce/Admin   | Když již není využíván, ukončení spolupráce. |
| **Zablokovaný** | Dočasně zamezeno použití, čeká na schválení nebo má problém (např. neuhrazené závazky, podezření na duplicitu). | Správce/Admin | Např. při zjištění chyby, na žádost účetního, automaticky při zjištění duplicit nebo problému. |
| **Pozváno**     | Zatím nedokončená registrace, čeká na potvrzení údajů.     | Systém/Správce  | Po odeslání pozvánky (před aktivací).        |
| **Čeká na doplnění** | Některé povinné údaje chybí nebo jsou nevalidní.      | Systém/Admin    | Při nedokončeném založení, nedostatečné údaje. |
| **Neaktivní**   | Subjekt není aktuálně využíván, ale zůstává v systému.     | Správce/Admin   | Po ručním nastavení, např. po dočasné nečinnosti. |

### Přechody mezi stavy (workflow)

(viz detailní tabulka v původním textu - zde pouze krátce)

---

## 🗄️ Podmínky mazání a archivace subjektu

(viz detailní tabulka v původním textu)

---

## 🕓 Historie a auditní log změn

(viz příklad a postup v původním textu)

---

## 🔔 Notifikace a upozornění – Pronajímatel

(viz detailní tabulka v původním textu)

---

## 🛡️ GDPR, export a smazání dat subjektu

(viz detailní popis v původním textu)

---

## 🔑 Přístupová práva k funkcím modulu Pronajímatel

(viz detailní tabulka v původním textu)

---

## 🌐 Plánované integrace na externí služby

(viz sekce v původním textu)

---

## 🔗 Přehled závislostí na dalších modulech

(viz tabulka a diagram v původním textu)

---

## ⚠️ Chybové stavy a výjimky – Pronajímatel

(viz tabulka a postupy v původním textu)

---

## 📝 Poznámky pro vývojáře

- Pronajímatelé budou uloženi v tabulce **Subjekt** (společné pro další entity)
- Modul využívá komponenty: FormLinking, AttachmentSystem, FormGuard (viz uživatelé)
- Pro typy subjektů používej konzistentní kódování (`osoba`, `firma`, ...)
- Ošetři validace (IČO, DIČ, e-mail, bankovní účet)
- V budoucnu plánována integrace s ARES a dalšími registry

---

## 🐛 Známé problémy / TODO

(viz původní text)

---

> Tento soubor slouží jako živý dokument a bude se rozšiřovat podle potřeb projektu.
