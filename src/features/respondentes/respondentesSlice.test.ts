// Testes colocados junto ao código da feature (ADR-003, secao 3).
import { describe, expect, it } from 'vitest';
import reducer, {
  carregarRespondentes,
  limparErro,
} from '@/features/respondentes/respondentesSlice';

const estadoInicial = {
  itens: [],
  total: 0,
  status: 'idle' as const,
  erro: null,
};

describe('respondentesSlice', () => {
  it('marca carregando ao iniciar a busca', () => {
    const estado = reducer(estadoInicial, carregarRespondentes.pending('', 1));
    expect(estado.status).toBe('carregando');
  });

  it('guarda os itens quando a busca conclui', () => {
    const payload = {
      itens: [],
      total: 7,
      pagina: 1,
      tamanho_pagina: 50,
    };
    const estado = reducer(
      estadoInicial,
      carregarRespondentes.fulfilled(payload, '', 1),
    );
    expect(estado.status).toBe('pronto');
    expect(estado.total).toBe(7);
  });

  it('limpa o erro', () => {
    const comErro = { ...estadoInicial, erro: 'falhou' };
    expect(reducer(comErro, limparErro()).erro).toBeNull();
  });
});
