# Modul: Nastavení

> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

---

## 🌲 Stromová struktura modulu

| Stav | Sekce                                | Popis                                                      |
|------|--------------------------------------|------------------------------------------------------------|
| ✅   | 🟦 Číselníky a číslování dokumentů    | Nastavení číselných řad dokladů, obecné číselníky          |
| ✅   | 🟦 Zálohování, import a export        | Zálohy databáze a dokumentů, import/export dat             |
| ✅   | 🟦 Zobrazení a vzhled aplikace        | Barevná schémata, velikost písma, rozložení, hlavní panel  |
| ✅   | 🟦 Nastavení oblíbených (strom menu)  | Uživatelé si volí oblíbené sekce a pořadí                  |
| ✅   | 🟦 Mobilní zobrazení a optimalizace   | Mobilní režim, zjednodušené ovládání, FAB, omezení funkcí  |
| ✅   | 🟦 Práva, role a audit                | Správa oprávnění, auditní log změn, historie nastavení     |
| ✅   | 🟦 Integrace a externí napojení       | Napojení na ARES, SSO, externí služby                      |
| ✅   | 📝 Poznámky, nápady a úkoly           | Prostor pro další poznámky a TODO                          |

---

## 🟦 Číselníky a číslování dokumentů

- Nastavení číselných řad, prefixů, přípon, formátů pro všechny typy dokladů a entit
- Číselníky pro typy služeb, zařízení, kategorií, stavů, rolí
- Správa (vytvořit, editovat, deaktivovat), validace unikátnosti, kontrola konfliktů v číselné řadě
- Automatické generování čísel, kontrola aktuálního čísla, možnost nastavovat počáteční čísla

---

## 🟦 Zálohování, import a export

- Manuální i automatické zálohy databáze, dokumentů, příloh
- Obnova dat, historie záloh, možnost exportu/importu všech uživatelských i systémových dat (CSV, XLSX, XML)
- Validace formátu, kontrola konzistence, možnost mapování polí při importu
- Upozornění na chyby při importu/exportu, možnost stáhnout log chyb

---

## 🟦 Zobrazení a vzhled aplikace

- Personalizace vzhledu: barevná schémata, velikost písma, kontrast, rozložení panelů
- Nastavení pro jednotlivce/skupiny/globálně
- Náhled před uložením změn, možnost resetu vzhledu
- Správa zobrazených sekcí, výběr hlavního panelu
- Kompatibilita s mobilní verzí

---

## 🟦 Nastavení oblíbených (strom menu)

- Volba oblíbených sekcí a pořadí (drag&drop)
- Skrývání nevyužívaných částí, ukládání preferencí
- Nastavení pro jednotlivce i globálně (admin může nastavit všem)
- Ukládání preferencí do profilu uživatele

---

## 🟦 Mobilní zobrazení a optimalizace

- Optimalizace pro mobilní zařízení, omezení vybraných funkcí
- Zjednodušené ovládání, větší ovládací prvky, FAB (Floating Action Button)
- Výběr sekcí pro mobilní režim, upozornění na omezení funkcí
- Přepínání mezi desktop/mobile, sticky-lišta pro hlavní akce

---

## 🟦 Práva, role a audit

- Správa rolí a oprávnění pro všechny moduly a akce (napojení na permissions-catalog)
- Nastavení u jednotlivých uživatelů, skupin, globálních rolí
- Auditní log změn (kdo, kdy, co změnil v nastavení), historie všech zásahů
- Možnost exportu auditní historie
- Upozornění na konflikty při hromadných změnách

---

## 🟦 Integrace a externí napojení

- Možnost napojení na externí správce identit (SSO, OAuth, Active Directory)
- Integrace na ARES (automatické doplňování údajů firem, uživatelů)
- Nastavení notifikací na změny v systému (e-mail, SMS, interní)
- Možnost nastavení automatických kontrol konzistence dat
- Export všech nastavení včetně uživatelských preferencí

---

## 📝 Poznámky, nápady a úkoly k modulu i dlaždicím

> ⏳ = rozpracováno, přeškrtni hotové. Nic nemažeme!

- ⏳ Přidat možnost hromadného nastavení pro skupiny uživatelů (role, typ účtu)
- ⏳ Implementovat logování změn v nastavení (audit trail) a možnost exportu auditní historie
- ⏳ Umožnit nastavení notifikací na změny v systému (např. změna role, nový modul, podezřelé nebo citlivé změny)
- ⏳ Integrace s externími správci identit (SSO, OAuth, Active Directory)
- ⏳ Možnost nastavení automatických kontrol konzistence dat a upozornění na nesoulad
- ⏳ Přidat možnost exportu/importu všech nastavení včetně uživatelských preferencí a práv (pro migrace/klonování účtu)
- ⏳ Vytvořit detailní historii změn pro každé nastavení (audit log) a možnost filtrovat podle typu změny
- ⏳ Upozornění na konflikty při hromadných změnách, možnost náhledu změn před uložením
- ⏳ Možnost napojení na katalog firem (ARES) pro výběr údajů v číselnících a kontaktech
- ⏳ Nastavení workflow schvalování změn v systému (např. změna číselníku, globálního vzhledu, práv)
- ⏳ Možnost resetu všech nastavení na výchozí hodnoty (uživatel i admin)
- ⏳ Inline nápověda a odkazy na FAQ nebo Help modul přímo z nastavení (tooltips, info ikonky)
- ⏳ Podpora více jazyků (lokalizace nastavení i celé aplikace)
- ⏳ Správa uživatelských šablon (např. filtry, vlastní dashboardy, pohledy)
- ⏳ Správa API klíčů a webhooků pro externí integrace
- ⏳ Správa datových limitů/kvót (pro přílohy, zálohy, objem dat)
- ⏳ Nastavení GDPR (anonymizace, export osobních údajů, expirace dat)
- ⏳ Nastavení intervalů pro automatické akce (nejen zálohy, také expirační časy, TTL pro notifikace)
- ⏳ Vazby na dokumentaci a nápovědu (inline help, odkazy na FAQ, možnost vyhledávání v Help přímo z Nastavení)
- ⏳ Možnost vlastní úpravy šablon notifikací a e-mailů přímo v nastavení

