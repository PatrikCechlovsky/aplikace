# Modul: Energie

---

## ⚡ Úvod

Modul **Energie** slouží k evidenci, správě a analýze spotřeby energií (elektřina, plyn, teplo, voda, případně další měřené média) v nemovitostech a jednotkách.  
Zajišťuje propojení s odečty měřidel, umožňuje sledovat trendy, připravovat podklady pro vyúčtování a nabízí přehledné grafické výstupy.

---

## 🟦 Hlavní sekce / dlaždice

### 1. Přehled energií

- Souhrnný pohled na všechny typy energií (elektřina, plyn, teplo, voda, jiné)
- Možnost filtrování podle nemovitosti, jednotky, období, druhu energie
- Rychlý přehled celkové spotřeby a nákladů za období
- Upozornění na anomálie (výrazná změna spotřeby, podezření na únik)

---

### 2. Odečty měřidel

- Evidence všech měřidel (typ, umístění, výrobní číslo, jednotka, stav kalibrace)
- Historie odečtů (datum, stav, kdo provedl, možnost nahrát fotodokumentaci)
- Možnost zadání nového odečtu (ručně, import, API)
- Automatické propojení odečtů s obdobím pro vyúčtování služeb
- Upozornění na nutnost odečtu (periodická výzva, připomínka před vyúčtováním)
- Podpora více měřidel na jednotku (např. voda studená/teplá, podružná měřidla)

---

### 3. Grafy a analýzy spotřeby

- Grafické zobrazení spotřeby v čase (měsíční, roční, meziroční srovnání)
- Porovnání spotřeby více jednotek nebo nemovitostí
- Detekce výkyvů, trendů a neobvyklých hodnot
- Možnost exportu grafu/tabulky pro vyúčtování či reporting
- Poměr spotřeby na osobu, m², na jednotku

---

### 4. Podklady pro vyúčtování

- Výčet spotřeb pro zvolené období a jednotku/nemovitost (počáteční/koncový stav, spotřeba, jednotková cena, výpočet nákladu)
- Možnost generovat podklad pro vyúčtování služeb (export do modulu Služby/Vyúčtování)
- Evidence a historie vyúčtování energií
- Přehled přeplatků/nedoplatků po vyúčtování

---

### 5. Nastavení a správa měřidel

- Přidávání, editace a archivace měřidel (výměny, zánik, kalibrace)
- Správa standardních intervalů odečtů pro jednotlivé typy energií
- Upozornění na blížící se konec kalibrace/životnosti měřidla

---

## 🗃️ Datové modely (ukázka)

### 1. Měřidlo

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

### 2. Odečet

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

### 3. Podklad pro vyúčtování

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

1. **Zadání nového odečtu:**  
   - Ručně nebo importem, možnost přiložit fotodokumentaci.
   - Automatické propojení s obdobím pro vyúčtování.
   - Systém upozorní na nutnost odečtu před vyúčtováním.

2. **Analýza spotřeby:**  
   - Grafy a tabulky zobrazují spotřebu za období, porovnání s minulostí, detekce odchylek.

3. **Podklady pro vyúčtování:**  
   - Vygenerování tabulky spotřeb jednotek/nemovitostí, export do modulu Služby/Vyúčtování.

4. **Správa měřidel:**  
   - Pravidelná kontrola a aktualizace kalibrace, archivace starých měřidel.

---

## 📚 Reference

- [Modul Služby](./sluzby.md)
- [Modul Vyúčtování](./vyuctovani.md)
- [Modul Finance](./finance.md)
- [Modul Jednotka](./jednotka.md)

---

> Modul Energie zajišťuje přesnou evidenci spotřeby, správné rozúčtování nákladů a podporuje úsporné chování díky analýze a včasné detekci anomálií.
