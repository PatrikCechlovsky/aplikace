# 🟦 Seznam uživatelů

> ℹ️ Viz [pravidla.md](../pravidla.md)  
> ℹ️ Viz [common-actions.md](../common-actions.md)  
> ℹ️ Viz [permissions-catalog.md](../permissions-catalog.md)  
> - Nikdy nic nemaž, pouze přeškrtávej!  
> - Každá nová ikona patří do [common-actions.md](../common-actions.md)  
> - Na začátku každé sekce/dlaždice vlož checklist (níže) a označ stavovou ikonou:  
>   - ✅ hotovo  ⏳ rozpracováno  🌐 hotovo v HTML  🚫 odstraněno  …


---

## ✅ Checklist pro dokumentaci sekce/dlaždice a formuláře
- ✅ Popis a účel
- ✅ Kdo má přístup/viditelnost podle oprávnění/rolí
- ✅ Zařazení v hlavní stromové struktuře
- ✅ Podsekce a vazby na další části
- ✅ Výčet a popis všech sloupců (tabulka)
- ✅ Filtrování a řazení
- ✅ Akce v řádku (ikony)
- ✅ Hromadné akce nad tabulkou
- ✅ Ukázka tabulky
- ✅ Výčet polí, validací a stavů
- ✅ Detaily záznamu, akce v detailu
- ✅ Akce a workflow
- ✅ Oprávnění a viditelnost (tabulka)
- ✅ Chybové stavy, validace a uživatelské hlášky
- ✅ Export, import, audit, GDPR
- ✅ Vazby na další moduly, reference
- ✅ Specifika, rozšíření

---

## 1️⃣ Popis a účel  
Přehled všech uživatelů v systému s možností rychlého vyhledání, filtrování, editace, správy oprávnění a exportu/importu.  
Uživatelé mohou být osoby (fyzické) nebo firmy (právnické osoby) – viz pole IČO/ARES.  
**Nově: Zobrazit i SSO účty, delegace, API klíče a preference (viz detail uživatele).**

---

## 2️⃣ Stromová struktura / navigace  
Viz výše. Dlaždice je hlavní vstup do správy uživatelů.

---

## 3️⃣ Přehledová tabulka / seznam

| Sloupec             | Popis                                   | Povinný | Filtrovat/Řadit |
|---------------------|-----------------------------------------|:-------:|:--------------:|
| Jméno               | Jméno a příjmení uživatele              |  Ano    | Ano            |
| E-mail              | Kontaktní e-mail                        |  Ano    | Ano            |
| Telefon             | Telefonní číslo                         |  Ne     | Ano            |
| IČO                 | Identifikační číslo organizace           |  Ne     | Ano            |
| Firma               | Název firmy (z ARES)                    |  Ne     | Ano            |
| SSO                 | Propojené účty (Google/MS/Apple, ikona) |  Ne     | Ano            |
| Role                | Hlavní role (popř. více rolí zkráceno)  |  Ano    | Ano            |
| Stav účtu           | Aktivní / Pozván / Blokován / Archiv    |  Ano    | Ano            |
| Poslední přihlášení | Datum a čas posledního přístupu         |  Ne     | Ano (řadit)    |
| Jednotky            | ID/počet přiřazených jednotek           |  Ne     | Ano            |
| Delegace            | Počet zástupců / sdílení účtu           |  Ne     | Ano            |
| Akce                | Ikony pro detail, edit, blok, reset...  |  Ano    | Ne             |

Filtrování: fulltext, role, stav, jednotka, firma/IČO, SSO, delegace, datum.  
Hromadné akce: Přidat, export, import, archivace/blokace, reset hesla, správa oprávnění, statistiky.

**Ukázka tabulky:**

| Jméno      | E-mail             | Firma     | IČO      | Role     | SSO      | Delegace | Stav     | Posl. přihlášení | Akce             |
|------------|--------------------|-----------|----------|----------|----------|----------|----------|------------------|------------------|
| Patrik     | patrik@abc.cz      | ABC s.r.o.| 12345678 | Admin    | G, M     | 2        | Aktivní  | 2025-09-10       | 👁️ ✏️ 📝 ⛔ 🔄   |
| Jan Novák  | jan@xyz.cz         |           |          | Uživatel |          | 0        | Pozván   |                  | 👁️ ✏️ 📝        |