---

## 🗄️ Datové modely (ukázka)

### 1. Uživatelské preference

```json
{
  "user_id": "uzivatel123",
  "oblibene_moduly": ["platby", "údržba", "energie"],
  "menu_pozice": ["platby", "energie", "údržba", "komunikace"],
  "barva": "tmavý",
  "velikost_pisma": "střední",
  "mobilni_rezim": true
}
```

### 2. Číselná řada

```json
{
  "id": "faktura_2025",
  "modul": "faktury",
  "prefix": "FA-2025-",
  "cislo_od": 10001,
  "cislo_do": 99999,
  "aktualni_cislo": 10057,
  "format": "FA-2025-{cislo}"
}
```

### 3. Nastavení záloh

```json
{
  "rezim": "automaticky",
  "interval": "denne",
  "umisteni": "cloud",
  "posledni_zaloha": "2025-09-09T02:00:00"
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                | Řešení systému / reakce      | Uživatelská hláška                              |
|---------------------------------|------------------------------|-------------------------------------------------|
| Neuložené nastavení             | Upozornit, nabídnout uložení | „Změny nebyly uloženy, chcete pokračovat?“      |
| Chyba při importu/exportu       | Detailní hláška, logování    | „Import se nezdařil, zkontrolujte formát dat.“  |
| Konflikt v číselné řadě         | Zabránit uložení, nabídnout řešení | „Číslo již existuje, upravte číselnou řadu.“|
| Nepodporovaná funkce v mobilu   | Varování, nabídnout desktop  | „Tato funkce je dostupná pouze na desktopu.“    |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Admin | Pronajímatel | Správce | Nájemník | Pouze čtení |
|------------------------------|:-----:|:------------:|:-------:|:--------:|:-----------:|
| Správa číselníků             |  ✅   |      ✅      |   ✅    |    ❌    |     ❌      |
| Nastavení záloh, importu     |  ✅   |      ✅      |   ✅    |    ❌    |     ❌      |
| Nastavení vzhledu            |  ✅   |      ✅      |   ✅    |    ✅    |     ❌      |
| Volba oblíbených             |  ✅   |      ✅      |   ✅    |    ✅    |     ❌      |
| Správa práv a audit          |  ✅   |      ✅      |   ✅    |    ❌    |     ❌      |
| Integrace s externími systémy|  ✅   |      ✅      |   ✅    |    ❌    |     ❌      |

---

## 📋 Doporučené workflow

1. **Nastavení číselníků a řad:**  
   - Admin/pronajímatel nastaví číselné řady pro všechny druhy dokumentů.
   - Systém automaticky generuje čísla při tvorbě nových záznamů.

2. **Zálohování a obnova:**  
   - Nastavení automatického režimu záloh (interval, umístění).
   - Před obnovou systém vždy vytvoří záložní kopii aktuálního stavu.

3. **Úprava vzhledu/oblíbených:**  
   - Uživatel si nastaví preferované moduly a pořadí, případně vzhled aplikace.
   - V mobilu jsou vidět pouze oblíbené moduly/dlaždice, ostatní v rozbalovacím menu.

4. **Import/export:**  
   - Uživatel nebo správce použije průvodce importem/exportem, systém nabídne mapování polí a kontrolu dat.

5. **Audit a práva:**  
   - Každá změna v nastavení je logována v auditním logu, admin může vyhledat historii pro konkrétního uživatele, sekci či akci.
   - Možnost schválení změny (workflow) před platností, upozornění na konflikty.

6. **Integrace:**  
   - Admin nastaví propojení na externí služby (ARES, SSO), nastaví pravidla pro doplňování údajů, případně povolí uživatelům napojení svých firemních identit.

7. **Nápověda a lokalizace:**  
   - Uživatel může z nastavení spustit inline nápovědu nebo přejít do modulu Help.
   - Možnost přepínání jazyků a úpravy některých šablon přímo v nastavení.

---

## 📚 Reference

- [Modul Komunikace](./komunikace.md)
- [Modul Platby](./platby.md)
- [Modul Údržba](./udrzba.md)
- [Modul Energie](./energie.md)

---

📱 **Rady k nastavení pro telefony:**  
Omezit počet „viditelných“ modulů na hlavní obrazovce:  
V mobilní verzi nabídněte pouze nejčastěji používané (Platby, Údržba, Komunikace). Ostatní skryjte do menu.  
Použít tzv. „bottom navigation“ (spodní lišta s 3–5 nejdůležitějšími ikonami), zbytek v hamburger menu.  
Zajistit „sticky“ (vždy viditelnou) možnost návratu na hlavní panel nebo rychlou akci (např. + pro nový požadavek/platbu).  
Důležité akce (např. nahlásit závadu, odeslat platbu) umístit na jedno kliknutí z hlavní obrazovky.  
Možnost rychle přepnout mezi účty, jednotkami, nemovitostmi.  
Testovat na různých zařízeních (iOS, Android, různé rozlišení) – kritické je, aby se nic neztrácelo a menu bylo intuitivní.

---

> Modul Nastavení zajišťuje správu systémových parametrů, usnadňuje práci uživatelům a umožňuje personalizovat aplikaci na míru, včetně optimalizace pro telefony a tablety. Pokud budeš chtít detailnější schémata práv, workflow nebo integrace, napiš!
