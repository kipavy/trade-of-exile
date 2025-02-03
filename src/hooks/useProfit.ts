import { useState } from "react"

export const useProfit = () => {
  const [profit, setProfit] = useState<number | null>(null)
  return { profit, setProfit }
}