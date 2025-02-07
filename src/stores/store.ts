import { configureStore } from '@reduxjs/toolkit';
import tradeReducer from '@/stores/slices/tradeSlice';
import currencyReducer from '@/stores/slices/currencySlice';

const store = configureStore({
  reducer: {
    trade: tradeReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;