# Modul: Pronajímatel

## 📋 Přehled
**Účel:** Správa pronajímatelů nemovitostí (osoby, firmy, instituce) a jejich zástupců.  
**Databázová tabulka:** `Subjekt`  
**Stav:** 🟡 Návrh / vývoj

---

## 🏗️ Základní struktura modulu

- **Typy pronajímatelů:**  
  - 👤 Fyzická osoba
  - 🧑‍💼 OSVČ
  - 🏢 Firma (s.r.o., a.s., apod.)
  - 🫂 Spolek/skupina
  - 🏛️ Státní instituce
  - 🤝 Zastupující osoba

## 🧑‍💼 Průvodce založením
V každém formuláři (např. **Jednotka**, **Nájemník**, **Smlouva**) bude tlačítko  
🌸 **„Spustit průvodce“**  
Uživatel může:  
- ✅ Pokračovat v průvodci a uložit rozpracovaná data.  
- 🏁 Přeskočit kroky, které nezná nebo nechce řešit hned.  
- 💾 Uložit stav a vrátit se později.

- **Vazba na jiné moduly:**
  - **Nemovitost** = **Jednotka** = **Nájemník** = **Smlouva** = **Služby** = **Platby** = **Uživatelé**
  - **Nemovitosti:** Pronajímatel je vlastníkem/uživatelem nemovitosti.
  - **Jednotka/byt:** Nemovitosti mají jednotky/byty
  - **Smlouvy:** Pronajímatel je smluvní stranou.
  - **Služby:** Pronajímatel definuje rozpis záloh, kauce a datumy plateb 
  - **Platby:** Pronajímatel je příjemcem plateb.
  - **Uživatelé:** Správce/administrátor modulu.

---

## 🗃️ Datový model
> Pronajímatelé se ukládají do tabulky **Subjekt**.  
Základní pole (návrh):

```javascript
{
  id: string,
  typ_subjektu: 'osoba' | 'osvc' | 'firma' | 'spolek' | 'stat',
  nazev: string,         // název firmy/spolku/organizace
  jmeno: string,         // pro osoby/osvč
  prijmeni: string,      // pro osoby/osvč
  ico: string,
  dic: string,
  // kontakty, adresy, bankovní účet, atd.
  // další pole dle potřeb
}
```
## 📋 Funkce v přehledu
- 🔍 Filtrace podle typu subjektu
- 🔄 Změna stavu (aktivní / archivovaný)
- 📑 Zobrazení dokumentů
- 🏢 Zobrazení připojených jednotek
- ✳️ Správa rolí
- 📤 Export seznamu
- ➕ Přidat nového pronajímatele
- 📜 Auditní log / historie změn
- 📊 Statistiky pronajímatelů (např. počet jednotek)
---

## 🔘 Hlavní funkce / tlačítka

- spustit průvodce pro založení nebo pokračovat v dokončení zakládání přes průvodce

- ✅ **Přidat pronajímatele**
- ✏️ **Upravit pronajímatele**
- 👁️ **Zobrazit detail**
- 📁 **Archivovat**
- 🗑️ **Smazat** půjde jen záznam který nemá vazby, historii 
- 🔁 **Obnovit přístup / zneplatnit**
- ➕ **Přidat zástupce**
- 📤 **Exportovat seznam**
- 📥 **Importovat (hromadně)**
- 🔍 **Vyhledávání / filtrování**
- 📑 **Zobrazit dokumenty**
- 📊 **Statistiky využití**
- 🧑‍💼 **Přiřadit správce / uživatele**
- ⚙️ **Nastavení modulu**
- ✅ Uložit
- 📑 Přidat dokument
- 🏢 Připojit jednotku
- 🔒 Přiřadit oprávnění
- 📨 Vygenerovat přístup / pozvánku
- ✳️ Přiřadit roli
- 🗄️ Archivovat subjekt
- ⛔ Zablokovat subjekt
- 📤 Export dat subjektu
- 📜 Zobrazit historii změn

---

## 🛡️ Role a oprávnění

- **Administrátor:** plné oprávnění
- **Správce nemovitostí:** správa pronajímatelů a jejich zástupců
- **Účetní:** přístup k údajům pro fakturaci, exporty
- **Prohlížející:** pouze nahlížení

---

## 🔄 Typické workflow

1. **Vytvoření nového pronajímatele** (ručně / importem)
2. **Přiřazení zástupce** (volitelně)
3. **Propojení s nemovitostí a smlouvou**
4. **Správa údajů, archivace, exporty**

---

## 📝 Poznámky pro vývojáře

- Pronajímatelé budou uloženi v tabulce **Subjekt** (společné pro další entity)
- Modul využívá komponenty: FormLinking, AttachmentSystem, FormGuard (viz uživatelé)
- Pro typy subjektů používej konzistentní kódování (`osoba`, `firma`, ...)
- Ošetři validace (IČO, DIČ, e-mail, bankovní účet)
- V budoucnu plánována integrace s ARES a dalšími registry

---

## 🐛 Známé problémy / TODO

- [ ] Ošetřit duplicity (stejný IČO, e-mail)
- [ ] Ověření dat proti ARES/CZ registry
- [ ] Přehled napojení na další entity
- [ ] Detailní logování akcí

---

## 🎨 Poznámky k UI/UX (návrhy tlačítek)

- Hlavní barva tlačítek: #4cc9f0  
- Ikony viz výše, jednotné rozměry (24x24px)
- Akční tlačítka v tabulce: [👁️][✏️][📁][🗑️]
- Hromadné akce nad tabulkou: [➕][📥][📤][🔍]

---

## 💡 Poznámky, nápady, úkoly

Sem si piš vše, co tě napadne k modulu Pronajímatel...
1. vytvořit průvodce pro založení **Nemovitost** = **Jednotka** = **Nájemník** = **Smlouva** = **Služby** = **Platby**
  bude mít několik záložek, na každé záložce bude formulář jednotlivých modulů, bude možné uložit rozpracované a později dokončit
  záložky se budou například zabarvovat podle toho zda jsou dokončené
  ✅ Pokračovat v průvodci a uložit rozpracovaná data.
  🏁 Přeskočit kroky, které uživatel nezná/nechce řešit.
  💾 Uložit stav a vrátit se později.

3. potřebuju vidět propojení (vazby) jaké má nemovitosti, jaké smlouvy a jaké trable
  chtěl bych si mít možnost nastavit ve svém profilu vybrané pronajímatele a mít možnost přepnout a vidět všechny na které mám přístup

---

> Tento dokument bude rozšiřován podle vývoje a potřeb projektu.
