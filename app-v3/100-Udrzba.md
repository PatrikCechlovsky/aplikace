# Modul: Údržba

> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

---

## 🛠️ Úvod

Modul **Údržba** slouží k evidenci, plánování a správě všech servisních, opravárenských, revizních a údržbových činností spojených s nemovitostí, jednotkami a společnými prostorami.  
Umožňuje evidovat požadavky nájemníků, hlášení závad, plánované i provedené servisy, výměny zařízení a povinné revize.  
Podporuje workflow od zadání požadavku, přes realizaci až po archivaci a reporting.

---

## 🌲 Stromová struktura modulu

| Stav | Sekce / dlaždice                    | Popis                                                              |
|------|-------------------------------------|--------------------------------------------------------------------|
| ✅   | 🟦 Hlášení závad a požadavků        | Evidence požadavků na opravy, úklid, instalace                     |
| ✅   | 🟦 Plánované údržby, servisy, revize| Plánování, upozornění na termíny, historie                         |
| ✅   | 🟦 Provedené opravy a zásahy        | Evidence všech zásahů, náklady, doklady                            |
| ✅   | 🟦 Přehled zařízení a servisní historie | Katalog zařízení, historie oprav, revizí                        |
| ✅   | 🟦 Statistiky a reporting           | Přehled počtu požadavků, nákladů, grafy                            |
| ✅   | 🟦 Auditní log / historie změn      | Historie změn požadavků, servisů, zařízení                         |
| ✅   | 🟦 Nastavení modulu                 | Pravidla, workflow, šablony, notifikace                            |
| ✅   | 🟦 Poznámky, nápady a úkoly         | TODO, návrhy rozšiřování, podněty                                  |

---

## 🟦 Hlášení závad a požadavků

- Evidence nových požadavků (od nájemníka, správce, vlastníka)
- Druh požadavku: oprava, úklid, instalace, jiná služba
- Možnost přiložit popis, foto, termín, prioritu, kontaktní osobu
- Povinná pole: typ požadavku, popis, kontaktní osoba, jednotka, stav
- Volitelná pole: termín, priorita, foto, přílohy, poznámka
- Stav požadavku: nové, řeší se, vyřešeno, zamítnuto
- Přehled otevřených požadavků podle závažnosti, stáří, jednotky, zařízení
- Filtrování: stav, priorita, stáří, jednotka, zařízení
- Hromadné akce: změna stavu, export, přiřazení realizátora

---

### Checklist – Hlášení závad a požadavků
- [x] Účel sekce/dlaždice (evidence závad, požadavků na opravy, úklid, instalace od nájemníků, správců, vlastníků)
- [x] Kdo má přístup/viditelnost podle oprávnění/rolí (nájemník – jen svoji jednotku, správce, pronajímatel – vše)
- [x] Zařazení v hlavní stromové struktuře
- [x] Výčet a popis všech polí
- [x] Filtrování, řazení, akce v řádku, hromadné akce
- [x] Ukázka tabulky/přehledu
- [x] Validace, tlačítka, workflow, chybové stavy, oprávnění
- [x] Vazby na další moduly a reference
- [x] Specifika, rozšíření

---

### Ukázka tabulky/přehledu

| Požadavek ID | Typ     | Popis               | Stav   | Priorita | Termín    | Akce         |
|--------------|---------|---------------------|--------|----------|-----------|--------------|
| 001          | oprava  | Netěsnící kohoutek  | nové   | střední  | 2025-09-20| 👁️ ✏️ 🗑️       |

---

### Pole a validace

| Pole              | Povinné | Typ          | Poznámka                          |
|-------------------|:-------:|--------------|-----------------------------------|
| Typ požadavku     |   Ano   | výběr        | oprava, úklid, instalace, jiné    |
| Popis             |   Ano   | text         |                                   |
| Foto              |   Ne    | soubor       |                                   |
| Termín            |   Ne    | datum        | Požadovaný termín řešení          |
| Priorita          |   Ne    | výběr        | nízká, střední, vysoká            |
| Kontaktní osoba   |   Ano   | text         |                                   |
| Jednotka          |   Ano   | výběr        |                                   |
| Stav požadavku    |   Ano   | systémový    | nové, řeší se, vyřešeno, zamítnuto|
| Přílohy           |   Ne    | soubor       |                                   |
| Poznámka          |   Ne    | text         | Libovolná poznámka ke záznamu     |

---

## 🟦 Plánované údržby, servisy a revize

- Plánování pravidelných činností (revize kotlů, komínů, výtahů, elektro, hasicích přístrojů aj.)
- Evidence termínu, rozsahu, odpovědné osoby/firmy, ceny
- Povinná pole: typ, zařízení, termín, firma, stav
- Volitelná pole: cena, přílohy, poznámka
- Upozornění na blížící se termín (notifikace)
- Historie provedených/plánovaných servisů a revizí
- Možnost přiložit protokol, certifikát, fakturu

---

## 🟦 Provedené opravy a zásahy

