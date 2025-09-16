# Modul: Služby

> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Přehled služeb | Dlaždice, seznam všech služeb/záloh/kaucí |
|      | ├── 🧾 Zálohy | Evidence a předpis záloh |
|      | ├── 💰 Kauce | Evidence jistin (kauce, vratné depozity) |
|      | ├── 💳 Jiné platby | Pravidelné i jednorázové poplatky |
|      | ├── ⚡ Stavy měřidel | Evidence a historie měřidel (voda, plyn...) |
|      | └── 📊 Vyúčtování služeb | Roční/pololetní vyúčtování a rozúčtování |
| ✅   | 🟦 Import/Export | Import/export předpisů, vyúčtování, odečtů |
| ✅   | 🟦 Auditní log / historie změn | Historie změn v předpisech, měřidlech, vyúčtování |
| ✅   | 🟦 Statistiky | Statistiky využití, saldo záloh, stavy měřidel |
| ✅   | 🟦 Nastavení modulu | Pravidla, šablony, workflow |
| ✅   | 🟦 Notifikace a upozornění | Přehled a správa notifikací |
| ✅   | 🟦 Průvodce zadáním služby | Průvodce pro zadání nové služby/zálohy/kauce |
| ⏳   | 🟦 Vazby na další entity | Přehled vazeb na jednotky, nájemníky, platby |

---

## 🏠 Krátký úvod – Co je modul Služby a kdy ho použít

Modul **Služby** slouží k evidenci, nastavení a správě všech pravidelných i jednorázových služeb, záloh, kaucí, energií a dalších plateb spojených s užíváním jednotky/nemovitosti.  
Zajišťuje přehledné vedení záloh, kaucí, individuálních poplatků, stavů měřidel a umožňuje generovat vyúčtování i předpisy plateb.

### Kdy modul použít?

- K evidenci záloh na energie, služby (voda, teplo, úklid, odpad atd.), kaucí a jiných poplatků.
- Pro správu předpisů záloh, jejich splatnosti a výše.
- K evidenci a správě stavů měřidel.
- Pro generování vyúčtování podle reálných stavů/spotřeby.
- Pro napojení na modul Platby (automatické generování požadavků na platbu, kontrolu úhrad, výpočet penále a upomínek).

---

## 🏗️ Základní struktura modulu

- **Dlaždice / sekce:**
  1. 🧾 **Zálohy** – evidence a předpis záloh (měsíční, kvartální atd.)
  2. 💰 **Kauce** – evidence jistin (kauce, vratné depozity)
  3. 💳 **Jiné platby** – pravidelné i jednorázové poplatky (např. parkování, internet, domovní poplatky)
  4. ⚡ **Stavy měřidel** – evidence a historie stavů (voda, elektřina, plyn atd.)
  5. 📊 **Vyúčtování služeb** – roční/pololetní vyúčtování a rozúčtování nákladů

- **Vazby na další moduly:**
  - **Jednotka/Nemovitost** – služby jsou přiřazeny ke konkrétní jednotce nebo domu
  - **Nájemník** – uživatel služby
  - **Smlouva** – podle smlouvy je stanoven předpis záloh a služeb
  - **Platby** – předpisy generují požadavky na platbu, kontrola úhrad
  - **Dokumenty** – přílohy (např. vyúčtování, odečty)
  - **Notifikace** – upomínky, potvrzení, penalizace

---

## 🗃️ Datové modely (JSON ukázky)

### 1. Záloha na službu
```json
{
  "id": "zl1001",
  "jednotka_id": "101",
  "najemnik_id": "6",
  "sluzba": "teplo",
  "castka": 1200,
  "frekvence": "mesicni",
  "splatnost_den": 15,
  "datum_zacatku": "2025-09-01",
  "datum_konce": null,
  "stav": "aktivni",
  "smlouva_id": "501",
  "created_at": "2025-09-09T12:00:00Z"
}
```

