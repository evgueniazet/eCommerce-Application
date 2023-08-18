import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootStateType, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
