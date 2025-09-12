> ℹ️ Viz [Pravidla dokumentace a centrální katalogy](./pravidla.md)

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
|      | ├── 📝 Formulář: Nastavení dvoufaktorové autentizace | Formulář pro 2FA |
|      | └── 📝 Formulář: Bezpečnostní otázky a recovery kódy | Záloha přístupu, bezpečnostní otázky |
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
| Pole                   | Povinné | Typ/validace                | Poznámka                       |
|------------------------|:-------:|-----------------------------|---------------------------------|
| Jméno                  |   Ano   | text                        |                                |
| Příjmení               |   Ano   | text                        |                                |
| Titul                  |   Ne    | text                        |                                |
| E-mail                 |   Ano   | e-mail (unikátní, validace) |                                |
| Alternativní e-mail    |   Ne    | e-mail (validace)           | Pro obnovení přístupu           |
| Telefon                |   Ne    | tel (validace)              |                                |
| Alternativní telefon   |   Ne    | tel (validace)              | Nouzový kontakt                |
| Adresa                 |   Ne    | text                        |                                |
| Profilová fotka        |   Ne    | soubor (jpg/png), validace  |                                |
| Role                   |   Ano   | readonly                    | Zobrazení v profilu            |
| Příslušnost            |   Ne    | readonly                    | Společnosti, nemovitosti, jednotky |
| Typ účtu               |   Ano   | výběr (osobní/firemní/rodinný) |                              |
| IČO                    |   Ne    | text, validace              | Pouze pro firemní účet         |
| Firma                  |   Ne    | text                        | Pouze pro firemní účet         |
| Fakturační adresa      |   Ne    | text                        | Pouze pro firemní účet         |
| Poznámka administrátora|   Ne    | text (readonly)             | Viditelné jen adminům          |
| Preferované kontakty   |   Ne    | multi-choice                | např. SMS, e-mail, telefon     |
| Souhlas s podmínkami   |   Ano   | checkbox                    | Záznam souhlasu (právně nutné) |
| Souhlas s marketingem  |   Ne    | checkbox                    | Pro newslettery                |
| Profil viditelný       |   Ne    | checkbox                    | „Neviditelný profil“           |

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
Zajišťuje správu přístupových údajů, změnu hesla, nastavení 2FA, bezpečnostní otázky, recovery kódy, přehled přihlášených zařízení a historii přístupů.

#### 2️⃣ Přístup/viditelnost
Pouze daný uživatel a admin.

#### 3️⃣ Přehled a formuláře
| Pole                   | Povinné | Typ/validace                | Poznámka                  |
|------------------------|:-------:|-----------------------------|---------------------------|
| Heslo původní          |   Ano   | password                    | Změna hesla               |
| Heslo nové             |   Ano   | password, síla hesla        |                           |
| Potvrzení hesla        |   Ano   | password                    |                           |
| 2FA způsob             |   Ne    | výběr (SMS/aplikace)        | Aktivace/deaktivace       |
| Kód 2FA                |   Ne    | číselný kód                 | Ověření                   |
| Bezpečnostní otázka    |   Ne    | výběr/krátký text           | Pro obnovení přístupu     |
| Odpověď na otázku      |   Ne    | text                        | Skrytá                    |
| Recovery kódy          |   Ne    | readonly/generátor          | Záloha přístupu           |
| Přihlášená zařízení    |   Ne    | readonly                    | Seznam, možnost odhlásit  |
| Historie přihlášení    |   Ne    | readonly                    | Tabulka, záznam           |

#### 4️⃣ Tlačítka a akce
- 💾 Uložit změnu hesla
- ❌ Zrušit
- 🔑 Aktivovat 2FA
- 🔓 Deaktivovat 2FA
- 🧩 Nastavit bezpečnostní otázky / recovery kódy
- 🚪 Odhlásit zařízení

