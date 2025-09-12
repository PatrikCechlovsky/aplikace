> ℹ️ **PRAVIDLA:** [pravidla-rychly-prehled.md](./pravidla-rychly-prehled.md) | [pravidla.md](./pravidla.md) | [návod pro Copilot](./pravidla-pro-copilot.md)
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

# Modul: Služby

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
Co doporučuji rozpracovat více:

1. Podrobný popis každé části
Zálohy
Co přesně evidujeme (za jaké služby, periodicita, možnost více záloh na jednu jednotku, změny v průběhu roku)
Jaký je cyklus (nastavení předpisu, změna zálohy, zrušení, archivace)
Co znamená „předpis“ (vazba na platby, možnost automatického generování)
Kauce
Jaký je životní cyklus kauce (vložení, zvýšení, snížení, vrácení, zápočet)
Možnost více kaucí na jednotku/smlouvu, řešení navazujících plateb
Jiné platby
Typy (např. opakovaná služba, jednorázová, mimořádná platba)
Jaká je vazba na vyúčtování, předpisy, platby
Stavy měřidel
Jak často a kdo zadává (uživatel/správce/hromadně)
Možnost importu (hromadný odečet), historie, vazba na vyúčtování
Typy měřidel (voda, teplo, plyn, elektřina)
Vyúčtování
Jak probíhá (periodicita, jaké služby se rozúčtovávají, jak se počítají doplatky/přeplatky)
Způsob generování dokladu, možnost reklamace, archivace
Vazba na platby a upomínky
    ## 🧾 Podrobný popis jednotlivých částí modulu Služby

    ---
    
    ### 1. Zálohy
    
    #### Co evidujeme?
    - **Typ služby:** Každá záloha je evidována zvlášť pro typ služby (teplo, voda, elektřina, úklid, odpad apod.).
    - **Periodicita:** Zálohy mohou být měsíční, kvartální, roční apod.
    - **Více záloh na jednotku:** Každá jednotka může mít více záloh (např. zvlášť za vodu, zvlášť za teplo atd.).
    - **Změny v průběhu roku:** Možnost změnit výši zálohy kdykoliv (např. po vyúčtování, změně nájemníka nebo zdražení služeb).  
      Všechny změny jsou auditovány a uchovávají historii.
    
    #### Cyklus zálohy (životní cyklus)
    1. **Nastavení předpisu:**  
       - Správce nastaví předpis (výše, periodicita, splatnost, začátek platnosti).
    2. **Aktivní záloha:**  
       - Systém generuje pravidelně předpisy (měsíční/čtvrtletní) na platbu zálohy.
       - Předpis může být generován hromadně pro více jednotek.
    3. **Změna zálohy:**  
       - Správce může změnit výši nebo periodicitu (vytváří se nová verze zálohy, stará se archivuje).
    4. **Zrušení/archivace:**  
       - Po ukončení nájmu/zániku služby se záloha archivuje.
       - Nelze smazat, pokud existují navázané platby nebo vyúčtování.
    
    #### Co znamená „předpis“?
    - **Předpis** je konkrétní požadavek na úhradu zálohy za určité období.
    - **Vazba na platby:** Každý předpis je propojen s modulem Platby – sleduje se, zda byl zaplacen, kdy, kolik, případně penalizace.
    - **Možnost automatického generování:** Systém může generovat předpisy automaticky podle nastavené periodicity a pravidel.
    
    ---
    
    ### 2. Kauce
    
    #### Životní cyklus kauce
    1. **Vložení kauce:**  
       - Při podpisu smlouvy je vložena jistina (kauce) – částka, datum složení, způsob úhrady.
    2. **Zvýšení/snížení kauce:**  
       - Správce může upravit výši kauce (například při zvýšení nájmu, domluvě s nájemníkem).
    3. **Vrácení kauce:**  
       - Po ukončení smlouvy může být kauce vrácena (v plné výši nebo částečně).
       - Zaznamenává se datum vrácení, částka, způsob vrácení.
    4. **Zápočet kauce:**  
       - Kauce nebo její část může být použita na úhradu dluhu, oprav apod. (v systému se provede zápočet, včetně poznámky a schvalování).
    5. **Archivace:**  
       - Po úplném vypořádání je kauce archivována, nelze měnit.
    
    #### Další specifika
    - **Možnost více kaucí:** Výjimečně lze evidovat více kaucí na jednu jednotku/smlouvu (např. navýšení v průběhu nájmu).
    - **Vazba na platby:** Každá operace s kaucí má navazující platbu (příjem, vrácení, zápočet).
    - **Auditní log:** Každá změna je auditována (datum, částka, kdo provedl).
    
    ---
    
    ### 3. Jiné platby
    
    #### Typy
    - **Opakovaná služba:** např. internet, parkování, domovní poplatky.
    - **Jednorázová platba:** např. mimořádný úklid, oprava, servis.
    - **Mimořádná platba:** např. doplatek za poškození, pokuta, jednorázová služba.
    
    #### Vazby
    - **Na vyúčtování:** Některé platby mohou být součástí ročního vyúčtování (např. rozúčtovaný společný internet).
    - **Na předpisy:** Pravidelné platby mají automaticky generovaný předpis (podobně jako zálohy).
    - **Na platby:** Každý předpis je propojen s modulem Platby, sleduje se úhrada, upomínky, penalizace.
    
    ---
    
    ### 4. Stavy měřidel
    
    #### Kdo a jak často zadává
    - **Zadávání uživatelem:** Nájemník může zadat hodnotu měřidla prostřednictvím portálu (např. měsíční odečet vody).
    - **Zadávání správcem:** Správce může zadat hodnoty hromadně (např. roční odečet všech měřidel v domě).
    - **Frekvence:** Obvykle měsíčně, kvartálně nebo ročně, dle typu služby a pravidel.
    
    #### Další možnosti
    - **Import odečtů:** Možnost hromadného importu stavů z CSV, XLSX souboru (například od dodavatele/služby).
    - **Historie:** Každý odečet se ukládá s datem, kdo zadal, případně přílohou (foto měřidla).
    - **Vazba na vyúčtování:** Stav měřidla je klíčový pro výpočet spotřeby a následné vyúčtování.
    - **Typy měřidel:**  
      - Voda studená/teplá  
      - Teplo  
      - Elektřina  
      - Plyn  
      - Jiná (např. kalorimetr, podružné měření)
    
    ---
    
    ### 5. Vyúčtování
    
    #### Jak probíhá
    - **Perioda:** Obvykle roční, v některých případech pololetní nebo čtvrtletní.
    - **Jaké služby:** Rozúčtovávají se všechny služby, které mají zálohové předpisy a evidované měřidlo nebo sdílený náklad (např. voda, teplo, odpad, úklid).
    - **Výpočet:**  
      - Odečte se počáteční a konečný stav měřidla (nebo spotřeba dle podílu).
      - Vypočte se skutečná spotřeba a porovná se se zaplacenými zálohami.
      - Vzniká přeplatek (vrací se nájemníkovi) nebo nedoplatek (vytváří se nový předpis na platbu).
    
    #### Další aspekty
    - **Generování dokladu:**  
      - Systém vygeneruje vyúčtování jako PDF/XLSX, včetně detailního rozpisu.
      - Vyúčtování lze automaticky rozeslat nájemníkovi.
    - **Reklamace:**  
      - Nájemník může reklamovat vyúčtování, správce řeší a eviduje změny.
    - **Archivace:**  
      - Po schválení a rozeslání je vyúčtování archivováno.
    - **Vazba na platby:**  
      - Pokud vznikne nedoplatek, systém vygeneruje předpis na platbu, sleduje se úhrada, případně penalizace a upomínky.
    
    ---
    
    Tato sekce může být rozšířena o diagramy, ukázky workflow, příklady datových vět a typické chybové stavy pro každou část.

