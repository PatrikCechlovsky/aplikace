# Modul: Platby

> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

---

## 🏦 Přehled dlaždic (sekcí) modulu Platby

Tento modul zajišťuje kompletní správu příchozích i odchozích plateb, párování s předpisy/službami, evidenci dlužných částek, upomínek, penalizací i potvrzení plateb.

---

### 1. Přehled plateb

**Popis:**  
Komplexní seznam všech plateb (příchozích i odchozích), možnost filtrování podle období, jednotky, nájemníka, služby, typu platby, stavu a způsobu úhrady.

**Funkce:**
- Vyhledávání a filtrování (datum, jednotka, nájemník, služba, typ platby, stav)
- Zobrazení detailu platby (včetně vazby na předpis/službu)
- Export/Import (CSV, XLSX)
- Možnost ručního zadání nové platby
- Možnost opravy nebo stornování platby (s auditní stopou)
- Rychlé součty (celkem přijaté, vydané, čekající, po splatnosti)

---

### 2. Dlužné platby (Neuhrazené)

**Popis:**  
Seznam všech neuhrazených předpisů po splatnosti (zálohy, služby, vyúčtování, kauce).

**Funkce:**
- Seřazení podle výše dluhu, data splatnosti, stáří pohledávky
- Filtrování podle jednotky, nájemníka, služby, typu platby
- Možnost hromadného označení/zpracování (např. generování upomínek)
- Přehled penalizací a historie upomínek k dané platbě
- Možnost přímého zahájení workflow vymáhání (druhá upomínka, právní výzva)

---

### 3. Upomínky

**Popis:**  
Evidence všech odeslaných i připravených upomínek k neuhrazeným platbám, včetně penalizací.

**Funkce:**
- Přehled upomínek podle data, typu služby, částky, adresáta
- Stav upomínky (odeslaná, čeká na reakci, penalizováno)
- Možnost hromadného odeslání upomínek (e-mail, SMS, interní zpráva)
- Historie upomínání pro každou platbu/nájemníka
- Možnost nastavit automatické upomínky dle pravidel

---

### 4. Platby k potvrzení

**Popis:**  
Platby, které čekají na schválení správce/účetní – např. ručně zadané, importované, nespárované s předpisem, s neidentifikovaným VS.

**Funkce:**
- Přehled čekajících plateb (včetně detailu platby a poznámky)
- Možnost potvrdit, odmítnout, upravit, přiřadit k předpisu/službě
- Auditní log všech změn a schválení
- Možnost hromadného potvrzení (např. při importu z banky)
- Notifikace správci o nových platbách k potvrzení

---

### 5. Zpožděné platby

**Popis:**  
Platby, které byly uhrazeny až po splatnosti – evidence zpoždění, výpočet penále, možnost vygenerovat penalizaci.

**Funkce:**
- Seznam všech zpožděných plateb včetně data úhrady, délky zpoždění, výše penále
- Možnost vygenerování předpisu penalizace
- Přímý export přehledu pro správce/nájemníky
- Historie penalizací a notifikací

---

### 6. Vrácené / odmítnuté platby

**Popis:**  
Platby, které byly vráceny zpět plátci nebo odmítnuty (např. chybný VS, neidentifikovaný plátce, chybný účet).

**Funkce:**
- Přehled vrácených/odmítnutých plateb s důvodem a datem vrácení
- Možnost znovu přiřadit, upravit nebo informovat plátce
- Historie řešení každé vrácené platby

---

### 7. Párování plateb

**Popis:**  
Nástroje pro ruční i automatické párování přijatých plateb z banky s předpisy/službami.

**Funkce:**
- Přehled nespárovaných plateb (přijatých z banky/importu)
- Automatický návrh párování podle VS, částky, doby přijetí
- Možnost ručního přiřazení/opravy párování
- Přehled chybně spárovaných plateb (možnost opravy)
- Záznam úspěšně spárovaných plateb a historie párování

---

### 8. Export / Import

**Popis:**  
Nástroje pro export/import dat o platbách, dlužných částkách, upomínkách apod.

**Funkce:**
- Export přehledů do CSV, XLSX (vše, dlužné, upomínky, penalizace…)
- Import plateb z banky, import hromadných úhrad (CSV, XLSX)
- Validace importovaných dat, náhled před uložením, logování změn
- Možnost hromadného zpracování/importu/exportu

---

### 9. Statistiky a přehledy

**Popis:**  
Grafické a číselné přehledy o stavu plateb, pohledávek, penalizací, splacenosti v čase.

**Funkce:**
- Grafy: vývoj pohledávek, % splacenosti, doby splatnosti, objem penalizací
- Přehled podle jednotek, nájemníků, služeb, období
- Možnost exportu grafů a statistik
- Podpora pro reporting správci, účetnímu, vedení

---

## 🛡️ Role a oprávnění v modulu Platby

