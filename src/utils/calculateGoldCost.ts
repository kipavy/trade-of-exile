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

  // Calculate total gold cost for the complete trade cycle
  // Cost = (buy amount of trade orb × trade orb gold cost) + (sell amount of reference orb × reference orb gold cost)
  const goldCost = (buy1 * tradeOrbGoldCost) + (sell2 * referenceOrbGoldCost);

  return goldCost;
}

export function formatGoldCost(goldCost: number | null): string {
  if (goldCost === null) return 'N/A';
  
  // Format with thousand separators
  return goldCost.toLocaleString() + ' gold';
}
