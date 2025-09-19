# Aplikace pronajímatel

## Dohoda s Copilotem

Copilot i všichni spolupracovníci automaticky dodržují workflow, checklisty a pravidla uvedená v souborech `pravidla.md` a `README.md`.  
Pravidla, workflow a struktura platí pro všechny změny, moduly, sekce i dokumentaci.  
Výjimky musí být výslovně zapsány v zadání nebo schváleny vlastníkem projektu.

---

## Struktura projektu

- `index.html` — základní rozhraní (bude natahovat části kódu podle modulů)
- `src/js/` — JavaScript soubory, každý modul zvlášť (např. `users.js`, `contracts.js`)
- `src/css/` — CSS styly, každý modul zvlášť (např. `users.css`, `contracts.css`)
- `assets/logo.svg` — logo a další obrázky
- `pravidla.md` — podrobná pravidla, checklisty a workflow
- `README.md` — základní informace o projektu, dohodách a struktuře

### Doporučený postup

- Každý větší funkční celek (modul) rozděl do samostatných JS a CSS souborů.
- V HTML (`index.html`) načítej jen potřebné části (skripty, styly) podle kontextu nebo modulu.
- Pokud budeš potřebovat nový modul, založ v `src/js/` a `src/css/` nový soubor stejného jména.
- Nikdy nemaž starý kód, jen ho přeškrtni nebo označ jako neaktuální.
- Všechny zásadní workflow a pravidla zapisuj do `pravidla.md`.

## Spuštění

Otevři `public/index.html` v prohlížeči nebo si projekt nastav v oblíbeném frameworku.

---

Tento projekt je šablona – upravuj obsah, styly i moduly podle svých potřeb. Pokud si nejsi jistý/á strukturou nebo postupem, ptej se Copilota.
