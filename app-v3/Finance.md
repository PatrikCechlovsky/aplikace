> ℹ️ **PRAVIDLA:** [pravidla-rychly-prehled.md](./pravidla-rychly-prehled.md) | [pravidla.md](./pravidla.md) | [návod pro Copilot](./pravidla-pro-copilot.md)

# Modul: Finance

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Přehled financí (dashboard) | Grafické ukazatele, výběr úrovně, cashflow |
| ✅   | 🟦 Příjmy | Příjmy z nájmů, služeb, ostatní, historie, predikce |
| ✅   | 🟦 Náklady a výdaje | Náklady na energie, údržbu, daně, investice |
| ✅   | 🟦 Daně a poplatky | Přehled, upozornění, export               |
| ✅   | 🟦 Porovnání období a analytika | Vývoj rentability, grafy, export          |
| ✅   | 🟦 Přehled za jednotku/nemovitost | Detailní rozpad příjmů, nákladů, zisku   |
| ✅   | 🟦 Statistika a vizualizace | Grafy, tabulky, poměrové grafy           |
| ✅   | 🟦 Plánování (forecasting) | Plánované příjmy/výdaje, cashflow, rozpočet |
| ✅   | 🟦 Investice a mimořádné výdaje | Evidence investic, návratnost, rozpad    |
| ✅   | 🟦 Automatizace a pravidla | Pravidla pro rozpočítání, automatické reporty |
| ✅   | 🟦 Saldo účtů | Evidence účtů, zůstatky, párování pohybů   |
| ✅   | 🟦 Přístupová práva pro více pronajímatelů | Sdílení reportů, granularita přístupu |
| ✅   | 🗒️ Poznámky, nápady a úkoly | Prostor pro další poznámky a TODO         |

---

## 🟦 Přehled financí (dashboard)

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel, uživatelé, pole, workflow, validace, akce, chybové stavy
- ✅ Grafické ukazatele, výběr úrovně, cashflow

---

## 🟦 Příjmy / Náklady a výdaje / Daně a poplatky

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Evidovat příjmy z nájmů, služeb, ostatní; náklady na energie, údržbu, daně; poplatky, daně, upozornění na splatnost

---

## 🟦 Porovnání období a analytika

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Grafy, tabulky, trendové analýzy, porovnání období, export

---

## 🟦 Přehled za jednotku / nemovitost

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Rozpad příjmů, nákladů, zisku, rozpočítání sdílených nákladů

---

## 🟦 Statistika a vizualizace

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Grafy, tabulky, poměrové grafy, export

---

## 🟦 Plánování (forecasting)

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Plánované příjmy/výdaje, cashflow, rozpočet, odchylky, export

---

## 🟦 Investice a mimořádné výdaje

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Evidence investic, plán vs. skutečnost, návratnost, rozpad na období

---

## 🟦 Automatizace a pravidla

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Pravidla pro rozpočítání, automatické reporty, schvalovací workflow

---

## 🟦 Saldo účtů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Evidence bankovních účtů, zůstatky, historie, párování pohybů

---

## 🟦 Přístupová práva pro více pronajímatelů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Sdílení reportů, granularita přístupu, auditní log

---

## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Zde piš vše, co je potřeba doplnit, změnit nebo vyřešit.  
> ⏳ = rozpracováno, přeškrtni hotové.

- ⏳ Automatizace importu dat z banky (API, formátování)
- ⏳ Možnost napojení na účetnictví (export/import)
- ⏳ Upozornění na překročení rozpočtu nebo nízký zůstatek
- ⏳ Podpora více měn
- ⏳ Detailní rozpad sdílených nákladů na jednotky
- ⏳ Možnost přiřadit investici k více nemovitostem najednou
- ⏳ Auditní log změn v rozpočtech a investicích
- ⏳ Hromadné importy plánovaných výdajů/příjmů
- ⏳ Podpora pro „položky na čekání“ (zatím nespárované, nevyúčtované)
- ⏳ Plánované a skutečné cashflow – možnost simulace změn

> Otázky k doplnění:
> - Potřebujeme schvalovací workflow na každou změnu rozpočtu?
> - Má být možné definovat vlastní kategorie příjmů/nákladů?
> - Budeme podporovat DPH a více měn?
> - Chceme možnost anonymizovat data pro sdílené reportingy?
> - Jaká pravidla pro dělení sdílených nákladů (plocha, počet osob, atd.)?

---

## 🗃️ Datové modely (ukázka)

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

1. Plánování příjmů a výdajů → zadání částek do rozpočtu → automatické porovnání skutečnosti vs. plán, zvýraznění odchylek
2. Evidence investic → vložení nové akce (plán, skutečnost, termíny) → vyhodnocení návratnosti
3. Automatizace → pravidla rozpočítání, automatické reporty, workflow schvalování
4. Saldo účtů → evidence zůstatků, párování finančních pohybů, upozornění na nízký/záporný zůstatek
5. Více pronajímatelů → každý má přístup ke svým datům, možnost sdílení reportů

---

## 📚 Reference

- [Modul Platby](./platby.md)
- [Modul Služby](./sluzby.md)
- [Modul Vyúčtování](./vyuctovani.md)
- [Modul Jednotka](./jednotka.md)

---

> Modul Finance je klíčový pro strategické plánování, transparentní správu a dlouhodobou rentabilitu portfolia nemovitostí. Umožňuje rozpočtování, plánování investic, automatizaci i správu více vlastníků.