2. Podrobné workflow a životní cyklus
Typické scénáře:
Založení nové zálohy/služby
Změna zálohy v průběhu roku (např. po vyúčtování)
Založení a vrácení kauce
Zadání a schválení odečtu měřidla
Hromadné generování vyúčtování
Řešení nedoplatků/přeplatků
Napojení na modul Platby (co se stane, když není zaplaceno?)
## 🔄 Podrobné workflow a životní cyklus – typické scénáře v modulu Služby
    
    ---
    
    ### 1. Založení nové zálohy/služby
    
    **Workflow:**
    1. Správce otevře detail jednotky nebo nájemníka.
    2. Vybere „Přidat zálohu/službu“.
    3. Vyplní typ služby (např. teplo, voda), výši zálohy, periodicitu, datum začátku, splatnost.
    4. Systém vytvoří záznam zálohy a automaticky nastaví generování předpisů dle periodicity.
    5. První předpis zálohy je vygenerován ihned, další podle nastavené periody.
    6. Záloha je navázána na platnou smlouvu, jednotku a nájemníka.
    7. Systém začne vygenerované předpisy zobrazovat v přehledu služeb a odesílat notifikace o splatnosti.
    
    **Poznámky:**  
    - Možnost hromadného zadání záloh pro více jednotek najednou.
    - Auditní log eviduje, kdo zálohu založil.
    
    ---
    
    ### 2. Změna zálohy v průběhu roku (např. po vyúčtování)
    
    **Workflow:**
    1. Správce otevře detail existující zálohy.
    2. Zvolí „Změnit zálohu“ – zadá novou výši zálohy, případně změní periodicitu/splatnost.
    3. Systém vytvoří novou verzi zálohy s novými parametry a nastaví nové předpisy od zvoleného data změny.
    4. Staré předpisy zůstanou v historii, nelze je měnit.
    5. Systém upozorní nájemníka na změnu výše zálohy a začne generovat nové předpisy.
    
    **Poznámky:**  
    - Historie všech změn je auditovaná (kdo, kdy, co změnil).
    - Možnost automatického přepočtu záloh na základě posledního vyúčtování.
    
    ---
    
    ### 3. Založení a vrácení kauce
    
    **Založení kauce – workflow:**
    1. Při zakládání nové smlouvy správce vyplní výši kauce, datum složení, způsob úhrady.
    2. Systém vygeneruje předpis na složení kauce (vazba na platby).
    3. Po přijetí platby je stav kauce označen jako „uložena“.
    4. Kauce je navázána na konkrétní smlouvu a jednotku.
    
    **Vrácení kauce – workflow:**
    1. Po ukončení smlouvy správce otevře detail kauce.
    2. Zadá datum a částku vrácení (celá/částečná), případně důvod snížení (zápočet na dluhy/opravy).
    3. Systém vygeneruje platební příkaz na vrácení kauce, změní stav na „vráceno“ nebo „započteno“.
    4. Historie kauce je uchována včetně všech změn.
    
    **Poznámky:**  
    - Možnost více kaucí na jednu jednotku (např. navýšení v průběhu nájmu).
    - Změny jsou auditované.
    
    ---
    
    ### 4. Zadání a schválení odečtu měřidla
    
    **Workflow:**
    1. Nájemník nebo správce zadá aktuální stav měřidla (voda, teplo, elektřina…) přes portál nebo hromadně (import).
    2. Systém uloží odečet jako „čeká na schválení“ (pokud to workflow vyžaduje).
    3. Správce schválí odečet (nebo zadá opravu, pokud je hodnota podezřelá).
    4. Schválený odečet se použije při generování vyúčtování.
    5. Systém archivuje historii všech odečtů (kdo, kdy, jaká hodnota, příloha/fotka).
    
    **Poznámky:**  
    - Možnost upozornění na chybějící odečet.
    - Hromadné zadání odečtů pro celý dům/jednotky.
    
    ---
    
    ### 5. Hromadné generování vyúčtování
    
    **Workflow:**
    1. Správce spustí funkci „Vytvořit vyúčtování“ za zvolené období (např. celý dům, více jednotek).
    2. Systém načte všechny relevantní zálohy, odečty měřidel, ceny služeb, případné sdílené náklady.
    3. Pro každou jednotku vypočte spotřebu, porovná zaplacené zálohy, spočítá doplatek/přeplatek.
    4. Vygeneruje vyúčtovací doklad (PDF/XLSX) a zaeviduje jej do systému.
    5. Vyúčtování je buď přímo rozesláno nájemníkům, nebo čeká na schválení správce.
    6. Pokud vznikne nedoplatek, systém vytvoří nový předpis na platbu.
    
    **Poznámky:**  
    - Možnost reklamace vyúčtování (workflow řešení reklamace).
    - Všechny kroky jsou auditované.
    
    ---
    
    ### 6. Řešení nedoplatků/přeplatků
    
    **Workflow:**
    1. Po vyúčtování systém automaticky vytvoří předpis na platbu nedoplatku (s platností a splatností).
    2. Nájemník je notifikován o potřebě úhrady.
    3. Po přijetí platby je nedoplatek označen jako splacený.
    4. Pokud vznikl přeplatek, systém navrhne způsob vypořádání (vrácení, započtení do dalších záloh).
    5. Správce rozhodne, zda přeplatek vrátí, nebo převede na další období.
    
    **Poznámky:**  
    - Možnost automatického započtení přeplatku do budoucích záloh.
    - Všechny kroky jsou evidované v systému.
    
    ---
    
    ### 7. Napojení na modul Platby (co se stane, když není zaplaceno?)
    
    **Workflow:**
    1. Každý předpis (záloha, kauce, nedoplatek) je automaticky předán do modulu Platby.
    2. Systém sleduje splatnost a úhradu (ručně nebo automatickým párováním s bankou).
    3. Pokud není platba uhrazena v termínu, systém:
       - Označí předpis jako „po splatnosti“.
       - Automaticky vygeneruje upomínku pro nájemníka (e-mail, SMS).
       - Zaznamená penalizaci (pokuta za zpoždění), pokud je nastavena.
    4. Správce vidí přehled všech neuhrazených plateb a může eskalovat vymáhání (výzva k úhradě, právní kroky apod.).
    
    **Poznámky:**  
    - Všechny stavy a akce jsou logované.
    - Možnost hromadné správy upomínek a penalizací.
    
    ---
    
    > Každý workflow lze dále rozpracovat do schématu (sekvenční diagram, stavový diagram) nebo pseudokódu. Pokud chceš detailní scénář pro konkrétní bod, napiš!

