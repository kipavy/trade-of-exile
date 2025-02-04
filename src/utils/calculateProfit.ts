interface Amounts {
    amount1: string | number;
    amount2: string | number;
  }
  
  export function calculateProfit(buy: Amounts, sell: Amounts): number | null {
    const buy1 = parseFloat(buy.amount1 as string);
    const buy2 = parseFloat(buy.amount2 as string);
    const sell1 = parseFloat(sell.amount1 as string);
    const sell2 = parseFloat(sell.amount2 as string);
  
    if (!isNaN(buy1) && !isNaN(buy2) && !isNaN(sell1) && !isNaN(sell2) && buy2 !== 0 && sell2 !== 0) {
      const buyRatio = buy1 / buy2;
      const sellRatio = sell1 / sell2;
      return (buyRatio / sellRatio - 1);
    } else {
      return null;
    }
  }