| Funkce / Akce                | Administrátor | Správce nemovitostí | Účetní      | Pouze čtení |
|------------------------------|:-------------:|:-------------------:|:-----------:|:-----------:|
| Přehled plateb               |      ✅       |         ✅          |     ✅      |     ✅      |
| Potvrzení/Odmítnutí platby   |      ✅       |         ✅          |     ✅      |     ❌      |
| Párování plateb              |      ✅       |         ✅          |     ✅      |     ❌      |
| Generování upomínek          |      ✅       |         ✅          |     ✅      |     ❌      |
| Zadání ruční platby          |      ✅       |         ✅          |     ✅      |     ❌      |
| Export/Import                |      ✅       |         ✅          |     ✅      |     ❌      |
| Generování penalizace        |      ✅       |         ✅          |     ✅      |     ❌      |
| Archivace/smazání            |      ✅       |         ✅          |     ✅      |     ❌      |

---

## ⚠️ Typické chybové stavy a výjimky v modulu Platby

| Chyba / výjimka                         | Řešení systému / reakce                 | Uživatelská hláška                                |
|------------------------------------------|-----------------------------------------|---------------------------------------------------|
| Neidentifikovaná platba                  | Uložit do sekce k potvrzení             | „Platba nelze automaticky přiřadit, nutno schválit ručně.“ |
| Duplicita platby                         | Zvýraznit duplicitní záznam             | „Platba již byla zaevidována, kontrolujte zadání.“|
| Platba po splatnosti                     | Označit jako zpožděná, vygenerovat penále | „Platba byla přijata po splatnosti, účtováno penále.“ |
| Chybný VS nebo částka                    | Upozornit, přiřadit ručně               | „Platba má chybný variabilní symbol nebo částku, nutné ověřit.“ |
| Pokus o smazání platby s vazbou na vyúčtování | Zamezit, nabídnout archivaci           | „Nelze smazat – existuje vazba na vyúčtování.“    |

---

## 📑 Doporučení pro workflow

- **Přehled plateb** a **dlužné** jsou hlavní operativní sekce pro každodenní práci správce/účetní.
- **Upomínky** a **penalizace** by měly být propojeny s notifikačním systémem.
- **Platby k potvrzení** a **párování** jsou klíčové pro správnost evidence a minimalizaci chyb.
- **Export/Import** sekce je důležitá pro propojení s bankou, účetnictvím a reporting.
- **Statistiky** poskytují rychlý přehled o stavu pohledávek a splacenosti.

---

## 📚 Reference na další dokumentaci

- [Modul Služby](./sluzby.md)
- [Modul Vyúčtování](./vyuctovani.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Nájemník](./najemnik.md)
# Modul: Platby pronajímatele (výdaje, SVJ, dodavatelé)

---

## 🏢 Úvod

Tato sekce modulu **Platby** slouží k evidenci, správě a kontrole všech plateb, které má pronajímatel vůči třetím stranám (např. SVJ, správci, dodavatelům energií, pojišťovnám, státu).  
Umožňuje oddělit vlastní výdaje pronajímatele od příjmů od nájemníků a přehledně sledovat stav závazků, splatnost, historii a rentabilitu.

---

## 🟦 Dlaždice / sekce

### 1. Přehled mých výdajů (platby pronajímatele)

- **Co zobrazuje:**  
  Všechny platby, které máš povinnost uhradit jako vlastník/pronajímatel.
  - Předpisy SVJ (fond oprav, zálohy na služby)
  - Platby za energie (elektřina, plyn, voda)
  - Pojištění nemovitosti
  - Daně (daň z nemovitosti, z příjmu z nájmu)
  - Ostatní pravidelné či jednorázové poplatky (správa domu, revize, služby)
- **Funkce:**  
  - Filtrování podle typu výdaje, období, stavu (splaceno, po splatnosti, čeká na úhradu)
  - Zobrazení historie plateb a příloh (např. faktura, výzva k úhradě)
  - Rychlé součty za období (měsíc, rok, typ výdaje)
  - Export do CSV/XLSX

---

### 2. Neuhrazené výdaje / dlužné vůči SVJ a dodavatelům

- **Co zobrazuje:**  
  Seznam všech neuhrazených nebo po splatnosti výdajů.
- **Funkce:**  
  - Zvýraznění kritických položek (dluhy, upomínky)
  - Možnost zapsat poznámku (důvod prodlení, domluvený odklad apod.)
  - Evidence penalizací a upomínek od SVJ/dodavatele

---

### 3. Upomínky a penalizace od SVJ/dodavatelů

- **Co zobrazuje:**  
  Historii a stav všech upomínek, penalizací, výzev k úhradě, které jsi obdržel jako pronajímatel.
- **Funkce:**  
  - Přehled podle typu, data, částky, stavu (vyřešeno/otevřeno)
  - Možnost uložit přílohu (např. e-mail, dopis, faktura)
  - Přímé propojení s evidovanou platbou/výdajem

---

