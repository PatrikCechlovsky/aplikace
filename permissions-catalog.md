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
- `modul.sekce.importovat` — právo importovat data
- `modul.sekce.audit` — právo zobrazit historii/audit
- `modul.sekce.hromadneakce` — právo provádět hromadné akce
- `modul.sekce.notifikace` — právo nastavovat notifikace
- `modul.sekce.nastaveni` — právo přístup k nastavení sekce/modulu

---

## Hierarchie oprávnění: Nemovitost

📁 **nemovitost**
- 🟦 **prehled**
  - 👁️ **prehlednemovitosti**
    - nemovitost.prehled.prehlednemovitosti.zobrazit
    - nemovitost.prehled.prehlednemovitosti.filtrovat
    - nemovitost.prehled.prehlednemovitosti.exportovat
    - nemovitost.prehled.prehlednemovitosti.importovat
    - nemovitost.prehled.prehlednemovitosti.hromadneakce
    - nemovitost.prehled.prehlednemovitosti.audit
  - 📝 **pridatnemovitost**
    - nemovitost.prehled.pridatnemovitost.zobrazit
    - nemovitost.prehled.pridatnemovitost.pridat
  - 📝 **editacenemovitosti**
    - nemovitost.prehled.editacenemovitosti.zobrazit
    - nemovitost.prehled.editacenemovitosti.editovat
  - 👁️ **detailnemovitosti**
    - nemovitost.prehled.detailnemovitosti.zobrazit
    - nemovitost.prehled.detailnemovitosti.historie
    - nemovitost.prehled.detailnemovitosti.archivovat
    - nemovitost.prehled.detailnemovitosti.mazat
    - nemovitost.prehled.detailnemovitosti.spravovatopravneni
    - nemovitost.prehled.detailnemovitosti.dokumenty
    - nemovitost.prehled.detailnemovitosti.statistiky
    - nemovitost.prehled.detailnemovitosti.notifikace
    - nemovitost.prehled.detailnemovitosti.nastaveni
- 🟦 **prehledjednotek**
  - 👁️ **prehledjednotek**
    - nemovitost.prehledjednotek.prehledjednotek.zobrazit
    - nemovitost.prehledjednotek.prehledjednotek.filtrovat
    - nemovitost.prehledjednotek.prehledjednotek.exportovat
    - nemovitost.prehledjednotek.prehledjednotek.importovat
    - nemovitost.prehledjednotek.prehledjednotek.hromadneakce
    - nemovitost.prehledjednotek.prehledjednotek.audit
  - 📝 **pridatjednotku**
    - nemovitost.prehledjednotek.pridatjednotku.zobrazit
    - nemovitost.prehledjednotek.pridatjednotku.pridat
  - 📝 **editacejednotky**
    - nemovitost.prehledjednotek.editacejednotky.zobrazit
    - nemovitost.prehledjednotek.editacejednotky.editovat
  - 👁️ **detailjednotky**
    - nemovitost.prehledjednotek.detailjednotky.zobrazit
    - nemovitost.prehledjednotek.detailjednotky.historie
    - nemovitost.prehledjednotek.detailjednotky.archivovat
    - nemovitost.prehledjednotek.detailjednotky.mazat
    - nemovitost.prehledjednotek.detailjednotky.spravovatopravneni
    - nemovitost.prehledjednotek.detailjednotky.dokumenty
    - nemovitost.prehledjednotek.detailjednotky.statistiky
    - nemovitost.prehledjednotek.detailjednotky.notifikace
    - nemovitost.prehledjednotek.detailjednotky.nastaveni

- 🟦 **importexport**
  - nemovitost.importexport.zobrazit
  - nemovitost.importexport.exportovat
  - nemovitost.importexport.importovat
  - nemovitost.importexport.audit

- 🟦 **auditnilog**
  - nemovitost.auditnilog.zobrazit
  - nemovitost.auditnilog.detail

