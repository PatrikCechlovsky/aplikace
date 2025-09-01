# Modul: [Název modulu]

## 📋 Přehled
**Účel:** [Stručný popis účelu modulu]
**Ikona:** [emoji]
**Priorita:** [1-5]
**Stav:** ✅ Dokončeno | 🚧 Rozpracováno | 📝 Plánováno

## 🗂️ Typy záznamů
1. **[Typ 1]** - [popis]
2. **[Typ 2]** - [popis]
...

## 📊 Datová struktura
```javascript
{
  id: string,
  typ_subjektu: string,
  // ... další pole
}
```

## 🔗 Vazby na jiné moduly
### Příchozí vazby (kdo odkazuje na tento modul):
- **[Modul X]** - používá [pole] pro [účel]
- **[Modul Y]** - vybírá z [typu] při [akci]

### Odchozí vazby (na koho tento modul odkazuje):
- **[Modul A]** - pole `[název_pole]` odkazuje na [typ záznamu]
- **[Modul B]** - při [akci] se vybírá z [typu]

## 🔄 Dopady změn
### Při změně tohoto modulu:
- ⚠️ **[Modul X]** - automaticky se aktualizuje [co]
- ⚠️ **[Modul Y]** - je potřeba ručně zkontrolovat [co]

### Při smazání záznamu:
- 🛡️ Nelze smazat pokud existují vazby v [modulu X]
- ⚠️ Varování při vazbách v [modulu Y]

## 💼 Pracovní postupy
### Vytvoření nového záznamu:
1. Klikněte na "Přidat [typ]"
2. Vyplňte povinná pole označená červenou hvězdičkou
3. ...

### Propojení s jiným modulem:
1. V poli "[název pole]" vyberte z rozbalovacího seznamu
2. Nebo klikněte na "+" pro vytvoření nového
3. ...

## 🔧 Speciální funkce
- **[Funkce 1]** - [popis co dělá]
- **[Funkce 2]** - [popis co dělá]

## 📝 Poznámky pro vývojáře
- Třída: `window.[NázevModulu]`
- Soubor: `js/modules/[název].js`
- localStorage klíče: `[název]_data`, `zastupce_data`

## 🐛 Známé problémy
- [ ] [Popis problému 1]
- [ ] [Popis problému 2]

## 📅 Historie změn
- **2025-01-09** - Vytvořen základ modulu
- **2025-01-10** - Přidána podpora příloh
