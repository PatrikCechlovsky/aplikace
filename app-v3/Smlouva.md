# Modul: Smlouva

> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

---
## 📋 Krátký úvod – Co je modul Smlouva a kdy ho použít

**Modul Smlouva** slouží k evidenci, správě a generování všech typů smluv souvisejících s nájmem nemovitostí a jednotek.  
Podporuje práci s nájemními smlouvami, předávacími protokoly a vzory dokumentů, které lze generovat automaticky na základě údajů o pronajímateli, nájemníkovi, nemovitosti a jednotce.

### Kdy modul použít?

- K evidenci a správě všech smluvních vztahů v rámci nemovitostí (nájemní smlouvy, dodatky, předávací protokoly atd.).
- Pro automatizované generování smluv a protokolů z údajů v systému.
- Pokud potřebuješ sledovat historii smluv, jejich platnost, expirace, dodatky a archiv.
- Při potřebě tisknout, exportovat či podepisovat smlouvy elektronicky.
- Pro monitoring a audit změn smluv a jejich verzí.

### Typické využití

- Správa nájemních smluv mezi pronajímatelem a nájemníkem pro konkrétní jednotku.
- Generování a archivace předávacích protokolů při nastěhování/vystěhování.
- Práce s vzorovými dokumenty, které se automaticky plní daty z ostatních modulů.
- Evidence dodatků, výpovědí, ukončení nájmu.
- Automatizace výpočtů (nájem, služby, zálohy) a generování platebních předpisů.

---

## 🏗️ Základní struktura modulu

- **Dlaždice / sekce:**  
  - 📄 Nájemní smlouvy (evidence všech uzavřených smluv)
  - 📑 Vzor smlouvy (editace a správa šablon)
  - 📃 Předávací protokol (evidence a generování protokolů)
  - 🗄️ Archiv vzorů a protokolů

- **Vazby na jiné moduly:**
  - **Pronajímatel:** Smlouva odkazuje na pronajímatele
  - **Nájemník:** Smluvní strana nájemník
  - **Jednotka/Nemovitost:** Smlouva je vázána na konkrétní jednotku/nemovitost
  - **Platby, Služby, Dokumenty, Uživatelé**

---

## 🧑‍💼 Průvodce založením

V každém formuláři lze spustit  
🌸 **„Průvodce vytvořením smlouvy“**  
- ✅ Uživatel může uložit rozpracované návrhy, přeskočit kroky, doplnit později, nebo vyjít z předdefinovaného vzoru.
- 🏁 Automaticky se načtou údaje o pronajímateli, nájemníkovi, jednotce, termínech, cenách, službách, zálohách apod.

### Typický průvodce:
1. Výběr vzoru smlouvy
2. Automatické předvyplnění údajů (pronajímatel, nájemník, jednotka, datumy, ceny, služby)
3. Možnost ruční editace doplněných polí
4. Přidání příloh
5. Uložení, tisk, export, odeslání k podpisu

---

## 🗃️ Datový model

### Základní pole – Nájemní smlouva

```json
{
  "id": "501",
  "cislo_smlouvy": "NS-2025/001",
  "typ_smlouvy": "najemni",
  "stav": "platna",
  "pronajimatel_id": "4",
  "najemnik_id": "6",
  "nemovitost_id": "12",
  "jednotka_id": "101",
  "datum_od": "2025-09-15",
  "datum_do": "2026-09-14",
  "vzor_id": "vz1",
  "cena_najem": 12000,
  "zalohy_sluzby": 2500,
  "prilohy": [
    {
      "nazev": "Nájemní smlouva",
      "typ": "pdf",
      "url": "prilohy/ns_2025-001.pdf"
    }
  ],
  "protokol_id": "pp101",
  "stav_podpisu": "podepsano",
  "created_at": "2025-09-09T10:20:00Z",
  "updated_at": "2025-09-09T10:40:00Z"
}
```

### Základní pole – Vzor smlouvy

```json
{
  "id": "vz1",
  "nazev": "Vzor nájemní smlouvy - byt",
  "obsah_html": "<h1>Nájemní smlouva</h1>...{{pronajimatel}}...{{najemnik}}...",
  "verze": 3,
  "aktivni": true,
  "popis": "Standardní vzor pro byty",
  "created_at": "2025-09-01T08:00:00Z",
  "updated_at": "2025-09-09T09:10:00Z"
}
```

### Základní pole – Předávací protokol

