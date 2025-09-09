# Modul: Údržba

---

## 🛠️ Úvod

Modul **Údržba** slouží k evidenci, plánování a správě všech servisních, opravárenských, revizních a údržbových činností spojených s nemovitostí, jednotkami a společnými prostorami.  
Umožňuje evidovat požadavky nájemníků, hlášení závad, plánované i provedené servisy, výměny zařízení a povinné revize.  
Podporuje workflow od zadání požadavku, přes realizaci až po archivaci a reporting.

---

## 🟦 Hlavní sekce / dlaždice

### 1. Hlášení závad a požadavků

- Evidence nových požadavků (od nájemníka, správce, vlastníka)
- Druh požadavku: oprava, úklid, instalace, jiná služba
- Možnost přiložit popis, foto, termín, prioritu, kontaktní osobu
- Stav požadavku: nové, řeší se, vyřešeno, zamítnuto
- Přehled otevřených požadavků podle závažnosti, stáří, jednotky, zařízení

---

### 2. Plánované údržby, servisy a revize

- Plánování pravidelných činností (revize kotlů, komínů, výtahů, elektro, hasicích přístrojů aj.)
- Evidence termínu, rozsahu, odpovědné osoby/firmy, ceny
- Upozornění na blížící se termín (notifikace)
- Historie provedených/plánovaných servisů a revizí
- Možnost přiložit protokol, certifikát, fakturu

---

### 3. Provedené opravy a zásahy

- Evidence všech realizovaných zásahů (opravy, servisní výjezdy, výměny zařízení)
- Datum, popis, náklady, kdo provedl, přiložené dokumenty (faktury, fotky)
- Napojení na konkrétní požadavek nebo plánovanou údržbu
- Hodnocení spokojenosti nájemníka (volitelné)

---

### 4. Přehled zařízení a servisní historie

- Katalog zařízení v nemovitosti/jednotce (kotle, výtahy, okna, elektroměry…)
- Historie oprav, výměn, revizí pro každé zařízení
- Upozornění na potřebu výměny, konec životnosti, povinnou revizi
- Možnost archivace vyřazených zařízení

---

### 5. Statistiky a reporting

- Přehled počtu a typů požadavků za období
- Náklady na údržbu podle nemovitosti, jednotky, zařízení, typu zásahu
- Grafy (např. průměrná doba vyřízení, počet oprav podle typu, rozložení nákladů)
- Export přehledů a statistik

---

## 🗃️ Datové modely (ukázka)

### 1. Požadavek na opravu

```json
{
  "id": "pozadavek_2025_101_01",
  "typ": "oprava",
  "stav": "nove",
  "popis": "Netěsnící kohoutek v kuchyni",
  "datum_zadani": "2025-09-09",
  "zadavatel": "najemnik_101",
  "priorita": "stredni",
  "jednotka_id": "101",
  "prilohy": ["foto_kohoutek.jpg"]
}
```

### 2. Plánovaná revize

```json
{
  "id": "revize_kotel_2025",
  "typ": "revize",
  "zarizeni_id": "kotel_101",
  "termin": "2025-11-15",
  "firma": "ServisKotle.cz",
  "stav": "naplanovano",
  "cena_predpoklad": 2000,
  "prilohy": []
}
```

### 3. Provedený servisní zásah

```json
{
  "id": "zasah_2025_09_101",
  "typ": "oprava",
  "zarizeni_id": "kotel_101",
  "datum": "2025-09-09",
  "provedl": "ServisKotle.cz",
  "popis": "Výměna pojistného ventilu",
  "cena": 1800,
  "navazano_na": "pozadavek_2025_101_01",
  "prilohy": ["faktura_ventil.pdf", "foto_pred.jpg", "foto_po.jpg"]
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                | Řešení systému / reakce      | Uživatelská hláška                              |
|---------------------------------|------------------------------|-------------------------------------------------|
| Nevyřešený požadavek po termínu | Upozornit, zvýraznit         | „Požadavek je nevyřešený déle než X dní.“       |
| Blížící se revize               | Notifikace, zvýraznění       | „Blíží se povinná revize zařízení XY.“          |
| Duplicita požadavku             | Upozornit, sloučit           | „Podobný požadavek již existuje.“               |
| Nevyplněné povinné pole         | Zabránit uložení             | „Musíte vyplnit všechny povinné údaje.“         |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Pronajímatel | Správce | Nájemník | Účetní | Pouze čtení |
|------------------------------|:------------:|:-------:|:--------:|:------:|:-----------:|
| Zadání požadavku             |      ✅      |   ✅    |   ✅     |   ❌   |     ❌      |
| Editace/uzavření požadavku   |      ✅      |   ✅    |   ❌     |   ❌   |     ❌      |
| Zadání plánované údržby      |      ✅      |   ✅    |   ❌     |   ❌   |     ❌      |
| Evidence zásahu/servisu      |      ✅      |   ✅    |   ❌     |   ❌   |     ❌      |
| Přehled zařízení             |      ✅      |   ✅    |   ❌     |   ❌   |     ✅      |
| Statistiky/reporting         |      ✅      |   ✅    |   ❌     |   ✅   |     ✅      |

---

## 📑 Doporučené workflow

1. **Zadání požadavku:**
   - Nájemník/správce/pronajímatel zadá nový požadavek, popíše problém, případně přiloží foto.
   - Systém zařadí požadavek do fronty a přiřadí prioritu.

2. **Řešení požadavku:**
   - Správce/pronajímatel přiřadí realizátora (servis, firma), doplní termín, upraví stav.
   - Po vyřízení označí požadavek jako vyřešený, případně nahraje doklad/fotky.

3. **Plánování údržby a revizí:**
   - Správce/pronajímatel zadá plánované úkony (revize, pravidelný servis).
   - Systém upozorňuje na blížící se termín.

4. **Evidence zásahu:**
   - Po provedení servisního zásahu zadá správce detailní zápis, cenu, přílohy, spojí s požadavkem/zařízením.

5. **Statistiky:**
   - Pravidelný přehled počtu požadavků, zásahů, nákladů; export pro další zpracování.

---

## 📚 Reference

- [Modul Jednotka](./jednotka.md)
- [Modul Energie](./energie.md)
- [Modul Finance](./finance.md)
- [Modul Služby](./sluzby.md)

---

> Modul Údržba zajišťuje pořádek v evidenci požadavků nájemníků, revizí, oprav a minimalizuje riziko opomenutí povinných servisních zásahů.
