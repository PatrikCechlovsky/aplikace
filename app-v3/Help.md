> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)

# Modul: Nápověda (`Help`)

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Přehled celé aplikace | Hlavní přehled, seznam modulů, scénáře |
| ✅   | 🟦 Popis jednotlivých modulů | Vysvětlení, návaznosti, tipy           |
| ✅   | 🟦 Propojení modulů | Schémata, workflow, datové toky         |
| ✅   | 🟦 Nejčastější dotazy (FAQ) | Typické otázky a odpovědi              |
| ✅   | 🟦 Rychlé tipy a doporučení | Tipy, odkazy na důležité akce          |
| ✅   | 🟦 Kontakt na podporu | Kontakty, postup nahlášení chyby        |
| ✅   | 🗒️ Poznámky, nápady a úkoly | Prostor pro další poznámky a TODO       |

---

## 🟦 Přehled celé aplikace

### ✅ Checklist pro dokumentaci sekce/dlaždice
- ✅ Popis k čemu aplikace slouží, hlavní výhody
- ✅ Seznam modulů, stručný popis, scénáře použití

---

## 🟦 Popis jednotlivých modulů

### ✅ Checklist pro dokumentaci sekce/dlaždice
- ✅ Ke každému modulu stručné vysvětlení, funkce, návaznosti
- ✅ Praktické tipy k použití

---

## 🟦 Propojení modulů

### ✅ Checklist pro dokumentaci sekce/dlaždice
- ✅ Schémata, seznamy propojení, workflow napříč moduly
- ✅ Příklady přenosu dat, návaznosti

---

## 🟦 Nejčastější dotazy (FAQ)

### ✅ Checklist pro dokumentaci sekce/dlaždice
- ✅ Výběr typických otázek, odpovědi
- ✅ Odkazy na další části nápovědy

---

## 🟦 Rychlé tipy a doporučení

### ✅ Checklist pro dokumentaci sekce/dlaždice
- ✅ Odkazy na důležité akce, základní zabezpečení, workflow pro nové uživatele

---

## 🟦 Kontakt na podporu

### ✅ Checklist pro dokumentaci sekce/dlaždice
- ✅ Kontakty (e-mail, telefon, chat), postup pro nahlášení chyby

---

## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Zde piš vše, co je potřeba doplnit, změnit nebo vyřešit.  
> ⏳ = rozpracováno, přeškrtni hotové.

- ⏳ Přidat interaktivní průvodce (walkthrough) pro nové uživatele
- ⏳ Videonávody a ukázky klíčových scénářů
- ⏳ Automatické vyhledávání v nápovědě podle kontextu uživatele
- ⏳ Zpětné odeslání dotazu/připomínky na podporu přímo z aplikace
- ⏳ Napojení na externí znalostní bázi nebo wiki
- ⏳ Možnost uživatelských tipů a hodnocení článků nápovědy

> Otázky k doplnění:
> - Chceme podporovat kontextovou nápovědu v každém modulu?
> - Budeme nabízet video návody nebo pouze textové?
> - Má být nápověda dostupná i veřejně (bez přihlášení)?
> - Má být možnost automatického generování FAQ podle statistik dotazů uživatelů?
> - Chceme umožnit „hodnotit“ užitečnost jednotlivých článků nápovědy?

---

## 🗃️ Datové modely (ukázka)

```json
{
  "id": "faq_001",
  "otazka": "Jak zadat novou platbu?",
  "odpoved": "Přejděte do sekce Platby, klikněte na Přidat platbu, vyplňte potřebné údaje a uložte."
}
```
```json
{
  "id": "kontakt_001",
  "typ": "e-mail",
  "kontakt": "podpora@aplikace.cz"
}
```

---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                | Řešení systému / reakce      | Uživatelská hláška                              |
|---------------------------------|------------------------------|-------------------------------------------------|
| Nápověda nenalezena             | Upozornit, nabídnout kontakt | „Nápověda k tomuto tématu nebyla nalezena. Kontaktujte podporu.“ |
| Chybný kontakt na podporu       | Upozornit, logovat           | „Kontakt na podporu není dostupný.“             |
| Neplatný dotaz                  | Nabídnout další možnosti     | „Dotaz nebyl rozpoznán, zkuste jej přeformulovat.“ |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Uživatel | Admin | Support |
|------------------------------|:--------:|:-----:|:-------:|
| Zobrazit nápovědu            |   ✅     |  ✅   |   ✅    |
| Přidat/změnit článek         |   ❌     |  ✅   |   ✅    |
| Hodnotit užitečnost          |   ✅     |  ✅   |   ✅    |
| Kontaktovat podporu          |   ✅     |  ✅   |   ✅    |

---

## 📑 Doporučené workflow

1. Uživatel najde odpověď v nápovědě → vyřeší dotaz
2. Nenajde odpověď → kontaktuje podporu → obdrží odpověď
3. Nový dotaz/FAQ je přidán do znalostní báze
4. Pravidelná aktualizace a rozšiřování FAQ podle potřeb uživatelů

---

## 📚 Reference

- [Přehled všech modulů](./)
- [Nastavení](./nastaveni.md)
- [Komunikace](./komunikace.md)
- [Můj účet](./muj-ucet.md)
- [Dokumenty](./dokumenty.md)

---

> Modul Nápověda je rychlý průvodce pro nové i zkušené uživatele, pomáhá s orientací v aplikaci a zvyšuje efektivitu práce.
