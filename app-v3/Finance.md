# Modul: Finance

---

## 🏦 Úvod

Modul **Finance** poskytuje komplexní pohled na finanční zdraví pronajímatele, nemovitostí i jednotlivých jednotek. Integruje všechny příjmy, náklady, výdaje, daně, poplatky a umožňuje jejich analýzu, plánování, srovnání v čase i grafické zobrazení.  
Umožňuje sledovat rentabilitu každé nemovitosti a jednotky, plánovat cashflow, porovnávat období a rychle identifikovat slabá místa nebo příležitosti ke zlepšení.

---

## 🟦 Hlavní sekce / dlaždice

### 1. Přehled financí (dashboard)

- Grafické zobrazení klíčových ukazatelů (příjmy, náklady, zisk/ztráta, rentabilita)
- Výběr úrovně: všechno / konkrétní pronajímatel / nemovitost / jednotka
- Porovnání měsíců/roků (meziroční, meziměsíční změny)
- Vývoj zůstatků, cashflow

---

### 2. Příjmy

- Příjmy z nájmů (za jednotku, nemovitost, pronajímatele)
- Příjmy za služby (energie, internet, parkování…)
- Ostatní příjmy (např. mimořádné platby, vratky přeplatků od SVJ, pojistné plnění)
- Filtrování podle období, jednotky, typu
- Historie a predikce (plánované příjmy, očekávané platby)

---

### 3. Náklady a výdaje

- Náklady na energie (teplo, plyn, voda, elektřina) – včetně rozpočítání na jednotky/M2
- Výdaje na údržbu, opravy, revize (např. komín, kotel, výtah…)
- Pravidelné platby (SVJ, správa, služby)
- Daně (daň z nemovitosti, z příjmu, pojistné)
- Ostatní náklady (pojištění, právní služby, poplatky)
- Možnost evidovat mimořádné náklady (havárie, investice)
- Poměr rozpočítaných vs. skutečných nákladů

---

### 4. Daně a poplatky

- Přehled povinných daní a poplatků (za nemovitost, z příjmu, odpad, poplatky státu)
- Upozornění na blížící se splatnost
- Možnost evidence zaplacení, historie, export pro účetní

---

### 5. Porovnání období a analytika

- Porovnání příjmů a nákladů mezi roky/měsíci
- Vývoj rentability jednotky/nemovitosti (ziskovost na jednotku, na M2)
- Identifikace trendů: růst nákladů, pokles příjmů, výkyvy
- Grafy: cashflow, struktura nákladů, top položky, rentabilita
- Export do PDF/XLSX pro reporting

---

### 6. Přehled za jednotku / nemovitost

- Výběr konkrétní jednotky nebo nemovitosti
- Detailní rozpad příjmů, nákladů, zisku
- Rozpočítání sdílených nákladů (teplo na m2, komín, výtah…)
- Srovnání více jednotek v rámci nemovitosti
- Historie a prognóza

---

### 7. Statistika a vizualizace

- Grafy a tabulky: příjmy, náklady, zisk/ztráta, saldo účtů
- Poměrové grafy (např. podíl energií na nákladech, rentabilita po měsících)
- Možnost exportu grafů a statistik

---

### 8. Plánování (forecasting)

- Možnost zadávat plánované (odhadované) příjmy i výdaje na období (měsíčně, ročně i ad hoc)
- Plánování cashflow – zobrazení očekávaných zůstatků v čase
- Porovnání skutečnosti vs. plánu (sledování odchylek, upozornění na překročení/nesplnění cíle)
- Možnost nastavit rozpočet pro nemovitost, jednotku, konkrétní typ nákladu/příjmu
- Export a tisk rozpočtových plánů

---

### 9. Investice a mimořádné výdaje

- Evidence větších investičních akcí (rekonstrukce, nákup vybavení, modernizace) odděleně od běžných provozních nákladů
- Možnost evidovat plánované i skutečné náklady na investice
- Přiřazení investic k nemovitosti/jednotce, možnost rozpočítání na více období
- Vyhodnocení návratnosti investic (ROI) – propojení s příjmy z nájmu
- Export přehledu investic

---

### 10. Automatizace a pravidla

- Pravidla pro automatické rozpočítání nákladů (např. energie podle m2, služeb podle počtu osob)
- Automatizované reporty (měsíční/roční souhrn na e-mail, upozornění na překročení rozpočtu, blížící se splatnost daně apod.)
- Možnost nastavit schvalovací workflow pro určité typy výdajů nebo investic
- Plánované importy dat z banky/účetnictví

---

### 11. Saldo účtů

- Evidence zůstatků na bankovních účtech pronajímatele/správce
- Možnost zadávat více účtů (např. pro každou nemovitost zvlášť)
- Historie pohybů na účtu, párování s příjmy a výdaji
- Upozornění na nízký/záporný zůstatek
- Přehled cashflow včetně bankovních pohybů

---

