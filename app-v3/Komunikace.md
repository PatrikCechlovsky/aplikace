> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)

# Modul: Komunikace

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Přehled komunikace | Historie odeslaných a přijatých zpráv |
| ✅   | 🟦 Detail zprávy | Náhled, odpověď, archivace             |
| ✅   | 🟦 Šablony a automatizace zpráv | Správa šablon, automatické notifikace  |
| ✅   | 🟦 Odesílání zpráv | Ruční i hromadné odesílání, přílohy    |
| ✅   | 🟦 Nastavení a integrace | SMTP, SMS brána, notifikační preference|
| ✅   | 🗒️ Poznámky, nápady a úkoly | Prostor pro další poznámky a TODO       |

---

## 🟦 Přehled komunikace

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel, uživatelé, pole, filtrování, vyhledávání
- ✅ Historie komunikace s konkrétním subjektem
- ✅ Filtrování podle typu, adresáta, období, modulu
- ✅ Export, archivace zpráv

---

## 🟦 Detail zprávy

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Náhled, obsah, přílohy, stav doručení/čtení
- ✅ Možnost odpovědi, přeposlání, archivace
- ✅ Historie komunikace s jednotkou/nájemníkem

---

## 🟦 Šablony a automatizace zpráv

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Správa šablon pro různé scénáře, proměnné
- ✅ Automatické notifikace, přiřazení workflow
- ✅ Historie odeslaných automatických zpráv

---

## 🟦 Odesílání zpráv

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Ruční i hromadné odesílání (e-mail, SMS, interní zpráva)
- ✅ Výběr příjemce, přidání příloh, výběr šablony
- ✅ Ověření příjemce, chybové stavy

---

## 🟦 Nastavení a integrace

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Nastavení SMTP, IMAP, SMS brány
- ✅ Správa notifikačních preferencí, práv pro odesílání

---

## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Sem piš vše, co je potřeba doplnit, změnit nebo vyřešit.  
> ⏳ = rozpracováno, přeškrtni hotové.

- ⏳ Plná integrace příjmu e-mailů (IMAP synchronizace)
- ⏳ Automatické párování příchozí komunikace s entitami v systému
- ⏳ Odesílání SMS přes více poskytovatelů (fallback)
- ⏳ Nastavení skupinových notifikací (např. pouze vybraným správcům)
- ⏳ Možnost plánovaného odesílání (např. rozeslat v budoucím termínu)
- ⏳ Export a archivace celé historie komunikace pro audit
- ⏳ Automatizované šablony pro všechny události v systému
- ⏳ Možnost napojení na externí helpdesk/ticketing systém

> Otázky k doplnění:
> - Budeme podporovat příjem odpovědí z e-mailu a jejich automatické zpracování?
> - Chceme umožnit nastavení šablon pro každou událost v systému individuálně?
> - Má být možné dohledat komunikaci napříč všemi moduly jedním hledáním?
> - Umožníme uživatelskou správu podpisu a hlavičky zprávy?
> - Chceme podporovat šifrování/PGP pro e-maily?

---

## 🗃️ Datové modely (ukázka)

```json
{
  "id": "msg_20250909_01",
  "typ": "email",
  "odesilatel": "spravce@domena.cz",
  "prijemce": "najemnik1@email.cz",
  "predmet": "Upomínka platby",
  "obsah": "Vážený pane, evidujeme neuhrazenou platbu...",
  "prilohy": ["predpis_platby.pdf"],
  "odeslano": "2025-09-09T13:10:00",
  "stav": "odeslano",
  "modul": "platby"
}
```
```json
{
  "id": "template_upominka",
  "typ": "upominka",
  "predmet": "Upomínka platby za období {{obdobi}}",
  "obsah": "Vážený/á {{jmeno}}, evidujeme k {{datum}} neuhrazenou platbu ve výši {{castka}}...",
  "modul": "platby"
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

1. Odeslání automatizované zprávy → modul (např. Platby) vygeneruje událost → použije šablonu → odešle zprávu → uloží do historie.
2. Manuální odeslání zprávy → výběr příjemce/šablony → odeslání → evidence v historii.
3. Přijetí odpovědi (pokud je podporováno) → přiřazení k modulu → možnost reakce.
4. Správa šablon → tvorba/úprava scénářů pro automatizaci.
5. Reporting komunikace → přehled odeslaných zpráv, úspěšnosti doručení, historie podle subjektu.

---

## 📚 Reference

- [Modul Platby](./platby.md)
- [Modul Údržba](./udrzba.md)
- [Modul Služby](./sluzby.md)
- [Modul Jednotka](./jednotka.md)

---

> Modul Komunikace zajišťuje přehledné a bezpečné uchovávání veškeré komunikace, automatizuje rutinní oznámení a umožňuje efektivní řešení požadavků v rámci správy nemovitostí.
