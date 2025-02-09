"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { type ChartConfig } from "@/types/chart"
import { useCalculateGrowth } from "@/hooks/useCalculateGrowth"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores/store';
import { TrendingUp, ArrowDownRight, ArrowUpRight, RectangleEllipsis, EqualApproximately } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { setSellAmount1, setSellAmount2 } from "@/stores/slices/tradeSlice"
import { CurrencyPopover } from "./CurrencyPopover"

export default function AreaChartComponent() {
  const dispatch = useDispatch();
  const { buyAmount1, buyAmount2, profit } = useSelector((state: RootState) => state.trade);
  const defaultProfit = profit ?? 0;
  const [initialInvestment, setInitialInvestment] = useState<number>(10000)
  const [manualInterestRate, setManualInterestRate] = useState<number>(5)
  const [iterations, setIterations] = useState<number>(10)
  const [showLinearGrowth, setShowLinearGrowth] = useState<boolean>(true)
  const [useComputedInterest, setUseComputedInterest] = useState<boolean>(true)

  const interestRate = useComputedInterest ? defaultProfit*100 : manualInterestRate
  const chartData = useCalculateGrowth(initialInvestment, interestRate/100, iterations)

  const chartConfig: ChartConfig = {
    initialInvestment: {
      label: "Initial Investment",
      color: "hsl(var(--chart-5))",
    },
    withInterest: {
      label: `With ${interestRate.toFixed(2)}% Interest`,
      color: "hsl(var(--chart-2))",
    },
    linearGrowth: {
      label: "Linear Growth",
      color: "hsl(var(--chart-3))",
    },
  }
  const buyValue = (Number(buyAmount1) / Number(buyAmount2)) * initialInvestment;
  const sellValue = (initialInvestment * (1 + interestRate / 100)).toFixed(2);

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isTooltipPersistent, setTooltipPersistent] = useState(false);

  const handleTooltipToggle = () => {
    setTooltipPersistent(!isTooltipPersistent);
    setTimeout(() => {
      setTooltipVisible(!isTooltipPersistent);
    }, 0);
  };

  const handleTooltipHover = (visible: boolean) => {
    if (!isTooltipPersistent) {
      setTooltipVisible(visible);
    }
  };

  const adjustValues = () => {
    const buyAmount2Number = Number(buyAmount2);
    const roundedInitialInvestment = Math.round(initialInvestment / buyAmount2Number) * buyAmount2Number;
    setInitialInvestment(roundedInitialInvestment);

    const sell = (buyValue/initialInvestment*roundedInitialInvestment)
    const sell2 = Math.floor(+sellValue/initialInvestment*roundedInitialInvestment);
    dispatch(setSellAmount1(sell.toString()));
    dispatch(setSellAmount2(sell2.toString()));
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="pb-4">
        <CardTitle>
          Investment Growth <TrendingUp className="inline-block h-5 w-5" />
        </CardTitle>
        <CardDescription className="flex flex-col">
        <span className="flex items-center">
          <span className="text-green-500 mr-1">Buying</span> {buyValue.toFixed(2)} currency for {initialInvestment}
          <CurrencyPopover />
        </span>
        <span className="flex items-center">
          <span className="text-red-500 mr-1">Selling</span> {buyValue.toFixed(2)} currency for {sellValue}
          <CurrencyPopover />
        </span>
          <TooltipProvider delayDuration={200}>
            <Tooltip open={isTooltipVisible} onOpenChange={handleTooltipHover}>
              <TooltipTrigger onClick={handleTooltipToggle} className="w-fit">
              <RectangleEllipsis className={`hover:stroke-primary ${isTooltipVisible ? 'stroke-primary' : ''}`} />
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start" className={isTooltipPersistent ? 'border-3 border-purple-500' : ''}>
                <div>
                  {chartData.slice(1, -1).map((data, index) => {
                    const iterationBuyValue = (Number(buyAmount1) / Number(buyAmount2)) * data.withInterest;
                    return (
                      <div key={index} className="flex items-center gap-1">
                        <span>{index + 2}:</span>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        <span>{iterationBuyValue.toFixed(2)} cur. for {data.withInterest.toFixed(2)} ex</span>
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                        <span>{(data.withInterest * (1 + interestRate / 100)).toFixed()} ex</span>
                      </div>
                    );
                  })}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-6 items-end">
          <div className="col-span-3 flex items-center">
            <Label htmlFor="showLinearGrowth" className="mr-2">Linear Growth</Label>
            <Checkbox
              id="showLinearGrowth"
              checked={showLinearGrowth}
              onCheckedChange={(checked) => setShowLinearGrowth(checked === true)}
            />
          </div>
            <div className="col-span-3 flex items-center">
              <Label htmlFor="useComputedInterest" className="mr-2">Use Computed Interest</Label>
              <Checkbox
                id="useComputedInterest"
                checked={useComputedInterest}
                onCheckedChange={(checked) => setUseComputedInterest(checked === true)}
              />
          </div>
          <div>
            <Label className="whitespace-nowrap text-[clamp(0.75rem,2vw,0.875rem)]">
              Initial Investment
            </Label>
            <Input
              id="initialInvestment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              suffix={
                <EqualApproximately
                  onClick={adjustValues}
                  className="cursor-pointer transition-colors hover:text-blue-500 active:scale-90"
                />
              }
            />
          </div>
          <div>
            <Label>Interest Rate</Label>
            <Input
              id="interestRate"
              type="number"
              value={(interestRate).toFixed(2)}
              onChange={(e) => setManualInterestRate(Number(e.target.value))}
              disabled={useComputedInterest}
              suffix="%"
            />
          </div>
          <div>
            <Label>Iterations</Label>
            <Input
              id="iterations"
              type="number"
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
            />
          </div>
        </div>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iteration" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                  return value;
                }}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={45}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel hideIndicator/>} />
              <defs>
              <linearGradient id="fillinitialInvestment" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-initialInvestment)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-initialInvestment)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillWithInterest" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-withInterest)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-withInterest)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLinearGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-linearGrowth)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-linearGrowth)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
              <Area
                type="monotone"
                dataKey="initialInvestment"
                name="Initial Investment"
                stroke="var(--color-initialInvestment)"
                fill="url(#fillinitialInvestment)"
                fillOpacity={0.5}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="withInterest"
                name={`With ${interestRate.toFixed(2)}% Interest`}
                stroke="var(--color-withInterest)"
                fill="url(#fillWithInterest)"
                fillOpacity={0.5}
                stackId="2"
              />
              {showLinearGrowth && (
                <Area
                  type="monotone"
                  dataKey="linearGrowth"
                  name="Linear Growth"
                  stroke="var(--color-linearGrowth)"
                  fill="url(#fillLinearGrowth)"
                  fillOpacity={0.5}
                  stackId="3"
                />
              )}
              <ChartLegend content={<ChartLegendContent />} className="whitespace-nowrap text-[clamp(0.65rem,2vw,0.875rem)]" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Compare growth with and without compound interest <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {iterations}-iteration projection based on initial investment and interest rate
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}