import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import {
  locationReducer,
  categoryReducer,
  settingsReducer,
} from "./reducers";

const reduxDevtoolExtension = window?.__REDUX_DEVTOOLS_EXTENSION__?.__REDUX_DEVTOOLS_EXTENSION__();

// REDUX PERSISTENT STORE CONFIGURATION
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['category', 'location'],
  blacklist: ['settings']
}

const rootReducer = combineReducers({
  // whitelist (Persist)
  category: categoryReducer,
  location: locationReducer,

  // blacklist (Temporary)
  settings: settingsReducer,
});

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...[ReduxThunk, reduxDevtoolExtension].filter(f => !!f))
);


export const persistor = persistStore(store);
export default store;
