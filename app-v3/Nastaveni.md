# Modul: Nastavení

---

## ⚙️ Úvod

Modul **Nastavení** slouží k obecné správě parametrů aplikace. Umožňuje administrátorům a uživatelům upravovat systémové číselníky, spravovat vzhled a chování aplikace, provádět zálohování/import/export dat a nastavovat uživatelská i globální preference.  
Důraz je kladen na jednoduchost, bezpečnost a přehlednost – včetně optimalizace pro mobilní zařízení.

---

## 🟦 Hlavní sekce / dlaždice

### 1. Číselníky a číslování dokumentů

- Nastavení číselných řad pro doklady (smlouvy, faktury, požadavky, vyúčtování…)
- Správa předpon, přípon, formátu číselné řady, počátečních čísel
- Možnost automatického generování čísel při vytváření nového záznamu
- Obecné číselníky (typy služeb, zařízení, kategorií, stavů…)

---

### 2. Zálohování, import a export

- Manuální a automatické zálohování databáze a dokumentů (volba kam zálohovat)
- Obnova dat ze zálohy (s potvrzením a zálohou před obnovením)
- Import dat (CSV, XLSX, XML, …) s mapováním polí na strukturu systému
- Export dat (výběr modulů, období, formát)
- Historie záloh a možnost stažení

---

### 3. Zobrazení a vzhled aplikace

- Výběr barevného schématu (světlý/tmavý režim, firemní barvy…)
- Nastavení velikosti písma, kontrastu, rozložení panelů
- Výběr zobrazených dlaždic, sekcí a informací na hlavní stránce
- Přizpůsobení hlavního panelu – stromová struktura oblíbených modulů („Rychlý přístup“)
- Možnost individuálního nastavení pro uživatele/skupinu

---

### 4. Nastavení oblíbených (strom menu)

- Uživatel si může vybrat, které sekce/moduly/dlaždice chce vidět jako první (oblíbené)
- Drag&drop pořadí, možnost skrývání nevyužívaných částí
- Uložení preferencí na účet uživatele (cloudově nebo lokálně)
- Nastavení pro všechny uživatele (admin) nebo individuálně

---

### 5. Mobilní zobrazení a optimalizace

- Automatické přizpůsobení rozložení (responsivní design, hamburger menu, zjednodušená horní lišta)
- Možnost přepnout na „mobilní režim“ i v desktopu (pro testování)
- Zvýraznění klíčových funkcí (obecně: méně dlaždic, důležité věci nahoře, větší ovládací prvky)
- Možnost skrýt/ukázat sekce pro mobil (např. pouze Platby, Údržba, Komunikace, Energie)
- Upozornění na omezenou funkcionalitu v mobilu (např. hromadné importy/exporty pouze na desktopu)
- Rychlé akce (FAB – floating action button) pro často používané funkce (přidat platbu, hlášení závady…)

---

## 🔗 Doporučení pro mobilní zobrazení

- **Jednoduché menu:**  
  Použít hamburger menu, rychlý panel pro oblíbené, zmenšit počet viditelných dlaždic.
- **Jedna akce na obrazovce:**  
  Preferovat zobrazení jednoho hlavního obsahu, ostatní v záložkách nebo skrytých sekcích.
- **Velká tlačítka a ovládací prvky:**  
  Minimalizovat chyby při ovládání prsty.
- **Možnost rychlého návratu na hlavní panel.**
- **Responzivní grafy a tabulky:**  
  Kompaktní zobrazení, možnost horizontálního posunu, skrytí méně důležitých sloupců.
- **Offline režim (volitelně):**  
  Pokud je požadavek, umožnit základní práci bez připojení a synchronizaci po návratu online.

---

## 🗃️ Datové modely (ukázka)

### 1. Uživatelské preference

```json
{
  "user_id": "uzivatel123",
  "oblíbené_moduly": ["platby", "údržba", "energie"],
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

---

## 📑 Doporučené workflow

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

---

## 📚 Reference

- [Modul Komunikace](./komunikace.md)
- [Modul Platby](./platby.md)
- [Modul Údržba](./udrzba.md)
- [Modul Energie](./energie.md)

---
📱 Rady k nastavení pro telefony:
Omezit počet „viditelných“ modulů na hlavní obrazovce:
V mobilní verzi nabídněte pouze nejčastěji používané (Platby, Údržba, Komunikace). Ostatní skryjte do menu.
Použít tzv. „bottom navigation“ (spodní lišta s 3–5 nejdůležitějšími ikonami), zbytek v hamburger menu.
Zajistit „sticky“ (vždy viditelnou) možnost návratu na hlavní panel nebo rychlou akci (např. + pro nový požadavek/platbu).
Důležité akce (např. nahlásit závadu, odeslat platbu) umístit na jedno kliknutí z hlavní obrazovky.
Možnost rychle přepnout mezi účty, jednotkami, nemovitostmi.
Testovat na různých zařízeních (iOS, Android, různé rozlišení) – kritické je, aby se nic neztrácelo a menu bylo intuitivní.

> Modul Nastavení zajišťuje správu systémových parametrů, usnadňuje práci uživatelům a umožňuje personalizovat aplikaci na míru, včetně optimalizace pro telefony a tablety.
