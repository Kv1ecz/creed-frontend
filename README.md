# CREED.ai Educa — Front-end

React + TypeScript sobre Vite. Decisões no **ADR-003**.

## Stack

Vite · TypeScript · Tailwind · Redux Toolkit · Vitest

## Estrutura

Organização **por feature** (espelha os domínios do backend). Cada feature
agrupa componentes, slice, chamadas de API e testes:

```
features/respondentes/
├── RespondentesView.tsx
├── respondentesSlice.ts
├── respondentesApi.ts
└── respondentesSlice.test.ts
```

`features/respondentes/` é a **feature-exemplo** — use como molde.

## Setup

```bash
npm install
npm run dev
```

O Vite faz proxy de `/api` para `http://localhost:8000` (backend).

## Qualidade (ADR-003, secao 4)

| Comando | Cobre |
|---|---|
| `npm run lint` | ESLint — qualidade de código |
| `npm run format:check` | Prettier — formatação |
| `npm run typecheck` | `tsc -b --noEmit` — tipos (app + configs de build) |
| `npm run test:run` | Vitest — testes |
| `npm run check` | Tudo acima, na ordem do CI |

**Três camadas de verificação:** editor (tempo real) → pre-commit
(lint-staged, só arquivos alterados) → CI (suíte completa, obrigatório).

O pre-commit pode ser contornado com `--no-verify`; por isso o CI é o
portão final que protege a branch principal.
