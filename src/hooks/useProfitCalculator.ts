import { useState, useEffect } from 'react'

export default function useProfitCalculator(buyAmount1, buyAmount2, sellAmount1, sellAmount2) {
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

  return profit
}