# Modul: Nájemníci

## 📋 Přehled
**Účel:** Správa nájemníků a jejich zástupců
**Ikona:** 👥
**Priorita:** 1
**Stav:** ✅ Dokončeno

## 🗂️ Typy záznamů
1. **Fyzická osoba** (👤) - jednotlivec jako nájemník
2. **OSVČ** (🧑‍💼) - osoba samostatně výdělečně činná
3. **Firma** (🏢) - s.r.o., a.s., atd.
4. **Spolek/Skupina** (🫂) - nezisková organizace
5. **Státní instituce** (🏛️) - státní nebo městská organizace
6. **Zastupující osoba** (🤝) - osoba zastupující nájemníka

## 📊 Datová struktura
```javascript
{
  // Struktura je stejná jako u pronajímatele
  // Rozdíl je v poli role: 'najemnik' místo 'pronajimatel'
  // A v typ_zastoupeni: 'najemnik' pro zástupce
}
```

## 🔗 Vazby na jiné moduly
### Příchozí vazby:
- **Smlouvy** - pole `najemnik_id` odkazuje na nájemníka
- **Platby** - nájemník je plátce
- **Žádosti** - nájemník podává žádosti

### Odchozí vazby:
- **Zástupci** - pole `zastupce_id` odkazuje na osobu typu zástupce

## 🔄 Dopady změn
### Při změně tohoto modulu:
- ⚠️ **Smlouvy** - automaticky se aktualizuje jméno/název v zobrazení
- ⚠️ **Platby** - aktualizují se údaje plátce
- ✅ **Žádosti** - automaticky se aktualizuje žadatel

### Při smazání záznamu:
- 🛡️ Nelze smazat pokud existují aktivní smlouvy
- ⚠️ Varování při existenci plateb nebo žádostí

## 💼 Pracovní postupy
### Vytvoření nového nájemníka:
1. Klikněte na "Přidat nájemníka"
2. Vyberte typ subjektu
3. Vyplňte povinná pole
4. Nastavte oprávnění (co může vidět/upravovat)
5. Uložte formulář

## 🔧 Speciální funkce
- **Oprávnění** - nastavení co nájemník vidí v systému
- **Historie plateb** - přehled všech plateb nájemníka
- **Aktivní smlouvy** - seznam všech smluv nájemníka

## 📝 Poznámky pro vývojáře
- Třída: `window.Najemnici`
- Soubor: `js/modules/najemnici.js`
- localStorage klíče: `najemnici_data`, `zastupce_data`

## 🐛 Známé problémy
- [ ] Stejné jako u pronajímatele

## 📅 Historie změn
- **2025-01-10** - Vytvořen na základě modulu pronajímatel
