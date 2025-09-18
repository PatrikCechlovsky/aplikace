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
- Pro správce i nájemníka – kompletní přehled o předpisech, platbách, přeplatcích i nedoplatcích.

---

## 🏗️ Základní struktura modulu

- **Dlaždice / sekce:**
  1. 🧾 **Zálohy** – evidence a předpis záloh (měsíční, kvartální atd.)
  2. 💰 **Kauce** – evidence jistin (kauce, vratné depozity)
  3. 💳 **Jiné platby** – pravidelné i jednorázové poplatky (např. parkování, internet, domovní poplatky, mimořádné platby)
  4. ⚡ **Stavy měřidel** – evidence a historie stavů (voda, elektřina, plyn atd.)
  5. 📊 **Vyúčtování služeb** – roční/pololetní vyúčtování a rozúčtování nákladů

- **Vazby na další moduly:**
  - **Jednotka/Nemovitost** – služby jsou přiřazeny ke konkrétní jednotce nebo domu
  - **Nájemník** – uživatel služby, plátce
  - **Smlouva** – podle smlouvy je stanoven předpis záloh a služeb
  - **Platby** – předpisy generují požadavky na platbu, kontrola úhrad, penalizace, upomínky
  - **Dokumenty** – přílohy (např. vyúčtování, odečty, faktury, fotografie)
  - **Notifikace** – upomínky, potvrzení, penalizace

---

## ✅ Klíčové požadavky a kontroly (Checklist)

- [x] U každé jednotky je možné evidovat více služeb (voda, teplo, odpad, služby domu, elektřina, parkování apod.)
- [x] Každý předpis je navázán na: jednotku, nájemníka, typ služby, období, smlouvu
- [x] Každá změna výše záloh a předpisů je auditována (kdo, kdy, důvod, historie)
- [x] U každé platby/předpisu lze evidovat stav úhrady (neuhrazeno/splaceno/po splatnosti/penalizace)
- [x] Evidence mimořádných a jednorázových poplatků (např. pokuta, revize, ad-hoc práce)
- [x] Propojení na platby a možnost dohledat historii úhrad, penalizace a upomínek
- [x] Každý nájemník má přehled všech svých předpisů, záloh, plateb, nedoplatků, přeplatků
- [x] Možnost sumarizovat a filtrovat přehledy dle nájemníka, služby, období, stavu
- [x] Možnost exportu/importu dat pro účetnictví/audit
- [x] Možnost přidat poznámku a přílohy ke každé položce (např. smlouva, faktura, foto)
- [x] Možnost evidence a schválení odečtu měřidla (uživatel/správce)
- [x] Automatizované workflow upomínek a penalizací
- [x] Hromadné operace (zadání záloh, odečtů, vyúčtování, upomínek)
- [x] Všechny změny a akce jsou auditovány

---

## 🗃️ Datové modely (JSON ukázky)

### 1. Záloha na službu
```json
{
  "id": "zl1001",
  "jednotka_id": "101",
  "najemnik_id": "6",
  "sluzba": "teplo",
  "kategorie": "energie",
  "castka": 1200,
  "frekvence": "mesicni",
  "splatnost_den": 15,
  "datum_zacatku": "2025-09-01",
  "datum_konce": null,
  "stav": "aktivni",
  "smlouva_id": "501",
  "poznámka": "Zvýšení zálohy po vyúčtování",
  "prilohy": ["zaloha_potvrzeni.pdf"],
  "historie": [
    {
      "castka": 1000,
      "frekvence": "mesicni",
      "platnost_od": "2024-09-01",
      "platnost_do": "2025-02-28",
      "zadal": "spravce",
      "datum_zmeny": "2024-08-20"
    }
  ],
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
  "poznámka": "",
  "prilohy": ["doklad_kauce.pdf"],
  "historie": [
    { "akce": "vlozeni", "castka": 24000, "datum": "2025-09-01" }
  ],
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
  "kategorie": "sluzba",
  "castka": 400,
  "frekvence": "mesicni",
  "splatnost_den": 15,
  "smlouva_id": "501",
  "stav": "aktivni",
  "poznámka": "Poplatek za internet",
  "prilohy": [],
  "created_at": "2025-09-09T12:07:00Z"
}
```

