# Modul: Dokumenty

---

## 📄 Úvod

Modul **Dokumenty** slouží k tvorbě, správě, úpravám a bezpečnému uchovávání všech důležitých dokumentů v rámci správy nemovitostí.  
Obsahuje vzory a šablony (např. smlouvy, potvrzení, dohody), umožňuje jejich editaci, přizpůsobení konkrétním uživatelům/jednotkám a nabízí možnost digitálního podepisování – včetně přidání razítka, vlastního podpisu nebo elektronického ověření (např. BankID).

---

## 🟦 Hlavní sekce / dlaždice

### 1. Knihovna šablon a vzorů

- Předdefinované šablony: nájemní smlouva, potvrzení o platbě, dohoda o splátkách, předávací protokol, výpověď, oznámení, atd.
- Možnost editace šablon (globálně i individuálně)
- Přidání nové vlastní šablony (uživatelské vzory)
- Parametrizace šablon (proměnné: jméno, částka, datum, jednotka, apod.)
- Vyhledávání a filtrování šablon dle typu, modulu, autora

---

### 2. Tvorba a editace dokumentu

- Vytvoření dokumentu na základě šablony nebo „na zelené louce“
- Možnost předvyplnění údajů z jiných modulů (nájemce, platby, jednotka…)
- Editace obsahu, přidání vlastních polí, obrázků, tabulek
- Možnost uložení rozpracovaného konceptu („draft“)
- Náhled před tiskem/odesláním

---

### 3. Personalizace a individuální úpravy

- Každý uživatel může upravit šablonu jen pro sebe (lokální kopie)
- Možnost verzování a historie změn dokumentu/šablony
- Propojení dokumentů s konkrétními jednotkami, nemovitostmi, nájemci
- Přehled naposledy použitých a oblíbených dokumentů

---

### 4. Podepisování a ověřování

- Vložení razítka (obrázek, generované z dat firmy)
- Možnost vložení vlastního podpisu (obrázek, nakreslení, digitální podpis)
- Elektronický podpis dokumentu (např. BankID, MojeID, kvalifikovaný certifikát)
- Uložení informací o způsobu podepsání, datu a uživateli
- Možnost více podpisů na dokument (např. pronajímatel + nájemce)

---

### 5. Sdílení, export, archivace

- Odeslání dokumentu e-mailem přímo z aplikace (viz modul Komunikace)
- Sdílení dokumentu s konkrétními uživateli/skupinami (nájemník, účetní…)
- Export do PDF, DOCX, případně prostý text
- Možnost archivace a nastavení expirace dokumentu (skartační lhůta)
- Přehled všech vygenerovaných a podepsaných dokumentů

---

## 🗃️ Datové modely (ukázka)

### 1. Šablona dokumentu

```json
{
  "id": "smlouva_najemni_vzor",
  "nazev": "Nájemní smlouva - vzor",
  "typ": "smlouva",
  "obsah": "Tímto se uzavírá nájemní smlouva mezi {{pronajimatel}} a {{najemce}} od {{datum_od}}...",
  "promenne": ["pronajimatel", "najemce", "datum_od", "datum_do", "castka", "adresa"],
  "autor": "admin",
  "verze": "1.0"
}
```

### 2. Vytvořený/podepsaný dokument

```json
{
  "id": "dokument_2025_09_101_01",
  "sablona_id": "smlouva_najemni_vzor",
  "vlastnik": "PatrikCechlovsky",
  "prirazeno_k": {
    "jednotka_id": "101",
    "najemce_id": "najemnik_101"
  },
  "stav": "podepsano",
  "datum_vytvoreni": "2025-09-09",
  "datum_podpisu": "2025-09-09",
  "podpisy": [
    {
      "typ": "bankid",
      "uzivatel": "najemnik_101",
      "cas": "2025-09-09T14:03:00"
    },
    {
      "typ": "razitko",
      "uzivatel": "PatrikCechlovsky",
      "cas": "2025-09-09T14:04:00",
      "obrazek": "razitko_pcechlovsky.png"
    }
  ],
  "archivovano": false
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                | Řešení systému / reakce      | Uživatelská hláška                              |
|---------------------------------|------------------------------|-------------------------------------------------|
| Šablona nelze upravit (globální) | Umožnit kopii pro úpravu     | „Globální šablonu nelze editovat, vytvořte vlastní kopii.“ |
| Chyba při generování dokumentu  | Upozornit, logovat           | „Nepodařilo se vygenerovat dokument, zkuste znovu.“ |
| Neúplné proměnné v šabloně      | Zabránit pokračování         | „Je nutné vyplnit všechny povinné údaje.“      |
| Chyba při podepisování          | Upozornit, nabídnout opakování | „Podpis se nezdařil, zkuste znovu nebo zvolte jiný způsob.“ |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Admin | Pronajímatel | Správce | Nájemník | Účetní | Pouze čtení |
|------------------------------|:-----:|:------------:|:-------:|:--------:|:------:|:-----------:|
| Vytvoření/editace šablony    |  ✅   |      ✅      |   ✅    |    ❌    |   ✅   |     ❌      |
| Vytvoření dokumentu          |  ✅   |      ✅      |   ✅    |    ✅    |   ✅   |     ❌      |
| Podepsání dokumentu          |  ✅   |      ✅      |   ✅    |    ✅    |   ✅   |     ❌      |
| Sdílení/export dokumentu     |  ✅   |      ✅      |   ✅    |    ✅    |   ✅   |     ❌      |
| Archivace dokumentu          |  ✅   |      ✅      |   ✅    |    ❌    |   ✅   |     ❌      |

---

## 📑 Doporučené workflow

1. **Výběr nebo úprava šablony:**  
   - Uživatel zvolí přednastavenou šablonu, případně ji upraví podle potřeby nebo vytvoří novou.
2. **Vygenerování dokumentu:**  
   - Systém předvyplní proměnné z ostatních modulů (např. nájemce, částka, termíny).
   - Uživatel může provést další editace a uložit dokument.
3. **Podepsání dokumentu:**  
   - Uživatel zvolí způsob podepsání (razítko, vlastnoruční podpis, elektronicky, BankID).
   - Systém uloží podpis a případně odešle dokument protistraně.
4. **Sdílení/archivace:**  
   - Dokument je možné zaslat e-mailem, sdílet s nájemníkem nebo archivovat.
   - Je možné nastavit expiraci nebo archivaci dokumentu po uplynutí lhůty.

---

## 📚 Reference

- [Modul Komunikace](./komunikace.md)
- [Modul Platby](./platby.md)
- [Modul Údržba](./udrzba.md)
- [Modul Finance](./finance.md)

---

> Modul Dokumenty poskytuje správci i nájemníkům bezpečné a pohodlné generování, editaci, podepisování a archivaci všech důležitých dokumentů, včetně podpory elektronických podpisů a razítek.
