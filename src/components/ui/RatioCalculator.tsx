import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import RatioInput from '@/components/ui/RatioInput'
import useProfitCalculator from '@/hooks/useProfitCalculator'
import useLocalStorageState from '@/hooks/useLocalStorageState';

export default function RatioCalculator() {
  const [buyAmount1, setBuyAmount1] = useLocalStorageState("buyAmount1", "");
  const [buyAmount2, setBuyAmount2] = useLocalStorageState("buyAmount2", "");
  const [sellAmount1, setSellAmount1] = useLocalStorageState("sellAmount1", "");
  const [sellAmount2, setSellAmount2] = useLocalStorageState("sellAmount2", "");
  const profit = useProfitCalculator(
    { amount1: buyAmount1, amount2: buyAmount2 },
    { amount1: sellAmount1, amount2: sellAmount2 }
  )

  const invertRatios = (type: 'buy' | 'sell') => {
    if (type === 'buy') {
      setBuyAmount1(buyAmount2)
      setBuyAmount2(buyAmount1)
    } else {
      setSellAmount1(sellAmount2)
      setSellAmount2(sellAmount1)
    }
  }

  const swapAmounts = () => {
    const tempBuyAmount1 = buyAmount1
    const tempBuyAmount2 = buyAmount2
    setBuyAmount1(sellAmount1)
    setBuyAmount2(sellAmount2)
    setSellAmount1(tempBuyAmount1)
    setSellAmount2(tempBuyAmount2)
  }

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
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col justify-center">
            <Button onClick={swapAmounts} className="group">
              <ArrowUpDown className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
            </Button>
          </div>
          <div className="space-y-4 flex-1">
            <RatioInput
              label="Buying Ratio"
              amount1={Number(buyAmount1)}
              setAmount1={(value) => setBuyAmount1(value)}
              amount2={Number(buyAmount2)}
              setAmount2={(value) => setBuyAmount2(value)}
              invertRatios={() => invertRatios('buy')}
            />
            <RatioInput
              label="Selling Ratio"
              amount1={Number(sellAmount1)}
              setAmount1={(value) => setSellAmount1(value)}
              amount2={Number(sellAmount2)}
              setAmount2={(value) => setSellAmount2(value)}
              invertRatios={() => invertRatios('sell')}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {profit !== null && (
          <div className="mt-4 text-lg font-bold">
            Profit: <span className={getProfitColor(profit)}>{profit > 0 ? "+" : ""}{profit.toFixed(2)}%</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}