```json
{
  "id": "pp101",
  "cislo_protokolu": "PP-2025/001",
  "smlouva_id": "501",
  "jednotka_id": "101",
  "datum_predani": "2025-09-15",
  "stav_mericich_pristroju": {
    "elektrina": 10250,
    "voda": 1850,
    "plyn": 800
  },
  "stav_bytu": "V pořádku",
  "vybaveni": ["lednice", "sporák", "pračka"],
  "prilohy": [
    {
      "nazev": "Foto předání",
      "typ": "jpg",
      "url": "prilohy/predani_101_20250915.jpg"
    }
  ],
  "vytvoril": "admin",
  "created_at": "2025-09-09T10:30:00Z"
}
```

---

## Povinnost a viditelnost polí podle typu smlouvy/protokolu

| Pole                   | Nájemní smlouva | Dodatek  | Předávací protokol | Vzor smlouvy |
|------------------------|:--------------:|:--------:|:------------------:|:------------:|
| Číslo smlouvy/protokolu|   Povinné      | Povinné  | Povinné            | Nepovinné    |
| Pronajímatel           |   Povinné      | Povinné  | Nepovinné (odkaz)  | Proměnná     |
| Nájemník               |   Povinné      | Povinné  | Nepovinné (odkaz)  | Proměnná     |
| Jednotka/Nemovitost    |   Povinné      | Povinné  | Povinné            | Proměnná     |
| Data platnosti         |   Povinné      | Povinné  | Nepovinné          | Proměnná     |
| Cena nájmu/služeb      |   Povinné      | Povinné  | Nepovinné          | Proměnná     |
| Stav podpisu           |   Povinné      | Povinné  | Nepovinné          | Nezobrazovat |
| Přílohy                |   Nepovinné    | Nepovinné| Povinné (např. fotky) | Nepovinné |
| Vzor (šablona)         |   Povinné      | Nepovinné| Nepovinné          | Povinné      |

---

## 📋 Funkce v přehledu

- 📄 Přehled všech smluv (vyhledávání, filtrace podle stavu, typu, data, stran, jednotky…)
- 📑 Správa vzorů smluv (vytváření, editace, verzování, archivace)
- 📃 Evidence předávacích protokolů (vazba na smlouvu/jednotku, export, tisk)
- 📤 Export smluv a protokolů (PDF, DOCX, ZIP s přílohami)
- 📝 Elektronický podpis (možnost podepsat smlouvu online)
- 📜 Auditní log / historie verzí smlouvy a protokolu
- 🧩 Propojení smlouvy s platbami, službami, zálohami, dodatky
- 🔔 Notifikace expirací, podpisů, změn
- 📥 Import smluvních dat (hromadný import starších smluv)
- ⚙️ Nastavení modulu (automatizace, šablony, workflow)
- 🏷️ Generování platebních předpisů z parametrů smlouvy

---

## 🔘 Hlavní funkce / tlačítka

- ✅ Přidat smlouvu / protokol / vzor
- ✏️ Upravit smlouvu / protokol / vzor
- 👁️ Zobrazit detail
- 📤 Exportovat smlouvu / protokol
- 📑 Přidat přílohu
- 🖨️ Tisk smlouvy/protokolu
- 📝 Podepsat elektronicky
- 🔁 Prodluž/ukonči smlouvu
- ➕ Přidat dodatek
- 🗄️ Archivovat
- 🗑️ Smazat (pouze neplatné/archivní smlouvy)
- 📜 Auditní log / historie změn
- 🔍 Vyhledávání / filtrování

---

## 🛡️ Role a oprávnění

| Funkce / Akce             | Administrátor | Správce nemovitostí | Účetní      | Právník      | Pouze čtení |
|---------------------------|:-------------:|:-------------------:|:-----------:|:------------:|:-----------:|
| Vytvořit smlouvu/vzor     |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Editovat smlouvu/protokol |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Smazat smlouvu            |      ✅       |         ❌          |     ❌      |    ✅        |     ❌      |
| Archivovat                |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Exportovat smlouvy        |      ✅       |         ✅          |     ✅      |    ✅        |     ❌      |
| Importovat data           |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Elektr. podepisování      |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Změna stavu               |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Auditní log               |      ✅       |         ✅          |     ✅      |    ✅        |     ❌      |
| Připojit dokument         |      ✅       |         ✅          |     ❌      |    ✅        |     ❌      |
| Vyhledávání, filtrování   |      ✅       |         ✅          |     ✅      |    ✅        |     ✅      |

---