### 12. Přístupová práva pro více pronajímatelů

- Více vlastníků může sdílet systém – každý vidí jen své finance (příjmy, výdaje, rozpočty, investice)
- Sdílení reportů s účetním, spoluvlastníky, správci (možnost nastavit granularitu přístupu)
- Jasná pravidla a auditní log kdo co vidí/mění
- Možnost centralizovaného přehledu pro správce portfolia více majitelů

---

## 🗃️ Datové modely (ukázka)

### 1. Plánovaný příjem/výdaj (rozpočet)

```json
{
  "id": "plan2026_01",
  "typ": "prijem_najem",
  "jednotka_id": "101",
  "nemovitost_id": "1",
  "castka_plan": 13500,
  "obdobi": "2026-01",
  "castka_skutecnost": 13200,
  "odchylka": -300,
  "poznamka": "Menší příjem kvůli opravě bytu"
}
```

### 2. Investice

```json
{
  "id": "investice2025_modernizace",
  "typ": "rekonstrukce_koupelny",
  "nemovitost_id": "1",
  "castka_plan": 90000,
  "castka_skutecnost": 87500,
  "datum_zahajeni": "2025-03-15",
  "datum_ukonceni": "2025-05-20",
  "stav": "dokončeno",
  "poznámka": "Modernizace koupelny v jednotce 101"
}
```

### 3. Pravidlo pro rozpočítání nákladů

```json
{
  "id": "pravidlo_teplo_m2",
  "typ_nakladu": "teplo",
  "zpusob_rozuctovani": "podle_m2",
  "od": "2025-01-01",
  "do": null,
  "poznámka": "Teplo rozpočítáno podle plochy jednotek"
}
```

### 4. Saldo účtu

```json
{
  "id": "ucet_123456789",
  "typ": "bankovni_ucet",
  "popis": "Hlavní účet pro nemovitost 1",
  "zustatek": 53250,
  "mena": "CZK",
  "stav_k": "2025-09-09"
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                | Řešení systému / reakce      | Uživatelská hláška                              |
|---------------------------------|------------------------------|-------------------------------------------------|
| Nezadaný plán příjmu/nákladu    | Upozornit, zvýraznit v přehledu | „Chybí plán pro období XY.“                    |
| Odchylka skutečnost vs. plán    | Zvýraznit, upozornit         | „Skutečné náklady překročily plán o X Kč.“      |
| Nezadaný účet/saldo             | Upozornit, nutnost doplnit   | „Není evidován bankovní účet pro tuto nemovitost.“|
| Nedostatečné právo k náhledu    | Omezit zobrazení, logovat    | „Nemáte oprávnění vidět tuto část financí.“     |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Pronajímatel | Účetní      | Správce portfolia | Pouze čtení |
|------------------------------|:------------:|:-----------:|:-----------------:|:-----------:|
| Přehled financí              |      ✅      |     ✅      |        ✅         |     ✅      |
| Zadání/úprava příjmu/nákladu |      ✅      |     ✅      |        ✅         |     ❌      |
| Zadání/editace investice     |      ✅      |     ✅      |        ✅         |     ❌      |
| Správa účtů/salda            |      ✅      |     ✅      |        ✅         |     ❌      |
| Nastavení pravidel           |      ✅      |     ✅      |        ✅         |     ❌      |
| Export reportu/grafu         |      ✅      |     ✅      |        ✅         |     ❌      |
| Správa přístupů              |      ✅      |     ✅      |        ✅         |     ❌      |

---

## 📑 Doporučené workflow

1. **Plánování příjmů a výdajů:**  
   - Zadání předpokládaných částek do rozpočtu (měsíčně, ročně, pro investice atd.)
   - Systém automaticky porovnává skutečnost vs. plán, zvýrazní odchylky

2. **Evidence investic:**  
   - Vložení nové investiční akce (plán, skutečnost, termíny)
   - Automatické propojení s náklady, možnost vyhodnocení návratnosti (ROI)

3. **Automatizace a pravidla:**  
   - Nastavení pravidel pro rozpočítání nákladů (podle m2, osob, atd.)
   - Nastavení automatických reportů, upozornění a schvalovacích workflow

4. **Saldo účtů:**  
   - Evidence bankovních účtů a zůstatků, párování finančních pohybů s příjmy/výdaji
   - Upozornění na nízký/záporný zůstatek

5. **Více pronajímatelů:**  
   - Každý má přístup jen ke svým datům, možnost sdílení reportů dle pravomocí

---

## 📚 Reference

- [Modul Platby](./platby.md)
- [Modul Služby](./sluzby.md)
- [Modul Vyúčtování](./vyuctovani.md)
- [Modul Jednotka](./jednotka.md)

---

> Modul Finance je klíčový pro strategické plánování, transparentní správu a dlouhodobou rentabilitu tvého portfolia nemovitostí. Nově umožňuje také rozpočtování, plánování investic, automatizaci a správu více vlastníků.