- 🟦 **statistiky**
  - nemovitost.statistiky.zobrazit
  - nemovitost.statistiky.exportovat

- 🟦 **dokumenty**
  - nemovitost.dokumenty.zobrazit
  - nemovitost.dokumenty.pridat
  - nemovitost.dokumenty.mazat

- 🟦 **nastaveni**
  - nemovitost.nastaveni.zobrazit
  - nemovitost.nastaveni.editovat

- 🟦 **notifikace**
  - nemovitost.notifikace.zobrazit
  - nemovitost.notifikace.editovat

- 🟦 **pruvodce**
  - nemovitost.pruvodce.zobrazit
  - nemovitost.pruvodce.editovat

- 🟦 **vazby**
  - nemovitost.vazby.zobrazit

---

## Hierarchie oprávnění: Najemnik

📁 **najemnik**
- 🟦 **prehled**
  - 👁️ **prehlednajemniku**
    - najemnik.prehled.prehlednajemniku.zobrazit
    - najemnik.prehled.prehlednajemniku.filtrovat
    - najemnik.prehled.prehlednajemniku.exportovat
    - najemnik.prehled.prehlednajemniku.importovat
    - najemnik.prehled.prehlednajemniku.hromadneakce
    - najemnik.prehled.prehlednajemniku.audit
  - 📝 **pridatnajemnika**
    - najemnik.prehled.pridatnajemnika.zobrazit
    - najemnik.prehled.pridatnajemnika.pridat
  - 📝 **editacenajemnika**
    - najemnik.prehled.editacenajemnika.zobrazit
    - najemnik.prehled.editacenajemnika.editovat
  - 👁️ **detailnajemnika**
    - najemnik.prehled.detailnajemnika.zobrazit
    - najemnik.prehled.detailnajemnika.historie
    - najemnik.prehled.detailnajemnika.archivovat
    - najemnik.prehled.detailnajemnika.mazat
    - najemnik.prehled.detailnajemnika.spravovatopravneni
    - najemnik.prehled.detailnajemnika.dokumenty
    - najemnik.prehled.detailnajemnika.statistiky
    - najemnik.prehled.detailnajemnika.notifikace
    - najemnik.prehled.detailnajemnika.nastaveni
- 🟦 **spravazastupcu**
  - 👁️ **prehledzastupcu**
    - najemnik.spravazastupcu.prehledzastupcu.zobrazit
    - najemnik.spravazastupcu.prehledzastupcu.filtrovat
    - najemnik.spravazastupcu.prehledzastupcu.hromadneakce
  - 📝 **pridateditovatzastupce**
    - najemnik.spravazastupcu.pridateditovatzastupce.zobrazit
    - najemnik.spravazastupcu.pridateditovatzastupce.editovat
- 🟦 **auditnilog**
  - najemnik.auditnilog.zobrazit
  - najemnik.auditnilog.detail
- 🟦 **statistiky**
  - najemnik.statistiky.zobrazit
  - najemnik.statistiky.exportovat
- 🟦 **importexport**
  - najemnik.importexport.zobrazit
  - najemnik.importexport.importovat
  - najemnik.importexport.exportovat
  - najemnik.importexport.audit
- 🟦 **dokumenty**
  - najemnik.dokumenty.zobrazit
  - najemnik.dokumenty.pridat
  - najemnik.dokumenty.mazat
- 🟦 **nastaveni**
  - najemnik.nastaveni.zobrazit
  - najemnik.nastaveni.editovat
- 🟦 **notifikace**
  - najemnik.notifikace.zobrazit
  - najemnik.notifikace.editovat
- 🟦 **pruvodce**
  - najemnik.pruvodce.zobrazit
  - najemnik.pruvodce.editovat
- 🟦 **vazby**
  - najemnik.vazby.zobrazit

---

> Tento katalog slouží jako základ pro správu práv, rolí a funkčností napříč aplikací.  
> Při změnách vždy aktualizuj tuto strukturu dle stromové hierarchie modulů!