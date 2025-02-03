import RatioCalculator from "@/components/ui/RatioCalculator"
import AreaChart from "@/components/ui/AreaChart"
import { Provider } from 'react-redux';
import store from '@/stores/store';

export default function Home() {

  return (
    <Provider store={store}>
      <div className="flex flex-col justify-center items-center gap-5">
        <RatioCalculator />
        <AreaChart />
      </div>
    </Provider>
  )
}