import { useState, useEffect } from "react"

const calculateGrowth = (principal: number, rate: number, iterations: number) => {
  return Array.from({ length: iterations + 1 }, (_, index) => {
    const withInterest = principal * Math.pow(1 + rate, index)
    const linearGrowth = principal + (principal * rate) * index
    return {
      iteration: index,
      initialInvestment: principal,
      withInterest: withInterest < 0 ? 0 : withInterest, // Ensure it doesn't go below zero
      linearGrowth: linearGrowth < 0 ? 0 : linearGrowth, // Ensure it doesn't go below zero
    }
  })
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