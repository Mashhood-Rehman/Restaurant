import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'; 
import storage from "redux-persist/lib/storage";
import productReducer from "./product";
import cartReducer from "./cartSlice";
import { apiSlice } from "../../features/apiSlice";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(apiSlice.middleware), // 👈 attach RTK Query middleware
});

const persistor = persistStore(store);

export { store, persistor };
