import RatioCalculator from "@/components/ui/RatioCalculator"
import AreaChartComponent from "@/components/ui/AreaChart"

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <RatioCalculator />
      <AreaChartComponent/>
    </div>
  )
}