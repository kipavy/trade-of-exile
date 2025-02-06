import { useState, useEffect } from "react"

const calculateGrowth = (principal: number, rate: number, iterations: number) => {
  return Array.from({ length: iterations + 1 }, (_, index) => {
    let withInterest = principal * Math.pow(1 + rate, index)
    let linearGrowth = principal * (1 + rate * index)

    // Ensure values don't go below zero
    withInterest = withInterest < 0 ? 0 : withInterest
    linearGrowth = linearGrowth < 0 ? 0 : linearGrowth

    return {
      iteration: index,
      initialInvestment: principal,
      withInterest,
      linearGrowth,
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