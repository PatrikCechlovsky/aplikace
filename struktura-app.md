# Přehled modulů, dlaždic, formulářů a pohledů (`aplikace/app-v3`)

---

## Legenda ikon

- 📁 **Modul** (.md soubor)
- 🟦 **Dlaždice / sekce** (hlavní sekce)
- 📝 **Formulář** (zadávací část)
- 👁️ **Pohled** (read-only/detail)
- ✅ **Hotovo v .md**
- 🌐 **Hotovo v HTML**
- ⏳ **Připravuje se/nekompletní**

---

## Stromová struktura modulů a sekcí

📁 010-Sprava-uzivatelu.md ✅  
 🟦 Seznam uživatelů  
  👁️ Přehled uživatelů  
  📝 Přidat/pozvat uživatele  
  📝 Editace uživatele  
  👁️ Detail uživatele  
 🟦 Správa rolí a oprávnění  
  👁️ Přehled rolí a oprávnění  
  📝 Přidat/editovat roli  
  📝 Přidat/editovat funkci  
  - Přehled rolí  
  - Přehled stavů  
  - Práva k jednotce  
  - Funkce (oprávnění)  
 🟦 Přehled pozvánek  
  👁️ Seznam pozvánek a ověřovacích kódů  
 🟦 Správa licencí  
  👁️ Přehled licencí  
 🟦 Import/Export uživatelů  
 🟦 Auditní log / historie změn  
 🟦 Statistiky a využití  
 - Poznámky, nápady a úkoly 

📁 020-Muj-ucet.md ✅  
 🟦 Osobní údaje a kontakty  
  👁️ Přehled osobních údajů  
  📝 Úprava osobních údajů  
 🟦 Přihlašovací údaje a zabezpečení  
  👁️ Přehled zabezpečení  
  📝 Změna hesla  
  📝 Nastavení dvoufaktorové autentizace  
 🟦 Notifikace a upozornění  
  👁️ Přehled notifikací  
  📝 Nastavení notifikací  
 🟦 Nastavení a preference  
  👁️ Přehled nastavení a preferencí  
  📝 Nastavení a preference  
 🟦 Aktivita uživatele  
  👁️ Přehled aktivity  
 🟦 Zrušení účtu (volitelné, pokud umožněno)  
  👁️ Přehled procesu zrušení účtu  
  📝 Zrušení účtu  
 🗃️ Datové modely (ukázka)  
  👁️ Uživatel  
  👁️ Aktivita uživatele  
 ⚠️ Chybové stavy a výjimky  
 🛡️ Role a oprávnění  
 📑 Doporučené workflow  
 📚 Reference 

📁 030-Pronajimatel.md ✅  
 🟦 Přehled (typy pronajímatelů, průvodce založením)  
 🟦 Datový model  

📁 040-Nemovitost.md ✅  
 🟦 Co je modul Nemovitost  
 🟦 Základní struktura modulu  
 🟦 Průvodce založením  
 🟦 Datový model (Nemovitost, Jednotka)  
 🟦 Povinnost a viditelnost polí  
 🟦 Funkce v přehledu  
  🟦 Dlaždice: Nemovitosti  
  🟦 Dlaždice: Jednotky a byty  
 🟦 Role a oprávnění  
 🟦 Stavy a workflow  
 🟦 Podmínky mazání a archivace  
 🟦 Historie a auditní log  
 🟦 Notifikace a upozornění  
 🟦 GDPR, export a smazání dat  
 🟦 Vazby na další moduly  
 🟦 Diagram vztahů  
 🟦 Chybové stavy  
 🟦 Hromadné operace  
 🟦 Reference na další dokumentaci  
 🟦 Známé problémy / TODO  
 🟦 Ukázka uloženého JSON objektu  

📁 050-Najemnik.md ✅  
 🟦 Přehled (typy nájemníků, průvodce založením)  
 🟦 Datový model  

📁 060-Smlouva.md ✅  
 🟦 Krátký úvod  
 🟦 Základní struktura modulu  
  🟦 Dlaždice: Nájemní smlouvy  
  🟦 Dlaždice: Vzor smlouvy  
  🟦 Dlaždice: Předávací protokol  
  🟦 Dlaždice: Archiv vzorů a protokolů  
 🟦 Vazby na jiné moduly  

📁 070-Sluzby.md ✅  
 🟦 Krátký úvod  
 🟦 Základní struktura modulu  
  🟦 Dlaždice: Zálohy  
  🟦 Dlaždice: Kauce  
  🟦 Dlaždice: Jiné platby  
  🟦 Dlaždice: Stavy měřidel  
  🟦 Dlaždice: Vyúčtování služeb  
 🟦 Datové modely  
 🟦 Funkce v přehledu  
 🟦 Hlavní funkce / tlačítka  
 🟦 Role a oprávnění  
 🟦 Stavy a workflow  
 🟦 Historie změn  
 🟦 Notifikace  
 🟦 Hromadné operace  
 🟦 Chybové stavy  
 🟦 Reference  
 🟦 Známé problémy / TODO  
 🟦 Podrobný popis částí  
 🟦 Workflow a životní cyklus  

