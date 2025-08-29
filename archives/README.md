# Aplikace pro správu pronajímatelů a nájemníků

Moderní webová aplikace pro evidenci, správu a propojení pronajímatelů, nájemníků a zastupujících osob včetně správy nemovitostí, jednotek a dalších souvisejících entit. Vše dle požadavků – modulární, přehledné, v češtině a s vlastním moderním designem.

## Funkce

- **Moduly:** Pronajímatel, Nájemník, Zastupující osoba (rozšiřitelné o další)
- **Seznamy a formuláře**: Přehledy a moderní formuláře podle typu osoby nebo firmy
- **ARES**: Připraveno pro vyhledání údajů z ARES (firem, OSVČ)
- **Mazání**: 
  - Mazání osob/entit je možné pouze, pokud neexistuje žádné propojení (např. aktivní smlouvy, vztahy).
  - Při mazání se položka **neztrácí z databáze**, ale pouze se **zneaktivní** (archivuje).
  - Archivované záznamy jsou viditelné pouze při zapnutém filtru „Zobrazit archivované“.
- **Validace dat**: Povinná pole, typy údajů dle specifikace
- **Možnost rozšíření** o další moduly (Nemovitosti, Smlouvy, Platby, Energie, atd.)

## Struktura projektu

```
/src
  /modules
    Pronajimatel.js
    Najemnik.js
    Zastupujici.js
  /schema
    fields.js
  App.js
  App.css
README.md
```

## Instalace a spuštění

1. **Stažení repozitáře**
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Instalace závislostí**
   ```bash
   npm install
   ```

3. **Spuštění aplikace (vývoj)**
   ```bash
   npm start
   ```

4. **Build pro produkci**
   ```bash
   npm run build
   ```

## Pravidla pro mazání

- **Mazání je soft-delete**: Pokud uživatel smaže záznam, systém nejprve zkontroluje, zda záznam není propojen s jinými entitami (např. aktivní nájemní smlouvou).
- Pokud **neexistuje propojení**, záznam se pouze označí jako „archivovaný“ (např. pole `archived: true` v databázi).
- **Archivované položky** se zobrazují pouze při zapnutém filtru „Zobrazit archivované“, jinak nejsou v běžných seznamech vidět.

## Lokální data / databáze

- V první verzi jsou data ukládána pouze v paměti aplikace (nebo local storage).
- V produkční verzi bude možno připojit databázi podle požadavků (např. PostgreSQL, MySQL, MongoDB, atd.).

## Další rozvoj

- **Napojení na ARES**: Připraveno tlačítko a infrastructure pro doplnění funkcionality
- **Propojení entit**: Smlouvy, vztahy, jednotky a další (bude rozšiřováno)
- **Oprávnění uživatelů a audit**
- **Exporty, reporty, komunikace**

## Autor a kontakt

Vývoj: Patrik Čechlovský  
GitHub: [PatrikCechlovsky](https://github.com/PatrikCechlovsky)

---

**Poznámka:**  
Aplikace je navržena pro snadné rozšiřování a úpravy dle budoucích požadavků. Design a logika je inspirována moderními aplikacemi a vychází z vlastních návrhů.
