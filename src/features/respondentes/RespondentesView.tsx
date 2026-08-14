// Tela da feature respondentes — referência de estrutura para as demais.
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { carregarRespondentes } from '@/features/respondentes/respondentesSlice';

export function RespondentesView() {
  const dispatch = useAppDispatch();
  const { itens, total, status, erro } = useAppSelector(
    (state) => state.respondentes,
  );

  useEffect(() => {
    void dispatch(carregarRespondentes(1));
  }, [dispatch]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold text-prisma-700">Respondentes</h1>
      <p className="mt-1 text-sm text-slate-600">
        {total} {total === 1 ? 'pessoa cadastrada' : 'pessoas cadastradas'}
      </p>

      {status === 'carregando' && (
        <p className="mt-6 text-slate-500">Carregando…</p>
      )}

      {status === 'erro' && (
        <p className="mt-6 rounded border border-red-200 bg-red-50 p-3 text-red-700">
          {erro} Tente recarregar a página.
        </p>
      )}

      {status === 'pronto' && itens.length === 0 && (
        <p className="mt-6 text-slate-500">
          Nenhum respondente ainda. Cadastre o primeiro para começar a coleta.
        </p>
      )}

      {status === 'pronto' && itens.length > 0 && (
        <ul className="mt-6 divide-y divide-slate-200">
          {itens.map((respondente) => (
            <li key={respondente.id} className="py-3">
              <span className="font-medium">{respondente.nome}</span>
              <span className="ml-2 text-sm text-slate-500">
                {respondente.pais ?? '—'}
                {respondente.idade !== null &&
                  `, ${String(respondente.idade)} anos`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
