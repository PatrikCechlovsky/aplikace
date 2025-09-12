> ℹ️ **PRAVIDLA:** [pravidla-rychly-prehled.md](./pravidla-rychly-prehled.md) | [pravidla.md](./pravidla.md) | [návod pro Copilot](./pravidla-pro-copilot.md)

# Modul: Energie

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Přehled energií | Souhrnný pohled na všechny typy energií |
| ✅   | 🟦 Odečty měřidel | Evidence měřidel a historie odečtů      |
| ✅   | 🟦 Grafy a analýzy spotřeby | Grafy, analýzy, detekce anomálií        |
| ✅   | 🟦 Podklady pro vyúčtování | Výpočet spotřeb, export podkladů        |
| ✅   | 🟦 Nastavení a správa měřidel | Správa, archivace, kalibrace měřidel    |
| ✅   | 🗒️ Poznámky, nápady a úkoly | Prostor pro další poznámky a TODO        |

---

## 🟦 Přehled energií

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Filtrování, řazení, akce v řádku
- ✅ Hromadné akce
- ✅ Ukázka tabulky/přehledu
- ✅ Validace, tlačítka, workflow
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

#### 1️⃣ Popis a účel  
Souhrnný pohled na všechny typy energií: elektřina, plyn, teplo, voda, jiné média.

#### 2️⃣ Přístup/viditelnost  
Pronajímatel, správce, účetní – filtrace podle oprávnění (svoje, vše, konkrétní jednotka/nemovitost).

#### 3️⃣ Pole a validace  
| Pole        | Povinné | Typ       | Poznámka         |
|-------------|:-------:|-----------|------------------|
| Typ energie |   Ano   | výběr     | elektřina, plyn… |
| Období      |   Ano   | datum     |                  |
| Spotřeba    |   Ano   | číslo     | součet z odečtů  |
| Náklady     |   Ano   | číslo     |                  |
| Jednotka    |   Ano   | výběr     |                  |
| Anomálie    |   Ne    | systém    | zvýraznění       |

Filtrování: období, typ energie, jednotka, nemovitost, stav.

#### 4️⃣ Akce  
- Export, filtrování, graf spotřeby, detail jednotky/energie

---

## 🟦 Odečty měřidel

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Evidence všech měřidel, historie odečtů
- ✅ Zadání nového odečtu (ručně, import, API)
- ✅ Filtrování podle typu, jednotky, období
- ✅ Automatické propojení s vyúčtováním
- ✅ Validace, chybové stavy

---

## 🟦 Grafy a analýzy spotřeby

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Grafické zobrazení spotřeby v čase, srovnání období
- ✅ Export grafu/tabulky
- ✅ Upozornění na anomálie a výkyvy

---

## 🟦 Podklady pro vyúčtování

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Výpočet spotřeb, nákladů, jednotkové ceny
- ✅ Generování podkladů pro vyúčtování služeb
- ✅ Export, historie vyúčtování, přeplatky/nedoplatky

---

## 🟦 Nastavení a správa měřidel

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Přidání, editace, archivace měřidel
- ✅ Nastavení intervalů odečtů
- ✅ Upozornění na kalibraci/životnost

---

## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Zde piš vše, co je potřeba doplnit, změnit nebo vyřešit.  
> ⏳ = rozpracováno, přeškrtni hotové.

- ⏳ Automatický import odečtů z API dodavatele
- ⏳ Notifikace na blížící se kalibraci/expiraci měřidla
- ⏳ Export souhrnné zprávy o spotřebě všem nájemníkům
- ⏳ Možnost importu dat z chytrých měřidel (IoT)
- ⏳ Sledování spotřeby na osobu/M2
- ⏳ Umožnit zpětné zadání odečtu s auditní stopou
- ⏳ Zobrazit grafy i pro porovnání více jednotek
- ⏳ Upozornění na neobvyklou spotřebu s doporučením řešení

> Otázky k doplnění:
> - Chceme podporovat pravidelný automatický import z externího systému?
> - Má být možné nastavit různé intervaly odečtů pro různé typy energií?
> - Potřebujeme detailní historii změn u každého měřidla?
> - Budeme rozlišovat více typů měřidel na jednu jednotku (podružná, hlavní)?
> - Chceme podporovat anonymizovaná data pro porovnání s průměrem v domě?

---

## 🗃️ Datové modely (ukázka)

```json
{
  "id": "elektro_101",
  "typ": "elektřina",
  "umisteni": "Jednotka 101",
  "vyrobni_cislo": "E123456789",
  "jednotka": "kWh",
  "datum_posledni_kalibrace": "2024-05-01",
  "stav_kalibrace": "platná"
}
```
```json
{
  "id": "odect_2025_09_101",
  "meridlo_id": "elektro_101",
  "datum": "2025-09-01",
  "stav": 17235,
  "provedl": "PatrikCechlovsky",
  "fotodokumentace": "foto_odectu_2025-09-01.jpg"
}
```
```json
{
  "id": "vyuctovani_energie_101_2025_09",
  "meridlo_id": "elektro_101",
  "jednotka_id": "101",
  "obdobi_od": "2025-08-01",
  "obdobi_do": "2025-09-01",
  "stav_pocatek": 16945,
  "stav_konec": 17235,
  "spotreba": 290,
  "cena_za_jednotku": 6.2,
  "naklad_celkem": 1798,
  "vyuctovani_id": "vyuctovani_101_2025"
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                | Řešení systému / reakce      | Uživatelská hláška                              |
|---------------------------------|------------------------------|-------------------------------------------------|
| Chybějící odečet                | Upozornit, zvýraznit v přehledu | „Chybí odečet měřidla pro období XY.“         |
| Neobvyklá spotřeba              | Upozornit, možnost komentáře | „Spotřeba je výrazně vyšší/nižší než obvykle.“ |
| Neplatná kalibrace měřidla      | Upozornit, blokovat zadání odečtu | „Měřidlo má neplatnou kalibraci, kontaktujte správce.“ |
| Duplicita odečtu                | Upozornit, zamezit zadání    | „Odečet pro toto období již existuje.“          |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Pronajímatel | Správce | Účetní | Pouze čtení |
|------------------------------|:------------:|:-------:|:------:|:-----------:|
| Přehled spotřeby             |      ✅      |   ✅    |   ✅   |     ✅      |
| Zadání/editace odečtu        |      ✅      |   ✅    |   ✅   |     ❌      |
| Přidání měřidla              |      ✅      |   ✅    |   ✅   |     ❌      |
| Export grafu/podkladu        |      ✅      |   ✅    |   ✅   |     ❌      |

---

## 📑 Doporučené workflow

1. Zadání nového odečtu (ručně/import) → propojení s obdobím → upozornění na nutnost odečtu
2. Analýza spotřeby → grafy, tabulky, detekce odchylek
3. Generování podkladů pro vyúčtování → export do modulu Služby/Vyúčtování
4. Správa měřidel → kontrola kalibrace, archivace

---

## 📚 Reference

- [Modul Služby](./sluzby.md)
- [Modul Vyúčtování](./vyuctovani.md)
- [Modul Finance](./finance.md)
- [Modul Jednotka](./jednotka.md)

---

> Modul Energie zajišťuje přesnou evidenci spotřeby, správné rozúčtování nákladů a podporuje úsporné chování díky analýze a včasné detekci anomálií.
