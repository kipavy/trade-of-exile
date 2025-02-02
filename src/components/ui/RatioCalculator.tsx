import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import RatioInput from '@/components/ui/RatioInput'
import useProfitCalculator from '@/hooks/useProfitCalculator'

export default function RatioCalculator() {
  const [buyAmount1, setBuyAmount1] = useState<number | string>(() => localStorage.getItem("buyAmount1") || "")
  const [buyAmount2, setBuyAmount2] = useState<number | string>(() => localStorage.getItem("buyAmount2") || "")
  const [sellAmount1, setSellAmount1] = useState<number | string>(() => localStorage.getItem("sellAmount1") || "")
  const [sellAmount2, setSellAmount2] = useState<number | string>(() => localStorage.getItem("sellAmount2") || "")
  const profit = useProfitCalculator(buyAmount1, buyAmount2, sellAmount1, sellAmount2)

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
              amount1={buyAmount1}
              setAmount1={setBuyAmount1}
              amount2={buyAmount2}
              setAmount2={setBuyAmount2}
              invertRatios={() => invertRatios('buy')}
            />
            <RatioInput
              label="Selling Ratio"
              amount1={sellAmount1}
              setAmount1={setSellAmount1}
              amount2={sellAmount2}
              setAmount2={setSellAmount2}
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