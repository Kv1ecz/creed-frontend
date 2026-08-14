// Store Redux configurado com RTK (ADR-003, secao 2).
import { configureStore } from '@reduxjs/toolkit';
import respondentesReducer from '@/features/respondentes/respondentesSlice';

export const store = configureStore({
  reducer: {
    respondentes: respondentesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
