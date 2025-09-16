# Modul: Energie

> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

---

## ⚡ Úvod

Modul **Energie** slouží k evidenci, správě a analýze spotřeby energií (elektřina, plyn, teplo, voda, případně další měřená média) v nemovitostech a jednotkách.  
Zajišťuje evidenci a správu měřidel, odečtů, poskytuje grafické a analytické výstupy, detekci anomálií i podklady pro vyúčtování a automatizované propojení s dalšími moduly.

---

## 🌲 Stromová struktura modulu

| Stav | Sekce / dlaždice                | Popis                                                        |
|------|---------------------------------|--------------------------------------------------------------|
| ✅   | 🟦 Přehled energií               | Souhrnné dashboardy a filtrování podle jednotky, období      |
| ✅   | 🟦 Evidence měřidel              | Seznam a správa všech měřidel (typ, jednotka, kalibrace)     |
| ✅   | 🟦 Odečty měřidel                | Zadávání, import, historie, fotodokumentace                  |
| ✅   | 🟦 Grafy a analýzy spotřeby      | Trendy, srovnání jednotek, detekce výkyvů                    |
| ✅   | 🟦 Vývoj cen energií             | Evidence tarifů, historie, grafy vývoje ceny                 |
| ✅   | 🟦 Podklady pro vyúčtování       | Výpočty, export do vyúčtování/služeb                         |
| ✅   | 🟦 Nastavení a archivace         | Správa typů energií, intervalů, archivace měřidel            |
| ✅   | 🟦 Notifikace a upozornění       | Kalibrace, potřeba odečtu, detekce anomálií                  |
| ✅   | 🟦 Statistiky a exporty          | Exporty, přehledy, hromadné operace                          |
| ✅   | 🟦 Auditní log                   | Historie změn, operací, importů                              |

---

## 🗂️ Sekce a jejich obsah

### 1. Přehled energií
- Dashboard se souhrnnými grafy a tabulkami spotřeby a nákladů.
- Filtrování podle nemovitosti, jednotky, období, typu energie, nájemníka.
- Upozornění na anomálie (výrazný nárůst, pokles, podezření na únik).
- Shrnutí přeplatků/nedoplatků po vyúčtování.

### 2. Evidence měřidel
- Přidání, editace, archivace měřidel.
- Pole: typ, jednotka, výrobní/číslo měřidla, umístění, datum instalace, poslední kalibrace/ověření, stav kalibrace, životnost, přílohy (foto, certifikát), poznámka.
- Podpora více měřidel na jednotku, podružná měřidla, sdílená měřidla.
- Upozornění na blížící se konec kalibrace/životnosti.

### 3. Odečty měřidel
- Ruční zadání, import CSV, API.
- Pole: měřidlo, datum odečtu, hodnota, kdo zadal, fotodokumentace, poznámka.
- Historie odečtů, filtrování, schvalování odečtů (např. samoodečet nájemníkem → schválení správcem).
- Validace (přeskočení, neobvyklá hodnota, duplicita).

### 4. Grafy a analýzy spotřeby
- Grafické zobrazení spotřeby v čase (měsíční, roční, meziroční srovnání).
- Porovnání více jednotek/nemovitostí.
- Detekce výkyvů a anomálií.
- Poměr spotřeby na osobu, m², na jednotku.
- Export grafů/tabulek.

### 5. Vývoj cen energií
- Evidence tarifů a změn cen (typ energie, období, cena za jednotku, dodavatel, poznámka, příloha).
- Graf vývoje ceny v čase, historie změn.
- Propojení na automatický výpočet nákladů dle platného tarifu.

### 6. Podklady pro vyúčtování
- Automatická příprava podkladů pro vyúčtování (počáteční/koncový stav, spotřeba, cena, výpočet nákladu).
- Export podkladů do modulu Služby/Vyúčtování.
- Evidence historie vyúčtování energií.
- Přehled přeplatků/nedoplatků a historie reklamací.

### 7. Nastavení a archivace
- Správa typů energií, měrných jednotek, intervalů odečtů.
- Archivace/výměna měřidel, evidence historie.
- Nastavení pravidel upozornění a automatizací.

