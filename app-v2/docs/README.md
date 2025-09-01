# 📚 Dokumentace aplikace Správa nemovitostí

## 🏗️ Architektura
- **Frontend:** Vanilla JavaScript (ES6+)
- **Styling:** Custom CSS s CSS variables
- **Data:** localStorage (připraveno pro backend)
- **Komponenty:** Modulární systém

## 📦 Moduly
| Modul | Stav | Priorita | Popis |
|-------|------|----------|-------|
| [Pronajímatel](modules/pronajimatel.md) | ✅ | 1 | Správa pronajímatelů |
| [Nájemníci](modules/najemnici.md) | ✅ | 1 | Správa nájemníků |
| [Nemovitosti](modules/nemovitosti.md) | 🚧 | 2 | Evidence nemovitostí |
| [Smlouvy](modules/smlouvy.md) | 📝 | 2 | Nájemní smlouvy |
| [Platby](modules/platby.md) | 📝 | 3 | Platební kalendář |
| [Vyúčtování](modules/vycty.md) | 📝 | 4 | Roční vyúčtování |
| [Žádosti](modules/zadosti.md) | 📝 | 5 | Požadavky nájemníků |

## 🔧 Komponenty
- **Modal** - univerzální modální okna
- **FormLinking** - propojování formulářů
- **AttachmentSystem** - správa příloh
- **FormGuard** - ochrana rozpracovaných formulářů

## 🚀 Rychlý start
1. Otevřete `index.html` v prohlížeči
2. Aplikace běží lokálně bez serveru
3. Data se ukládají do localStorage

## 📖 Další dokumenty
- [Závislosti mezi moduly](DEPENDENCIES.md)
- [API dokumentace](API.md)
- [Návod pro vývojáře](DEVELOPMENT.md)
