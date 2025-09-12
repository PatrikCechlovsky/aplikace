> ℹ️ **PRAVIDLA:** [pravidla-rychly-prehled.md](./pravidla-rychly-prehled.md) | [pravidla.md](./pravidla.md) | [návod pro Copilot](./pravidla-pro-copilot.md)

# Modul: Můj účet

---

## Stromová struktura modulu

| Stav | Sekce | Popis |
|------|-------|-------|
| ✅   | 🟦 Osobní údaje a kontakty | Správa jména, kontaktů, fotografie |
|      | ├── 👁️ Přehled osobních údajů | Přehled a úprava údajů |
|      | └── 📝 Formulář: Úprava osobních údajů | Formulář pro editaci údajů |
| ✅   | 🟦 Přihlašovací údaje a zabezpečení | Heslo, 2FA, zařízení, historie přihlášení |
|      | ├── 👁️ Přehled zabezpečení | Změna hesla, 2FA, zařízení |
|      | ├── 📝 Formulář: Změna hesla | Formulář pro změnu hesla |
|      | └── 📝 Formulář: Nastavení dvoufaktorové autentizace | Formulář pro 2FA |
| ✅   | 🟦 Notifikace a upozornění | Nastavení upozornění a jejich způsob |
|      | ├── 👁️ Přehled notifikací | Zobrazení a úprava notifikací |
|      | └── 📝 Formulář: Nastavení notifikací | Formulář pro notifikace |
| ✅   | 🟦 Nastavení a preference | Personalizace vzhledu, jazyk, domovská sekce |
|      | ├── 👁️ Přehled nastavení a preferencí | Zobrazení a editace preferencí |
|      | └── 📝 Formulář: Nastavení a preference | Formulář pro preference |
| ✅   | 🟦 Aktivita uživatele | Historie akcí a přístupů |
|      | └── 👁️ Přehled aktivity | Přehled posledních změn a akcí |
| ✅   | 🟦 Zrušení účtu | Proces zrušení účtu uživatele |
|      | ├── 👁️ Přehled procesu zrušení účtu | Postup, upozornění, GDPR |
|      | └── 📝 Formulář: Zrušení účtu | Formulář pro žádost o zrušení |
| ✅   | 🗒️ Poznámky, nápady a úkoly | Prostor pro další poznámky a TODO |

---

## 🟦 Osobní údaje a kontakty

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Validace, tlačítka, workflow
- ✅ Akce dostupné v detailu
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

#### 1️⃣ Popis a účel
Umožňuje uživateli spravovat své základní údaje, kontakty a profilovou fotografii.

#### 2️⃣ Přístup/viditelnost
Pouze daný uživatel a admin (případně správce).

#### 3️⃣ Pole a validace
| Pole            | Povinné | Typ/validace                | Poznámka                       |
|-----------------|:-------:|-----------------------------|---------------------------------|
| Jméno           |   Ano   | text                        |                                |
| Příjmení        |   Ano   | text                        |                                |
| Titul           |   Ne    | text                        |                                |
| E-mail          |   Ano   | e-mail (unikátní, validace) |                                |
| Telefon         |   Ne    | tel (validace)              |                                |
| Adresa          |   Ne    | text                        |                                |
| Profilová fotka |   Ne    | soubor (jpg/png), validace  |                                |
| Role            |   Ano   | readonly                    | Zobrazení v profilu            |
| Příslušnost     |   Ne    | readonly                    | Společnosti, nemovitosti, jednotky |

#### 4️⃣ Tlačítka a akce
- 💾 Uložit změny
- ❌ Zrušit
- 🗑️ Smazat foto (volitelné)

#### 5️⃣ Chybové stavy
- Neplatný formát e-mailu/telefonu
- Povinné pole není vyplněno
- Chyba při uploadu fotografie

#### 6️⃣ Oprávnění a vazby
- Úprava pouze vlastních údajů, admin může upravit vše
- Vazba na modul Nastavení, případně uživatelské preference

