# ARCHITEKTURA A WORKFLOW MODULU DOKUMENTY (doplněno Copilotem)

---

## 1. Integrační logika a workflow napojení na modul Smlouva

- Každý dokument (smlouva, protokol, dodatek, splátkový kalendář) **vzniká v domovském modulu** (nejčastěji Smlouva, případně Platby, Údržba apod.).
- Po vytvoření/vygenerování je dokument **automaticky zapsán do modulu Dokumenty** – evidence, vyhledávání, filtrování, export, audit.
- **Reference na zdrojovou entitu** je vždy povinná (`smlouva_id`, `protokol_id`, `platba_id`...).
- Veškeré workflow související s **podpisem, schválením, úpravami** probíhá výhradně v domovském modulu, v Dokumentech pouze evidence, verzování, archivace, export, audit.
- Modul Dokumenty **nikdy neslouží k samotné tvorbě smluv nebo protokolů** – pouze jako knihovna a auditní úložiště.
- V případě potřeby lze dokument **anonymizovat nebo smazat** (dle pravidel a práv).

---

## 2. Doporučené datové modely a pole

- Každý záznam dokumentu má:
  - **id, typ, stav**
  - **sablona_id** (pokud vznikl ze šablony)
  - **prirazeno_k** – objekt obsahující reference na entity (`smlouva_id`, `protokol_id`, atd.)
  - **podpisy, historie, audit_log**
  - **archivovano, datumy vytvoření, podpisů, expirace**
  - **stav podpisu** a detailní informace o způsobu podpisu (např. BankID, ručně, razítkem, atd.)

---

## 3. Typické workflow

1. **Vygenerování dokumentu** (v modulu Smlouva nebo jiném) → **automatický zápis** do Dokumenty.
2. **Editace, podpis, export, archivace** pouze přes workflow domovského modulu – zde pouze evidence, verzování, sdílení, export.
3. **Auditní a verzovací log** – každý zásah, podpis, změna je zaznamenána.
4. **Hromadné operace** (export, archivace, podepisování) – pouze pokud jsou umožněny příslušnými právy.

---

## 4. Výhody tohoto řešení

- **Jedno místo pro všechna data**: Dokumenty jsou vždy dohledatelné napříč systémem, jednoduše filtrovatelné podle entity, typu, stavu, data apod.
- **Auditní a právní jistota**: Veškeré změny, podpisy i anonymizace jsou logovány a exportovatelné.
- **Bezpečnost a přehled**: Nikdo nemůže vytvořit dokument „bokem“, vše musí vzniknout v domovském modulu.

---

## 5. Další doporučení

- Evidence historie všech dokumentů včetně možností verzování.
- Export do různých formátů (PDF, DOCX, ZIP, ...).
- Podpora automatizovaných notifikací, workflow schválení a zamítnutí, napojení na schvalovací procesy (pokud existují).
- Vždy povinná reference na původní entitu!

---

## 6. Propojení s ostatními moduly

- **Smlouva** – všechny smlouvy a přílohy, včetně protokolů, dodatků, splátkových kalendářů.
- **Platby, Údržba, Komunikace...** – každý dokument vzniklý v těchto modulech je zde evidován s referencí na původní entitu.
- **Možnost rozšíření pro další typy dokumentů bez zásahu do architektury modulu Dokumenty.**

---

## 7. Příklad zápisu dokumentu