3. Vztahy mezi entitami
Jednotka ↔ Služba ↔ Nájemník ↔ Platba ↔ Vyúčtování
Kdo je plátcem, kdo je příjemcem, kdo má přístup k historii, kdo schvaluje změny
Možnost sledovat historii tarifů, záloh, měřidel
    ## 🔗 Vztahy mezi entitami v modulu Služby
    
    ---
    
    ### 1. Vazby a tok dat
    
    #### Základní relace
    - **Jednotka**  
      ↔ eviduje, jaké služby, zálohy, měřidla a platby se k ní vztahují  
    - **Služba (záloha, poplatek, kauce)**  
      ↔ vždy přiřazena ke konkrétní jednotce (nebo nemovitosti) a smlouvě  
      ↔ má nastaveného plátce (nájemník, případně více osob)  
    - **Nájemník**  
      ↔ je plátcem služeb/záloh/plateb  
      ↔ má přístup ke své historii předpisů, plateb, vyúčtování  
    - **Platba**  
      ↔ je přiřazena ke konkrétnímu předpisu zálohy/služby/kauce/ostatní platby  
      ↔ páruje se s příslušným nájemníkem (plátcem) a službou  
    - **Vyúčtování**  
      ↔ vztahuje se k jednotce, období, službě a nájemníkovi  
      ↔ zohledňuje všechny platby, zálohy, odečty měřidel, tarify  
      ↔ produkuje přeplatek/nedoplatek (nový předpis)
    
    #### Schéma (textově)
    ```
    Jednotka
      │
      ├── Služby/Zálohy/Kauce/Jiné platby
      │       │
      │       ├── Měřidla (odečty, tarify)
      │       │
      │       └── Předpis (vazba na Platby)
      │
      └── Vyúčtování (na základě Služeb, Záloh, Měřidel)
              │
              └── Výsledek (přeplatek/nedoplatek) → nový předpis platby
    ```
    
    ---
    
    ### 2. Role a přístupová práva
    
    | Entita       | Plátce         | Příjemce      | Přístup k historii        | Schvaluje změny      |
    |--------------|----------------|---------------|--------------------------|----------------------|
    | Jednotka     | Nájemník       | Pronajímatel  | Správce, nájemník        | Správce, admin       |
    | Služba/záloha| Nájemník       | Pronajímatel  | Správce, nájemník        | Správce, účetní      |
    | Kauce        | Nájemník       | Pronajímatel  | Správce, nájemník        | Správce, admin       |
    | Platba       | Nájemník       | Pronajímatel  | Správce, nájemník, účetní| Správce, účetní      |
    | Vyúčtování   | Nájemník       | Pronajímatel  | Správce, nájemník        | Správce, účetní      |
    
    - **Plátce:** typicky nájemník, ale může být i více osob (spolubydlící, ručitel)
    - **Příjemce:** obvykle pronajímatel nebo správce nemovitosti
    - **Přístup k historii:** nájemník vidí jen své předpisy/platby, správce vidí vše, účetní může mít čtení/výpis
    - **Schvaluje změny:** změny záloh, služeb, tarifů a vyúčtování schvaluje správce/účetní, některé změny může iniciovat i nájemník (např. samoodečet měřidla – schvaluje správce)
    
    ---
    
    ### 3. Historie tarifů, záloh, měřidel
    
    - **Tarify služeb:**  
      Všechny změny tarifů (např. růst ceny vody, tepla) jsou evidovány s datem platnosti, kdo změnu provedl, a jaký byl předchozí tarif.
      - Při generování vyúčtování systém počítá s platným tarifem pro dané období.
    
    - **Historie záloh:**  
      Každá změna zálohy (výše, periodicita, služba) je auditována s časovým razítkem a uživatelem, který změnu provedl.  
      Umožňuje zpětnou kontrolu, proč se změnila výše záloh.
    
    - **Historie měřidel:**  
      Každý odečet měřidla je uložen s datem, hodnotou, uživatelem a přílohou (např. foto odečtu).  
      Umožňuje kontrolu správnosti vyúčtování a řešení reklamací.
    
    ---
    
    ### 4. Ukázka datových vazeb (JSON)
    
    ```json
    {
      "jednotka_id": "101",
      "najemnik_id": "6",
      "sluzby": [
        {
          "typ": "teplo",
          "zaloha": [
            {
              "castka": 1200,
              "frekvence": "mesicni",
              "platnost_od": "2025-01-01",
              "platnost_do": "2025-12-31",
              "historie": [
                { "castka": 1100, "platnost_od": "2024-01-01", "platnost_do": "2024-12-31" }
              ]
            }
          ],
          "meridla": [
            {
              "typ": "teplo",
              "odecety": [
                { "datum": "2025-01-01", "stav": 1000, "uzivatel": "spravce" },
                { "datum": "2025-12-31", "stav": 1200, "uzivatel": "najemnik" }
              ]
            }
          ]
        }
      ],
      "vyuctovani": [
        {
          "obdobi": "2025",
          "sluzba": "teplo",
          "zaloha_celkem": 14400,
          "spotreba": 200,
          "tarif": 65,
          "cena_skutecna": 13000,
          "doplatek": -1400
        }
      ],
      "platby": [
        {
          "typ": "zaloha",
          "castka": 1200,
          "splatnost": "2025-01-15",
          "stav": "zaplaceno"
        },
        {
          "typ": "nedoplatek",
          "castka": -1400,
          "splatnost": "2026-01-31",
          "stav": "nezaplaceno"
        }
      ]
    }
    ```
    
    ---
    
    ### 5. Důležité poznámky
    
    - **Každá entita (služba/záloha/platba)** musí být vždy přiřazena ke konkrétní jednotce a nájemníkovi (neexistuje „osamocená“ záloha).
    - **Předpisy i platby** mají vždy jasně daného plátce a příjemce.
    - **Historie je nedílnou součástí** – umožňuje zpětnou kontrolu, reklamace, řešení sporů a správné vyúčtování.
    - **Schvalovací workflow** může být nastavitelné podle typu změny (např. samoodečet schvaluje správce, změnu tarifu musí schválit admin/účetní).
    
    ---
    
    > Tato sekce by měla být doplněna o diagramy ERD (entity-relationship) nebo sekvenční schémata, pokud je potřeba pro vývoj.

