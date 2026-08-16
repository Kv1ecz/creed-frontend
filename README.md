# CREED.ai Educa — Front-end

React + TypeScript sobre Vite. Decisões no **ADR-003**.

## Stack

Vite · TypeScript · Tailwind v4 · shadcn/ui · Redux Toolkit · i18next · Vitest

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

## UI — shadcn/ui

Componentes são **copiados** para `src/components/ui/`, não instalados como
dependência: o código é nosso e pode ser editado.

Já instalados: `button`, `card`, `input`, `label`. Para os próximos:

```bash
npx shadcn@latest add dialog table select
```

Tailwind está na **v4** — sem `tailwind.config.js`. Tokens de tema vivem em
[`src/index.css`](src/index.css): `@theme` para os tokens do projeto (cores
`prisma`, fontes) e `@theme inline` para ligar as variáveis do shadcn
(`--background`, `--primary`, …) às classes utilitárias. Tema escuro pela
classe `.dark` no elemento raiz.

Junte classes condicionais com `cn()` de [`src/lib/utils.ts`](src/lib/utils.ts).

## Internacionalização — i18next

```
src/i18n/
├── config.ts          # init, detecção de idioma, fallbacks
└── locales/
    ├── pt-BR.ts       # fonte da verdade
    └── en.ts          # tipado por pt-BR: chave faltando = erro de build
```

Idioma padrão **pt-BR**; detectado do `localStorage` (`creed.idioma`) e depois
do navegador. Namespaces espelham as features — `comum` para o compartilhado.
O `<html lang>` acompanha a troca de idioma.

```tsx
// Declare os namespaces da tela: é o que dá o autocomplete das chaves.
// O primeiro é o padrão para chaves sem prefixo.
const { t } = useTranslation(['comum', 'respondentes']);
t('acoes.salvar');
t('respondentes:titulo');
t('respondentes:contagem', { count: 3 }); // "3 pessoas cadastradas"
```

As chaves são **tipadas** ([`src/types/i18next.d.ts`](src/types/i18next.d.ts)):
chave inexistente não compila. Ao criar uma feature, adicione o namespace nos
dois arquivos de `locales/`.

[`SeletorIdioma`](src/components/SeletorIdioma.tsx) é o exemplo de shadcn/ui e
i18n juntos; o seu teste é o molde para testes de componente.

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