📁 075-Platby ✅  
 🟦 Přehled plateb  
 🟦 Zadání a evidence plateb  
 🟦 Párování plateb  
 🟦 Import/export bankovních výpisů  
 🟦 Nastavení bankovních účtů  
 🟦 Statistiky a reporty  
 🟦 Chybové stavy  
 🟦 Role a oprávnění  
 🟦 Datový model  
 🟦 Reference  
 🟦 Známé problémy / TODO  

📁 080-Finance.md ✅  
 🟦 Úvod  
 🟦 Hlavní sekce / dlaždice  
  🟦 Přehled financí (dashboard)  
  🟦 Příjmy  
  🟦 Náklady a výdaje  
  🟦 Daně a poplatky  
  🟦 Porovnání období a analytika  
  🟦 Přehled za jednotku / nemovitost  
  🟦 Statistika a vizualizace  
  🟦 Plánování (forecasting)  
  🟦 Investice a mimořádné výdaje  
  🟦 Automatizace a pravidla  
  🟦 Saldo účtů  
  🟦 Přístupová práva pro více pronajímatelů  
 🟦 Datové modely  
 🟦 Chybové stavy  
 🟦 Role a oprávnění  
 🟦 Doporučené workflow  
 🟦 Reference  

📁 090-Energie.md ✅  
 🟦 Úvod  
 🟦 Hlavní sekce / dlaždice  
  🟦 Přehled energií  
  🟦 Odečty měřidel  
  🟦 Grafy a analýzy  
  🟦 Podklady pro vyúčtování  
  🟦 Nastavení a správa měřidel  
 🟦 Datové modely  
 🟦 Chybové stavy  
 🟦 Role a oprávnění  
 🟦 Doporučené workflow  
 🟦 Reference  

📁 100-Udrzba.md ✅  
 🟦 Úvod  
 🟦 Hlavní sekce / dlaždice  
  🟦 Hlášení závad a požadavků  
  🟦 Plánované údržby, servisy a revize  
  🟦 Provedené opravy a zásahy  
  🟦 Přehled zařízení a servisní historie  

📁 110-Komunikace.md ✅  
 🟦 Úvod  
 🟦 Hlavní sekce / dlaždice  
  🟦 Přehled komunikace  
  🟦 Detail zprávy  
  🟦 Šablony a automatizace zpráv  
  🟦 Odesílání zpráv  

📁 120-Dokumenty.md ✅  
 🟦 Úvod  
 🟦 Hlavní sekce / dlaždice  
  🟦 Knihovna šablon a vzorů  
  🟦 Tvorba a editace dokumentu  
  🟦 Personalizace a individuální úpravy  
  🟦 Podepisování a ověřování  
  🟦 Sdílení, export, archivace  
 🟦 Datové modely  
 🟦 Chybové stavy  
 🟦 Role a oprávnění  
 🟦 Doporučené workflow  
 🟦 Reference  

📁 130-Nastaveni.md ✅  
 🟦 Úvod  
 🟦 Hlavní sekce / dlaždice  
  🟦 Číselníky a číslování dokumentů  
  🟦 Zálohování, import a export  
  🟦 Zobrazení a vzhled aplikace  
  🟦 Nastavení oblíbených (strom menu)  

📁 140-Help.md ✅  
 🟦 Úvod  
 🟦 Hlavní sekce / dlaždice  
  🟦 Přehled celé aplikace  
  🟦 Popis jednotlivých modulů  
  🟦 Propojení modulů  
  🟦 Nejčastější dotazy (FAQ)  
  🟦 Rychlé tipy a doporučení  

📁 next-steps.md ✅  
 🟦 Další kroky pro vývoj aplikace  
 🟦 Zpřesni vizi a cíle  
 🟦 Návrh UX/UI a ovládání  
 🟦 Výběr technologie a architektury  
 🟦 Návrh databáze a datového modelu  
 🟦 Prototypování a MVP  
 🟦 Dokumentace a návody  
 🟦 Testování  
 🟦 Příprava na distribuci  
 🟦 Údržba a rozvoj  

📁 common-actions.md ✅  
 🟦 Katalog tlačítek a ikon  

📁 permissions-catalog.md ✅  
 🟦 Katalog oprávnění napříč aplikací  

---

## Poznámky

- Každý modul odpovídá jednomu .md souboru.
- Strom rozšiřuj podle nových modulů/dlaždic/funkcí.
- Hotové v HTML označ ručně (🌐), pokud budeš chtít sledovat i implementaci v aplikaci.
- Tento přehled rozšiřuj podle potřeby, vždy v hlavní větvi dokumentace.

---

> Přehled je generován podle obsahu Markdown dokumentace v `app-v3`. Pro detailní zobrazení položek a workflow viz jednotlivé .md soubory.
