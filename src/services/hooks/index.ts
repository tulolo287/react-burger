import {
   TypedUseSelectorHook,
   useDispatch as dispatchHook,
   useSelector as selectorHook
 } from 'react-redux';
 import { AppDispatch, AppThunk, State } from '../../index';
 

 export const useSelector: TypedUseSelectorHook<State> = selectorHook;

 export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();