### 2. Kauce
```json
{
  "id": "kc201",
  "jednotka_id": "101",
  "najemnik_id": "6",
  "castka": 24000,
  "datum_slozeni": "2025-09-01",
  "stav": "ulozena",
  "vraceno": false,
  "smlouva_id": "501",
  "created_at": "2025-09-09T12:05:00Z"
}
```

### 3. Jiné platby
```json
{
  "id": "jp301",
  "jednotka_id": "101",
  "najemnik_id": "6",
  "typ": "internet",
  "castka": 400,
  "frekvence": "mesicni",
  "splatnost_den": 15,
  "smlouva_id": "501",
  "stav": "aktivni",
  "created_at": "2025-09-09T12:07:00Z"
}
```

### 4. Stavy měřidel
```json
{
  "id": "sm401",
  "jednotka_id": "101",
  "typ_meric": "voda_tepla",
  "stav": 1200,
  "datum_odecet": "2025-09-01",
  "smlouva_id": "501",
  "priloha": null
}
```

### 5. Vyúčtování služeb
```json
{
  "id": "vu501",
  "jednotka_id": "101",
  "najemnik_id": "6",
  "obdobi_od": "2025-01-01",
  "obdobi_do": "2025-12-31",
  "sluzby": [
    { "typ": "teplo", "zaloha": 12000, "spotreba": 13000, "doplatek": 1000 },
    { "typ": "voda", "zaloha": 3000, "spotreba": 2500, "preplatek": 500 }
  ],
  "celkem_doplatek": 500,
  "vytvoreno": "2026-01-15",
  "priloha": "vyuctovani_101_2025.pdf"
}
```

---

## 📋 Funkce v přehledu

- Přehled všech záloh/kaucí/jiných plateb podle jednotky, nájemníka, stavu
- Hromadné zadání předpisů záloh pro více jednotek
- Nastavení a úprava splatnosti, výše, periody
- Evidence a historie kaucí (vložení, vrácení, zápočet)
- Evidence a úprava stavů měřidel, historie odečtů
- Generování a export vyúčtování (PDF, XLSX)
- Hromadné generování předpisů plateb (napojení na modul Platby)
- Notifikace splatnosti, potvrzení o platbě, upomínky, penalizace za zpoždění
- Auditní log / historie změn

---

## 🔘 Hlavní funkce / tlačítka

- ✅ Přidat/editovat zálohu/kauci/jinou platbu
- ✏️ Upravit zálohu/kauci/jinou platbu
- 📈 Zadat nebo importovat stav měřidla
- 📊 Vytvořit/zobrazit vyúčtování
- 📥 Import/hromadné zadání předpisů
- 📤 Export předpisů/vyúčtování (PDF/XLSX)
- 🗄️ Archivovat/smazat předpis nebo vyúčtování
- 🔔 Odeslat potvrzení nebo upomínku
- 👁️ Zobrazit detailní historii
- ⚙️ Nastavení pravidel a šablon

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Administrátor | Správce nemovitostí | Účetní      | Pouze čtení |
|------------------------------|:-------------:|:-------------------:|:-----------:|:-----------:|
| Přehled záloh/kaucí/služeb   |      ✅       |         ✅          |     ✅      |     ✅      |
| Přidat/změnit předpis        |      ✅       |         ✅          |     ✅      |     ❌      |
| Zadat/změnit stav měřidla    |      ✅       |         ✅          |     ✅      |     ❌      |
| Generovat vyúčtování         |      ✅       |         ✅          |     ✅      |     ❌      |
| Exportovat data              |      ✅       |         ✅          |     ✅      |     ❌      |
| Import/hromadné zadání       |      ✅       |         ✅          |     ✅      |     ❌      |
| Odeslat upomínku/potvrzení   |      ✅       |         ✅          |     ✅      |     ❌      |
| Archivace/smazání            |      ✅       |         ✅          |     ✅      |     ❌      |

---

## 🟢 Stavy a workflow předpisů/vyúčtování

