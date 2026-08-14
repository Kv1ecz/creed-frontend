// Slice Redux da feature respondentes (RTK).
// Estado de servidor gerido com createAsyncThunk; quando os contratos REST
// estabilizarem, avaliar migrar para RTK Query (ADR-003, secao 2).
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { respondentesApi } from '@/features/respondentes/respondentesApi';
import type { Respondente } from '@/types/api';

interface RespondentesState {
  itens: Respondente[];
  total: number;
  status: 'idle' | 'carregando' | 'pronto' | 'erro';
  erro: string | null;
}

const initialState: RespondentesState = {
  itens: [],
  total: 0,
  status: 'idle',
  erro: null,
};

export const carregarRespondentes = createAsyncThunk(
  'respondentes/carregar',
  async (pagina: number) => respondentesApi.listar({ pagina }),
);

const respondentesSlice = createSlice({
  name: 'respondentes',
  initialState,
  reducers: {
    limparErro(state) {
      state.erro = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(carregarRespondentes.pending, (state) => {
        state.status = 'carregando';
        state.erro = null;
      })
      .addCase(carregarRespondentes.fulfilled, (state, action) => {
        state.status = 'pronto';
        state.itens = action.payload.itens;
        state.total = action.payload.total;
      })
      .addCase(carregarRespondentes.rejected, (state, action) => {
        state.status = 'erro';
        state.erro =
          action.error.message ?? 'Não foi possível carregar a lista.';
      });
  },
});

export const { limparErro } = respondentesSlice.actions;
export default respondentesSlice.reducer;
