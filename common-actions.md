# Centrální katalog tlačítek a ikon napříč aplikací

Tento katalog obsahuje všechny běžné akce (tlačítka a ikony), které se ve formulářích a seznamech napříč moduly opakují.  
Pro každý modul použij relevantní akce z tohoto katalogu a případně doplň jejich viditelnost, povolení nebo specifika podle daného modulu a oprávnění uživatele.

| Ikona / Název           | Popis akce                      | Použitelné v modulech         | Viditelné/aktivní pro        | Poznámka / Specifika                               |
|-------------------------|---------------------------------|-------------------------------|------------------------------|---------------------------------------------------|
| ➕ Přidat                | Vytvořit nový záznam            | Všechny                       | Role s právem „vytvářet“     | Kontextové (např. typ záznamu)                    |
| ✏️ Upravit              | Editace údajů                   | Všechny                       | Role s právem „editovat“     | Někde pouze pro určité stavy                      |
| 👁️ Detail               | Zobrazit detail                 | Všechny                       | Všichni s právem „číst“      |                                                   |
| 🗄️ Archivovat           | Archivace záznamu               | Všechny                       | Správce, admin               | Jen pokud není aktivní vazba                      |
| ⛔ Zablokovat            | Zablokovat záznam/uživatele     | Uživatelé, smlouvy, platby    | Admin, správce               | Stav se změní na „blokováno“                      |
| 🔁 Resetovat heslo       | Vygenerovat nové heslo          | Uživatelé                     | Admin, správce               | Jen pokud není účet archivován                    |
| 📨 Poslat pozvánku       | Odeslat/obnovit pozvánku        | Uživatelé                     | Admin, správce               | Stav „pozváno“ nebo „neaktivní“                   |
| 🧑‍💻 Historie aktivit    | Zobrazit auditní log            | Všechny                       | Role s právem „audit“        |                                                   |
| 📑 Dokumenty             | Přílohy k záznamu               | Všechny                       | Všichni s právem „číst“/„edit“|                                                   |
| ✳️ Správa oprávnění      | Nastavení rolí, práv            | Uživatelé, jednotky, aj.      | Admin, správce               | Kontextové (uživatel, jednotka)                   |
| 🗑️ Smazat                | Trvalé smazání                  | Výjimečně                     | Admin, správce               | Jen bez návazností, historie                      |
| 📤 Export                | Export záznamů                  | Všechny                       | Role s právem „exportovat“   | CSV, XLSX, PDF                                    |
| 📥 Import                | Import záznamů                  | Všechny                       | Role s právem „importovat“   | CSV, XLSX                                         |
| 🖨️ Tisk                  | Tisk záznamu/dokumentu          | Dokumenty, Smlouvy, Vyúčtování| Všichni s právem „číst“      |                                                   |
| 🔍 Filtrování            | Otevřít panel filtrů            | Všechny                       | Všichni                      |                                                   |
| 📊 Statistiky            | Přehled využití, reporty        | Všechny                       | Role s právem „statistiky“   |                                                   |
| 📨 Odeslat upomínku      | Odeslat upomínku                | Komunikace, Služby, Platby    | Admin, správce               |                                                   |
| 🔔 Notifikace            | Přehled/přepnutí notifikací     | Všechny                       | Všichni                      | Nastavení notifikací, náhled doručení             |
| 🖋️ Podepsat              | Elektronický podpis dokumentu   | Komunikace, Smlouvy, Dokumenty| Admin, správce, účetní       | BankID, Signer, jiné                              |
| ✔️ Schválit              | Schválení workflow/záznamu      | Smlouvy, Dokumenty, Platby    | Schvalovatelé, správce       |                                                   |
| ❌ Zamítnout             | Zamítnutí workflow/záznamu      | Smlouvy, Dokumenty, Platby    | Schvalovatelé, správce       |                                                   |
| 📝 Poznámka              | Přidat/zobrazit poznámku        | Všechny                       | Všichni                      | Kontextová poznámka                               |
| 🆘 Nápověda              | Otevřít help/FAQ                | Všechny                       | Všichni                      | Inline help, odkaz na dokumentaci                 |
| 🌐 Přepnout jazyk        | Změna lokalizace                | Všechny                       | Všichni                      | Výběr jazyka                                      |
| 🔄 Resetovat nastavení   | Obnovit výchozí hodnoty         | Nastavení                     | Admin, uživatel              |                                                    |
| ℹ️ Info                  | Zobrazit informace/tooltop      | Všechny                       | Všichni                      | Kontextové info                                   |
| 💬 Komentář              | Přidat komentář/odpověď         | Komunikace, Údržba, Dokumenty | Všichni                      | Diskuse u záznamu                                 |
| ⏳ Rozpracováno          | Práce v procesu                 | Struktura, workflow           | Všichni                      | Používá se ve struktuře modulů                    |
| ✅ Hotovo                | Dokončená sekce/modul           | Struktura, workflow           | Všichni                      | Používá se ve struktuře modulů                    |
| 🚫 Odstraněno            | Odstraněná/přeškrtnutá sekce    | Struktura, workflow           | Všichni                      | Přeškrtnutí řádku                                 |
| 🌐 Hotovo v HTML         | Implementace v HTML             | Struktura, workflow           | Vývojáři/testeři             | Používá se ve struktuře modulů                    |
| 🟦 Dlaždice / sekce      | Hlavní sekce/dlaždice           | Struktura                     | Všichni                      | Používá se ve strukturách                         |
| 📝 Formulář              | Zadávací část                   | Struktura                     | Všichni                      | Používá se ve strukturách                         |

---

## Jak použít

- V každém modulu (např. správa uživatelů) odkazuj na tento katalog a vyber tlačítka, která se v dané sekci používají.
- Pokud potřebuješ další akci, přidej ji do tohoto seznamu, ať je katalog vždy aktuální a kompletní.
