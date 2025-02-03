import { useState, useEffect } from 'react';
import { calculateProfit } from '@/utils/calculateProfit';
import useLocalStorage from '@/hooks/useLocalStorage';

interface Amounts {
  amount1: string | number;
  amount2: string | number;
}

export default function useProfitCalculator(buy: Amounts, sell: Amounts): number | null {
  const [profit, setProfit] = useState<number | null>(null);
  const [, setBuyAmounts] = useLocalStorage<Amounts>('buyAmounts', buy);
  const [, setSellAmounts] = useLocalStorage<Amounts>('sellAmounts', sell);

  useEffect(() => {
    setProfit(calculateProfit(buy, sell));
    setBuyAmounts(buy);
    setSellAmounts(sell);
  }, [buy, sell, setBuyAmounts, setSellAmounts]);

  return profit;
}