- Evidence všech realizovaných zásahů (opravy, servisní výjezdy, výměny zařízení)
- Datum, popis, náklady, kdo provedl, přiložené dokumenty (faktury, fotky)
- Povinná pole: typ, zařízení, datum, provedl, popis, cena
- Volitelná pole: přílohy, navázání na požadavek/plán, poznámka
- Napojení na konkrétní požadavek nebo plánovanou údržbu
- Hodnocení spokojenosti nájemníka (volitelné)

---

## 🟦 Přehled zařízení a servisní historie

- Katalog zařízení v nemovitosti/jednotce (kotle, výtahy, okna, elektroměry…)
- Povinná pole: typ, umístění, výrobce, výrobní číslo, datum instalace/pořízení, stav, životnost, přílohy, poznámka
- Historie oprav, výměn, revizí pro každé zařízení
- Upozornění na potřebu výměny, konec životnosti, povinnou revizi
- Možnost archivace vyřazených zařízení

---

## 🟦 Statistiky a reporting

- Přehled počtu a typů požadavků za období
- Náklady na údržbu podle nemovitosti, jednotky, zařízení, typu zásahu
- Grafy (např. průměrná doba vyřízení, počet oprav podle typu, rozložení nákladů)
- Export přehledů a statistik

---

## 🟦 Auditní log / historie změn

- Historie změn požadavků, servisů, zařízení
- Evidence, kdo, kdy a co změnil
- Export historie pro audit

---

## 🟦 Nastavení modulu

- Pravidla workflow (možnost schvalování zásahů, změna stavů, notifikace)
- Šablony pro zadání požadavku, revize, servisního zásahu
- Nastavení oprávnění pro role
- Nastavení typů zařízení, servisů, požadavků
- **Možnost nastavit typ a příjemce upozornění (notifikace) – doporučujeme doplnit detailní sekci**

---

## 🟦 Poznámky, nápady a úkoly (TODO)

> ⏳ = rozpracováno, přeškrtni hotové. Nic nemažeme!

- ⏳ Rozšířit katalog zařízení o typy, životnost, revizní intervaly
- ⏳ Možnost hodnotit spokojenost po zásahu (nájemník)
- ⏳ Automatické generování termínů revizí podle typu zařízení
- ⏳ Workflow pro schvalování zásahu (správce → pronajímatel → realizace)
- ⏳ Export statistiky nákladů podle typu zásahu a zařízení
- ⏳ Notifikace na nevyřešený požadavek po X dnech
- ⏳ Napojení na externí servisní firmy (API, e-mail)
- ⏳ Možnost importu servisní historie z jiných systémů
- ⏳ Evidence detailních nákladů a faktur na každé zařízení
- ⏳ Možnost vytvářet vlastní typy požadavků a kategorií servisů
- ⏳ Automaticky generovat požadavky na základě plánu revizí
- ⏳ Možnost navázat požadavek na více zařízení najednou
- ⏳ **Doplnit pole "poznámka" ke každému záznamu v datech a formulářích**
- ⏳ **Doplnit možnost opakování/plánování periodických zásahů (např. servis každých X měsíců)**
- ⏳ **Rozšířit sekci Nastavení o detailní možnosti notifikací (typ, příjemce, způsob doručení)**
- ⏳ **Zvážit přímé napojení na plánování rozpočtu/financí (možnost přiřazení nákladu do rozpočtové kategorie, napojení na účetnictví)**
- ⏳ **Zvážit pokročilé typy reportů, např. rozpad nákladů podle kategorií, zařízení, období**
- ⏳ **Zvážit granularitu rozpadů nákladů v rámci jednoho zásahu (např. práce, materiál, doprava, režie)**
- ⏳ **Zvážit možnost komentáře/poznámky u každého workflow stavu (např. zamítnutí, odložení)**

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
  "prilohy": ["foto_kohoutek.jpg"],
  "poznamka": ""
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
  "prilohy": [],
  "poznamka": ""
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
  "prilohy": ["faktura_ventil.pdf", "foto_pred.jpg", "foto_po.jpg"],
  "poznamka": ""
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

## 📚 Reference a vazby

- [Modul Jednotka](./jednotka.md)
- [Modul Energie](./energie.md)
- [Modul Finance](./finance.md)
- [Modul Služby](./sluzby.md)

**Vazby na další moduly:**
- **Jednotka/Nemovitost:** Každý požadavek je vázán na konkrétní jednotku nebo dům.
- **Energie:** Revizní a servisní činnosti na měřidlech, vzájemné upozorňování.
- **Finance/Služby:** Evidence nákladů na údržbu, možnost přiřazení k vyúčtování nebo rozúčtování nákladů.
- **Notifikace:** Automatické upozornění na blížící se revizi, nevyřešený požadavek, přidělení úkolu, atd.
- **Externí firmy:** Propojení na katalog partnerů/Ares (pro účely přiřazení servisní firmy, fakturace).

---

> Modul Údržba zajišťuje pořádek v evidenci požadavků nájemníků, revizí, oprav a minimalizuje riziko opomenutí povinných servisních zásahů. Pokud potřebuješ detailnější workflow, rozširující pole nebo napojení, napiš konkrétní požadavek.
