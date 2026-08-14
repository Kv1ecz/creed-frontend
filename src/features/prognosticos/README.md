# Feature: prognosticos

STUB — replicar a estrutura de `features/respondentes/` (ADR-003, secao 3):

```
prognosticos/
├── PrognosticosView.tsx
├── components/
├── prognosticosSlice.ts
├── prognosticosApi.ts
└── prognosticosSlice.test.ts
```

Regra que vale para dashboards: o front recebe dados **já agregados e
calculados** pelo backend. Nunca agregar aqui (ADR-001, secao 4.1).
