import { configureStore } from '@reduxjs/toolkit';
import tradeReducer from '@/stores/slices/tradeSlice';

const store = configureStore({
  reducer: {
    trade: tradeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;