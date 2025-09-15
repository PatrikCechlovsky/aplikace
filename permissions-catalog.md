# Centrální katalog oprávnění napříč aplikací

Tento katalog obsahuje základní sadu oprávnění (práv) pro všechny moduly, sekce a dlaždice.  
Při přidávání/úpravě modulů rozšiř tento katalog o nové entity.

---

## Vzorová struktura oprávnění

- `modul.sekce.zobrazit` — právo zobrazit sekci/entitu
- `modul.sekce.editovat` — právo editovat údaje v sekci
- `modul.sekce.pridat` — právo přidat nový záznam
- `modul.sekce.mazat` — právo smazat záznam
- `modul.sekce.schvalovat` — právo schvalovat (pokud relevantní)
- `modul.sekce.exportovat` — právo exportovat data
- `modul.sekce.audit` — právo zobrazit historii/audit

---

## Hierarchie oprávnění: Správa uživatelů

📁 **spravauzivatelu**
- 🟦 **seznamuzivatelu**
  - 👁️ **prehleduzivatelu**
    - spravauzivatelu.seznamuzivatelu.prehleduzivatelu.zobrazit
    - spravauzivatelu.seznamuzivatelu.prehleduzivatelu.detail
    - spravauzivatelu.seznamuzivatelu.prehleduzivatelu.filtrovat
    - spravauzivatelu.seznamuzivatelu.prehleduzivatelu.exportovat
    - spravauzivatelu.seznamuzivatelu.prehleduzivatelu.importovat
    - spravauzivatelu.seznamuzivatelu.prehleduzivatelu.hromadneakce
    - spravauzivatelu.seznamuzivatelu.prehleduzivatelu.audit
  - 📝 **pridatpozvatuzivatele**
    - spravauzivatelu.seznamuzivatelu.pridatpozvatuzivatele.zobrazit
    - spravauzivatelu.seznamuzivatelu.pridatpozvatuzivatele.pridat
    - spravauzivatelu.seznamuzivatelu.pridatpozvatuzivatele.pozvat
  - 📝 **editaceuzivatele**
    - spravauzivatelu.seznamuzivatelu.editaceuzivatele.zobrazit
    - spravauzivatelu.seznamuzivatelu.editaceuzivatele.editovat
  - 👁️ **detailuzivatele**
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.zobrazit
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.historie
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.blokovat
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.odblokovat
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.archivovat
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.odeslatpozvanku
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.resetovatheslo
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.spravovatopravneni
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.dokumenty
    - spravauzivatelu.seznamuzivatelu.detailuzivatele.funkce

- 🟦 **spravaroliaopravneni**
  - 👁️ **prehledroliopravneni**
    - spravauzivatelu.spravaroliaopravneni.prehledroliopravneni.zobrazit
  - 📝 **pridateditovatrolifunkci**
    - spravauzivatelu.spravaroliaopravneni.pridatrolizobrazit
    - spravauzivatelu.spravaroliaopravneni.pridatrolieditovat
    - spravauzivatelu.spravaroliaopravneni.editovatrolizobrazit
    - spravauzivatelu.spravaroliaopravneni.editovatrolieditovat
    - spravauzivatelu.spravaroliaopravneni.pridatfunkcizobrazit
    - spravauzivatelu.spravaroliaopravneni.pridatfunkcieditovat
    - spravauzivatelu.spravaroliaopravneni.editovatfunkcizobrazit
    - spravauzivatelu.spravaroliaopravneni.editovatfunkcieditovat
  - **prehledy**
    - spravauzivatelu.spravaroliaopravneni.prehledroli.zobrazit
    - spravauzivatelu.spravaroliaopravneni.prehledstavu.zobrazit
    - spravauzivatelu.spravaroliaopravneni.prehledpravkjednotce.zobrazit
    - spravauzivatelu.spravaroliaopravneni.prehledfunkci.zobrazit

- 🟦 **prehledpozvanek**
  - 👁️ **seznampozvanek**
    - spravauzivatelu.prehledpozvanek.seznampozvanek.zobrazit
    - spravauzivatelu.prehledpozvanek.seznampozvanek.detail
    - spravauzivatelu.prehledpozvanek.seznampozvanek.odeslat
    - spravauzivatelu.prehledpozvanek.seznampozvanek.stornovat