4. Ukázky datových struktur
Vzory JSON pro komplexní evidenci (např. záloha s historií změn, měřidlo s odečty, vyúčtování s rozúčtováním)
Příklady exportů/importů (CSV, XLSX)
    ## 💾 Ukázky datových struktur pro modul Služby
    
    ---
    
    ### 1. Záloha se sledováním historie změn
    
    ```json
    {
      "id": "zl1001",
      "jednotka_id": "101",
      "najemnik_id": "6",
      "sluzba": "teplo",
      "smlouva_id": "501",
      "historie": [
        {
          "castka": 1000,
          "frekvence": "mesicni",
          "platnost_od": "2024-09-01",
          "platnost_do": "2025-02-28",
          "zadal": "spravce",
          "datum_zmeny": "2024-08-20"
        },
        {
          "castka": 1200,
          "frekvence": "mesicni",
          "platnost_od": "2025-03-01",
          "platnost_do": null,
          "zadal": "spravce",
          "datum_zmeny": "2025-02-25"
        }
      ]
    }
    ```
    
    ---
    
    ### 2. Měřidlo s historií odečtů
    
    ```json
    {
      "id": "sm401",
      "jednotka_id": "101",
      "typ_meric": "voda_tepla",
      "cislo_meridla": "VT101-23",
      "historie_odecetu": [
        {
          "datum": "2024-09-01",
          "stav": 1200,
          "zadal": "najemnik",
          "priloha": "foto_2024-09-01.jpg"
        },
        {
          "datum": "2025-03-01",
          "stav": 1500,
          "zadal": "spravce",
          "priloha": "foto_2025-03-01.jpg"
        }
      ]
    }
    ```
    
    ---
    
    ### 3. Vyúčtování s rozúčtováním služeb
    
    ```json
    {
      "id": "vu501",
      "jednotka_id": "101",
      "najemnik_id": "6",
      "obdobi_od": "2025-01-01",
      "obdobi_do": "2025-12-31",
      "sluzby": [
        {
          "typ": "teplo",
          "zaloha_celkem": 14400,
          "spotreba": 200,
          "tarif": 65,
          "cena_skutecna": 13000,
          "doplatek": -1400
        },
        {
          "typ": "voda",
          "zaloha_celkem": 3000,
          "spotreba": 35,
          "tarif": 80,
          "cena_skutecna": 2800,
          "preplatek": 200
        }
      ],
      "celkem_doplatek": -1200,
      "vytvoreno": "2026-01-15",
      "priloha": "vyuctovani_101_2025.pdf",
      "stav": "odeslano"
    }
    ```
    
    ---
    
    ### 4. Příklad exportu/importu záloh (CSV)
    
    ```
    id,jednotka_id,najemnik_id,sluzba,castka,frekvence,platnost_od,platnost_do,smlouva_id
    zl1001,101,6,teplo,1200,mesicni,2025-03-01,,501
    zl1002,102,7,voda,350,mesicni,2025-01-01,2025-12-31,502
    zl1003,103,8,elektrina,900,mesicni,2025-01-01,,503
    ```
    
    ---
    
    ### 5. Příklad exportu/importu měřidel – odečty (CSV)
    
    ```
    meridlo_id,jednotka_id,typ_meric,cislo_meridla,datum_odecet,stav,zadal,priloha
    sm401,101,voda_tepla,VT101-23,2025-03-01,1500,spravce,foto_2025-03-01.jpg
    sm402,102,teplo,T102-11,2025-03-01,560,najemnik,foto_2025-03-01.jpg
    sm403,103,voda_studena,VS103-07,2025-03-01,2100,spravce,
    ```
    
    ---
    
    ### 6. Příklad exportu vyúčtování (XLSX – popis struktury listu)
    
    | jednotka_id | najemnik_id | obdobi_od  | obdobi_do  | sluzba  | zaloha_celkem | spotreba | tarif | cena_skutecna | doplatek/preplatek |
    |-------------|-------------|------------|------------|---------|---------------|----------|-------|---------------|--------------------|
    | 101         | 6           |2025-01-01  |2025-12-31  | teplo   | 14400         | 200      | 65    | 13000         | -1400              |
    | 101         | 6           |2025-01-01  |2025-12-31  | voda    | 3000          | 35       | 80    | 2800          | 200                |
    | 102         | 7           |2025-01-01  |2025-12-31  | teplo   | 16000         | 210      | 65    | 13650         | -2350              |
    
    ---
    
    > Tyto ukázky reprezentují doporučený způsob evidence i výměny dat mezi moduly nebo se správci/externími partnery.