### 4. Stavy měřidel
```json
{
  "id": "sm401",
  "jednotka_id": "101",
  "typ_meric": "voda_tepla",
  "cislo_meridla": "VT101-23",
  "stav": 1200,
  "datum_odecet": "2025-09-01",
  "smlouva_id": "501",
  "zadal": "najemnik",
  "priloha": "foto_2025-09-01.jpg",
  "schvaleno": true
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
    { "typ": "teplo", "kategorie": "energie", "zaloha": 12000, "spotreba": 13000, "doplatek": 1000 },
    { "typ": "voda", "kategorie": "energie", "zaloha": 3000, "spotreba": 2500, "preplatek": 500 }
  ],
  "celkem_doplatek": 500,
  "vytvoreno": "2026-01-15",
  "priloha": "vyuctovani_101_2025.pdf",
  "poznámka": "",
  "reklamace": false,
  "stav": "odeslano"
}
```

---

## 📋 Funkce v přehledu

- Přehled všech záloh/kaucí/jiných plateb podle jednotky, nájemníka, stavu, kategorie služby, období
- Hromadné zadání předpisů záloh pro více jednotek
- Nastavení a úprava splatnosti, výše, periody a kategorie
- Evidence a historie kaucí (vložení, vrácení, zápočet)
- Evidence a úprava stavů měřidel, historie odečtů, schválení odečtu
- Generování a export vyúčtování (PDF, XLSX)
- Hromadné generování předpisů plateb (napojení na modul Platby)
- Možnost přidat poznámku nebo přílohu ke každé položce
- Notifikace splatnosti, potvrzení o platbě, upomínky, penalizace za zpoždění
- Auditní log / historie změn
- Možnost sumarizace a exportu pro audit/účetnictví

---

## 🔘 Hlavní funkce / tlačítka

- ✅ Přidat/editovat zálohu/kauci/jinou platbu
- ✏️ Upravit zálohu/kauci/jinou platbu
- 📈 Zadat nebo importovat stav měřidla, schválit odečet
- 📊 Vytvořit/zobrazit vyúčtování, zadat reklamaci
- 📥 Import/hromadné zadání předpisů nebo odečtů
- 📤 Export předpisů/vyúčtování (PDF/XLSX)
- 🗄️ Archivovat/smazat předpis, vyúčtování, platbu
- 🔔 Odeslat potvrzení nebo upomínku
- 👁️ Zobrazit detailní historii
- ⚙️ Nastavení pravidel a šablon

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Administrátor | Správce nemovitostí | Účetní      | Pouze čtení | Nájemník |
|------------------------------|:-------------:|:-------------------:|:-----------:|:-----------:|:--------:|
| Přehled záloh/kaucí/služeb   |      ✅       |         ✅          |     ✅      |     ✅      |   ✅     |
| Přidat/změnit předpis        |      ✅       |         ✅          |     ✅      |     ❌      |   ❌     |
| Zadat/změnit stav měřidla    |      ✅       |         ✅          |     ✅      |     ❌      |   ✅*    |
| Generovat vyúčtování         |      ✅       |         ✅          |     ✅      |     ❌      |   ❌     |
| Exportovat data              |      ✅       |         ✅          |     ✅      |     ❌      |   ✅     |
| Import/hromadné zadání       |      ✅       |         ✅          |     ✅      |     ❌      |   ❌     |
| Odeslat upomínku/potvrzení   |      ✅       |         ✅          |     ✅      |     ❌      |   ❌     |
| Archivace/smazání            |      ✅       |         ✅          |     ✅      |     ❌      |   ❌     |
| Zadání reklamace             |      ✅       |         ✅          |     ✅      |     ❌      |   ✅     |

* Nájemník může zadat samoodečet měřidla, který podléhá schválení správcem.

---

## 🟢 Stavy a workflow předpisů/vyúčtování

| Stav               | Popis                                   | Kdo může změnit  | Kdy/proč změnit                     |
|--------------------|-----------------------------------------|------------------|--------------------------------------|
| **Aktivní**        | Předpis je platný a účinný              | Správce/Admin    | Při vzniku nebo po editaci           |
| **Neaktivní**      | Neúčinný, ale evidován                  | Správce/Admin    | Po změně, např. ukončení nájmu       |
| **Splaceno**       | Plně uhrazeno                           | Automaticky      | Po spárování s platbou               |
| **Po splatnosti**  | Neuhrazeno po splatnosti                | Automaticky      | Po datu splatnosti bez úhrady        |
| **Penalizováno**   | Přidáno penále za zpoždění              | Automaticky      | Podle pravidel po uplynutí lhůty     |
| **Reklamace**      | Nájemník reklamuje vyúčtování           | Nájemník/Správce | Po zadání reklamace                  |
| **Archivováno**    | Historie, pouze ke čtení                | Správce/Admin    | Po vyúčtování, ukončení vztahu       |

