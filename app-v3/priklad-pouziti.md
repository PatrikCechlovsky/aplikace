# 🎯 Příklad použití: Před a Po

## ❌ PŘED - Neefektivní způsob

**Uživatel zadá úkol:**
> "Copilot, přidej sekci pro správu dokumentů do modulu Dokumenty.md"

**Uživatel musí opakovat pravidla:**
> "Pamatuj:  
> - Nikdy nic nemaž, pouze přeškrtávej  
> - Každá nová ikona musí být v common-actions.md  
> - Na začátku sekce vlož checklist z checklist-dlazdice-formular.md  
> - Používaj stavové ikonky ✅ ⏳ 🌐 🚫  
> - Aktualizuj stromovou strukturu  
> - Aktualizuj struktura-app.md..."

**Problém:** Dlouhé, opakující se instrukce při každém úkolu!

---

## ✅ PO - Efektivní způsob

**Uživatel zadá úkol:**
> "Copilot, přidej sekci pro správu dokumentů do modulu Dokumenty.md"

**Copilot odpoví:**
> "✅ Přečetl jsem pravidla-pro-copilot.md  
> ✅ Budu postupovat podle kontrolního checklistu  
> ✅ NIKDY nebudu mazat - pouze přeškrtávat  
> ✅ Aktualizuji stromovou strukturu po změnách"

**Výsledek:** Krátké potvrzení, všechna pravidla jsou dodržena!

---

## 🔄 Workflow pro Copilot

### 1. Příprava (jednou za session)
```
1. Otevři pravidla-pro-copilot.md
2. Projdi kontrolní checklist 
3. Ulož si pravidla-rychly-prehled.md jako referenci
```

### 2. Před každým úkolem
```
✅ Vím, který modul upravuji?
✅ Rozumím požadované změně?  
✅ Budu používat ~~přeškrtání~~ místo mazání?
✅ Začnu sekci checklistem?
```

### 3. Po dokončení úkolu
```
✅ Aktualizoval jsem stromovou strukturu?
✅ Přidal jsem nové ikony do common-actions.md?
✅ Používám správné stavové ikonky?
✅ Odkazuji na související moduly?
```

---

## 💡 Praktické tipy

### Pro uživatele:
- **Místo dlouhých instrukcí** stačí: "Postupuj podle pravidel-pro-copilot.md"
- **Pro rychlé připomenutí:** "Zkontroluj si pravidla-rychly-prehled.md"

### Pro Copilot:
- **Vždy na začátku:** Potvrdím, že jsem si přečetl pravidla
- **Při nejistotě:** Vrátím se k pravidla-rychly-prehled.md
- **Před odesláním:** Projdu kontrolní otázky

---

> **🎯 Výsledek:** Efektivní komunikace bez opakování pravidel!