5. Ukázky datových struktur
Vzory JSON pro komplexní evidenci (např. záloha s historií změn, měřidlo s odečty, vyúčtování s rozúčtováním)
Příklady exportů/importů (CSV, XLSX)
    ## 💾 Ukázky datových struktur pro modul Služby
    
    ---
    
    ### 1. Záloha se sledováním historie změn
    
    ```json
    {
      "id": "zl1001",
      "jednotka_id": "101",
      "najemnik_id": "6",
      "sluzba": "teplo",
      "smlouva_id": "501",
      "historie": [
        {
          "castka": 1000,
          "frekvence": "mesicni",
          "platnost_od": "2024-09-01",
          "platnost_do": "2025-02-28",
          "zadal": "spravce",
          "datum_zmeny": "2024-08-20"
        },
        {
          "castka": 1200,
          "frekvence": "mesicni",
          "platnost_od": "2025-03-01",
          "platnost_do": null,
          "zadal": "spravce",
          "datum_zmeny": "2025-02-25"
        }
      ]
    }
    ```
    
    ---
    
    ### 2. Měřidlo s historií odečtů
    
    ```json
    {
      "id": "sm401",
      "jednotka_id": "101",
      "typ_meric": "voda_tepla",
      "cislo_meridla": "VT101-23",
      "historie_odecetu": [
        {
          "datum": "2024-09-01",
          "stav": 1200,
          "zadal": "najemnik",
          "priloha": "foto_2024-09-01.jpg"
        },
        {
          "datum": "2025-03-01",
          "stav": 1500,
          "zadal": "spravce",
          "priloha": "foto_2025-03-01.jpg"
        }
      ]
    }
    ```
    
    ---
    
    ### 3. Vyúčtování s rozúčtováním služeb
    
    ```json
    {
      "id": "vu501",
      "jednotka_id": "101",
      "najemnik_id": "6",
      "obdobi_od": "2025-01-01",
      "obdobi_do": "2025-12-31",
      "sluzby": [
        {
          "typ": "teplo",
          "zaloha_celkem": 14400,
          "spotreba": 200,
          "tarif": 65,
          "cena_skutecna": 13000,
          "doplatek": -1400
        },
        {
          "typ": "voda",
          "zaloha_celkem": 3000,
          "spotreba": 35,
          "tarif": 80,
          "cena_skutecna": 2800,
          "preplatek": 200
        }
      ],
      "celkem_doplatek": -1200,
      "vytvoreno": "2026-01-15",
      "priloha": "vyuctovani_101_2025.pdf",
      "stav": "odeslano"
    }
    ```
    
    ---
    
    ### 4. Příklad exportu/importu záloh (CSV)
    
    ```
    id,jednotka_id,najemnik_id,sluzba,castka,frekvence,platnost_od,platnost_do,smlouva_id
    zl1001,101,6,teplo,1200,mesicni,2025-03-01,,501
    zl1002,102,7,voda,350,mesicni,2025-01-01,2025-12-31,502
    zl1003,103,8,elektrina,900,mesicni,2025-01-01,,503
    ```
    
    ---
    
    ### 5. Příklad exportu/importu měřidel – odečty (CSV)
    
    ```
    meridlo_id,jednotka_id,typ_meric,cislo_meridla,datum_odecet,stav,zadal,priloha
    sm401,101,voda_tepla,VT101-23,2025-03-01,1500,spravce,foto_2025-03-01.jpg
    sm402,102,teplo,T102-11,2025-03-01,560,najemnik,foto_2025-03-01.jpg
    sm403,103,voda_studena,VS103-07,2025-03-01,2100,spravce,
    ```
    
    ---
    
    ### 6. Příklad exportu vyúčtování (XLSX – popis struktury listu)
    
    | jednotka_id | najemnik_id | obdobi_od  | obdobi_do  | sluzba  | zaloha_celkem | spotreba | tarif | cena_skutecna | doplatek/preplatek |
    |-------------|-------------|------------|------------|---------|---------------|----------|-------|---------------|--------------------|
    | 101         | 6           |2025-01-01  |2025-12-31  | teplo   | 14400         | 200      | 65    | 13000         | -1400              |
    | 101         | 6           |2025-01-01  |2025-12-31  | voda    | 3000          | 35       | 80    | 2800          | 200                |
    | 102         | 7           |2025-01-01  |2025-12-31  | teplo   | 16000         | 210      | 65    | 13650         | -2350              |
    
    ---
    
    > Tyto ukázky reprezentují doporučený způsob evidence i výměny dat mezi moduly nebo se správci/externími partnery.

