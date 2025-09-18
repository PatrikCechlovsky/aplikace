## Dohoda s Copilotem

Copilot i další spolupracovníci vždy automaticky dodržují workflow, checklisty a pravidla uvedená v tomto souboru.  
Není třeba pravidla a workflow v zadáních opakovat – platí pro všechny změny, moduly, sekce, assety i dokumentaci.

Pokud je třeba udělat výjimku (mazání, přeskočení pravidla…), musí být výslovně uvedena v zadání nebo schválena vlastníkem projektu.

---

<!-- NOVÉ PRAVIDLO: Propojitelnost, společná databáze, nemazat -->

## 🆕 Zásadní pravidla pro propojitelnost a správu historie
> Tato pravidla platí NADŘAZENĚ ke všem ostatním.
> 
> - Všechny subjekty (osoba, OSVČ, firma, spolek/skupina, státní organizace, zástupce atd.) jsou vedeny ve společné databázi/tabulce (entita `subjekt`). Typ určuje pole `typ_subjektu`.
> - Všechny vazby mezi moduly/entitami (pronajímatel-nemovitost, nájemník-jednotka, smlouva-nájemník atd.) jsou realizovány přes unikátní ID (např. `pronajimatel_id`, `jednotka_id`), nik...
> - Formuláře, tabulky i importy/exporty musí pole s vazbou řešit vždy přes výběr z existující entity (číselník), nikoliv volným textem.
> - Každý formulář i tabulka musí dynamicky zobrazovat pole podle zvoleného typu subjektu (např. IČO/DIČ pro firmy, datum narození pro osobu atd.).
> - Importy, exporty, datové modely a API vždy obsahují pole `typ_subjektu` a ID všech vazeb (např. `jednotka_id`, `pronajimatel_id`). Ukázkové JSONy vždy ukazují vazby přes ID.
> - **Žádný obsah v dokumentaci ani datech se nesmí mazat!**  
>   Používej pouze přeškrtnutí (strikethrough, `~~text~~`), přesuny, komentáře a rozšiřování. Historii a kontext je nutné zachovat!
> - Každý návrh změny, rozšíření či refaktoringu musí zachovat historii (přeškrtni staré, přidej nové, nikdy neodstraňuj).
> - Každý modul musí na začátku obsahovat reference na ostatní související moduly.
> - Checklist každé sekce musí obsahovat bod „Vazby na ostatní entity přes ID“.
> - Všechny nové ikony a akce musí být zapsány do centrálního katalogu ([common-actions.md](./common-actions.md)).
> - Každý JSON příklad (včetně v dokumentaci) musí ukazovat vazby mezi entitami pomocí ID.
> - Každou změnu stromové struktury modulu vždy zapiš také do centrálního souboru [struktura-app.md](./struktura-app.md).

---

<!-- PŮVODNÍ OBSAH ZACHOVÁN -->
# Pravidla dokumentace, struktury a propojitelnosti modulů

...

(zbytek souboru zůstává beze změny)