import { useEffect } from 'react'
import { ArrowUpDown, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import RatioInput from '@/components/ui/RatioInput'
import { calculateProfit } from '@/utils/calculateProfit';
import { calculateGoldCost, formatGoldCost } from '@/utils/calculateGoldCost';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { setBuyAmount1, setBuyAmount2, setSellAmount1, setSellAmount2, setProfit, setTradeOrb, setReferenceOrb, setGoldCost } from '@/stores/slices/tradeSlice';
import { CurrencyPopover } from './CurrencyPopover';
import { OrbSelector } from './OrbSelector';
import { currenciesWithGold, getGoldCostByCurrency } from '@/data/goldCosts';

export default function RatioCalculator() {
  const dispatch = useDispatch();
  const { buyAmount1, buyAmount2, sellAmount1, sellAmount2, profit, tradeOrb, referenceOrb, goldCost } = useSelector((state: RootState) => state.trade);

  useEffect(() => {
    const profit = calculateProfit(
      { amount1: buyAmount1, amount2: buyAmount2 },
      { amount1: sellAmount1, amount2: sellAmount2 }
    );
    dispatch(setProfit(profit));

    const goldCost = calculateGoldCost(
      { buyAmount1, buyAmount2, sellAmount1, sellAmount2 },
      tradeOrb,
      referenceOrb
    );
    dispatch(setGoldCost(goldCost));
  }, [buyAmount1, buyAmount2, sellAmount1, sellAmount2, tradeOrb, referenceOrb, dispatch]);

  const invertRatios = (type: 'buy' | 'sell') => {
    if (type === 'buy') {
      dispatch(setBuyAmount1(buyAmount2.toString()));
      dispatch(setBuyAmount2(buyAmount1.toString()));
    } else {
      dispatch(setSellAmount1(sellAmount2.toString()));
      dispatch(setSellAmount2(sellAmount1.toString()));
    }
  };

  const swapAmounts = () => {
    const tempBuyAmount1 = buyAmount1;
    const tempBuyAmount2 = buyAmount2;
    dispatch(setBuyAmount1(sellAmount1));
    dispatch(setBuyAmount2(sellAmount2));
    dispatch(setSellAmount1(tempBuyAmount1));
    dispatch(setSellAmount2(tempBuyAmount2));
  };

  const resetAmounts = () => {
    dispatch(setBuyAmount1(''));
    dispatch(setBuyAmount2(''));
    dispatch(setSellAmount1(''));
    dispatch(setSellAmount2(''));
  };

  const getProfitColor = (profit: number | null) => {
    if (profit === null) return "text-white"
    if (profit > 0) return "text-green-500"
    if (profit < 0) return "text-red-500"
    return "text-white"
  }

  const parseAmount = (amount: string) => {
    const parsed = parseFloat(amount);
    return isNaN(parsed) ? '' : parsed;
  };

  // Calculate cost for buying step (buy1 * tradeOrbCost)
  const calculateBuyingStepCost = () => {
    const buy1 = parseFloat(buyAmount1);
    if (isNaN(buy1) || !tradeOrb) return null;
    
    const tradeOrbGoldCost = getGoldCostByCurrency(tradeOrb);
    return buy1 * tradeOrbGoldCost;
  };

  // Calculate cost for selling step (sell2 * referenceOrbCost)
  const calculateSellingStepCost = () => {
    const sell2 = parseFloat(sellAmount2);
    if (isNaN(sell2) || !referenceOrb) return null;
    
    const referenceOrbGoldCost = getGoldCostByCurrency(referenceOrb);
    return sell2 * referenceOrbGoldCost;
  };

  // Calculate total cost for current trade
  const calculateTotalTradeCost = () => {
    const buyingCost = calculateBuyingStepCost();
    const sellingCost = calculateSellingStepCost();
    
    if (buyingCost === null || sellingCost === null) return null;
    
    return buyingCost + sellingCost;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ratio Calculator</CardTitle>
      </CardHeader>
      <CardContent className='pb-1'>
        {/* Orb Selection Section */}
        <div className="mb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Trade Orb (Buy/Sell)</label>
              <OrbSelector
                value={tradeOrb}
                onValueChange={(value) => dispatch(setTradeOrb(value))}
                placeholder="Select trade orb..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reference Orb (Final Goal)</label>
              <OrbSelector
                value={referenceOrb}
                onValueChange={(value) => dispatch(setReferenceOrb(value))}
                placeholder="Select reference orb..."
              />
            </div>
          </div>
        </div>

        {/* Trade Calculation Section */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center space-y-2">
            <Button onClick={swapAmounts} className="group">
              <ArrowUpDown className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
            </Button>
            <Button onClick={resetAmounts} className="group">
              <RotateCw className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
            </Button>
          </div>
          <div className="space-y-2 flex-1">
            <div>
              <RatioInput
                labelPrefix="Buying Ratio"
                amount1={parseAmount(buyAmount1)}
                setAmount1={(value) => dispatch(setBuyAmount1(value.toString()))}
                amount2={parseAmount(buyAmount2)}
                setAmount2={(value) => dispatch(setBuyAmount2(value.toString()))}
                invertRatios={() => invertRatios('buy')}
                suffix1={
                  <CurrencyPopover
                    items={currenciesWithGold}
                    selectedItem={tradeOrb}
                    onSelect={(value) => dispatch(setTradeOrb(value))}
                  />
                }
                suffix2={
                  <CurrencyPopover 
                    items={currenciesWithGold}
                    selectedItem={referenceOrb}
                    onSelect={(value) => dispatch(setReferenceOrb(value))}
                  />
                }
              />
              {/* Cost display positioned under the second input */}
              <div className="relative">
                <div className="absolute right-15 top-1 text-xs text-yellow-500">
                  {calculateBuyingStepCost() !== null && (
                    <div>Cost: {formatGoldCost(calculateBuyingStepCost())} gold</div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <RatioInput
                labelPrefix="Selling Ratio"
                amount1={parseAmount(sellAmount1)}
                setAmount1={(value) => dispatch(setSellAmount1(value.toString()))}
                amount2={parseAmount(sellAmount2)}
                setAmount2={(value) => dispatch(setSellAmount2(value.toString()))}
                invertRatios={() => invertRatios('sell')}
                placeholder1="Have"
                placeholder2="Want"
                suffix1={
                  <CurrencyPopover
                    items={currenciesWithGold}
                    selectedItem={tradeOrb}
                    onSelect={(value) => dispatch(setTradeOrb(value))}
                  />
                }
                suffix2={
                  <CurrencyPopover 
                    items={currenciesWithGold}
                    selectedItem={referenceOrb}
                    onSelect={(value) => dispatch(setReferenceOrb(value))}
                  />
                }
              />
              {/* Cost display positioned under the second input */}
              <div className="relative">
                <div className="absolute right-15 top-1 text-xs text-yellow-500">
                  {calculateSellingStepCost() !== null && (
                    <div>Cost: {formatGoldCost(calculateSellingStepCost())} gold</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 mt-6">
        {profit !== null && (
          <div className="text-lg font-bold">
            Profit: <span className={getProfitColor(profit)}>{profit > 0 ? "+" : ""}{(profit * 100).toFixed(2)}%</span>
          </div>
        )}
        {goldCost !== null && (
          <div className="text-lg font-bold">
            Gold Cost <span className="text-sm font-normal text-muted-foreground"></span>: <span className="text-yellow-500">{formatGoldCost(goldCost)} gold / orb</span>
          </div>
        )}
        {calculateTotalTradeCost() !== null && (
          <div className="text-lg font-bold">
            Total Trade Cost: <span className="text-yellow-500">{formatGoldCost(calculateTotalTradeCost())} gold</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}