6. Chybové stavy a výjimky
Co se stane, když není zadán odečet?
Co když je přeplatek/nedoplatek?
Jak se řeší zpožděné platby, penalizace?
Kdy je možné (ne)vrátit kauci?
  ## ⚠️ Chybové stavy a výjimky v modulu Služby
  
  ---
  
  ### 1. Není zadán odečet měřidla
  
  **Popis:**  
  Při generování vyúčtování nebo výpočtu spotřeby chybí aktuální nebo počáteční stav měřidla.
  
  **Řešení systému:**
  - Systém upozorní správce/nájemníka na chybějící odečet (notifikace, zvýraznění v UI).
  - Není možné dokončit vyúčtování bez zadání chybějícího odečtu.
  - Možnost zadat odečet zpětně, případně použít odhad (s nutností schválení a zaznamenání do historie).
  - Všechny výjimky (odhad, zpětný odečet) jsou auditovány.
  
  **Uživatelská hláška:**  
  „Pro tuto jednotku nebyl zadán aktuální stav měřidla. Bez odečtu nelze provést vyúčtování.“
  
  ---
  
  ### 2. Přeplatek / nedoplatek při vyúčtování
  
  **Popis:**  
  Po porovnání součtu zaplacených záloh a skutečné spotřeby vznikne přeplatek (nájemník má nárok na vrácení) nebo nedoplatek (nájemník musí doplatit).
  
  **Řešení systému:**
  - **Přeplatek:**  
    - Systém umožní správci rozhodnout o vrácení přeplatku (vytvoření příkazu k úhradě, započtení na další období, ponechání v systému).
    - Uživatel je informován o vzniku přeplatku a zvoleném způsobu vypořádání.
  - **Nedoplatek:**  
    - Systém automaticky vygeneruje nový předpis na úhradu nedoplatku (s platností a splatností).
    - Nájemník je notifikován o povinnosti úhrady.
    - Sleduje se úhrada, v případě neuhrazení navazuje workflow upomínek a penalizací.
  
  **Uživatelská hláška:**  
  - Přeplatek: „Byl Vám vypočten přeplatek ve výši X Kč. Správce rozhodne o způsobu jeho vypořádání.“  
  - Nedoplatek: „Vznikl nedoplatek ve výši X Kč. Prosíme o jeho úhradu do data Y.“
  
  ---
  
  ### 3. Zpožděné platby a penalizace
  
  **Popis:**  
  Nájemník neuhradil předpis (zálohu, nedoplatek, kauci) do data splatnosti.
  
  **Řešení systému:**
  - Systém automaticky označí předpis jako „po splatnosti“.
  - Vygeneruje a zašle upomínku (e-mail, SMS, systémové upozornění).
  - Po uplynutí určité doby může systém připočítat penále (podle smluvních podmínek).
  - Penalizace je v systému evidována jako samostatný předpis k úhradě.
  - Správce může eskalovat případ (druhá upomínka, výzva k úhradě, právní kroky).
  
  **Uživatelská hláška:**  
  - „Platba za službu X je po splatnosti. Prosíme o úhradu, jinak Vám bude účtováno penále.“
  - „Bylo Vám připočteno penále za opožděnou platbu ve výši Y Kč.“
  
  ---
  
  ### 4. Vrácení (nevrácení) kauce
  
  **Popis:**  
  Po ukončení smlouvy má nájemník nárok na vrácení kauce při splnění všech podmínek.
  
  **Řešení systému:**
  - Systém umožní správci zadat stav kauce: „vráceno“, „započteno na dluhy/opravay“, případně „ponecháno“ (např. při nedodržení podmínek).
  - Kauci lze vrátit pouze pokud:
      - Jsou uhrazeny všechny platby a nedoplatky.
      - Nebyly zjištěny škody na majetku (řešeno protokolem o předání).
  - V případě zápočtu systém umožní zadat důvod a částku zápočtu (auditní stopa).
  - Historie kauce je vždy dostupná pro zpětnou kontrolu.
  
  **Uživatelská hláška:**  
  - „Kauce Vám byla vrácena v plné výši.“
  - „Část kauce byla použita na úhradu nedoplatků/škod – viz detailní rozpis.“
  
  ---
  
  ### 5. Další typické chybové stavy
  
  | Chyba / výjimka                         | Řešení systému / reakce                 | Uživatelská hláška                                |
  |------------------------------------------|-----------------------------------------|---------------------------------------------------|
  | Duplicita předpisu pro jednotku/období   | Zamezit uložení/zvýraznit pole          | „Předpis pro toto období již existuje.“           |
  | Chybějící povinné pole                   | Zvýraznit, zamezit uložení              | „Není vyplněno povinné pole XY.“                  |
  | Neplatný formát platby                   | Zvýraznit, zamezit uložení              | „Zadaná částka/splatnost není platná.“            |
  | Pokus o smazání předpisu s navázanou platbou | Zamezit smazání, nabídnout archivaci   | „Nelze smazat – existuje navázaná platba.“        |
  
  ---
  
  > Všechny výjimky a chybové stavy jsou logovány pro audit a zpětnou kontrolu. Uživatel je vždy informován srozumitelnou hláškou, správce má možnost dohledat detaily v systému.

