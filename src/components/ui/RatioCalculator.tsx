import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRightLeft } from "lucide-react"

export default function RatioCalculator() {
  const [buyAmount1, setBuyAmount1] = useState<number | string>(() => localStorage.getItem("buyAmount1") || "")
  const [buyAmount2, setBuyAmount2] = useState<number | string>(() => localStorage.getItem("buyAmount2") || "")
  const [sellAmount1, setSellAmount1] = useState<number | string>(() => localStorage.getItem("sellAmount1") || "")
  const [sellAmount2, setSellAmount2] = useState<number | string>(() => localStorage.getItem("sellAmount2") || "")
  const [profit, setProfit] = useState<number | null>(null)

  useEffect(() => {
    const buy1 = parseFloat(buyAmount1 as string)
    const buy2 = parseFloat(buyAmount2 as string)
    const sell1 = parseFloat(sellAmount1 as string)
    const sell2 = parseFloat(sellAmount2 as string)

    if (!isNaN(buy1) && !isNaN(buy2) && !isNaN(sell1) && !isNaN(sell2) && buy2 !== 0 && sell2 !== 0) {
      const buyRatio = buy1 / buy2
      const sellRatio = sell1 / sell2
      setProfit((1 - sellRatio / buyRatio) * 100)
    } else {
      setProfit(null)
    }

    localStorage.setItem("buyAmount1", buyAmount1 as string)
    localStorage.setItem("buyAmount2", buyAmount2 as string)
    localStorage.setItem("sellAmount1", sellAmount1 as string)
    localStorage.setItem("sellAmount2", sellAmount2 as string)
  }, [buyAmount1, buyAmount2, sellAmount1, sellAmount2])

  const invertRatios = (type: 'buy' | 'sell') => {
    if (type === 'buy') {
      setBuyAmount1(buyAmount2)
      setBuyAmount2(buyAmount1)
    } else {
      setSellAmount1(sellAmount2)
      setSellAmount2(sellAmount1)
    }
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Buying Ratio
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                id="buyAmount1"
                value={buyAmount1}
                onChange={(e) => setBuyAmount1(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <span>:</span>
              <Input
                type="number"
                id="buyAmount2"
                value={buyAmount2}
                onChange={(e) => setBuyAmount2(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <Button onClick={() => invertRatios('buy')} className="ml-2">
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">
              Selling Ratio
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                id="sellAmount1"
                value={sellAmount1}
                onChange={(e) => setSellAmount1(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <span>:</span>
              <Input
                type="number"
                id="sellAmount2"
                value={sellAmount2}
                onChange={(e) => setSellAmount2(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <Button onClick={() => invertRatios('sell')} className="ml-2">
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {profit !== null && (
            <div className="mt-4 text-lg font-bold">
                Profit: <span className={getProfitColor(profit)}>{profit.toFixed(2)}%</span>
            </div>
        )}
      </CardFooter>
    </Card>
  )
}