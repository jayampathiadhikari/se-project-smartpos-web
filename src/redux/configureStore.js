import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { AuthenticationReducer } from './reducers/authentication/reducer';


export const appReducer = combineReducers({
  AuthenticationReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['AuthenticationReducer']
};

const logger = createLogger({});
const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export const persistor = persistStore(store);