7. Hromadné operace
Hromadné zadání záloh/odečtů
Hromadné generování vyúčtování a upomínek
## 🗂️ Hromadné operace v modulu Služby

---

### 1. Hromadné zadání záloh/odečtů

#### Popis
- **Cíl:** Umožnit správci nebo účetnímu rychle a efektivně zadat nebo upravit více záloh/odečtů měřidel najednou, např. při změně tarifů, změně nájemníků, nebo po hromadném odečtu měřidel.
- **Vstup:** Ručně přes rozhraní (tabulka), nebo importem dat (CSV, XLSX).

#### Typický workflow
1. Správce otevře sekci „Hromadné zadání záloh“ nebo „Hromadné zadání odečtů“.
2. Vybere jednotky (možnost filtrovat podle domu, patra, druhu služby).
3. Vyplní (nebo nahraje soubor) s potřebnými údaji: typ služby, částka, periodicita, datum platnosti, případně stav měřidla a datum odečtu.
4. Systém zobrazí náhled dat a validuje duplicity/chybějící údaje.
5. Po potvrzení správce systém vytvoří/aktualizuje záznamy pro všechny vybrané jednotky.
6. Systém po úspěšném zadání nabídne možnost automatického vygenerování předpisů nebo upozornění nájemníků.

#### Ukázka struktury importu (CSV)
```
jednotka_id,najemnik_id,sluzba,castka,frekvence,platnost_od,platnost_do,smlouva_id
101,6,teplo,1200,mesicni,2025-09-01,,501
102,7,voda,400,mesicni,2025-09-01,,502
...

meridlo_id,jednotka_id,typ_meric,stav,datum_odecet,zadal
sm401,101,voda_tepla,1500,2025-09-01,spravce
sm402,102,teplo,600,2025-09-01,spravce
...
```

