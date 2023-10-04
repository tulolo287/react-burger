



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware("lll")))
);


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<State, any, TActions>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, State, TActions>
>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, State, unknown, TActions>;
