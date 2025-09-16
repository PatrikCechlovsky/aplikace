# Modul: Komunikace

> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

---

## 🌲 Stromová struktura modulu

| Stav | Sekce / dlaždice                | Popis                                                          |
|------|---------------------------------|----------------------------------------------------------------|
| ✅   | 🟦 Přehled komunikace            | Historie všech zpráv, filtrování, vyhledávání                  |
| ✅   | 🟦 Detail zprávy                 | Náhled, přílohy, stav, odpověď, archivace                      |
| ✅   | 🟦 Šablony a automatizace zpráv  | Správa a tvorba šablon, přiřazení workflow                     |
| ✅   | 🟦 Odesílání zpráv               | Ruční/hromadné odeslání, výběr příjemců, přílohy               |
| ✅   | 🟦 Nastavení a integrace         | Nastavení e-mailu/SMS, notifikační preference, práva, podpisy  |
| ✅   | 📝 Poznámky, nápady a úkoly      | TODO, návrhy na rozšíření, podněty                             |

---

## 🟦 Přehled komunikace

- Zobrazení historie všech odeslaných a přijatých zpráv (e-mail, SMS, interní oznámení)
- Filtrování: typ komunikace, adresát/příjemce, téma, období, modul
- Rychlé vyhledávání podle klíčových slov nebo subjektu
- Hromadné akce: export záznamů, označení, archivace

---

### Checklist – Přehled komunikace
- [x] Účel sekce/dlaždice (evidence a vyhledávání komunikace, historie, rychlý přehled)
- [x] Přístup/viditelnost podle rolí
- [x] Popis všech polí a sloupců (typ, příjemce, předmět, stav, datum, modul)
- [x] Filtrování, hromadné akce, export
- [x] Ukázka tabulky/přehledu
- [x] Validace, workflow, chybové stavy
- [x] Vazby na další moduly (platby, údržba, služby…)
- [x] Specifika, rozšíření

---

### Ukázka tabulky/přehledu

| ID zprávy        | Typ    | Příjemce                  | Předmět             | Modul   | Datum            | Stav      | Akce      |
|------------------|--------|---------------------------|---------------------|---------|------------------|-----------|-----------|
| msg_20250909_01  | email  | najemnik1@email.cz        | Upomínka platby     | platby  | 2025-09-09 13:10 | odesláno  | 👁️ ✏️ 🗑️   |

---

### Pole a validace

| Pole         | Povinné | Typ      | Poznámka                                                      |
|--------------|:-------:|----------|---------------------------------------------------------------|
| Typ          |  Ano    | výběr    | email, SMS, interní                                           |
| Odesilatel   |  Ano    | text     |                                                              |
| Příjemce     |  Ano    | text/array | Podpora více příjemců, možnost CC/BCC                        |
| Předmět      |  Ano    | text     |                                                              |
| Obsah        |  Ano    | text     |                                                              |
| Přílohy      |  Ne     | soubor[] |                                                              |
| Odesláno     |  Ano    | datetime |                                                              |
| Stav         |  Ano    | výběr    | odesláno, doručeno, přečteno, chyba                          |
| Modul        |  Ano    | výběr    | platby, údržba, služby, energie, jednotka…                   |
| Poznámka     |  Ne     | text     | Libovolná poznámka správce                                   |
| Elektronický podpis | Ne | boolean | U zpráv s podepsanou přílohou (BankID/Signer)                |

---

## 🟦 Detail zprávy

- Náhled obsahu, příloh, času odeslání/přijetí, stavu doručení/čtení
- Akce: odpovědět, přeposlat, archivovat, označit, stáhnout přílohy
- Historie komunikace s konkrétním nájemníkem/jednotkou
- Přehled, komu byla zpráva doručena (seznam adresátů, CC/BCC)
- Možnost stáhnout i podepsanou přílohu

---

## 🟦 Šablony a automatizace zpráv

- Evidence a správa šablon pro automatické notifikace (výzva k platbě, upomínka, potvrzení, revize…)
- Možnost vytvářet vlastní šablony s proměnnými (jméno, adresa, částka, termín…)
- Přiřazení šablony k workflow v systému (např. upomínka při neuhrazené platbě)
- Přehled a historie automaticky odeslaných zpráv
- Podpora automatizace: např. potvrzení o platbě, upomínka, poděkování
- Možnost napojení na službu elektronického podpisu (BankID, Signer) a automatické odeslání podepsané přílohy
- Možnost anonymizace příjemců (skrytá kopie) pro hromadné rozesílky

