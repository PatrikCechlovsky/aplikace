# Centrální katalog tlačítek a ikon napříč aplikací

Tento katalog obsahuje všechny běžné akce (tlačítka a ikony), které se ve formulářích a seznamech napříč moduly opakují.  
Pro každý modul použij relevantní akce z tohoto katalogu a případně doplň jejich viditelnost, povolení nebo specifika podle daného modulu a oprávnění uživatele.

| Ikona / Název           | Popis akce                  | Použitelné v modulech        | Viditelné/aktivní pro        | Poznámka / Specifika              |
|-------------------------|-----------------------------|------------------------------|------------------------------|------------------------------------|
| ➕ Přidat                | Vytvořit nový záznam        | Všechny                      | Role s právem „vytvářet“     | Kontextové (např. typ záznamu)     |
| ✏️ Upravit              | Editace údajů               | Všechny                      | Role s právem „editovat“     | Někde pouze pro určité stavy       |
| 👁️ Detail               | Zobrazit detail             | Všechny                      | Všichni s právem „číst“      |                                    |
| 🗄️ Archivovat           | Archivace záznamu           | Všechny                      | Správce, admin               | Jen pokud není aktivní vazba       |
| ⛔ Zablokovat            | Zablokovat záznam/uivatele  | Uživatelé, smlouvy, platby   | Admin, správce               | Stav se změní na „blokováno“       |
| 🔄 Změna stavu           | Změna stavu záznamu         | Nemovitost, jednotka, nájemník | Admin, správce           | Aktivní/archivovaná/blokovaná      |
| 🏢 Zobrazit jednotky     | Zobrazit seznam jednotek    | Nemovitost                   | Všichni                      | Přechod na detailní výpis jednotek |
| 🧑‍💼 Správa uživatelů     | Správa správce/nájemníka    | Nemovitost, jednotka, nájemník| Admin, správce           | Přiřazení, odebrání, nastavení práv|
| 📝 Přidat/editovat       | Zadání/editace formuláře    | Všechny                      | Role s právem „editovat“     |                                    |
| 🗑️ Smazat                | Trvalé smazání              | Výjimečně                    | Admin, správce               | Jen bez návazností, historie       |
| 📤 Export                | Export záznamů              | Všechny                      | Role s právem „exportovat“   | CSV, XLSX, PDF                     |
| 📥 Import                | Import záznamů              | Všechny                      | Role s právem „importovat“   | CSV, XLSX                          |
| 🔍 Filtrování            | Otevřít panel filtrů        | Všechny                      | Všichni                      |                                    |
| 📊 Statistiky            | Přehled využití, reporty    | Všechny                      | Role s právem „statistiky“   |                                    |
| 📑 Dokumenty             | Přílohy k záznamu           | Všechny                      | Všichni s právem „číst“/„edit“ |                                    |
| 📝 Průvodce založením    | Spustit průvodce            | Všechny                      | Admin, správce               | Wizard, krokování                  |
| 🧾 Hromadné akce         | Hromadné změny              | Všechny                      | Admin, správce               | Import, export, přiřazení, stav    |
| 🕓 Auditní log           | Zobrazit historii změn      | Všechny                      | Role s právem „audit“        |                                    |
| 🚨 Notifikace            | Nastavení upozornění        | Všechny                      | Admin, správce               | Nastavení triggerů                 |
| ⚙️ Nastavení             | Konfigurace modulu          | Všechny                      | Admin                        |                                    |
| 🟦 Dlaždice / sekce      | Hlavní sekce/dlaždice       | Struktura                    | Všichni                      | Používá se ve strukturách          |
| 📝 Formulář              | Zadávací část               | Struktura                    | Všichni                      | Používá se ve strukturách          |
| ✅ Hotovo                | Dokončená sekce/modul       | Struktura, workflow          | Všichni                      | Používá se ve struktuře modulů     |
| ⏳ Rozpracováno          | Práce v procesu             | Struktura, workflow          | Všichni                      | Používá se ve struktuře modulů     |
| 🚫 Odstraněno            | Odstraněná/přeškrtnutá sekce| Struktura, workflow          | Všichni                      | Přeškrtnutí řádku                  |
| 🌐 Hotovo v HTML         | Implementace v HTML         | Struktura, workflow          | Vývojáři/testeři             | Používá se ve struktuře modulů     |

---

## Jak použít

- V každém modulu (např. správa uživatelů) odkazuj na tento katalog a vyber tlačítka, která se v dané sekci používají.
- Pokud potřebuješ další akci, přidej ji do tohoto seznamu, ať je katalog vždy aktuální a kompletní.