## 🟢 Stavy a workflow smlouvy/protokolu

| Stav           | Popis                                                    | Kdo může změnit  | Kdy/proč změnit                         |
|----------------|----------------------------------------------------------|------------------|------------------------------------------|
| **Návrh**      | Rozpracovaná, není podepsaná                             | Správce/Admin    | Při zakládání nebo editaci před podpisem |
| **Platná**     | Podepsaná, v platnosti                                   | Správce/Admin    | Po podepsání oběma stranami             |
| **Ukončená**   | Po uplynutí, výpovědi, odstoupení                        | Správce/Admin    | Po vystěhování, ukončení nájmu apod.     |
| **Archivní**   | Smlouva je pouze ke čtení, již není vázána na jednotku   | Správce/Admin    | Po uplynutí doby archivace               |
| **Neplatná**   | Smlouva byla zrušena, nikdy nevstoupila v platnost       | Správce/Admin    | Zrušení před podpisem                    |

---

## 🗄️ Podmínky mazání a archivace

- Nelze mazat smlouvy, které jsou v platnosti nebo mají navázané platby/služby.
- Archivace je možná pro smlouvy/protokoly po ukončení všech návazností.
- Smazání je možné pouze pro rozpracované, neplatné nebo archivní záznamy.

---

## 🕓 Historie a auditní log změn

- Každá změna (návrh, podpis, editace, prodloužení, dodatek) je auditovaná.
- Přehled verzí vzorů i konečných smluv/protokolů.

---

## 🔔 Notifikace a upozornění

| Událost / spouštěč                  | Komu přijde notifikace       | Forma (e-mail, systém, SMS) | Poznámka                                    |
|--------------------------------------|------------------------------|-----------------------------|----------------------------------------------|
| Expirace smlouvy                     | Správce, nájemník            | E-mail, systém              | X dní před koncem platnosti                  |
| Nový návrh smlouvy                   | Pronajímatel, nájemník       | E-mail, systém              | Po vygenerování návrhu                       |
| Podepsání smlouvy                    | Pronajímatel, nájemník       | E-mail, systém              | Obě strany, log audit                        |
| Přidání přílohy                      | Správce, právník             | Systém                      | Např. revize, kolaudace                      |
| Změna stavu (ukončení, výpověď)      | Správce, nájemník, audit log | Systém                      | Včetně důvodu změny                          |
| Nový předávací protokol              | Správce, nájemník            | Systém                      | Po vygenerování protokolu                    |
| Hromadný import/export               | Admin                        | Systém                      | Auditováno                                   |

---

## 🛡️ GDPR, export a anonymizace dat

- Export smlouvy i s přílohami a protokolem (pro audit, GDPR).
- Anonymizace údajů možná až po ukončení všech návazností.
- Kompletní audit všech operací.

---

## 🔗 Vazby na další moduly

| Modul           | Závisí na Smlouvě | Smlouva závisí na | Popis vazby                       |
|-----------------|:-----------------:|:-----------------:|-----------------------------------|
| Pronajímatel    |        ✅         |        ✅         | Pronajímatel je smluvní stranou   |
| Nájemník        |        ✅         |        ✅         | Nájemník je smluvní stranou       |
| Jednotka/Nemovitost|      ✅         |        ✅         | Smlouva je pro konkrétní jednotku |
| Platby          |        ✅         |        ✅         | Platby se řídí smlouvou           |
| Služby          |        ✅         |        ✅         | Služby a zálohy ze smlouvy        |
| Dokumenty       |        ✅         |        ❌         | Přílohy ke smlouvě/protokolu      |
| Auditní log     |        ✅         |        ❌         | Všechny změny se logují           |

---
## 📆 Dlaždice: Dohoda o splátkách

### Účel a hlavní přínos
Dohoda o splátkách slouží k formální evidenci a správě dlužných částek, které mají být splaceny v dohodnutých termínech.  
Je vázána na konkrétní smlouvu, nájemníka a jednotku.  
Součástí je automatizovaný **splátkový kalendář**, kde se eviduje:
- Celková dlužná částka
- Počet splátek
- Výše jednotlivých splátek
- Termíny splatnosti
- Stav úhrad (placeno/neplaceno, datum úhrady)
- Generování splátkového kalendáře ze vzoru

---

### Funkce v přehledu