```json
{
  "id": "dokument_2025_09_101_01",
  "sablona_id": "smlouva_najemni_vzor",
  "vlastnik": "PatrikCechlovsky",
  "prirazeno_k": {
    "jednotka_id": "101",
    "najemce_id": "najemnik_101",
    "smlouva_id": "501"
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

## 8. Shrnutí

- **Vždy vzniká v domovském modulu, v Dokumentech pouze evidence.**
- **Reference na zdrojovou entitu je povinná.**
- **Audit a historie změn je klíčová vlastnost.**
- **Všechny hromadné a schvalovací workflow pouze přes domovský modul, nikoliv v Dokumentech.**

---

# (Dále pokračuje původní obsah Dokumenty.md)

> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

# Modul: Dokumenty

---

## 🌲 Stromová struktura modulu

| Stav | Sekce                                 | Popis                                                |
|------|---------------------------------------|------------------------------------------------------|
| ✅   | 🟦 Knihovna šablon a vzorů            | Předdefinované a uživatelské šablony dokumentů       |
| ✅   | 🟦 Tvorba a editace dokumentu         | Vytvoření dokumentu ze šablony nebo prázdného        |
| ✅   | 🟦 Personalizace a individuální úpravy| Individuální kopie a historie změn                   |
| ✅   | 🟦 Podepisování a ověřování           | Elektronické podpisy, razítka, BankID                |
| ✅   | 🟦 Sdílení, export, archivace         | Sdílení dokumentů, export, archivace, expirace       |
| ✅   | 📝 Poznámky, nápady a úkoly           | Prostor pro další poznámky a TODO                    |

---

## 🟦 Knihovna šablon a vzorů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel, uživatelé, pole, workflow, validace, akce, chybové stavy
- [x] Filtrování, vyhledávání, parametrizace proměnných

---

## 🟦 Tvorba a editace dokumentu

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel, uživatelé, pole, možnost předvyplnění z jiných modulů
- [x] Uložení konceptu, náhled, editace obsahu

---

## 🟦 Personalizace a individuální úpravy

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Úprava šablony jen pro sebe (lokální kopie)
- [x] Historie změn dokumentu, verzování

---

## 🟦 Podepisování a ověřování

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Vložení razítka, podpisu, elektronického podpisu
- [x] Více podpisů na dokument
- [x] Uložení informací o způsobu podepsání

---

## 🟦 Sdílení, export, archivace

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Odeslání dokumentu e-mailem, sdílení s uživateli
- [x] Export do PDF, DOCX, text
- [x] Archivace, nastavení expirace

---

## 📝 Poznámky, nápady a úkoly k modulu i dlaždicím

> Sem piš vše, co tě napadne, co je potřeba doplnit, změnit nebo vyřešit.  
> ⏳ = rozpracováno, přeškrtni hotové.

- ⏳ Možnost schvalovacího workflow před podpisem (např. více úrovní)
- ⏳ Integrace s DMS (Document Management System) třetích stran
- ⏳ Možnost napojení na externí podpisové služby (BankID, MojeID)
- ⏳ Automatizace verzování dokumentů při každé změně
- ⏳ Hromadné podepisování více dokumentů najednou
- ⏳ Notifikace o expiraci dokumentu
- ⏳ Nastavit různou viditelnost dokumentu pro různé role/skupiny
- ⏳ Export historie všech změn dokumentu (auditní log)
- ⏳ Šablony pro automatizované generování dokumentů (např. při uzavření smlouvy)

Otázky k doplnění:
- Potřebujeme možnost schvalování dokumentu více osobami?
- Má být možné podepsat dokument mimo systém (ručně nahrát podepsaný dokument)?
- Chceme umožnit automatizované generování dokumentů na základě událostí v systému?
- Má být možné nastavit expiraci každého dokumentu individuálně?
- Budeme umožňovat verzování i u rozpracovaných konceptů?

---

## 🗄️ Datové modely (ukázka)

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
| Šablona nelze upravit (globální)| Umožnit kopii pro úpravu     | „Globální šablonu nelze editovat, vytvořte vlastní kopii.“ |
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

## 📋 Doporučené workflow

1. Výběr/uprava šablony → vygenerování dokumentu → editace → podpis → sdílení/archivace.
2. Individuální úprava šablony → použití pouze pro konkrétního uživatele/situaci.
3. Podepisování (elektronicky/razítko) → archivace podpisového záznamu.
4. Sdílení dokumentu (e-mailem, interně), nastavení expirace, archivace.
5. Hromadný export a reporting dokumentů (např. pro audit).

---

## 📚 Reference

- [Modul Komunikace](./komunikace.md)
- [Modul Platby](./platby.md)
- [Modul Údržba](./udrzba.md)
- [Modul Finance](./finance.md)

---

> Modul Dokumenty poskytuje správci i nájemníkům bezpečné a pohodlné generování, editaci, podepisování a archivaci všech důležitých dokumentů, včetně podpory elektronických podpisů a automatizace workflow.