---

### Pole šablony

| Pole        | Povinné | Typ      | Poznámka                         |
|-------------|:-------:|----------|----------------------------------|
| Typ         |  Ano    | výběr    | upomínka, info, potvrzení…       |
| Modul       |  Ano    | výběr    | platby, údržba…                  |
| Předmět     |  Ano    | text     |                                  |
| Obsah       |  Ano    | text     | s podporou proměnných            |
| Proměnné    |  Ne     | pole[]   | jméno, částka, datum…            |
| Podepisovat |  Ne     | boolean  | Pokud má být příloha podepsána   |
| Poznámka    |  Ne     | text     |                                  |

---

## 🟦 Odesílání zpráv

- Ruční odeslání (e-mail, SMS, interní zpráva) z aplikace
- Výběr příjemce z kontaktů (nájemníci, správci, účetní…), možnost vybrat více adresátů (všichni nájemníci, skupiny)
- Výběr šablony nebo vlastní text zprávy
- Přidání příloh (smlouvy, faktury, potvrzení, vyúčtování…)
- Možnost hromadného rozesílání (všem nájemníkům, vybraným uživatelům)
- Podpora odeslání kopie (sobě, CC/BCC, správci)
- Podpora automatického odeslání potvrzení (např. po spárování platby)
- Podpora napojení na elektronický podpis – např. potvrzení o platbě, vyúčtování s podpisem
- Validace příjemce, kontroly na duplicity

---

## 🟦 Nastavení a integrace

- Nastavení e-mailového serveru (SMTP, IMAP) – odesílání a případně příjem zpráv
- Nastavení SMS brány (Twilio, GoSMS…) – pokud je podporováno
- Správa notifikačních preferencí (e-mail/SMS/interní) pro uživatele
- Nastavení práv a omezení pro odesílání zpráv
- Možnost definovat, kdo dostává kopii (odesílatel, správce, nájemník, účetní…)
- **Napojení na katalog firem/Ares pro automatické doplnění kontaktů**
- **Možnost nastavit anonymizaci hromadných rozesílek (skrytá kopie/BCC)**
- **Možnost nastavit napojení na digitální podpis (BankID, Signer, ...)**

---

## 📝 Poznámky, nápady a úkoly (TODO)

> ⏳ = rozpracováno, přeškrtni hotové. Nic nemažeme!

- ⏳ Rozšířit o příjem e-mailů (IMAP), přiřazování příchozích zpráv k modulům
- ⏳ Napojení na více SMS bran a volba preferované (Twilio, GoSMS…)
- ⏳ Pokročilá správa šablon (podmíněné bloky, vícejazyčnost)
- ⏳ Automatizace notifikací – napojení na všechny workflow v systému (např. nový požadavek na údržbu)
- ⏳ Propojení na katalog firem/Ares pro automatické doplnění kontaktů
- ⏳ Evidence stavu doručení a automatická opakování při chybě
- ⏳ Statistiky úspěšnosti doručení, reporting komunikace
- ⏳ Hromadné akce (export, archivace, označení více zpráv)
- ⏳ Možnost anonymizace dat v reportech pro GDPR
- ⏳ Možnost přidat poznámku ke každé zprávě/šabloně
- ⏳ Propojení na modul Dokumenty pro snadné přidání příloh
- ⏳ **Možnost automatického připojení elektronicky podepsané přílohy (BankID, Signer apod.) k e-mailům, zejména potvrzení a vyúčtování**
- ⏳ **Podpora CC/BCC a možnosti výběru, kdo bude v kopii nebo dostane potvrzení**
- ⏳ **Možnost hromadného rozeslání všem nájemníkům nebo jiným skupinám**
- ⏳ **Možnost napojení na workflow pro potvrzování důležitých akcí (např. elektronický podpis při potvrzení platby nebo vyúčtování)**

---

## 🗃️ Datové modely (ukázka)

### 1. Zpráva

```json
{
  "id": "msg_20250909_01",
  "typ": "email",
  "odesilatel": "spravce@domena.cz",
  "prijemce": ["najemnik1@email.cz", "spravce@domena.cz"],
  "cc": ["ucetni@domena.cz"],
  "predmet": "Upomínka platby",
  "obsah": "Vážený pane, evidujeme neuhrazenou platbu...",
  "prilohy": ["predpis_platby.pdf", "potvrzeni_o_platbe_signed.pdf"],
  "odeslano": "2025-09-09T13:10:00",
  "stav": "odeslano",
  "modul": "platby",
  "poznamka": "",
  "elektronicky_podpis": true
}
```

