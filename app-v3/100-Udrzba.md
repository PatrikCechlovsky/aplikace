> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)

# Modul: Údržba

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Hlášení závad a požadavků | Evidence požadavků na opravy, úklid, instalace |
| ✅   | 🟦 Plánované údržby, servisy, revize | Plánování, upozornění na termíny, historie |
| ✅   | 🟦 Provedené opravy a zásahy | Evidence všech zásahů, náklady, doklady |
| ✅   | 🟦 Přehled zařízení a servisní historie | Katalog zařízení a jejich servisní historie |
| ✅   | 🟦 Statistiky a reporting | Přehled počtu požadavků, nákladů, grafy |
| ✅   | 🗒️ Poznámky, nápady a úkoly | Prostor pro další poznámky a TODO |

---

## 🟦 Hlášení závad a požadavků

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Filtrování, řazení, akce v řádku
- ✅ Hromadné akce, ukázka tabulky
- ✅ Validace, tlačítka, workflow
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

#### 1️⃣ Popis a účel  
Evidence závad, požadavků na opravy, úklid, instalace od nájemníků, správců, vlastníků.

#### 2️⃣ Přístup/viditelnost  
Nájemník (zadat požadavek na svoji jednotku), správce, pronajímatel (vše).

#### 3️⃣ Pole a validace  
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

#### 4️⃣ Filtrování, hromadné akce, ukázka tabulky  
Filtrování: stav, priorita, stáří, jednotka, zařízení  
Hromadné akce: změna stavu, export, přiřazení realizátora

| Požadavek ID | Typ     | Popis     | Stav     | Priorita | Termín    | Akce       |
|--------------|---------|-----------|----------|----------|-----------|------------|
| 001          | oprava  | Netěsnící kohoutek | nové | střední | 2025-09-20 | 👁️ ✏️ 🗑️ |

#### 5️⃣ Validace a workflow  
- Povinná pole, validace typu a příloh
- Po zadání požadavku automatická notifikace správci
- Možnost editace/změny stavu pouze správce/pronajímatel

#### 6️⃣ Chybové stavy a oprávnění  
- Nelze zadat požadavek na cizí jednotku (nájemník)
- Chybí povinné pole (zvýraznit, zamezit uložení)
- Duplicitní požadavek (upozornit, nabídnout sloučení)
- Oprávnění viz tabulka na konci

#### 7️⃣ Vazby  
- Přehled zařízení (možnost přiřazení zařízení)
- Statistiky (počty, typy)

---

## 🟦 Plánované údržby, servisy a revize

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel, uživatelé, pole, workflow, validace, akce, chybové stavy
- ✅ Notifikace na blížící se termín, historie

---

## 🟦 Provedené opravy a zásahy

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel, uživatelé, pole, workflow, validace, akce, chybové stavy
- ✅ Možnost navázání na požadavek/plán
- ✅ Evidence nákladů, příloh, hodnocení

---

## 🟦 Přehled zařízení a servisní historie

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Katalog zařízení, historie oprav, výměn, revizí
- ✅ Upozornění na výměnu, konec životnosti, revize, archivace zařízení

---

## 🟦 Statistiky a reporting

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Přehled počtu a typů požadavků, nákladů
- ✅ Grafy, export, reporting

---

## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Sem piš nápady a úkoly, co je potřeba doplnit, změnit nebo vyřešit.  
> ⏳ = rozpracováno, přeškrtni hotové.

- ⏳ Rozšířit katalog zařízení o typy, životnost, revizní intervaly
- ⏳ Možnost hodnotit spokojenost po zásahu (nájemník)
- ⏳ Automatické generování termínů revizí podle typu zařízení
- ⏳ Workflow pro schvalování zásahu (správce → pronajímatel → realizace)
- ⏳ Export statistiky nákladů podle typu zásahu a zařízení
- ⏳ Notifikace na nevyřešený požadavek po X dnech
- ⏳ Napojení na externí servisní firmy (API, e-mail)
- ⏳ Možnost importu servisní historie z jiných systémů

> Otázky k doplnění:
> - Potřebujeme detailní evidenci nákladů a faktur na každé zařízení?
> - Budeme umožňovat nájemníkovi hodnotit zásah?
> - Má být možné vytvářet vlastní typy požadavků a kategorií servisů?
> - Chceme automaticky generovat požadavky na základě plánu revizí?
> - Má být možné navázat požadavek na více zařízení najednou?

---

## 🗃️ Datové modely (ukázka)
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

1. Zadání požadavku → schválení správce → přiřazení realizátora → vyřešení → archivace.
2. Plánování údržby a revizí → upozornění na termín → evidence provedení → archivace.
3. Evidence zásahu → navázání na požadavek/plán → zadání nákladů → nahrání příloh → hodnocení nájemníkem.
4. Statistiky a reporting → export a analýza nákladů, četnosti, typů zásahů.

---

## 📚 Reference

- [Modul Jednotka](./jednotka.md)
- [Modul Energie](./energie.md)
- [Modul Finance](./finance.md)
- [Modul Služby](./sluzby.md)

---

> Modul Údržba zajišťuje pořádek v evidenci požadavků nájemníků, revizí, oprav a minimalizuje riziko opomenutí povinných servisních zásahů.
