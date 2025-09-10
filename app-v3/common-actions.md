# Centrální katalog tlačítek a ikon napříč aplikací

Tento katalog obsahuje všechny běžné akce (tlačítka a ikony), které se ve formulářích a seznamech napříč moduly opakují.  
Pro každý modul použij relevantní akce z tohoto katalogu a případně doplň jejich viditelnost, povolení nebo specifika podle daného modulu a oprávnění uživatele.

| Ikona / Název           | Popis akce                  | Použitelné v modulech        | Viditelné/aktivní pro        | Poznámka / Specifika              |
|-------------------------|-----------------------------|------------------------------|------------------------------|------------------------------------|
| ➕ Přidat                | Vytvořit nový záznam        | Všechny                      | Role s právem „vytvářet“     | Kontextové (např. typ záznamu)     |
| ✏️ Upravit              | Editace údajů               | Všechny                      | Role s právem „editovat“     | Někde pouze pro určité stavy       |
| 👁️ Detail               | Zobrazit detail             | Všechny                      | Všichni s právem „číst“      |                                    |
| 🗄️ Archivovat           | Archivace záznamu           | Všechny                      | Správce, admin               | Jen pokud není aktivní vazba       |
| ⛔ Zablokovat            | Zablokovat záznam/uživatele | Uživatelé, smlouvy, platby   | Admin, správce               | Stav se změní na „blokováno“       |
| 🔁 Resetovat heslo       | Vygenerovat nové heslo      | Uživatelé                    | Admin, správce               | Jen pokud není účet archivován     |
| 📨 Poslat pozvánku       | Odeslat/obnovit pozvánku    | Uživatelé                    | Admin, správce               | Stav „pozváno“ nebo „neaktivní“    |
| 🧑‍💻 Historie aktivit    | Zobrazit auditní log        | Všechny                      | Role s právem „audit“        |                                    |
| 📑 Dokumenty             | Přílohy k záznamu           | Všechny                      | Všichni s právem „číst“/„edit“ |                                    |
| ✳️ Správa oprávnění      | Nastavení rolí, práv        | Uživatelé, jednotky, aj.     | Admin, správce               | Kontextové (uživatel, jednotka)    |
| 🗑️ Smazat                | Trvalé smazání              | Výjimečně                    | Admin, správce               | Jen bez návazností, historie       |
| 📤 Export                | Export záznamů              | Všechny                      | Role s právem „exportovat“   | CSV, XLSX, PDF                     |
| 📥 Import                | Import záznamů              | Všechny                      | Role s právem „importovat“   | CSV, XLSX                          |
| 🔍 Filtrování            | Otevřít panel filtrů        | Všechny                      | Všichni                      |                                    |
| 📊 Statistiky            | Přehled využití, reporty    | Všechny                      | Role s právem „statistiky“   |                                    |
| 📨 Odeslat upomínku      | Odeslat upomínku            | Komunikace, Služby, Platby   | Admin, správce               |                                    |
| 🖨️ Tisk                  | Tisk záznamu/dokumentu      | Dokumenty, Smlouvy, Vyúčtování| Všichni s právem „číst“     |                                    |

---

## Jak použít

- V každém modulu (např. správa uživatelů) odkazuj na tento katalog a vyber tlačítka, která se v dané sekci používají.
- Pokud potřebuješ další akci, přidej ji do tohoto seznamu, ať je katalog vždy aktuální a kompletní.