import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'; 
import storage from "redux-persist/lib/storage";
import productReducer from "./product";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export { store, persistor };
