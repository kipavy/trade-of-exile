import { useEffect } from 'react'
import { ArrowUpDown, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import RatioInput from '@/components/ui/RatioInput'
import { calculateProfit } from '@/utils/calculateProfit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { setBuyAmount1, setBuyAmount2, setSellAmount1, setSellAmount2, setProfit } from '@/stores/slices/tradeSlice';

export default function RatioCalculator() {
  const dispatch = useDispatch();
  const { buyAmount1, buyAmount2, sellAmount1, sellAmount2, profit } = useSelector((state: RootState) => state.trade);

  useEffect(() => {
    const profit = calculateProfit(
      { amount1: buyAmount1, amount2: buyAmount2 },
      { amount1: sellAmount1, amount2: sellAmount2 }
    );
    dispatch(setProfit(profit));
  }, [buyAmount1, buyAmount2, sellAmount1, sellAmount2]);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ratio Calculator</CardTitle>
      </CardHeader>
      <CardContent className='pb-1'>
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
          <RatioInput
              label="Buying Ratio"
              amount1={Number(buyAmount1)}
              setAmount1={(value) => dispatch(setBuyAmount1(value.toString()))}
              amount2={Number(buyAmount2)}
              setAmount2={(value) => dispatch(setBuyAmount2(value.toString()))}
              invertRatios={() => invertRatios('buy')}
              suffix2='ex'
            />
            <RatioInput
              label="Selling Ratio"
              amount1={Number(sellAmount1)}
              setAmount1={(value) => dispatch(setSellAmount1(value.toString()))}
              amount2={Number(sellAmount2)}
              setAmount2={(value) => dispatch(setSellAmount2(value.toString()))}
              invertRatios={() => invertRatios('sell')}
              placeholder1="Have"
              placeholder2="Want"
              suffix2='ex'
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {profit !== null && (
          <div className="mt-4 text-lg font-bold">
            Profit: <span className={getProfitColor(profit)}>{profit > 0 ? "+" : ""}{(profit*100).toFixed(2)}%</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}