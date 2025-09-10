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

## Hrubý katalog podle modulů a sekcí

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