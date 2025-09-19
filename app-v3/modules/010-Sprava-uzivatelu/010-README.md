# Univerzální seznam kroků pro úpravu modulů

> **Platí pro všechny moduly (010, 020, ...). Dodržuj ZÁSADU: nikdy nic nemaž! Jen přidávej nebo aktualizuj v souladu s pravidly.**

---

## 1. Přečíst si pravidla projektu
- [ ] Otevři a pročti si `pravidla.md` a `README.md` v kořeni repozitáře.
- [ ] Připrav (nebo aktualizuj) vlastní `010-README.md` pro tento modul.

## 2. Definice cíle úpravy
- [ ] Jasně si stanov, co je třeba v tomto modulu změnit (např. opravit chyby, přidat funkci, aktualizovat texty).
- [ ] Pokud je potřeba změnit více modulů najednou (např. 010 a 020), ověř, že změny nejsou konfliktní.

## 3. Vytvoření větve (branch)
- [ ] Vytvoř novou větev pojmenovanou podle modulu a typu změny (např. `modul-010-update` nebo `moduly-010-020-upravy`).

## 4. Provedení změn
- [ ] Proveď potřebné úpravy v souborech modulu (`app-v3/modules/010-*.md`).
- [ ] Pokud je potřeba něco přidat, přidávej (NEMAŽEŠ existující obsah, pouze doplňuješ nebo aktualizuješ v souladu s pravidly).

## 5. Kontrola dodržení pravidel
- [ ] Zkontroluj, že změny odpovídají pravidlům v `pravidla.md` (např. struktura obsahu, pojmenování, zákaz mazání).
- [ ] Ověř, že `README.md` zůstává aktuální, případně jej aktualizuj při změně struktury nebo popisu modulů.

## 6. Commit a push
- [ ] Commituj změny s jasnou zprávou (např. „Aktualizace modulu 010 dle pravidel“).
- [ ] Pushni větev na GitHub.

## 7. Pull Request (PR)
- [ ] Vytvoř pull request s jasným názvem a popisem změn.
- [ ] Do PR přidej odkaz (nebo výčet), jaká pravidla byla dodržena a proč je změna potřeba.

## 8. Code review a schválení
- [ ] Požádej o code review, případně zodpověz připomínky.
- [ ] Po schválení PR slouč (merge) do hlavní větve.

## 9. Opakuj pro další moduly
- [ ] Pokud máš připravený checklist, můžeš tento proces snadno replikovat pro další moduly.

---

### Poznámky k souběžné práci na více modulech

- Pokud jsou moduly zcela nezávislé, můžeš na nich pracovat paralelně ve stejné větvi.
- Pokud mají vazby, doporučuji řešit jeden po druhém (nebo pečlivě řešit konflikty).
- Nikdy nedělej změny na hlavní větvi, vždy používej samostatné branche!