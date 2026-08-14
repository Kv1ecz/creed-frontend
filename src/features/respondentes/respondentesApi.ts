// Chamadas ao backend para a feature respondentes.
import { apiClient } from '@/lib/apiClient';
import type {
  ListaPaginada,
  Respondente,
  RespondenteCreate,
} from '@/types/api';

interface ListarParams {
  pagina?: number;
  pais?: string;
  regiao?: string;
}

export const respondentesApi = {
  listar: ({ pagina = 1, pais, regiao }: ListarParams = {}) => {
    const params = new URLSearchParams({ pagina: String(pagina) });
    if (pais) params.set('pais', pais);
    if (regiao) params.set('regiao', regiao);
    return apiClient.get<ListaPaginada<Respondente>>(
      `/respondentes?${params.toString()}`,
    );
  },

  obter: (id: string) => apiClient.get<Respondente>(`/respondentes/${id}`),

  criar: (dados: RespondenteCreate) =>
    apiClient.post<Respondente>('/respondentes', dados),

  remover: (id: string) => apiClient.delete<void>(`/respondentes/${id}`),
};