### 8. Notifikace a upozornění
- Automatické notifikace na potřebu odečtu, blížící se kalibraci, anomální spotřebu.
- Upomínky pro zadání odečtu (nájemník, správce).
- Nastavitelné limity pro detekci výkyvů spotřeby.

### 9. Statistiky a exporty
- Přehledy spotřeby, nákladů, anomálií.
- Hromadné exporty (CSV, XLSX, PDF) pro účetnictví/audit.
- Importy z externích systémů.

### 10. Auditní log
- Evidence všech operací (změny měřidel, odečty, importy, schválení, notifikace).

---

## 🗃️ Datové modely (ukázky)

### 1. Měřidlo

```json
{
  "id": "elektro_101",
  "typ": "elektřina",
  "umisteni": "Jednotka 101",
  "vyrobni_cislo": "E123456789",
  "jednotka": "kWh",
  "datum_instalace": "2022-02-01",
  "datum_posledni_kalibrace": "2024-05-01",
  "platnost_kalibrace_do": "2028-05-01",
  "stav_kalibrace": "platná",
  "zivotnost_do": "2032-02-01",
  "sdilene": false,
  "archivovano": false,
  "prilohy": ["foto_meridla.jpg", "certifikat_2024.pdf"],
  "poznamka": "hlavní měřidlo"
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
  "zpusob": "ručně",
  "fotodokumentace": "foto_odectu_2025-09-01.jpg",
  "schvaleno": true,
  "poznamka": ""
}
```

### 3. Tarif / Cena energie

```json
{
  "id": "tarif_elektro_2025",
  "typ": "elektřina",
  "obdobi_od": "2025-01-01",
  "obdobi_do": "2025-12-31",
  "cena_za_jednotku": 6.2,
  "dodavatel": "PRE",
  "prilohy": ["cenik_2025.pdf"],
  "poznamka": "běžný tarif"
}
```

### 4. Podklad pro vyúčtování

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

## 📝 Checklist – Máš zde vše, co běžně nabízí moderní aplikace?

- [x] Přehled měřidel, možnost archivace/výměny, více měřidel na jednotku.
- [x] Zadávání a import odečtů, fotodokumentace, schvalování odečtu.
- [x] Evidence tarifů, historie cen energií, exporty tarifů.
- [x] Automatické podklady pro vyúčtování, export do modulu Služby/Vyúčtování.
- [x] Grafy spotřeby (časové, meziroční, jednotkové srovnání), exporty grafů/tabulek.
- [x] Detekce anomálií, upozornění na výkyvy, podezření na únik, překročení limitu.
- [x] Automatické notifikace (odečet, kalibrace, anomálie, blížící se platnost).
- [x] Statistiky a reporting (export CSV/XLSX/PDF, přehledy pro audit/účetnictví).
- [x] Auditní log všech změn a operací.
- [x] Role/práva: správce, účetní, nájemník (samoodečet s nutností schválení).
- [x] Hromadné operace (importy, exporty, generování podkladů).
- [x] Propojení na další moduly (Služby, Vyúčtování, Platby, Jednotka, Notifikace).
- [x] Přílohy (foto, certifikát, ceník, reklamace).
- [x] Možnost reklamace/poznámky k odečtu/vyúčtování.
- [x] Sledování životnosti/kontroly měřidel.
- [x] Podpora sdílených/podružných měřidel.

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                      | Řešení systému / reakce      | Uživatelská hláška                                   |
|---------------------------------------|------------------------------|------------------------------------------------------|
| Chybějící odečet                      | Upozornit, zvýraznit         | „Chybí odečet měřidla pro období XY.“                |
| Duplicita odečtu                      | Upozornit, zamezit zadání    | „Odečet pro toto období již existuje.“               |
| Neplatná kalibrace měřidla            | Zamezit zadání odečtu        | „Měřidlo má neplatnou kalibraci, kontaktujte správce.“|
| Neobvyklá spotřeba                    | Upozornit, možnost komentáře | „Spotřeba je výrazně vyšší/nižší než obvykle.“       |
| Pokus o smazání měřidla s historií    | Upozornit, nabídnout archivaci| „Nelze smazat měřidlo s historií, nabídnuta archivace.“|
| Import s chybou ve formátu            | Upozornit, logovat           | „Chybný formát dat při importu, opravte vstup.“      |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Správce | Účetní | Nájemník | Pouze čtení |
|------------------------------|:-------:|:------:|:--------:|:-----------:|
| Přehled spotřeby             |   ✅    |   ✅   |    ✅    |     ✅      |
| Zadání/editace odečtu        |   ✅    |   ✅   |   ✅*    |     ❌      |
| Přidání/editace měřidla      |   ✅    |   ✅   |    ❌    |     ❌      |
| Export grafů/podkladů        |   ✅    |   ✅   |    ✅    |     ❌      |
| Import/hromadné operace      |   ✅    |   ✅   |    ❌    |     ❌      |
| Nastavení tarifů             |   ✅    |   ✅   |    ❌    |     ❌      |

