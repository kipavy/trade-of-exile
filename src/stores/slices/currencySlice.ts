import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import divineOrbIcon from '/divine-orb.png';
import exaltedOrbIcon from '/exalted-orb.png';

interface Currency {
  value: string;
  label: string;
  icon: string;
}

interface CurrencyState {
  currency: string;
  currencyIcon: string;
  currencies: Currency[];
}

const localStorageKey = 'currency';

const initialState: CurrencyState = {
  currency: localStorage.getItem(localStorageKey) || 'divine',
  currencyIcon: divineOrbIcon,
  currencies: [
    { value: 'ex', label: 'Exalted Orb', icon: exaltedOrbIcon },
    { value: 'divine', label: 'Divine Orb', icon: divineOrbIcon },
  ],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
      state.currencyIcon = state.currencies.find(c => c.value === action.payload)?.icon || '';
      localStorage.setItem(localStorageKey, action.payload);
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;