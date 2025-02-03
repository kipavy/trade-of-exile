import { useState, useEffect } from 'react';
import { calculateProfit } from '@/utils/calculateProfit';
import { Amounts } from "@/types/profit"

export default function useProfitCalculator(buy: Amounts, sell: Amounts): number | null {
  const [profit, setProfit] = useState<number | null>(null);

  useEffect(() => {
    setProfit(calculateProfit(buy, sell));
  }, [buy, sell]);

  return profit;
}