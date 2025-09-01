# Modul: Pronajímatel

## 📋 Přehled
**Účel:** Správa pronajímatelů nemovitostí a jejich zástupců
**Ikona:** 🏠
**Priorita:** 1
**Stav:** ✅ Dokončeno

## 🗂️ Typy záznamů
1. **Fyzická osoba** (👤) - jednotlivec jako pronajímatel
2. **OSVČ** (🧑‍💼) - osoba samostatně výdělečně činná
3. **Firma** (🏢) - s.r.o., a.s., atd.
4. **Spolek/Skupina** (🫂) - nezisková organizace
5. **Státní instituce** (🏛️) - státní nebo městská organizace
6. **Zastupující osoba** (🤝) - osoba zastupující pronajímatele

## 📊 Datová struktura
```javascript
{
  // Společné pro všechny typy
  id: string,
  typ_subjektu: 'osoba' | 'osvc' | 'firma' | 'spolek' | 'stat',
  role: 'pronajimatel' | 'zastupce',
  
  // Pro osoby a OSVČ
  titul_pred: string,
  jmeno: string,
  prijmeni: string,
  titul_za: string,
  datum_narozeni: date,
  typ_dokladu: 'op' | 'pas' | 'rp',
  cislo_dokladu: string,
  
  // Pro firmy a spolky
  nazev: string,
  
  // IČO/DIČ
  ico: string,
  dic: string,
  
  // Kontaktní údaje
  stat: string,
  psc: string,
  mesto: string,
  ulice: string,
  cislo_popisne: string,
  telefon: string,
  email: string,
  
  // Bankovní údaje
  bankovni_ucet: string,
  
  // Přihlašovací údaje
  login: string,
  heslo: string,
  
  // Vazby
  zastupce_id: string,  // ID zástupce
  
  // Pro zástupce
  typ_zastoupeni: 'pronajimatel' | 'najemnik',
  typ_opravneni: 'cteni_vybranych' | 'cteni_vsech' | 'uprava_vsech',
  zastupuje_id: string,  // ID zastupovaného
  
  // Systémová pole
  created_at: datetime,
  updated_at: datetime
}
```

## 🔗 Vazby na jiné moduly
### Příchozí vazby:
- **Nemovitosti** - pole `pronajimatel_id` odkazuje na pronajímatele
- **Smlouvy** - pole `pronajimatel_id` odkazuje na pronajímatele
- **Platby** - používá bankovní údaje pronajímatele

### Odchozí vazby:
- **Zástupci** - pole `zastupce_id` odkazuje na osobu typu zástupce

## 🔄 Dopady změn
### Při změně tohoto modulu:
- ⚠️ **Smlouvy** - automaticky se aktualizuje jméno/název v zobrazení
- ⚠️ **Platby** - při změně bankovního účtu nutno zkontrolovat budoucí platby
- ✅ **Nemovitosti** - automaticky se aktualizuje vlastník

### Při smazání záznamu:
- 🛡️ Nelze smazat pokud existují aktivní smlouvy
- 🛡️ Nelze smazat pokud vlastní nemovitosti
- ⚠️ Varování při existenci plateb

## 💼 Pracovní postupy
### Vytvoření nového pronajímatele:
1. Klikněte na "Přidat pronajímatele"
2. Vyberte typ subjektu
3. Vyplňte povinná pole (označená *)
4. Můžete přiřadit zástupce nebo vytvořit nového
5. Uložte formulář

### Přidání zástupce:
1. V seznamu klikněte na "Zastupující osoby"
2. Vytvořte nového zástupce
3. Vyberte koho zastupuje
4. Nastavte oprávnění

### Propojení s nemovitostí:
- Při vytváření nemovitosti vyberte pronajímatele
- Nebo z detailu pronajímatele zobrazte jeho nemovitosti

## 🔧 Speciální funkce
- **ARES integrace** - automatické doplnění údajů podle IČO
- **Validace IČO/DIČ** - kontrola správnosti formátu
- **Generování přihlašovacích údajů** - automatické vytvoření loginu
- **Export do PDF** - tisk seznamu pronajímatelů

## 📝 Poznámky pro vývojáře
- Třída: `window.Pronajimatel`
- Soubor: `js/modules/pronajimatel.js`
- localStorage klíče: `pronajimatel_data`, `zastupce_data`
- Komponenty: FormLinking, AttachmentSystem, FormGuard

## 🐛 Známé problémy
- [ ] ARES integrace zatím není implementována
- [ ] Validace bankovního účtu kontroluje pouze formát

## 📅 Historie změn
- **2025-01-09** - Vytvořen základ modulu
- **2025-01-10** - Přidána podpora zastupujících osob
- **2025-01-10** - Implementován systém příloh
- **2025-01-10** - Přidána ochrana rozpracovaných formulářů