#### 5️⃣ Chybové stavy
- Neplatné/neshodující se heslo
- Slabé heslo (síla hesla)
- Chyba při aktivaci 2FA
- Neoprávněný pokus o změnu údajů
- Chyba při odhlášení zařízení
- Neúspěšné ověření bezpečnostní otázky

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
| Pole                 | Povinné | Typ/validace     | Poznámka                      |
|----------------------|:-------:|------------------|-------------------------------|
| Způsob zasílání      | Ano     | vícevýběr        | e-mail, SMS, push, interní    |
| Události             | Ano     | vícevýběr        | např. platby, údržba, zprávy  |
| Dočasné vypnutí      | Ne      | checkbox         |                               |
| Časové okno          | Ne      | časový rozsah    | Kdy doručovat notifikace      |
| Kanály preferované   | Ne      | multi-choice     | Upřednostňuji SMS apod.       |
| Export historie      | Ne      | tlačítko         | Exportovat historii notifikací |

#### 4️⃣ Tlačítka a akce
- 💾 Uložit nastavení
- ❌ Zrušit
- 📤 Exportovat historii notifikací

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
| Pole                  | Povinné | Typ/validace | Poznámka        |
|-----------------------|:-------:|--------------|-----------------|
| Vzhled (theme)        | Ne      | výběr        | světlý/tmavý    |
| Jazyk rozhraní        | Ano     | výběr        |                 |
| Domovská sekce        | Ne      | výběr        | modul/sekce     |
| Oblíbené moduly       | Ne      | vícevýběr    |                 |
| Časové pásmo          | Ne      | výběr        |                 |
| Formát data/času      | Ne      | výběr        |                 |
| Zobrazovat tipy       | Ne      | checkbox     | Onboarding, nápověda  |
| Aktivovat beta funkce | Ne      | checkbox     | Přístup k novinkám   |

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
| Pole        | Povinné | Typ/validace | Poznámka           |
|-------------|:-------:|--------------|--------------------|
| Typ akce    | Ano     | text         | přihlášení, změna  |
| Čas         | Ano     | datetime     |                    |
| IP adresa   | Ne      | text         |                    |
| Zařízení    | Ne      | text         | např. mobil/web    |
| Detail      | Ne      | text         | popis akce         |

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
Umožňuje uživateli požádat o zrušení účtu, stáhnout si data, být upozorněn na nevratnost kroku, případně účet dočasně deaktivovat.

#### 2️⃣ Přístup/viditelnost
Pouze daný uživatel a admin.

#### 3️⃣ Přehled a formuláře
| Pole                  | Povinné | Typ/validace | Poznámka                       |
|-----------------------|:-------:|--------------|--------------------------------|
| Potvrzení zrušení     | Ano     | checkbox     | uživatel musí potvrdit         |
| Důvod zrušení         | Ne      | text         | volitelné                      |
| Export osobních dat   | Ne      | tlačítko     | možnost stáhnout před zrušením |
| Podmínky GDPR         | Ano     | readonly     | nutno odsouhlasit              |
| Dočasná deaktivace    | Ne      | checkbox     | deaktivace bez výmazu          |
| Historie žádostí      | Ne      | readonly     | přehled žádostí o zrušení/deaktivaci |

#### 4️⃣ Tlačítka a akce
- 📝 Odeslat žádost o zrušení
- ❌ Zrušit
- 📥 Exportovat osobní data
- 💤 Dočasně deaktivovat účet

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
- ⏳ Rozlišit typ účtu (osobní/firemní/rodinný), přidat potřebná pole pro firemní účty.
- ⏳ Povolit poznámky admina k účtu (pouze pro adminy).
- ⏳ Nastavení časového okna pro notifikace.
- ⏳ Export historie notifikací.
- ⏳ Nastavit možnost dočasné deaktivace účtu.

> Otázky k doplnění:
> - Potřebujeme podporu pro více typů účtů (firemní/osobní/rodinný)?
> - Je třeba uživateli umožnit export úplné historie notifikací a akcí?
> - Chceme implementovat automatickou blokaci účtu při podezřelé aktivitě?
> - Má být možné dočasně deaktivovat účet (bez výmazu)?
> - Máme definovány všechny GDPR procesy pro tento modul? (výmaz, export, souhlasy)
> - Chceme povinný double opt-in při změně e-mailu?
> - Jaké další informace by měl admin vidět u účtu?

---

