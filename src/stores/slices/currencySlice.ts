import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currenciesWithGold, CurrencyWithGold, getCurrencyByValue } from '@/data/goldCosts';

interface CurrencyState {
  currency: string;
  currencyIcon: string;
  currencies: CurrencyWithGold[];
}

const localStorageKey = 'currency';

const initialState: CurrencyState = {
  currency: localStorage.getItem(localStorageKey) || 'divine',
  currencyIcon: getCurrencyByValue(localStorage.getItem(localStorageKey) || 'divine')?.icon || '',
  currencies: currenciesWithGold,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
      const selectedCurrency = getCurrencyByValue(action.payload);
      state.currencyIcon = selectedCurrency?.icon || '';
      localStorage.setItem(localStorageKey, action.payload);
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;