* Nájemník může zadat samoodečet, který podléhá schválení správcem.

---

## 📑 Doporučené workflow

1. **Zadání nového odečtu:**  
   - Ručně, importem, nebo přes API.
   - Možnost přiložit fotodokumentaci.
   - Schvalovací workflow pro samoodečet (nájemník → schválení správce).
   - Automatické propojení s obdobím pro vyúčtování.
   - Upozornění na nutnost odečtu před vyúčtováním.

2. **Analýza spotřeby:**  
   - Grafy a tabulky zobrazují spotřebu za období, porovnání s minulostí, detekce odchylek.
   - Sumarizace na osobu, jednotku, m².

3. **Podklady pro vyúčtování:**  
   - Generování tabulky spotřeb jednotek/nemovitostí, export do modulu Služby/Vyúčtování.
   - Propojení na aktuální tarif/cenu energie.

4. **Správa měřidel:**  
   - Pravidelná kontrola a aktualizace kalibrace, archivace/výměna měřidel.
   - Upozornění na blížící se konec kalibrace/životnosti.

5. **Notifikace a anomálie:**  
   - Automatické upomínky na zadání odečtu, upozornění na anomálii, potřebu revize.

---

## 🔗 Propojení s ostatními moduly

- **Služby/Vyúčtování:** Spotřeba z modulu Energie tvoří podklad pro vyúčtování služeb.
- **Platby:** Vyúčtování generuje předpis plateb za energie.
- **Jednotka/Nemovitost:** Každé měřidlo a odečet je vázán na konkrétní jednotku.
- **Dokumenty:** Přílohy (faktury, fotografie, certifikáty) k měřidlům a odečtům.
- **Notifikace:** Automatická upozornění dle pravidel nastavení.
- **Údržba:** Upozornění na potřebu servisu/výměny měřidla.

---

## 🐛 Známé problémy / TODO

- [ ] Automatizace importu odečtů z externích systémů.
- [ ] Rozšíření podpory pro sdílená a podružná měřidla.
- [ ] Přidat možnost reklamace/poznámky k odečtu nebo vyúčtování.
- [ ] Vylepšit detekci a upozornění na anomální spotřebu.
- [ ] Automatizace exportů do účetnictví.
- [ ] Propojení s modulem Údržba pro plánování výměn/servisů měřidel.
- [ ] Hromadný import/export měřidel a tarifů.
- [ ] Přehled a historie změn tarifů s automatickým přepočtem nákladů.
- [ ] Vylepšit grafické výstupy pro audit a reporting.

---

## 📚 Reference

- [Modul Služby](./sluzby.md)
- [Modul Vyúčtování](./vyuctovani.md)
- [Modul Platby](./platby.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Údržba](./udrzba.md)
- [Modul Dokumenty](./dokumenty.md)

---

> **Modul Energie odpovídá moderním standardům správy nemovitostí – nabízí vše, co běžně najdeš v kvalitních realitních či facility aplikacích (evidence měřidel, odečtů, tarifů, grafické výstupy, automatizace, napojení na další moduly, exporty a audit). Pokud budeš chtít konkrétní ukázky obrazovek, workflow nebo detailnější datový model, napiš!**