### 2. Šablona zprávy

```json
{
  "id": "template_upominka",
  "typ": "upominka",
  "predmet": "Upomínka platby za období {{obdobi}}",
  "obsah": "Vážený/á {{jmeno}}, evidujeme k {{datum}} neuhrazenou platbu ve výši {{castka}}...",
  "modul": "platby",
  "promenne": ["jmeno", "datum", "castka", "obdobi"],
  "podepisovat": true,
  "poznamka": ""
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                | Řešení systému / reakce      | Uživatelská hláška                              |
|---------------------------------|------------------------------|-------------------------------------------------|
| Neodeslaná zpráva (chyba SMTP)  | Upozornit, možnost opakovat  | „Zprávu se nepodařilo odeslat, zkuste znovu.“   |
| SMS brána nedostupná            | Upozornit, logovat           | „SMS brána není dostupná, zpráva nebyla odeslána.“|
| Duplicitní odeslání             | Upozornit, zabránit          | „Tato zpráva již byla odeslána.“                |
| Chybějící příjemce              | Zabránit odeslání            | „Musíte zadat příjemce zprávy.“                 |
| Chyba elektronického podpisu    | Upozornit, možnost ručně podepsat | „Nepodařilo se ověřit elektronický podpis dokumentu. Ověřte prosím ručně.“ |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Pronajímatel | Správce | Účetní | Nájemník | Pouze čtení |
|------------------------------|:------------:|:-------:|:------:|:--------:|:-----------:|
| Odeslání zprávy              |      ✅      |   ✅    |   ✅   |    ❌    |     ❌      |
| Vytvoření/úprava šablony     |      ✅      |   ✅    |   ✅   |    ❌    |     ❌      |
| Prohlížení komunikace        |      ✅      |   ✅    |   ✅   |    ✅    |     ✅      |
| Hromadné rozesílání          |      ✅      |   ✅    |   ✅   |    ❌    |     ❌      |

---

## 📑 Doporučené workflow

1. **Odeslání automatizované zprávy:**  
   - Modul (např. Platby) vygeneruje událost (např. upomínka), systém použije šablonu a odešle zprávu.
   - Pokud je nastavena volba „podepisovat“, systém vygeneruje podepsanou PDF přílohu (např. přes BankID/Signer) a připojí ji ke zprávě.
   - Zpráva se uloží do historie komunikace.

2. **Manuální odeslání zprávy:**  
   - Správce/pronajímatel vybere příjemce (jednoho nebo více, případně skupinu), šablonu nebo vlastní text, zprávu odešle (včetně příloh, s možností CC/BCC), ta se zaeviduje.
   - Možnost odeslat kopii sobě nebo správci.

3. **Přijetí odpovědi (pokud je podporováno):**  
   - Příchozí zprávy se ukládají, lze na ně reagovat nebo je přiřadit k modulu (např. odpověď na výzvu k platbě).

4. **Správa šablon:**  
   - Úprava a tvorba šablon pro různé scénáře (platby, údržba, revize…).
   - Nastavení automatického podepisování příloh, pokud je třeba.

5. **Reporting komunikace:**  
   - Přehled odeslaných zpráv, úspěšnosti doručení, historie podle nájemníka/jednotky.

---

## 📚 Reference a vazby

- [Modul Platby](./platby.md)
- [Modul Údržba](./udrzba.md)
- [Modul Služby](./sluzby.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Dokumenty](./dokumenty.md)

**Vazby na další moduly:**
- **Platby/Služby:** Automatické notifikace o platbách, vyúčtování, upomínky, potvrzení.
- **Údržba:** Odesílání upozornění na nové požadavky, termíny servisů/revizí.
- **Jednotka:** Evidence komunikace po jednotkách/nájemnících.
- **Dokumenty:** Přímé připojení příloh (faktury, smlouvy, protokoly, potvrzení).
- **ARES/Katalog firem:** Automatické doplňování kontaktů (TODO).
- **Notifikace:** Centrální správa preferencí, typů doručení.
- **Elektronický podpis:** Napojení na služby třetích stran (BankID, Signer) pro potvrzování důležitých dokumentů.

---

> Modul Komunikace je srovnatelný s tím, co nabízí moderní aplikace – podporuje ruční i automatické rozesílky, hromadné zprávy, šablony s proměnnými, přílohy, možnost elektronického podpisu a reporting. Pokud budeš chtít rozšířit o další integrace, workflow nebo speciální scénáře, napiš!