---

## 🟦 Přihlašovací údaje a zabezpečení

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Tlačítka, workflow
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

#### 1️⃣ Popis a účel
Zajišťuje správu přístupových údajů, změnu hesla, nastavení 2FA, přehled přihlášených zařízení a historii přístupů.

#### 2️⃣ Přístup/viditelnost
Pouze daný uživatel a admin.

#### 3️⃣ Přehled a formuláře
| Pole            | Povinné | Typ/validace                | Poznámka                  |
|-----------------|:-------:|-----------------------------|---------------------------|
| Heslo původní   |   Ano   | password                    | Změna hesla               |
| Heslo nové      |   Ano   | password, síla hesla        |                           |
| Potvrzení hesla |   Ano   | password                    |                           |
| 2FA způsob      |   Ne    | výběr (SMS/aplikace)        | Aktivace/deaktivace       |
| Kód 2FA         |   Ne    | číselný kód                 | Ověření                   |
| Přihlášená zařízení | Ne  | readonly                    | Seznam, možnost odhlásit  |
| Historie přihlášení | Ne  | readonly                    | Tabulka, záznam           |

#### 4️⃣ Tlačítka a akce
- 💾 Uložit změnu hesla
- ❌ Zrušit
- 🔑 Aktivovat 2FA
- 🔓 Deaktivovat 2FA
- 🚪 Odhlásit zařízení

#### 5️⃣ Chybové stavy
- Neplatné/neshodující se heslo
- Chyba při aktivaci 2FA
- Neoprávněný pokus o změnu údajů
- Chyba při odhlášení zařízení

#### 6️⃣ Oprávnění a vazby
- Pouze uživatel sám, admin pouze v případě resetu
- Vazba na auditní log změn

---

## 🟦 Notifikace a upozornění

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Tlačítka, workflow
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

#### 1️⃣ Popis a účel
Nastavení způsobu a typu notifikací, které chce uživatel dostávat.

#### 2️⃣ Přístup/viditelnost
Pouze daný uživatel.

#### 3️⃣ Přehled a formuláře
| Pole          | Povinné | Typ/validace     | Poznámka                      |
|---------------|:-------:|------------------|-------------------------------|
| Způsob zasílání | Ano    | vícevýběr        | e-mail, SMS, push, interní    |
| Události      | Ano     | vícevýběr        | např. platby, údržba, zprávy  |
| Dočasné vypnutí | Ne     | checkbox         |                               |

#### 4️⃣ Tlačítka a akce
- 💾 Uložit nastavení
- ❌ Zrušit

#### 5️⃣ Chybové stavy
- Chyba při ukládání nastavení
- Neplatná volba notifikace

---

## 🟦 Nastavení a preference

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Tlačítka, workflow
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

#### 1️⃣ Popis a účel
Personalizace vzhledu, jazyka a dalších preferencí.

#### 2️⃣ Přístup/viditelnost
Pouze daný uživatel.

#### 3️⃣ Přehled a formuláře
| Pole                | Povinné | Typ/validace | Poznámka        |
|---------------------|:-------:|--------------|-----------------|
| Vzhled (theme)      | Ne      | výběr        | světlý/tmavý    |
| Jazyk rozhraní      | Ano     | výběr        |                 |
| Domovská sekce      | Ne      | výběr        | modul/sekce     |
| Oblíbené moduly     | Ne      | vícevýběr    |                  |
| Časové pásmo        | Ne      | výběr        |                 |
| Formát data/času    | Ne      | výběr        |                 |

#### 4️⃣ Tlačítka a akce
- 💾 Uložit preference
- ❌ Zrušit

#### 5️⃣ Chybové stavy
- Chyba při ukládání preferencí

---

## 🟦 Aktivita uživatele

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech údajů/polí
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

#### 1️⃣ Popis a účel
Přehled posledních akcí, změn, přístupů a notifikací.

#### 2️⃣ Přístup/viditelnost
Pouze daný uživatel a admin.

