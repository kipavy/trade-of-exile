import { getGoldCostByCurrency } from '@/data/goldCosts';

interface TradeAmounts {
  buyAmount1: string | number;
  buyAmount2: string | number;
  sellAmount1: string | number;
  sellAmount2: string | number;
}

export function calculateGoldCost(
  tradeAmounts: TradeAmounts,
  tradeOrb: string,
  referenceOrb: string
): number | null {
  const buy1 = parseFloat(tradeAmounts.buyAmount1 as string);
  const buy2 = parseFloat(tradeAmounts.buyAmount2 as string);
  const sell1 = parseFloat(tradeAmounts.sellAmount1 as string);
  const sell2 = parseFloat(tradeAmounts.sellAmount2 as string);

  // Check if all values are valid numbers
  if (isNaN(buy1) || isNaN(buy2) || isNaN(sell1) || isNaN(sell2)) {
    return null;
  }

  const tradeOrbGoldCost = getGoldCostByCurrency(tradeOrb);
  const referenceOrbGoldCost = getGoldCostByCurrency(referenceOrb);

  const netReferenceOrbProfit = (sell2 / sell1) - (buy2 / buy1);
  
  // For 1 trade orb, the gold cost is:
  const goldCostPerTradeOrb = tradeOrbGoldCost;
  const referenceOrbCostPerTradeOrb = (sell2 / sell1) * referenceOrbGoldCost;
  
  const goldCostPerCycle = goldCostPerTradeOrb + referenceOrbCostPerTradeOrb;
  const goldCostPerReferenceOrb = goldCostPerCycle / netReferenceOrbProfit;

  return goldCostPerReferenceOrb;
}

export function formatGoldCost(goldCost: number | null): string {
  if (goldCost === null) return 'N/A';
  
  return goldCost.toLocaleString(undefined, { maximumFractionDigits: 0 });
}