## 🗃️ Datové modely (ukázka)
```json
{
  "id": "user_123",
  "jmeno": "Patrik",
  "prijmeni": "Cechlovsky",
  "role": "pronajímatel",
  "email": "patrik@email.cz",
  "alternativni_email": "patrik.alt@email.cz",
  "telefon": "+420123456789",
  "alternativni_telefon": "+420987654321",
  "foto": "profil.jpg",
  "typ_uctu": "firemní",
  "ico": "12345678",
  "firma": "Cechlovsky s.r.o.",
  "fakturacni_adresa": "Brno, Ulice 1",
  "preferovane_kontakty": ["email", "sms"],
  "souhlas_podminky": true,
  "souhlas_marketing": false,
  "profil_viditelny": false,
  "nastaveni": {
    "jazyk": "cs",
    "vzhled": "tmavý",
    "notifikace": ["email", "sms"],
    "domovska_sekce": "finance",
    "casove_pasma": "Europe/Prague",
    "beta": true
  },
  "poznamka_admina": "VIP klient"
}
```

```json
{
  "user_id": "user_123",
  "akce": [
    {
      "typ": "prihlaseni",
      "cas": "2025-09-09T07:13:00",
      "ip": "89.102.5.8",
      "zarizeni": "mobile"
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
| Slabé heslo                     | Nutit silnější heslo         | „Vaše heslo je příliš slabé. Zvolte silnější.“  |
| Nepovolená změna údajů          | Omezit, logovat pokus        | „Tuto změnu nemáte oprávnění provést.“          |
| Chyba při změně notifikace      | Upozornit, logovat           | „Nepodařilo se uložit nastavení notifikace.“    |
| Nezdařená 2FA autentizace       | Upozornit, nabídnout opakování | „Ověření dvoufaktorem selhalo.“                |
| Chyba při exportu dat           | Zobrazit informaci, logovat  | „Export osobních dat se nezdařil.“              |
| Povinné pole není vyplněno      | Zvýraznit pole, upozornit    | „Vyplňte prosím všechna povinná pole.“          |
| Chyba při uploadu fotografie    | Upozornit, logovat           | „Soubor nelze nahrát. Zkuste jiný formát.“      |
| Neúspěšné ověření bezpečnostní otázky | Upozornit, nabídnout novou volbu | „Odpověď nesouhlasí.“               |
| Chyba při deaktivaci účtu       | Zobrazit chybovou hlášku     | „Účet se nepodařilo deaktivovat.“               |
| Chyba při změně typu účtu       | Omezit změnu, logovat        | „Změna typu účtu není povolena.“                |

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Uživatel | Admin |
|------------------------------|:--------:|:-----:|
| Úprava osobních údajů        |   ✅     |  ✅   |
| Změna hesla/2FA              |   ✅     |  ✅   |
| Nastavení notifikací         |   ✅     |  ✅   |
| Správa oblíbených            |   ✅     |  ✅   |
| Zrušení/deaktivace účtu      |   ✅\*   |  ✅   |
| Export dat                   |   ✅     |  ✅   |
| Historie aktivity            |   ✅     |  ✅   |
| Přístup k poznámce admina    |         |  ✅   |
| Úprava typu účtu             |   ✅\*   |  ✅   |

\* podle nastavení systému

---

## 📑 Doporučené workflow

1. **Změna hesla/zabezpečení:**  
   - Uživatel zadá nové heslo, případně aktivuje dvoufaktorovou autentizaci, nastaví bezpečnostní otázku a recovery kódy.
2. **Nastavení notifikací:**  
   - Uživatel zvolí, jak, kdy a pro jaké události chce být informován (e-mail, SMS, push), nastaví časové okno.
3. **Úprava kontaktů a osobních údajů:**  
   - Změna e-mailu, telefonu, nahrání fotky, úprava adresy, doplnění firemních údajů.
4. **Správa oblíbených modulů a vzhledu:**  
   - Nastavení domovské sekce, barevného schématu, případně jazyka, aktivace beta funkcí.
5. **Zobrazení aktivity:**  
   - Kontrola historie akcí a přístupů, možnost odhlásit se ze všech zařízení, export historie.
6. **Zrušení/deaktivace účtu:**  
   - Postupné potvrzení, export osobních dat, deaktivace účtu, možnost opětovné aktivace.
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
