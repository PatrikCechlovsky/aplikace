# 🔗 Závislosti mezi moduly

## Diagram vztahů
```
┌─────────────┐     ┌────────────┐     ┌─────────────┐
│ Pronajímatel├─────┤ Nemovitosti├─────┤  Nájemníci  │
└──────┬──────┘     └──────┬─────┘     └──────┬──────┘
       │                   │                   │
       │            ┌──────▼─────┐            │
       └────────────┤  Smlouvy   ├────────────┘
                    └──────┬─────┘
                           │
                    ┌──────▼─────┐
                    │   Platby   │
                    └──────┬─────┘
                           │
                    ┌──────▼─────┐
                    │Vyúčtování  │
                    └────────────┘
```

## Kritické závislosti
1. **Smlouva** vyžaduje:
   - ✅ Pronajímatel (povinný)
   - ✅ Nemovitost (povinná)
   - ✅ Nájemník (povinný)

2. **Platba** vyžaduje:
   - ✅ Smlouva (povinná)
   - → Pronajímatel (přes smlouvu)
   - → Nájemník (přes smlouvu)

3. **Nemovitost** vyžaduje:
   - ✅ Pronajímatel (povinný vlastník)

## Dopad smazání
- **Pronajímatel**: Nelze smazat pokud vlastní nemovitosti
- **Nájemník**: Nelze smazat pokud má aktivní smlouvy
- **Nemovitost**: Nelze smazat pokud má aktivní smlouvy
- **Smlouva**: Varování při existenci plateb