---

## 4️⃣ Výčet polí, validací, stavů
Viz sekce Přidat/Upravit uživatele (formulářová pole): jméno, příjmení, e-mail, telefon, IČO, název firmy, role, jednotky, funkce/opr., poznámka, jazyk, notifikace, SSO účet, delegace, metadata atd.

---

## 5️⃣ Detaily záznamu, akce v detailu
- Základní údaje, historie přihlášení, role, jednotky, SSO, delegace, API, notifikace, jazyk, metadata.
- Akce: editace, reset hesla, archivace, blokace, správa práv, odpojení SSO, odebrání delegace atd.

---

## 6️⃣ Oprávnění a workflow

| Akce                  | Admin | Správce | Účetní | Běžný uživatel |
|-----------------------|:-----:|:-------:|:------:|:--------------:|
| Zobrazit seznam       |  ✅   |   ✅    |   ✅   |       🚫       |
| Přidat/editovat       |  ✅   |   ✅    |   🚫   |       🚫       |
| Archivovat/blokovat   |  ✅   |   ✅    |   🚫   |       🚫       |
| Reset hesla           |  ✅   |   ✅    |   🚫   |       🚫       |
| Export/import         |  ✅   |   ✅    |   ✅   |       🚫       |
| Správa oprávnění      |  ✅   |   ✅    |   🚫   |       🚫       |
| Hromadné akce         |  ✅   |   ✅    |   🚫   |       🚫       |
| Správa SSO účtů       |  ✅   |   ✅    |   🚫   |       🚫       |
| Správa delegace       |  ✅   |   ✅    |   🚫   |       🚫       |
| Správa preferencí     |  ✅   |   ✅    |   ✅   |       🚫       |

---

## 7️⃣ Chybové stavy, validace a uživatelské hlášky

| Chyba                   | Řešení                         | Hláška                           |
|-------------------------|-------------------------------|----------------------------------|
| Duplicitní e-mail       | Ověřit zadání a unikátnost    | "Uživatel se stejným e-mailem již existuje." |
| Povinné pole chybí      | Doplnit povinný údaj          | "Vyplňte prosím všechna povinná pole." |
| Neplatný formát e-mailu | Opravit zadání                | "E-mail nemá platný formát."     |
| Neplatné IČO            | Ověřit v ARES, opravit        | "IČO není platné nebo nebylo nalezeno." |
| Nelze odstranit admina  | Musí zůstat min. 1 admin      | "Nelze odebrat posledního administrátora." |
| Chyba při napojení SSO  | Upozornit                     | "Nepodařilo se propojit SSO účet."|
| Chyba při odebrání delegace | Upozornit                  | "Delegace se nepodařilo odebrat."|
| Chyba v metadatech      | Upozornit                     | "Metadata nejsou ve správném formátu."|
| Chyba při změně preferencí | Upozornit                   | "Nepodařilo se uložit preference."|

---

## 8️⃣ Export, import, audit, GDPR
- Export a import uživatelů (včetně IČO/Firma/SSO/Delegace/Preference/Metadata).
- Auditní log všech změn (vč. SSO, delegací, API klíče, metadat).
- GDPR: možnost exportu a anonymizace dat.

---

## 9️⃣ Vazby na další moduly, reference
- [Katalog tlačítek a ikon](../common-actions.md)
- [Katalog oprávnění](../permissions-catalog.md)
- [Pravidla psaní dokumentace](../pravidla.md)
- [Modul Můj účet](../020-Muj-ucet.md)
- [Modul Nastavení](../130-Nastaveni.md)

---

## 🔖 Poznámky, specifika, rozšíření
- Možné workflow pro schvalování, pokročilé správy skupin, granularita práv, přehled vazeb mezi uživateli.
- Další rozšíření viz hlavní dokumentace modulu.

---
