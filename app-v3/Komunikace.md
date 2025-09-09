# Modul: Komunikace

---

## 📬 Úvod

Modul **Komunikace** slouží k evidenci, správě a automatizaci veškeré komunikace mezi pronajímatelem, nájemníky, správci, účetními a dalšími subjekty.  
Umožňuje uchovávat historii odeslaných a přijatých zpráv (e-mail, SMS, interní zprávy), vytvářet šablony pro automatické notifikace a plánovat hromadnou komunikaci.

---

## 🟦 Hlavní sekce / dlaždice

### 1. Přehled komunikace

- Zobrazení historie všech odeslaných a přijatých zpráv (e-mail, SMS, interní oznámení)
- Možnost filtrování podle typu komunikace, adresáta/příjemce, tématu, období a modulů (např. finance, údržba)
- Rychlé vyhledávání podle klíčových slov nebo subjektu

---

### 2. Detail zprávy

- Náhled konkrétní zprávy (obsah, přílohy, čas odeslání/přijetí, stav doručení/čtení)
- Možnost odpovědi, přeposlání, archivace, označení
- Historie komunikace s konkrétním nájemníkem/jednotkou

---

### 3. Šablony a automatizace zpráv

- Správa šablon pro automatické notifikace (např. výzva k platbě, upomínka, potvrzení přijetí platby, oznámení o revizi, vyúčtování)
- Možnost vytvářet vlastní šablony s proměnnými (jméno, adresa, částka, termín…)
- Přiřazení šablony k určitému workflow v systému (např. upomínka při neuhrazené platbě)
- Přehled odeslaných automatických zpráv

---

### 4. Odesílání zpráv

- Možnost ručního odeslání zprávy (e-mail, SMS, interní zpráva) z aplikace
- Výběr příjemce z kontaktů (nájemníci, správce, účetní…)
- Přidání příloh (smlouvy, faktury…)
- Možnost hromadného rozesílání (např. oznámení všem nájemníkům v domě)

---

### 5. Nastavení a integrace

- Nastavení e-mailového serveru (SMTP, IMAP) – pokud je podporováno, umožňuje párování s e-mailovou schránkou a přijímání zpráv do systému
- Nastavení SMS brány (např. Twilio, GoSMS, SMS gateway) – pokud bude podporováno, umožňuje odesílání SMS přímo z aplikace
- Správa notifikačních preferencí pro uživatele (e-mail/SMS/interní zpráva)
- Nastavení práv a omezení pro odesílání zpráv

---

## 🛠️ Poznámky k integraci

- **E-mailová integrace**:  
  - Odesílání e-mailů z aplikace je běžně možné přes SMTP server (Google, Seznam, vlastní doména…).  
  - Pro párování a příjem e-mailů je třeba podporovat IMAP, což je technicky složitější (nutná konfigurace, bezpečnost).
  - Doporučení: začít pouze s odesíláním a historii odeslaných zpráv, příjem řešit až podle potřeb a možností.

- **Odesílání SMS**:  
  - Technicky možné přes externí SMS brány (Twilio, GoSMS, ...), ale bývá zpoplatněné.
  - Vyžaduje registraci a napojení na API dané služby.
  - Doporučení: nabídnout jako volitelnou funkcionalitu, s možností vlastního napojení a platby za SMS.

- **Interní zprávy/notifikace**:  
  - Alternativně lze posílat oznámení jen v rámci aplikace (pop-up, e-mailová notifikace uživatelům systému).

---

## 🗃️ Datové modely (ukázka)

### 1. Zpráva

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

### 2. Šablona zprávy

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

1. **Odeslání automatizované zprávy:**  
   - Modul (např. Platby) vygeneruje událost (např. upomínka), systém použije šablonu a odešle zprávu.
   - Zpráva se uloží do historie komunikace.

2. **Manuální odeslání zprávy:**  
   - Správce/pronajímatel vybere příjemce, šablonu nebo vlastní text, zprávu odešle a ta se zaeviduje.

3. **Přijetí odpovědi (pokud je podporováno):**  
   - Příchozí zprávy se ukládají, lze na ně reagovat nebo je přiřadit k modulu (např. odpověď na výzvu k platbě).

4. **Správa šablon:**  
   - Úprava a tvorba šablon pro různé scénáře (platby, údržba, revize…).

5. **Reporting komunikace:**  
   - Přehled odeslaných zpráv, úspěšnosti doručení, historie podle nájemníka/jednotky.

---

## 📚 Reference

- [Modul Platby](./platby.md)
- [Modul Údržba](./udrzba.md)
- [Modul Služby](./sluzby.md)
- [Modul Jednotka](./jednotka.md)

---

> Modul Komunikace zajišťuje přehledné a bezpečné uchovávání veškeré komunikace, automatizuje rutinní oznámení a umožňuje efektivní řešení požadavků v rámci správy nemovitostí.
