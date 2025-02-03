import { useState, useEffect } from "react"

const calculateGrowth = (principal: number, rate: number, iterations: number) => {
  return Array.from({ length: iterations + 1 }, (_, index) => ({
    iteration: index,
    initialInvestment: principal,
    withInterest: Math.round(principal * Math.pow(1 + rate / 100, index)),
  }))
}

export const useCalculateGrowth = (initialInvestment?: number, interestRate?: number, iterations: number = 10) => {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (initialInvestment !== undefined && interestRate !== undefined) {
      const data = calculateGrowth(initialInvestment, interestRate, iterations)
      setChartData(data)
    } else {
      setChartData([])
    }
  }, [initialInvestment, interestRate, iterations])

  return chartData
}