### 4. K potvrzení / ručně zadané výdaje

- **Co zobrazuje:**  
  Výdaje, které čekají na schválení, ruční přiřazení (např. import banky, nespárované platby).
- **Funkce:**  
  - Možnost ručně přiřadit platbu k předpisu (SVJ, energie, atd.)
  - Editace, potvrzení, odmítnutí nebo úprava platby
  - Auditní log

---

### 5. Statistiky, porovnání, rentabilita

- **Co zobrazuje:**  
  Grafy a souhrny výdajů po měsících/ročně, podle typu (SVJ, energie…), srovnání s příjmy od nájemníků.
- **Funkce:**  
  - Vývoj výdajů v čase (trendy, sezónnost)
  - Poměr výdaje/příjmy (rentabilita jednotky, nemovitosti)
  - Export reportů pro účetnictví/daňové účely

---

## 🗃️ Datové modely (ukázka)

### 1. Výdajový předpis od SVJ

```json
{
  "id": "svj202509",
  "typ": "fond_oprav",
  "castka": 1700,
  "obdobi_od": "2025-09-01",
  "obdobi_do": "2025-09-30",
  "splatnost": "2025-09-15",
  "stav": "neuhrazeno",
  "partner": "SVJ Ulice 11",
  "priloha": "predpis_svj_2025-09.pdf",
  "poznámka": ""
}
```

### 2. Skutečně uhrazená platba

```json
{
  "id": "platba20250915",
  "predpis_id": "svj202509",
  "castka": 1700,
  "datum_uhrady": "2025-09-12",
  "zpusob_uhrady": "prevod",
  "stav": "uhrazeno",
  "priloha": "vypis_2025-09.pdf"
}
```

### 3. Upomínka/penalizace od SVJ

```json
{
  "id": "upominka20250925",
  "predpis_id": "svj202509",
  "castka": 100,
  "typ": "penale",
  "datum_vzniku": "2025-09-25",
  "stav": "uhrazeno",
  "priloha": "upominka_email_2025-09-25.pdf"
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                       | Řešení systému / reakce             | Uživatelská hláška                                |
|----------------------------------------|-------------------------------------|---------------------------------------------------|
| Neuhrazený výdaj po splatnosti         | Zvýraznit, upozornit uživatele      | „Výdaj je po splatnosti, hrozí penalizace.“       |
| Upomínka od SVJ                       | Notifikace, možnost přiřadit platbě | „Obdrželi jste upomínku od SVJ, zkontrolujte stav.“|
| Nespárovaná platba                     | Zařadit do sekce k potvrzení        | „Platba nebyla přiřazena, nutno doplnit údaje.“   |
| Duplicita platby                       | Upozornit, zamezit uložení          | „Tato platba již v evidenci existuje.“            |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Pronajímatel | Účetní      | Pouze čtení |
|------------------------------|:------------:|:-----------:|:-----------:|
| Přehled svých výdajů         |      ✅      |     ✅      |     ✅      |
| Zadání/úprava výdaje         |      ✅      |     ✅      |     ❌      |
| Potvrzení platby             |      ✅      |     ✅      |     ❌      |
| Přidání přílohy/poznámky     |      ✅      |     ✅      |     ❌      |
| Export reportu               |      ✅      |     ✅      |     ❌      |

---

## 📑 Doporučené workflow

1. **Zadání nového předpisu výdaje (např. SVJ):**  
   - Ručně nebo importem z předpisu.
   - Systém sleduje splatnost, upozorňuje na blížící se termín.
2. **Spárování úhrady (ručně/import):**  
   - Automaticky (podle VS, částky) nebo ručně přiřadit platbu k předpisu.
   - Změna stavu na „uhrazeno“.
3. **Upomínky a penalizace:**  
   - Příjem upomínky, přiřazení k předpisu, možnost zadat úhradu penále.
4. **Statistiky & reporting:**  
   - Pravidelné generování přehledů výdajů a porovnání s příjmy z nájmů.

---

## 📚 Reference

- [Modul Platby (nájemníci)](./platby.md)
- [Modul Služby](./sluzby.md)
- [Modul Jednotka](./jednotka.md)

---

> Tato dokumentace umožňuje přehlednou a bezpečnou správu tvých výdajů vůči SVJ a dalším partnerům odděleně od příjmů z nájmu.
---
Co by šlo případně doplnit (volitelně, podle potřeb):

Vzorová data (ukázkový CSV řádek, JSON objekt platby)
Ukázky notifikačních šablon (e-mail/SMS)
Diagram workflow (vizualizace procesu párování nebo upomínky)
Možnosti napojení na banku/účetnictví (pokud se plánuje)
Příklady uživatelských obrazovek/tabulek
platby pojištěí jednou ročně
platby třeba aplikace
jiné výdaje roční měsíční tříleté atd
> Pokud chceš detailní workflow nebo datové struktury pro některou sekci, napiš konkrétní požadavek.
