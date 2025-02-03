import RatioCalculator from "@/components/ui/RatioCalculator"
import AreaChartComponent from "@/components/ui/AreaChart"
import { useProfit } from "@/hooks/useProfit"

export default function Home() {
  const { profit, setProfit } = useProfit()

  return (
    <div className="flex flex-col justify-center items-center">
      <RatioCalculator setProfit={setProfit} />
      <AreaChartComponent computedInterestRate={profit ?? 0} />
    </div>
  )
}