#### 3️⃣ Přehled polí
| Pole      | Povinné | Typ/validace | Poznámka           |
|-----------|:-------:|--------------|--------------------|
| Typ akce  | Ano     | text         | přihlášení, změna  |
| Čas       | Ano     | datetime     |                    |
| IP adresa | Ne      | text         |                    |
| Detail    | Ne      | text         | popis akce         |

#### 4️⃣ Akce
- 👁️ Zobrazit detail, filtrovat podle typu, export

---

## 🟦 Zrušení účtu

### ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Účel sekce/dlaždice (proč existuje, kdo ji používá)
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech polí (přehled i formulář)
- ✅ Tlačítka, workflow
- ✅ Chybové stavy
- ✅ Oprávnění a viditelnost
- ✅ Vazby na další moduly a reference
- ✅ Specifika, rozšíření

#### 1️⃣ Popis a účel
Umožňuje uživateli požádat o zrušení účtu, stáhnout si data, být upozorněn na nevratnost kroku.

#### 2️⃣ Přístup/viditelnost
Pouze daný uživatel a admin.

#### 3️⃣ Přehled a formuláře
| Pole                  | Povinné | Typ/validace | Poznámka                       |
|-----------------------|:-------:|--------------|--------------------------------|
| Potvrzení zrušení     | Ano     | checkbox     | uživatel musí potvrdit         |
| Důvod zrušení         | Ne      | text         | volitelné                      |
| Export osobních dat   | Ne      | tlačítko     | možnost stáhnout před zrušením |
| Podmínky GDPR         | Ano     | readonly     | nutno odsouhlasit              |

#### 4️⃣ Tlačítka a akce
- 📝 Odeslat žádost o zrušení
- ❌ Zrušit
- 📥 Exportovat osobní data

#### 5️⃣ Chybové stavy
- Chyba při zpracování žádosti
- Nedostupný export osobních dat

---

## 🗒️ Poznámky, nápady a úkoly k modulu i dlaždicím

> Sem si piš vše, co tě napadne, co je potřeba doplnit, změnit nebo vyřešit.
> Pokud je úkol hotový, přeškrtni ho a označ stavovou ikonou.  
> Pokud je rozpracovaný, přidej ⏳, pokud čeká na rozhodnutí, přidej > TODO: …

- ⏳ Rozšíření historie aktivity o logování všech změn v osobních údajích (pro GDPR/audit).
- ⏳ Vylepšení zabezpečení: síla hesla, expirace, blokace po X pokusech, 2FA jako povinné pro změny údajů.
- ⏳ Uživatelské preference – podpora více jazyků, vlastní rozložení dashboardu.
- ⏳ Hierarchie účtů – možnost propojení účtů (rodič/dítě, správa za dítě/seniora).
- ⏳ Zrušení účtu – automatické notifikace správci, možnost oboustranného potvrzení.
- ⏳ GDPR – možnost anonymizace účtu, výmaz na žádost.
- ⏳ Export aktivity uživatele (např. pro reklamaci).
- ⏳ Možnost nastavit profil jako „neviditelný“ pro vyhledávání (privacy mode).
- ⏳ Rychlé přepínání mezi více účty (multilogin).
- ⏳ Přidat pole pro preferované komunikační kanály (např. upřednostňuji SMS).
- ⏳ Umožnit změnu e-mailu pouze po ověření nového e-mailu (double opt-in).
- ⏳ Přidat historii schválení/zamítnutí žádostí o zrušení účtu.

> Otázky k doplnění:
> - Potřebujeme podporu pro více typů účtů (firemní/osobní/rodinný)?
> - Je třeba uživateli umožnit export úplné historie notifikací a akcí?
> - Chceme implementovat automatickou blokaci účtu při podezřelé aktivitě?
> - Má být možné dočasně deaktivovat účet (bez výmazu)?
> - Máme definovány všechny GDPR procesy pro tento modul? (výmaz, export, souhlasy)

---

