# Modul: Můj účet

---

## 👤 Úvod

Modul **Můj účet** slouží každému uživateli k osobní správě svého účtu, bezpečnosti, kontaktních údajů a notifikací.  
Umožňuje změnit přihlašovací údaje, upravit své kontaktní informace, nastavit zabezpečení (např. dvoufaktorová autentizace), spravovat notifikace a sledovat aktivitu v systému.

---

## 🟦 Hlavní sekce / dlaždice

### 1. Osobní údaje a kontakty

- Úprava jména, příjmení, titulů
- Správa e-mailu, telefonu, adresy
- Možnost nahrát profilovou fotografii
- Zobrazení role v systému a příslušnosti ke společnostem/nemovitostem/jednotkám

---

### 2. Přihlašovací údaje a zabezpečení

- Změna hesla
- Nastavení dvoufaktorové autentizace (2FA, např. SMS, aplikace)
- Správa přihlášených zařízení (odhlášení z jiného zařízení)
- Historie přihlášení a pokusy o přihlášení

---

### 3. Notifikace a upozornění

- Výběr způsobu zasílání notifikací (e-mail, SMS, interní zpráva, push notifikace)
- Nastavení, pro které události chce uživatel dostávat upozornění (platba, údržba, nová zpráva…)
- Možnost dočasně/notrvalo vypnout některá upozornění

---

### 4. Nastavení a preference

- Výběr vzhledu (světlý/tmavý režim, barvy)
- Nastavení jazyka aplikace
- Volba domovské stránky/sekce po přihlášení
- Správa oblíbených modulů (rychlý přístup)
- Nastavení časového pásma a formátu data/času

---

### 5. Aktivita uživatele

- Přehled posledních změn, akcí a přístupů v systému (např. zadání platby, úprava kontaktu, odeslání zprávy)
- Historie přihlášení a odhlášení
- Přehled notifikací a jejich stav

---

### 6. Zrušení účtu (volitelné, pokud umožněno)

- Postup pro zrušení účtu (automaticky nebo na žádost správce)
- Upozornění na nevratnost kroku, možnost stažení osobních dat před zrušením
- Informace o zpracování údajů po zrušení účtu (GDPR)

---

## 🗃️ Datové modely (ukázka)

### 1. Uživatel

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

### 2. Aktivita uživatele

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

---

## 🛡️ Role a oprávnění

| Funkce / Akce                | Uživatel | Admin |
|------------------------------|:--------:|:-----:|
| Úprava osobních údajů        |   ✅     |  ✅   |
| Změna hesla/2FA              |   ✅     |  ✅   |
| Nastavení notifikací         |   ✅     |  ✅   |
| Správa oblíbených            |   ✅     |  ✅   |
| Zrušení účtu                 |   ✅\*   |  ✅   |

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

---

## 📚 Reference

- [Modul Nastavení](./nastaveni.md)
- [Modul Komunikace](./komunikace.md)
- [Modul Platby](./platby.md)

---

> Modul Můj účet zajišťuje bezpečnost a přehled pro každého uživatele, umožňuje personalizaci a správu vlastních údajů i preferencí.