| Stav               | Popis                                   | Kdo může změnit  | Kdy/proč změnit                     |
|--------------------|-----------------------------------------|------------------|--------------------------------------|
| **Aktivní**        | Předpis je platný a účinný              | Správce/Admin    | Při vzniku nebo po editaci           |
| **Neaktivní**      | Neúčinný, ale evidován                  | Správce/Admin    | Po změně, např. ukončení nájmu       |
| **Splaceno**       | Plně uhrazeno                           | Automaticky      | Po spárování s platbou               |
| **Po splatnosti**  | Neuhrazeno po splatnosti                | Automaticky      | Po datu splatnosti bez úhrady        |
| **Archivováno**    | Historie, pouze ke čtení                | Správce/Admin    | Po vyúčtování, ukončení vztahu       |

---

## 🕓 Historie a auditní log změn

- Každá změna předpisu zálohy/kauce/jiné platby je auditována
- Historie stavů měřidel a odečtů
- Historie vyúčtování a rozúčtování

---

## 🔔 Notifikace a upozornění

| Událost / spouštěč              | Komu přijde notifikace   | Forma        | Poznámka                         |
|----------------------------------|--------------------------|--------------|----------------------------------|
| Nový předpis záloh/plateb        | Nájemník, správce        | E-mail, sys. | Po vygenerování                  |
| Blížící se splatnost             | Nájemník, správce        | E-mail, sys. | X dní před splatností            |
| Nezaplacená záloha/platba        | Nájemník, správce        | E-mail, sys. | Upomínka, možnost penalizace     |
| Zadaný nový stav měřidla         | Správce, účetní          | Systém       | Potvrzení o zadání               |
| Vytvoření vyúčtování             | Nájemník, správce        | E-mail, sys. | Po vygenerování vyúčtování       |
| Potvrzení o platbě               | Nájemník                 | E-mail, sys. | Po spárování platby              |

---

## 📦 Hromadné operace

- Hromadné zadání/úprava předpisů záloh/služeb/kaucí
- Hromadné importy stavů měřidel (například z CSV)
- Hromadné generování vyúčtování (pro celý dům/jednotky)
- Hromadné exporty potvrzení, přehledů a upomínek

---

## ⚠️ Typické chybové stavy a výjimky

| Chyba / výjimka                        | Doporučené řešení / reakce systému     | Uživatelská hláška                         | Logování |
|----------------------------------------|----------------------------------------|--------------------------------------------|----------|
| Duplicita předpisu pro jednotku/období | Zamezit uložení, zvýraznit pole        | „Předpis pro toto období již existuje.“    | Povinné  |
| Chybějící stav měřidla                 | Upozornit, zamezit vyúčtování          | „Není zadán aktuální stav měřidla.“        | Povinné  |
| Neplatný formát platby                 | Zvýraznit pole, zamezit uložení        | „Zadaná částka/splatnost není platná.“     | Povinné  |
| Neuhrazená záloha/platba po splatnosti | Automaticky označit, upozornit správce | „Platba je po splatnosti, kontaktujte správce.“ | Povinné  |
| Pokus o smazání předpisu s platbou     | Zamezit smazání                        | „Nelze smazat – existuje navázaná platba.“ | Povinné  |

---

## 📚 Reference na další dokumentaci

- [Modul Platby](./platby.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Nájemník](./najemnik.md)
- [Modul Smlouva](./smlouva.md)
- [Modul Dokumenty](./dokumenty.md)

---

## 🐛 Známé problémy / TODO

- [ ] Rozšířit typy služeb (individuální, společné, rozúčtování)
- [ ] Automatizace generování vyúčtování podle spotřeby a měřidel
- [ ] Notifikace a penalizace za opožděné platby
- [ ] Hromadné importy stavů měřidel a předpisů
- [ ] Propojení s modulem Platby (automatické párování, potvrzení)
- [ ] Vylepšit uživatelské rozhraní pro hromadné zadání/editaci předpisů
- [ ] Testování workflow a typických chybových stavů

---

> Modul Služby je klíčový pro správnou a transparentní evidenci všech poplatků, záloh, služeb a energií v rámci nemovitosti. Je těsně propojen s moduly Platby a Vyúčtování. Pokud potřebuješ rozpracovat detailní workflow, datový model nebo šablonu notifikace, napiš konkrétní požadavek.
