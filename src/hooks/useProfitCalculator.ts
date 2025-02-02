import { useState, useEffect } from 'react';

interface Amounts {
  amount1: string | number;
  amount2: string | number;
}

export default function useProfitCalculator(buy: Amounts, sell: Amounts): number | null {
  const [profit, setProfit] = useState<number | null>(null);

  useEffect(() => {
    const buy1 = parseFloat(buy.amount1 as string);
    const buy2 = parseFloat(buy.amount2 as string);
    const sell1 = parseFloat(sell.amount1 as string);
    const sell2 = parseFloat(sell.amount2 as string);

    if (!isNaN(buy1) && !isNaN(buy2) && !isNaN(sell1) && !isNaN(sell2) && buy2 !== 0 && sell2 !== 0) {
      const buyRatio = buy1 / buy2;
      const sellRatio = sell1 / sell2;
      setProfit((1 - sellRatio / buyRatio) * 100);
    } else {
      setProfit(null);
    }

    localStorage.setItem("buyAmount1", buy.amount1 as string);
    localStorage.setItem("buyAmount2", buy.amount2 as string);
    localStorage.setItem("sellAmount1", sell.amount1 as string);
    localStorage.setItem("sellAmount2", sell.amount2 as string);
  }, [buy, sell]);

  return profit;
}