---

## 🕓 Historie a auditní log změn

- Každá změna předpisu zálohy/kauce/jiné platby je auditována (kdo, kdy, co a proč změnil)
- Historie stavů měřidel a odečtů včetně příloh a schválení
- Historie vyúčtování a rozúčtování, včetně reklamací a řešení
- Historie upomínek, penalizací a potvrzení o platbě

---

## 🔔 Notifikace a upozornění

| Událost / spouštěč              | Komu přijde notifikace   | Forma        | Poznámka                         |
|----------------------------------|--------------------------|--------------|----------------------------------|
| Nový předpis záloh/plateb        | Nájemník, správce        | E-mail, sys. | Po vygenerování                  |
| Blížící se splatnost             | Nájemník, správce        | E-mail, sys. | X dní před splatností            |
| Nezaplacená záloha/platba        | Nájemník, správce        | E-mail, sys. | Upomínka, možnost penalizace     |
| Zadaný nový stav měřidla         | Správce, účetní          | Systém       | Potvrzení o zadání               |
| Vyúčtování a reklamace           | Nájemník, správce        | E-mail, sys. | Po vygenerování a po reklamaci   |
| Potvrzení o platbě               | Nájemník                 | E-mail, sys. | Po spárování platby              |
| Penalizace za zpoždění           | Nájemník, správce        | E-mail, sys. | Po aplikaci penalizace           |

---

## 📦 Hromadné operace

- Hromadné zadání/úprava předpisů záloh/služeb/kaucí
- Hromadné importy stavů měřidel (například z CSV)
- Hromadné generování vyúčtování (pro celý dům/jednotky)
- Hromadné exporty potvrzení, přehledů a upomínek
- Hromadné odeslání upomínek a penalizací

---

## ⚠️ Typické chybové stavy a výjimky

| Chyba / výjimka                        | Doporučené řešení / reakce systému     | Uživatelská hláška                         | Logování |
|----------------------------------------|----------------------------------------|--------------------------------------------|----------|
| Duplicita předpisu pro jednotku/období | Zamezit uložení, zvýraznit pole        | „Předpis pro toto období již existuje.“    | Povinné  |
| Chybějící stav měřidla                 | Upozornit, zamezit vyúčtování          | „Není zadán aktuální stav měřidla.“        | Povinné  |
| Neplatný formát platby                 | Zvýraznit pole, zamezit uložení        | „Zadaná částka/splatnost není platná.“     | Povinné  |
| Neuhrazená záloha/platba po splatnosti | Automaticky označit, upozornit správce | „Platba je po splatnosti, kontaktujte správce.“ | Povinné  |
| Pokus o smazání předpisu s platbou     | Zamezit smazání                        | „Nelze smazat – existuje navázaná platba.“ | Povinné  |
| Zadání reklamace po uzavření vyúčtování| Zamezit, nabídnout kontakt na správce  | „Vyúčtování již bylo uzavřeno, kontaktujte správu.“ | Povinné  |

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
- [ ] Notifikace a penalizace za opožděné platby (workflow a šablony)
- [ ] Hromadné importy stavů měřidel a předpisů
- [ ] Propojení s modulem Platby (automatické párování, potvrzení, penalizace)
- [ ] Vylepšit uživatelské rozhraní pro hromadné zadání/editaci předpisů
- [ ] Testování workflow a typických chybových stavů
- [ ] Přidat možnost individuálních poznámek a příloh ke každé položce
- [ ] Doplnit schvalovací workflow pro samoodečet nájemníkem
- [ ] Přehled "Co má nájemník platit" jako samostatná sestava
- [ ] Vylepšit sumarizaci a export pro audit a účetnictví

---

> Modul Služby je klíčový pro správnou a transparentní evidenci všech poplatků, záloh, služeb a energií v rámci nemovitosti. Je těsně propojen s moduly Platby a Vyúčtování. Pokud potřebuješ rozpracovat detailní workflow, datový model nebo šablonu notifikace, napiš konkrétní požadavek.
