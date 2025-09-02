import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TradeState {
  buyAmount1: string;
  buyAmount2: string;
  sellAmount1: string;
  sellAmount2: string;
  profit: number | null;
  tradeOrb: string; // orb used for trade (orb that is bought and sold)
  referenceOrb: string; // final orb wanted (reference orb)
  goldCost: number | null;
}

const initialState: TradeState = {
  buyAmount1: localStorage.getItem('buyAmount1') || '',
  buyAmount2: localStorage.getItem('buyAmount2') || '',
  sellAmount1: localStorage.getItem('sellAmount1') || '',
  sellAmount2: localStorage.getItem('sellAmount2') || '',
  profit: null,
  tradeOrb: localStorage.getItem('tradeOrb') || 'regal',
  referenceOrb: localStorage.getItem('referenceOrb') || 'ex',
  goldCost: null,
};

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    setBuyAmount1: (state, action: PayloadAction<string>) => {
      state.buyAmount1 = action.payload;
      localStorage.setItem('buyAmount1', action.payload);
    },
    setBuyAmount2: (state, action: PayloadAction<string>) => {
      state.buyAmount2 = action.payload;
      localStorage.setItem('buyAmount2', action.payload);
    },
    setSellAmount1: (state, action: PayloadAction<string>) => {
      state.sellAmount1 = action.payload;
      localStorage.setItem('sellAmount1', action.payload);
    },
    setSellAmount2: (state, action: PayloadAction<string>) => {
      state.sellAmount2 = action.payload;
      localStorage.setItem('sellAmount2', action.payload);
    },
    setProfit: (state, action: PayloadAction<number | null>) => {
      state.profit = action.payload;
    },
    setTradeOrb: (state, action: PayloadAction<string>) => {
      state.tradeOrb = action.payload;
      localStorage.setItem('tradeOrb', action.payload);
    },
    setReferenceOrb: (state, action: PayloadAction<string>) => {
      state.referenceOrb = action.payload;
      localStorage.setItem('referenceOrb', action.payload);
    },
    setGoldCost: (state, action: PayloadAction<number | null>) => {
      state.goldCost = action.payload;
    },
  },
});

export const { setBuyAmount1, setBuyAmount2, setSellAmount1, setSellAmount2, setProfit, setTradeOrb, setReferenceOrb, setGoldCost } = tradeSlice.actions;

export default tradeSlice.reducer;