## 🗃️ Datové modely (ukázka)
```json
{
  "id": "user_123",
  "jmeno": "Patrik",
  "prijmeni": "Cechlovsky",
  "role": "pronajímatel",
  "email": "patrik@email.cz",
  "telefon": "+420123456789",
  "foto": "profil.jpg",
  "nastaveni": {
    "jazyk": "cs",
    "vzhled": "tmavý",
    "notifikace": ["email", "sms"],
    "domovska_sekce": "finance"
  }
}
```

```json
{
  "user_id": "user_123",
  "akce": [
    {
      "typ": "prihlaseni",
      "cas": "2025-09-09T07:13:00",
      "ip": "89.102.5.8"
    },
    {
      "typ": "zmena_hesla",
      "cas": "2025-09-01T22:00:00"
    },
    {
      "typ": "pridani_platby",
      "cas": "2025-08-28T09:20:00",
      "detail": "Platba SVJ září"
    }
  ]
}
```
---

## ⚠️ Chybové stavy a výjimky

| Chyba / výjimka                | Řešení systému / reakce      | Uživatelská hláška                              |
|---------------------------------|------------------------------|-------------------------------------------------|
| Neplatné heslo                  | Chyba, nabídnout reset       | „Zadané heslo je nesprávné. Chcete obnovit heslo?“|
| Nepovolená změna údajů          | Omezit, logovat pokus        | „Tuto změnu nemáte oprávnění provést.“          |
| Chyba při změně notifikace      | Upozornit, logovat           | „Nepodařilo se uložit nastavení notifikace.“    |
| Nezdařená 2FA autentizace       | Upozornit, nabídnout opakování | „Ověření dvoufaktorem selhalo.“                |
| Chyba při exportu dat           | Zobrazit informaci, logovat  | „Export osobních dat se nezdařil.“              |
| Povinné pole není vyplněno      | Zvýraznit pole, upozornit    | „Vyplňte prosím všechna povinná pole.“          |
| Chyba při uploadu fotografie    | Upozornit, logovat           | „Soubor nelze nahrát. Zkuste jiný formát.“      |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Uživatel | Admin |
|------------------------------|:--------:|:-----:|
| Úprava osobních údajů        |   ✅     |  ✅   |
| Změna hesla/2FA              |   ✅     |  ✅   |
| Nastavení notifikací         |   ✅     |  ✅   |
| Správa oblíbených            |   ✅     |  ✅   |
| Zrušení účtu                 |   ✅\*   |  ✅   |
| Export dat                   |   ✅     |  ✅   |
| Historie aktivity            |   ✅     |  ✅   |

\* podle nastavení systému

---

## 📑 Doporučené workflow

1. **Změna hesla/zabezpečení:**  
   - Uživatel zadá nové heslo, případně aktivuje dvoufaktorovou autentizaci.
2. **Nastavení notifikací:**  
   - Uživatel zvolí, jak a pro jaké události chce být informován (e-mail, SMS, push).
3. **Úprava kontaktů a osobních údajů:**  
   - Změna e-mailu, telefonu, nahrání fotky, úprava adresy.
4. **Správa oblíbených modulů a vzhledu:**  
   - Nastavení domovské sekce, barevného schématu, případně jazyka.
5. **Zobrazení aktivity:**  
   - Kontrola historie akcí a přístupů, možnost odhlásit se ze všech zařízení.
6. **Zrušení účtu:**  
   - Postupné potvrzení, export osobních dat, deaktivace účtu.
7. **Export dat:**  
   - Uživatel požádá o export, systém připraví a nabídne ke stažení.

---

## 📚 Reference

- [Modul Nastavení](./nastaveni.md)
- [Modul Komunikace](./komunikace.md)
- [Modul Platby](./platby.md)
- [Pravidla dokumentace a centrální katalogy](./pravidla.md)

---

> Modul Můj účet zajišťuje bezpečnost a přehled pro každého uživatele, umožňuje personalizaci a správu vlastních údajů i preferencí.