---

### 2. Hromadné generování vyúčtování a upomínek

#### Popis
- **Cíl:** Zajistit rychlou tvorbu vyúčtování (např. na konci roku pro všechny jednotky najednou) a hromadné odeslání upomínek na neuhrazené platby.
- **Vstup:** Spuštění akce (ručně), nebo automaticky podle kalendáře/periodicity.

#### Typický workflow – vyúčtování
1. Správce spustí akci „Hromadné vyúčtování“ pro vybrané období a skupinu jednotek.
2. Systém načte všechny zálohy, měřidla, platby a vypočte přeplatky/nedoplatky pro každou jednotku.
3. Pro každého nájemníka vygeneruje vyúčtovací doklad (PDF, XLSX), uloží jej do systému a nastaví vazbu na platby.
4. Po schválení správce jsou dokumenty automaticky rozeslány nájemníkům (e-mail, portál).

#### Typický workflow – upomínky
1. Správce otevře přehled neuhrazených plateb.
2. Vybere možnost „Hromadně odeslat upomínky“ (možnost filtrovat podle výše, stáří, typu služby).
3. Systém vygeneruje a odešle upomínky všem vybraným nájemníkům (e-mail, SMS, interní oznámení).
4. V systému se zaznamená historie upomínek (kdy, komu, za co).

#### Ukázka exportu/importu upomínek (CSV)
```
najemnik_id,email,typ_sluzby,castka,datum_splatnosti,pocet_upominek,posledni_upominka
6,najemnik1@email.cz,teplo,1200,2025-09-15,1,2025-09-20
7,najemnik2@email.cz,voda,350,2025-09-15,2,2025-09-25
...
```

---

### 3. Důležité aspekty
- Každá hromadná operace je auditována (kdo, kdy, jaké záznamy upravil/vytvořil).
- Systém vždy nabídne náhled a možnost storna před finálním uložením.
- Kontrola duplicit, validace vstupních dat.
- Možnost automatického nastavení notifikací a workflow navazujících akcí (např. po neuhrazení automaticky vygenerovat upomínku).

---
1. Diagramy a vizualizace
ERD (Entity-Relationship Diagram):
Graficky znázornit vazby mezi entitami (Jednotka, Služba, Záloha, Kauce, Měřidlo, Platba, Vyúčtování…)
Workflow diagramy:
Sekvenční diagramy pro hlavní scénáře (např. „Vyúčtování“, „Zadání odečtu“, „Hromadná operace“)
Ukázky obrazovek (skicy, wireframy):
Jak bude vypadat zadání zálohy, schválení odečtu, přehled vyúčtování
2. Testovací scénáře & akceptační kritéria
Popis konkrétních testovacích případů pro jednotlivé workflow (co je úspěch, co selhání)
Např.: „Co se stane, když zadám odečet zpětně?“, „Jak systém reaguje na duplicitní předpis?“
Příklady reálných dat pro testování (malý dataset v JSON/CSV)
3. Notifikace a šablony e-mailů/SMS
Vzory textů pro upomínky, potvrzení, informace o přeplatku/nedoplatku
Kdo všechny může být adresát (nájemník, správce, účetní)
Možnost individualizace/šablon (např. proměnné v textu)
4. API a integrace
Popis REST API (pokud bude systém komunikovat s dalšími aplikacemi)
Vzory request/response, struktura endpointů (např. GET /zaloha, POST /vyuctovani)
Pravidla pro export/import dat (CSV/XLSX) – co je povinné, co volitelné
5. Bezpečnost, audit, GDPR
Jak jsou logovány změny, kdo má jaký přístup, kdo může měnit/schvalovat
Jak dlouho se data uchovávají, jak je řešeno smazání/anonymizace
Možnosti exportu historie pro audit
6. FAQ a typické situace
Nejčastější dotazy správců, nájemníků
Typické chybové scénáře a doporučený postup
7. Roadmapa / Další rozvoj
Co plánujete do budoucna (např. automatické napojení na banku, integrace s účetnictvím, API pro mobilní appku)
Otevřené otázky a závislosti na jiných modulech
Doporučený postup:
Začni jednoduššími vizualizacemi (ERD, sekvenční diagram pro 1–2 klíčové scénáře), přidej k nim popis. Potom se zaměř na testovací scénáře a šablony notifikací – tyto části rychle pomohou dalším členům týmu i testování. Pokud plánujete API nebo integrace, začni připravovat i jejich popis.

Rád ti připravím konkrétní vzor (např. ERD, sekvenční diagram, šablonu notifikace, testovací scénář) – stačí říct, co bys chtěl rozpracovat jako první!

> Hromadné operace výrazně zvyšují efektivitu správy většího počtu jednotek a snižují chybovost při rutinních úkonech.
> Modul Služby je klíčový pro správnou a transparentní evidenci všech poplatků, záloh, služeb a energií v rámci nemovitosti. Je těsně propojen s moduly Platby a Vyúčtování.