- 📋 Přehled všech dohod o splátkách (filtrace podle stavu, nájemníka, smlouvy, jednotky)
- ➕ Přidat dohodu o splátkách
- 📝 Generovat splátkový kalendář podle zadaných údajů a vzorové šablony
- 📅 Možnost upravit počet splátek, výši, termíny (ručně/dle vzoru)
- 💶 Označit splátku jako uhrazenou/neuhrazenou
- 📑 Přidat přílohu (např. podepsaná dohoda, potvrzení platby)
- 📤 Exportovat splátkový kalendář (PDF, XLSX)
- 🗄️ Archivovat/smazat dohodu (pouze pokud není aktivní)
- 📜 Auditní log / historie změn
- 🔔 Notifikace blížící se splatnosti
- 👁️ Zobrazit detail dohody i splátek

---

### Ukázka datové věty (JSON)

```json
{
  "id": "8001",
  "cislo_dohody": "DS-2025/005",
  "smlouva_id": "501",
  "najemnik_id": "6",
  "jednotka_id": "101",
  "celkova_castka": 30000,
  "pocet_splatek": 6,
  "datum_uzavreni": "2025-09-10",
  "splatkove_polozky": [
    {
      "cislo": 1,
      "castka": 5000,
      "splatnost": "2025-10-10",
      "uhrazeno": false,
      "datum_uhrady": null
    },
    {
      "cislo": 2,
      "castka": 5000,
      "splatnost": "2025-11-10",
      "uhrazeno": false,
      "datum_uhrady": null
    }
    // ... další splátky
  ],
  "stav": "aktivni",
  "prilohy": [
    {
      "nazev": "Podepsaná dohoda",
      "typ": "pdf",
      "url": "prilohy/dohoda_ds-2025-005.pdf"
    }
  ],
  "created_at": "2025-09-09T11:00:00Z"
}
```

---

### Povinnost a viditelnost polí

| Pole                | Povinné pro dohodu | Povinné pro splátku | Poznámka                           |
|---------------------|:------------------:|:-------------------:|-------------------------------------|
| Číslo dohody        |        Ano         |         Ne          | Generováno automaticky              |
| Smlouva             |        Ano         |         Ne          | Odkaz na nájemní smlouvu            |
| Nájemník            |        Ano         |         Ne          | Odkaz na subjekt                    |
| Jednotka            |        Ano         |         Ne          | Vždy vázáno na jednotku             |
| Celková částka      |        Ano         |         Ne          |                                     |
| Počet splátek       |        Ano         |         Ne          |                                     |
| Splátková položka   |        Ne          |        Ano          | Generováno / upravováno uživatelem  |
| Datum splatnosti    |        Ne          |        Ano          |                                     |
| Částka splátky      |        Ne          |        Ano          |                                     |
| Stav úhrady         |        Ne          |        Ano          |                                     |
| Přílohy             |        Ne          |        Ne           | Podepsaná smlouva, potvrzení platby |

---

### Specifika workflow

- **Založení dohody:**  
  V průvodci navážeš na smlouvu, automaticky se načte nájemník, jednotka, doplníš dlužnou částku, počet splátek, periodu.
- **Generování splátkového kalendáře:**  
  Podle vzoru (nebo ručně) systém vygeneruje položky kalendáře (splátka, termín, částka).
- **Úpravy:**  
  Lze upravit termíny, výši jednotlivých splátek, případně přidat mimořádnou splátku.
- **Označení splátky jako uhrazené:**  
  Správce zaznamená datum úhrady, systém aktualizuje stav.
- **Notifikace:**  
  Systém upozorní na blížící se splatnost (např. 7 dní předem).
- **Export:**  
  Možnost exportu kalendáře i dohody (PDF, XLSX).
- **Archivace:**  
  Po splacení všech splátek nebo ukončení dohody možnost archivace.

---

### Vzor šablony dohody o splátkách

```
Dohoda o splátkách č. {{cislo_dohody}}
mezi {{pronajimatel}} a {{najemnik}}
předmět: dluh za jednotku {{jednotka_adresa}} ve výši {{celkova_castka}} Kč

Splátkový kalendář:
| Č. | Splatnost | Částka | Stav    | Datum úhrady |
|----|-----------|--------|---------|--------------|
{% for splatka in splatkove_polozky %}
| {{splatka.cislo}} | {{splatka.splatnost}} | {{splatka.castka}} Kč | {% if splatka.uhrazeno %}Uhrazeno{% else %}Neuhrazeno{% endif %} | {{splatka.datum_uhrady or "-"}} |
{% endfor %}
```
*Vzor dokumentu lze rozšířit o další podmínky/výluky, podpisy atd.*