- 🟦 **spravalicenci**
  - 👁️ **prehledlicenci**
    - spravauzivatelu.spravalicenci.prehledlicenci.zobrazit
    - spravauzivatelu.spravalicenci.prehledlicenci.editovat
    - spravauzivatelu.spravalicenci.prehledlicenci.pridat
    - spravauzivatelu.spravalicenci.prehledlicenci.mazat
    - spravauzivatelu.spravalicenci.prehledlicenci.audit

- 🟦 **importexportuzivatelu**
    - spravauzivatelu.importexportuzivatelu.zobrazit
    - spravauzivatelu.importexportuzivatelu.importovat
    - spravauzivatelu.importexportuzivatelu.exportovat
    - spravauzivatelu.importexportuzivatelu.audit

- 🟦 **auditnilog**
    - spravauzivatelu.auditnilog.zobrazit
    - spravauzivatelu.auditnilog.detail

---

## Další moduly (příklady)

### Finance
- finance.dashboard.zobrazit
- finance.prijmy.zobrazit, editovat, pridat, mazat, exportovat, audit
- finance.naklady.zobrazit, editovat, pridat, mazat, exportovat, audit
- finance.dane.zobrazit, editovat, pridat, mazat, exportovat, audit

### Energie
- energie.prehled.zobrazit
- energie.odecet.zobrazit, editovat, pridat, mazat, exportovat, audit
- energie.grafy.zobrazit, exportovat
- energie.vyuctovani.zobrazit, exportovat

### Služby
- sluzby.zalohy.zobrazit, editovat, pridat, mazat, exportovat, audit
- sluzby.kauce.zobrazit, editovat, pridat, mazat, exportovat, audit
- sluzby.platby.zobrazit, editovat, pridat, mazat, exportovat, audit
- sluzby.meridla.zobrazit, editovat, pridat, mazat, exportovat, audit
- sluzby.vyuctovani.zobrazit, exportovat

### Dokumenty
- dokumenty.sablony.zobrazit, editovat, pridat, mazat, exportovat, audit
- dokumenty.tvorba.zobrazit, editovat, pridat, mazat, exportovat, audit
- dokumenty.personalizace.zobrazit, editovat
- dokumenty.podpis.zobrazit, editovat

### Komunikace
- komunikace.prehled.zobrazit, exportovat, audit
- komunikace.detail.zobrazit, editovat
- komunikace.sablony.zobrazit, editovat, pridat, mazat, exportovat, audit
- komunikace.odesilani.zobrazit, pridat
- komunikace.nastaveni.zobrazit, editovat

### Udržba
- udrzba.hlaseni.zobrazit, editovat, pridat, mazat, exportovat, audit
- udrzba.plan.zobrazit, editovat, pridat, mazat, exportovat, audit
- udrzba.opravy.zobrazit, editovat, pridat, mazat, exportovat, audit
- udrzba.zarizeni.zobrazit, editovat, pridat, mazat, exportovat, audit

### Smlouva
- smlouva.najemni.zobrazit, editovat, pridat, mazat, exportovat, audit
- smlouva.vzor.zobrazit, editovat, pridat, mazat, exportovat, audit
- smlouva.protokol.zobrazit, editovat, pridat, mazat, exportovat, audit
- smlouva.archiv.zobrazit, exportovat, audit

### Nemovitost
- nemovitost.seznam.zobrazit, editovat, pridat, mazat, exportovat, audit
- nemovitost.jednotky.zobrazit, editovat, pridat, mazat, exportovat, audit

### Můj účet
- mujucet.udaje.zobrazit, editovat
- mujucet.bezpecnost.zobrazit, editovat
- mujucet.notifikace.zobrazit, editovat
- mujucet.nastaveni.zobrazit, editovat
- mujucet.aktivita.zobrazit

### Pronajímatel
- pronajimatel.seznam.zobrazit, editovat, pridat, mazat, exportovat, audit

### Help/Nápověda
- help.zobrazit

---

Tento katalog slouží jako základ pro správu práv, rolí a funkčností napříč aplikací.  
Při změnách vždy aktualizuj tuto strukturu dle stromové hierarchie modulů!
