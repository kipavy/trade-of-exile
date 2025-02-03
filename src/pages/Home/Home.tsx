import RatioCalculator from "@/components/ui/RatioCalculator"
import AreaChart from "@/components/ui/AreaChart"
import { useProfit } from "@/hooks/useProfit"

export default function Home() {
  const { profit, setProfit } = useProfit()

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <RatioCalculator setProfit={setProfit} />
      <AreaChart computedInterestRate={profit ?? 0} />
    </div>
  )
}