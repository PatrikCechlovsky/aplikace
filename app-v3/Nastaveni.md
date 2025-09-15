> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)  
> ℹ️ Viz [Centrální katalog tlačítek a ikon](./common-actions.md)  
> ℹ️ Viz [Centrální katalog oprávnění](./permissions-catalog.md)

# Modul: Nastavení

---

## 🌲 Stromová struktura modulu

| Stav | Sekce                                | Popis                                                      |
|------|--------------------------------------|------------------------------------------------------------|
| ✅   | 🟦 Číselníky a číslování dokumentů    | Nastavení číselných řad dokladů, obecné číselníky          |
| ✅   | 🟦 Zálohování, import a export        | Zálohy databáze a dokumentů, import/export dat             |
| ✅   | 🟦 Zobrazení a vzhled aplikace        | Barevná schémata, velikost písma, rozložení, hlavní panel  |
| ✅   | 🟦 Nastavení oblíbených (strom menu)  | Uživatelé si volí oblíbené sekce a pořadí                  |
| ✅   | 🟦 Mobilní zobrazení a optimalizace   | Mobilní režim, zjednodušené ovládání, FAB, omezení funkcí  |
| ✅   | 📝 Poznámky, nápady a úkoly           | Prostor pro další poznámky a TODO                          |

---

## 🟦 Číselníky a číslování dokumentů

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce/dlaždice (nastavení číselných řad a číselníků pro doklady, typy služeb, zařízení, kategorií, stavů…)
- [x] Kdo má přístup/viditelnost podle oprávnění/rolí (admin, pronajímatel, správce)
- [x] Zařazení v hlavní stromové struktuře
- [x] Podsekce: správa předpon/přípon, formát, počáteční čísla, automatické generování
- [x] Výčet polí: prefix, přípona, formát číselné řady, číslo od/do, aktuální číslo
- [x] Validace unikátnosti, povinných polí
- [x] Akce: vytvořit, editovat, deaktivovat číselník
- [x] Chybové stavy: konflikt v číselné řadě, neuložené změny

---

## 🟦 Zálohování, import a export

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce (zálohování systému a dat, import/export uživatelských dat)
- [x] Kdo má přístup (admin, pronajímatel, správce)
- [x] Podsekce: manuální/automatické zálohy, obnova, historie záloh
- [x] Formulář: volba typu zálohy, umístění, interval, poslední záloha
- [x] Akce: stáhnout zálohu, obnovit, importovat (CSV, XLSX, XML)
- [x] Validace formátu dat, povinných polí
- [x] Chybové stavy: chyba importu/exportu, neuložené nastavení

---

## 🟦 Zobrazení a vzhled aplikace

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce (personalizace vzhledu, rozložení, velikost písma, kontrast)
- [x] Kdo má přístup (všichni uživatelé)
- [x] Formulář: volba barev, velikosti písma, panelů, zobrazených sekcí
- [x] Podsekce: nastavení pro jednotlivce/skupinu/globálně
- [x] Akce: uložit, resetovat
- [x] Validace: povinná pole, kompatibilita nastavení
- [x] Chybové stavy: neuložené nastavení

---

## 🟦 Nastavení oblíbených (strom menu)

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce (rychlý přístup k oblíbeným sekcím, drag&drop pořadí)
- [x] Kdo má přístup (všichni uživatelé, admin může nastavit globálně)
- [x] Podsekce: skrývání nevyužívaných částí, ukládání preferencí
- [x] Formulář: výběr modulů/dlaždic, pořadí, zobrazení/skrytí
- [x] Akce: uložit, reset, nastavit pro všechny
- [x] Validace: povinná pole
- [x] Chybové stavy: neuložené změny

---

## 🟦 Mobilní zobrazení a optimalizace

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- [x] Účel sekce (optimalizace pro mobilní zařízení, omezení funkcí, zjednodušení)
- [x] Kdo má přístup (všichni uživatelé)
- [x] Podsekce: mobilní režim, velikost ovládacích prvků, FAB akce
- [x] Formulář: volba mobilního režimu, zobrazené sekce, upozornění na omezení
- [x] Akce: přepnout režim, skrýt/ukázat sekci, rychlé akce (FAB)
- [x] Validace: povinná pole, kompatibilita
- [x] Chybové stavy: upozornění na omezenou funkcionalitu v mobilu

---

## 📝 Poznámky, nápady a úkoly k modulu i dlaždicím

> Sem piš vše, co je potřeba doplnit, změnit nebo vyřešit.  
> ⏳ = rozpracováno, přeškrtni hotové.

- ⏳ Přidat možnost hromadného nastavení pro skupiny uživatelů (role, typ účtu)
- ⏳ Implementovat logování změn v nastavení (audit trail)
- ⏳ Umožnit nastavení notifikací na změny v systému
- ⏳ Integrace s externími správci identit (SSO, OAuth)
- ⏳ Možnost nastavení automatických kontrol konzistence dat
- ⏳ Přidat možnost exportu všech nastavení včetně uživatelských preferencí
- ⏳ Vytvořit detailní historii změn pro každé nastavení (audit log)
- ⏳ Upozornění na konflikty při hromadných změnách
- ⏳ Přidat náhled změn před uložením

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

---

> Modul Nastavení zajišťuje správu systémových parametrů, usnadňuje práci uživatelům a umožňuje personalizovat aplikaci na míru, včetně optimalizace pro telefony a tablety.