---

### Typické chyby

- Duplicita čísla dohody
- Nesouhlas mezi celkovou částkou a součtem splátek
- Chybějící termíny/splatnosti splátek
- Možnost úhrady mimořádné splátky (řešit ve workflow a v příznaku položek)
- Pokus o označení jako uhrazené bez zadání částky nebo data úhrady

---

### Hromadné operace

- Hromadný export splátkových kalendářů (např. pro reporting)
- Hromadné upomínky (notifikace neuhrazených splátek)
- Hromadné generování dohod pro více nájemníků (např. při změně služeb a doplatku)

---

### Reference na další dokumentaci

- [Modul Smlouva](./smlouva.md)
- [Modul Platby](./platby.md)
- [Modul Nájemník](./najemnik.md)
- [Modul Jednotka](./jednotka.md)

---

> Pokud budeš chtít rozšířit workflow, šablonu nebo JSON strukturu, napiš konkrétní požadavek!

## 🗺️ Diagram vztahů (textově)

```
+------------------+
|   Pronajímatel   |
+------------------+
         ^
         |
+------------------+
|     Smlouva      |
+------------------+
         |
+------------------+
|    Nájemník      |
+------------------+
         |
+------------------+
|   Jednotka/Nem.  |
+------------------+
         |
+------------------+
|   Platby/Služby  |
+------------------+
         |
+------------------+
|   Dokumenty      |
+------------------+
```

---

## ⚠️ Typické chybové stavy a výjimky

| Chyba / výjimka                            | Doporučené řešení / reakce systému    | Uživatelská hláška                                    | Logování |
|--------------------------------------------|---------------------------------------|-------------------------------------------------------|----------|
| **Duplicitní číslo smlouvy**               | Zamezit uložení, zvýraznit pole       | „Toto číslo smlouvy již existuje.“                    | Povinné  |
| **Neexistující navázaná entita**           | Upozornit, zamezit uložení            | „Zadaný nájemník/jednotka/pronajímatel neexistuje.“   | Povinné  |
| **Neplatné datum platnosti**               | Zamezit uložení                       | „Datum ukončení musí být později než začátek.“        | Povinné  |
| **Chybí povinný údaj (např. jednotka)**    | Zvýraznit pole, zamezit uložení       | „Vyplňte všechny povinné údaje.“                      | Povinné  |
| **Smazání platné smlouvy**                 | Zamezit akci                          | „Nelze smazat platnou smlouvu.“                       | Povinné  |
| **Podepisování bez oprávnění**             | Zamezit akci                          | „Nemáte práva k podpisu této smlouvy.“                | Povinné  |
| **Chyba při importu/exportu**              | Zobrazit detail chyby                 | „Import/export selhal – zkontrolujte formát/datovou větu.“ | Povinné  |

---

## 📦 Hromadné operace se smlouvami a protokoly

- **Hromadný import/export smluv** (CSV, XLSX, PDF)
- **Hromadné generování smluv/protokolů z hromadných údajů**
- **Hromadný tisk/podpis více smluv najednou**
- **Hromadné notifikace (expirace, nové smlouvy atd.)**
- **Hromadné archivace ukončených smluv**

---

## 📚 Reference na další dokumentaci

- [Modul Pronajímatel](./pronajimatel.md)
- [Modul Nájemník](./najemnik.md)
- [Modul Jednotka](./jednotka.md)
- [Modul Nemovitost](./nemovitost.md)
- [Modul Platby](./platby.md)
- [Modul Služby](./sluzby.md)
- [Modul Dokumenty](./dokumenty.md)

---

## 🐛 Známé problémy / TODO

- [ ] Rozšířit validace (datumy, duplicity, povinné údaje)
- [ ] Workflow pro dodatky, výpovědi a prodloužení smluv
- [ ] Automatizace generování a tisku protokolů (včetně fotodokumentace)
- [ ] Elektronický podpis a integrace s BankID/MojeID
- [ ] Hromadné operace – import, export, notifikace
- [ ] Historie a auditní log pro každou verzi vzoru
- [ ] Napojení na externí registry pro validaci stran
- [ ] Automatizované generování platebních předpisů
- [ ] UI/UX vylepšení průvodce generováním smlouvy
- [ ] GDPR a anonymizace údajů po ukončení smluv
- [ ] Testování workflow a chybových stavů

---

> Dokument bude průběžně aktualizován podle vývoje a potřeb projektu.
