// Hooks tipados do Redux — usar estes em vez dos genéricos, para não
// perder a tipagem do state e do dispatch.
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
