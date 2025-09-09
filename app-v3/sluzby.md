# Modul: Služby

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

4. Ukázky datových struktur
Vzory JSON pro komplexní evidenci (např. záloha s historií změn, měřidlo s odečty, vyúčtování s rozúčtováním)
Příklady exportů/importů (CSV, XLSX)


5. Chybové stavy a výjimky
Co se stane, když není zadán odečet?
Co když je přeplatek/nedoplatek?
Jak se řeší zpožděné platby, penalizace?
Kdy je možné (ne)vrátit kauci?


6. Hromadné operace
Hromadné zadání záloh/odečtů
Hromadné generování vyúčtování a upomínek

> Modul Služby je klíčový pro správnou a transparentní evidenci všech poplatků, záloh, služeb a energií v rámci nemovitosti. Je těsně propojen s moduly Platby a Vyúčtování.
